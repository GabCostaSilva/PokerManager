import {CloseIcon, Modal} from "native-base";
import {
    Button, ButtonText,
    Heading,
    Text,
    Icon,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader, Center
} from "@gluestack-ui/themed";
import React, {useState} from "react";

export default function CustomModal(){
    const [showModal, setShowModal] = useState(false);
    console.log(showModal);
    const ref = React.useRef(null);
    return (
        <Center h={300}>
            <Button onPress={() => setShowModal(true)} ref={ref}>
                <ButtonText>Show Modal</ButtonText>
            </Button>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
                finalFocusRef={ref}
            >
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Heading size='lg'>Engage with Modals</Heading>
                        <ModalCloseButton>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Text >
                            Elevate user interactions with our versatile modals. Seamlessly integrate notifications, forms, and media displays. Make an impact effortlessly.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="outline"
                            size="sm"
                            action="secondary"
                            mr="$3"
                            onPress={() => {
                                setShowModal(false);
                            }}
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            size="sm"
                            action="positive"
                            borderWidth='$0'
                            onPress={() => {
                                setShowModal(false);
                            }}
                        >
                            <ButtonText>Explore</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
    );
}
