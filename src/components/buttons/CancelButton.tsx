import {Button, ButtonText} from "@gluestack-ui/themed";
import React from "react";

export const CancelButton = ({onPress, flex = 0}) => {

    return <Button action={"negative"}
                   variant={"outline"}
                   style={{flex: flex}}
                   onPress={onPress}>
        <ButtonText>Cancelar</ButtonText>
    </Button>
}