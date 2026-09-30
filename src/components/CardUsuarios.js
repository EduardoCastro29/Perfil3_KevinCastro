import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useCardUsuario from "../hooks/useCardUser";
import { Button, Message } from "./UI";
import { colors } from "../theme";

const CardUsuarios = ({ id, nombre, fechaNacimiento, carnetInstitucional, urlImagen }) => {
  const { eliminarUsuario, procesando, error } = useCardUsuario(id);

  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.detalle}>Nacimiento: {fechaNacimiento}</Text>
        <Text style={styles.detalle}>Carnet: {carnetInstitucional}</Text>
        <Text style={styles.detalle} numberOfLines={1}>Imagen: {urlImagen}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          title="Eliminar"
          variant="danger"
          onPress={eliminarUsuario}
          disabled={procesando}
        />
      </View>
      <Message>{error}</Message>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    marginBottom: 12,
    gap: 16,
  },
  heading: {
    gap: 4,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  detalle: {
    fontSize: 14,
    color: colors.muted,
  },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  action: { flexGrow: 1, flexBasis: 160 },
});

export default CardUsuarios;