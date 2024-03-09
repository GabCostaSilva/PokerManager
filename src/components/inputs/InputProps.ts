export interface InputProps {
    value: string,
    errors?: string[],
    isDisabled?: boolean,
    handleBlur?: () => void,
    onChangeText: (value: string) => void
}