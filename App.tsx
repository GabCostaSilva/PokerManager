import React from "react";
import {Box, extendTheme, NativeBaseProvider} from "native-base";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthContextProvider} from "./src/contexts/AuthContext";
import {routes_names} from "./src/routes/routes_names";
import {Routes} from "./src/Routes";
import {GluestackUIProvider} from "@gluestack-ui/themed";
import {config} from "@gluestack-ui/config"

import 'expo-dev-client';

const newColorTheme = {
    primary: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d"
    }
};

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};

const theme = extendTheme({
    colors: newColorTheme,
});

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer theme={navTheme}>
            <AuthContextProvider>
                <NativeBaseProvider theme={theme}>
                    <GluestackUIProvider config={config}>
                        <Box safeAreaTop bg="primary.900"/>
                        <Stack.Navigator initialRouteName={routes_names.login}
                                         screenOptions={{
                                             headerShown: false
                                         }}>
                            <Stack.Screen component={Routes} name={"Root"}/>
                        </Stack.Navigator>
                    </GluestackUIProvider>
                </NativeBaseProvider>
            </AuthContextProvider>
        </NavigationContainer>
    );
};

export default App;
