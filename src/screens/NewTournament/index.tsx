import {Button, Center, Heading, HStack, Text} from "native-base";
import React from "react";
import {FormField} from "../../components/Form/FormField";
import {Formiz, FormizStep, useForm,} from '@formiz/core'
import {View} from "react-native";
import {Chips} from "./Chips/Chips";
import MyCenter from "../../components/MyCenter";

export function NewTournament({navigation}) {
    let formValues = useForm();

    const [formData, setData] = React.useState({
        name: '',
        initialStack: 0,
        chips: []
    });
    const [errors, setErrors] = React.useState({});

    const validate = () => {
        if (formData.name === undefined) {
            setErrors({
                ...errors,
                name: 'Name is required'
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
        validate()
            ? console.log('Submitted. Data: ' + JSON.stringify(formData))
            : alert('Validation Failed. Data: ' + formData);
    };

    return (
        <Formiz
            connect={formValues}
            onValidSubmit={onSubmit}
        >
            <FormizStep name={"step1"} as={View}>
                <CenterForm>
                    <FormField label={'Nome do torneio'}
                               placeholder={"Torneio 1"}
                               setData={setData}
                               name="name"
                               value={formData.name}
                               formData={formData}
                               errors={errors}/>
                </CenterForm>
            </FormizStep>
            <FormizStep name={"step2"} as={View}>
                <CenterForm>

                    <FormField label={"Stack Inicial"}
                               placeholder={"0"}
                               name="initialStack"
                               setData={setData}
                               value={formData.initialStack}
                               formData={formData}
                               errors={errors}/>
                </CenterForm>
            </FormizStep>
            <FormizStep name='step3' as={View}>
                <CenterForm>
                    <Chips errors={errors}
                           setData={setData}
                           formData={formData}
                    />
                </CenterForm>
            </FormizStep>
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
        </Formiz>);
}

const CenterForm = ({children}) => {
    return (<View style={{alignItems: "center", paddingTop: "5%", marginBottom: "5%"}}>
        {children}
    </View>)
}
