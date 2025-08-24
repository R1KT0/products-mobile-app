import { productsApi } from '../../api/productsApi';
import { AuthResponse, UserToken } from '../interface/user';

export const returnUserToken = (data: AuthResponse): UserToken => {
    return {
        token: data.token,
        user: data.user
    }
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase();
    console.log('🔐 Login attempt:', { email, password });
    console.log('🌐 API Base URL:', productsApi.defaults.baseURL);

    // Validar que la API esté configurada
    if (!productsApi.defaults.baseURL) {
        console.error('❌ API no está configurada - baseURL es undefined');
        return null;
    }

    try {
        console.log('🚀 Enviando request a:', `${productsApi.defaults.baseURL}auth/login`);

        const { data } = await productsApi.post<AuthResponse>('auth/login', { email, password });
        console.log('✅ Login successful:', { data });

        return returnUserToken(data);
    } catch (error: any) {
        console.error('❌ Login failed:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            isNetworkError: error.code === 'NETWORK_ERROR' || error.message === 'Network Error',
            isTimeoutError: error.code === 'ECONNABORTED',
            config: {
                url: error.config?.url,
                baseURL: error.config?.baseURL,
                method: error.config?.method,
                timeout: error.config?.timeout
            }
        });

        // Manejar diferentes tipos de errores
        if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
            console.error('🌐 Network Error - Verifica:');
            console.error('   - Que tu servidor esté corriendo en:', productsApi.defaults.baseURL);
            console.error('   - Que no haya problemas de firewall/red');
            console.error('   - Que la URL sea accesible desde tu dispositivo');
        } else if (error.code === 'ECONNABORTED') {
            console.error('⏰ Timeout Error - La petición tardó demasiado');
        } else if (error.response?.status === 404) {
            console.error('🔍 Endpoint no encontrado - Verifica la ruta del API');
        } else if (error.response?.status >= 500) {
            console.error('💥 Error del servidor - Verifica los logs del backend');
        }

        return null;
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await productsApi.get<AuthResponse>('/auth/check-status');

        return returnUserToken(data)
    } catch (error) {
        return null;
    }
}