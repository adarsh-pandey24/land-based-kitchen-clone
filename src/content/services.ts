// Service pages and shared service copy, from "The Coast & Cardamom: Website
// Skeleton & Copy". The 12 services below are the fallback content shown until
// services are added in the admin panel (Admin > Catering services).
import { img } from "@/lib/site";

export type GroupKey = "chakna-and-tonic" | "grazing-tables-boards" | "party-catering" | "private-dining-events";

export type ServiceGroup = {
  key: GroupKey;
  name: string;
  href: string;
  tileLine: string;
  image: string;
  hero: { title: string; line: string; image: string };
  intro: { title: string; body: string; images: [string, string] };
  seo: { title: string; description: string };
  extraFaqs?: { q: string; a: string }[];
};

export const groups: ServiceGroup[] = [
  {
    key: "chakna-and-tonic",
    name: "Chakna & Tonic",
    href: "/chakna-and-tonic",
    tileLine: "Ten Indian bar snacks and the tonic. You bring the drinks.",
    image: img("cc-tile-chakna", 900),
    hero: {
      title: "Chakna & Tonic",
      line: "Ten Indian bar snacks and the tonic. You bring the drinks.",
      image: img("cc-hero-chakna", 2400),
    },
    intro: {
      title: "The snack table your friends will talk about.",
      body: "Our signature, and the easiest party you'll ever host. Ten small plates, chilled tonic, and none of the cooking.",
      images: [img("cc-intro-chakna-1", 800), img("cc-intro-chakna-2", 800)],
    },
    seo: {
      title: "Chakna & Tonic · Indian Bar Snacks Gold Coast",
      description:
        "You bring the drinks. We bring ten Indian bar snacks and the tonic. Our signature drinks-party catering on the Gold Coast.",
    },
  },
  {
    key: "grazing-tables-boards",
    name: "Boards & Grazing",
    href: "/grazing-tables-boards",
    tileLine: "Cheese, charcuterie and grazing tables, dropped off or styled on-site.",
    image: img("cc-tile-grazing", 900),
    hero: {
      title: "Grazing Tables & Boards, Gold Coast",
      line: "Boards from 6 guests, grazing tables for a crowd. Dropped off or styled on-site.",
      image: img("cc-hero-grazing", 2400),
    },
    intro: {
      title: "Food out, nobody cooking.",
      body: "Cheese, charcuterie, fruit, dips and a few Indian surprises, styled so it's the first thing guests photograph.",
      images: [img("cc-intro-grazing-1", 800), img("cc-intro-grazing-2", 800)],
    },
    seo: {
      title: "Grazing Tables & Boards Gold Coast · Coast & Cardamom",
      description: "Cheese boards, charcuterie and styled grazing tables for parties and corporate events across the Gold Coast.",
    },
  },
  {
    key: "party-catering",
    name: "Parties & Celebrations",
    href: "/party-catering",
    tileLine: "Birthdays, barbecues, boat days and cakes.",
    image: img("cc-tile-party", 900),
    hero: {
      title: "Party & Celebration Catering",
      line: "Birthdays, barbecues, boat days and cakes, for up to 100 guests.",
      image: img("cc-hero-party", 2400),
    },
    intro: {
      title: "Be a guest at your own party.",
      body: "Tell us the occasion and who's coming. Joseph builds the menu, brings the food, and handles the clean-up.",
      images: [img("cc-intro-party-1", 800), img("cc-intro-party-2", 800)],
    },
    seo: {
      title: "Party, Barbecue & Boat Catering Gold Coast",
      description:
        "Birthday, barbecue and boat catering plus custom cakes, cooked by Chef Joseph Raj. Drop-off or chef on-site.",
    },
    extraFaqs: [
      {
        q: "Can you cater on a boat?",
        a: "Yes. We plan around the galley and the trip, and confirm details with your charter operator.",
      },
    ],
  },
  {
    key: "private-dining-events",
    name: "Dining & Events",
    href: "/private-dining-events",
    tileLine: "Canapés, plated dinners, tapas and Indian buffets for up to 100.",
    image: img("cc-tile-dining", 900),
    hero: {
      title: "Private Dining & Event Catering",
      line: "Canapés, plated dinners, tapas and Indian buffets, for up to 100 guests.",
      image: img("cc-hero-dining", 2400),
    },
    intro: {
      title: "Restaurant cooking, without the restaurant.",
      body: "Hotel-level timing and presentation in your dining room, office or venue, cooked fresh and served hot.",
      images: [img("cc-intro-dining-1", 800), img("cc-intro-dining-2", 800)],
    },
    seo: {
      title: "Private Dining & Indian Buffet Catering Gold Coast",
      description: "Canapés, plated dinners, tapas and Indian buffets for up to 100 guests. Every dietary need labelled.",
    },
  },
];

