import {Box, Button, Center, FormControl, HStack, Input, ScrollView, Text, VStack} from "native-base";
import {Chips} from "../Chips/Chips";
import React from "react";
import {useForm} from "@formiz/core";

const FIrstStep = () => {
    let formValues = useForm();

    const [formData, setData] = React.useState({
        name: '',
        initialStack: "0",
        chips: []
    });
    const [errors, setErrors] = React.useState({});

    const validate = () => {
        if (formData.name === undefined) {
            setErrors({
                ...errors,
                name: 'É obrigatório ter um nome para o campeonato.'
            });
            return false;
        } else if (formData.name.length < 3) {
            setErrors({
                ...errors,
                name: 'Name is too short'
            });
            return false;
        }

        return true;
    };

    const onSubmit = () => {
        console.log(JSON.stringify(formData))
        validate()
            ? console.log('Submitted. Data: ' + JSON.stringify(formData))
            : console.log('Validation Failed. Data: ' + JSON.stringify(errors));
    };

    function handleChange(target, value) {
        setData({...formData, [target]: value});
        console.log(formData)
    }

    function getNumber(value: string) {
        return parseInt(value.replace(/[^0-9]/g, ''));
    }
    const FormContainer = ({children}) => {
        return <Box safeArea maxW="290">{children}</Box>
    }

    return (<ScrollView>
        <Center w="100%">
            <FormContainer>
                <VStack space={5}>
                    <FormControl>
                        <FormControl.Label _text={{bold: true}}>{'Nome do torneio'}</FormControl.Label>
                        <Input
                            size="lg"
                            value={formData.name}
                            placeholder={"Torneio 1"}
                            onChangeText={value => handleChange("name", value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{bold: true}}>{"Stack Inicial"}</FormControl.Label>
                        <Input
                            size="lg"
                            value={formData.initialStack} placeholder={"0"}
                            onChangeText={value => handleChange("initialStack", getNumber(value))}/>
                    </FormControl>
                    <Chips errors={errors}
                           setData={setData}
                           formData={formData}
                    />
                    <HStack justifyContent='center' space='md'>
                        {!formValues.isFirstStep && (
                            <Button onPress={formValues.prevStep} variant="outline">
                                <Text>
                                    Voltar
                                </Text>
                            </Button>
                        )}
                        {formValues.isLastStep ? (
                            <Button disabled={!formValues.isValid} onPress={onSubmit}>
                                <Text color="white">
                                    Enviar
                                </Text>
                            </Button>
                        ) : (
                            <Button disabled={!formValues.isStepValid} onPress={formValues.nextStep}>
                                <Text color="white">
                                    Próximo
                                </Text>
                            </Button>
                        )}
                    </HStack>
                </VStack>
            </FormContainer>
        </Center>
    </ScrollView>)
}