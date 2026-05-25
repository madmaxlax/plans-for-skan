interface BadgeProps {
  label: string;
  variant?: "default" | "star" | "price" | "easy" | "moderate" | "hard" | "toddler" | "warning";
}

export function Badge({ label, variant = "default" }: BadgeProps) {
  const variantClasses: Record<string, string> = {
    default: "bg-slate-100 text-slate-600",
    star: "bg-amber-100 text-amber-700",
    price: "bg-emerald-100 text-emerald-700",
    easy: "bg-green-100 text-green-700",
    moderate: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
    toddler: "bg-pink-100 text-pink-700",
    warning: "bg-orange-100 text-orange-700",
  };
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${variantClasses[variant]}`}>
      {label}
    </span>
  );
}

interface PriceBadgeProps {
  price: string;
}

export function PriceBadge({ price }: PriceBadgeProps) {
  return <Badge label={price} variant="price" />;
}

interface StarBadgeProps {
  count?: number;
}

export function StarBadge({ count = 1 }: StarBadgeProps) {
  const stars = "★".repeat(count);
  return <Badge label={`${stars} Pick`} variant="star" />;
}
