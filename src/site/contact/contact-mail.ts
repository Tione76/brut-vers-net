import { siteConfig } from "@/site/site.config";

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

export const CONTACT_SUCCESS_MESSAGE =
  "Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.";

export const CONTACT_ERROR_MESSAGE = `Une erreur est survenue pendant l'envoi. Vous pouvez également nous écrire à ${siteConfig.contact.email}.`;

export const ALLOWED_CONTACT_SUBJECTS = [
  "Signaler une erreur",
  "Suggestion d'amélioration",
  "Autre demande",
] as const;

export type AllowedContactSubject = (typeof ALLOWED_CONTACT_SUBJECTS)[number];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** Honeypot : doit rester vide */
  website?: string;
}

export interface ValidatedContactPayload {
  name: string;
  email: string;
  subject: AllowedContactSubject;
  message: string;
}

export type ContactValidationResult =
  | { ok: true; data: ValidatedContactPayload }
  | { ok: false; error: string };

function readEnv(key: string, fallback?: string): string {
  const raw = process.env[key] ?? fallback ?? "";
  return raw.trim().replace(/^["']|["']$/g, "");
}

/** Extrait l'adresse d'un champ "Nom <email@domaine.fr>" ou renvoie la valeur telle quelle */
export function extractEmailAddress(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/<([^>]+)>/);
  return (match ? match[1] : trimmed).trim();
}

export function parseRecipientList(value: string): string[] {
  return value
    .split(",")
    .map((entry) => extractEmailAddress(entry))
    .filter((entry) => EMAIL_PATTERN.test(entry));
}

export function normalizeFromAddress(value: string): string {
  const trimmed = value.trim().replace(/^["']|["']$/g, "");
  if (/<[^>]+>/.test(trimmed)) return trimmed;
  if (EMAIL_PATTERN.test(trimmed)) {
    return `Formulaire ${siteConfig.name} <${trimmed}>`;
  }
  return trimmed;
}

export function getContactRecipient(): string[] {
  // CONTACT_EMAIL (convention actuelle) ; CONTACT_TO_EMAIL conservé en secours
  const raw = readEnv("CONTACT_EMAIL") || readEnv("CONTACT_TO_EMAIL", siteConfig.contact.email);
  return parseRecipientList(raw);
}

export function getContactFromAddress(): string {
  return normalizeFromAddress(
    readEnv(
      "CONTACT_FROM_EMAIL",
      `Formulaire ${siteConfig.name} <contact@${siteConfig.domain}>`,
    ),
  );
}

export function getResendApiKey(): string {
  return readEnv("RESEND_API_KEY");
}

export function isHoneypotFilled(payload: ContactPayload): boolean {
  return Boolean(payload.website?.trim());
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateContactPayload(body: ContactPayload): ContactValidationResult {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name) return { ok: false, error: "Le nom est obligatoire." };
  if (name.length > CONTACT_LIMITS.name) {
    return { ok: false, error: `Le nom ne doit pas dépasser ${CONTACT_LIMITS.name} caractères.` };
  }

  if (!email) return { ok: false, error: "L'adresse e-mail est obligatoire." };
  if (email.length > CONTACT_LIMITS.email) {
    return { ok: false, error: `L'adresse e-mail ne doit pas dépasser ${CONTACT_LIMITS.email} caractères.` };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "L'adresse e-mail n'est pas valide." };
  }

  if (!subject) return { ok: false, error: "Veuillez choisir un sujet valide." };
  if (subject.length > CONTACT_LIMITS.subject) {
    return { ok: false, error: `Le sujet ne doit pas dépasser ${CONTACT_LIMITS.subject} caractères.` };
  }
  if (!ALLOWED_CONTACT_SUBJECTS.includes(subject as AllowedContactSubject)) {
    return { ok: false, error: "Veuillez choisir un sujet valide." };
  }

  if (!message) return { ok: false, error: "Le message est obligatoire." };
  if (message.length > CONTACT_LIMITS.message) {
    return {
      ok: false,
      error: `Le message ne doit pas dépasser ${CONTACT_LIMITS.message} caractères.`,
    };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      subject: subject as AllowedContactSubject,
      message,
    },
  };
}

export function buildContactEmailContent(data: ValidatedContactPayload) {
  const subject = `[Nouveau contact ${siteConfig.name}] ${data.subject}`;

  const text = [
    `Nouveau message reçu depuis ${siteConfig.domain}`,
    "",
    "Nom :",
    data.name,
    "",
    "Adresse e-mail :",
    data.email,
    "",
    "Sujet :",
    data.subject,
    "",
    "Message :",
    data.message,
  ].join("\n");

  const html = [
    `<p>Nouveau message reçu depuis ${escapeHtml(siteConfig.domain)}</p>`,
    `<p><strong>Nom :</strong><br>${escapeHtml(data.name)}</p>`,
    `<p><strong>Adresse e-mail :</strong><br>${escapeHtml(data.email)}</p>`,
    `<p><strong>Sujet :</strong><br>${escapeHtml(data.subject)}</p>`,
    `<p><strong>Message :</strong></p>`,
    `<p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`,
  ].join("");

  return { subject, text, html };
}

/** Vérifie Origin / Referer lorsque présents (requêtes cross-site). */
export function isTrustedContactOrigin(request: Request, siteUrl: string): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (!origin && !referer) {
    // Certains clients ommettent Origin ; on n'bloque pas systématiquement.
    return true;
  }

  const allowed = siteUrl.replace(/\/$/, "");
  if (origin) {
    return origin === allowed || origin.startsWith(`${allowed}/`);
  }
  if (referer) {
    return referer.startsWith(allowed);
  }
  return true;
}
