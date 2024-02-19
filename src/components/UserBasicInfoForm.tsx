import {FormControl, FormControlLabel, FormControlLabelText, VStack} from "@gluestack-ui/themed";
import TextInput from "./TextInput";
import {PhoneInput} from "./inputs/PhoneInput";
import {CpfInput} from "./inputs/CpfInput";
import React from "react";

export const UserBasicInfoForm = ({state, setState, children, emailDisabled = false}) => {
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
                onChangeText={(phoneNumber: string) => setState(prevState => (
                    {...prevState, phoneNumber}))
                }
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
                value={state.username}
                onChangeText={(username: string) => setState(prevState => (
                    {...prevState, username}
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
            <TextInput
                value={state.pix}
                onChangeText={(pix: string) => setState(prevState => (
                    {...prevState, pix}
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
                onChangeText={(bankAccountNumber: string) => setState(prevState => (
                    {...prevState, bankAccountNumber}
                ))}
            />
        </FormControl>
        {children}
    </VStack>
}