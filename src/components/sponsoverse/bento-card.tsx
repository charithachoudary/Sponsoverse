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
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(33,29,22,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_-24px_rgba(33,29,22,0.25)] sm:p-8",
        className,
      )}
    >
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}
