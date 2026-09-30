import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import usePlanetas from "../hooks/usePlanetas";
import MainMenu from "../components/MainMenu";
import { Button, Message } from "../components/UI";
import { colors, layout } from "../theme";

const Planetas = ({ navigation }) => {
  const { planetas, cargando, error, reintentar } = usePlanetas();

  const header = (
    <View style={styles.header}>
      <View style={styles.heading}>
        <Text style={layout.eyebrow}>Dragon Ball</Text>
        <Text style={layout.title}>Planetas</Text>
        <Text style={layout.subtitle}>
          Conoce los planetas del universo de Dragon Ball.
        </Text>
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
        data={planetas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.cardName}>{item.name}</Text>
              <View
                style={[
                  styles.badge,
                  item.isDestroyed ? styles.badgeDestroyed : styles.badgeAlive,
                ]}
              >
                <Text style={styles.badgeText}>
                  {item.isDestroyed ? "Destruido" : "Intacto"}
                </Text>
              </View>
            </View>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={header}
        ListEmptyComponent={
          cargando ? (
            <View style={styles.empty} accessibilityLiveRegion="polite">
              <ActivityIndicator color={colors.primary} />
              <Text style={layout.subtitle}>Cargando planetas</Text>
            </View>
          ) : !error ? (
            <View style={styles.empty}>
              <Text style={layout.sectionTitle}>No hay planetas</Text>
              <Text style={styles.emptyText}>
                No se encontraron planetas para mostrar.
              </Text>
            </View>
          ) : null
        }
      />
      <MainMenu navigation={navigation} active="Planetas" />
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
    gap: 12,
  },
  header: { gap: 24, marginBottom: 16 },
  heading: { gap: 8 },
  errorPanel: { gap: 10 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  cardTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cardName: { fontSize: 18, fontWeight: "700", color: colors.primary },
  badge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  badgeDestroyed: { backgroundColor: "#C0392B" },
  badgeAlive: { backgroundColor: "#27AE60" },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  cardDescription: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  empty: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },
});

export default Planetas;