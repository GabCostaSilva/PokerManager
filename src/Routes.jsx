import {useAuthContext} from "./hooks/useAuthContext";
import {Home} from "./screens/Home";
import Login from "./screens/Login";
import {SignUp} from "./screens/SignUp";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {routes_names} from "./routes/routes_names";
import {NewTournament} from "./screens/NewTournament";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Profile} from "./screens/Profile/Profile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Routes = () => {
    const {isSignedIn} = useAuthContext();

    // @ts-ignore
    return isSignedIn
        ? <Tab.Navigator>
            <Tab.Screen name={routes_names.home} component={Home}/>
            <Tab.Screen name={routes_names.tournament} component={NewTournament}/>
            <Tab.Screen name={routes_names.profile} component={Profile}/>
        </Tab.Navigator>
        : <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Cadastro"} component={SignUp}/>
        </Stack.Navigator>;
};
