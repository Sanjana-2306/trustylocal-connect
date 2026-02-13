import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import AppLayout from "@/components/app/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import WorkersPage from "./pages/WorkersPage";
import JobsPage from "./pages/JobsPage";
import ReviewsPage from "./pages/ReviewsPage";
import WorkerProfilePage from "./pages/WorkerProfilePage";
import AdminWorkersPage from "./pages/AdminWorkersPage";
import AdminComplaintsPage from "./pages/AdminComplaintsPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/workers" element={<ProtectedRoute><WorkersPage /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute><ReviewsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><WorkerProfilePage /></ProtectedRoute>} />
      <Route path="/admin/workers" element={<ProtectedRoute><AdminWorkersPage /></ProtectedRoute>} />
      <Route path="/admin/complaints" element={<ProtectedRoute><AdminComplaintsPage /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalyticsPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
