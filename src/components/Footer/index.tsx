import {Box, Center, HStack, Icon, Pressable, Text} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import React from "react";
import {GestureResponderEvent, StyleSheet} from "react-native";

const OPTIONS = {
    0: "Home",
    1: "New Tournament",
    2: "Copy Tournaments"
}

export function Footer({navigation}) {
    const [selected, setSelected] = React.useState(1);

    const handlePress = (event: GestureResponderEvent, screenNum: number) => {
        event.preventDefault()
        setSelected(screenNum)
        navigation.navigate(OPTIONS[screenNum])
    }

    return <>
        <Box flex={1} bg="white" safeAreaTop width="100%" maxW="300px" alignSelf="center" style={styles.footer}>
            <HStack bg="primary.600" alignItems="center" safeAreaBottom shadow={6}>
                <Pressable cursor="pointer"
                           opacity={selected === 0 ? 1 : 0.5}
                           py="3"
                           flex={1}
                           onPress={(event) => handlePress(event, 0)}>
                    <Center>
                        <Icon mb="1" as={ <AntDesign name="Trophy" />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Torneios
                        </Text>
                    </Center>
                </Pressable>

                <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={(event) => handlePress(event, 1)}>
                    <Center>
                        <Icon mb="1" as={<AntDesign name="plus" />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Novo Torneio
                        </Text>
                    </Center>
                </Pressable>

                <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={(event) => handlePress(event, 2)}>
                    <Center>
                        <Icon mb="1" as={<AntDesign name="copy1" />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Clonar Torneio
                        </Text>
                    </Center>
                </Pressable>

            </HStack>
        </Box>
    </>;
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: '5%',
        padding: 10,
        alignSelf: "center"
    },
})