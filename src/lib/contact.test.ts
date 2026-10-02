import { describe, expect, it } from "vitest";
import { parseContactInput } from "./contact";

const valid = {
  name: "Ada",
  email: "ada@example.com",
  message: "Hello from a hiring screen.",
};

describe("parseContactInput", () => {
  it("accepts a complete message", () => {
    expect(parseContactInput(valid)).toEqual({
      ok: true,
      value: valid,
      send: true,
    });
  });

  it("rejects missing fields", () => {
    expect(parseContactInput({ name: "", email: valid.email, message: valid.message })).toEqual({
      ok: false,
      error: "Check name, email, and message.",
    });
  });

  it("rejects a bad email", () => {
    expect(parseContactInput({ ...valid, email: "not-an-email" }).ok).toBe(false);
  });

  it("rejects an overlong message", () => {
    expect(parseContactInput({ ...valid, message: "x".repeat(2001) }).ok).toBe(false);
  });

  it("treats a filled honeypot as success without send", () => {
    expect(parseContactInput({ ...valid, website: "https://spam.example" })).toEqual({
      ok: true,
      value: valid,
      send: false,
    });
  });
});
