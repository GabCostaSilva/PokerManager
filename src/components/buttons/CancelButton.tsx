import {Button, ButtonText} from "@gluestack-ui/themed";
import React from "react";

export const CancelButton = ({onPress}) => {

    return  <Button action={"negative"}
                    variant={"outline"}
                    onPress={onPress}>
        <ButtonText>Cancelar</ButtonText>
    </Button>
}