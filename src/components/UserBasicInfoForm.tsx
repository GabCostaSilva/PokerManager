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
                isDisabled={emailDisabled}
                errors={errors.email}
                onChangeText={(email: string) => setState(prevState => (
                    {...prevState, email}))
                }
            />
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Telefone para contato
                </FormControlLabelText>
            </FormControlLabel>
            <PhoneInput
                value={state.phoneNumber}
                errors={errors.phoneNumber}
                onChangeText={(phoneNumber: string) => setState(prevState => ({
                        ...prevState, phoneNumber
                    })
                )}
            />
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Nome completo
                </FormControlLabelText>
            </FormControlLabel>
            <TextInput
                value={state.name}
                errors={errors.name}
                onChangeText={(name: string) => setState(prevState => (
                    {...prevState, name}))
                }
            />
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Nome de usuário
                </FormControlLabelText>
            </FormControlLabel>
            <TextInput
                value={state.userName}
                errors={errors.userName}
                onChangeText={(userName: string) => setState(prevState => (
                    {...prevState, userName}
                ))}
            />
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    CPF
                </FormControlLabelText>
            </FormControlLabel>
            <CpfInput
                value={state.docNumber}
                errors={errors.docNumber}
                onChangeText={(docNumber: string) => setState(prevState => (
                    {...prevState, docNumber}
                ))}
            />
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
                errors={errors.bank}
                onChangeText={(bank: string) => setState(prevState => (
                    {...prevState, bank}
                ))}
            />
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Agência
                </FormControlLabelText>
            </FormControlLabel>
            <TextInput
                value={state.bankAgency}
                errors={errors.bankAgency}
                onChangeText={(bankAgency: string) => setState(prevState => (
                    {...prevState, bankAgency}
                ))}
            />
        </FormControl>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>
                    Conta
                </FormControlLabelText>
            </FormControlLabel>
            <TextInput
                value={state.bankAccountNumber}
                errors={errors.bankAccountNumber}
                onChangeText={(bankAccountNumber: string) => setState(prevState => (
                    {...prevState, bankAccountNumber}
                ))}
            />
        </FormControl>
        {children}
    </VStack>
}