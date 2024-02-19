import {Button, ButtonSpinner, ButtonText} from "@gluestack-ui/themed";
import React from "react";

export const ConfirmButton = ({onPress, isLoading = false, flex=0}) => {
    return <Button action={"positive"} onPress={onPress}
                   style={{flex: flex}}
                   disabled={false}>
        <ButtonText>Confirmar</ButtonText>
        {isLoading && <ButtonSpinner/>}
    </Button>

}