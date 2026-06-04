import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-forest text-cream hover:bg-forest-deep border border-forest",
  outline:
    "bg-transparent text-ink border border-ink/80 hover:bg-ink hover:text-cream",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
};

export function Button({
  variant = "primary",
  fullWidth,
  className,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center justify-center font-mono text-xs uppercase tracking-[0.18em] px-5 py-3 transition-colors",
        fullWidth && "w-full",
        variantStyles[variant],
        className,
      )}
    />
  );
}
