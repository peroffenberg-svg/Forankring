# Forankring av trykkledninger — VAV Oslo

Interaktiv beregningskalkulator for forankring av trykkledninger (duktilt støpejern og PE), basert på VA-miljøblad 96 & 127 og Oslo kommunes VA-norm.

## Prosjektstruktur

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Hovedkomponent med tab-navigasjon
├── theme.js              # Farger og fonter (endre her for å endre hele designet)
├── styles.css            # Globale CSS-variabler og reset
├── data/
│   ├── calc.js           # Rene beregningsfunksjoner (ingen UI)
│   └── tables.js         # Referansedata (dimensjoner, standarder)
└── components/
    ├── UI.jsx            # Gjenbrukbare UI-komponenter (InputField, ResultRow, etc.)
    ├── Diagrams.jsx      # SVG-illustrasjoner (BendDiagram, AnchorBlock, PEWall)
    ├── TabDuktilt.jsx    # Fane: Duktilt støpejern-beregning
    ├── TabPE.jsx         # Fane: PE-ledningsberegning
    ├── TabTabeller.jsx   # Fane: Oppslagstabeller
    └── TabInfo.jsx       # Fane: Info, referanser, formler
```

## Kom i gang

### Forutsetninger
- [Node.js](https://nodejs.org/) v18+ installert

### Installasjon

```bash
# Klon repoet
git clone https://github.com/DITT-BRUKERNAVN/forankring-kalkulator.git
cd forankring-kalkulator

# Installer avhengigheter
npm install

# Start utviklingsserver
npm run dev
```

Åpne http://localhost:5173 i nettleseren.

### Bygg for produksjon

```bash
npm run build
```

Ferdig bygd side havner i `dist/`-mappen.

## Publisering til GitHub Pages

### Alternativ A: Automatisk med gh-pages

1. Opprett repo på GitHub (f.eks. `forankring-kalkulator`)

2. Sjekk at `base` i `vite.config.js` matcher reponavnet:
   ```js
   base: '/forankring-kalkulator/',
   ```

3. Koble til remote og push kildekoden:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/DITT-BRUKERNAVN/forankring-kalkulator.git
   git push -u origin main
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

   Dette bygger og pusher `dist/` til `gh-pages`-branchen automatisk.

5. Gå til **Settings → Pages** i GitHub-repoet og velg:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **(root)**

Siden er da live på `https://DITT-BRUKERNAVN.github.io/forankring-kalkulator/`

### Alternativ B: GitHub Actions (CI/CD)

Opprett `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

Da deployes det automatisk ved push til `main`.

## Tilpasninger

### Endre farger og fonter
Alt styres fra `src/theme.js`. Endre der, resten følger automatisk.

### Legge til ny fane
1. Opprett `src/components/TabNyFane.jsx`
2. Importér i `App.jsx` og legg til i `tabs`-arrayen

### Endre beregningslogikk
All beregning er i `src/data/calc.js` — rene funksjoner uten UI-avhengigheter.
Enkelt å enhetsteste separat.

### Endre referansedata
Dimensjonstabeller og standardreferanser ligger i `src/data/tables.js`.

## Standardreferanser

- Oslo kommunes VA-norm, kap. 5.11 & 5.17
- VA-miljøblad nr. 96: Forankring av trykkledninger (rev. 06.09.2019)
- VA-miljøblad nr. 127: Forankring av PE-ledninger
- VA-miljøblad nr. 112: Kumsikkerhet
- Pipelife Rørhåndbok 2007, kap. 3

> **NB:** VA-miljøbladene er under utfasing og erstattes gradvis av
> [Vannstandard](https://vannstandard.no) (Norsk Vann).
