import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUser from "../hooks/useUser";
import { useAuth } from "../context/AuthContext";
import CardUsuarios from "../components/CardUsuarios";
import MainMenu from "../components/MainMenu";
import { Button, Message } from "../components/UI";
import { colors, layout } from "../theme";

const Home = ({ navigation }) => {
  const { usuario: usuarios, cargando, error, reintentar } = useUser();
  const { usuario, cerrarSesion } = useAuth();
  const [saliendo, setSaliendo] = useState(false);
  const [errorSesion, setErrorSesion] = useState("");
  const logoutLock = useRef(false);
  const nombre = usuario?.displayName || usuario?.email?.split("@")[0];
  const estudiante = usuarios[0];

  const salir = async () => {
    if (logoutLock.current) return;
    logoutLock.current = true;
    setSaliendo(true);
    setErrorSesion("");
    try {
      await cerrarSesion();
    } catch {
      setErrorSesion("No se pudo cerrar la sesión. Inténtalo de nuevo.");
    } finally {
      logoutLock.current = false;
      setSaliendo(false);
    }
  };

  const goToAdd = () => navigation.navigate("Add");
  const header = (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <Text style={styles.brand}>Evaluación Móvil</Text>
        <Button
          title={saliendo ? "Saliendo…" : "Cerrar sesión"}
          variant="ghost"
          loading={saliendo}
          onPress={salir}
        />
      </View>
      <Message>{errorSesion}</Message>
      <View style={styles.heading}>
        {estudiante ? (
          <View style={styles.studentCard}>
            <Text style={layout.eyebrow}>Estudiante</Text>
            <Text style={layout.title}>{estudiante.nombre}</Text>
            <View style={styles.studentRow}>
              <Text style={styles.studentLabel}>Carnet</Text>
              <Text style={styles.studentValue}>
                {estudiante.carnetInstitucional}
              </Text>
            </View>
            <View style={styles.studentRow}>
              <Text style={styles.studentLabel}>Sección y grupo</Text>
              <Text style={styles.studentValue}>
                {estudiante.fechaNacimiento}
              </Text>
            </View>
          </View>
        ) : (
          <>
            <Text style={layout.title}>
              {nombre ? `Hola, ${nombre}` : "Bienvenido"}
            </Text>
            <Text style={layout.subtitle}>
              Tus usuarios, todo en un solo lugar.
            </Text>
          </>
        )}
      </View>
      <View style={styles.overview}>
        <Text style={layout.eyebrow}>Tus usuarios</Text>
        <Text style={layout.sectionTitle}>Los mejores usuarios</Text>
        <Text style={layout.subtitle}>
          Registra un usuario y lleva el control de tu planilla.
        </Text>
        <Button title="Agregar usuario" onPress={goToAdd} />
      </View>
      <View style={styles.sectionRow}>
        <Text style={layout.sectionTitle}>Usuarios</Text>
      </View>
      {!!error && (
        <View style={styles.errorPanel}>
          <Message>{error}</Message>
          <Button title="Reintentar" variant="secondary" onPress={reintentar} />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardUsuarios
            id={item.id}
            nombre={item.nombre}
            fechaNacimiento={item.fechaNacimiento}
            carnetInstitucional={item.carnetInstitucional}
            urlImagen={item.urlImagen}
          />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={header}
        ListEmptyComponent={
          cargando ? (
            <View style={styles.empty} accessibilityLiveRegion="polite">
              <ActivityIndicator color={colors.primary} />
              <Text style={layout.subtitle}>Cargando tus usuarios</Text>
            </View>
          ) : !error ? (
            <View style={styles.empty}>
              <Text
                style={styles.emptySymbol}
                accessibilityElementsHidden
                importantForAccessibility="no"
              >
                ＋
              </Text>
              <Text style={layout.sectionTitle}>
                Tu inventario comienza aquí
              </Text>
              <Text style={styles.emptyText}>
                Agrega tu primer usuario para verlo en esta lista.
              </Text>
            </View>
          ) : null
        }
      />
      <MainMenu navigation={navigation} active="Home" disabled={saliendo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: {
    flexGrow: 1,
    padding: 20,
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
  },
  header: { gap: 24, marginBottom: 16 },
  topRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  brand: { fontSize: 17, fontWeight: "700", color: colors.primary },
  heading: {
    gap: 8,
    studentCard: { gap: 8 },
    studentRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 8,
    },
    studentLabel: { color: colors.muted, fontSize: 15 },
    studentValue: { color: colors.primary, fontSize: 15, fontWeight: "700" },
  },
  overview: {
    backgroundColor: colors.primarySoft,
    borderRadius: 24,
    padding: 24,
    gap: 14,
  },
  sectionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  count: { color: colors.muted, fontSize: 13 },
  empty: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 12,
  },
  emptySymbol: { fontSize: 32, color: colors.primary },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },
  errorPanel: { gap: 10 },
});

export default Home;
