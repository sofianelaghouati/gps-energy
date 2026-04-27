# Brief projet - GPS Energy

## Contexte

Le site s'appelle **GPS Energy**.

Il s'agit d'une société pétrolière spécialisée dans des services techniques oil & gas :

- Artificial Hydraulic Lift
- Welltest & Slickline
- Wellhead Maintenance

Le site doit être un **site vitrine premium**, avec un rendu professionnel, industriel et crédible, mais aussi un vrai effet **wow**. L'objectif n'est pas de faire une page générique, mais une présence visuelle forte qui donne immédiatement confiance.

## Logo

Logo fourni :

`C:\Users\dell\Downloads\gps_energy_updated (1).png`

Le logo représente une identité autour de l'énergie, de la flamme, du pétrole, du puits et de la structure industrielle. Il doit guider toute l'identité visuelle du site.

## Identité visuelle

Respecter au maximum les couleurs du logo :

- Orange vif : énergie, flamme, action, pétrole, puissance.
- Violet / bleu-violet : technologie, fiabilité, structure, précision.
- Blanc : clarté, lisibilité, identité nette.
- Gris graphite / noir industriel : à utiliser en appui pour renforcer le côté oil & gas premium.
- Gris acier / gris froid : possible pour les surfaces secondaires, séparateurs et textes discrets.

Important : les couleurs exactes doivent idéalement être échantillonnées depuis le logo original avant implémentation, afin de rester fidèle à la marque.

L'ambiance doit être :

- premium
- industrielle
- technique
- claire
- moderne
- impactante
- crédible pour le secteur pétrolier

Eviter un rendu trop générique, trop SaaS, trop startup ou trop décoratif. Le design doit évoquer le terrain, la performance, les équipements lourds, les puits, la pression, la maintenance et l'expertise.

## Langues

Le site doit être disponible en :

- Anglais, langue prioritaire
- Français, langue secondaire

Utiliser **next-intl** pour l'internationalisation.

Rappel :

- `next-intl` est la librairie à utiliser pour les traductions et routes localisées.
- `Intl` est l'API JavaScript native pour les dates, nombres, devises, etc.

La structure recommandée :

- `/en` pour l'anglais
- `/fr` pour le français
- redirection propre depuis `/` vers la locale par défaut, probablement `/en`
- switch de langue visible et propre : `EN / FR`

Les contenus doivent désormais être rédigés d'abord en anglais, puis traduits en français de manière professionnelle et naturelle.

## Source de contenu principale - LinkedIn GPS ENERGY

Page LinkedIn :

`https://www.linkedin.com/company/gps-energy-dz`

Le contenu corporate prioritaire doit s'appuyer sur la page LinkedIn publique de GPS ENERGY.

Éléments importants à reprendre et reformuler proprement :

- GPS ENERGY est une société algérienne du secteur **Oil and Gas**.
- Positionnement LinkedIn : **Driving Innovation in O&G**.
- Société fondée en **2021**.
- Taille indiquée : **11-50 employees**.
- Type : **Privately Held**.
- GPS Energy fournit des services terrain spécialisés et intégrés pour l'industrie oil & gas.
- Engagement fort autour de la qualité, la sécurité et la fiabilité opérationnelle.
- Services mentionnés :
  - rental of heavy industrial equipment
  - transport and logistical support for petroleum operations
  - wellhead maintenance and component replacement
  - installation and operation of artificial lift systems, notamment Jet Pump
  - surface production equipment operation and servicing
- Vision : devenir un partenaire stratégique du développement des infrastructures énergétiques en Algérie et en Afrique du Nord.
- Mission : délivrer des services techniques précis qui soutiennent la continuité de production et l'efficacité terrain.
- Valeurs : professionalism, transparency, safety, innovation, teamwork.
- GPS Energy communique les certifications :
  - ISO 9001:2015
  - ISO 45001:2018
  - ISO 14001:2015
- GPS Energy communique l'introduction de la technologie **Jet Pump** en Algérie en partenariat avec **Sonatrach**.
- La technologie Jet Pump est à présenter comme une solution d'artificial lift adaptée aux environnements difficiles, puits sableux, puits à basse pression et conditions instables.
- Contact opérationnel mentionné pour les opportunités WT/SL : `logistic_services@gps-energy.com`.

Le contenu du site doit être en anglais naturel, corporate et technique, puis décliné en français. Éviter de copier-coller les posts LinkedIn : reformuler en version site web premium, plus concise et plus maîtrisée.

## Responsive

Le site doit être pensé pour :

- mobile
- tablette
- desktop

Le responsive doit être prévu dès le départ, pas ajouté après coup.

Points importants :

- navigation mobile claire
- hero impactant sur mobile et desktop
- textes lisibles sur petits écrans
- aucune superposition incohérente entre textes, boutons, images et sections
- sections bien rythmées
- images avec cadrages adaptés selon les écrans

