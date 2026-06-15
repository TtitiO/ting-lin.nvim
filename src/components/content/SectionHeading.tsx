import { cn } from "@/lib/utils";

interface HeadingProps { children: React.ReactNode; className?: string }

export function H1({ children, className }: HeadingProps) {
  return (
    <h1
      className={cn("text-2xl font-bold text-ctp-mauve", className)}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: HeadingProps) {
  return (
    <h2
      className={cn("text-lg font-semibold text-ctp-green border-b border-ctp-surface1 pb-1.5", className)}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: HeadingProps) {
  return (
    <h3
      className={cn("text-base font-semibold text-ctp-blue", className)}
    >
      {children}
    </h3>
  );
}
