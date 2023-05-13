import {Radio, Stack} from "native-base";
import React, {useState} from "react";

const colors = [
    {
        name: "Vermelho",
        value: "#ef4444",
        scheme: "red"
    },
    {
        name: "Azul Claro",
        value: "#0ea5e9",
        scheme: "lightBlue"
    },
    {
        name: "Amarelo",
        value: "#fde047",
        scheme: "yellow"
    },
    {
        name: "Verde",
        value: "#22c55e",
        scheme: "green"
    },
    {
        name: "Laranja",
        value: "#f97316",
        scheme: "orange"
    },
    {
        name: "Preto",
        value: "#000000",
        scheme: "black"
    },
    {
        name: "Rosa",
        value: "#f472b6",
        scheme: "rose"
    },
    {
        name: "Roxo",
        value: "#c084fc",
        scheme: "purple"
    },
    {
        name: "Azul",
        value: "#1a91ff",
        scheme: "blue"
    },
    {
        name: "Cinza",
        value: "#a8a29e",
        scheme: "trueGray"
    },
    {
        name: "Marrom",
        value: "#713f12",
        scheme: "amber"
    },
    {
        name: "Cinza Claro",
        value: "#d6d3d1",
        scheme: "light"
    },
    {
        name: "Ciano",
        value: "#22d3ee",
        scheme: "cyan"
    },
]
const Picker = ({setData, formData}) => {
    const [selectedColor, setSelectedColor] = useState("#ef4444");
    return <Stack
        flexWrap={"wrap"}
        direction={{
            base: "row",
        }}
        alignItems={{
            base: "flex-start",
            md: "center"
        }}
        justifyContent={"flex-start"}
        space={4} w="75%" maxW="300px">
        <Radio.Group name="coresDeFicha"
                     defaultValue="#ef4444"
                     value={selectedColor}
                     accessibilityLabel="escolha uma cor"
                     onChange={color => {
                         setData({...formData, color: color})
                         setSelectedColor(color)
                     }}
        >
            {colors.map(color => (
                <Radio value={color.value}
                       colorScheme={color.scheme}
                       size="lg"
                       my={1}
                >
                    {color.name}
                </Radio>
            ))}
        </Radio.Group>
    </Stack>
};
export default Picker
