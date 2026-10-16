// Content for the three service pages. All copy is placeholder text:
// replace it with your own.
import { img } from "@/lib/site";

export type ServicePage = {
  slug: string;
  name: string;
  hero: { title: string; subtitle: string; image: string };
  intro: { title: string; paragraphs: string[]; image: string };
  process: { title: string; text: string }[];
  showMenus: boolean;
  galleryTitle: string;
  benefits: { title: string; intro?: string; items: { title?: string; text: string }[]; image: string };
  features: { title: string; items: { title: string; text: string }[] };
  faqs: { q: string; a: string }[];
};

const process = (thing: string) => [
  { title: "Consultation", text: `We talk through your event, guest numbers, tastes and any dietary needs for your ${thing}.` },
  { title: "Proposal & Quote", text: "You receive a draft menu and a clear, itemised quote. We refine it together until it is right." },
  { title: "Preparation", text: "We source produce, organise staff, equipment and timings, and confirm every detail with you." },
  { title: "On the Day", text: "Our team arrives early, sets up, cooks and serves so you can enjoy time with your guests." },
  { title: "Clean-up", text: "We pack down and leave the space as we found it, then follow up to hear how it went." },
];

const sharedFeatures = (label: string) => [
  { title: "Attention to Detail", text: `Every element of the ${label} is planned, tested and timed with care.` },
  { title: "Made for You", text: "Menus are written for each client. No set packages, no copy-and-paste events." },
  { title: "Our Difference", text: "Restaurant-level cooking with the warmth and flexibility of a private host." },
  { title: "Your Vision First", text: "We listen closely and shape the experience around how you want it to feel." },
  { title: "Five-Star Service", text: "Discreet, professional staff who look after your guests from arrival to farewell." },
];

