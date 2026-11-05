"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { PARTNER_GALLERY_EXAMPLES, type PartnerGalleryExample } from "./mockups";

function PointIcon({ name }: { name: PartnerGalleryExample["points"][number]["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 18,
    height: 18,
    fill: "none",
    "aria-hidden": true as const,
    focusable: false as const,
  };

  if (name === "mobile") {
    return (
      <svg {...common}>
        <rect x="8" y="3.5" width="8" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M11 17.5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "layers") {
    return (
      <svg {...common}>
        <path
          d="m4.5 9 7.5 4 7.5-4M4.5 13l7.5 4 7.5-4M4.5 5l7.5 4 7.5-4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "compact") {
    return (
      <svg {...common}>
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3.5" y="5" width="17" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 19h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function PartnerGallery() {
  const labelId = useId();
  const tablistId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const expandRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const total = PARTNER_GALLERY_EXAMPLES.length;
  const current = PARTNER_GALLERY_EXAMPLES[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const showPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const showNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const lightboxPrev = useCallback(() => {
    setOpenIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;
      return (currentIndex - 1 + total) % total;
    });
  }, [total]);

  const lightboxNext = useCallback(() => {
    setOpenIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;
      return (currentIndex + 1) % total;
    });
  }, [total]);

  const close = useCallback(() => {
    setOpenIndex((currentIndex) => {
      if (currentIndex !== null) {
        setActiveIndex(currentIndex);
        Promise.resolve().then(() => expandRef.current?.focus());
      }
      return null;
    });
  }, []);

  const openLightbox = useCallback(() => {
    setOpenIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (openIndex === null) return;

    const html = document.documentElement;
    const { body } = document;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        lightboxPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        lightboxNext();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, close, lightboxPrev, lightboxNext]);

  function onTabKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") {
      return;
    }
    event.preventDefault();
    let next = activeIndex;
    if (event.key === "ArrowRight") next = (activeIndex + 1) % total;
    if (event.key === "ArrowLeft") next = (activeIndex - 1 + total) % total;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = total - 1;
    goTo(next);
    Promise.resolve().then(() => tabRefs.current[next]?.focus());
  }

  const lightboxActive = openIndex === null ? null : PARTNER_GALLERY_EXAMPLES[openIndex];
  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <>
      <div className="partner-tabs">
        <div className="partner-tabs__toolbar">
          <div
            className="partner-tabs__list"
            role="tablist"
            id={tablistId}
            aria-label="Exemples de formats"
            onKeyDown={onTabKeyDown}
          >
            {PARTNER_GALLERY_EXAMPLES.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${tablistId}-tab-${item.id}`}
                  className={`partner-tabs__tab${selected ? " is-active" : ""}`}
                  aria-selected={selected}
                  aria-controls={`${tablistId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => goTo(index)}
                >
                  {item.tabLabel}
                </button>
              );
            })}
          </div>

          <div className="partner-tabs__controls">
            <p className="partner-tabs__count" aria-live="polite">
              {counter}
            </p>
            <button
              type="button"
              className="partner-tabs__nav"
              onClick={showPrev}
              aria-label="Exemple précédent"
            >
              ←
            </button>
            <button
              type="button"
              className="partner-tabs__nav"
              onClick={showNext}
              aria-label="Exemple suivant"
            >
              →
            </button>
          </div>
        </div>

        <div
          className="partner-tabs__panel"
          role="tabpanel"
          id={`${tablistId}-panel`}
          aria-labelledby={`${tablistId}-tab-${current.id}`}
        >
          <div
            className={`partner-tabs__preview partner-tabs__preview--${current.orientation} partner-tabs__preview--animate`}
          >
            <Image
              key={current.id}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              className="partner-tabs__img"
              sizes="(max-width: 899px) 100vw, 640px"
              priority={activeIndex === 0}
            />
          </div>

          <div className="partner-tabs__aside">
            <h3 className="partner-tabs__aside-title">{current.panelTitle}</h3>
            <p className="partner-tabs__aside-text">{current.panelDescription}</p>
            <ul className="partner-tabs__points">
              {current.points.map((point) => (
                <li key={point.title} className="partner-tabs__point">
                  <span className="partner-tabs__point-icon" aria-hidden="true">
                    <PointIcon name={point.icon} />
                  </span>
                  <span>
                    <strong>{point.title}</strong>
                    <span className="partner-tabs__point-text">{point.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <button
              ref={expandRef}
              type="button"
              className="partner-tabs__expand"
              onClick={openLightbox}
            >
              Agrandir la maquette <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>

      {lightboxActive && openIndex !== null ? (
        <div className="partner-lightbox" role="presentation" onClick={close}>
          <div
            ref={dialogRef}
            className="partner-lightbox__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="partner-lightbox__toolbar">
              <p id={labelId} className="partner-lightbox__caption">
                {lightboxActive.caption}
              </p>
              <p className="partner-lightbox__count" aria-live="polite">
                {String(openIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <button
                ref={closeRef}
                type="button"
                className="partner-lightbox__close"
                onClick={close}
              >
                Fermer
              </button>
            </div>

            <div className="partner-lightbox__stage">
              <button
                type="button"
                className="partner-lightbox__nav partner-lightbox__nav--prev"
                onClick={lightboxPrev}
                aria-label="Maquette précédente"
              >
                ←
              </button>
              <div className="partner-lightbox__scroll">
                <Image
                  src={lightboxActive.src}
                  alt={lightboxActive.alt}
                  width={lightboxActive.width}
                  height={lightboxActive.height}
                  className="partner-lightbox__img"
                  sizes="100vw"
                  priority
                />
              </div>
              <button
                type="button"
                className="partner-lightbox__nav partner-lightbox__nav--next"
                onClick={lightboxNext}
                aria-label="Maquette suivante"
              >
                →
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
