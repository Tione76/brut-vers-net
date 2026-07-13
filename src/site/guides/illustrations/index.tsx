/** Rendu provisoire des illustrations de guides (contenu à venir) */
export function GuideIllustration({ id, caption }: { id: string; caption?: string }) {
  return (
    <figure>
      <div className="prose-figure__placeholder" aria-hidden="true">
        Illustration à venir : {id}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
