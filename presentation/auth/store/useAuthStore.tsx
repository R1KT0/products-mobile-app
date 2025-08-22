import { User } from "@/core/auth/interface/user";
import { create } from "zustand";
import { authCheckStatus, authLogin } from "../../../core/auth/actions/auth-actions";
export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'


export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    // Methods
    login: (email: string, password: string) => Promise<boolean>;
    checkAuthStatus: () => Promise<void>;
    logout: () => Promise<void>;
    changeStatus: (token?: string, user?: User) => boolean;
}


export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,



    changeStatus: (token?: string, user?: User) => {
        if (token && user) {
            set({
                status: 'authenticated',
                token,
                user,
            })
            //TODO: llamar a logout
            return false;
        }

        set({
            status: 'authenticated',
            token,
            user,
        })

        return true;

    },



    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);

        return get().changeStatus(resp?.token, resp?.user);
    },



    checkAuthStatus: async () => {

        const resp = await authCheckStatus();

        get().changeStatus(resp?.token, resp?.user);
    },

    logout: async () => {
        //TODO: Eliminar de Secure Storage

        set({
            status: 'unauthenticated',
            token: undefined,
            user: undefined,
        })
    },



}))