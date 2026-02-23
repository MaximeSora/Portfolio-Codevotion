# Notes de suivi — Portfolio Maxime Pocq

## Contexte
- **Source** : `C:\Users\Sora\Documents\GitHub\portfolio-codevotion`
- **Build** : `C:\Users\Sora\Documents\GitHub\Portfolio-2026` (snapshot du build compilé)
- **Déployé sur** : Vercel (maximepocq.com)
- **Stack** : React 17 + Vite 5 + Three.js 0.170 + postprocessing 6.x + SCSS + react-router v5

---

## Session du 23 février 2026

### Audit Lighthouse (point de départ)
Rapport : `Portfolio-2026/save/maximepocq.com-20260223T002609.json`

| Catégorie | Score |
|-----------|-------|
| Performance | 73/100 |
| Accessibilité | 100/100 |
| Bonnes pratiques | 100/100 |
| SEO | 100/100 |

Problèmes identifiés :
- **LCP 11.7s** (cible < 2.4s) — causé par JS inutilisé + images lourdes
- **404 KiB JS inutilisé** — Three.js / postprocessing
- **Images PNG lourdes** — thumbnails pornhub (669 KB) + solbase (165 KB)
- **Aucun header de sécurité HTTP**
- **Build cassé** — Diamond component avec imports manquants (react-three-fiber, @react-three/drei, lerp)
- **CRA (Create React App) incompatible avec Node 22**

---

### Changements effectués

#### 1. Correction du build
- **Supprimé** `src/components/Diamond/` entier — code mort (composant jamais monté) qui causait 3 imports manquants et cassait le build
- **Remplacé** `node-sass` (incompatible Node 22) → `sass` (Dart Sass)

#### 2. Optimisation images
- Converti `src/assets/pornhub/thumbnail.png` (669 KB) → `thumbnail.webp` **(69 KB, -90%)**
- Converti `src/assets/solbase/thumbnail.png` (165 KB) → `thumbnail.webp` **(25 KB, -85%)**
- Mis à jour les imports dans :
  - `src/components/Model/deviceModels.js`
  - `src/pages/Home/ProjectSummary.js`
  - `src/pages/Pornhub/index.js`
- Supprimé l'import `pornhub` mort dans `src/pages/Home/index.js`

#### 3. Migration CRA → Vite
CRA est officiellement déprécié et incompatible avec Node 22.

**Packages supprimés** : `react-scripts`, `react-scripts-postcss`, `mdx-loader`, `babel-loader`, `@babel/core`, tous les `@storybook/*`, `enzyme`, `enzyme-adapter-react-16`, `react-snap`

**Packages ajoutés** :
- `vite@^5.4.0` + `@vitejs/plugin-react@^4.3.0`
- `@mdx-js/rollup@^3.1.0` + `remark-frontmatter@^5.0.0` + `remark-mdx-frontmatter@^4.0.0`
- `vite-plugin-svgr@^3.3.0` — support des SVG importés en `ReactComponent` (pattern CRA)
- `three@^0.170.0` (était 0.128.0)

**Résultat** : 2748 packages → 281, 264 vulnérabilités → 8

**Fichiers créés/modifiés** :
- `vite.config.mjs` — config Vite avec aliases (assets, components, hooks, pages, posts, utils, app), plugins MDX + SVGR + React, chunks manuels (three, postprocessing)
- `index.html` — déplacé de `public/` vers la racine, ajout du `<script type="module" src="/src/index.js">`
- `src/index.js` — supprimé le pattern `hydrate`/`render` de react-snap, simplifié en `render(<App />, ...)`
- `src/posts/index.js` — `require.context` webpack → `import.meta.glob` Vite
- `src/pages/Articles/index.js` — `require('posts/assets/...')` → `import.meta.glob` + helper `getPostAsset()`
- `.babelrc` supprimé
- `.env` (SKIP_PREFLIGHT_CHECK) supprimé

#### 4. Migration Three.js r128 → r170
Breaking changes corrigés dans 4 composants :
- `sRGBEncoding` → `SRGBColorSpace`
- `renderer.outputEncoding` → `renderer.outputColorSpace`
- `texture.encoding` → `texture.colorSpace`

Fichiers modifiés :
- `src/components/Carousel/index.js`
- `src/components/DisplacementSphere/index.js`
- `src/components/Model/index.js`
- `src/components/Portrait/index.js`

#### 5. Headers de sécurité HTTP
Ajoutés dans `vercel.json` :
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy` — couvre self, inline scripts (CRA legacy), Google Fonts, gstatic.com (DRACO)

---

### État du build

```
✓ built in 2.91s  (Vite 5)
```

Build output : `build/` (anciennement `build/static/` avec CRA)

Chunks séparés (lazy-loaded) :
- `three-*.js` — 523 KB / gzip 132 KB
- `postprocessing-*.js` — 81 KB / gzip 18 KB
- Pages et composants 3D chargés à la demande

---

### Lazy loading (déjà en place avant cette session)
- `DisplacementSphere` — `React.lazy()` dans `src/pages/Home/Intro.js`
- `Portrait` — `React.lazy()` dans `src/pages/Home/Profile.js`
- Toutes les pages — `React.lazy()` dans `src/app/index.js`

---

### À faire (prochaines sessions)

- [ ] **Tester visuellement** avec `npm run preview` — vérifier le rendu 3D, les animations, les pages projets
- [ ] **Déployer sur Vercel** depuis ce repo source (configurer Vercel pour pointer sur `portfolio-codevotion`)
- [ ] **Vérifier les headers** dans DevTools → Network → Response Headers après déploiement
- [ ] **Relancer Lighthouse** pour mesurer le gain LCP (objectif < 4s dans un premier temps)
- [ ] **Optimiser d'autres images** — `game-select.png` (478 KB), `onboarding.png` (653 KB), `solfhero.png` (789 KB), `settings.png` (750 KB) — candidates pour WebP
- [ ] **Mettre à jour React 17 → 18** — changer `render()` → `createRoot()` dans `src/index.js`
- [ ] **Mettre à jour react-router-dom v5 → v6** — rewrite des routes avec le nouveau format `<Routes>/<Route>`
- [ ] **Supprimer `react-ga` et `react-hotjar`** — analytics déjà gérés inline dans index.html via GA4
- [ ] **CSP tightening** — remplacer `unsafe-inline` par nonces une fois React 18 + Vite stables
- [ ] **`physicallyCorrectLights`** dans Model/index.js est déprécié en r150+ → `useLegacyLights = false`

---

### Commandes utiles

```bash
# Dev
npm run start        # Vite dev server

# Build
npm run build        # Build production dans build/

# Preview du build
npm run preview      # Serveur local du build produit

# Analyse des bundles
npm run analyze      # source-map-explorer (après npm run build)
```
