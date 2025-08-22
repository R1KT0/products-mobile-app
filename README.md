# Proyecto de Autenticación

Un proyecto de React Native/Expo con autenticación de usuarios y manejo de estado.

## Estructura del Proyecto

Este proyecto sigue un patrón de arquitectura limpia con la siguiente estructura:

- **Capa Core** (`core/`): Contiene la lógica de negocio e interfaces
  - `auth/interface/user.ts` - Definiciones de interfaces de usuario
- **Capa de Presentación** (`presentation/`): Contiene componentes UI y manejo de estado
  - `auth/actions/` - Acciones de autenticación y llamadas a la API
  - `auth/store/` - Store de Zustand para el manejo del estado de autenticación

## Características

- Autenticación de usuarios (login/logout)
- Manejo de tokens JWT
- Persistencia del estado del usuario
- Control de acceso basado en roles
- Verificación del estado de autenticación

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Expo CLI
- Entorno de desarrollo de React Native

## Instalación

1. Clona el repositorio:

