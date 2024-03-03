import {JSX} from "react";
import {ErrorAlert} from "../components/alerts/ErrorAlert";
import {SuccessAlert} from "../components/alerts/SuccessAlert";

export const useShowToast = (toast) => {

    return function showToast(message: string, type: 'error' | 'success' = 'error') {
        toast.show({
            placement: "top",
            render: ({id}) => {
                const toastId = "toast-" + id;
                return type === 'error' ? <ErrorAlert message={message} id={toastId}
                    />
                    :
                    <SuccessAlert message={message}
                                  id={toastId}
                    />
            }
        })
    }
}
