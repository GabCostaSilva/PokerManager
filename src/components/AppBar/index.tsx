import {Box, HStack, Icon, IconButton, StatusBar, Text} from "native-base";
import {AntDesign, Feather, MaterialCommunityIcons} from "@expo/vector-icons";
import React, {useEffect, useRef, useState} from "react";

export function AppBar({navigation}) {
    const statusBarRef = useRef(null);
    const [currentRoute, setCurrentRoute] = useState("Poker Manager");
    useEffect(() => {
        function getPageTitle() {
            return navigation
                ? (navigation.getCurrentRoute() ? navigation.getCurrentRoute().name : "Poker Manager")
                : "Poker Manager"
        }

        setCurrentRoute(getPageTitle())
    })
    function getPageTitle() {
        console.log(navigation.getCurrentRoute().name)
        return navigation
            ? (navigation.getCurrentRoute() ? navigation.getCurrentRoute().name : "Poker Manager")
            : "Poker Manager"
    }

    return <>
        <StatusBar bg="#4527A0" barStyle="light-content" ref={statusBarRef}/>
        <Box safeAreaTop bg="primary.700"/>
        <HStack bg="primary.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
            <HStack alignItems="center">
                <IconButton
                    icon={<Icon as={<MaterialCommunityIcons name="poker-chip"/>} size={5} ml="2" color="white"/>}/>
                <Text color="white" fontSize="20" fontWeight="bold">
                    {currentRoute}
                </Text>
            </HStack>
            <HStack>
                {/*<IconButton icon={<Icon as={<Feather name="star"/>} size={5} ml="2" color="white"/>} />*/}
                <IconButton icon={<Icon as={<AntDesign name="search1"/>} size={5} ml="2" color="white"/>}/>
                <IconButton icon={<Icon as={<Feather name="more-vertical"/>} size={5} ml="2" color="white"/>}/>
            </HStack>
        </HStack>
    </>;
}
