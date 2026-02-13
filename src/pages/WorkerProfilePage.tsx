import { mockWorkers } from "@/lib/mock-data";
import TrustProgress from "@/components/app/TrustProgress";
import TrustBadge from "@/components/app/TrustBadge";
import StatusBadge from "@/components/app/StatusBadge";
import StatsCard from "@/components/app/StatsCard";
import { Shield, Briefcase, Star, TrendingUp, AlertTriangle } from "lucide-react";

export default function WorkerProfilePage() {
  const worker = mockWorkers[0]; // Mock: current logged-in worker

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center text-xl font-bold text-foreground">
          {worker.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">{worker.name}</h1>
            <TrustBadge score={worker.trust_score} size="md" />
            <StatusBadge status={worker.status} />
          </div>
          <p className="text-sm text-muted-foreground">{worker.email} • Joined {worker.joined}</p>
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Trust Score Breakdown</h2>
        <TrustProgress score={worker.trust_score} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <StatsCard title="Completed Jobs" value={worker.completed_jobs} icon={Briefcase} color="primary" />
          <StatsCard title="4+ Ratings" value={worker.four_plus_ratings} icon={Star} color="elite" />
          <StatsCard title="Repeat Customers" value={worker.repeat_customers} icon={TrendingUp} color="success" />
          <StatsCard title="Complaints" value={worker.complaints} icon={AlertTriangle} color={worker.complaints > 0 ? "destructive" : "primary"} />
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {worker.skills.map((skill) => (
            <span key={skill} className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Trust Score Formula</h2>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Base Score: 50</p>
          <p className="text-success">+10 per completed job ({worker.completed_jobs} × 10 = +{worker.completed_jobs * 10})</p>
          <p className="text-success">+5 per 4+ star rating ({worker.four_plus_ratings} × 5 = +{worker.four_plus_ratings * 5})</p>
          <p className="text-success">+8 per repeat customer ({worker.repeat_customers} × 8 = +{worker.repeat_customers * 8})</p>
          <p className="text-destructive">-20 per complaint ({worker.complaints} × 20 = -{worker.complaints * 20})</p>
          <p className="text-destructive">-30 per severe complaint ({worker.severe_complaints} × 30 = -{worker.severe_complaints * 30})</p>
          <hr className="border-border my-2" />
          <p className="text-foreground font-semibold">Total: {worker.trust_score}/100</p>
        </div>
      </div>
    </div>
  );
}
