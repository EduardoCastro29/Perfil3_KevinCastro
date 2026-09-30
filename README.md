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

