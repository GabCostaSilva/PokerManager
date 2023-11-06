import TextInput from "../TextInput";

const PhoneInput = (value: any, onChangeText: any) => {

    function getMasked(value: string): string {
        value.replace(/\D/g, "")
        return value;
    }

    return <TextInput
        onChangeText={onChangeText}
        value={getMasked(value)}
        placeholder={"+00 (00) 00000-0000"}
    />
}
