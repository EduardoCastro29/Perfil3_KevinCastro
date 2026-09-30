import { useRef, useState } from 'react';

// Traduce los códigos de error de Firebase Auth a mensajes legibles en español
const traducirError = (code) => {
    switch (code) {
        case 'auth/invalid-email':
            return 'El correo electrónico no es válido.';
        case 'auth/email-already-in-use':
            return 'Ese correo ya está registrado.';
        case 'auth/weak-password':
            return 'La contraseña debe tener al menos 6 caracteres.';
        case 'auth/operation-not-allowed':
        case 'auth/configuration-not-found':
            return 'El acceso con correo y contraseña no está habilitado en Firebase. Actívalo en Firebase Console → Authentication → Sign-in method → Email/Password.';
        case 'auth/network-request-failed':
            return 'No se pudo conectar con Firebase. Revisa tu conexión a internet e inténtalo de nuevo.';
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
            return 'Correo o contraseña incorrectos.';
        case 'auth/too-many-requests':
            return 'Demasiados intentos. Espera unos minutos antes de volver a intentar.';
        case 'auth/user-disabled':
            return 'Esta cuenta está deshabilitada.';
        default:
            return 'Ocurrió un error. Por favor, intenta nuevamente.';
    }
};

const useAuthForm = (accion) => {
    const [email, actualizarEmail] = useState('');
    const [password, actualizarPassword] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [errores, setErrores] = useState({});
    const [error, setError] = useState('');
    const enCurso = useRef(false);

    const setEmail = (value) => {
        actualizarEmail(value);
        setErrores((prev) => ({ ...prev, email: '' }));
        setError('');
    };

    const setPassword = (value) => {
        actualizarPassword(value);
        setErrores((prev) => ({ ...prev, password: '' }));
        setError('');
    };

    const enviar = async () => {
        if (enCurso.current) return;
        const emailNormalizado = email.trim().toLowerCase();
        const validacion = {};
        if (!emailNormalizado) {
            validacion.email = 'Ingresa tu correo electrónico.';
        } else if (!/^\S+@\S+\.\S+$/.test(emailNormalizado)) {
            validacion.email = 'Ingresa un correo electrónico válido.';
        }
        if (!password) {
            validacion.password = 'Ingresa tu contraseña.';
        } else if (password.length < 6) {
            validacion.password = 'La contraseña debe tener al menos 6 caracteres.';
        }
        setErrores(validacion);
        setError('');
        if (Object.keys(validacion).length) return;

        enCurso.current = true;
        setEnviando(true);
        try {
            await accion(emailNormalizado, password);
        } catch (error) {
            const mensaje = traducirError(error.code);
            if (['auth/invalid-email', 'auth/email-already-in-use'].includes(error.code)) {
                setErrores({ email: mensaje });
            } else if (error.code === 'auth/weak-password') {
                setErrores({ password: mensaje });
            } else {
                setError(mensaje);
            }
        } finally {
            enCurso.current = false;
            setEnviando(false);
        }
    };

    return { email, setEmail, password, setPassword, enviando, enviar, errores, error };
};

export default useAuthForm;
