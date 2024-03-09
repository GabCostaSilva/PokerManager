import {AlertProps} from "./AlertProps";
import {Toast, ToastDescription, ToastTitle, VStack} from "@gluestack-ui/themed";

export const MyAlert = (props: AlertProps) => {
    console.log("MyAlert", props)
    const getTitle = () => {
        switch (props.action) {
            case "error":
                return "Erro"
            case "warning":
                return "Aviso"
            case "success":
                return "Sucesso"
            case "info":
                return "Notificação"
            default:
                return "Aviso"
        }
    }

    return <Toast nativeID={props.id}
                  action={props.action}
                  variant="accent">
        <VStack space="xs">
            <ToastTitle>{getTitle()}</ToastTitle>
            <ToastDescription>
                {props.message}
            </ToastDescription>
        </VStack>
    </Toast>
}
