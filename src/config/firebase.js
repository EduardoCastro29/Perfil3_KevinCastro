import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

const requiredConfig = [
  ['API_KEY', API_KEY],
  ['AUTH_DOMAIN', AUTH_DOMAIN],
  ['PROJECT_ID', PROJECT_ID],
  ['APP_ID', APP_ID],
];

const missingConfig = requiredConfig
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missingConfig.length > 0) {
  throw new Error(
    `Faltan variables de Firebase en .env: ${missingConfig.join(', ')}. ` +
    'Reinicia Expo con "npx expo start -c" después de corregirlas.'
  );
}

// Evita crear una segunda instancia durante una recarga en desarrollo.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const database = getFirestore(app);

// La persistencia con AsyncStorage evita que la sesión se cierre al recargar la app
let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // Expo puede conservar la instancia entre recargas rápidas.
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw error;
  }
}

export { database, auth };
