import { mockWorkers } from "@/lib/mock-data";
import TrustBadge from "@/components/app/TrustBadge";
import TrustProgress from "@/components/app/TrustProgress";
import StatusBadge from "@/components/app/StatusBadge";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle, XCircle, Ban } from "lucide-react";

export default function AdminWorkersPage() {
  const handleApprove = (name: string) => toast.success(`${name} has been approved`);
  const handleReject = (name: string) => toast.error(`${name} has been rejected`);
  const handleSuspend = (name: string) => toast.warning(`${name} has been suspended`);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Worker Management</h1>
        <p className="text-sm text-muted-foreground">Approve, reject, or suspend workers</p>
      </div>

      <div className="space-y-3">
        {mockWorkers.map((worker, i) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="glass-card p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground">
                  {worker.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{worker.name}</p>
                    <TrustBadge score={worker.trust_score} />
                    <StatusBadge status={worker.status} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{worker.skills.join(", ")} • {worker.completed_jobs} jobs • {worker.complaints} complaints</p>
                </div>
                <div className="w-32">
                  <TrustProgress score={worker.trust_score} showLabel={false} />
                </div>
              </div>
              <div className="flex items-center gap-1 ml-4">
                {worker.status === "Pending" && (
                  <>
                    <button onClick={() => handleApprove(worker.name)} className="p-2 rounded-lg hover:bg-success/15 text-success transition-colors">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleReject(worker.name)} className="p-2 rounded-lg hover:bg-destructive/15 text-destructive transition-colors">
                      <XCircle className="h-4 w-4" />
                    </button>
                  </>
                )}
                {worker.status === "Active" && (
                  <button onClick={() => handleSuspend(worker.name)} className="p-2 rounded-lg hover:bg-warning/15 text-warning transition-colors">
                    <Ban className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
