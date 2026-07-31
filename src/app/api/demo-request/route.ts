import { NextResponse } from "next/server";
import { escapeHtml, mailerConfig, sendMail } from "@/lib/mailer";
import {
  HONEYPOT,
  demoFields,
  validateDemo,
  type DemoPayload,
} from "@/content/demo-form";
import { site } from "@/content/site";

export const runtime = "nodejs";
// Never cache a form submission endpoint.
export const dynamic = "force-dynamic";

/**
 * Crude per-IP throttle. Process-local, so it resets on redeploy and doesn't
 * span serverless instances — it's a speed bump against casual abuse, not a
 * real rate limiter. Put Cloudflare / WAF rules in front for that.
 */
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60_000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // bound memory
  return recent.length > RATE_LIMIT;
}

export async function POST(req: Request) {
  let body: DemoPayload;
  try {
    body = (await req.json()) as DemoPayload;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Bots fill every input they find, including the one humans can't see.
  // Answer 200 so they don't learn they were caught.
  if ((body[HONEYPOT] ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  const errors = validateDemo(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const { to } = mailerConfig();
  const rows = demoFields
    .map((f) => ({ label: f.label, value: (body[f.name] ?? "").trim() }))
    .filter((r) => r.value);

  const subject = `Demo request — ${body.company?.trim() || "Unknown company"} (${
    body.name?.trim() || "no name"
  })`;

  const text = [
    `New ${site.name} demo request`,
    "",
    ...rows.map((r) => `${r.label}: ${r.value}`),
    "",
    `Submitted: ${new Date().toISOString()}`,
    `IP: ${ip}`,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:640px">
      <h2 style="margin:0 0 4px;color:#302e86;font-size:18px">New ${escapeHtml(
        site.name
      )} demo request</h2>
      <p style="margin:0 0 18px;color:#666;font-size:13px">
        Submitted ${escapeHtml(new Date().toUTCString())}
      </p>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            (r, i) => `
          <tr style="background:${i % 2 ? "#f6f7fc" : "#fff"}">
            <td style="padding:9px 12px;color:#555;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eceef6">
              <strong>${escapeHtml(r.label)}</strong>
            </td>
            <td style="padding:9px 12px;color:#14163a;border-bottom:1px solid #eceef6">
              ${escapeHtml(r.value).replace(/\n/g, "<br>")}
            </td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin:18px 0 0;color:#888;font-size:12px">
        Reply directly to this email to reach ${escapeHtml(body.email ?? "")}.
      </p>
    </div>`;

  const result = await sendMail({
    to,
    subject,
    html,
    text,
    // So hitting Reply in the inbox goes to the prospect, not to yourself.
    replyTo: body.email?.trim(),
  });

  if (!result.ok) {
    // Log the full detail server-side; never leak provider internals to the
    // browser. The submission is still visible in the server logs either way.
    console.error("[demo-request] send failed:", result, "\npayload:\n", text);
    return NextResponse.json(
      {
        error:
          result.reason === "unconfigured"
            ? "Email delivery isn't configured on this deployment yet."
            : "We couldn't send that just now. Please email us directly.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
