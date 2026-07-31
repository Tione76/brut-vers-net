"use client";

import { useEffect, useId, useRef, useState } from "react";
import "./share-block.css";

export type ShareBlockVariant = "onBrand" | "onLight";

export type ShareContentType = "calculator" | "guide" | "faq" | "fiche" | "content";

export type ShareBlockProps = {
  /** URL canonique absolue de la page (sans query ni hash). */
  url: string;
  /** Titre utilisé pour les intents de partage et la Web Share API. */
  title: string;
  /** Description optionnelle (Web Share API / texte WhatsApp). */
  description?: string;
  /** Libellé affiché au-dessus des actions. */
  heading?: string;
  /** Phrase d'accompagnement optionnelle (omis par défaut). */
  subheading?: string;
  /** Libellé du CTA Web Share (mobile). */
  nativeLabel?: string;
  /**
   * `onBrand` : fond orange (header calculateur).
   * `onLight` : fond blanc / éditorial.
   */
  variant?: ShareBlockVariant;
  /** Adapte le libellé par défaut (ex. « Partager ce guide »). */
  contentType?: ShareContentType;
};

const CONTENT_TYPE_LABELS: Record<ShareContentType, string> = {
  calculator: "Partager ce calculateur",
  guide: "Partager ce guide",
  faq: "Partager cette FAQ",
  fiche: "Partager cette fiche",
  content: "Partager",
};

const DEFAULT_HEADING = "Partager";
const DEFAULT_NATIVE_LABEL = "Partager";

type ShareMode = "pending" | "native" | "buttons";

function buildShareLinks(url: string, title: string, description?: string) {
  const text = description?.trim() ? `${title}\n${description}` : title;
  const whatsappText = `${text}\n${url}`;

  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  } as const;
}

function IconWhatsApp(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.98.58 3.82 1.58 5.38L2 22l4.94-1.63a9.86 9.86 0 0 0 5.1 1.4h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.5 13.99c-.23.65-1.34 1.2-1.86 1.27-.48.07-1.1.1-1.77-.11-.41-.13-.93-.3-1.6-.59-2.82-1.22-4.66-4.07-4.8-4.26-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.36.26-.28.57-.35.76-.35h.55c.17 0 .41-.06.64.49.23.56.79 1.93.86 2.07.07.14.12.3.02.49-.09.19-.14.3-.28.47-.14.16-.3.36-.42.49-.14.14-.28.29-.12.56.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.63-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.7-.16 1.35Z"
      />
    </svg>
  );
}

function IconFacebook(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14 8.2V6.6c0-.7.1-1.1 1.1-1.1H16.5V3h-2.2C11.7 3 10.8 4.5 10.8 6.4v1.8H9v2.6h1.8V21h3.2v-9.2H16l.4-2.6H14Z"
      />
    </svg>
  );
}

function IconLinkedIn(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6.4 9.2H3.7V20h2.7V9.2ZM5 3.8a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20.3 20h-2.7v-5.6c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.7-1.8 1.3-.1.2-.1.5-.1.8V20h-2.7s.1-9.3 0-10.2h2.7v1.6c.4-.6 1.2-1.9 3.1-1.9 2.3 0 4 1.5 4 4.8V20Z"
      />
    </svg>
  );
}

function IconX(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M17.6 3H20l-6.2 7.1L21 21h-5.5l-4.3-6.3L6.2 21H4l6.7-7.6L3 3h5.6l3.9 5.8L17.6 3Zm-1 16.3h1.5L7.5 4.6H5.9l10.7 14.7Z"
      />
    </svg>
  );
}

