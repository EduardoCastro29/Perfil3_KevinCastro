import { useEffect, useState } from 'react';
import { database } from '../config/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { mensajeFirestore } from '../utils/firebaseErrors';

const useCardUser = () => {
    const [usuario, setUsuario] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [intento, setIntento] = useState(0);

    useEffect(() => {
        setCargando(true);
        setError('');
        const q = query(collection(database, 'usuario'), orderBy('creado', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setUsuario(docs);
            setCargando(false);
            setError('');
        }, (error) => {
            setCargando(false);
            setError(mensajeFirestore(error, 'No se pudieron cargar los usuarios.'));
        });

        return () => unsubscribe();
    }, [intento]);

    return { usuario, cargando, error, reintentar: () => setIntento((prev) => prev + 1) };
};

export default useCardUser;
