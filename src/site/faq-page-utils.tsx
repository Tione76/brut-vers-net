import Link from "next/link";
import type { FaqAnswerSegment } from "./faq-page-data";

export function answerToPlainText(segments: FaqAnswerSegment[]): string {
  return segments
    .map((seg) => (typeof seg === "string" ? seg : seg.link))
    .join("");
}

export function renderFaqAnswer(segments: FaqAnswerSegment[]) {
  return (
    <p>
      {segments.map((seg, index) =>
        typeof seg === "string" ? (
          <span key={index}>{seg}</span>
        ) : (
          <Link key={index} href={seg.href}>
            {seg.link}
          </Link>
        ),
      )}
    </p>
  );
}
