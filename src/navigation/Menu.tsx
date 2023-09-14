import { routes_names } from "../routes/routes_names";
import { NewTournament } from "../screens/NewTournament";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

export const Menu = ({ navigation }) => {
  const Drawer = createDrawerNavigator();

  return <Drawer.Navigator initialRouteName={routes_names.home}>
    <Drawer.Screen name={routes_names.home} component={Menu} />
    <Drawer.Screen name={routes_names.tournament} component={NewTournament} />
  </Drawer.Navigator>;
};