# CLAUDE.md — Šablona pro jednoduché prezenční weby

> Univerzální šablona pro menší prezenční weby (Home, O nás, Co děláme, Kontakt...).
> Stack: Astro + TypeScript (lehčí strict) + Tailwind + Netlify + Netlify Forms.
> Vývoj přes Claude Code / Antigravity.

---

## 🛠 Technologický stack

| Vrstva          | Technologie                        | Verze                        | Poznámka                                                                                       |
| --------------- | ---------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| Framework       | Astro                              | 6.x                          | Static/SSG, islands architektura, vestavěné CSP a Fonts API                                    |
| Jazyk           | TypeScript                         | 5.x (strict, lehčí konvence) | viz sekce Konvence kódu                                                                        |
| Stylování       | Tailwind CSS                       | 4.x                          | CSS-first config (`@theme`), mobile-first                                                      |
| Formuláře       | Netlify Forms + reCAPTCHA v2/v3    | —                            | Bez backendu, bez DB, bez Google Cloud karty                                                   |
| Deploy          | Netlify                            | —                            | Node 22+ (vyžaduje Astro 6)                                                                    |
| Databáze & Auth | Supabase                           | JS SDK v2                    | **Volitelné** — jen pokud projekt potřebuje víc než statický obsah + formulář (viz sekce dole) |
| Animace         | CSS nativní + View Transitions API | —                            |                                                                                                |

---

## 🤝 Účty: klient vs. programátor

Kdo vlastní co a jak se předává přístup — důležité rozhodnout na začátku každého klientského
projektu, ne až při jeho konci.

### Obecné pravidlo

U **klientských projektů** vlastní **GitHub, Netlify i doménu klient**, ty dostáváš přístup jako
spolupracovník. Důvody:

- Klient není závislý na tobě — pokud spolupráce skončí (nemoc, konec zakázky, cokoliv), má web
  plně pod kontrolou a může pokračovat s kýmkoliv jiným
- Chrání i tebe — nejsi ten, kdo je "zodpovědný" za desítky cizích repozitářů/webů na svém účtu,
  ani za to, co se stane, když klientovi vyprší platba za plán, na kterém běží i jiné tvoje projekty

U **vlastních projektů** (Kreaturky, SEDHO) dává smysl mít účty na sebe — žádný klient, co by
potřeboval nezávislost, tu není.

### GitHub

1. Klient si založí účet a repozitář (u víc než jednoho spolupracovníka do budoucna lépe rovnou
   **Organizaci**, i pro jednoho člověka)
2. Repo/Organizace → Settings → Collaborators (nebo People u Organizace) → pozve tě e-mailem
   s právem **Write** (nebo **Admin**, pokud budeš nastavovat i Netlify propojení/CI)
3. Přijmeš pozvánku svým GitHub účtem — pracuješ normálně (`git clone`, `git push`) na cizím repu

### Netlify

1. Klient založí účet a vytvoří **Team** (i pro jednoho člověka — Netlify to tak strukturuje)
2. Team settings → Members → pozve tě jako **Developer** nebo **Owner**
3. Přijmeš svým Netlify účtem — spravuješ deploy/env proměnné/`_headers` v jeho Teamu, jen
   přepínáš mezi "svým" a "jeho" Teamem ve vlastním přihlášení

> ⚠️ **Bezplatný (Starter) Netlify plán členy týmu nepřidá** — "Team settings → Members" u
> free plánu jen nabídne upgrade na placený plán. Pokud klient nechce platit, tenhle krok
> udělat nejde a je potřeba rovnou řešit nasazení jinak — viz sekce **Nasazení (CI/CD)** níže.

### Nasazení (CI/CD) — GitHub Actions místo přímé Netlify integrace

Netlify's **bezplatný plán** u **soukromých** repozitářů povoluje automatické buildy jen od
**jednoho ověřeného přispěvatele Git** (typicky ten GitHub účet, kterým se dělal "Import from
Git" při zakládání site). Push od kohokoliv jiného (třeba tebe jako vývojáře, když klient
nemůže na free plánu přidat dalšího Netlify team membera — viz varování výše) build **rovnou
zablokuje** chybou `unrecognized Git contributor`, ještě než se vůbec pokusí sestavit.

