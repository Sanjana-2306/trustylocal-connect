import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import ChatBot from "./ChatBot";
import { useAuth } from "@/context/AuthContext";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-60 min-h-screen p-6">
        {children}
      </main>
      <ChatBot />
    </div>
  );
}
