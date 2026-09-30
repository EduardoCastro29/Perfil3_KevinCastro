import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import useAgregarUsuario from "../hooks/useAgregarUsuario";
import { Button, Field, FormScreen, Message } from "../components/UI";
import MainMenu from "../components/MainMenu";
import { colors, layout } from "../theme";

const Add = ({ navigation }) => {
  const goToHome = () => navigation.goBack();
  const {
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
  } = useAgregarUsuario(goToHome);
  const bloqueado = enviando || guardado;

  return (
    <FormScreen
      footer={
        <MainMenu navigation={navigation} active="Add" disabled={bloqueado} />
      }
    >
      <View style={styles.heading}>
        <Text style={layout.eyebrow}>Tus Usuarios</Text>
        <Text style={layout.title}>Nuevo Usuario</Text>
        <Text style={layout.subtitle}>
          Agrega los detalles y estará listo para crear al usuario
        </Text>
      </View>
      <View style={layout.card}>
        <View style={styles.heading}>
          <Text style={layout.sectionTitle}>Detalles del usuario</Text>
          <Text style={styles.note}>Completa los campos.</Text>
        </View>
        <Field
          label="Nombre Completo"
          placeholder="Chris Kevin Morales Orellana"
          value={usuario.nombre}
          onChangeText={setNombre}
          editable={!bloqueado}
          error={errores.nombre}
          autoCapitalize="sentences"
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Field
          label="Fecha de nacimiento"
          placeholder="29/02/2007"
          value={usuario.fechaNacimiento}
          onChangeText={setFechaNacimiento}
          editable={!bloqueado}
          error={errores.fechaNacimiento}
          autoCapitalize="sentences"
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Field
          label="Carnet institucional"
          placeholder="20210099"
          value={usuario.carnetInstitucional}
          onChangeText={setCarnetInstitucional}
          editable={!bloqueado}
          error={errores.carnetInstitucional}
          autoCapitalize="sentences"
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Field
          label="Url de imagen"
          placeholder="https:cloudinary"
          value={usuario.urlImagen}
          onChangeText={setUrlImagen}
          editable={!bloqueado}
          error={errores.urlImagen}
          autoCapitalize="sentences"
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Message>{error}</Message>
        <Button
          title={
            guardado
              ? "usuario guardado"
              : enviando
                ? "Guardando…"
                : "Guardar usuario"
          }
          onPress={agregarUsuario}
          loading={enviando}
          disabled={guardado}
        />
        <Button
          title="Volver al inicio"
          variant="ghost"
          onPress={goToHome}
          disabled={bloqueado}
        />
      </View>
      <Text style={styles.footer}>
        Los nuevos usuarios se guardan como disponibles.
      </Text>
    </FormScreen>
  );
};

const styles = StyleSheet.create({
  heading: { gap: 8 },
  note: { fontSize: 14, lineHeight: 21, color: colors.muted },
  footer: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.muted,
    textAlign: "center",
  },
});

export default Add;
