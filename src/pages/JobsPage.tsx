import { mockJobs } from "@/lib/mock-data";
import StatusBadge from "@/components/app/StatusBadge";
import PaymentSimulator from "@/components/app/PaymentSimulator";
import { motion } from "framer-motion";
import { useState } from "react";

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Jobs</h1>
        <p className="text-sm text-muted-foreground">Track and manage all jobs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {mockJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedJob(job.id)}
              className={`glass-card p-4 cursor-pointer hover:border-primary/30 transition-all ${selectedJob === job.id ? 'border-primary/50' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{job.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {job.worker_name} → {job.customer_name}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">{job.created_at}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-bold text-foreground">₹{job.amount}</span>
                  <StatusBadge status={job.status} />
                  <StatusBadge status={job.escrow_status} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          {selectedJob ? (
            <PaymentSimulator
              amount={mockJobs.find(j => j.id === selectedJob)!.amount}
              jobId={selectedJob}
            />
          ) : (
            <div className="glass-card p-5 text-center text-sm text-muted-foreground">
              Select a job to manage payment
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