export const groupByKey = (key: string) => groups.find((g) => g.key === key);

export type Service = {
  group: string;
  title: string;
  slug: string;
  cardLine: string | null;
  heading: string | null;
  description: string;
  image: string;
  priceLabel: string | null;
  guests: string | null;
  format: string | null;
  goodFor: string | null;
  sampleDishes: string | null;
  smallPrint: string | null;
  buttonLabel: string | null;
};

const s = (v: Partial<Service> & Pick<Service, "group" | "title" | "slug" | "description">): Service => ({
  cardLine: null,
  heading: null,
  image: img(`cc-svc-${v.slug}`, 900),
  priceLabel: null,
  guests: null,
  format: null,
  goodFor: null,
  sampleDishes: null,
  smallPrint: null,
  buttonLabel: null,
  ...v,
});

// Guest ranges marked "TODO" in the copy document are left out until confirmed.
export const fallbackServices: Service[] = [
  s({
    group: "chakna-and-tonic",
    title: "Chakna & Tonic",
    slug: "chakna-and-tonic",
    cardLine: "Ten Indian bar snacks and the tonic. You bring the drinks.",
    heading: "You bring the bottle. We bring the chakna.",
    description:
      "Chakna is what India eats with a drink: spiced, crunchy, salty, impossible to stop at one. We bring ten small plates, fresh, plus chilled tonic water, and you pour your own gin, rum or whatever's in the cabinet.",
    format: "Drop-off or on-site",
    goodFor: "drinks parties, birthdays, after-work, boat days",
    sampleDishes: "masala peanuts, chilli paneer bites, chicken tikka skewers, pani puri, onion pakora",
    smallPrint: "We don't supply alcohol. BYO, always.",
    buttonLabel: "Book Chakna & Tonic",
  }),
  s({
    group: "grazing-tables-boards",
    title: "Cheese & Charcuterie Boards",
    slug: "cheese-charcuterie-boards",
    cardLine: "Boards from 6 guests, delivered ready to put down.",
    heading: "The board everyone hovers around.",
    description:
      "Local and imported cheeses, cured meats, seasonal fruit, house pickles and crackers, styled on boards. Ideal when you want food out without anyone cooking.",
    format: "Drop-off",
    goodFor: "corporate lunches, weekend entertaining, pre-dinner drinks",
    buttonLabel: "Order a board",
  }),
  s({
    group: "grazing-tables-boards",
    title: "Grazing Tables & Boards",
    slug: "grazing-tables",
    cardLine: "A full table of food, styled on-site.",
    heading: "A table people photograph before they eat.",
    description:
      "Cheese, charcuterie, breads, dips, fruit and a few Indian surprises, laid out across your table and styled on the day. Feeds a crowd with zero plating.",
    format: "Set up on-site",
    goodFor: "corporate events, launches, engagement parties",
    buttonLabel: "Plan a grazing table",
  }),
  s({
    group: "party-catering",
    title: "Birthday Parties & Private Celebrations",
    slug: "birthday-parties",
    cardLine: "A menu built around the birthday, not a set package.",
    heading: "Your party, your menu.",
    description:
      "Tell us who's coming, what they love and what they can't eat. Joseph builds a menu around it, from casual share plates to a sit-down dinner, and you get to enjoy your own celebration.",
    guests: "Up to 100",
    format: "Drop-off or on-site",
    goodFor: "milestone birthdays, anniversaries, engagements, baby showers",
    buttonLabel: "Plan my celebration",
  }),
  s({
    group: "party-catering",
    title: "Barbecue Parties",
    slug: "barbecue-parties",
    cardLine: "Weekend barbecues with a tandoori twist.",
    heading: "The barbecue, minus standing at the grill.",
    description:
      "Marinated meats, seafood and vegetables cooked on the grill at your place, with salads, chutneys and breads on the side. Australian barbecue, Indian marinades.",
    format: "Chef on-site",
    goodFor: "backyard parties, long weekends, family gatherings",
    sampleDishes: "tandoori chicken, lamb seekh kebab, garlic prawn skewers, grilled corn with chilli butter",
    buttonLabel: "Book a barbecue",
  }),
  s({
    group: "party-catering",
    title: "Private Boat Catering",
    slug: "boat-catering",
    cardLine: "Food that travels well and tastes better on the water.",
    heading: "Catering that knows boats.",
    description:
      "Menus planned for small galleys, moving decks and no oven: grazing boxes, canapés and share plates packed for the trip. We deliver to the marina or cook on board where the boat allows.",
    format: "Delivered to marina or on board",
    goodFor: "charters, hens and bucks, corporate cruises",
    buttonLabel: "Cater my boat day",
  }),
  s({
    group: "party-catering",
    title: "Custom Cakes & Desserts",
    slug: "cakes-desserts",
    cardLine: "Celebration cakes and dessert tables, designed to order.",
    heading: "The last course, done properly.",
    description:
      "Designed cakes, dessert boxes and dessert tables, including Indian sweets alongside the usual favourites. Order on its own or add it to any menu.",
    format: "Drop-off",
    goodFor: "birthdays, weddings, office celebrations",
    buttonLabel: "Order a cake",
  }),
  s({
    group: "private-dining-events",
    title: "Canapés & Plated Dining",
    slug: "canapes-plated-dining",
    cardLine: "Canapés and three- or four-course dinners, served.",
    heading: "Restaurant service in your own dining room.",
    description:
      "Passed canapés for standing events, or a plated three- or four-course dinner cooked and served at your table. Hotel-level timing and presentation, without the restaurant bill for wine.",
    format: "Chef on-site",
    goodFor: "dinner parties, formal events, client dinners",
    buttonLabel: "Plan a dinner",
  }),
  s({
    group: "private-dining-events",
    title: "Tapas-Themed Dining",
    slug: "tapas-dining",
    cardLine: "Share plates for long lunches and slow dinners.",
    heading: "Small plates, long conversations.",
    description:
      "A rolling menu of share plates that mixes Mediterranean tapas with Indian small plates. Everyone tries everything, and nobody's stuck with one main.",
    format: "Drop-off or on-site",
    goodFor: "long lunches, team dinners, date nights at home",
    buttonLabel: "Plan a tapas menu",
  }),
  s({
    group: "private-dining-events",
    title: "Indian Buffet Catering",
    slug: "indian-buffet",
    cardLine: "Indian buffets for up to 100 guests.",
    heading: "A proper Indian spread, for up to 100.",
    description:
      "Curries, biryani, tandoor, breads, chutneys and dessert, cooked fresh and served hot. Vegetarian, vegan and gluten-free dishes on every buffet, labelled.",
    guests: "Up to 100",
    format: "Drop-off or served",
    goodFor: "weddings, festivals, corporate events, community gatherings",
    buttonLabel: "Get a buffet quote",
  }),
  s({
    group: "private-dining-events",
    title: "Breakfast Catering",
    slug: "breakfast-catering",
    cardLine: "Plated breakfasts and breakfast buffets.",
    heading: "Breakfast, handled.",
    description:
      "Plated breakfasts for small groups or a full breakfast buffet for events, with Indian options like masala omelettes and dosa beside the eggs and pastries.",
    format: "Drop-off or on-site",
    goodFor: "morning meetings, retreats, the morning after a wedding",
    buttonLabel: "Book breakfast",
  }),
  s({
    group: "private-dining-events",
    title: "On-site Catering",
    slug: "on-site-catering",
    cardLine: "Joseph cooks and serves at your venue, up to 50 guests.",
    heading: "Your venue, our kitchen.",
    description:
      "Joseph arrives with ingredients and equipment, cooks on location, serves your guests and leaves the kitchen clean. Works with any menu on this page.",
    guests: "Up to 50",
    format: "Chef on-site",
    goodFor: "homes, holiday rentals, offices, venues without catering",
    // TODO: Joseph to confirm set-up time and staff numbers.
    smallPrint: "What's included: ingredients, cooking equipment, cooking and service at your venue, and clean-down.",
    buttonLabel: "Book on-site catering",
  }),
];

