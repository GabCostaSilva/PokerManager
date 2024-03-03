import {MyAlert} from "./MyAlert";

export const SuccessAlert = ({message, id: string}) => {
    return <MyAlert message={message} action="success" id={id}/>
}