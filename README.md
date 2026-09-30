# Instalación de dependencias

Ejecuta los siguientes comandos uno por uno, en la raíz del proyecto (`firebase-app`), para instalar cada dependencia con la versión exacta usada en este proyecto.

```bash
npm install @react-navigation/native@^7.3.18
npm install @react-navigation/native-stack@^7.18.10
npm install babel-preset-expo@~54.0.10
npm install expo-constants@~18.0.14
npm install firebase@^12.18.0
npm install react-native-dotenv@^4.1.1
npm install react-native-gesture-handler@~2.28.0
npm install react-native-safe-area-context@~5.6.0
npm install react-native-screens@~4.16.0
```

## Alternativa recomendada (Expo)

Para paquetes nativos (Expo/React Native), es mejor usar `npx expo install` en lugar de `npm install`, ya que Expo se encarga de instalar la versión compatible con el SDK del proyecto:

```bash
npx expo install expo-constants
npx expo install expo-status-bar
npx expo install react-native-gesture-handler
npx expo install react-native-safe-area-context
npx expo install react-native-screens
```

Los paquetes que no son específicos de Expo pueden instalarse con `npm install` normalmente:

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install babel-preset-expo
npm install firebase
npm install react-native-dotenv
npm install @react-native-async-storage/async-storage
```

## Custom hooks

Toda la lógica que antes vivía dentro de las screens/componentes ahora está separada en `src/hooks`:

- `useProductos`: suscripción en tiempo real a la colección `productos` (usado por `Home`).
- `useAgregarProducto`: estado del formulario y guardado del nuevo producto (usado por `Add`).
- `useCardProducto`: eliminar/actualizar un producto (usado por `CardProductos`).
- `useAuthForm`: estado del formulario de email/contraseña y manejo de errores (usado por `Login` y `Register`).

El estado global de sesión vive en `src/context/AuthContext.js`, expuesto como el custom hook `useAuth()`.

## Firebase Authentication

Se agregó autenticación con email y contraseña usando `firebase/auth`:

- `src/config/firebase.js` inicializa `auth` con `initializeAuth` + `getReactNativePersistence(AsyncStorage)`, para que la sesión persista aunque se cierre la app.
- `src/context/AuthContext.js` escucha `onAuthStateChanged` y expone `usuario`, `cargando`, `registrar`, `iniciarSesion` y `cerrarSesion`.
- `src/screens/Login.js` y `src/screens/Register.js` son las pantallas de acceso.
- `src/navigation/Navigation.js` muestra el stack de `Login`/`Register` si no hay sesión, o el stack de `Home`/`Add` si el usuario ya inició sesión.

**Importante:** antes de registrar o iniciar sesión, abre [Firebase Console](https://console.firebase.google.com/), selecciona el proyecto indicado por `PROJECT_ID` en `.env` y configura lo siguiente:

1. Ve a **Build → Authentication** y pulsa **Get started** si es la primera vez.
2. En **Sign-in method**, abre **Email/Password**, activa el primer interruptor y pulsa **Save**.
3. Ve a **Build → Firestore Database** y crea la base de datos si todavía no existe. La aplicación guarda los productos en la colección `productos`.
4. Reinicia Expo limpiando la caché: `npx expo start -c`.

El error `auth/configuration-not-found` significa que el paso 2 aún no está configurado en Firebase. No se arregla desde el emulador: la activación debe hacerse en la consola del proyecto de Firebase.
