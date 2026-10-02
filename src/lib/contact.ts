import { z } from "zod";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactFields = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().max(100).regex(emailPattern),
  message: z.string().trim().min(1).max(2000),
  website: z.string().optional(),
});

export type ContactValue = {
  name: string;
  email: string;
  message: string;
};

export type ContactParse =
  | { ok: true; value: ContactValue; send: boolean }
  | { ok: false; error: string };

export function parseContactInput(input: unknown): ContactParse {
  const parsed = contactFields.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Check name, email, and message." };
  }

  const honeypot = parsed.data.website ?? "";
  if (honeypot.length > 0) {
    return {
      ok: true,
      value: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      },
      send: false,
    };
  }

  return {
    ok: true,
    value: {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    },
    send: true,
  };
}