Tohle není bug, je to záměrné omezení bezplatného plánu. Netlify v tom hlášení nabízí dvě
cesty: zveřejnit repo, nebo upgradovat na Pro. Pro klientské projekty, kde má repo zůstat
**soukromé** a placení klienta za Pro není žádoucí, je čistší **obejít Netlify's vlastní Git
integraci úplně** a nahazovat přes GitHub Actions + Netlify CLI — tahle kontrola platí jen
pro Netlify's vlastní sledování repa, ne pro nasazení přes API/CLI:

1. Klient vygeneruje **Netlify Personal Access Token** (User settings → Applications → New
   access token)
2. Token se uloží jako **GitHub Secret** (`NETLIFY_AUTH_TOKEN`) v repu, spolu se **Site ID**
   webu (`NETLIFY_SITE_ID`, najdeš v Site configuration → General → Project details) —
   zašifrované, po uložení je nikdo nevidí ani nejde zpětně přečíst
3. Workflow `.github/workflows/deploy.yml` při každém pushi na `main`: nainstaluje závislosti,
   spustí `npm run build`, výsledek nahraje přes `netlify deploy --prod --dir=dist`
4. V Netlify se **vypne vlastní Continuous Deployment** (sledování Git repa v Build & deploy),
   ať se nepokouší stavět samo souběžně a nenaráží na stejnou chybu

Výhody: repo zůstává privátní, žádné dodatečné náklady (GitHub Actions má u soukromých
repozitářů 2000 minut/měsíc zdarma, build takhle malého webu trvá řádově desítky sekund), a
funguje bez ohledu na to, kolik lidí/jaké GitHub účty do repa pushují — ideální i pro projekty
s citlivějším kódem (backend, API klíče), kde zveřejnění repa není přijatelná varianta.

Nastavit rovnou při zakládání nového klientského projektu, pokud je repo soukromé a klient
je na bezplatném Netlify plánu — ne až narazíte na `unrecognized Git contributor` uprostřed
práce.

### Doména

- Registruje si klient sám (Wedos, Active24, Forpsi apod.), zůstává na jeho jméno/firmu
- Tobě stačí přístup do DNS správy (buď mu řekneš, co nastavit, nebo ti dá dočasný přístup) —
  plné "vlastnictví" domény nepotřebuješ

### reCAPTCHA (Google)

- Site key/secret key zakládej pod **svým vlastním Google účtem**, ne klientovým — jeden účet
  napříč všemi projekty (tvoje i klientské) znamená míň admin práce a konzistenci
- Free limit 10 000 ověření/měsíc je sdílený napříč **celým tvým Google Cloud projektem**, ne
  per doména — u pár prezenčních webů měsíčně to není problém
- Trade-off: pokud klient web někdy převezme úplně, klíč se buď přehodí na jeho vlastní účet,
  nebo se založí nový — jednorázová věc při předání, ne průběžná práce

### Google Search Console

Na rozdíl od reCAPTCHA patří pod **klientův vlastní Google účet** (ideálně stejný, jaký
používá pro Google Business Profile) — obsahuje dlouhodobě cenná SEO data (indexace, výkon
ve vyhledávání, klikání), která má klient vlastnit stejně jako doménu nebo GitHub repo.

