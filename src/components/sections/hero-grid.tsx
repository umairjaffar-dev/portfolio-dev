/**
 * 3D perspective grid floor behind the hero (option B1). A tilted plane of
 * accent-coloured lines flows toward the viewer and fades into the horizon.
 * Pure CSS: one transformed element and a background-position animation,
 * so it costs almost nothing and is static under reduced motion.
 */
export function HeroGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* the floor */}
      <div className="absolute inset-x-[-50%] bottom-0 h-[115%] origin-bottom [transform:perspective(1000px)_rotateX(62deg)]">
        <div
          className="absolute inset-0 motion-safe:animate-grid-flow"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--accent) 22%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--accent) 22%, transparent) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>
      {/* horizon glow line */}
      <div className="absolute inset-x-0 top-[71%] h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--accent)_45%,transparent),transparent)]" />
      {/* fade the floor into the page: dark at the horizon and at the bottom edge */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--bg)_68%,transparent_84%,transparent_93%,var(--bg)_100%)]" />
    </div>
  );
}
