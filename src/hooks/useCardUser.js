import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { database } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { mensajeFirestore } from '../utils/firebaseErrors';

const useCardUser = (id) => {
    const [procesando, setProcesando] = useState(false);
    const [error, setError] = useState('');
    const enCurso = useRef(false);

    const ejecutar = async (accion) => {
        if (enCurso.current) return;
        enCurso.current = true;
        setProcesando(true);
        setError('');
        try {
            await accion();
        } catch (error) {
            setError(mensajeFirestore(error, 'No se pudo actualizar el usuario'));
        } finally {
            enCurso.current = false;
            setProcesando(false);
        }
    };

    const eliminarUsuario = () => {
        if (enCurso.current) return;
        Alert.alert('¿Eliminar usuario?', 'Esta acción no se puede deshacer.', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', style: 'destructive', onPress: () => ejecutar(() => deleteDoc(doc(database, 'usuario', id))) },
        ]);
    };


    return { eliminarUsuario,  procesando, error };
};

export default useCardUser;
