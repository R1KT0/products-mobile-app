import { getApiUrl } from "@/constants/Environment";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import axios from "axios";

const API_URL = getApiUrl();

// Validar que la URL esté configurada
if (!API_URL) {
    console.error('❌ API_URL no está configurada correctamente');
    throw new Error('API_URL no está configurada');
}

console.log('🌐 API configurada:', { API_URL });

const productsApi = axios.create({
    baseURL: API_URL,
    timeout: 10000, // 10 segundos de timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor para logs de requests
productsApi.interceptors.request.use(
    (config) => {
        console.log('🚀 Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
            fullURL: `${config.baseURL}${config.url}`,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Interceptor para logs de responses
productsApi.interceptors.response.use(
    (response) => {
        console.log('✅ Response:', {
            status: response.status,
            statusText: response.statusText,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error('❌ Response Error:', {
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
            console.error('   - Que tu servidor esté corriendo en:', API_URL);
            console.error('   - Que no haya problemas de firewall/red');
            console.error('   - Que la URL sea accesible desde tu dispositivo');
            console.error('   - Que estés usando la IP correcta (no localhost en dispositivos físicos)');
        } else if (error.code === 'ECONNABORTED') {
            console.error('⏰ Timeout Error - La petición tardó demasiado');
        } else if (error.response?.status === 404) {
            console.error('🔍 Endpoint no encontrado - Verifica la ruta del API');
        } else if (error.response?.status >= 500) {
            console.error('💥 Error del servidor - Verifica los logs del backend');
        }

        return Promise.reject(error);
    }
);


// Interceptores

productsApi.interceptors.request.use(async (config) => {
    //Verificar si tenemos token en el storage
    const token = await SecureStorageAdapter.getItem('token');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
})


export { productsApi };

