# Design System : Charte graphique officielle

Document interne de référence. **Toute nouvelle page doit respecter ces règles sans exception.**

## Principe fondamental

**Une seule identité graphique. Seul le contenu change.**

Trois templates officiels :

| Template | Layout | Usage |
|----------|--------|-------|
| **Calculator Page** | `CalculatorPageLayout` | Accueil, simulateur principal |
| **Content Page** | `ContentPageLayout` | Articles, guides, légal, FAQ, 404, plan du site |
| **Contact Page** | `ContactPageLayout` | Contact, assistance, support |

Sélection automatique : voir `src/framework/templates.ts`.

---

## Couleurs officielles

| Token | Valeur par défaut | Usage |
|-------|-------------------|-------|
| `--ds-brand` | `#f28539` | Header, footer, liens, boutons |
| `--ds-brand-dark` | `#da7830` | Hover boutons, bannières |
| `--ds-brand-active` | `#c66f28` | État actif des boutons |
| `--ds-brand-light` | `#fff4ed` | Fonds légers, états actifs nav |
| `--ds-brand-muted` | `#f2d5bc` | Bordures brand atténuées |
| `--ds-label-on-brand` | `#fff6f0` | Labels sur fond brand |
| `--ds-text-on-brand` | `#fff1e8` | Texte sur fond brand |
| `--ds-text` | `#161616` | Texte principal |
| `--ds-text-muted` | `#6b7280` | Texte secondaire |
| `--ds-border` | `#e4e8ed` | Bordures, séparateurs |
| `--ds-border-light` | `#dde3ea` | Bordures cartes |
| `--ds-input-border` | `#e3cbb9` | Champs formulaire |
| `--ds-surface` | `#ffffff` | Fond pages |
| `--ds-surface-alt` | `#f7f9fb` | Encadrés, sidebar |

Les couleurs sont personnalisables via `site.config.ts` → `colors.primary` (injecté dans `--ds-brand`).

**Interdit :** dégradés, glassmorphism, couleurs hors palette, effet SaaS/startup/IA.

---

## Typographie

- **Police unique :** Source Sans 3 (`--font-source-sans`)
- **Échelle :** `--ds-font-size-2xs` (10px) → `--ds-font-size-6xl` (28px)

| Élément | Classe | Taille |
|---------|--------|--------|
| H1 header compact | `article-header__title` | 24–28px |
| H1 simulateur | `sr-only` (SEO) | - |
| H2 section | `section-title--dark` | 24px |
| H2 prose | `prose h2` | 22px |
| H3 prose | `prose h3` | 18px |
| Corps prose | `prose` | 17px |
| Labels formulaire | `ds-field-label` / `calc-field-label` | 14px uppercase |
| Inputs | `ds-input` / `calc-input` | 15px |
| Boutons | `ds-btn` / `calc-cta` | 16px uppercase |
| Footer légal | `site-footer__legal` | 12px |
| Eyebrow | `section-eyebrow--dark` | 11px uppercase |

---

## Espacements (grille 8 px)

Valeurs autorisées uniquement : **8, 16, 24, 32, 48 px**.

| Zone | Padding |
|------|---------|
| Sections contenu | `48px 0` |
| Header compact inner | `16px 24–32px` |
| Cartes | `16–24px` |
| Formulaire (gap champs) | `24px` |
| Sidebar blocks | `32px gap` |

---

## Largeur maximale

| Token | Valeur | Usage |
|-------|--------|-------|
| `--ds-max-content` | 64rem | Contenu standard, header simulateur |
| `--ds-max-article` | 72rem | Pages avec sidebar |
| `article-body` | max 42rem | Colonne éditoriale |

Classes : `content-wrap`, `content-wrap--wide`.

---

## Header

### Simulateur (`tool-header`)
- Hauteur : `clamp(550px, 600px, 650px)`
- Fond : `--ds-brand`
- Menu blanc, logo/nom blanc
- Calculateur intégré (2 colonnes)
- Vague SVG blanche en bas (`HeaderCurveDown`)

