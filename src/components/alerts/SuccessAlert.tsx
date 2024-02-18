import {MyAlert} from "./MyAlert";

const SuccessAlert = ({message}) => {
    return <MyAlert message={message} action="success" id={Date.now().toString()}/>
}