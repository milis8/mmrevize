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
  // TODO: doplnit až bude k dispozici (IČO nebylo na původním webu uvedené)
  ico: '',
  url: 'https://mmrevize.cz',
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
      name: 'Jan Marek',
      rating: 5,
      text: 'Můžu jedině doporučit Revizního technika! Rychlé a spolehlivé řešení problémů s elektrickými zařízeními v našem domě. Skvělá komunikace a profesionální přístup.',
    },
    {
      name: 'Petr Svoboda',
      rating: 5,
      text: 'Jsem velmi spokojený s prací Revizního technika, který mi pomohl s revizí hromosvodu. Vše proběhlo hladce a včas, navíc za velmi příjemnou cenu. Děkuji!',
    },
    {
      name: 'Lucie Sladěná',
      rating: 5,
      text: 'Výborný servis a kvalitní práce. Revizní technik mi pomohl s revizí spotřebičů v našem obchodě a musím říct, že jsem nadmíru spokojen. Vřele doporučuji!',
    },
    {
      name: 'Jaroslav Dvořák',
      rating: 5,
      text: 'Potřebovali jsme urgentní revizi elektrického zařízení ve firmě a Revizní technik nám vyšel vstříc a dokázal to vše vyřešit v krátkém čase. Rychlost, spolehlivost a příjemný přístup – to je to, co oceňuji nejvíce. Díky!',
    },
  ],
} as const;
