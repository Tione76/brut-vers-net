"use client";

/**
 * Lien d'évitement : le focus doit arriver sur #main-content.
 * Sans tabindex=-1 sur <main>, le navigateur suit le hash mais laisse le focus sur <body>.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-[150] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-primary focus:text-text-inverse focus:text-sm"
      onClick={() => {
        const main = document.getElementById("main-content");
        if (!main) return;
        if (!main.hasAttribute("tabindex")) {
          main.setAttribute("tabindex", "-1");
        }
        window.setTimeout(() => {
          main.focus({ preventScroll: false });
        }, 0);
      }}
    >
      Aller au contenu principal
    </a>
  );
}
