import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Center, extendTheme, Heading, Icon, NativeBaseProvider, ScrollView, Text} from 'native-base';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useNavigationContainerRef} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from "./src/screens/Home";
import {AppBar} from './src/components/AppBar';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AntDesign} from "@expo/vector-icons";
import {getHeaderTitle} from '@react-navigation/elements';
import {NewTournament} from "./src/screens/NewTournament";
import Login from "./src/screens/Login";

const newColorTheme = {
    primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E'
    },
};

const theme = extendTheme({
    colors: newColorTheme,
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {
        const [logged, setLogged] = useState(false);
        const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`
        return (
            <NavigationContainer ref={navigationRef}>
                <NativeBaseProvider theme={theme}>
                    {!logged ? <Login setLogged={setLogged}/> :
                        <>
                            <AppBar navigation={navigationRef}/>

                            <Tab.Navigator
                                screenOptions={({route}) => ({
                                    header: ({navigation, route, options}) => {
                                        return <Heading size='md'
                                                        alignItems='center'
                                                        p='2'
                                                        bg={theme.colors.gray["100"]}>
                                        </Heading>
                                    },
                                    tabBarIcon: ({focused, color, size}) => {
                                        function getIcon(iconName, opacity) {
                                            return <Icon mb="1"
                                                         as={<AntDesign name={iconName}/>}
                                                         color="white"
                                                         size="sm"
                                                         opacity={opacity}/>;
                                        }

                                        if (route.name === 'Torneios') {
                                            return focused
                                                ? getIcon("Trophy", 1)
                                                : getIcon("Trophy", .5);
                                        } else if (route.name === 'Novo Torneio') {
                                            return focused
                                                ? getIcon("plus", 1)
                                                : getIcon("plus", .5);
                                        } else if (route.name === 'Clonar Torneio') {
                                            return focused
                                                ? getIcon("copy1", 1)
                                                : getIcon("copy1", .5);
                                        }
                                    },
                                    tabBarLabelStyle: {
                                        marginBottom: "5%"
                                    },
                                    tabBarActiveTintColor: 'white',
                                    tabBarInactiveTintColor: theme.colors.gray["400"],
                                    tabBarStyle: {
                                        position: 'absolute',
                                        padding: 10,
                                        alignSelf: "center",
                                        alignItems: "center",
                                        textColor: theme.colors.primary["50"],
                                        backgroundColor: theme.colors.primary["600"]
                                    }
                                })}>
                                <Tab.Screen name="Torneios" component={Home}/>
                                <Tab.Screen name="Novo Torneio" component={NewTournament}/>
                                <Tab.Screen name="Clonar Torneio" component={Home}/>
                            </Tab.Navigator>
                        </>}
                </NativeBaseProvider>
            </NavigationContainer>
        );
    }
;

export default App;
