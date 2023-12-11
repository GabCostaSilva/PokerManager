import {Alert, AlertIcon, AlertText} from "@gluestack-ui/themed"
import {ErrorIcon} from "@gluestack-ui/themed/build/components/FormControl/styled-components";

interface AlertProps {
    message: string
}

export const ErrorAlert = ({message}: AlertProps) => {

    return <Alert mx="$2.5" action="error" variant="solid">
        <AlertIcon as={ErrorIcon} mr="$3"/>
        <AlertText>
            {message}
        </AlertText>
    </Alert>
}