/**
 * Outbound email for demo requests.
 *
 * Sends through a mailbox over SMTP (nodemailer), authenticated with the
 * mailbox's own credentials.
 *
 * Configuration (see .env.example):
 *   SMTP_HOST        the mailbox provider's SMTP server (e.g. mail.rcspl.net
 *                    for shifteaze.io — not Microsoft 365/Outlook.com).
 *   SMTP_PORT        465 for implicit SSL, 587 for STARTTLS, depending on
 *                    the provider.
 *   SMTP_USER        required — the mailbox address, e.g. info@shifteaze.io
 *   SMTP_PASS        required — the mailbox password, or an app password if
 *                    the account has MFA enabled
 *   DEMO_MAIL_TO     who receives the enquiry (comma-separated for several
 *                    recipients). Defaults to SMTP_USER.
 *   DEMO_MAIL_FROM   defaults to SMTP_USER. Most providers require the "from"
 *                    address to match the authenticated mailbox, so leave
 *                    this unset unless you know otherwise.
 */

import nodemailer from "nodemailer";

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "provider"; detail?: string };

export function mailerConfig() {
  const user = process.env.SMTP_USER;
  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    user,
    pass: process.env.SMTP_PASS,
    to: (process.env.DEMO_MAIL_TO || user || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    from: process.env.DEMO_MAIL_FROM || user,
  };
}

let cachedTransport: ReturnType<typeof nodemailer.createTransport> | null = null;
let cachedKey = "";

function transport(host: string, port: number, user: string, pass: string) {
  // Key the cache on the config, or a changed env var is silently ignored
  // for the life of the warm instance.
  const key = `${host}:${port}:${user}:${pass}`;
  if (!cachedTransport || cachedKey !== key) {
    cachedTransport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      // Nodemailer's defaults run to minutes. A serverless invocation is
      // killed long before that, which turns a diagnosable SMTP error into
      // an opaque function timeout — so fail fast enough to report why.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    cachedKey = key;
  }
  return cachedTransport;
}

/** Nodemailer hangs the SMTP reply off the error; the message alone rarely says why. */
function describe(e: unknown): string {
  if (!(e instanceof Error)) return "network error";
  const { code, responseCode, response } = e as Error & {
    code?: string;
    responseCode?: number;
    response?: string;
  };
  return [
    e.message,
    code && `code=${code}`,
    responseCode && `responseCode=${responseCode}`,
    response && `response=${response}`,
  ]
    .filter(Boolean)
    .join(" | ");
}

export async function sendMail(opts: {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  const { host, port, user, pass, from } = mailerConfig();
  if (!host || !user || !pass || !from || opts.to.length === 0) {
    return { ok: false, reason: "unconfigured" };
  }

  try {
    await transport(host, port, user, pass).sendMail({
      from,
      to: opts.to.join(", "),
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    });
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      reason: "provider",
      detail: describe(e),
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
