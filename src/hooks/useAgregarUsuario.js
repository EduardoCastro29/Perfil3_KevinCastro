import { useRef, useState } from "react";
import { Alert } from "react-native";
import { database } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { mensajeFirestore } from "../utils/firebaseErrors";

const useAgregarUsuario = (onSuccess) => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    fechaNacimiento: "",
    carnetInstitucional: "",
    urlImagen: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [errores, setErrores] = useState({});
  const [error, setError] = useState("");
  const enCurso = useRef(false);

  const setNombre = (nombre) => {
    setUsuario((prev) => ({ ...prev, nombre }));
    setErrores((prev) => ({ ...prev, nombre: "" }));
    setError("");
  };
  const setFechaNacimiento = (fechaNacimiento) => {
    setUsuario((prev) => ({ ...prev, fechaNacimiento }));
    setErrores((prev) => ({ ...prev, fechaNacimiento: "" }));
    setError("");
  };
  const setCarnetInstitucional = (carnetInstitucional) => {
    setUsuario((prev) => ({ ...prev, carnetInstitucional }));
    setErrores((prev) => ({ ...prev, carnetInstitucional: "" }));
    setError("");
  };
  const setUrlImagen = (urlImagen) => {
    setUsuario((prev) => ({ ...prev, urlImagen }));
    setErrores((prev) => ({ ...prev, urlImagen: "" }));
    setError("");
  };

  const agregarUsuario = async () => {
    if (enCurso.current) return;
    const validacion = {};
    if (!usuario.nombre.trim())
      validacion.nombre = "Ingresa el nombre del usuario.";
    if (!usuario.fechaNacimiento.trim())
      validacion.fechaNacimiento = "Ingresa sección  y grupo";
    if (!usuario.carnetInstitucional.trim())
      validacion.carnetInstitucional = "Ingresa el carnet.";
    if (!usuario.urlImagen.trim())
      validacion.urlImagen = "Ingresa la url de la imagen.";

    setErrores(validacion);
    setError("");
    if (Object.keys(validacion).length) return;

    enCurso.current = true;
    setEnviando(true);
    try {
      await addDoc(collection(database, "usuario"), {
        ...usuario,
        nombre: usuario.nombre.trim(),
        fechaNacimiento: usuario.fechaNacimiento.trim(),
        carnetInstitucional: usuario.carnetInstitucional.trim(),
        urlImagen: usuario.urlImagen.trim(),
        creado: new Date(),
      });
      setGuardado(true);
      Alert.alert(
        "usuario agregado",
        "El usuario se agregó correctamente",
        [{ text: "Continuar", onPress: onSuccess }],
        { cancelable: false },
      );
    } catch (error) {
      enCurso.current = false;
      setError(mensajeFirestore(error, "No se pudo guardar el usuario."));
    } finally {
      setEnviando(false);
    }
  };

  return {
    usuario,
    setNombre,
    setFechaNacimiento,
    setCarnetInstitucional,
    setUrlImagen,
    agregarUsuario,
    enviando,
    guardado,
    errores,
    error,
  };
};

export default useAgregarUsuario;
