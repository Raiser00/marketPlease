import { createContext, useContext, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState<string | null>(null);

    const login = async (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);

        try {
            const res = await api.get('/users/me', {
                headers: { Authorization: `Bearer ${newToken}` }
            });
            setRole(res.data.role);

            if (res.data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/profile');
            }
        } catch (err) {
            console.error('Impossible de récupérer le rôle:', err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setRole(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider> 
    );
};

export const useAuth = () => useContext(AuthContext);
