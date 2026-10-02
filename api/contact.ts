import type { IncomingMessage, ServerResponse } from "node:http";
import { parseContactInput } from "../src/lib/contact.ts";

type JsonRes = ServerResponse & {
  status: (code: number) => JsonRes;
  json: (body: unknown) => void;
};

type JsonReq = IncomingMessage & {
  body?: unknown;
};

export type MailBody = {
  from: string;
  to: string[];
  subject: string;
  text: string;
};

export async function sendContactMail(
  body: MailBody,
  fetchImpl: typeof fetch,
  apiKey: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return { ok: false, error: "Failed to send email." };
  }

  return { ok: true };
}

export default async function handler(req: JsonReq, res: JsonRes) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Use POST." });
    return;
  }

  const parsed = parseContactInput(req.body);
  if (!parsed.ok) {
    res.status(400).json(parsed);
    return;
  }

  if (!parsed.send) {
    res.status(200).json({ ok: true });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !to || !from) {
    res.status(500).json({ ok: false, error: "Mail is not configured." });
    return;
  }

  const sent = await sendContactMail(
    {
      from,
      to: [to],
      subject: `Portfolio contact from ${parsed.value.name}`,
      text: `Name: ${parsed.value.name}\nEmail: ${parsed.value.email}\n\n${parsed.value.message}`,
    },
    fetch,
    apiKey,
  );

  if (!sent.ok) {
    res.status(500).json(sent);
    return;
  }

  res.status(200).json({ ok: true });
}
