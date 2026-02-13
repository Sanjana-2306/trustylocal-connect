import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/lib/mock-data";
import { Shield, Users, Briefcase, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const roles: { role: UserRole; label: string; desc: string; icon: any }[] = [
  { role: "customer", label: "Customer", desc: "Find and book verified workers", icon: Users },
  { role: "worker", label: "Worker", desc: "Manage jobs and build trust", icon: Briefcase },
  { role: "admin", label: "Admin", desc: "Govern workforce and analytics", icon: Shield },
];

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-primary/15 items-center justify-center mb-4 glow-primary">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Verified Local Help</h1>
          <p className="text-sm text-muted-foreground">Enterprise workforce governance platform</p>
        </motion.div>

        <div className="space-y-3">
          {roles.map((r, i) => (
            <motion.button
              key={r.role}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => login(r.role)}
              className="w-full glass-card p-4 flex items-center gap-4 hover:border-primary/50 transition-all group cursor-pointer text-left"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <r.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
          ))}
        </div>

        <p className="text-center text-[10px] text-muted-foreground mt-8">
          Demo mode — select a role to explore the platform
        </p>
      </div>
    </div>
  );
}
