import {
    AlertCircleIcon,
    FormControl,
    FormControlError,
    FormControlErrorIcon, FormControlErrorText,
    FormControlLabel,
    FormControlLabelText,
    VStack
} from "@gluestack-ui/themed";
import TextInput from "./TextInput";
import {PhoneInput} from "./inputs/PhoneInput";
import {CpfInput} from "./inputs/CpfInput";
import React from "react";
import {MySelect} from "./inputs/MySelect";
import {InputErrorLabel} from "./inputs/InputErrorLabel";


export const UserBasicInfoForm = ({
                                      state,
                                      setState,
                                      errors,
                                      children,
                                      emailDisabled = false
                                  }) => {
    return <VStack space={"md"}>
        <FormControl isDisabled={emailDisabled}>
            <FormControlLabel>
                <FormControlLabelText>
                    Email
                </FormControlLabelText>
            </FormControlLabel>
            <TextInput
                value={state.email}
                isInvalid={"email" in errors}
                isDisabled={emailDisabled}
                onChangeText={(email: string) => setState(prevState => (
                    {...prevState, email}))
                }
            />
            {errors.email && <InputErrorLabel error={errors.email}/>}
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Telefone para contato
                </FormControlLabelText>
            </FormControlLabel>
            <PhoneInput
                value={state.phoneNumber}
                isInvalid={"phoneNumber" in errors}
                onChangeText={(phoneNumber: string) => setState(prevState => ({
                        ...prevState, phoneNumber
                    })
                )}
            />
            {errors.phoneNumber && <InputErrorLabel error={errors.phoneNumber}/>}
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Nome completo
                </FormControlLabelText>
            </FormControlLabel>
            <TextInput
                value={state.name}
                isInvalid={"name" in errors}
                onChangeText={(name: string) => setState(prevState => (
                    {...prevState, name}))
                }
            />
            {errors.name && <InputErrorLabel error={errors.name}/>}
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Nome de usuário
                </FormControlLabelText>
            </FormControlLabel>
            <TextInput
                value={state.username}
                isInvalid={"username" in errors}
                onChangeText={(username: string) => setState(prevState => (
                    {...prevState, username}
                ))}
            />
            {errors.username && <InputErrorLabel error={errors.username}/>}
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    CPF
                </FormControlLabelText>
            </FormControlLabel>
            <CpfInput
                value={state.docNumber}
                isInvalid={"docNumber" in errors}
                onChangeText={(docNumber: string) => setState(prevState => (
                    {...prevState, docNumber}
                ))}
            />
            {errors.docNumber && <InputErrorLabel error={errors.docNumber}/>}
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Pix
                </FormControlLabelText>
            </FormControlLabel>
            <MySelect
                options={[
                    {label: "CPF", value: "CPF"},
                    {label: "Telefone", value: "Telefone"},
                    {label: "Email", value: "Email"},
                    {label: "Chave aleatória", value: "Chave aleatória"}
                ]}
                handleChange={(pixKey: string) => setState(prevState => (
                    {...prevState, pix: pixKey}
                ))}
            />
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Banco
                </FormControlLabelText>
            </FormControlLabel>
            <TextInput
                value={state.bank}
                isInvalid={"bank" in errors}
                onChangeText={(bank: string) => setState(prevState => (
                    {...prevState, bank}
                ))}
            />
            {errors.bank && <InputErrorLabel error={errors.bank}/>}
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Agência
                </FormControlLabelText>
            </FormControlLabel>
            <TextInput
                value={state.bankAgency}
                isInvalid={"bankAgency" in errors}
                onChangeText={(bankAgency: string) => setState(prevState => (
                    {...prevState, bankAgency}
                ))}
            />
            {errors.bankAgency && <InputErrorLabel error={errors.bankAgency}/>}
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Conta
                </FormControlLabelText>
            </FormControlLabel>
            <TextInput
                value={state.bankAccountNumber}
                isInvalid={"bankAccountNumber" in errors}
                onChangeText={(bankAccountNumber: string) => setState(prevState => (
                    {...prevState, bankAccountNumber}
                ))}
            />
            {errors.bankAccountNumber && <InputErrorLabel error={errors.bankAccountNumber}/>}
        </FormControl>
        {children}
    </VStack>
}