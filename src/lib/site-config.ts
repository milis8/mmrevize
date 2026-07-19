// Centrální zdroj firemních údajů – používá se v Header, Footer, JSON-LD i na stránce Kontakt
export const siteConfig = {
  businessName: 'Milan Miklovič – Revizní technik',
  ownerName: 'Milan Miklovič',
  tagline: 'Revize elektroinstalace, hromosvodů a spotřebičů',
  phone: '+420 733 373 933',
  phoneHref: 'tel:+420733373933',
  email: 'elektro.miklovic@seznam.cz',
  emailHref: 'mailto:elektro.miklovic@seznam.cz',
  addressLocality: 'Česká Lípa',
  addressRegion: 'Zákupy u České Lípy',
  serviceArea: 'Česká Lípa a okolí',
  openingHours: {
    weekdays: 'Po–Pá 8:00–18:00',
    saturday: 'So 8:00–14:00',
  },
  ico: '05847460',
  url: 'https://mmrevize.cz',
  googleReviewUrl: 'https://share.google/hRXnWIpOloBpfVR7q',
  services: [
    {
      title: 'Revize elektroinstalace',
      description: 'Revize elektroinstalace v bytech, rodinných domech a provozovnách.',
      icon: 'wiring',
    },
    {
      title: 'Revize hromosvodů',
      description: 'Kontrola a revize hromosvodů podle platných norem.',
      icon: 'lightning-rod',
    },
    {
      title: 'Revize spotřebičů a nářadí',
      description: 'Revize elektrických spotřebičů a ručního elektrického nářadí.',
      icon: 'appliance',
    },
    {
      title: 'Revize odběrných míst pro ČEZ',
      description: 'Revizní zprávy pro připojení a odběrná místa ČEZ.',
      icon: 'meter',
    },
    {
      title: 'Revize SVJ a bytových domů',
      description: 'Revize společných prostor a elektroinstalací bytových domů pro SVJ.',
      icon: 'building',
    },
    {
      title: 'Revize pro pojišťovny a kolaudace',
      description: 'Revizní zprávy pro pojišťovny, kolaudace a pronájem nemovitostí.',
      icon: 'insurance',
    },
  ],
  pricing: [
    {
      title: 'Elektroinstalace – byt',
      note: 'dle rozsahu',
      price: 'od 2 500 Kč',
    },
    {
      title: 'Elektroinstalace – rodinný dům',
      note: 'dle rozsahu',
      price: 'od 4 000 Kč',
    },
    {
      title: 'Hromosvod',
      price: '1 000 Kč/svod',
    },
    {
      title: 'Revize elektrických spotřebičů',
      note: 'větší množství dohodou, např. paušální cenou',
      price: '80 Kč/ks',
    },
    {
      title: 'Revize odběrného místa (ČEZ)',
      price: '1 000 Kč',
    },
    {
      title: 'Doprava',
      note: 'paušálně, okres Česká Lípa',
      price: '500 Kč',
    },
  ],
  testimonials: [
    {
      name: 'Jakub Majtner',
      rating: 5,
      text: 'Zavolal jsem, popsal jsem pánovi můj problém, řekl mi že je do půl hodiny u mě a pomůže mi. Výsledek: Do 30 min byl na místě a s úsměvem problém vyřešil. Za mě maximální spokojenost!',
    },
    {
      name: 'Lukáš Básner',
      rating: 5,
      text: 'Super komunikace, ochota, poradenství, co bylo potřeba vše vyřízeno, vřele doporučuji. Když bude potřeba, určitě znovu využiji služby.',
    },
    {
      name: 'Filip Veselý',
      rating: 5,
      text: 'Profesionální revizní technik, férové jednání a rychlý termín. Doporučuji!',
    },
    {
      name: 'Kristyna Gabrielova',
      rating: 5,
      text: 'S panem revizákem byla skvělá domluva od samého začátku. Dorazil přesně na čas, což se dneska jen tak nevidí. Celou revizi elektroinstalace provedl velmi pečlivě, profesionálně a zbytečně neprodlužoval čas. Navíc mi lidsky vysvětlil, na co si dát v budoucnu pozor. Cena odpovídala dohodě, revizní zprávu jsem měla v ruce prakticky okamžitě. Všem vřele doporučuji a příště se stoprocentně ozvu znovu!',
    },
    {
      name: 'Daniel Kovacic',
      rating: 5,
      text: 'Se vším sem byl velmi spokojený. S pánem rychlá domluva termínu, vše opraveno a vyřešeno během půl hodiny. Lidský přístup. Doporučuji :).',
    },
    {
      name: 'Daniela Poršová',
      rating: 5,
      text: 'Byli jsme maximálně spokojeni. Šikovnost, rychlost, ochota a skvělé rady – všechno, co jsme potřebovali. Oceňujeme také vstřícný a lidský přístup. Vřele doporučujeme!',
    },
  ],
} as const;
