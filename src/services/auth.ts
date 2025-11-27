import { api } from "./api";

export interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
    role: string;
}

export const auth = {
    // Check if user is logged in (check session/cookie or guest mode)
    checkAuth: async (): Promise<User | null> => {
        // Check for guest mode
        const isGuest = localStorage.getItem('xgeo_guest') === 'true';
        if (isGuest) {
            return {
                id: 'guest',
                email: 'guest@example.com',
                name: 'Guest User',
                avatar: '',
                role: 'guest'
            };
        }

        try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            return null;
        }
    },


    // Redirect to WeChat Login
    loginWithWechat: () => {
        window.location.href = "/api/auth/wechat/login";
    },

    // Login as Guest
    loginAsGuest: () => {
        localStorage.setItem('xgeo_guest', 'true');
        window.location.href = "/";
    },

    // Logout
    logout: async () => {
        // Clear guest mode
        localStorage.removeItem('xgeo_guest');

        // In a real app, call backend logout endpoint to clear cookie
        // For now, we just reload or clear local state if any
        window.location.href = "/";
    },

};
