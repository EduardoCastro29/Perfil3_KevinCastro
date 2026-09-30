export const mensajeFirestore = (error, fallback) => {
    const code = error?.code?.replace('firestore/', '');
    if (code === 'permission-denied') {
        return 'Tu cuenta no tiene permiso para esta operación. Contacta al administrador.';
    }
    if (code === 'unavailable' || code === 'deadline-exceeded') {
        return 'No se pudo conectar. Revisa tu conexión a internet y vuelve a intentar.';
    }
    if (code === 'unauthenticated') {
        return 'Tu sesión ha caducado. Cierra sesión y vuelve a ingresar.';
    }
    return fallback + ' Inténtalo de nuevo.';
};
