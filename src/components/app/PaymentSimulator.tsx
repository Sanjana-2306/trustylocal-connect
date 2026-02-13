import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";
import { Loader2, CheckCircle, Clock } from "lucide-react";

interface PaymentSimulatorProps {
  amount: number;
  jobId: string;
  onComplete?: () => void;
}

type PaymentPhase = "idle" | "processing" | "held" | "released";

export default function PaymentSimulator({ amount, jobId, onComplete }: PaymentSimulatorProps) {
  const [phase, setPhase] = useState<PaymentPhase>("idle");
  const [progress, setProgress] = useState(0);

  const startPayment = () => {
    setPhase("processing");
    setProgress(0);

    // Simulate 10-second processing (shortened from 2min for demo)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("held");
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  const releasePayment = () => {
    setPhase("released");
    onComplete?.();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Payment Escrow</h3>
        <StatusBadge status={phase === "idle" ? "pending" : phase === "processing" ? "processing" : phase === "held" ? "held" : "released"} />
      </div>

      <div className="text-center py-4">
        <p className="text-3xl font-bold text-foreground">₹{amount}</p>
        <p className="text-xs text-muted-foreground mt-1">Job #{jobId.slice(-4)}</p>
      </div>

      {phase === "processing" && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-warning">
            <Loader2 className="h-3 w-3 animate-spin" />
            Processing payment...
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-warning rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {phase === "held" && (
        <div className="flex items-center gap-2 text-xs text-primary">
          <Clock className="h-3 w-3" />
          Payment held in escrow. Release after job completion.
        </div>
      )}

      {phase === "released" && (
        <div className="flex items-center gap-2 text-xs text-success">
          <CheckCircle className="h-3 w-3" />
          Payment released to worker.
        </div>
      )}

      <div className="flex gap-2">
        {phase === "idle" && (
          <button onClick={startPayment} className="flex-1 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90">
            Pay ₹{amount}
          </button>
        )}
        {phase === "held" && (
          <button onClick={releasePayment} className="flex-1 py-2 bg-success text-success-foreground text-xs font-medium rounded-lg hover:bg-success/90">
            Release Payment
          </button>
        )}
      </div>
    </motion.div>
  );
}
