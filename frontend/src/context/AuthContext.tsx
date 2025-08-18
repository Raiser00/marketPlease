import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  role: string;
  exp: number;
}

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setRole(decoded.role);
        setUserId(decoded.id);
      } catch (err) {
        console.error("Token invalide :", err);
        logout();
      }
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    try {
      const decoded = jwtDecode<JwtPayload>(newToken);
      setRole(decoded.role);
      setUserId(decoded.id);

      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Impossible de décoder le token:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
    setUserId(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
