import type { Guide } from "./types";
import { attachGuideCover } from "./covers";
import { commentCalculerSonSalaireNetGuide } from "./data/comment-calculer-son-salaire-net";
import { commentEstCalculeLeSalaireNetGuide } from "./data/comment-est-calcule-le-salaire-net";
import { commentLireUneFicheDePaieGuide } from "./data/comment-lire-une-fiche-de-paie";
import { cotisationsSalarialesGuide } from "./data/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";
import { prelevementALaSourceGuide } from "./data/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
import { pourquoiSalaireNetChangeSeptembre2026Guide } from "./data/pourquoi-salaire-net-change-septembre-2026";
import { smicGuide } from "./data/smic";
import { smicSelonNombreHeuresGuide } from "./data/smic-selon-nombre-heures";
import { smicHotelierGuide } from "./data/smic-hotelier";
import { smicEuropeGuide } from "./data/smic-europe";
import { evolutionSmicGuide } from "./data/evolution-smic";
import { salaireInterimGuide } from "./data/salaire-interim-calcul-brut-net";
import { salaireArretMaladieGuide } from "./data/salaire-arret-maladie";
import { calculIjssArretMaladieGuide } from "./data/calcul-ijss-arret-maladie";
import { maintienSalaireArretMaladieGuide } from "./data/maintien-salaire-arret-maladie";
import { quelEstUnBonSalaireEnFranceGuide } from "./data/quel-est-un-bon-salaire-en-france";
import { salaireAlternanceGuide } from "./data/salaire-alternance";
import { salaireMoyenFranceGuide } from "./data/salaire-moyen-france";
import { primeActiviteGuide } from "./data/prime-activite";
import { primeDeNoelGuide } from "./data/prime-de-noel";
import { soldeDeToutCompteGuide } from "./data/solde-de-tout-compte";
import { congesPayesGuide } from "./data/conges-payes";
import { soldeCongesPayesGuide } from "./data/solde-conges-payes";
import { salaireMinimumAllemagneGuide } from "./data/salaire-minimum-allemagne";
import { salaireMinimumSuisseGuide } from "./data/salaire-minimum-suisse";
import { salaireMinimumLuxembourgGuide } from "./data/salaire-minimum-luxembourg";
import { salaireMinimumBelgiqueGuide } from "./data/salaire-minimum-belgique";
import { salaireMinimumEspagneGuide } from "./data/salaire-minimum-espagne";

export { getGuidePublicPath } from "./paths";

/** Guides publiés */
export const guides: Guide[] = [
  attachGuideCover(smicGuide),
  attachGuideCover(smicSelonNombreHeuresGuide),
  attachGuideCover(smicHotelierGuide),
  attachGuideCover(smicEuropeGuide),
  attachGuideCover(salaireMinimumAllemagneGuide),
  attachGuideCover(salaireMinimumSuisseGuide),
  attachGuideCover(salaireMinimumLuxembourgGuide),
  attachGuideCover(salaireMinimumBelgiqueGuide),
  attachGuideCover(salaireMinimumEspagneGuide),
  attachGuideCover(evolutionSmicGuide),
  attachGuideCover(salaireInterimGuide),
  attachGuideCover(salaireArretMaladieGuide),
  attachGuideCover(calculIjssArretMaladieGuide),
  attachGuideCover(maintienSalaireArretMaladieGuide),
  attachGuideCover(salaireAlternanceGuide),
  attachGuideCover(salaireMoyenFranceGuide),
  attachGuideCover(quelEstUnBonSalaireEnFranceGuide),
  attachGuideCover(commentEstCalculeLeSalaireNetGuide),
  attachGuideCover(commentLireUneFicheDePaieGuide),
  attachGuideCover(commentCalculerSonSalaireNetGuide),
  attachGuideCover(cotisationsSalarialesGuide),
  attachGuideCover(prelevementALaSourceGuide),
  attachGuideCover(pourquoiSalaireNetChangeSeptembre2026Guide),
  attachGuideCover(primeActiviteGuide),
  attachGuideCover(primeDeNoelGuide),
  attachGuideCover(soldeDeToutCompteGuide),
  attachGuideCover(congesPayesGuide),
  attachGuideCover(soldeCongesPayesGuide),
];

export const GUIDE_MODEL_SLUG = "modele";

export function getGuideBySlug(slug: string): Guide | undefined {
  if (slug === GUIDE_MODEL_SLUG) return undefined;
  return guides.find((guide) => guide.slug === slug);
}

export function getPublishedGuideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}

export function getAllGuideSlugs(): string[] {
  return getPublishedGuideSlugs();
}
