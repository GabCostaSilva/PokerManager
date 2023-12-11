import {Button, ButtonSpinner, ButtonText} from "@gluestack-ui/themed";

export const LoadingButton = () => {
    return <Button isDisabled={true} bg="$darkBlue600" p="$3">
        <ButtonSpinner mr="$1"/>
        <ButtonText fontWeight="$medium" fontSize="$sm">
            Aguarde, por favor...
        </ButtonText>
    </Button>
}