export type SickLeaveClusterId = "ijss" | "maintien" | "revenu";

export const SICK_LEAVE_CLUSTER_TITLE =
  "Comprendre vos revenus pendant l'arrêt maladie";

export const SICK_LEAVE_CLUSTER_YOU_ARE_HERE = "Vous êtes ici";

export const SICK_LEAVE_CLUSTER_PATHS = {
  ijss: "/calcul-ijss-arret-maladie",
  maintien: "/maintien-salaire-arret-maladie",
  revenu: "/salaire-arret-maladie",
} as const satisfies Record<SickLeaveClusterId, string>;

export interface SickLeaveClusterItem {
  id: SickLeaveClusterId;
  href: string;
  title: string;
  description: string;
}

export const SICK_LEAVE_CLUSTER_ITEMS: readonly SickLeaveClusterItem[] = [
  {
    id: "ijss",
    href: SICK_LEAVE_CLUSTER_PATHS.ijss,
    title: "Calculer vos IJSS",
    description: "Estimation des indemnités versées par la CPAM ou la MSA.",
  },
  {
    id: "maintien",
    href: SICK_LEAVE_CLUSTER_PATHS.maintien,
    title: "Calculer le complément employeur",
    description: "Estimation du minimum légal du maintien de salaire.",
  },
  {
    id: "revenu",
    href: SICK_LEAVE_CLUSTER_PATHS.revenu,
    title: "Estimer votre revenu total",
    description:
      "Réunion des IJSS, du complément employeur et, si applicable, des autres éléments pris en compte.",
  },
];

export function getSickLeaveClusterItem(id: SickLeaveClusterId): SickLeaveClusterItem {
  const item = SICK_LEAVE_CLUSTER_ITEMS.find((entry) => entry.id === id);
  if (!item) {
    throw new Error(`Entrée de cocon arrêt maladie inconnue : ${id}`);
  }
  return item;
}
