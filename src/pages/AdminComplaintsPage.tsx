import { mockComplaints } from "@/lib/mock-data";
import StatusBadge from "@/components/app/StatusBadge";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

const severityColor: Record<string, string> = {
  low: "text-muted-foreground",
  medium: "text-warning",
  severe: "text-destructive",
};

export default function AdminComplaintsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Complaints</h1>
        <p className="text-sm text-muted-foreground">Review and resolve complaints</p>
      </div>

      <div className="space-y-3">
        {mockComplaints.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-4 w-4 ${severityColor[c.severity]}`} />
                <p className="text-sm font-semibold text-foreground">Against: {c.worker_name}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-medium uppercase ${severityColor[c.severity]}`}>{c.severity}</span>
                <StatusBadge status={c.status} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{c.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">{c.created_at}</span>
              {c.status === "open" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => toast.success("Complaint resolved")}
                    className="px-3 py-1 bg-success/15 text-success text-[10px] font-medium rounded-lg hover:bg-success/25 transition-colors"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => toast.warning("Complaint escalated")}
                    className="px-3 py-1 bg-destructive/15 text-destructive text-[10px] font-medium rounded-lg hover:bg-destructive/25 transition-colors"
                  >
                    Escalate
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
