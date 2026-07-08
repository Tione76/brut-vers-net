import { NextResponse } from "next/server";

const ALLOWED_SUBJECTS = [
  "Signaler une erreur",
  "Suggestion d'amélioration",
  "Autre demande",
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ResendErrorBody {
  statusCode?: number;
  name?: string;
  message?: string;
}

function readEnv(key: string, fallback?: string): string {
  const raw = process.env[key] ?? fallback ?? "";
  return raw.trim().replace(/^["']|["']$/g, "");
}

/** Extrait l'adresse d'un champ "Nom <email@domaine.fr>" ou renvoie la valeur telle quelle */
function extractEmailAddress(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/<([^>]+)>/);
  return (match ? match[1] : trimmed).trim();
}

function parseRecipientList(value: string): string[] {
  return value
    .split(",")
    .map((entry) => extractEmailAddress(entry))
    .filter((entry) => EMAIL_PATTERN.test(entry));
}

function normalizeFromAddress(value: string): string {
  const trimmed = value.trim().replace(/^["']|["']$/g, "");
  if (/<[^>]+>/.test(trimmed)) return trimmed;
  if (EMAIL_PATTERN.test(trimmed)) return `HT-VERS-TTC.FR <${trimmed}>`;
  return trimmed;
}

function validatePayload(body: ContactPayload) {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name) return { error: "Le nom est obligatoire." };
  if (!email) return { error: "L'adresse e-mail est obligatoire." };
  if (!EMAIL_PATTERN.test(email)) return { error: "L'adresse e-mail n'est pas valide." };
  if (!subject || !ALLOWED_SUBJECTS.includes(subject as (typeof ALLOWED_SUBJECTS)[number])) {
    return { error: "Veuillez choisir un sujet valide." };
  }
  if (!message) return { error: "Le message est obligatoire." };

  return { name, email, subject, message };
}

async function readResendError(response: Response): Promise<ResendErrorBody & { raw?: string }> {
  const raw = await response.text();
  try {
    return JSON.parse(raw) as ResendErrorBody;
  } catch (parseError) {
    return {
      message: parseError instanceof Error ? parseError.message : "Réponse Resend illisible",
      raw,
    };
  }
}

export async function POST(request: Request) {
  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY manquante");
    return NextResponse.json(
      { error: "Le service d'envoi n'est pas configuré. Écrivez-nous à contact@ht-vers-ttc.fr." },
      { status: 503 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch (error) {
    console.error("[contact] Corps JSON invalide", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const validated = validatePayload(body);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const { name, email, subject, message } = validated;
  const to = parseRecipientList(readEnv("CONTACT_TO_EMAIL", "contact@ht-vers-ttc.fr"));
  const from = normalizeFromAddress(
    readEnv("CONTACT_FROM_EMAIL", "HT-VERS-TTC.FR <noreply@ht-vers-ttc.fr>"),
  );

  if (to.length === 0) {
    console.error("[contact] CONTACT_TO_EMAIL invalide", {
      contactToEmail: readEnv("CONTACT_TO_EMAIL"),
    });
    return NextResponse.json(
      { error: "Configuration destinataire invalide. Écrivez-nous à contact@ht-vers-ttc.fr." },
      { status: 500 },
    );
  }

  const payload = {
    from,
    to,
    reply_to: [email],
    subject: `[Contact HT-VERS-TTC.FR] ${subject}`,
    text: [`Nom : ${name}`, `E-mail : ${email}`, `Sujet : ${subject}`, "", message].join("\n"),
  };

  console.info("[contact] Envoi Resend", { from, to, replyTo: email, subject: payload.subject });

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[contact] Échec réseau vers Resend", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      from,
      to,
    });
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez plus tard ou écrivez-nous directement par e-mail." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const resendError = await readResendError(response);
    console.error("[contact] Erreur Resend", {
      httpStatus: response.status,
      httpStatusText: response.statusText,
      from,
      to,
      resendStatusCode: resendError.statusCode,
      resendName: resendError.name,
      resendMessage: resendError.message,
      resendRaw: resendError.raw,
    });

    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez plus tard ou écrivez-nous directement par e-mail." },
      { status: 502 },
    );
  }

  const result = (await response.json()) as { id?: string };
  console.info("[contact] E-mail envoyé", { id: result.id, to });

  return NextResponse.json({ success: true });
}
