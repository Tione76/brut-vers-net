import type { FaqItem } from "@/framework/types";
import type { GuideContextualCta, GuidePracticalCase } from "./types";

const euroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formate un montant en euros au format français (ex. « 1 200,00 € »). */
export function formatEuro(amount: number): string {
  return euroFormatter.format(amount);
}

function formatRatePct(ratePct: number): string {
  const label = Number.isInteger(ratePct)
    ? String(ratePct)
    : String(ratePct).replace(".", ",");
  return `${label} %`;
}

/** Construit un cas pratique avec TVA arrondie au centime (2 décimales). */
export function pc(
  title: string,
  ht: number,
  ratePct: number,
  note?: string,
): GuidePracticalCase {
  const vat = Math.round(ht * (ratePct / 100) * 100) / 100;
  const ttc = Math.round((ht + vat) * 100) / 100;

  return {
    type: "practical-case",
    title,
    ht: formatEuro(ht),
    rate: formatRatePct(ratePct),
    vat: formatEuro(vat),
    ttc: formatEuro(ttc),
    ...(note ? { note } : {}),
  };
}

export const CTA_CALCULATOR: GuideContextualCta = {
  type: "contextual-cta",
  text: "Vous voulez vérifier votre calcul ?",
  label: "Calculer immédiatement votre HT/TTC",
  href: "/",
};