export const steps = [
  { title: "Tell us the plan.", text: "Date, guest count, venue, and anyone with allergies. The form takes two minutes." },
  { title: "Get your menu and quote.", text: "Joseph sends a tailored menu and a clear quote. Tweak it until it's right." },
  { title: "We shop and prep.", text: "Fresh ingredients bought for your menu, spices ground in our kitchen, every dish labelled." },
  { title: "Enjoy the day.", text: "We drop off and set up, or cook and serve on-site. Either way, we leave the kitchen clean." },
];

export const benefits = [
  "Menus built around your guest list, not a set package.",
  "Plated, styled and labelled, so nobody has to ask what's in a dish.",
  "Dietary needs planned into the menu from the first draft, not patched on the day.",
  "Fresh produce bought for your event, spices ground in our kitchen.",
  "Set-up, service and clean-down handled. The kitchen is clean when we leave.",
];

export const reasons = [
  { title: "The chef is the caterer", text: "Joseph plans, cooks and serves your event.", icon: "chef" },
  { title: "Indian flavour, Australian formats", text: "Tapas, grazing tables, barbecues and boat days.", icon: "bowl" },
  { title: "Built around your guests", text: "Every dish labelled for dietary needs.", icon: "leaf" },
  { title: "Any size, any venue", text: "A board for 10 to a buffet for 100.", icon: "people" },
  { title: "Hotel standards", text: "Timing, hygiene and presentation from 16 years in hotel kitchens.", icon: "star" },
] as const;

