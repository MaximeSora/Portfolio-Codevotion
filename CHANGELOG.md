# Changelog — Portfolio Codevotion

Historique des modifications apportées sur la branche `Claude-evol`.

---

## TODO

- [x] **Blur animations homepage** — Liquid glass sur `Intro.css` (nom, discipline, keyframe `intro-text-reveal`) et `Profile.css` (titre Hello + 3 paragraphes staggerés +120ms/+240ms).
- [x] **Sphere shader — blanc plus lumineux** — `colorWhite` passé à `vec3(1.0, 1.0, 1.0)` (blanc pur).
- [x] **Portrait 3D About — format portrait en desktop** — `.profile__image` : `height: 560px` remplacé par `aspect-ratio: 3/4` pour un format portrait naturel sur desktop.
- [x] **Redesign homepage** — Statement, Marquee, ProjectList cursor-following, hero restructuré.
- [x] **Skills section** — Tags pills sous le About, 4 catégories inspirées du CV.
- [x] **Navbar Resume + LinkedIn** — Liens externes dans le header.

---

## Session — 2026-02-24

### Hero (Intro)
- **Restructuration du titre** : "Product" statique sur la ligne 1 avec ligne décorative, rotation "Designer → Builder → Developer" sur la ligne 2
- **Badge "Available for new projects"** : élément `position: absolute` en bas de la section hero, dot teal avec animation pulse
  - Fix : ajout de `position: relative` sur `.intro` (le badge se positionnait par rapport à un ancêtre plus haut, finissant en bas de page)
  - Contour pill ajouté : `border: 1px solid rgb(var(--rgbText) / 0.15)` + `border-radius: 999px` + padding
- **Disciplines** : `['Product', 'UX', 'Visual', 'Interaction', 'AI']` → `['Designer', 'Builder', 'Developer']`

### Section Statement (`Statement.js` + `Statement.css`) — nouveau fichier
- Grande phrase éditoriale en intro de contenu, après le hero
- `useInViewport` pour déclenchement au scroll
- Typographie : `var(--fontSizeH2)` desktop → `var(--fontSizeH4)` mobile
- Texte : "I design products that move people — and business metrics. Fluent in UX strategy, comfortable with product building and dev constraints, I use AI throughout the process to prototype faster, validate smarter, and deliver experiences that earn their place in the roadmap."

### Marquee (`Marquee.js` + `Marquee.css`) — nouveau fichier
- Bandeau scrolling horizontal après Statement
- 10 services : Product Design, UX Research, Motion Design, Interaction Dev, AI, 3D, Product Strategy, Creative Direction, Prototyping, Design Systems
- Double track pour boucle seamless (`translateX(-50%)`)
- `mask-image` fade transparent sur les bords gauche/droit
- Hover : couleur item → `rgb(var(--rgbPrimary))`
- Animation uniquement sous `@media (--mediaUseMotion)`

### ProjectList (`ProjectList.js` + `ProjectList.css`) — nouveau fichier
Remplace les deux `<ProjectSummary>` par une liste éditoriale style Karolis Kosas.
- **Cursor-following preview** : `requestAnimationFrame` lerp loop (LERP = 0.1), `position: fixed`, `transform: translate(x, y)`, supporte `<video autoPlay muted loop>` et `<img>`
- **Layout par item** : grille `3rem | 1fr | auto | auto` (numéro / titre / tags / flèche)
- **Hover** : flèche ↗ slide-in, autres items dimment à 25% d'opacité
- **Badge "Soon"** : pill border pour les projets sans lien
- **Mobile** : preview cachée, listeners mouse désactivés, tags masqués
- Fix padding : `padding: var(--space5XL) 0` → `padding-top/bottom` pour préserver les marges latérales du `Section`

### Profile / About
- Réécriture des 3 paragraphes : parcours (jeux vidéo → software → product), contraintes dev + AI, CTA collaborations
- Boutons Send email + LinkedIn conservés

