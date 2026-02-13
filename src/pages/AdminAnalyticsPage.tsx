import { mockAdminStats, mockWorkers } from "@/lib/mock-data";
import StatsCard from "@/components/app/StatsCard";
import { Users, Shield, Briefcase, AlertTriangle, TrendingUp, Ban } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const statusData = [
  { name: "Active", value: mockAdminStats.activeWorkers, color: "hsl(142, 71%, 45%)" },
  { name: "Pending", value: mockAdminStats.pendingWorkers, color: "hsl(38, 92%, 50%)" },
  { name: "Suspended", value: mockAdminStats.suspendedWorkers, color: "hsl(0, 72%, 51%)" },
];

const trustData = mockWorkers.map(w => ({ name: w.name.split(" ")[0], score: w.trust_score }));

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Platform performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard title="Total Workers" value={mockAdminStats.totalWorkers} icon={Users} color="primary" />
        <StatsCard title="Avg Trust Score" value={mockAdminStats.avgTrustScore} icon={Shield} color="success" />
        <StatsCard title="Suspended" value={mockAdminStats.suspendedWorkers} icon={Ban} color="destructive" />
        <StatsCard title="Jobs Completed" value={mockAdminStats.completedJobs} icon={Briefcase} color="elite" />
        <StatsCard title="Total Complaints" value={mockAdminStats.totalComplaints} icon={AlertTriangle} color="warning" />
        <StatsCard title="Active Workers" value={mockAdminStats.activeWorkers} icon={TrendingUp} color="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Worker Status Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3} dataKey="value">
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(217, 33%, 17%)", borderRadius: 8, fontSize: 12 }}
                itemStyle={{ color: "hsl(210, 40%, 93%)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {statusData.map(s => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                {s.name} ({s.value})
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Trust Scores by Worker</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trustData}>
              <XAxis dataKey="name" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(217, 33%, 17%)", borderRadius: 8, fontSize: 12 }}
                itemStyle={{ color: "hsl(210, 40%, 93%)" }}
              />
              <Bar dataKey="score" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
