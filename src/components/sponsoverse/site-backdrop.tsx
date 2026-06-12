// Deterministic PRNG so server and client render the same constellation
// (avoids hydration mismatches).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(20260612);

const NODES = Array.from({ length: 42 }, () => ({
  x: random() * 100,
  y: random() * 100,
  size: 1 + random() * 1.8,
  duration: 3 + random() * 5,
  delay: random() * 6,
}));

// Faint constellation edges between nearby nodes
const EDGES: { x1: number; y1: number; x2: number; y2: number }[] = [];
for (let i = 0; i < NODES.length; i++) {
  for (let j = i + 1; j < NODES.length; j++) {
    const dx = NODES[i].x - NODES[j].x;
    const dy = NODES[i].y - NODES[j].y;
    if (Math.sqrt(dx * dx + dy * dy) < 14) {
      EDGES.push({ x1: NODES[i].x, y1: NODES[i].y, x2: NODES[j].x, y2: NODES[j].y });
    }
  }
}

export function SiteBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Layered depth gradients — navy core with warm glows at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, #0e1b2e 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute -top-40 right-[-10%] h-[40rem] w-[40rem] rounded-full opacity-[0.13] blur-3xl"
        style={{
          background: "radial-gradient(circle, #ff6b35 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[-12%] h-[44rem] w-[44rem] rounded-full opacity-[0.08] blur-3xl"
        style={{
          background: "radial-gradient(circle, #f4b860 0%, transparent 65%)",
        }}
      />

      {/* Constellation edges */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {EDGES.map((edge, i) => (
          <line
            key={i}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke="rgba(233,238,247,0.05)"
            strokeWidth="0.08"
          />
        ))}
      </svg>

      {/* Constellation nodes, gently twinkling */}
      {NODES.map((node, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-white"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            animationDuration: `${node.duration}s`,
            animationDelay: `${node.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
