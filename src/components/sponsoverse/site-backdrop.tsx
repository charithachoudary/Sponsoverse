export function SiteBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Soft warm washes that keep the paper from feeling flat */}
      <div
        className="absolute -top-48 right-[-12%] h-[34rem] w-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 8%, transparent), transparent 65%)",
        }}
      />
      <div
        className="absolute top-[36%] left-[-14%] h-[36rem] w-[36rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--comet) 7%, transparent), transparent 65%)",
        }}
      />
      <div className="bg-grain absolute inset-0" />
    </div>
  );
}
