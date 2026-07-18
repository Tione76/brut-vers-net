/**
 * Émet un unique script JSON-LD (document @graph).
 * Côté serveur uniquement : aucune logique client.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
