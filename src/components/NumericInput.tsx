import {Input} from "native-base";

export const NumericInput = (props) => {
    return (
        <Input {...props} keyboardType={"numeric"}/>
    );
};
