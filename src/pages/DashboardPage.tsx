import { useAuth } from "@/context/AuthContext";
import { mockWorkers, mockJobs, mockAdminStats } from "@/lib/mock-data";
import StatsCard from "@/components/app/StatsCard";
import WorkerCard from "@/components/app/WorkerCard";
import StatusBadge from "@/components/app/StatusBadge";
import { Users, Briefcase, AlertTriangle, BarChart3, Shield, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user } = useAuth();
  if (!user) return null;

  if (user.role === "admin") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Workforce governance overview</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Workers" value={mockAdminStats.totalWorkers} icon={Users} color="primary" subtitle={`${mockAdminStats.activeWorkers} active`} />
          <StatsCard title="Avg Trust Score" value={mockAdminStats.avgTrustScore} icon={Shield} color="success" subtitle="Platform average" />
          <StatsCard title="Jobs Completed" value={mockAdminStats.completedJobs} icon={Briefcase} color="elite" subtitle={`of ${mockAdminStats.totalJobs} total`} />
          <StatsCard title="Open Complaints" value={mockAdminStats.openComplaints} icon={AlertTriangle} color="warning" subtitle={`of ${mockAdminStats.totalComplaints} total`} />
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Recent Jobs</h2>
          <div className="space-y-3">
            {mockJobs.slice(0, 4).map((job) => (
              <div key={job.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm text-foreground">{job.description}</p>
                  <p className="text-xs text-muted-foreground">{job.worker_name} • {job.customer_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">₹{job.amount}</span>
                  <StatusBadge status={job.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (user.role === "worker") {
    const myWorker = mockWorkers[0];
    const myJobs = mockJobs.filter(j => j.worker_name === myWorker.name);
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Welcome, {myWorker.name}</h1>
          <p className="text-sm text-muted-foreground">Your performance overview</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Trust Score" value={myWorker.trust_score} icon={Shield} color="success" subtitle={myWorker.trust_level} />
          <StatsCard title="Completed Jobs" value={myWorker.completed_jobs} icon={Briefcase} color="primary" />
          <StatsCard title="4+ Star Ratings" value={myWorker.four_plus_ratings} icon={Star} color="elite" />
          <StatsCard title="Repeat Customers" value={myWorker.repeat_customers} icon={TrendingUp} color="warning" />
        </div>
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">My Recent Jobs</h2>
          <div className="space-y-3">
            {myJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm text-foreground">{job.description}</p>
                  <p className="text-xs text-muted-foreground">{job.customer_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">₹{job.amount}</span>
                  <StatusBadge status={job.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Customer dashboard
  const visibleWorkers = mockWorkers.filter(w => w.visible && w.status === "Active");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Welcome, {user.name}</h1>
        <p className="text-sm text-muted-foreground">Find trusted local help</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Available Workers" value={visibleWorkers.length} icon={Users} color="primary" subtitle="Within 5km radius" />
        <StatsCard title="My Bookings" value={mockJobs.filter(j => j.customer_name === "Arjun M.").length} icon={Briefcase} color="success" />
        <StatsCard title="Reviews Given" value={2} icon={Star} color="elite" />
      </div>
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">Top Verified Workers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleWorkers.slice(0, 4).map((w, i) => (
            <WorkerCard key={w.id} worker={w} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
