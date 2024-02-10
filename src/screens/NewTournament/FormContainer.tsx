import {Center, Container} from "native-base";
import React from "react";
import {routes_names} from "../../routes/routes_names";
import {Button, ButtonGroup, ButtonText} from "@gluestack-ui/themed";
import {useNavigation} from "@react-navigation/native";

export default ({onPressNextPage, children}) => {
    const navigation: any = useNavigation();
    return <Center mt={8}>
        <Container alignItems={"center"} mb={4}>
            {children}
        </Container>
        <ButtonGroup>
            <Button variant={"outline"} action={"secondary"} size="md" minWidth={64}
                    onPress={() => {
                        navigation.reset({
                            routes: [{name: routes_names.home}]
                        })
                    }}>
                <ButtonText>
                    Cancelar
                </ButtonText>
            </Button>
            <Button
                onPress={onPressNextPage}
                minWidth={64}
                variant="outline">
                <ButtonText>
                    Próximo
                </ButtonText>
            </Button>
        </ButtonGroup>
    </Center>;
}