import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Box, extendTheme, NativeBaseProvider} from 'native-base';
import {NavigationContainer, useNavigationContainerRef} from "@react-navigation/native";
import Login from "./src/screens/Login";
import {Home} from "./src/screens/Home";
import {NewTournament} from "./src/screens/NewTournament";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {EditTourney} from "./src/screens/EditTourney";
import {routes} from "./src/routes";

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

const Drawer = createDrawerNavigator();

const App = () => {
        const [logged, setLogged] = useState(false);
        const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`
        return (
            <NavigationContainer ref={navigationRef}>
                <NativeBaseProvider theme={theme}>
                    <Box safeAreaTop bg="primary.400"/>
                    {!logged ? <Login setLogged={setLogged}/> :
                        <>
                                <Drawer.Navigator initialRouteName={routes.home}>
                                    <Drawer.Screen name={routes.home} component={Home}/>
                                    <Drawer.Screen name={routes.tournament} component={NewTournament}/>
                                    <Drawer.Screen name={routes.edit_tourney} component={EditTourney}/>
                                </Drawer.Navigator>
                        </>}
                </NativeBaseProvider>
            </NavigationContainer>
        );
    }
;

export default App;