## SEO, SSG et Next.js

Utiliser le routing de Next.js avec les meilleures pratiques modernes :

- App Router
- routes localisées avec `next-intl`
- génération statique autant que possible
- SSG pour les pages vitrines
- contenus server-side autant que possible
- minimum de JavaScript client
- structure HTML sémantique
- balises `h1`, `h2`, `h3` cohérentes
- metadata par langue avec `generateMetadata`
- titres SEO localisés
- descriptions SEO localisées
- canonical URLs
- `hreflang` pour français et anglais
- Open Graph
- Twitter cards
- `sitemap.xml`
- `robots.txt`
- URLs propres et stables

Avant d'écrire du code Next.js dans ce projet, respecter la règle du repository :

> Cette version de Next.js peut avoir des changements cassants. Lire les guides pertinents dans `node_modules/next/dist/docs/` avant d'implémenter.

## Images et performance

Le site doit être performant et adapté aux devices.

Utiliser :

- `next/image`
- images optimisées
- formats modernes si disponibles : AVIF / WebP
- tailles responsives avec `sizes`
- lazy-loading pour les images non critiques
- `priority` uniquement pour les assets critiques, comme le hero ou le logo principal
- placeholders propres si nécessaire
- alt text descriptif en français et en anglais
- noms de fichiers SEO-friendly

Important : ne pas envoyer une image desktop trop lourde sur mobile.

Prévoir si nécessaire :

- variantes mobile / desktop
- cadrages différents selon le device
- art direction via `<picture>` ou logique équivalente si `next/image` ne suffit pas

## Direction design du site

Le site doit être une vraie vitrine de présentation pour GPS Energy.

Objectif de première impression :

> GPS Energy est une société oil & gas technique, sérieuse, moderne, capable d'intervenir sur des opérations critiques avec précision et fiabilité.

Le logo ne doit pas seulement être posé dans le header. Toute l'identité du site doit être construite autour de ses codes :

- flamme
- énergie
- puits
- pression
- mouvement vertical
- structure métallique
- précision opérationnelle

Le rendu doit être clair, mais pas plat. Le site doit donner une impression haut de gamme et maîtrisée.

## Services à présenter

Services principaux :

1. Artificial Hydraulic Lift
2. Welltest & Slickline
3. Wellhead Maintenance

Chaque service doit être présenté avec :

- un titre clair
- une courte explication
- un bénéfice client
- une iconographie ou un visuel cohérent
- une traduction française et anglaise

## Structure possible du site

Structure recommandée pour un site vitrine one-page ou multi-sections :

1. Header avec logo, navigation, switch langue, CTA contact
2. Hero premium avec promesse forte
3. Section expertise / positionnement
4. Section services
5. Section pourquoi GPS Energy
6. Section chiffres, capacités ou engagements si le contenu est disponible
7. Section sécurité / fiabilité / terrain
8. Section contact
9. Footer bilingue avec informations de contact

Le hero doit être fort visuellement. Pour une page vitrine, éviter une simple composition fade. Utiliser une image ou un visuel industriel pertinent, idéalement lié aux équipements pétroliers, au wellhead, au site de production ou à l'énergie.

## Ton de contenu

Ton anglais prioritaire :

- naturel
- corporate
- technique sans être trop lourd
- adapté à une société oil & gas
- premium
- confiant
- orienté expertise terrain

Ton français secondaire :

- professionnel
- précis
- premium
- clair
- traduit naturellement depuis l'anglais, sans rigidité

Eviter :

- les slogans creux
- les phrases trop marketing
- le jargon excessif
- les formulations génériques qui pourraient convenir à n'importe quelle entreprise

## Contraintes importantes

- Site mobile et desktop.
- Anglais prioritaire.
- Français disponible.
- Utiliser `next-intl`.
- Utiliser le routing Next.js proprement.
- Respecter SEO, SSG, metadata et performance.
- Optimiser les images selon le device.
- Respecter au maximum l'identité du logo.
- Construire une vraie identité visuelle claire, pas une simple palette appliquée.
- Le résultat doit faire "wow" tout en restant crédible pour une société pétrolière.

## Référence d'inspiration - AKT Oil Services

Site analysé :

`https://www.aktoilservices.com/`

Cette référence sert uniquement de direction d'ambiance et de niveau de finition. Le site GPS Energy ne doit pas copier AKT Oil Services, mais peut s'inspirer de certains principes visuels pertinents pour le secteur oil & gas.

### Ce qui fonctionne bien dans la référence

