"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CONTACT_ERROR_MESSAGE,
  CONTACT_LIMITS,
  CONTACT_SUCCESS_MESSAGE,
  PARTNERSHIP_CONTACT_SUBJECT,
} from "@/site/contact/contact-mail";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<
  Record<"name" | "company" | "email" | "project" | "siteUrl" | "budget" | "period", string>
>;

function buildPartnershipMessage(input: {
  company: string;
  siteUrl: string;
  budget: string;
  period: string;
  project: string;
}): string {
  const lines = [
    "Proposition de partenariat — Brut-vers-net.fr",
    "",
    `Entreprise ou marque : ${input.company}`,
  ];

  if (input.siteUrl) {
    lines.push(`Site internet : ${input.siteUrl}`);
  }
  if (input.budget) {
    lines.push(`Budget indicatif : ${input.budget}`);
  }
  if (input.period) {
    lines.push(`Période ou dates envisagées : ${input.period}`);
  }

  lines.push("", "Projet :", input.project);
  return lines.join("\n");
}

export function PartnershipForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [budget, setBudget] = useState("");
  const [period, setPeriod] = useState("");
  const [project, setProject] = useState("");
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
    const trimmedCompany = company.trim();
    const trimmedEmail = email.trim();
    const trimmedProject = project.trim();
    const trimmedSite = siteUrl.trim();

    if (!trimmedName) errors.name = "Le nom et le prénom sont obligatoires.";
    else if (trimmedName.length > CONTACT_LIMITS.name) {
      errors.name = `Le nom ne doit pas dépasser ${CONTACT_LIMITS.name} caractères.`;
    }

    if (!trimmedCompany) errors.company = "L'entreprise ou la marque est obligatoire.";
    else if (trimmedCompany.length > 150) {
      errors.company = "L'entreprise ou la marque ne doit pas dépasser 150 caractères.";
    }

    if (!trimmedEmail) {
      errors.email = "L'adresse e-mail est obligatoire.";
    } else if (trimmedEmail.length > CONTACT_LIMITS.email) {
      errors.email = `L'adresse e-mail ne doit pas dépasser ${CONTACT_LIMITS.email} caractères.`;
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      errors.email = "L'adresse e-mail n'est pas valide.";
    }

    if (trimmedSite && trimmedSite.length > 300) {
      errors.siteUrl = "Le site internet ne doit pas dépasser 300 caractères.";
    }

    if (budget.trim().length > 120) {
      errors.budget = "Le budget indicatif ne doit pas dépasser 120 caractères.";
    }

    if (period.trim().length > 120) {
      errors.period = "La période ne doit pas dépasser 120 caractères.";
    }

    if (!trimmedProject) errors.project = "La description du projet est obligatoire.";
    else if (trimmedProject.length > CONTACT_LIMITS.message - 400) {
      errors.project = "La description du projet est trop longue.";
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

    const message = buildPartnershipMessage({
      company: company.trim(),
      siteUrl: siteUrl.trim(),
      budget: budget.trim(),
      period: period.trim(),
      project: project.trim(),
    });

    if (message.length > CONTACT_LIMITS.message) {
      setFormError("Le message composé dépasse la longueur maximale autorisée.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: PARTNERSHIP_CONTACT_SUBJECT,
          message,
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
      setCompany("");
      setEmail("");
      setSiteUrl("");
      setBudget("");
      setPeriod("");
      setProject("");
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
        {success ? (
          <p className="ds-form-feedback ds-form-feedback--success" role="status">
            {CONTACT_SUCCESS_MESSAGE}
          </p>
        ) : null}

        {formError ? (
          <p className="ds-form-feedback ds-form-feedback--error" role="alert">
            {formError}
          </p>
        ) : null}
      </div>

      <form
        className="ds-form partnership-form"
        onSubmit={handleSubmit}
        noValidate
        data-clarity-mask="true"
      >
        <div className="ds-hp" aria-hidden="true">
          <label htmlFor="partner-website">Site web</label>
          <input
            id="partner-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="partnership-form__grid">
          <div>
            <label htmlFor="partner-name" className="ds-field-label">
              Nom et prénom
            </label>
            <input
              id="partner-name"
              type="text"
              name="name"
              autoComplete="name"
              required
              maxLength={CONTACT_LIMITS.name}
              className="ds-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "partner-name-error" : undefined}
            />
            {fieldErrors.name ? (
              <p id="partner-name-error" className="ds-field-error" role="alert">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="partner-company" className="ds-field-label">
              Entreprise ou marque
            </label>
            <input
              id="partner-company"
              type="text"
              name="company"
              autoComplete="organization"
              required
              maxLength={150}
              className="ds-input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              aria-invalid={Boolean(fieldErrors.company)}
              aria-describedby={fieldErrors.company ? "partner-company-error" : undefined}
            />
            {fieldErrors.company ? (
              <p id="partner-company-error" className="ds-field-error" role="alert">
                {fieldErrors.company}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="partner-email" className="ds-field-label">
              Adresse e-mail
            </label>
            <input
              id="partner-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={CONTACT_LIMITS.email}
              className="ds-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "partner-email-error" : undefined}
            />
            {fieldErrors.email ? (
              <p id="partner-email-error" className="ds-field-error" role="alert">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="partner-site" className="ds-field-label">
              Site internet <span className="partnership-form__optional">(facultatif)</span>
            </label>
            <input
              id="partner-site"
              type="url"
              name="siteUrl"
              autoComplete="url"
              maxLength={300}
              className="ds-input"
              placeholder="https://"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              aria-invalid={Boolean(fieldErrors.siteUrl)}
              aria-describedby={fieldErrors.siteUrl ? "partner-site-error" : undefined}
            />
            {fieldErrors.siteUrl ? (
              <p id="partner-site-error" className="ds-field-error" role="alert">
                {fieldErrors.siteUrl}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="partner-budget" className="ds-field-label">
              Budget indicatif <span className="partnership-form__optional">(facultatif)</span>
            </label>
            <input
              id="partner-budget"
              type="text"
              name="budget"
              maxLength={120}
              className="ds-input"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              aria-invalid={Boolean(fieldErrors.budget)}
              aria-describedby={fieldErrors.budget ? "partner-budget-error" : undefined}
            />
            {fieldErrors.budget ? (
              <p id="partner-budget-error" className="ds-field-error" role="alert">
                {fieldErrors.budget}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="partner-period" className="ds-field-label">
              Période ou dates envisagées{" "}
              <span className="partnership-form__optional">(facultatif)</span>
            </label>
            <input
              id="partner-period"
              type="text"
              name="period"
              maxLength={120}
              className="ds-input"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              aria-invalid={Boolean(fieldErrors.period)}
              aria-describedby={fieldErrors.period ? "partner-period-error" : undefined}
            />
            {fieldErrors.period ? (
              <p id="partner-period-error" className="ds-field-error" role="alert">
                {fieldErrors.period}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="partner-project" className="ds-field-label">
            Votre projet
          </label>
          <textarea
            id="partner-project"
            name="project"
            className="ds-textarea partnership-form__project"
            required
            maxLength={CONTACT_LIMITS.message - 400}
            value={project}
            onChange={(e) => setProject(e.target.value)}
            aria-invalid={Boolean(fieldErrors.project)}
            aria-describedby={fieldErrors.project ? "partner-project-error" : undefined}
          />
          {fieldErrors.project ? (
            <p id="partner-project-error" className="ds-field-error" role="alert">
              {fieldErrors.project}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className="ds-btn ds-btn--primary partnership-form__submit"
          disabled={submitting}
          aria-disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? "Envoi en cours…" : "Envoyer ma proposition"}
          {!submitting ? <span aria-hidden="true"> →</span> : null}
        </button>
      </form>

      <p className="ds-form-trust partnership-form__trust">
        Les informations transmises sont utilisées pour répondre à votre demande de partenariat.
        Consultez notre{" "}
        <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>
    </>
  );
}
