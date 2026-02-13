import { getTrustLevel, TrustLevel } from "@/lib/trust-engine";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  score: number;
  size?: "sm" | "md";
}

const levelStyles: Record<TrustLevel, string> = {
  "Under Review": "bg-warning/15 text-warning border-warning/30",
  "Verified": "bg-success/15 text-success border-success/30",
  "Elite": "bg-elite/15 text-elite border-elite/30",
};

export default function TrustBadge({ score, size = "sm" }: TrustBadgeProps) {
  const level = getTrustLevel(score);
  return (
    <span className={cn(
      "inline-flex items-center border rounded-full font-medium",
      levelStyles[level],
      size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
    )}>
      {level}
    </span>
  );
}
