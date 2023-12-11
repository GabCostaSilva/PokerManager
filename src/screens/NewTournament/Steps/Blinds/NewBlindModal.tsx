import React, {useState} from "react";
import {Modal} from "native-base";
import NewBlind from "./NewBlind";
import {Button, ButtonGroup, ButtonText} from "@gluestack-ui/themed";
import NewPause from "./NewPause";

export default function NewBlindModal(props: {
    onClose: () => void,
    initialFocusRef: React.MutableRefObject<null>,
    finalFocusRef: React.MutableRefObject<null>,
    open: boolean,
    modalVisible: (value: (((prevState: boolean) => boolean) | boolean)) => void
}) {
    const [newBlind, setNewBlind] = useState(false);
    const [newPause, setNewPause] = useState(false);

    const newBlindForm = <Modal.Content>
        <Modal.Header>Novo Blind</Modal.Header>
        <Modal.CloseButton/>
        <Modal.Body>
            <NewBlind setModalVisible={props.modalVisible}/>
        </Modal.Body>
    </Modal.Content>;

    const newPauseForm = <Modal.Content>
        <Modal.Header>Novo Intervalo</Modal.Header>
        <Modal.CloseButton/>
        <Modal.Body>
            <NewPause setModalVisible={props.modalVisible}/>
        </Modal.Body>
    </Modal.Content>

    const openNewBlind = () => {
        setNewPause(false)
        setNewBlind(true)
    };

    const openNewPause = () => {
        setNewPause(true)
        setNewBlind(false)
    };

    return <Modal onClose={props.onClose}
                  initialFocusRef={props.initialFocusRef}
                  finalFocusRef={props.finalFocusRef}
                  isOpen={props.open}
                  safeAreaTop={true}>
        <ButtonGroup space={"xl"} direction={"column"}>
            <Button size={"md"} onPress={openNewBlind} my={4}>
                <ButtonText>Novo blind</ButtonText>
            </Button>
            <Button size={"md"} onPress={openNewPause} my={4}>
                <ButtonText>Nova pausa</ButtonText>
            </Button>
        </ButtonGroup>

        {newBlind ? newBlindForm : newPause ? newPauseForm : null}
    </Modal>;
}