// Shared FAQ answers. Numbers Joseph has not confirmed yet are left out.
export const faqGroups: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: "Booking",
    items: [
      {
        q: "How far ahead should I book?",
        a: "As early as you can for buffets and on-site events. Boards and Chakna & Tonic can usually be arranged at shorter notice. Peak dates (December, long weekends) go first.",
      },
      {
        q: "Is there a minimum order?",
        a: "Smaller gatherings can usually go with a board or Chakna & Tonic. Tell us your numbers in the form and we'll suggest what fits.",
      },
      {
        q: "Which areas do you cover?",
        a: "The Gold Coast, plus the hinterland. Further afield? Ask, and we'll quote travel.",
      },
      {
        q: "Is there a venue or travel fee?",
        a: "Most Gold Coast addresses have no extra charge. Outside the area, or venues with special access needs, any travel or venue cost is shown on your quote before you book.",
      },
    ],
  },
  {
    heading: "Pricing",
    items: [
      {
        q: "How does pricing work?",
        a: "Menus are priced per head, based on the dishes and service style. You'll get a full quote before anything is booked, and a deposit confirms the date.",
      },
      { q: "How much is the deposit?", a: "The deposit amount is shown on your quote, before you book anything." },
      {
        q: "What if my guest numbers change?",
        a: "Tell us as soon as you know. We'll adjust the menu and the quote where we can. Your quote sets the date for final numbers.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancellation and refund terms are set out on your quote and in our Terms & Conditions, so you know them before paying a deposit.",
      },
    ],
  },
  {
    heading: "Dietary needs",
    items: [
      {
        q: "Can you handle allergies and dietary needs?",
        a: "Yes. We cook vegetarian, vegan, gluten-free, dairy-free, nut-free, halal and Jain, and label every dish. Tell us about serious allergies in the form so we can plan for them.",
      },
      { q: "Are dishes labelled?", a: "Yes. Every dish is labelled, so nobody has to ask what's in it." },
    ],
  },
  {
    heading: "Service",
    items: [
      {
        q: "What do you bring?",
        a: "Drop-off: the food, plus serving boards or platters. On-site: ingredients, cooking equipment, and Joseph.",
      },
      { q: "Do you supply alcohol?", a: "No. Bring your own; Chakna & Tonic is designed for exactly that." },
      {
        q: "Can you cater on a boat?",
        a: "Yes. We plan around the galley and the trip, and confirm details with your charter operator.",
      },
      { q: "Do you clean up afterwards?", a: "Yes. On-site, we leave the kitchen clean when we go." },
      {
        q: "What happens on the day?",
        a: "We confirm timings and access with you beforehand. On the day we arrive with time to set up, then either drop off and style the food or cook and serve on-site. Either way, we pack down and leave the kitchen clean.",
      },
    ],
  },
];

// FAQs shown on every service page (booking, areas, dietary, pricing, alcohol, what we bring).
export const serviceFaqs = [
  faqGroups[0].items[0],
  faqGroups[0].items[2],
  faqGroups[2].items[0],
  faqGroups[0].items[1],
  faqGroups[1].items[0],
  faqGroups[3].items[1],
  faqGroups[3].items[0],
];
