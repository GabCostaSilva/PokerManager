export interface InputProps {
    value: string,
    isInvalid?: boolean,
    isDisabled?: boolean,
    handleBlur?: () => void,
    onChangeText: (value: string) => void
}