1. Klient na [search.google.com/search-console](https://search.google.com/search-console)
   založí **property typu Doména** (ne URL prefix — pokrývá všechny varianty www/non-www/http/https
   najednou) pro vlastní doménu
2. Ověření vlastnictví přes **DNS TXT záznam** — Google vygeneruje řetězec, přidá se do DNS
   správy domény (u tohoto stacku typicky přímo v Netlify DNS, pokud tam DNS běží)
3. Klient tě přidá jako spolupracovníka: **Settings → Users and permissions → Add user**,
   zadá tvůj Google e-mail, role **Full** (stačí — Owner není potřeba)
4. Jakmile máš přístup, odešli/zkontroluj sitemapu (`sitemap-index.xml`, generuje ji
   `@astrojs/sitemap` automaticky) — viz sekce SEO, "Po launchi"

Nastavit hned po spuštění webu, ne až časem — čím dřív se Google Search Console začne
sbírat data, tím dřív jsou k dispozici a tím dřív web začne Google properly indexovat.

### Astro

Žádný účet není potřeba — je to jen open-source npm balíček, ne služba s přihlašováním.

### Checklist při zakládání nového klientského projektu

- [ ] Klient má vlastní GitHub účet/Organizaci, tebe pozval jako Collaborator
- [ ] Klient má vlastní Netlify Team, tebe pozval jako Developer/Owner (pokud to free plán
      umožní — jinak rovnou nastavit GitHub Actions deploy, viz sekce Nasazení výše)
- [ ] Doména je registrovaná na klienta, máš přístup do DNS správy
- [ ] reCAPTCHA klíč založený pod tvým Google účtem pro konkrétní doménu
- [ ] Google Search Console založený pod klientovým Google účtem (property Doména), tebe
      přidal jako Uživatele s rolí Full
- [ ] Jasně domluveno, co se stane s klíči/přístupy při ukončení spolupráce

---

## 📁 Struktura složek

`npm create astro@latest` dá jen holý základ — `src/pages/`, `astro.config.mjs`, `tsconfig.json`,
`package.json`, `public/`. Nic z organizace komponent, bezpečnostních hlaviček, SEO souborů ani GDPR
stránek se nevytvoří samo — to je přesně to, co přidává tahle šablona, a to konzistentně napříč
všemi projekty (aby Claude Code/Antigravity generovaly kód pokaždé na stejné místo).

```
src/
  components/
    ui/                         # Obecné UI prvky (Button, Card, Modal…)
    layout/                     # Header, Footer, Navigation (mobilní menu s aria-expanded)
    sections/                   # Sekce jednotlivých stránek (Hero, Services, Testimonials…)
    CookieConsent.astro         # Cookie lišta (role="dialog", focus trap) — viz sekce GDPR
  pages/                        # ze scaffoldu, dál rozšířené o:
    index.astro
    o-nas.astro
    co-delame.astro
    kontakt.astro
    zasady-ochrany-osobnich-udaju.astro   # GDPR placeholder stránka
    404.astro                             # vlastní branded 404 — viz sekce SEO
  layouts/
    BaseLayout.astro            # skip link, html lang="cs", meta tagy, JSON-LD
  lib/
    utils.ts
    validation.ts                # Zod 4 schémata (validace kontaktního formuláře)
  styles/
    global.css                  # @theme blok s brand tokeny — viz sekce Konvence kódu
  types/                        # Globální TypeScript typy
public/
  _headers                      # X-Frame-Options, HSTS, Permissions-Policy — viz sekce Bezpečnost
  _redirects                    # www/non-www a trailing slash — viz sekce SEO
  robots.txt                    # s odkazem na sitemap
  favicon...
astro.config.mjs                # output: 'static', security.csp, fonts (Fonts API) — viz sekce Bezpečnost/Výkon
tsconfig.json                   # ze scaffoldu
.nvmrc                          # Node 22+ (vyžaduje Astro 6) — viz sekce Kvalita kódu
.editorconfig
.husky/                         # pre-commit hooky (lint, prettier, astro check)
```

> Pozn.: Fonty se dnes nekonfigurují v `tailwind.config` ani ručně v `public/fonts/` — Astro 6 Fonts API
> je řeší přímo v `astro.config.mjs` (viz sekce Výkon), self-hosting a preload zajišťuje Astro samo.

> Pozn.: Pokud projekt v budoucnu potřebuje Supabase (např. booking, admin sekce), přidávají se
> složky `lib/supabase.ts`, `pages/api/`, `pages/admin/` a `supabase/migrations/` — viz sekce
> **Volitelné rozšíření: Supabase** na konci dokumentu.

---

## ⚙️ Konvence kódu

### TypeScript — lehčí strict režim

- `strict: true` v `tsconfig.json` **vždy zapnuté** — hlídá null/undefined a špatné typy
- `any` se snažíme nepoužívat, ale není to tvrdý zákaz jako u přísnějších projektů — použij, když to reálně dává smysl (rychlý prototyp, externí knihovna bez typů)
- Explicitní návratový typ u funkcí jen tam, kde přidává hodnotu (API volání, složitější logika) — u jednoduchých jednořádkových funkcí není povinný
- Typy a rozhraní: `PascalCase`, **bez** prefixů `I`/`T` (moderní konvence 2026, prefixy se dnes považují za zastaralé)
- Exportované konstanty: `SCREAMING_SNAKE_CASE`
- Enumerace: `PascalCase`
- **Zod 4** (Astro 6 na něj interně upgradoval) — import z `astro/zod` v content schématech, ve
  vlastním kódu (validace formuláře) běžný `import { z } from 'zod'` beze změny

### Pojmenování (anglicky, vždy)

- Proměnné a funkce: `camelCase`
- Třídy, typy, rozhraní: `PascalCase`
- Soubory s komponentami: `PascalCase.astro`
- Ostatní soubory: `kebab-case.ts`
- CSS třídy: `kebab-case`

### Astro komponenty

- Název souboru a komponenty `PascalCase` (např. `ContactForm.astro`)
- Props vždy s explicitním `interface Props` (anglicky, bez `I` prefixu — např. `Props`, ne `IProps`)
- Serverová logika pouze ve `---` frontmatter bloku
- Klientský JS jen tam, kde je nezbytně nutný (islands architektura — `client:load`, `client:visible` apod. používat cíleně, ne plošně)

### Tailwind CSS v4

- **Mobile-first přístup** — základní třídy platí pro mobil, breakpointy (`sm:`, `md:`, `lg:`) přidávají úpravy pro větší obrazovky
- Třídy řadit: layout → flexbox/grid → spacing → sizing → colors → typography → effects
- **CSS-first konfigurace** — Tailwind v4 už nepoužívá `tailwind.config.ts`. Brand barvy a fonty se
  definují přímo v `src/styles/global.css` přes `@theme` blok jako CSS custom properties
- Barvy a fonty vždy přes vygenerované tokeny (`bg-brand-primary`, `text-brand-dark` apod.), nikdy natvrdo přes libovolné `[hex]` hodnoty v kódu
- `global.css` obsahuje **prázdný placeholder** pro brand barvy/fonty — vyplňuje se per projekt při zakládání nového webu

```css
/* src/styles/global.css — placeholder, vyplnit per projekt */
@import 'tailwindcss';

@theme {
  --color-brand-primary: #000000; /* TODO: nahradit brand barvou */
  --color-brand-secondary: #000000; /* TODO: nahradit brand barvou */
  --font-heading: 'TODO-Font', sans-serif;
  --font-body: 'TODO-Font', sans-serif;
}
```

### Komentáře

- **Kód (proměnné, funkce, typy) vždy anglicky**
- **Komentáře a JSDoc vždy česky** — ať je hned jasné, co daný blok dělá
- Každý soubor začíná krátkým komentářem, co řeší
- Složitá logika má inline komentář vysvětlující PROČ, ne CO
- TODO komentáře ve formátu: `// TODO: popis úkolu`

```typescript
/**
 * Ověří vstup z kontaktního formuláře přes Zod schéma.
 * Voláno jak na klientu (UX), tak fallback při server-side zpracování.
 */
function validateContactForm(data: ContactFormData): ValidationResult {
  // Kontrolujeme honeypot pole, abychom odchytili boty ještě před reCAPTCHou
  if (data.honeypot) {
    return { valid: false, reason: 'spam-detected' };
  }
  // ...
}
```

---

## 💬 Kontaktní formulář (Netlify Forms + reCAPTCHA)

Standardní řešení pro tuto šablonu — **bez backendu, bez databáze**.

```html
<form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-recaptcha="true"
  netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden">
    <label>Nevyplňuj toto pole: <input name="bot-field" /></label>
  </p>
  <!-- běžná pole formuláře -->
  <div data-netlify-recaptcha="true"></div>
</form>
```

Pravidla:

- Honeypot pole (`netlify-honeypot`) vždy zapnuté jako první vrstva anti-spam ochrany
- reCAPTCHA v2/v3 jako druhá vrstva
- Validace na klientu přes Zod (okamžitá zpětná vazba uživateli), i když finální ochranu řeší Netlify
- Zprávy se zobrazují v Netlify dashboardu (sekce Forms) + lze nastavit emailovou notifikaci při novém odeslání (Netlify → Site settings → Forms → Notifications)
- **Žádná admin sekce na webu** — pokud chceš zprávy spravovat vlastním rozhraním (označovat vyřízeno/nevyřízeno, historie apod.), to už je případ pro volitelné rozšíření se Supabase (viz níže)

---

## 🔒 Bezpečnost — povinná pravidla

### Obecná pravidla

- Žádné tajné klíče (API keys, reCAPTCHA secret) v klientském kódu
- Všechny env proměnné prefixované `PUBLIC_` jsou viditelné klientem — pozor co tam dáváme
- Vstup od uživatele vždy validovat pomocí **Zod**, i když finální formulář jede přes Netlify

### Content Security Policy — vestavěné Astro 6 API

Astro 6 má stabilní vestavěné CSP (`security.csp` v `astro.config.mjs`) — sám hashuje všechny
bundlované skripty a styly a generuje `<meta http-equiv="content-security-policy">` s hashi, takže
u vlastního kódu odpadá ruční počítání hashů, které bylo dřív potřeba psát do `_headers`:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  security: {
    csp: {
      // Externí zdroje (reCAPTCHA, Mapy, Analytics) se musí doplnit ručně —
      // Astro hashuje jen vlastní bundlovaný kód, ne cizí skripty
      scriptDirective: {
        resources: [
          'https://www.google.com',
          'https://www.gstatic.com',
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
        ],
      },
      styleDirective: {
        resources: ["'self'"], // fonty jsou self-hostované, viz sekce Výkon
      },
    },
  },
});
```

> Poznámka: Astro CSP funguje přes `<meta>` tag, ne HTTP hlavičku — pokrývá jen `script-src`/`style-src`
> (ochrana proti XSS). `unsafe-inline` s tím není kompatibilní, takže inline `<script>` bez hashe
> spadne — Astro to hlídá už při buildu. Externí `<iframe>` (Mapy) a `connect-src` (Analytics) do
> tohohle API nespadají a doplňují se stále ručně v `_headers` níže.

### Markdown syntax highlighting — vždy Prism, ne Shiki

Výchozí Markdown zvýrazňovač kódu v Astru je **Shiki**, který barvy syntaxe vkládá přes inline
`style="..."` atributy — to koliduje s naším CSP (`styleDirective` bez `'unsafe-inline'`) a Astro
na to při buildu/devu upozorní varováním. Řešení není povolit `unsafe-inline` (oslabuje CSP), ale
přepnout na **Prism**, který zvýrazňuje přes CSS třídy:

```javascript
// astro.config.mjs
export default defineConfig({
  markdown: {
    syntaxHighlight: 'prism',
  },
});
```

Nastavit rovnou při zakládání projektu, i když zatím žádný Markdown obsah není — než se objeví
první kódový blok (blog, návod), ať to funguje bez dalšího řešení. Až Markdown obsah přibude, je
potřeba doimportovat Prism theme CSS (např. `import 'prismjs/themes/prism-tomorrow.css';` v layoutu),
Astro barvy zvýraznění samo nedodává.

### HTTP hlavičky (Netlify `_headers`)

Zbytek bezpečnostních hlaviček, které CSP API nepokrývá:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

> Poznámka: pokud konkrétní projekt nakonec Mapy nebo Analytics nepoužívá, odpovídající domény
> zase odeber ze `scriptDirective` — necháváme jen to, co web reálně načítá (princip nejmenších oprávnění).

### Subresource Integrity (SRI)

- Jakýkoli skript nebo styl načítaný z externí CDN (mimo Google služby výše, které SRI nepodporují)
  musí mít atributy `integrity` a `crossorigin="anonymous"`, aby nešel obsah cestou podvrhnout

### Dependency scanning

- Dependabot (GitHub) nebo Renovate zapnutý na repozitáři — hlídá zranitelné/zastaralé balíčky
- `npm audit` spustit před každým větším releasem

### Email security (jen pokud projekt/klient používá vlastní doménu i pro firemní email)

- Doporučit klientovi nastavit SPF, DKIM a DMARC záznamy u domény — brání spoofingu emailů
  a zvyšuje důvěryhodnost odchozí pošty (netýká se přímo webu, ale je to standardní doporučení
  při předávání domény klientovi)

---

## 🍪 GDPR — cookie lišta a Zásady ochrany osobních údajů

Povinná součást pro každý projekt s touto šablonou, protože reCAPTCHA, Google Mapy/Analytics
i samotný Netlify Forms zpracovávají osobní údaje návštěvníků (IP adresa, cookies, u formuláře i
jméno/email/telefon). Fonty jsou self-hostované, takže do GDPR agendy nevstupují.

### Cookie lišta

- Zobrazit při první návštěvě, blokovat načtení Google Analytics (a ideálně i vložené Mapy, pokud
  jde snadno oddělit) **dokud uživatel neodsouhlasí** — ne jen informační banner bez volby
- Kategorie: Nezbytné (vždy zapnuté — např. reCAPTCHA nutná pro odeslání formuláře) / Analytické
  (Google Analytics) — u jednoduchých prezenčních webů stačí tyto dvě kategorie
- Volba se ukládá lokálně (cookie/localStorage), lištu už neukazovat opakovaně po rozhodnutí
- Komponenta: `src/components/ui/CookieConsent.astro` — jednoduchý banner + tlačítka
  Přijmout vše / Odmítnout volitelné / Nastavení

### Stránka Zásady ochrany osobních údajů

- Nová stránka `src/pages/zasady-ochrany-osobnich-udaju.astro`, placeholder se sekcemi:
  - Kdo je správcem údajů (jméno/firma klienta — doplnit per projekt)
  - Jaké údaje se zpracovávají (formulář: jméno, email, telefon; automaticky: cookies, IP)
  - Za jakým účelem a na jak dlouho
  - Zpracovatelé třetích stran (Netlify — ukládá data z formuláře; Google — reCAPTCHA,
    Analytics, Fonty/Mapy pokud se používají)
  - Práva subjektu údajů (přístup, oprava, výmaz — GDPR čl. 15–17)
  - Kontakt pro uplatnění práv
- Odkaz na tuto stránku vždy v patičce (Footer) a v cookie liště

---

## 🚀 Výkon — povinná pravidla

### Obrázky a média

- Obrázky vždy přes `<Image />` z `astro:assets` — automatická optimalizace, WebP/AVIF a responzivní `srcset`
- Lazy loading obrázků pod fold (`loading="lazy"`)
- **Google Mapy lazy-load** — mapa (iframe) se vloží až po scrollu do viewportu, nebo přes tlačítko
  "Zobrazit mapu" (placeholder statického screenshotu/adresy se nahradí embedem až po interakci) —
  samotný Maps iframe je jedna z nejtěžších věcí, co lze na prezenčním webu načíst

### Fonty — Astro 6 Fonts API

- Astro 6 má vestavěné Fonts API — fonty se **nekonfigurují ručně** (žádné stahování `.woff2`,
  žádné psaní `<link rel="preload">`). Definují se v `astro.config.mjs` a Astro samo řeší
  stahování, cachování, self-hosting i optimalizované fallbacky:

```javascript
// astro.config.mjs
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'TODO-Font', // TODO: nahradit brand fontem
        cssVariable: '--font-heading',
      },
    ],
  },
});
```

- Funguje se zdroji Google Fonts, Fontsource i lokálními soubory přes jednotné API
- Výsledek je stále **self-hosted** (žádný request na `fonts.googleapis.com` za běhu) — GDPR
  a CSP výhody z předchozí verze šablony zůstávají, jen se o ně nestaráš ručně

### Třetí strany (Analytics, reCAPTCHA)

- Google Analytics se načítá **až po souhlasu v cookie liště** — jednak kvůli GDPR, jednak proto,
  že to zároveň zrychlí web pro návštěvníky, kteří souhlas nedají
- Načítání Analytics odsunout mimo kritickou cestu — `requestIdleCallback`, případně Partytown
  (spouští skript ve web workeru mimo hlavní vlákno), pokud projekt roste a stojí to za tu complexitu
- reCAPTCHA se váže jen na formulář, ne globálně na každou stránku

### Cache a hlavičky

- V `_headers` nastavit dlouhý cache pro fingerprintovaná statická aktiva (JS/CSS bundly, self-hosted
  fonty): `Cache-Control: public, max-age=31536000, immutable`
- `preconnect`/`dns-prefetch` v `<head>` jen na domény, které projekt reálně používá
  (`www.google.com`, `www.google-analytics.com` — Fonty odpadají, jsou self-hosted)

### Obecně

- Žádné zbytečné client-side JS — Astro islands pouze pro interaktivní části (formulář, mobilní menu, mapa)
- Kritické CSS inline v `<head>`, zbytek lazy
- `output: 'static'` v `astro.config.mjs` — čistě prezenční web nepotřebuje SSR režii
- Cíl: **Core Web Vitals** — LCP < 2.5 s, INP < 200 ms, CLS < 0.1 (Lighthouse 95+ jako doplňkový cíl)

---

## ♿ Přístupnost (a11y) — cíl WCAG 2.2 AA

### Základ

- Sémantické HTML vždy — `<nav>`, `<main>`, `<article>`, `<section>`, `<button>`
- Skip link na začátku `<body>` — `<a href="#main-content" class="sr-only focus:not-sr-only">Přeskočit na hlavní obsah</a>`
- Jeden `<h1>` na stránku, hierarchie nadpisů bez přeskakování úrovní (h2 → h3 → h4, nikdy h2 → h4)
- Každý obrázek má `alt` atribut (prázdný `alt=""` pro dekorativní obrázky)
- Barevný kontrast minimálně WCAG AA (4.5:1 pro běžný text, 3:1 pro velký text/UI prvky)
- Focusovatelné prvky mají viditelný focus ring (`outline` nevypínat bez náhrady)
- Animace respektují `prefers-reduced-motion`
- Dotykové plochy (tlačítka, odkazy) min. **44×44 px** na mobilu (WCAG 2.5.5)

### Formuláře

- Pole vždy s `<label>` — žádný `placeholder` jako náhrada popisku
- Chybové stavy: `aria-invalid="true"` na poli s chybou, `aria-describedby` propojující pole
  s ID chybové hlášky, kontejner s chybami má `aria-live="polite"` — screen reader chybu
  oznámí bez nutnosti znovu procházet formulář

### Interaktivní komponenty (mobilní menu, cookie lišta, FAQ akordeon)

- Mobilní menu: `aria-expanded` na tlačítku podle stavu, `aria-controls` odkazující na menu,
  zavření přes `Esc`, focus se při otevření přesune do menu
- Cookie lišta: `role="dialog"` + `aria-modal="true"`, focus trap dokud uživatel nerozhodne
  (Přijmout/Odmítnout/Nastavení), zavření přes `Esc` posílá k výchozí volbě (odmítnutí volitelných)
- FAQ akordeon: nativní `<details>`/`<summary>` pokud možno (přístupné by default), jinak
  `aria-expanded` + `aria-controls` na vlastní implementaci

### Testování

- Automatizovaná kontrola (axe DevTools nebo Lighthouse accessibility audit) před každým launchem
- Manuální průchod klávesnicí (Tab/Shift+Tab/Esc) přes celou stránku — nic nesmí být nedosažitelné

---

## 🔍 SEO

### Základ

- `<html lang="cs">` na každé stránce
- Každá stránka má unikátní `<title>` a `<meta name="description">` — **kontrolovat, ať se
  nekopírují mezi stránkami** (běžná chyba u malých webů — všechny podstránky se stejným title)
- Kanonické URL na každé stránce
- `robots.txt` v `public/` — musí obsahovat i odkaz na sitemap:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://domena.cz/sitemap-index.xml
  ```
- Sitemap generovat přes `@astrojs/sitemap` integraci

### Structured data (JSON-LD)

- `LocalBusiness` na homepage — **konkrétní pole, ne jen typ**:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TODO: název firmy",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "TODO",
      "addressLocality": "TODO",
      "postalCode": "TODO",
      "addressCountry": "CZ"
    },
    "telephone": "TODO",
    "openingHours": "TODO",
    "sameAs": ["TODO: Facebook", "TODO: Instagram"]
  }
  ```
- **NAP shoda (Name, Address, Phone)** — údaje v JSON-LD musí přesně sedět s Google Business
  Profilem klienta (i interpunkce/zkratky), jinak si Google protiřečící signály škodí místo pomoci
- `FAQPage` schema pokud stránka obsahuje FAQ sekci, `BreadcrumbList` pokud web má víc úrovní podstránek

### Sdílení (Open Graph + Twitter Card)

- Open Graph tagy (`og:title`, `og:description`, `og:image`, `og:locale: cs_CZ`) pro sdílení
- Twitter Card tagy vedle OG (`twitter:card: summary_large_image`, `twitter:title`, `twitter:description`)

### Technické detaily

- Vlastní branded **404 stránka** (`src/pages/404.astro`) s odkazem zpět na homepage — místo
  generické Netlify hlášky
- `public/_redirects` — vynutit konzistentní www/non-www a trailing slash (jinak Google vidí
  duplicitní URL jako dva různé weby):
  ```
  https://domena.cz/*  https://www.domena.cz/:splat  301!
  ```
- Názvy souborů obrázků popisné a v kebab-case (`zahradni-nabytek-praha.jpg`, ne `IMG_2043.jpg`)
  — malý, ale reálný SEO signál, propojený s `alt` textem ze sekce Přístupnost

### Po launchi

- Odeslat sitemap do Google Search Console a Bing Webmaster Tools (jednorázový krok, snadno
  se zapomene, ale bez něj Google web objevuje pomaleji) — založení účtu a přístupu řeší
  sekce **Účty: klient vs. programátor → Google Search Console**

---

## 🧪 Kvalita kódu

### Základ

- TypeScript strict mode — žádné chyby při `tsc --noEmit`
- ESLint + Prettier nakonfigurované v projektu
- Žádné `console.log` v produkčním kódu
- Před každým commitem spustit `astro check`

### Automatizace a workflow

- **Pre-commit hooky (Husky + lint-staged)** — ESLint, Prettier a `astro check` se spustí
  automaticky před každým commitem, nespoléhat na to, že si to pamatuješ spustit ručně
- **Pinned Node verze (22+)** — `.nvmrc` + `engines` pole v `package.json` (Astro 6 vyžaduje
  Node 22+), ať se lokální prostředí neliší od toho, co používá Netlify build
- **Jeden lockfile** — commitovat jen jeden (`package-lock.json` nebo jiný), nikdy
  nemít v repu zároveň víc lockfilů z různých package managerů
- **`.editorconfig`** v rootu — základní konzistence formátování (mezery/taby, konce řádků)
  mezi různými editory/stroji
- **Build jako gate** — Netlify build spouští `astro check`/`tsc --noEmit` jako součást
  build scriptu, takže chybný kód se nedostane do produkce, ani když se lokální kontrola vynechá
- **Deploy previews** — i při sólo vývoji nechat Netlify generovat preview na branch/PR
  a projít si ho, než se mergne do `main` (u projektů nasazovaných přes GitHub Actions,
  viz sekce Nasazení výše, se previews musí přidat jako samostatný krok workflow, nejsou
  automatické jako u přímé Netlify Git integrace)

---

## ⛔ Co nikdy nedělat

- Nikdy nepoužívat barevné hodnoty natvrdo místo Tailwind tokenů
- Nikdy nepřijmout uživatelský vstup bez validace Zodem
- Nikdy nepoužívat `dangerouslySetInnerHTML` bez sanitizace (DOMPurify)
- Nikdy necommitovat `.env` soubory do gitu
- Nikdy nevypínat CSP hlavičky kvůli pohodlí
- Nikdy nepřidávat client-side JS tam, kde stačí statický Astro kód
- Nikdy nepoužívat `@ts-ignore`/`@ts-expect-error` bez komentáře vysvětlujícího proč
- Nikdy necommitovat `node_modules` ani víc než jeden lockfile zároveň
- Nikdy nenechávat zakomentovaný/mrtvý kód v commitu
- Nikdy nepushovat do `main` bez lokálně projitého `astro check`
- Nikdy neukládat reCAPTCHA secret klíč do klientského kódu ani do veřejné (`PUBLIC_`) env proměnné — jen server/Netlify env
- Nikdy neignorovat ESLint chyby plošným vypnutím pravidla pro celý soubor

---

## 🔧 Volitelné rozšíření: Supabase (jen pokud projekt potřebuje víc)

Tato šablona **ve výchozím stavu Supabase nepoužívá**. Přidej tuto vrstvu jen pokud konkrétní projekt potřebuje něco nad rámec statického webu + kontaktního formuláře — např. vlastní booking systém, admin přehled poptávek, nebo jiná dynamická data.

Když se Supabase přidává, platí stejná pravidla jako u předchozích projektů:

- RLS (Row Level Security) zapnuté na každé tabulce bez výjimky
- `SUPABASE_SERVICE_KEY` pouze v serverových API routes, nikdy v klientském kódu
- Veřejný kód používá pouze `SUPABASE_ANON_KEY` s RLS
- Admin operace vždy přes serverové API routes (`src/pages/api/`), nikdy přímo z klienta
- Admin routy (`src/pages/admin/*`) vždy kontrolují session v Astro frontmatter
- Migrace verzovat v `supabase/migrations/`, nikdy neměnit schéma ručně v UI
- Přidá se `lib/supabase.ts` (server + client instance) a `types/` rozšíří o typy tabulek

Do té doby tuto sekci ignoruj — je tu jako referenční bod pro budoucí projekty, které přerostou rámec jednoduché prezentace.
