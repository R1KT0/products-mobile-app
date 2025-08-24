/**
 * Environment Configuration
 * Configuración del entorno para la aplicación
 */

export const Environment = {
    // Stage (dev, prod)
    STAGE: process.env.EXPO_PUBLIC_STAGE || 'dev',

    // API URLs
    API_URLS: {
        dev: {
            ios: 'http://192.168.0.4:3000/api/',
            android: 'http://192.168.0.4:3000/api/',
            web: 'http://192.168.0.4:3000/api/'
        },
        prod: {
            ios: process.env.EXPO_PUBLIC_API_URL_IOS || 'https://your-production-api.com/api/',
            android: process.env.EXPO_PUBLIC_API_URL_ANDROID || 'https://your-production-api.com/api/',
            web: process.env.EXPO_PUBLIC_API_URL_PROD || 'https://your-production-api.com/api/'
        }
    },

    // Timeouts
    TIMEOUTS: {
        api: 10000, // 10 segundos
        auth: 15000  // 15 segundos para autenticación
    },

    // Retry configuration
    RETRY: {
        maxAttempts: 3,
        delay: 1000 // 1 segundo entre intentos
    }
};

/**
 * Obtiene la URL de la API según el entorno y plataforma
 */
export const getApiUrl = (): string => {
    const stage = Environment.STAGE;
    const platform = require('react-native').Platform.OS;

    let apiUrl: string;

    if (stage === 'prod') {
        apiUrl = Environment.API_URLS.prod[platform as keyof typeof Environment.API_URLS.prod] ||
            Environment.API_URLS.prod.web;
    } else {
        apiUrl = Environment.API_URLS.dev[platform as keyof typeof Environment.API_URLS.dev] ||
            Environment.API_URLS.dev.web;
    }

    console.log('🌐 API URL configurada:', {
        stage,
        platform,
        apiUrl,
        envVars: {
            EXPO_PUBLIC_STAGE: process.env.EXPO_PUBLIC_STAGE,
            EXPO_PUBLIC_API_URL_IOS: process.env.EXPO_PUBLIC_API_URL_IOS,
            EXPO_PUBLIC_API_URL_ANDROID: process.env.EXPO_PUBLIC_API_URL_ANDROID,
            EXPO_PUBLIC_API_URL_PROD: process.env.EXPO_PUBLIC_API_URL_PROD
        }
    });
    console.log({ warafaL: apiUrl });

    return apiUrl;
};
