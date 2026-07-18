"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CONTACT_ERROR_MESSAGE,
  CONTACT_LIMITS,
  CONTACT_SUCCESS_MESSAGE,
} from "@/site/contact/contact-mail";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactFormProps {
  subjects: string[];
  trustNote: string;
}

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function ContactForm({ subjects, trustNote }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((success || formError) && feedbackRef.current) {
      feedbackRef.current.focus();
    }
  }, [success, formError]);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) errors.name = "Le nom est obligatoire.";
    else if (trimmedName.length > CONTACT_LIMITS.name) {
      errors.name = `Le nom ne doit pas dépasser ${CONTACT_LIMITS.name} caractères.`;
    }

    if (!trimmedEmail) {
      errors.email = "L'adresse e-mail est obligatoire.";
    } else if (trimmedEmail.length > CONTACT_LIMITS.email) {
      errors.email = `L'adresse e-mail ne doit pas dépasser ${CONTACT_LIMITS.email} caractères.`;
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      errors.email = "L'adresse e-mail n'est pas valide.";
    }

    if (!subject) errors.subject = "Veuillez choisir un sujet.";
    else if (subject.length > CONTACT_LIMITS.subject) {
      errors.subject = `Le sujet ne doit pas dépasser ${CONTACT_LIMITS.subject} caractères.`;
    }

    if (!trimmedMessage) errors.message = "Le message est obligatoire.";
    else if (trimmedMessage.length > CONTACT_LIMITS.message) {
      errors.message = `Le message ne doit pas dépasser ${CONTACT_LIMITS.message} caractères.`;
    }

    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setFormError(null);
    setSuccess(false);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject,
          message: message.trim(),
          website,
        }),
      });

      const data = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        setFormError(data.error ?? CONTACT_ERROR_MESSAGE);
        return;
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setWebsite("");
      setFieldErrors({});
    } catch {
      setFormError(CONTACT_ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div
        ref={feedbackRef}
        tabIndex={-1}
        className="ds-form-feedback-region"
        aria-live="polite"
        aria-atomic="true"
      >
        {success && (
          <p className="ds-form-feedback ds-form-feedback--success" role="status">
            {CONTACT_SUCCESS_MESSAGE}
          </p>
        )}

        {formError && (
          <p className="ds-form-feedback ds-form-feedback--error" role="alert">
            {formError}
          </p>
        )}
      </div>

      <form className="ds-form" onSubmit={handleSubmit} noValidate>
        <div className="ds-hp" aria-hidden="true">
          <label htmlFor="contact-website">Site web</label>
          <input
            id="contact-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="contact-name" className="ds-field-label">
            Nom
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            maxLength={CONTACT_LIMITS.name}
            className="ds-input"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          />
          {fieldErrors.name && (
            <p id="contact-name-error" className="ds-field-error" role="alert">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="ds-field-label">
            Adresse e-mail
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={CONTACT_LIMITS.email}
            className="ds-input"
            placeholder="Votre adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="contact-email-error" className="ds-field-error" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-subject" className="ds-field-label">
            Sujet
          </label>
          <select
            id="contact-subject"
            name="subject"
            className="ds-select"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            aria-invalid={Boolean(fieldErrors.subject)}
            aria-describedby={fieldErrors.subject ? "contact-subject-error" : undefined}
          >
            <option value="" disabled>
              Choisissez un sujet
            </option>
            {subjects.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {fieldErrors.subject && (
            <p id="contact-subject-error" className="ds-field-error" role="alert">
              {fieldErrors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className="ds-field-label">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            className="ds-textarea"
            placeholder="Décrivez votre demande"
            required
            maxLength={CONTACT_LIMITS.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          />
          {fieldErrors.message && (
            <p id="contact-message-error" className="ds-field-error" role="alert">
              {fieldErrors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="ds-btn ds-btn--primary"
          disabled={submitting}
          aria-disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? "Envoi en cours…" : "Envoyer"}
        </button>
      </form>

      <p className="ds-form-trust">{trustNote}</p>
    </>
  );
}