### Pages intérieures (`article-header`)
- Hauteur : ~200px
- Même brand, même menu, même vague
- Meta + titre + sous-titre

**Ne jamais modifier** ces hauteurs ni la couleur de fond.

---

## Footer

- Fond `--ds-brand`, compact (~180–220px total avec courbe)
- Logo lettre + nom + description
- Colonne « Autres simulateurs »
- Liens légaux horizontaux + « Gérer les cookies »
- Copyright
- Courbe SVG (`FooterCurveUp`) au-dessus

Composants : `PageFooter`, `SiteFooter`.

---

## Formulaires

Classes partagées (`forms.css`) :

| Classe | Contexte |
|--------|----------|
| `ds-field-label` | Label sur fond clair |
| `calc-field-label` | Label sur fond brand (simulateur) |
| `ds-input` / `ds-select` / `ds-textarea` | Champs sur fond clair (40px) |
| `calc-input` | Champs simulateur sur fond brand |
| `ds-btn ds-btn--primary` | Bouton sur fond clair |
| `calc-cta` | Bouton blanc sur fond brand |

Focus : bordure brand + ombre `rgba(var(--ds-brand-rgb), 0.15)`.
Radius : `4px` partout.

---

## Boutons

| Variante | Hauteur | Usage |
|----------|---------|-------|
| `ds-btn--primary` | 48px | Contact, pages claires |
| `calc-cta` | 48px | Simulateur |
| `calc-reset` | texte souligné | Réinitialiser simulateur |

Transitions : `0.15s ease` uniquement.

---

## Cartes

| Classe | Usage |
|--------|-------|
| `tool-card--content` | Simulateurs, outils |
| `blog-card` | Articles |
| `sidebar-tool` | Sidebar simulateurs |
| `sidebar-guide` | Sidebar liens |
| `faq-item` | Questions FAQ |

Bordure : `1px solid var(--ds-border-light)`, radius `4px`.
Hover : bordure brand ou fond `var(--ds-brand-light)`.

---

## Encadrés

| Classe | Usage |
|--------|-------|
| `prose-callout` | Encadré info dans articles |
| `prose blockquote` | Citations |
| `sidebar-list__item` | Infos contact |

---

## Tableaux

Classe `prose table`, bordures `var(--ds-border)`, en-tête fond `var(--ds-surface-alt)`.

---

## FAQ

Classe `faq-item` + `details/summary`, même composant sur accueil et page `/faq`.

---

## Responsive

- Mobile first
- Sidebar → sous le contenu (< 1024px)
- Calculateur 2 colonnes → 1 colonne (< 900px)
- Grilles outils/blog : 1 col mobile, 2–3 cols desktop

---

## Animations autorisées

- Hover couleur/fond : `0.15s ease`
- Chevron FAQ : `transform 0.2s ease`
- Focus champs : bordure + box-shadow

**Interdit :** animations d'entrée, parallax, micro-interactions excessives.

---

## Éléments à ne jamais modifier

1. Couleur brand `#f28539` (sauf via `site.config.ts`)
2. Hauteurs des headers (600px simulateur, 200px compact)
3. Structure footer (courbe + 3 zones)
4. Grille 8 px
5. Radius 4 px uniforme
6. Police Source Sans 3
7. Classes CSS du design system (`ds-*`, `calc-*`, `prose`, `article-*`, `site-footer_*`)

---

## Fichiers du design system

```
src/framework/design/
├── index.css           ← import unique
├── tokens.css
├── forms.css
├── shared.css
├── blog-page.css
├── calculator-page.css
├── components/
│   ├── CompactPageHeader.tsx
│   ├── SiteNav.tsx
│   ├── SiteFooter.tsx
│   └── Curves.tsx
└── PageFooter.tsx
```

---

## Créer une nouvelle page

1. Choisir le template (`templates.ts`)
2. Utiliser le layout correspondant
3. Ne **jamais** créer de CSS spécifique à la page
4. Contenu uniquement dans `src/site/` ou route `src/app/`
