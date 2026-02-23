import { useState, useEffect, type ReactNode } from 'react';
import { authApi } from '../api/auth.api';
import AuthContext from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => { checkAuth(); }, []);

    const checkAuth = async () => {
        try {
            const response = await authApi.getProfile();
            setUser(response.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };


    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login: async (email: string, password: string) => {
            const res = await authApi.login(email, password);
            setUser(res.data.user);
        },
        register: async (email: string, password: string) => {
            const res = await authApi.register(email, password);
            setUser(res.data.user);
        },
        logout: async () => {
            await authApi.logout();
            setUser(null);
        },

        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
