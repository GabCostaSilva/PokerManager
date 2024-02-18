import {MyAlert} from "./MyAlert";

export const ErrorAlert = ({message, id = Date.now().toString()}) => {
    return <MyAlert message={message} action="error" id={id}/>
}
