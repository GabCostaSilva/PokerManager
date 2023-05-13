import {Feather} from '@expo/vector-icons';
import React, {useState} from 'react';
import {Container, IconContainer, InputText} from './styles';
import {View} from "react-native";

export function Input({icon, value=undefined, ...rest}) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value)
    }

    return (
        <View className="flex flex-row">
            <IconContainer isFocused={isFocused}>
                <Feather
                    name={icon}
                    size={24}
                    color={(isFocused || isFilled) ? '#DC1637' : '#AEAEB3'}
                />
            </IconContainer>

            <InputText
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isFocused={isFocused}
                value={value}
                {...rest}
            />
        </View>
    );
}