### Navbar (`navData.js` + `index.js`)
- Ajout de `Resume` → `/resume.pdf` (nouvel onglet) et `LinkedIn` → `https://www.linkedin.com/in/maxime-pocq/` (nouvel onglet)
- Rendu conditionnel : `href` présent → `<a target="_blank">`, sinon `<NavLink>` React Router
- Fix hash : `#project-1` → `#projects` (correspond au nouvel `id` de `ProjectList`)
- `public/resume.pdf` ajouté

### Skills (`Skills.js` + `Skills.css`) — nouveau fichier
Section après About avec les compétences du CV en tags pills.
- 4 catégories : Design, Tools, Tech, Other
- Tags `border-radius: 999px`, border subtile, hover teal
- Grille 4 colonnes → 2 → 1 selon breakpoint
- Animation `opacity` + `translateY` au scroll via `useInViewport`

### DisplacementSphere — restauration éclairage Phong
- **Problème** : `colorWhite: vec3(1.0, 1.0, 1.0)` (blanc pur) rendait la sphère uniformément lumineuse, masquant le contraste directionnel
- **Fix** : `colorWhite` → `vec3(0.70, 0.97, 1.0)` (cyan-blanc), `colorBase` assombri, `dirLight` intensity `0.6` → `1.2`, `ambientLight` dark `0.1` → `0.05`

### ThemeProvider — marges mobile
- `createMediaTokenProperties()` écrasait `--spaceOuter` à 48px sur tous les breakpoints
- Fix : overrides explicites en fin de `tokenStyles` : `24px` pour ≤696px, `16px` pour ≤400px

### Home/index.js — refonte
- Remplacement des deux `<ProjectSummary>` par `<ProjectList projects={projects} />`
- Définition du tableau `projects` avec Solbase (image), Olympic Games (video), 2 × "Coming soon"
- Suppression des refs inutilisées (`projectTwo`, `projectThree`, `projectFour`)
- `revealSections` et `hashSections` réduits à `[intro, projectOne, about]`
- `rootMargin` section observer : `'0px 0px -10% 0px'` → `'0px 0px -30% 0px'`

---

## Session en cours — 2026-02-23

### Typographie
- **Remplacement de la font** : Inter → **Lora** (serif, Google Fonts)
  - Ajout des balises `<link>` preconnect + import Google Fonts dans `public/index.html`
  - Mise à jour de `--fontStack` dans `ThemeProvider/index.js` : `Lora, Georgia, "Times New Roman", serif`
  - Suppression des `<link rel="preload">` Inter devenus inutiles
  - `--japaneseFontStack` inchangé

### Animations — Liquid Glass (textes au scroll)
- **`ProjectLayout/index.js`** : `ProjectTextRow` converti en composant avec détection viewport
  - `useInViewport` avec `rootMargin: '0px 0px -80px 0px'` (déclenche 80px avant le bord bas)
  - Ajout de la classe `project__text-row--entered` une fois visible (one-shot)
- **`ProjectLayout/index.css`** : 2 nouvelles keyframes + règles d'animation
  - `liquid-glass-in-heading` : blur(14px) → 0 + translateY(24px) → 0 + fade (titres)
  - `liquid-glass-in-text` : blur(8px) → 0 + translateY(14px) → 0 + fade (body text)
  - Stagger : BigHeading 0ms → Heading +90ms → Text +180ms
  - Easing : `cubic-bezier(0.16, 1, 0.3, 1)` (spring naturel)
  - Respecte `prefers-reduced-motion`

### Images
- **`Image/index.js`** : Ajout de `rootMargin: '600px 0px'` sur le `useInViewport`
  - Les images se chargent 600px avant d'entrer dans le viewport (préchargement anticipé)

### Composants
- **`Divider/index.css`** : Ajout de `padding-bottom: 3px` sur `.divider__line`
- **`Monogram/index.js`** : Logo réduit de 50px → 46px (`width` + `height` du SVG)
- **`Button/index.css`** — mobile :
  - `align-items: center` sur `div.project-summary__button` et `div.project__text-row`
  - `left: 0` + `width: auto` sur `button--secondary` en mobile (centrage du bouton avec flèche)
- **`Solbase/index.js`** : Ajout du prop `stretch` sur le `ProjectTextRow` "Identité visuelle / Couleurs" pour prendre la pleine largeur

