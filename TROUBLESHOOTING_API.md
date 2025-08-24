# 🔧 Solución de Problemas de Conectividad API

## ❌ Error: [AxiosError: Network Error]

Este error indica que tu aplicación no puede conectarse al servidor de la API. Aquí están las soluciones más comunes:

## 🚀 Soluciones Rápidas

### 1. **Verificar que el servidor esté corriendo**
```bash
# En tu terminal, verifica que el servidor esté activo
curl http://localhost:3000/api/health
# Debería devolver una respuesta
```

### 2. **Problema de localhost en dispositivos físicos**
Si estás usando un dispositivo físico (no emulador), `localhost` no funcionará.

**Solución:** Cambia la URL de `localhost` por tu IP local:

```typescript
// En constants/Environment.ts, cambia:
dev: {
    ios: 'http://192.168.1.100:3000/api/',     // Tu IP local
    android: 'http://192.168.1.100:3000/api/', // Tu IP local
    web: 'http://localhost:3000/api/'
}
```

**Para encontrar tu IP local:**
- **Windows:** `ipconfig` en CMD
- **Mac/Linux:** `ifconfig` o `ip addr` en terminal
- **Router:** Revisa la configuración de tu router

### 3. **Verificar puerto y firewall**
```bash
# Verifica que el puerto 3000 esté abierto
netstat -an | grep 3000

# En Windows, verifica el firewall
# En Mac, verifica Preferencias del Sistema > Seguridad y Privacidad
```

### 4. **Problemas de CORS (si usas web)**
Si estás probando en web, asegúrate de que tu servidor tenga CORS configurado:

```javascript
// En tu servidor backend
app.use(cors({
    origin: ['http://localhost:8081', 'http://localhost:3000'],
    credentials: true
}));
```

## 🧪 Herramientas de Diagnóstico

### Botón "Probar API"
He agregado un botón de prueba en la pantalla de login que:
- ✅ Prueba la conectividad general
- ✅ Prueba el endpoint específico de login
- ✅ Muestra diagnósticos detallados
- ✅ Identifica problemas específicos

### Logs Detallados
Los interceptores de Axios ahora muestran:
- 🚀 Detalles completos de cada request
- ✅ Respuestas exitosas
- ❌ Errores detallados con diagnósticos
- 🌐 Información de configuración

## 🔍 Verificaciones Adicionales

### 1. **Variables de Entorno**
Verifica que tu archivo `.env` tenga:
```env
EXPO_PUBLIC_STAGE=dev
EXPO_PUBLIC_API_URL_IOS=http://192.168.1.100:3000/api/
EXPO_PUBLIC_API_URL_ANDROID=http://192.168.1.100:3000/api/
```

### 2. **Configuración del Servidor**
Asegúrate de que tu servidor esté configurado para:
- Escuchar en `0.0.0.0` (no solo localhost)
- Aceptar conexiones del puerto 3000
- Tener CORS configurado correctamente

### 3. **Red y Firewall**
- Verifica que no haya firewall bloqueando el puerto 3000
- Asegúrate de que ambos dispositivos estén en la misma red
- Prueba con `ping` entre dispositivos

## 📱 Configuración por Plataforma

### iOS Simulator
```typescript
ios: 'http://localhost:3000/api/'
```

### Android Emulator
```typescript
android: 'http://10.0.2.2:3000/api/'
```

### Dispositivos Físicos
```typescript
ios: 'http://192.168.1.100:3000/api/'     // Tu IP local
android: 'http://192.168.1.100:3000/api/' // Tu IP local
```

### Web
```typescript
web: 'http://localhost:3000/api/'
```

## 🚨 Errores Comunes y Soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `Network Error` | Servidor no accesible | Verificar IP, puerto y firewall |
| `ECONNREFUSED` | Servidor no corriendo | Iniciar servidor backend |
| `ETIMEDOUT` | Timeout de conexión | Aumentar timeout o verificar red |
| `CORS Error` | Problema de CORS | Configurar CORS en backend |

## 📞 Próximos Pasos

1. **Usa el botón "Probar API"** para diagnóstico automático
2. **Verifica los logs** en la consola para detalles específicos
3. **Cambia localhost por tu IP local** si usas dispositivo físico
4. **Verifica que el servidor esté corriendo** en el puerto correcto
5. **Revisa la configuración de red** y firewall

## 🔗 Recursos Adicionales

- [Expo Networking Guide](https://docs.expo.dev/guides/networking/)
- [React Native Network Security](https://reactnative.dev/docs/network-security)
- [Axios Error Handling](https://axios-http.com/docs/handling_errors)

---

**¿Sigues teniendo problemas?** Usa el botón "Probar API" y comparte los logs detallados para diagnóstico adicional.

