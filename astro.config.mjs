// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mmrevize.cz',
  output: 'static',
  integrations: [sitemap()],
  build: {
    // Vloží CSS přímo do HTML místo blokujícího externího <link> – šablona
    // cílí na malé prezenční weby, kde se to jednoznačně vyplatí (viz sekce Výkon)
    inlineStylesheets: 'always',
  },
  markdown: {
    // Prism zvýrazňuje přes CSS třídy, ne inline styly – na rozdíl od výchozího
    // Shiki je tak kompatibilní s naším CSP (styleDirective bez 'unsafe-inline')
    syntaxHighlight: 'prism',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-heading',
      weights: [500, 600, 700],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: [400, 500],
    },
  ],
  security: {
    csp: {
      // Externí zdroje (reCAPTCHA, Google Mapy) se musí doplnit ručně –
      // Astro hashuje jen vlastní bundlovaný kód, ne cizí skripty
      scriptDirective: {
        resources: ['https://www.google.com', 'https://www.gstatic.com'],
      },
      styleDirective: {
        resources: ["'self'"], // fonty jsou self-hostované přes Astro Fonts API
      },
      // object-src nemá vlastní zkratku v Astro CSP API, přidává se přes obecné directives
      directives: ["object-src 'none'"],
    },
  },
});
