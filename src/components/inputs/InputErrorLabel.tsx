import {AlertCircleIcon, FormControlLabel, FormControlErrorIcon, FormControlErrorText} from "@gluestack-ui/themed";

export const InputErrorLabel = ({error}: { error: string }) => {
    return <FormControlLabel>
        <FormControlErrorIcon as={AlertCircleIcon}/>
        <FormControlErrorText>
            {error}
        </FormControlErrorText>
    </FormControlLabel>
}