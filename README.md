## Products App – React Native + Expo Router

Aplicación móvil para listar productos, con navegación usando Expo Router, estado global con Zustand y fetching/cache con React Query. Incluye autenticación básica, theming claro/oscuro y configuración de API por entorno.

### Tecnologías
- Expo (SDK 53)
- React Native 0.79
- Expo Router v5
- @tanstack/react-query
- Zustand
- Axios
- Reanimated / Gesture Handler

### Características
- Listado de productos con paginación infinita
- Autenticación (checking/unauthenticated/authenticated)
- Persistencia de token con expo-secure-store
- Theming centralizado (claro/oscuro)
- Interceptores y logs detallados de red

## Requisitos previos
- Node.js 18+
- npm, pnpm o yarn
- Expo CLI (`npx expo`) y un emulador o dispositivo físico con Expo Go

## Instalación
```bash
npm install
```

## Variables de entorno
Este proyecto usa variables públicas de Expo y configuración en `constants/Environment.ts`.

Archivo `.env` opcional:
```env
EXPO_PUBLIC_STAGE=dev
EXPO_PUBLIC_API_URL_IOS=http://TU_IP_LOCAL:3000/api/
EXPO_PUBLIC_API_URL_ANDROID=http://TU_IP_LOCAL:3000/api/
EXPO_PUBLIC_API_URL_PROD=https://tu-dominio-produccion.com/api/
```
Notas:
- En dispositivos físicos no funciona `localhost`; usa tu IP local (ej. `192.168.0.4`).
- Ajusta las IPs por defecto en `constants/Environment.ts` si es necesario.
- Revisa `TROUBLESHOOTING_API.md` para diagnóstico de red.

## Ejecutar
```bash
npm run start
# Android
npm run android
# iOS (macOS)
npm run ios
# Web
npm run web
# Limpiar caché si hay problemas
npx expo start --clear
```

## Scripts útiles
```json
{
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web",
  "lint": "expo lint",
  "reset-project": "node ./scripts/reset-project.js"
}
```
Advertencia: `reset-project` deja el proyecto en blanco. Úsalo con cuidado.

## Estructura
```
app/
  _layout.tsx
  (products-app)/(home)/{ _layout.tsx, index.tsx }
  auth/{ login/index.tsx, register/index.tsx }
assets/
constants/{ Colors.ts, Environment.ts }
core/
  api/productsApi.ts
  auth/
  products/
presentation/
  auth/store/useAuthStore.tsx
  products/components/
  theme/
scripts/reset-project.js
TROUBLESHOOTING_API.md
```

## Arquitectura y estado
- Zustand para autenticación en `presentation/auth/store/useAuthStore.tsx`.
- React Query para productos en `presentation/products/hooks/useProducts.ts`.
- Axios e interceptores en `core/api/productsApi.ts`.

## Conectividad y API
La base URL se calcula en `getApiUrl()` según plataforma y stage. Recomendaciones:
- Usa IP local en dispositivos físicos (no `localhost`).
- Backend escuchando en `0.0.0.0` y puerto accesible.
- Más detalles en `TROUBLESHOOTING_API.md`.

## Solución de problemas
- La app se queda en el splash: se oculta al cargar fuentes. Recarga o ejecuta `npx expo start --clear`.
- Revisa logs de Metro para errores de runtime.
- Problemas de red: sigue la guía `TROUBLESHOOTING_API.md`.

## Lint
```bash
npm run lint
```

## Licencia
MIT