function IconLink(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M10.6 13.4a3.6 3.6 0 0 1 0-5.1l2.1-2.1a3.6 3.6 0 1 1 5.1 5.1l-1 1a.9.9 0 0 1-1.3-1.3l1-1a1.8 1.8 0 1 0-2.5-2.5l-2.1 2.1a1.8 1.8 0 0 0 0 2.5.9.9 0 1 1-1.3 1.3Zm2.8-2.8a.9.9 0 0 1 1.3 0 3.6 3.6 0 0 1 0 5.1l-2.1 2.1a3.6 3.6 0 1 1-5.1-5.1l1-1a.9.9 0 1 1 1.3 1.3l-1 1a1.8 1.8 0 1 0 2.5 2.5l2.1-2.1a1.8 1.8 0 0 0 0-2.5.9.9 0 0 1 0-1.3Z"
      />
    </svg>
  );
}

function IconShare(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M18 16.1a2.9 2.9 0 0 0-2 .8l-6.3-3.7a3 3 0 0 0 0-1.4L16 8.1a2.9 2.9 0 1 0-.9-1.5L8.8 10.2a3 3 0 1 0 0 3.6l6.3 3.7a2.9 2.9 0 1 0 2.9-1.4Z"
      />
    </svg>
  );
}

/**
 * Bloc de partage réutilisable (calculateurs, guides, pages SEO…).
 * Mobile : Web Share API si disponible, sinon barre d'actions.
 * Desktop : barre discrète WhatsApp / Facebook / LinkedIn / X / Copier.
 */
export function ShareBlock({
  url,
  title,
  description,
  heading,
  subheading,
  nativeLabel,
  variant = "onBrand",
  contentType,
}: ShareBlockProps) {
  const typeLabel = contentType ? CONTENT_TYPE_LABELS[contentType] : undefined;
  const resolvedHeading = heading ?? typeLabel ?? DEFAULT_HEADING;
  const resolvedNativeLabel = nativeLabel ?? typeLabel ?? DEFAULT_NATIVE_LABEL;
  const headingId = useId();
  const [mode, setMode] = useState<ShareMode>("pending");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = buildShareLinks(url, title, description);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const sync = () => {
      const canNative = typeof navigator.share === "function";
      setMode(mobileQuery.matches && canNative ? "native" : "buttons");
    };
    sync();
    mobileQuery.addEventListener("change", sync);
    return () => mobileQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  async function handleNativeShare() {
    try {
      await navigator.share({
        title,
        text: description,
        url,
      });
    } catch {
      /* Annulation utilisateur : silencieux */
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  const showNative = mode === "native";
  const showButtons = mode !== "native";
  const rootClass = [
    "share-block",
    variant === "onLight" ? "share-block--on-light" : null,
    showNative ? "share-block--native" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={rootClass} aria-labelledby={headingId}>
      <p id={headingId} className="share-block__heading">
        {resolvedHeading}
      </p>
      {subheading ? <p className="share-block__subheading">{subheading}</p> : null}

      {showNative ? (
        <button type="button" className="share-block__native" onClick={handleNativeShare}>
          <IconShare className="share-block__native-icon" />
          <span>{resolvedNativeLabel}</span>
        </button>
      ) : null}

      {showButtons ? (
        <ul className="share-block__actions" aria-label="Options de partage">
          <li>
            <a
              className="share-block__action share-block__action--icon"
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager sur WhatsApp"
            >
              <IconWhatsApp className="share-block__icon" />
            </a>
          </li>
          <li>
            <a
              className="share-block__action share-block__action--icon"
              href={links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager sur Facebook"
            >
              <IconFacebook className="share-block__icon" />
            </a>
          </li>
          <li>
            <a
              className="share-block__action share-block__action--icon"
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager sur LinkedIn"
            >
              <IconLinkedIn className="share-block__icon" />
            </a>
          </li>
          <li>
            <a
              className="share-block__action share-block__action--icon"
              href={links.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager sur X"
            >
              <IconX className="share-block__icon" />
            </a>
          </li>
          <li>
            <button
              type="button"
              className={`share-block__action share-block__action--copy${copied ? " is-copied" : ""}`}
              onClick={handleCopy}
              aria-live="polite"
            >
              <IconLink className="share-block__icon" />
              <span>{copied ? "Lien copié" : "Copier le lien"}</span>
            </button>
          </li>
        </ul>
      ) : null}
    </section>
  );
}
