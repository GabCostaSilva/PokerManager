import TextInput from "../TextInput";
import {getPhoneMasked} from "../../utils/utils";

interface PhoneInputProps {
    value: string,
    onChangeText: (value: (((prevState: string) => string) | string)) => void
}

export const PhoneInput = ({value, onChangeText}: PhoneInputProps) => {
    console.log("value", value)
    console.log("onChangeText", onChangeText)
    return <TextInput
        onChangeText={onChangeText}
        value={getPhoneMasked(value)}
    />
}
