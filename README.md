# Framework sites calculateurs

Framework Next.js pour créer rapidement des sites de simulateurs professionnels (SEO, RGPD, performances).

**Objectif :** créer un nouveau site en moins d'une heure en modifiant uniquement `src/site/`.

Charte graphique : voir **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)**.

---

## Règle d'or

| Modifier | Ne pas modifier |
|----------|-----------------|
| `src/site/` (config, contenu, calculateur) | `src/framework/` (layouts, design system, SEO, RGPD) |
| `public/` (logo, OG image) | `src/app/` (routes, sauf cas exceptionnel) |
| `src/app/icon.svg` (favicon) | `src/framework/design/` (CSS, composants visuels) |

---

## Templates officiels

Le framework choisit automatiquement le bon template :

| Type de page | Layout | Exemples |
|--------------|--------|----------|
| **Calculator Page** | `CalculatorPageLayout` | `/` (accueil) |
| **Content Page** | `ContentPageLayout` | légal, FAQ, guides, 404, plan du site |
| **Contact Page** | `ContactPageLayout` | `/contact` |

Référence : `src/framework/templates.ts`.

---

## Créer un nouveau site

1. Dupliquez ce dépôt.
2. Modifiez les fichiers dans **`src/site/`** (voir ci-dessous).
3. Remplacez les assets : `public/logo.svg`, `public/og-image.png`, `src/app/icon.svg`.
4. Mettez à jour `public/manifest.webmanifest`.
5. Copiez `.env.example` → `.env.local` (IDs Google).
6. `npm run dev` puis déployez sur Vercel.

---

## Fichiers à modifier (`src/site/`)

| Fichier | Contenu |
|---------|---------|
| **`site.config.ts`** | Nom, domaine, couleurs, logo, navigation, textes, légal, contact, outils, blog |
| **`seo.config.ts`** | Titres SEO, descriptions, pages extra (`extraPages`) |
| **`faq.ts`** | Questions / réponses (accueil + `/faq`) |
| **`calculator.tsx`** | Formulaire et logique du simulateur |

### Couleurs

La couleur principale (`colors.primary`) alimente automatiquement le design system (`--ds-brand`).

Valeur officielle : `#f28539`.

---

## Ajouter un simulateur

Éditez **`src/site/calculator.tsx`**. Utilisez les classes du design system :

- `calc-field-label`, `calc-input`, champs sur fond brand
- `calc-col-actions`, `calc-cta`, `calc-reset`, boutons
- `ResultDisplay`, affichage du résultat

```tsx
"use client";

import { useCalculatorSlot } from "@/framework/SiteProvider";
import { ResultDisplay } from "@/framework/CalculatorShell";

export default function Calculator() {
  const { setResult, clearResult } = useCalculatorSlot();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(<ResultDisplay label="Résultat" value="1 234 €" />);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="calc-fields">
        {/* champs avec calc-field-label + calc-input */}
      </div>
      <div className="calc-col-actions">
        <button type="submit" className="calc-cta">Calculer</button>
        <button type="button" className="calc-reset" onClick={() => clearResult()}>Réinitialiser</button>
      </div>
    </form>
  );
}
```

---

## Ajouter un article / guide

Éditez **`src/site/seo.config.ts`** → `extraPages` :

```ts
extraPages: [
  {
    slug: "guide-utilisation",
    title: "Guide d'utilisation",
    description: "Mode d'emploi du simulateur.",
    sections: [
      { title: "Étape 1", content: "Texte…" },
    ],
  },
],
```

Route `/guide-utilisation`, sitemap et SEO générés automatiquement. Template **Content Page**.

---

## Ajouter une page

| Besoin | Action |
|--------|--------|
| Page légale | Texte dans `site.config.ts` → `legal.*`, SEO dans `seo.config.ts` |
| Page contact | `site.config.ts` → `contact.*` |
| FAQ complète | `src/site/faq.ts` (automatique sur `/faq`) |
| Page libre | `extraPages` dans `seo.config.ts` |
| Plan du site | `/plan-du-site` (automatique) |
| Tous les simulateurs | `/simulateurs` + `site.config.ts` → `tools[]` |
| Gestion cookies | `/gestion-des-cookies` (automatique) |

**Ne créez jamais de CSS spécifique.** Utilisez les layouts du framework.

---

## Pages incluses

| Route | Template |
|-------|----------|
| `/` | Calculator Page |
| `/contact` | Contact Page |
| `/faq` | Content Page |
| `/simulateurs` | Content Page |
| `/plan-du-site` | Content Page |
| `/mentions-legales` | Content Page |
| `/politique-de-confidentialite` | Content Page |
| `/politique-de-cookies` | Content Page |
| `/gestion-des-cookies` | Content Page |
| `/[slug]` | Content Page (extraPages) |
| 404 / 500 | Content Page |

---

## Lancer en local

```bash
npm install
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

Build production : `npm run build` puis `npm start`.

---

## Analytics, AdSense, RGPD

Variables `.env.local` :

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GSC_ID=xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX
```

Analytics et AdSense ne se chargent qu'**après consentement** (Google Consent Mode v2).

---

## Structure du projet

```
src/
├── framework/
│   ├── design/          ← Design system (CSS + composants visuels)
│   ├── layouts/         ← 3 templates officiels
│   ├── seo/             ← Métadonnées, sitemap, JSON-LD
│   └── templates.ts     ← Correspondance type → layout
├── site/                ← VOTRE SITE (4 fichiers)
└── app/                 ← Routes Next.js (ne pas modifier)
DESIGN_SYSTEM.md         ← Charte graphique complète
```

---

## Déployer sur Vercel

1. Poussez sur GitHub.
2. Importez sur [vercel.com](https://vercel.com).
3. Ajoutez les variables d'environnement.
4. Vérifiez `domain` et `url` dans `site.config.ts`.
5. Déployez.
