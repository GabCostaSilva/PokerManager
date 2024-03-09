import {MyAlert} from "./MyAlert";

export const SuccessAlert = ({message, id}) => {
    return <MyAlert message={message} action="success" id={id}/>
}