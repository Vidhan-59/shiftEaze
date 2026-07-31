/**
 * Outbound email for demo requests.
 *
 * Talks to the Resend REST API over plain `fetch` rather than pulling in an
 * SDK — one less dependency to keep current, and the payload is three fields.
 *
 * Configuration (see .env.example):
 *   RESEND_API_KEY   required — without it sending is disabled and the route
 *                    reports a configuration error instead of pretending to
 *                    have sent something.
 *   DEMO_MAIL_TO     required — who receives the enquiry (comma-separated for
 *                    several recipients).
 *   DEMO_MAIL_FROM   required — verified sender, e.g. "ShiftEaze
 *                    <demo@shifteaze.com>".
 */

const ENDPOINT = "https://api.resend.com/emails";

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "provider"; detail?: string };

export function mailerConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    // Normalised to lowercase. Mail domains are case-insensitive in practice,
    // but Resend compares the recipient against the account address verbatim
    // while no domain is verified — a capitalised address there is rejected
    // with a 403 that reads as if the address were wrong entirely.
    to: (process.env.DEMO_MAIL_TO ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
    from: process.env.DEMO_MAIL_FROM,
  };
}

export async function sendMail(opts: {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  const { apiKey, from } = mailerConfig();
  if (!apiKey || !from || opts.to.length === 0) {
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      return {
        ok: false,
        reason: "provider",
        detail: `${res.status} ${await res.text().catch(() => "")}`.slice(0, 400),
      };
    }
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      reason: "provider",
      detail: e instanceof Error ? e.message : "network error",
    };
  }
}

/** Everything submitted goes into an email body — always escape it. */
export function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
