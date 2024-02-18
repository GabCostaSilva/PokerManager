import {Button, ButtonSpinner, ButtonText} from "@gluestack-ui/themed";
import React from "react";

export const ConfirmButton = ({onPress, isLoading = false}) => {
    return <Button action={"positive"} onPress={onPress}
                   disabled={false}>
        <ButtonText>Confirmar</ButtonText>
        {isLoading && <ButtonSpinner/>}
    </Button>

}