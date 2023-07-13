import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Box, extendTheme, NativeBaseProvider} from 'native-base';
import {NavigationContainer, useNavigationContainerRef} from "@react-navigation/native";
import Login from "./src/screens/Login";
import {Home} from "./src/screens/Home";
import {NewTournament} from "./src/screens/NewTournament";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {EditTourney} from "./src/screens/EditTourney";

const routeNames = {
    home: "Início",
    new_tournament: "Novo Torneio",
    edit_tourney: "Editar Torneio"
}

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
                                <Drawer.Navigator initialRouteName={routeNames.home}>
                                    <Drawer.Screen name={routeNames.home} component={Home}/>
                                    <Drawer.Screen name={routeNames.new_tournament} component={NewTournament}/>
                                    <Drawer.Screen name={routeNames.edit_tourney} component={EditTourney}/>
                                </Drawer.Navigator>
                        </>}
                </NativeBaseProvider>
            </NavigationContainer>
        );
    }
;

export default App;
