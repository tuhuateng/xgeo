import { useEffect, useState, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "@/services/auth";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const check = async () => {
            const user = await auth.checkAuth();
            setIsAuthenticated(!!user);
        };
        check();
    }, []);

    if (isAuthenticated === null) {
        // Loading state
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};
