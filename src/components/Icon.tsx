// Line icons (24px grid, stroke follows text colour).
const paths = {
  chef: "M7 18h10v3H7zM6 14a4 4 0 1 1 2-7.5 4 4 0 0 1 8 0A4 4 0 1 1 18 14v4H6z",
  bowl: "M3 11h18a9 9 0 0 1-18 0zM8 7c0-2 2-2 2-4M12 7c0-2 2-2 2-4M16 7c0-2 2-2 2-4",
  leaf: "M5 19c0-8 6-14 15-14 0 9-6 15-14 15zM5 19l8-8",
  people: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 11a2.5 2.5 0 1 0 0-5M18 15c2 .5 3.5 2 3.5 5",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
  glass: "M7 3h10l-1 7a4 4 0 0 1-8 0zM12 14v6M8 21h8",
  board: "M3 8h18v9H3zM6 17v3M18 17v3M7 12h2M11 11h2M15 13h2",
  cake: "M4 20h16v-7H4zM4 15c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 4 0M12 13V9M12 6a1 1 0 0 0 0-2",
  cheese: "M3 14l14-8 4 8v6H3zM3 14h18M8 17h.01M14 17.5h.01M15 11h.01",
  gift: "M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-2 0-4-1-4-2.5S10 3 12 7c2-4 4-3 4-1.5S14 7 12 7z",
  flame: "M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 1-3 0-6 1-10z",
  boat: "M4 16h16l-2 4H6zM12 3v13M12 4l6 9h-6zM10 7l-4 6h4z",
  cloche: "M3 18h18M5 18a7 7 0 0 1 14 0M12 11V9.5M11 8.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0M5 21h14",
  plates: "M4 8a3 3 0 1 0 6 0 3 3 0 1 0-6 0zM14 8a3 3 0 1 0 6 0 3 3 0 1 0-6 0zM9 17a3 3 0 1 0 6 0 3 3 0 1 0-6 0z",
  coffee: "M5 9h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5zM17 10h1a3 3 0 0 1 0 6h-1M9 3c0 2-1 2-1 4M13 3c0 2-1 2-1 4",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  instagram: "M4 4h16v16H4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8M17.5 6.5h.01",
  facebook: "M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v7h4v-7h3l1-4h-4V8.6c0-.4.2-.6.6-.6",
  whatsapp:
    "M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1a4 4 0 0 1-2.5-2.5l1-1-1-2z",
  arrow: "M7 17L17 7M9 7h8v8",
  left: "M15 5l-7 7 7 7",
  right: "M9 5l7 7-7 7",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={paths[name]} />
    </svg>
  );
}