### Curseur custom
- **`CustomCursor/index.js`** : Masquage correct sur mobile et tablet
  - Guard `window.matchMedia('(max-width: 1024px)')` sur `handleMouseEnter`, `handleMouseHover`, et le listener `mousemove`
  - Empêche les inline styles JS d'écraser le `display: none` du media query CSS

---

## Commit `772384e` — Curseur mobile + shader sphère + logo

### DisplacementSphere (sphère intro animée)
- **`sphereFragShader.js`** : Palette de couleurs étendue à 4 stops
  - Avant : dark → teal → cyan (3 stops, base trop sombre)
  - Après : mid-teal `(0, 0.30, 0.42)` → teal → cyan `#00E5FF` → near-white `(0.75, 1.0, 1.0)`
  - Transitions `smoothstep` à 0 / 0.33 / 0.66 / 1.0 (répartition équitable)

### Curseur custom (première passe)
- **`CustomCursor/style.css`** : Règle `@media (--mediaTablet) { display: none }` déjà présente
- **`Monogram/index.js`** : 50px → 46px

---

## Commit `cff6755` — Navbar 3XL, boutons, LinkedIn ghost, shader

### Navbar
- **Hauteur** : `--space2XL` (48px) → `--space3XL` (64px) sur `.navbar` et `.navbar__nav`
- **`NavToggle.css`** : `--buttonSize` aligné sur `var(--space3XL)`
- **`navbar__nav-link`** : padding revenu à `var(--spaceM)` (correction d'un changement accidentel en space3XL)
- **Logo mobile** : `padding-left: 0` + conteneur `padding-left: var(--spaceM)` pour équilibrer avec le burger

### Boutons
- **`Button/index.css`** : Règle globale `.button > p { margin: 0 }` — corrige les marges browser par défaut qui clippaient le contenu
- **`button--secondary` dans project** : `height: auto` pour laisser le `<p>` (54px) dicter la hauteur
- **LinkedIn ghost button** : Variante `.button--outline` — fond transparent, couleur primary, hover glow `rgb(var(--rgbPrimary) / 0.1)`

### DisplacementSphere (première passe)
- Palette teal→cyan vivide en remplacement des couleurs fades d'origine

---

## Commit `a36960d` — Traduction EN, LinkedIn CTA, teinture 3D

### Contenu
- **`Home/index.js`** : Traduction complète en anglais
  - Disciplines, descriptions projets, boutons "View project"
- **`Home/Profile.js`** : Refonte section About
  - DecoderText : "Bonjour" → "Hello"
  - 3 paragraphes About réécrits en anglais impactant
  - Bouton CV → bouton LinkedIn avec icône
  - "M'envoyer un email" → "Send me an email"
- **`navData.js`** : "À propos" → "About", "Projets" → "Projects", icône LinkedIn retirée de la sidebar

### Portrait 3D (About)
- Tentative de teinte turquoise → **revertée** (mauvais composant ciblé)
- Revenu aux lumières blanches originales, sans traversal de matériaux

---

## Commit `5b72894` — Navbar Apple-style

- Suppression de `backdrop-filter` sur `.navbar` au profit d'un pseudo-élément `::before`
  - Évite le problème de containing block pour les enfants `position: fixed`
- NavToggle : `position: fixed` → `position: absolute` + `top: 0; bottom: 0; height: 100%`
- Navbar : `position: fixed; top: 0; left: 0; right: 0`

---

## Commit `a3e01f4` — Polish UI global

- Corrections overflow, curseur, layout images
- Ajustements divers navbar / sections

---

## Commits antérieurs (`fa049e9` → `3a5626e`)

- Corrections typography, accessibilité, layout mobile
- Ajustements navbar, boutons, espacement

---

## Migration technique (`80538f5`)

- **CRA → Vite** (bundler)
- **Three.js r170** (mise à jour majeure)
- Images converties en **WebP**
- Ajout headers de sécurité (CSP, CORS)
- Corrections shaders Three.js (varyings, colorspace, API r163+)
- Config PostCSS : `@csstools/postcss-global-data` pour les `@custom-media`
