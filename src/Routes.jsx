import {useAuthContext} from "./hooks/useAuthContext";
import {Home} from "./screens/Home";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {routes_names} from "./routes/routes_names";
import {NewTournament} from "./screens/NewTournament";
import {Profile} from "./screens/Profile";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon, useTheme} from "native-base";
import {FontAwesome} from '@expo/vector-icons';
import PasswordRecovery from "./screens/Auth/PasswordRecovery";
import {SignUp} from "./screens/Auth/SignUp";
import Login from "./screens/Auth/Login";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Routes = () => {
    const {isSignedIn} = useAuthContext();
    const {
        colors
    } = useTheme();

    return isSignedIn
        ? <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarActiveTintColor: "#059669",
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name={routes_names.home}
                        component={Home}
                        options={{
                            headerShown: false,
                            tabBarIcon: () => <Icon as={<FontAwesome name="home" size={24}/>}/>
                        }}
            />
            <Tab.Screen name={routes_names.tournament}
                        component={NewTournament}
                        options={{
                            headerShown: false,
                            tabBarIcon: () => <Icon as={<FontAwesome name="trophy" size={24}/>}/>
                        }}
            />
            <Tab.Screen name={routes_names.profile}
                        component={Profile}
                        options={{
                            headerShown: false,
                            tabBarIcon: () => <Icon as={<FontAwesome name="user" size={24}/>}/>
                        }}
            />
        </Tab.Navigator>
        : <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Recuperar Senha"} component={PasswordRecovery}/>
            <Stack.Screen name={"Cadastro"} component={SignUp}/>
        </Stack.Navigator>;
};
