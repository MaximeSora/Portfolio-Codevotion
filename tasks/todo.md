# Task Tracker

## Current Task

- [x] Goal: vérifier et nettoyer les fichiers doublons `* 2.*` et `* 3.*` du repo local
- [x] Inspect: comparer chaque doublon non suivi à son fichier source probable
- [x] Cleanup: supprimer uniquement les doublons confirmés inutiles
- [x] Verification: valider l'état Git après nettoyage
- [x] Result: les doublons du worktree ont été nettoyés; il ne reste plus que `.git/index 2`, `.git/index 3` et `.git/index 4`, qui sont des artefacts internes Git hors repo et non des fichiers du projet

## Current Task

- [ ] Goal: vérifier complètement la PR `#2` après résolution du conflit
- [ ] Discover: lister les checks locaux réellement disponibles dans le repo
- [ ] Verify: exécuter les checks locaux pertinents
- [ ] Monitor: suivre les checks GitHub/Vercel jusqu'à un état final

## Current Task

- [x] Goal: résoudre le merge conflict du PR GitHub `#2` sur `Portfolio-Codevotion`
- [x] Inspect: comparer `main` et `pr-2` pour identifier les conflits réels et les fichiers impactés
- [x] Resolve: nettoyer les conflits dans `Home/index.js`, `Home/Intro.js`, `Home/Profile.js` et `CaseStudy/CaseStudy.css`
- [x] Verification: valider l'absence de marqueurs de merge et lancer un build ciblé
- [x] Result: merge local sur `codex/pr-2-merge-fix` sans conflits restants, avec build `npm run build` OK

## Current Task

- [x] Goal: analyser les case studies Notion du portfolio et identifier les projets récents encore en rédaction
- [x] Fetch: récupérer les pages portfolio et case studies principales
- [x] Review: analyser positionnement, structure, clarté, preuve, langue, et défauts de packaging
- [x] Result: revue réalisée avec focus sur `Home Charging Quotation Tool` et `Financing Simulator — Reshape 2026`, en distinguant les défauts structurels des contenus encore en rédaction.

## Current Task

- [x] Goal: proposer une réécriture plus senior des case studies
- [x] Draft: proposer une trame plus resserrée pour `Home Charging`
- [x] Draft: proposer une trame plus resserrée pour `Financing Simulator`
- [x] Result: structure éditoriale resserrée orientée impact, avec adaptation explicite aux projets en cours.

## Current Task

- [x] Goal: éditer directement les case studies dans Notion
- [x] Structure: recentrer les pages sur problème, décisions, impact et rôle
- [x] Edit plan: placer les détails secondaires dans des sections repliées par défaut
- [x] Result: les 6 case studies principaux ont été restructurés avec un framing plus senior et une lecture principale allégée.

## Current Task

- [x] Goal: intégrer explicitement le prisme des 4 risques produit dans les case studies
- [x] Update: ajouter `Value / Usability / Viability / Feasibility risk` aux 4 projets déjà retravaillés
- [x] Update: restructurer `Home Charging Quotation Tool` avec cet angle
- [x] Update: restructurer `Financing Simulator — Reshape 2026` avec cet angle
- [x] Verification: vérifier que le framing reste crédible et non scolaire
- [x] Result: les 6 case studies principaux portent désormais explicitement un angle de réduction de risques produit.

## Current Task

- [x] Goal: harmoniser la structure et le ton des 6 case studies principaux
- [x] Edit: lisser les intitulés de sections et la formalisation globale
- [x] Edit: homogénéiser les sections de fermeture et le wording des détails repliés
- [x] Deliver: recommander un usage senior du bloc before/after
- [x] Result: sections harmonisées autour d’un schéma stable (`What was risky`, `My role` ou `What I worked on`, `Product risks I helped reduce`, `Outcome`).

## Current Task

- [x] Goal: reprendre l’édition Notion après la rupture d’authentification
- [x] Diagnose: vérifier si l’accès Notion MCP est rétabli
- [x] Fetch: relire les pages utiles pour identifier où réinsérer les visuels de process
- [x] Discover: retrouver la sauvegarde `project save` / `Case studies (1)` / `Projects Save`
- [x] Fetch: extraire depuis les archives les anciens contenus et visuels de process utiles
- [x] Edit: enrichir les toggles de process et relier les pages actuelles à leurs versions source archivées
- [x] Result: les pages actuelles renvoient vers les archives de process quand la réinjection inline d’images n’est pas fiable via MCP.

## Current Task

- [x] Goal: tester la réinjection inline des visuels de process dans les case studies cibles
- [x] Test: valider sur un case study que les images inline restaurées via MCP sont normalisées en vide
- [x] Result: même avec une URL signée Notion complète, `notion_update_page` réécrit encore l’image en `![]()` vide dans le contenu cible; la réinjection inline n’est donc pas fiable via MCP.

## Current Task

- [x] Goal: enrichir `FinSim` avec une ouverture plus portfolio et des placeholders d’images
- [x] Edit: ajouter `Overview`, `Role`, `Responsibilities`, `Collaborators`, `Timeline`, `Goals`
- [x] Edit: renommer `My role` en `What I worked on`
- [x] Edit: ajouter des placeholders d’images explicites dans les sections clés
- [x] Verification: relire la page Notion finale
- [x] Result: `FinSim` ouvre maintenant avec un bloc compact de contexte et de scope, plus plusieurs emplacements visuels explicites à réinjecter manuellement.

## Current Task

- [ ] Goal: poursuivre l’enrichissement portfolio dans le bon repo
- [ ] Next: appliquer au moins la même passe d’ouverture enrichie et de placeholders visuels à `Home Charging`
- [ ] Next: décider projet par projet si les détails de process doivent pointer vers l’archive ou être réintégrés manuellement dans les toggles

## Current Task

- [x] Goal: centraliser le contexte conversationnel sur les case studies dans une base récupérable par le repo
- [x] Create: ajouter `src/data/projectContext.json` avec le cadrage, le scope, les décisions, contraintes, impacts crédibles et risques produit par projet
- [x] Verification: valider la structure JSON et la présence des 6 projets suivis
- [x] Result: la base de contexte portfolio est disponible dans `src/data/projectContext.json` pour nourrir de futurs enrichissements du site ou des case studies.
