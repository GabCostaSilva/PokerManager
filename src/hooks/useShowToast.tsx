import {Toast, ToastDescription, ToastTitle, useToast, VStack} from "@gluestack-ui/themed";

export const useShowToast = () => {
    const toast = useToast()

    return function showToast(message: string, type: 'error' | 'success' = 'error') {
        const title = {
            error: "Erro",
            warning: "Aviso",
            success: "Sucesso",
            info: "Notificação"
        }
        toast.show({
            placement: "top",
            render: ({id}) => {
                const toastId = "toast-" + id;
                return (
                    <Toast nativeID={toastId}
                           action={type}
                           variant="accent">
                        <VStack space="xs">
                            <ToastTitle>{title[type]}</ToastTitle>
                            <ToastDescription>
                                {message}
                            </ToastDescription>
                        </VStack>
                    </Toast>
                )
            }
        })
    }
}
