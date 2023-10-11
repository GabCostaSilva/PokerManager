import React from "react";
import {Box, extendTheme, NativeBaseProvider} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthContextProvider} from "./src/contexts/AuthContext";
import {routes_names} from "./src/routes/routes_names";
import {Routes} from "./src/Routes";
import {GluestackUIProvider} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"

import 'expo-dev-client';

const newColorTheme = {
  primary: {
    50: "#E3F2F9",
    100: "#C5E4F3",
    200: "#A2D4EC",
    300: "#7AC1E4",
    400: "#47A9DA",
    500: "#0088CC",
    600: "#007AB8",
    700: "#006BA1",
    800: "#005885",
    900: "#003F5E"
  }
};

const theme = extendTheme({
  colors: newColorTheme
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <NativeBaseProvider theme={theme}>
          <GluestackUIProvider config={config}>
            <Box safeAreaTop bg="blueGray.300" />
            <Stack.Navigator initialRouteName={routes_names.login} screenOptions={{ headerShown: false }}>
              <Stack.Screen component={Routes} name={"Root"} />
            </Stack.Navigator>
          </GluestackUIProvider>
        </NativeBaseProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default App;
