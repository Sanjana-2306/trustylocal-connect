import { getTrustLevel } from "@/lib/trust-engine";

interface TrustProgressProps {
  score: number;
  showLabel?: boolean;
}

export default function TrustProgress({ score, showLabel = true }: TrustProgressProps) {
  const level = getTrustLevel(score);
  const color = level === "Elite" ? "bg-elite" : level === "Verified" ? "bg-success" : "bg-warning";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        {showLabel && <span className="text-[10px] text-muted-foreground">Trust Score</span>}
        <span className="text-xs font-semibold text-foreground">{score}/100</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