export const PROFESSION_FAQ_ITEMS: { label: string; answer: string }[] = [
  {
    label: "Photographe",
    answer:
      "En principe, la séance photo, les retouches et la post-production relèvent du taux normal de 20 % (art. 278 du CGI). Les tirages, albums et supports imprimés sont en principe également à 20 % lorsqu'ils constituent une vente de biens distincte. La cession de droits d'auteur ou d'utilisation d'images est en principe taxée à 20 % en tant que prestation de service. La vente d'œuvres originales ou d'éditions limitées peut, selon leur qualification juridique, relever d'un autre régime — plusieurs taux peuvent coexister sur une même facture. Le métier de photographe n'impose pas un taux unique : chaque ligne doit être qualifiée selon la nature exacte de l'opération.",
  },
  {
    label: "Consultant",
    answer:
      "Les prestations de conseil, d'audit et d'accompagnement stratégique sont en principe taxées à 20 % (art. 278 du CGI). C'est le cas pour le conseil en management, en organisation ou en transformation. Si le consultant vend en annexe des formations, des ouvrages ou des licences, chaque opération peut relever d'un taux différent. Le statut de consultant ne détermine pas automatiquement le taux : seule la nature juridique de chaque prestation facturée compte.",
  },
  {
    label: "Développeur web",
    answer:
      "Le développement de sites, d'applications et la maintenance informatique relèvent en principe du taux normal de 20 % (art. 278 du CGI). La création sur mesure est une prestation de service, même lorsque le code est livré en ligne. En cas de vente de licences, d'abonnements SaaS ou de produits packagés, la qualification de l'opération peut varier — à vérifier ligne par ligne. Un développeur web peut donc facturer plusieurs taux selon ses opérations, sans que son métier n'impose un taux unique.",
  },
  {
    label: "Graphiste",
    answer:
      "Les prestations de design, d'identité visuelle et de mise en page sont en principe à 20 % (art. 278 du CGI). La vente d'impressions, de supports finis ou de fichiers livrables peut relever du même taux ou d'un autre selon la qualification de l'opération. La cession de droits sur des créations graphiques est en principe une prestation de service à 20 %. Le taux dépend de la nature exacte de chaque ligne facturée, pas du métier en lui-même.",
  },
  {
    label: "Freelance",
    answer:
      "Le statut de freelance n'impose aucun taux spécifique de TVA. En principe, les prestations intellectuelles et de service sont à 20 % (art. 278 du CGI). Un même freelance peut facturer 20 %, 10 % ou 5,5 % sur une même période si ses opérations relèvent de catégories différentes — conseil, livre, travaux éligibles, etc. C'est la nature de chaque opération, et non le statut d'indépendant, qui détermine le taux applicable.",
  },
  {
    label: "Artisan",
    answer:
      "Un artisan applique le taux correspondant à chaque opération, jamais un taux unique lié à son métier. Les travaux de rénovation sur un logement achevé depuis plus de deux ans sont en principe à 10 % (art. 279 du CGI), sous conditions. Les travaux neufs, les constructions de moins de deux ans et la vente de matériaux seuls relèvent en principe de 20 % (art. 278 du CGI). La facture doit préciser l'adresse du chantier et la nature des travaux — à vérifier chantier par chantier.",
  },
  {
    label: "Plombier",
    answer:
      "Les travaux de plomberie dans un logement achevé depuis plus de deux ans sont en principe à 10 %, sous conditions (art. 279, 1° du CGI). Les installations sur bâtiment neuf, les constructions de moins de deux ans et la seule vente de matériel sans pose sont en principe à 20 %. La distinction entre rénovation et neuf est déterminante : un plombier peut facturer les deux taux selon ses chantiers. Le métier ne suffit pas à choisir le taux — c'est la nature et le contexte de chaque intervention qui comptent.",
  },
  {
    label: "Électricien",
    answer:
      "Même logique que les autres artisans du bâtiment : rénovation dans un logement de plus de deux ans en principe à 10 %, travaux neufs ou sur construction de moins de deux ans en principe à 20 % (art. 278 et 279 du CGI). La pose de matériel électrique dans le cadre d'une rénovation éligible bénéficie du taux réduit ; la vente seule de composants reste en principe à 20 %. En cas de doute sur l'éligibilité au 10 %, la qualification exacte des travaux doit être vérifiée avant facturation.",
  },
  {
    label: "Peintre en bâtiment",
    answer:
      "Les travaux de peinture et de décoration dans le cadre de la rénovation d'un logement achevé depuis plus de deux ans sont en principe à 10 % (art. 279 du CGI). Les travaux sur construction neuve, les bâtiments de moins de deux ans et certains locaux professionnels relèvent en principe du taux normal de 20 %. Un peintre en bâtiment facture donc souvent des taux différents selon ses chantiers. À vérifier selon la nature des travaux, l'ancienneté du logement et l'adresse du chantier.",
  },
  {
    label: "Boucher",
    answer:
      "La vente de viandes et de produits de boucherie à emporter relève en principe du taux réduit de 5,5 % (art. 278-0 bis du CGI), dans la limite des produits éligibles. La restauration sur place ou la vente de plats préparés à consommer immédiatement peut relever de 10 % — selon la nature exacte de l'opération et le degré de transformation. Un boucher-charcutier-traiteur peut ainsi appliquer plusieurs taux sur une même période. Le métier ne détermine pas un taux automatique.",
  },
  {
    label: "Boulanger",
    answer:
      "La vente de pain et de produits de boulangerie de consommation courante est en principe à 5,5 % (art. 278-0 bis du CGI). La restauration sur place, certains produits transformés pour consommation immédiate ou la vente de plats chauds peuvent relever de 10 % selon les conditions. La distinction repose sur le produit vendu et le mode de consommation, pas sur le statut de boulanger. Chaque référence doit être rapprochée des listes légales — à vérifier selon le cas précis.",
  },
  {
    label: "Restaurateur",
    answer:
      "Les prestations de restauration consommées sur place sont en principe à 10 % (art. 279 du CGI). Les plats à emporter peuvent relever de 10 % sous conditions, tandis que la livraison de repas peut être traitée différemment selon la qualification de l'opération. Les boissons alcoolisées relèvent en principe du taux normal de 20 %, tout comme certains desserts ou boissons non alcoolisées selon leur mode de service. Un restaurateur ventile donc souvent plusieurs taux sur une même addition — le métier n'impose pas un taux unique.",
  },
  {
    label: "Hôtel",
    answer:
      "L'hébergement et la fourniture de repas dans le cadre hôtelier sont en principe à 10 %, sous conditions (art. 279 du CGI). Certains services annexes — téléphone, blanchisserie, location de salles, minibar — peuvent relever de 20 % selon leur qualification. Le petit-déjeuner inclus dans le séjour et les prestations de restauration sur place suivent en principe le taux intermédiaire. Chaque prestation doit être qualifiée individuellement : l'activité hôtelière ne garantit pas un taux unique.",
  },
  {
    label: "Location meublée",
    answer:
      "La location meublée à usage d'habitation relève en principe d'une exonération de TVA (art. 261 D du CGI). Les activités de para-hôtellerie ou de meublé de tourisme classé peuvent, sous conditions, être taxées à 10 % (art. 279 du CGI). La location nue ou la simple mise à disposition d'un logement meublé sans services para-hôteliers reste en principe hors champ ou exonérée. Le régime dépend de la qualification exacte de l'activité — à vérifier selon les services fournis et le classement éventuel.",
  },
  {
    label: "Formation",
    answer:
      "Les prestations de formation professionnelle sont en principe taxées à 20 % (art. 278 du CGI) lorsqu'elles constituent une opération taxable. Certaines actions dispensées par un organisme de formation agréé ou répondant à des critères légaux peuvent bénéficier d'une exonération ou d'un régime spécifique — sous conditions strictes. La distinction entre formation taxable et formation exonérée repose sur le statut de l'organisme, la nature du programme et le financement, pas sur le seul fait d'« être formateur ». À vérifier opération par opération.",
  },
  {
    label: "Livre papier",
    answer:
      "La vente de livres sur support papier relève du taux réduit de 5,5 % (art. 278-0 bis du CGI) pour les ouvrages éligibles tels que définis par la loi. Ce taux s'applique aux ouvrages imprimés répondant aux critères légaux de forme et de contenu. Certains produits connexes — objets dérivés, prestations de conseil, mise en page facturée séparément — peuvent relever de 20 %. Le métier d'éditeur ou de libraire n'impose pas un taux unique : chaque ligne doit être qualifiée.",
  },
  {
    label: "Ebook",
    answer:
      "Les livres numériques et publications électroniques assimilées relèvent en principe du taux réduit de 5,5 % (art. 278-0 bis du CGI), dans les mêmes conditions que les livres papier. Les prestations de service associées — mise en page, rédaction, conseil éditorial — restent en principe à 20 % si elles sont facturées séparément. Un même professionnel de l'édition peut donc facturer 5,5 % et 20 % sur un même dossier. Le support numérique ne dispense pas de vérifier l'éligibilité de chaque opération.",
  },
  {
    label: "Prestation de service",
    answer:
      "En l'absence de taux réduit spécifique, toute prestation de service est en principe taxée à 20 % (art. 278 du CGI). C'est la règle par défaut pour le conseil, l'informatique, le marketing, la maintenance et la majorité des activités tertiaires. Certaines prestations peuvent relever d'un taux réduit ou d'une exonération si elles entrent dans une catégorie légale précise. Le libellé « prestation de service » ne suffit pas : la nature exacte de l'opération détermine le taux.",
  },
  {
    label: "Commerce de biens",
    answer:
      "Le taux dépend du produit vendu, pas de l'activité commerciale en général. Un même commerçant peut facturer à 5,5 % (alimentaire éligible), 10 % (certains produits ou prestations spécifiques) ou 20 % (autres biens). Chaque référence produit doit être rapprochée des listes des art. 278 à 281 du CGI. Le statut de commerçant n'accorde aucun taux privilégié — seule la nature de chaque bien vendu compte.",
  },
  {
    label: "Association",
    answer:
      "Une association n'est pas exonérée de TVA par son seul statut associatif. Si elle réalise des opérations non commerciales dans la limite de la législation, elles peuvent être hors champ de la TVA. Dès qu'elle exerce une activité économique taxable — vente de produits, prestations rémunérées, billetterie — le taux applicable est celui de l'opération réalisée, en principe 20 % pour les prestations de service (art. 278 du CGI), sauf exception légale. C'est l'activité, et non le statut d'association, qui détermine le régime de TVA.",
  },
  {
    label: "Prestation dans l'Union européenne",
    answer:
      "Pour une prestation de services B2B intracommunautaire, la TVA est en principe autoliquidée par le client : facturation sans TVA française avec mention appropriée (art. 259 B et 283-2 du CGI). Pour les prestations B2C, des règles de localisation spécifiques s'appliquent selon le type de service et le lieu d'imposition. La Belgique, l'Allemagne ou tout autre État membre ne changent pas la logique : c'est la territorialité de la TVA qui prime. À vérifier selon le cas précis, le statut du client et la nature du service.",
  },
  {
    label: "Exportation hors UE",
    answer:
      "Les exportations de biens hors de l'Union européenne bénéficient en principe d'une exonération de TVA (art. 262, I du CGI), sous réserve du respect des conditions et des justificatifs de sortie du territoire. Les prestations de services localisées hors d'Union peuvent également être exonérées selon les règles de territorialité. Une vente en Suisse ou aux États-Unis n'emporte pas automatiquement l'exonération : la qualification B2B/B2C et la nature de l'opération déterminent le régime. À vérifier opération par opération.",
  },
  {
    label: "Architecte",
    answer:
      "Les honoraires d'études, de conception et de maîtrise d'œuvre relèvent en principe du taux normal de 20 % (art. 278 du CGI). Lorsque l'architecte intervient dans le cadre de travaux de rénovation éligibles sur un logement de plus de deux ans, certains travaux facturés en corps d'état peuvent relever de 10 % — selon la qualification de chaque poste. La simple mission de conseil ou de permis de construire reste en principe à 20 %. Le métier d'architecte ne détermine pas un taux unique : chaque prestation doit être qualifiée.",
  },
  {
    label: "Avocat",
    answer:
      "Les honoraires d'avocat et les frais de consultation juridique sont en principe taxés à 20 % (art. 278 du CGI). Certaines prestations spécifiques — vente d'ouvrages juridiques, formations dispensées — peuvent relever d'un autre taux selon leur qualification. Les prestations B2B intracommunautaires peuvent donner lieu à autoliquidation par le client (art. 259 B du CGI). Le statut réglementé d'avocat n'ouvre pas de taux réduit automatique : seule la nature de chaque opération facturée compte.",
  },
  {
    label: "Médecin",
    answer:
      "Les actes médicaux dispensés par un professionnel de santé exerçant conformément à la réglementation relèvent en principe d'une exonération de TVA (art. 261, 4-1° du CGI). La vente de produits, de cosmétiques ou de prestations non thérapeutiques peut être taxable, en principe à 20 %. Un médecin exerçant une activité mixte — soins et commerce — peut donc réaliser des opérations exonérées et taxées. Le métier de médecin n'implique pas un taux unique : c'est la nature de chaque acte qui détermine le régime.",
  },
  {
    label: "Dentiste",
    answer:
      "Les soins dentaires thérapeutiques réalisés par un chirurgien-dentiste sont en principe exonérés de TVA (art. 261, 4-1° du CGI). Les prestations esthétiques non thérapeutiques, la vente de produits ou certains dispositifs peuvent relever du taux normal de 20 %. La frontière entre soin médical exonéré et prestation taxable doit être analysée acte par acte. Le statut de dentiste ne dispense pas de qualifier chaque opération avant facturation.",
  },
  {
    label: "Kinésithérapeute",
    answer:
      "Les actes de kinésithérapie et de rééducation dispensés par un professionnel habilité relèvent en principe d'une exonération de TVA (art. 261, 4-1° du CGI). Les prestations de coaching sportif, de bien-être ou de vente de produits annexes peuvent être taxables à 20 %. Un kinésithérapeute proposant des activités complémentaires peut donc cumuler régimes exonéré et taxable. C'est la nature de l'acte, et non le métier affiché, qui fixe le taux applicable.",
  },
  {
    label: "Coach",
    answer:
      "Le coaching professionnel, le coaching de vie et l'accompagnement individuel relèvent en principe du taux normal de 20 % (art. 278 du CGI), sauf qualification différente. Si le coach dispense une formation professionnelle éligible via un organisme agréé, un régime spécifique ou une exonération peut s'appliquer sous conditions. Le coaching sportif pur peut parfois être rapproché d'une prestation de loisir taxable à 20 %. Le métier de coach n'ouvre aucun taux réduit automatique.",
  },
  {
    label: "Consultant SEO",
    answer:
      "L'audit SEO, l'optimisation de contenu et le conseil en référencement naturel sont en principe des prestations de service à 20 % (art. 278 du CGI). La vente de rapports, d'outils ou de formations associées peut relever du même taux ou d'un autre selon la qualification de chaque ligne. Les prestations B2B intracommunautaires peuvent donner lieu à autoliquidation (art. 259 B du CGI). Le métier de consultant SEO n'impose pas un taux spécifique — chaque opération doit être analysée.",
  },
  {
    label: "Agence web",
    answer:
      "Une agence web facture en principe à 20 % ses prestations de création, de développement, de maintenance et de conseil digital (art. 278 du CGI). La vente de licences, d'hébergement ou d'abonnements récurrents peut relever du même taux en principe, sous réserve de la qualification de chaque service. Les prestations réalisées pour des clients professionnels en Union européenne peuvent être autoliquidées. L'activité d'agence ne détermine pas un taux unique — ventilez chaque ligne selon la nature de l'opération.",
  },
  {
    label: "Community manager",
    answer:
      "La gestion de réseaux sociaux, la modération et la création de contenus pour comptes clients relèvent en principe du taux normal de 20 % (art. 278 du CGI). La rédaction, la publicité en ligne et les campagnes sponsorisées facturées au client sont en principe des prestations de service à 20 %. Si le community manager vend des formations ou des produits physiques, d'autres taux peuvent s'appliquer. Le métier ne confère aucun taux privilégié — qualifiez chaque prestation facturée.",
  },
  {
    label: "Influenceur",
    answer:
      "Les collaborations sponsorisées, placements de produits et prestations publicitaires d'un influenceur relèvent en principe du taux normal de 20 % (art. 278 du CGI). La vente de produits dérivés, de formations ou de contenus numériques peut relever d'autres taux selon la nature de l'opération. Les revenus perçus via des plateformes n'échappent pas à la TVA si l'influenceur est assujetti. Le statut d'influenceur n'impose pas un taux automatique — chaque contrat et chaque flux de revenu doit être qualifié.",
  },
  {
    label: "Youtubeur",
    answer:
      "Les revenus publicitaires, sponsoring et prestations réalisées par un youtubeur assujetti à la TVA relèvent en principe de 20 % (art. 278 du CGI) pour les prestations de service. La vente de merchandising, de formations ou de produits physiques peut relever d'autres taux selon les biens vendus. Les règles de territorialité s'appliquent pour les revenus issus de l'étranger — B2B UE, export hors UE. Le métier de créateur YouTube ne détermine pas un taux unique.",
  },
  {
    label: "Créateur de contenu",
    answer:
      "La production de contenus sur commande — vidéo, rédaction, photographie, podcast — est en principe une prestation de service à 20 % (art. 278 du CGI). La vente de templates, d'ebooks éligibles ou de produits physiques peut relever de 5,5 % ou 20 % selon la qualification. Les droits d'auteur cédés peuvent suivre un régime spécifique selon les conditions. Un créateur de contenu peut facturer plusieurs taux : c'est la nature de chaque livrable qui compte, pas le métier.",
  },
  {
    label: "Développeur SaaS",
    answer:
      "L'abonnement à un logiciel en mode SaaS et les prestations de développement associées relèvent en principe du taux normal de 20 % (art. 278 du CGI). La vente de licences perpétuelles ou de prestations de mise en œuvre peut être traitée de la même manière en principe. Pour des clients professionnels dans l'Union européenne, l'autoliquidation peut s'appliquer (art. 259 B du CGI). Le modèle SaaS n'ouvre pas de taux réduit — qualifiez chaque composant de la facture.",
  },
  {
    label: "Vendeur Shopify",
    answer:
      "Le taux de TVA d'un vendeur sur Shopify dépend des produits vendus, pas de la plateforme utilisée. Un même vendeur peut facturer à 5,5 % (alimentaire éligible), 10 % ou 20 % selon ses références. Les ventes B2C vers d'autres pays de l'UE peuvent relever du guichet unique OSS selon les seuils. Les exportations hors UE bénéficient en principe d'une exonération sous conditions (art. 262, I du CGI). Le métier de « vendeur en ligne » n'impose aucun taux unique.",
  },
  {
    label: "Airbnb",
    answer:
      "La location saisonnière meublée via Airbnb relève en principe d'une exonération de TVA pour la simple mise à disposition d'un logement (art. 261 D du CGI). Si le loueur fournit des services para-hôteliers — petit-déjeuner, ménage quotidien, accueil régulier — le taux de 10 % peut s'appliquer sous conditions (art. 279 du CGI). Un meublé de tourisme classé peut également relever de régimes spécifiques. L'usage d'Airbnb ne détermine pas le taux : c'est la qualification de l'activité de location qui prime.",
  },
  {
    label: "Location saisonnière",
    answer:
      "La location saisonnière d'un logement meublé sans services para-hôteliers est en principe exonérée de TVA (art. 261 D du CGI). Lorsque des prestations para-hôtelières sont fournies de manière habituelle, le taux de 10 % peut s'appliquer sous conditions (art. 279 du CGI). Le classement en meublé de tourisme peut modifier le régime applicable. Le fait de louer en saisonnier n'impose ni exonération ni taux réduit automatiquement — analysez les services effectivement rendus.",
  },
  {
    label: "Taxi",
    answer:
      "Le transport de voyageurs par taxi relève en principe du taux intermédiaire de 10 % (art. 279 du CGI), sous réserve des conditions légales applicables au transport routier de personnes. Certaines prestations annexes — colis express, location de véhicule avec chauffeur longue durée — peuvent relever de 20 %. Un chauffeur de taxi assujetti applique le taux correspondant à chaque type de prestation. Le métier ne dispense pas de vérifier la qualification de l'opération facturée.",
  },
  {
    label: "VTC",
    answer:
      "Les courses VTC et le transport de personnes avec chauffeur relèvent en principe du taux intermédiaire de 10 % (art. 279 du CGI), dans les mêmes conditions que le transport de voyageurs. Les prestations de mise à disposition longue durée, d'événementiel ou de services annexes non liés au transport peuvent relever de 20 %. Un chauffeur VTC peut cumuler plusieurs types d'opérations. Le statut VTC n'accorde pas un taux unique — qualifiez chaque prestation.",
  },
  {
    label: "Vidéaste",
    answer:
      "La réalisation vidéo, le montage et la post-production sont en principe des prestations de service à 20 % (art. 278 du CGI). La cession de droits d'exploitation sur les images relève en principe du même taux. La vente de copies physiques ou de supports peut être qualifiée différemment selon les cas. Un vidéaste peut facturer plusieurs taux sur un même projet — tournage, droits, livrables. Le métier de vidéaste n'impose pas un taux automatique.",
  },
  {
    label: "Pilote de drone",
    answer:
      "Les prestations de prise de vue aérienne, d'inspection et de télépilote professionnel relèvent en principe du taux normal de 20 % (art. 278 du CGI). Si le pilote intervient dans le cadre de travaux de rénovation éligibles facturés en corps d'état, certains postes pourraient relever de 10 % — cas rare et à vérifier. La vente de fichiers, de rapports ou de formations associées reste en principe à 20 %. Le métier de pilote de drone ne détermine pas un taux unique.",
  },
  {
    label: "Décorateur",
    answer:
      "Le conseil en décoration et la prestation de plans relèvent en principe de 20 % (art. 278 du CGI). Si le décorateur réalise ou facture des travaux de rénovation sur un logement de plus de deux ans, ceux-ci peuvent relever de 10 % sous conditions (art. 279 du CGI). La vente seule de mobilier, textiles ou accessoires est en principe à 20 %. Un décorateur d'intérieur peut donc appliquer plusieurs taux — le métier ne suffit pas à choisir le taux applicable.",
  },
  {
    label: "Designer",
    answer:
      "Le design produit, le design UX/UI et le design graphique sont en principe des prestations intellectuelles à 20 % (art. 278 du CGI). La vente de prototypes, de prints ou de produits finis peut relever du même taux ou d'un autre selon la qualification. La cession de droits sur les créations est en principe une prestation de service. Le métier de designer couvre des activités variées — chaque ligne de facture doit être qualifiée individuellement.",
  },
  {
    label: "Illustrateur",
    answer:
      "Les prestations d'illustration sur commande et la création graphique originale relèvent en principe de 20 % (art. 278 du CGI). La vente de tirages, d'éditions limitées ou de produits dérivés peut relever de 20 % ou d'un autre taux selon la qualification des œuvres. La cession de droits de reproduction est en principe une prestation de service taxable à 20 %. L'illustrateur peut cumuler plusieurs taux — le métier n'impose pas un taux unique.",
  },
  {
    label: "Traducteur",
    answer:
      "La traduction, l'interprétation et la relecture professionnelle relèvent en principe du taux normal de 20 % (art. 278 du CGI). La vente d'ouvrages traduits en support papier éligible peut relever de 5,5 % pour la partie vente de livre. Les prestations B2B intracommunautaires peuvent donner lieu à autoliquidation (art. 259 B du CGI). Le métier de traducteur ne confère aucun taux réduit automatique sur les prestations de service.",
  },
  {
    label: "Rédacteur web",
    answer:
      "La rédaction de contenus web, d'articles et de fiches produit relève en principe du taux normal de 20 % (art. 278 du CGI). Si le rédacteur vend des ebooks éligibles ou des ouvrages papier, le taux de 5,5 % peut s'appliquer à ces ventes spécifiques (art. 278-0 bis du CGI). Les prestations de conseil éditorial et de stratégie de contenu restent en principe à 20 %. Le métier de rédacteur web n'impose pas un taux unique — qualifiez chaque livrable.",
  },
];

