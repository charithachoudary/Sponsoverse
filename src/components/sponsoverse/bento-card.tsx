import { cn } from "@/lib/utils";

export function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glow-hover group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card/80 p-6 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_8px_24px_-16px_rgba(0,0,0,0.5)] sm:p-8",
        className,
      )}
    >
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}
