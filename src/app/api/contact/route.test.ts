import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = {
      send: sendMock,
    };
  },
}));

import { POST } from "@/app/api/contact/route";
import {
  buildContactEmailContent,
  escapeHtml,
  isHoneypotFilled,
  isTrustedContactOrigin,
  validateContactPayload,
} from "@/site/contact/contact-mail";

function makeRequest(body: unknown, headers?: HeadersInit, url = "https://brut-vers-net.fr/api/contact") {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://brut-vers-net.fr",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Alice Dupont",
  email: "alice@example.com",
  subject: "Autre demande",
  message: "Bonjour, j'ai une question sur le calculateur.",
  website: "",
};

describe("contact-mail helpers", () => {
  it("rejette un formulaire vide", () => {
    const result = validateContactPayload({});
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/nom/i);
  });

  it("rejette une adresse e-mail invalide", () => {
    const result = validateContactPayload({
      ...validPayload,
      email: "pas-une-adresse",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/e-mail/i);
  });

  it("rejette un message trop long", () => {
    const result = validateContactPayload({
      ...validPayload,
      message: "a".repeat(5001),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/5 000|5000/i);
  });

  it("détecte le honeypot rempli", () => {
    expect(isHoneypotFilled({ website: "http://spam.test" })).toBe(true);
    expect(isHoneypotFilled({ website: "  " })).toBe(false);
  });

  it("échappe le HTML utilisateur", () => {
    expect(escapeHtml(`<script>alert("x")</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;",
    );
  });

  it("construit l'objet et le corps attendus", () => {
    const content = buildContactEmailContent({
      name: "Alice",
      email: "alice@example.com",
      subject: "Autre demande",
      message: "Bonjour",
    });
    expect(content.subject).toBe("[Nouveau contact Brut vers Net] Autre demande");
    expect(content.text).toContain("Nouveau message reçu depuis brut-vers-net.fr");
    expect(content.text).toContain("alice@example.com");
    expect(content.html).toContain("<strong>Nom :</strong>");
    expect(content.html).not.toContain("<script>");
  });
});

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockReset();
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.CONTACT_EMAIL = "contact@brut-vers-net.fr";
    process.env.CONTACT_FROM_EMAIL = "Formulaire Brut vers Net <contact@brut-vers-net.fr>";
  });

  it("rejette un formulaire vide", async () => {
    const response = await POST(makeRequest({}));
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBeTruthy();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejette une adresse e-mail invalide", async () => {
    const response = await POST(makeRequest({ ...validPayload, email: "bad" }));
    expect(response.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejette un message trop long", async () => {
    const response = await POST(
      makeRequest({ ...validPayload, message: "x".repeat(5001) }),
    );
    expect(response.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("accepte silencieusement un honeypot rempli", async () => {
    const response = await POST(
      makeRequest({ ...validPayload, website: "https://bot.example" }),
    );
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("accepte Origin www même si l'URL API est en apex", async () => {
    sendMock.mockResolvedValue({ data: { id: "msg_www" }, error: null });
    const response = await POST(
      makeRequest(validPayload, { Origin: "https://www.brut-vers-net.fr" }),
    );
    expect(response.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("accepte Origin égal à l'hôte de la requête (preview Vercel)", async () => {
    sendMock.mockResolvedValue({ data: { id: "msg_preview" }, error: null });
    const response = await POST(
      makeRequest(
        validPayload,
        { Origin: "https://brut-vers-net-git-main.vercel.app" },
        "https://brut-vers-net-git-main.vercel.app/api/contact",
      ),
    );
    expect(response.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("refuse une Origin externe (403) avant tout appel Resend", async () => {
    const response = await POST(
      makeRequest(validPayload, { Origin: "https://evil.example" }),
    );
    expect(response.status).toBe(403);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("isTrustedContactOrigin accepte apex et www", () => {
    const apex = makeRequest(validPayload);
    const www = makeRequest(validPayload, { Origin: "https://www.brut-vers-net.fr" });
    expect(isTrustedContactOrigin(apex, "https://brut-vers-net.fr")).toBe(true);
    expect(isTrustedContactOrigin(www, "https://brut-vers-net.fr")).toBe(true);
  });

  it("envoie un e-mail avec des données valides", async () => {
    sendMock.mockResolvedValue({ data: { id: "msg_123" }, error: null });

    const response = await POST(makeRequest(validPayload));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });

    expect(sendMock).toHaveBeenCalledTimes(1);
    const arg = sendMock.mock.calls[0][0];
    expect(arg.to).toEqual(["contact@brut-vers-net.fr"]);
    expect(arg.from).toBe("Formulaire Brut vers Net <contact@brut-vers-net.fr>");
    expect(arg.replyTo).toBe("alice@example.com");
    expect(arg.subject).toBe("[Nouveau contact Brut vers Net] Autre demande");
    expect(arg.text).toContain("Alice Dupont");
    expect(arg.html).toContain("Alice Dupont");
  });

  it("gère une erreur Resend", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "validation_error", message: "Invalid from" },
    });

    const response = await POST(makeRequest(validPayload));
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toMatch(/contact@brut-vers-net\.fr/);
  });

  it("n'expose pas RESEND_API_KEY côté client", () => {
    const formSource = readFileSync(
      join(process.cwd(), "src/framework/ContactForm.tsx"),
      "utf8",
    );
    const pageSource = readFileSync(
      join(process.cwd(), "src/site/contact/ContactPageContent.tsx"),
      "utf8",
    );

    expect(formSource).not.toMatch(/RESEND_API_KEY/);
    expect(formSource).not.toMatch(/NEXT_PUBLIC_.*RESEND/);
    expect(pageSource).not.toMatch(/RESEND_API_KEY/);
  });
});
