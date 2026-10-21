export function Wordmark({ light = true }: { light?: boolean }) {
  return (
    <span className={`block leading-none ${light ? "text-sea" : "text-navy"}`}>
      <span className="block font-serif text-lg tracking-wide md:text-xl">
        THE COAST <span className="text-gold">&amp;</span> CARDAMOM
      </span>
      <span className="mt-1 block text-[10px] font-semibold tracking-[0.45em] opacity-80">CATERING CO.</span>
    </span>
  );
}
