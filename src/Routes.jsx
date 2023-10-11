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
import {Icon} from "native-base";
import {FontAwesome} from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Routes = () => {
    const {isSignedIn} = useAuthContext();

    // @ts-ignore
    return isSignedIn
        ? <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === routes_names.home) {
                        iconName = 'home'
                    } else if (route.name === routes_names.tournament) {
                        iconName = 'trophy';
                    } else if (route.name === routes_names.profile) {
                        iconName = 'user'
                    }

                    // You can return any component that you like here!
                    return <Icon as={<FontAwesome name={iconName} size={24} color="black"/>}/>;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name={routes_names.home}
                        component={Home}
                        options={{headerShown: false}}
            />
            <Tab.Screen name={routes_names.tournament} component={NewTournament}                         options={{headerShown: false}}
            />
            <Tab.Screen name={routes_names.profile} component={Profile}                         options={{headerShown: false}}
            />
        </Tab.Navigator>
        : <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Cadastro"} component={SignUp}/>
        </Stack.Navigator>;
};
