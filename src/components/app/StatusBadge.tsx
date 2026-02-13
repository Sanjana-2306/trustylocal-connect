import { cn } from "@/lib/utils";

type Status = "Pending" | "Active" | "Suspended" | "open" | "resolved" | "escalated" |
  "pending" | "in_progress" | "completed" | "cancelled" | "processing" | "held" | "released" | "refunded";

const styles: Record<string, string> = {
  Active: "bg-success/15 text-success",
  Pending: "bg-warning/15 text-warning",
  Suspended: "bg-destructive/15 text-destructive",
  open: "bg-warning/15 text-warning",
  resolved: "bg-success/15 text-success",
  escalated: "bg-destructive/15 text-destructive",
  pending: "bg-warning/15 text-warning",
  in_progress: "bg-primary/15 text-primary",
  completed: "bg-success/15 text-success",
  cancelled: "bg-muted text-muted-foreground",
  processing: "bg-warning/15 text-warning",
  held: "bg-primary/15 text-primary",
  released: "bg-success/15 text-success",
  refunded: "bg-muted text-muted-foreground",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium capitalize",
      styles[status] || "bg-muted text-muted-foreground"
    )}>
      {status.replace("_", " ")}
    </span>
  );
}
