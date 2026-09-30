import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext(null);

// Provee el estado de sesión y las acciones de autenticación a toda la app
export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
            setCargando(false);
        });

        return () => unsubscribe();
    }, []);

    const registrar = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const iniciarSesion = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const cerrarSesion = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ usuario, cargando, registrar, iniciarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook para consumir el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
