import { createContext, useContext, useState, ReactNode } from "react";
import { UserRole } from "@/lib/mock-data";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

const mockUsers: Record<UserRole, AuthUser> = {
  customer: { id: "c1", name: "Arjun Mehta", email: "arjun@email.com", role: "customer" },
  worker: { id: "w1", name: "Rajesh Kumar", email: "rajesh@email.com", role: "worker" },
  admin: { id: "a1", name: "Admin User", email: "admin@verifiedhelp.com", role: "admin" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (role: UserRole) => {
    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
