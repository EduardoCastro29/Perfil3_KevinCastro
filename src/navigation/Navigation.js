import { ActivityIndicator, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/Home";
import Add from "../screens/Add";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme";
import Planetas from "../screens/Planetas";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {usuario ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "Home" }}
            />
            <Stack.Screen
              name="Add"
              component={Add}
              options={{ presentation: "modal", title: "Agregar usuarios" }}
            />
            <Stack.Screen
              name="Planetas"
              component={Planetas}
              options={{ title: "Planetas" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Iniciar sesión" }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "Crear cuenta" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
