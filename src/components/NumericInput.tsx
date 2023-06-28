import {Input} from "native-base";

export const NumericInput = (props) => {
    return (
        <Input size={"2xl"} {...props} keyboardType={"numeric"}/>
    );
};
