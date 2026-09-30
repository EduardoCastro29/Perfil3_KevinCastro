import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

const MainMenu = ({ navigation, active, disabled = false }) => (
  <View style={styles.bar}>
    <View style={styles.items} accessibilityRole="tablist">
      {[
        { route: "Home", label: "Inicio" },
        { route: "Planetas", label: "Planetas" },
      ].map(({ route, label }) => {
        const selected = active === route;
        return (
          <Pressable
            key={route}
            accessibilityRole="tab"
            accessibilityState={{ selected, disabled }}
            disabled={disabled || selected}
            onPress={() =>
              route === "Home" && navigation.canGoBack()
                ? navigation.goBack()
                : navigation.navigate(route)
            }
            style={({ pressed }) => [
              styles.item,
              selected && styles.selected,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.label, selected && styles.selectedLabel]}>
              {label}
            </Text>
            <View
              style={[styles.indicator, selected && styles.selectedIndicator]}
            />
          </Pressable>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: 10,
  },
  items: {
    flexDirection: "row",
    gap: 10,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
  item: {
    flex: 1,
    minHeight: 50,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    gap: 6,
  },
  selected: { backgroundColor: colors.primarySoft },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.muted,
    textAlign: "center",
  },
  selectedLabel: { color: colors.primary },
  indicator: {
    height: 3,
    width: 18,
    borderRadius: 2,
    backgroundColor: "transparent",
  },
  selectedIndicator: { backgroundColor: colors.primary },
  pressed: { opacity: 0.7 },
});

export default MainMenu;
