import { productsApi } from './productsApi';

/**
 * Utilidad para probar la conectividad de la API
 */
export const testApiConnection = async () => {
    console.log('🧪 Probando conectividad de la API...');

    try {
        // Test 1: Verificar configuración
        console.log('📋 Configuración actual:', {
            baseURL: productsApi.defaults.baseURL,
            timeout: productsApi.defaults.timeout,
            headers: productsApi.defaults.headers
        });

        // Test 2: Intentar hacer una petición simple
        console.log('🌐 Probando petición de prueba...');

        const response = await productsApi.get('seed', {
            timeout: 5000 // Timeout más corto para pruebas
        });

        console.log('✅ API responde correctamente:', {
            status: response.status,
            data: response.data
        });

        return { success: true, data: response.data };

    } catch (error: any) {
        console.error('❌ Error en prueba de API:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            isNetworkError: error.code === 'NETWORK_ERROR' || error.message === 'Network Error',
            isTimeoutError: error.code === 'ECONNABORTED'
        });

        // Diagnóstico específico
        if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
            console.error('🔍 Diagnóstico de Network Error:');
            console.error('   1. Verifica que tu servidor esté corriendo');
            console.error('   2. Verifica que la URL sea correcta:', productsApi.defaults.baseURL);
            console.error('   3. Si usas dispositivo físico, cambia localhost por tu IP local');
            console.error('   4. Verifica que no haya firewall bloqueando el puerto 3000');
        }

        return {
            success: false,
            error: error.message,
            code: error.code,
            status: error.response?.status
        };
    }
};

/**
 * Prueba específica para el endpoint de login
 */
export const testLoginEndpoint = async () => {
    console.log('🔐 Probando endpoint de login...');

    try {
        const testData = {
            email: 'test@example.com',
            password: 'testpassword'
        };

        const response = await productsApi.post('auth/login', testData, {
            timeout: 10000
        });

        console.log('✅ Endpoint de login responde:', {
            status: response.status,
            data: response.data
        });

        return { success: true, data: response.data };

    } catch (error: any) {
        console.error('❌ Error en endpoint de login:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data
        });

        if (error.response?.status === 401) {
            console.log('ℹ️ 401 Unauthorized - Esto es normal para credenciales de prueba');
            return { success: true, message: 'Endpoint responde correctamente (401 esperado)' };
        }

        return {
            success: false,
            error: error.message,
            code: error.code,
            status: error.response?.status
        };
    }
};

