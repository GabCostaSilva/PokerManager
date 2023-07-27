import {Input} from "native-base";
import { onlyNumbers } from "../utils";

export const NumericInput = (props) => {
    return (
        <Input size={"2xl"} mb={5}  {...props} keyboardType={"numeric"} value={onlyNumbers(props.value).toString()} placeholder={"0"}/>
    );
};