export const GUIDE_FAQ: FaqItem[] = [
  {
    question: "Quels sont les taux de TVA en France ?",
    answer:
      "En métropole : 20 % (art. 278), 10 % (art. 279), 5,5 % (art. 278-0 bis) et 2,1 % (art. 281 du CGI). En Guadeloupe, Martinique et La Réunion : 8,5 %, 2,1 %, 1,75 % et 1,05 % (art. 297 et 298).",
  },
  {
    question: "Quel est le taux normal de TVA en France ?",
    answer:
      "20 % en métropole (art. 278 du CGI). Il s'applique par défaut à toute opération taxable non visée par un taux réduit ou une exonération.",
  },
  {
    question: "Pourquoi plusieurs taux existent-ils ?",
    answer:
      "Le législateur accorde des taux réduits à certaines catégories de biens et services jugés prioritaires — alimentation, logement, culture, santé — via les art. 278 à 281 du CGI. Le taux normal de 20 % reste la règle ; les autres taux sont des exceptions strictement encadrées.",
  },
  {
    question: "Quels produits sont à la TVA 5,5 % ?",
    answer:
      "L'art. 278-0 bis du CGI prévoit le 5,5 % pour les produits alimentaires (hors restauration et alcools), les livres et ebooks éligibles, l'énergie domestique et certains équipements PMR.",
  },
  {
    question: "Quelle TVA pour une micro-entreprise ?",
    answer:
      "En dessous des seuils de franchise en base (art. 293 B du CGI), la micro-entreprise ne facture pas de TVA : mention obligatoire « TVA non applicable, art. 293 B du CGI ». Au-delà des plafonds, ou en cas d'option pour la TVA, les taux ordinaires s'appliquent selon la nature de chaque opération. Voir notre guide sur la franchise en base de TVA.",
  },
  {
    question: "Comment calculer le TTC à partir du HT ?",
    answer:
      "Multipliez le HT par (1 + taux). Exemple : 500 € HT à 20 % = 600 € TTC. TVA = HT × taux. Utilisez notre calculateur HT vers TTC pour vérifier.",
  },
  {
    question: "Peut-on appliquer plusieurs taux sur une même facture ?",
    answer:
      "Oui. Chaque ligne porte le taux de l'opération concernée. Ventilez les totaux HT et TVA par taux en bas de facture (art. 242 nonies A de l'annexe II au CGI).",
  },
  {
    question: "TVA sur une facture mixte ?",
    answer:
      "Une facture mixte regroupe des opérations à taux différents : par exemple conseil à 20 % et livres à 5,5 %. Chaque ligne doit porter son taux et les totaux doivent être ventilés par taux en bas de page. Le taux le plus bas ne s'applique jamais à l'ensemble de la facture.",
  },
  {
    question: "Quelle TVA pour un devis ?",
    answer:
      "Un devis doit indiquer le taux de TVA applicable à chaque prestation ou produit, avec les montants HT et TTC. Le taux mentionné engage le vendeur : il doit correspondre à la qualification réelle de l'opération prévue (art. 278 à 281 du CGI).",
  },
  {
    question: "Quelle TVA sur un acompte ?",
    answer:
      "L'acompte perçu avant la livraison ou l'exécution de la prestation entraîne la TVA au taux de l'opération concernée (art. 269 du CGI). La facture d'acompte doit mentionner ce taux et le montant de TVA exigible.",
  },
  {
    question: "TVA sur les frais de port ?",
    answer:
      "Les frais de port suivent en principe le taux de TVA du bien livré (art. 267, I-2 du CGI). Si la commande comporte plusieurs taux, les frais de port sont répartis proportionnellement ou ventilés selon les règles applicables.",
  },
  {
    question: "Que se passe-t-il si j'applique le mauvais taux ?",
    answer:
      "Redressement fiscal, rejet de la TVA déductible par le client et pénalités possibles. Corrigez par un avoir puis une nouvelle facture au bon taux.",
  },
  {
    question: "Le métier détermine-t-il le taux de TVA ?",
    answer:
      "Non. Seule la nature de chaque opération compte. Un même professionnel peut facturer 20 %, 10 % et 5,5 % selon ses ventes et prestations.",
  },
  {
    question: "Quel taux pour une prestation de service B2B ?",
    answer:
      "En principe 20 % en France (art. 278 du CGI). Pour une prestation B2B intracommunautaire, l'autoliquidation par le client s'applique en principe (art. 259 B du CGI) — facturation hors TVA française avec mentions obligatoires.",
  },
  {
    question: "TVA sur une prestation intellectuelle ?",
    answer:
      "Les prestations intellectuelles — conseil, études, création, ingénierie — sont en principe taxées à 20 % (art. 278 du CGI). Des exceptions existent pour certains enseignements, publications ou cessions de droits — à vérifier selon la qualification exacte de l'opération.",
  },
  {
    question: "Quel taux de TVA pour un photographe ?",
    answer:
      "En principe 20 % pour les prestations de service et la cession de droits (art. 278 du CGI). Les tirages, albums et ventes d'œuvres peuvent relever de 20 % ou d'un autre taux selon leur qualification — plusieurs taux peuvent coexister sur une même facture.",
  },
  {
    question: "TVA sur un artisan ?",
    answer:
      "Rénovation sur logement achevé depuis plus de deux ans : en principe 10 % (art. 279 du CGI). Travaux neufs, bâtiment de moins de deux ans et vente de matériaux seuls : en principe 20 % (art. 278 du CGI). À vérifier chantier par chantier.",
  },
  {
    question: "Quel taux de TVA en restauration ?",
    answer:
      "Repas sur place et plats à emporter éligibles : en principe 10 % (art. 279 du CGI). Boissons alcoolisées : en principe 20 %. Livraison et certains desserts ou boissons peuvent relever de taux différents — ventilez l'addition.",
  },
  {
    question: "TVA sur une formation ?",
    answer:
      "Formation professionnelle taxable : en principe 20 % (art. 278 du CGI). Formation dispensée par un organisme agréé ou répondant à des critères légaux : exonération ou régime spécifique possible — sous conditions strictes. Le statut de formateur ne suffit pas : qualifiez chaque action.",
  },
  {
    question: "TVA sur un ebook ?",
    answer:
      "Les ebooks et publications numériques éligibles relèvent du taux réduit de 5,5 % (art. 278-0 bis du CGI), dans les mêmes conditions que les livres papier. Les prestations associées facturées séparément (mise en page, conseil) restent en principe à 20 %.",
  },
  {
    question: "TVA sur un logiciel ?",
    answer:
      "Vente de licence, abonnement SaaS et développement sur mesure : en principe 20 % (art. 278 du CGI). Pour un client professionnel dans l'UE, l'autoliquidation peut s'appliquer (art. 259 B du CGI). Le support (téléchargement, cloud) ne change pas le taux en principe.",
  },
  {
    question: "TVA sur un abonnement ?",
    answer:
      "Un abonnement à un service (logiciel, maintenance, contenu) est en principe taxé à 20 % à chaque échéance (art. 278 du CGI). Le taux suit la nature du service sous-jacent. Les abonnements presse éligibles peuvent relever de 2,1 % ou 5,5 % sous conditions.",
  },
  {
    question: "TVA sur une location ?",
    answer:
      "Location nue d'immeuble : en principe exonérée (art. 261 D du CGI). Location meublée avec services para-hôteliers : en principe 10 % sous conditions (art. 279 du CGI). Location de matériel ou de véhicules : en principe 20 % — selon la qualification de l'opération.",
  },
  {
    question: "TVA sur une prestation en Belgique ?",
    answer:
      "Prestation B2B vers un client professionnel belge assujetti : autoliquidation — pas de TVA française, mentions art. 259 B et 283-2 du CGI. Prestation B2C : règles de localisation selon le type de service — en principe imposition dans le pays du client pour certains services numériques.",
  },
  {
    question: "TVA sur une vente en Suisse ?",
    answer:
      "Export de biens vers la Suisse (hors UE) : exonération de TVA française sous conditions (art. 262, I du CGI) avec justificatifs de sortie. Prestation de service localisée en France : en principe 20 %. Prestation B2B localisée en Suisse : territorialité suisse — pas de TVA française en principe.",
  },
  {
    question: "Quel taux pour une prestation B2B en Union européenne ?",
    answer:
      "Autoliquidation par le client assujetti disposant d'un n° TVA intracommunautaire valide (art. 259 B du CGI). Facture hors TVA française avec mentions obligatoires. Le taux du pays du prestataire ne s'applique pas.",
  },
  {
    question: "Quelle TVA pour une exportation hors UE ?",
    answer:
      "Exportation de biens : exonération en principe (art. 262, I du CGI) avec preuve de sortie du territoire. Prestations de services : territorialité selon les règles du CGI — exonération possible si le service est localisé hors d'Union.",
  },
  {
    question: "La Corse a-t-elle des taux différents ?",
    answer:
      "Non. La Corse applique les mêmes taux que la métropole : 20 %, 10 %, 5,5 % et 2,1 %.",
  },
  {
    question: "Quels sont les taux de TVA en Outre-mer (DOM) ?",
    answer:
      "En Guadeloupe, Martinique et La Réunion : 8,5 % (normal), 2,1 % (intermédiaire), 1,75 % (réduit) et 1,05 % (particulier) — art. 297 et 298 du CGI. La Guyane et Mayotte relèvent de régimes distincts.",
  },
  {
    question: "Quel taux de TVA pour un auto-entrepreneur assujetti ?",
    answer:
      "Un auto-entrepreneur assujetti à la TVA applique les mêmes taux que toute entreprise : 20 %, 10 %, 5,5 % ou 2,1 % selon la nature de chaque opération. En franchise en base (art. 293 B du CGI), il ne facture pas de TVA tant que les seuils sont respectés.",
  },
];
