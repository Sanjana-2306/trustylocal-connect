import { Worker } from "@/lib/mock-data";
import TrustBadge from "./TrustBadge";
import TrustProgress from "./TrustProgress";
import StatusBadge from "./StatusBadge";
import { MapPin, Clock, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface WorkerCardProps {
  worker: Worker;
  index?: number;
}

export default function WorkerCard({ worker, index = 0 }: WorkerCardProps) {
  const handleBook = () => {
    toast.success(`Booking request sent to ${worker.name}`, {
      description: "Payment escrow will begin once accepted.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card p-5 hover:border-primary/30 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground">
            {worker.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{worker.name}</h3>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Worker ID: •••{worker.id.slice(-3)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <TrustBadge score={worker.trust_score} />
          <StatusBadge status={worker.status} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {worker.skills.map((skill) => (
          <span key={skill} className="px-2 py-0.5 bg-secondary rounded text-[10px] text-muted-foreground">
            {skill}
          </span>
        ))}
      </div>

      <TrustProgress score={worker.trust_score} />

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{worker.completed_jobs} jobs</span>
          <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />₹{worker.hourly_rate}/hr</span>
        </div>
        {worker.visible && worker.status === "Active" && (
          <button
            onClick={handleBook}
            className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Book Now
          </button>
        )}
      </div>
    </motion.div>
  );
}
