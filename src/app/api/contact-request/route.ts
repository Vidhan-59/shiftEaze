import { NextResponse } from "next/server";
import { escapeHtml, mailerConfig, sendMail } from "@/lib/mailer";
import {
  HONEYPOT,
  contactFields,
  validateContact,
  type ContactPayload,
} from "@/content/contact-form";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Same crude per-IP throttle as /api/demo-request.
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60_000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

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

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // Same recipient the demo form already delivers to (brief §7.2: "Send the
  // submission through the same mechanism as the demo form, to the same
  // recipient").
  const { to } = mailerConfig();
  const rows = contactFields
    .map((f) => ({ label: f.label, value: (body[f.name] ?? "").trim() }))
    .filter((r) => r.value);

  const topic = body.topic?.trim() || "General";
  const subject = `Contact form (${topic}) — ${body.name?.trim() || "no name"}`;

  const text = [
    `New ${site.name} contact form submission`,
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
      )} contact form submission</h2>
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
    replyTo: body.email?.trim(),
  });

  if (!result.ok) {
    console.error("[contact-request] send failed:", result, "\npayload:\n", text);
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
