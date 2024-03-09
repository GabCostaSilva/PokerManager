import {
    ChevronDownIcon,
    SelectBackdrop,
    SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper,
    SelectIcon, SelectInput, SelectItem, Select,
    SelectPortal,
    SelectTrigger,
    Icon
} from "@gluestack-ui/themed";

type MySelectProps = {
    options: { label: string, value: string, isDisabled?: boolean }[],
    isInvalid?: boolean,
    handleChange: (arg: string) => void
}

export const MySelect = ({ options, isInvalid, handleChange }: MySelectProps) => {
    return <Select isInvalid={isInvalid} onValueChange={handleChange}>
        <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Selecione um opção: "/>
            <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon}/>
            </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
            <SelectBackdrop/>
            <SelectContent>
                <SelectDragIndicatorWrapper>
                    <SelectDragIndicator/>
                </SelectDragIndicatorWrapper>
                {options.map(option => (
                        <SelectItem label={option.label} value={option.value} isDisabled={option.isDisabled} key={option.value}/>
                    )
                )}
            </SelectContent>
        </SelectPortal>
    </Select>
}