export const servicePages: Record<string, ServicePage> = {
  "private-chef": {
    slug: "private-chef",
    name: "Private Chef",
    hero: {
      title: "Private Chef Services",
      subtitle: "A chef in your kitchen, cooking just for you",
      image: img("pc-hero", 2000, 1300),
    },
    intro: {
      title: "Restaurant-quality food at your own table",
      paragraphs: [
        "Our private chef service brings a professional chef to your home, villa or holiday rental. We plan the menu, shop, cook and serve, then clean up afterwards.",
        "Choose a single dinner, a weekend of meals or a full stay. Every menu is built around your preferences and the best seasonal produce available.",
        "Add your own introduction here: who your chefs are, what inspires your cooking and what clients can expect.",
      ],
      image: img("pc-intro", 900, 1100),
    },
    process: process("private chef experience"),
    showMenus: false,
    galleryTitle: "A look at our private chef experiences",
    benefits: {
      title: "Why hire a private chef?",
      intro: "A private chef lets you host without the stress, and eat better than you would at most restaurants.",
      items: [
        { text: "Menus written around your preferences, with a few surprises along the way." },
        { text: "Plates presented with care, ready for the table or the camera." },
        { text: "Service that goes beyond the food: table setting, pacing and drinks matching." },
        { text: "Clear, quick communication from first enquiry to the final course." },
        { text: "Every dietary requirement handled with care and confidence." },
        { text: "Fresh, local ingredients from trusted growers and producers." },
      ],
      image: img("pc-benefits", 900, 1100),
    },
    features: {
      title: "What makes our private chef service special?",
      items: sharedFeatures("private chef experience"),
    },
    faqs: [
      { q: "How is my menu put together?", a: "We start with a short consultation about tastes, dislikes and the occasion, then send a draft menu for you to review." },
      { q: "How much does a private chef cost?", a: "Pricing depends on guest numbers, menu complexity and service length. We provide an itemised quote for every booking." },
      { q: "Can you cater for allergies and dietary needs?", a: "Yes. Tell us about any allergies or preferences when you enquire and we will design the menu around them." },
      { q: "How far ahead should I book?", a: "Two to four weeks is ideal, and longer for peak holiday periods. Contact us for last-minute availability." },
      { q: "Which areas do you cover?", a: "We work across the Gold Coast, Brisbane and Byron Bay, and travel further on request." },
      { q: "How many guests can you cook for?", a: "From two people up to large groups. For bigger events we bring extra chefs and service staff." },
    ],
  },

  "private-dining": {
    slug: "private-dining",
    name: "Private Dining",
    hero: {
      title: "Private Dining",
      subtitle: "Fine dining, hosted in your space",
      image: img("pd-hero", 2000, 1300),
    },
    intro: {
      title: "Private dining experiences, made to measure",
      paragraphs: [
        "From a quiet dinner for two to a long-table celebration, we create menus that suit the moment and serve them with polished, friendly service.",
      ],
      image: img("pd-intro", 900, 1100),
    },
    process: process("private dining event"),
    showMenus: true,
    galleryTitle: "Moments from our private dining events",
    benefits: {
      title: "The benefits of private dining with us",
      items: [
        { title: "Fully Managed", text: "We handle planning, cooking, service and clean-up from start to finish." },
        { title: "Beautiful Presentation", text: "Plates and tables styled to suit your event." },
        { title: "Tailored Menus", text: "Courses designed for your guests, never a fixed package." },
        { title: "Dietary Flexibility", text: "Every guest is catered for, whatever their requirements." },
        { title: "Local Produce", text: "Seasonal ingredients from the region's best producers." },
      ],
      image: img("pd-benefits", 900, 1100),
    },
    features: {
      title: "What makes our private dining stand out?",
      items: sharedFeatures("private dining experience"),
    },
    faqs: [
      { q: "How do you design a private dining menu?", a: "We discuss your occasion, guests and preferences, then create a menu draft for your feedback." },
      { q: "How is the price worked out?", a: "Cost is based on guest numbers, courses, staffing and any extras such as styling or drinks service." },
      { q: "What does the service include?", a: "Menu planning, ingredients, cooking, table service and full clean-up. Styling and hire items are available on request." },
      { q: "Do I need to supply anything?", a: "Usually only a working kitchen and dining space. We confirm any equipment needs before the day." },
      { q: "How many guests can you host?", a: "We regularly host groups from 2 to 60+. Contact us to discuss larger events." },
      { q: "How early should I book?", a: "We recommend booking at least a month ahead, especially on weekends and during holidays." },
      { q: "Where do you operate?", a: "Gold Coast, Brisbane and Byron Bay, with travel available for other locations." },
    ],
  },

  "bespoke-catering": {
    slug: "bespoke-catering",
    name: "Bespoke Catering",
    hero: {
      title: "Bespoke Catering",
      subtitle: "Catering shaped around your event",
      image: img("bc-hero", 2000, 1300),
    },
    intro: {
      title: "Catering that makes the occasion",
      paragraphs: [
        "One-off celebration or regular office lunch, we build the catering around your event, your guests and your budget.",
        "Every event is different, so every menu is too. Tell us what you are planning and we will take care of the food.",
      ],
      image: img("bc-intro", 900, 1100),
    },
    process: process("catering"),
    showMenus: true,
    galleryTitle: "Our catering, captured",
    benefits: {
      title: "Why choose bespoke catering?",
      items: [
        { text: "Every detail managed, so you can focus on your guests." },
        { text: "Food presented to impress and taste even better." },
        { text: "Options from canapés and grazing tables to plated dinners." },
        { text: "Menus that suit every dietary need and palate." },
        { text: "A commitment to fresh, local, seasonal ingredients." },
      ],
      image: img("bc-benefits", 900, 1100),
    },
    features: {
      title: "What makes our catering different?",
      items: sharedFeatures("catering"),
    },
    faqs: [
      { q: "How do you tailor a catering menu?", a: "We learn about your event, guest numbers and style of service, then propose a menu to suit." },
      { q: "How is catering priced?", a: "Price depends on guest count, menu, service style and staffing. You receive a detailed quote." },
      { q: "Can you handle allergies?", a: "Yes. We label dishes clearly and prepare separate options where needed." },
      { q: "What is included?", a: "Food, staff and service equipment as agreed in your quote. Hire items can be arranged." },
      { q: "Do I need to provide anything?", a: "Access to the venue and a prep area. We confirm all requirements during planning." },
      { q: "How far in advance should I book?", a: "Four to eight weeks is ideal for larger events. Smaller events can often be arranged sooner." },
      { q: "What areas do you cater in?", a: "Gold Coast, Brisbane and Byron Bay, and further afield on request." },
    ],
  },
};
