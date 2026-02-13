import {
  LayoutDashboard, Users, Briefcase, Shield, AlertTriangle,
  BarChart3, MapPin, LogOut, Star, Bot
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const customerLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Find Workers", url: "/workers", icon: MapPin },
  { title: "My Jobs", url: "/jobs", icon: Briefcase },
  { title: "Reviews", url: "/reviews", icon: Star },
];

const workerLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Jobs", url: "/jobs", icon: Briefcase },
  { title: "My Profile", url: "/profile", icon: Shield },
];

const adminLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Workers", url: "/admin/workers", icon: Users },
  { title: "Jobs", url: "/jobs", icon: Briefcase },
  { title: "Complaints", url: "/admin/complaints", icon: AlertTriangle },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
];

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const links = user.role === "admin" ? adminLinks : user.role === "worker" ? workerLinks : customerLinks;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 flex flex-col border-r border-border bg-sidebar">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground">VerifiedHelp</h1>
            <p className="text-[10px] text-muted-foreground capitalize">{user.role} Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.url}
            to={link.url}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            activeClassName="bg-sidebar-accent text-primary font-medium"
          >
            <link.icon className="h-4 w-4" />
            <span>{link.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground">
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
