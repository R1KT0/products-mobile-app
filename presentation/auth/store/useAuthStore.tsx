import { User } from "@/core/auth/interface/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
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
    changeStatus: (token?: string, user?: User) => Promise<boolean>;
}


export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,



    changeStatus: async (token?: string, user?: User) => {

        if (!token && !user) {
            set({
                status: 'unauthenticated',
                token: undefined,
                user: undefined,
            })
            //TODO: llamar a logout
            return false;
        }

        set({
            status: 'authenticated',
            token,
            user,
        });


        await SecureStorageAdapter.saveItem('token', token!);

        return true;
    },



    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);

        return await get().changeStatus(resp?.token, resp?.user)
    },



    checkAuthStatus: async () => {
        //** Esto sirve para que no se haga el chequeo de status si ya hay un usuario autenticado */
        // if (get().user) return; //! Solo para testing, no se debe usar en producción!!!

        const resp = await authCheckStatus();

        await get().changeStatus(resp?.token, resp?.user);
    },

    logout: async () => {
        //TODO: Eliminar de Secure Storage
        await SecureStorageAdapter.deleteItem('token');

        set({
            status: 'unauthenticated',
            token: undefined,
            user: undefined,
        })
    },



}))