- Direction visuelle très premium, industrielle et sérieuse.
- Hero très impactant avec une grande image terrain en plein écran.
- Typographie très grande, sobre, presque éditoriale.
- Palette minimale noir / blanc avec quelques accents de marque.
- Navigation discrète, élégante et peu encombrante.
- Sections très aérées, avec une alternance forte entre fonds blancs et fonds noirs.
- Mise en avant de preuves de crédibilité : capacités, standards HSE, partenariats, heures travaillées sans accident.
- Utilisation d'images réelles liées au terrain, aux équipements et aux équipes.

### Points à adapter pour GPS Energy

- Garder l'effet premium et industriel, mais intégrer plus fortement les couleurs du logo GPS Energy : orange vif, violet / bleu-violet, blanc, graphite et gris acier.
- Rendre la navigation plus explicite que sur AKT, afin de faciliter la conversion et l'accès aux services.
- Prévoir un switch de langue visible `EN / FR`.
- Mettre le CTA contact en évidence dès la navbar.
- Garder un hero très fort, mais avec un message plus direct sur l'expertise technique de GPS Energy.
- Utiliser les codes du logo dans la composition : flamme, énergie, puits, pression, mouvement vertical, structure métallique.

### Direction navbar

La navbar doit être premium, sobre et fonctionnelle :

- logo GPS Energy à gauche
- liens desktop : `Expertise`, `Services`, `Sécurité`, `Contact`
- switch langue : `EN / FR`
- CTA principal : `Contact us`
- menu mobile clair via bouton burger
- fond transparent ou semi-transparent au-dessus du hero
- contraste excellent sur image sombre
- comportement responsive prévu dès le départ

### Direction hero / première vue

Le hero doit être la première preuve de crédibilité du site :

- image industrielle forte en arrière-plan, idéalement liée au wellhead, au site de production, aux opérations terrain ou aux équipements oil & gas
- overlay sombre maîtrisé pour garantir la lisibilité
- très grand titre blanc, premium et direct
- accents orange et violet inspirés du logo, utilisés avec retenue
- message orienté terrain et opérations critiques
- deux CTA possibles : contact et services

Exemple de direction de contenu en anglais :

> GPS Energy  
> Driving Innovation in O&G  
> Integrated field services for critical oil and gas operations.

CTA possibles :

- `Discuss a project`
- `Explore services`

### Première section après le hero

La première section doit installer la crédibilité immédiatement, comme AKT le fait avec ses blocs factuels, mais avec un contenu adapté à GPS Energy :

- présenter rapidement les trois services principaux
- ajouter des preuves de sérieux : opérations critiques, fiabilité terrain, sécurité, maintenance, précision technique
- utiliser des icônes ou pictogrammes sobres liés au puits, à la pression, à la maintenance et à l'énergie
- inclure une image verticale ou un visuel industriel secondaire pour renforcer le côté terrain

Cette section doit rester claire, premium et très lisible sur mobile.

## Animations et scroll - GSAP

Librairie souhaitée :

`https://gsap.com/scroll/`

Utiliser **GSAP** pour apporter une sensation moderne, premium et maîtrisée aux interactions de scroll. Les animations doivent renforcer la crédibilité et la fluidité du site, sans devenir décoratives ou distrayantes.

### Plugins et usages recommandés

- `ScrollTrigger` pour déclencher les animations au scroll.
- `ScrollSmoother` si compatible avec l'architecture Next.js et les contraintes de performance.
- `ScrollTo` pour les transitions fluides vers les sections depuis la navigation.
- `Observer` uniquement si un besoin d'interaction scroll/touch plus avancé apparaît.
- `@gsap/react` et `useGSAP()` pour intégrer GSAP proprement dans les composants React côté client.

### Effets à privilégier

- apparition progressive du hero et de ses éléments typographiques
- léger parallax sur l'image hero ou certains visuels industriels
- révélation des sections au scroll avec fade / translate très subtil
- animation de lignes, séparateurs ou éléments techniques inspirés du logo
- mise en mouvement discrète des cartes services
- transition fluide vers les ancres de navigation
- animations différenciées desktop / mobile si nécessaire

### Contraintes d'animation

- Les animations doivent rester sobres, premium et adaptées au secteur oil & gas.
- Eviter les effets trop ludiques, trop flashy ou trop startup.
- Respecter `prefers-reduced-motion` pour les utilisateurs qui réduisent les animations.
- Ne pas dégrader les performances mobile.
- Garder le contenu principal accessible même si JavaScript est désactivé ou lent à charger.
- Limiter les composants client aux zones réellement animées.
- Ne pas animer les textes d'une manière qui nuit à la lecture ou au SEO.
- Vérifier qu'aucune animation ne crée de superposition incohérente sur mobile.

### Intention visuelle

Les animations doivent évoquer :

- précision opérationnelle
- énergie contrôlée
- mouvement vertical lié au puits et au levage
- pression, flux et circulation
- structure métallique et rigueur technique

L'objectif est de donner au site une sensation haut de gamme, fluide et contemporaine, tout en restant crédible pour une société pétrolière technique.
