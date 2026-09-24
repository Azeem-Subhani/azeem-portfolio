/** Matches the site header pill (`bg-header-glass` + `backdrop-blur-xl`). */
export function ServiceTocGlass() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] border border-border bg-header-glass shadow-lg shadow-black/5 backdrop-blur-xl"
      aria-hidden="true"
    />
  );
}
