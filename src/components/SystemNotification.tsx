import {Alert, Box, Center, CloseIcon, HStack, IconButton, Text, VStack} from "native-base";
import React from "react";

export default function SystemNotification(props: {
    closeFn: () => void,
    status: 'error' | 'info' | 'success' | 'warning',
    title: string,
    message: string
}) {
    return <Center>
        <Alert status={props.status}>
            <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                    <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon/>
                        <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                            {props.title}
                        </Text>
                    </HStack>
                    <IconButton variant="unstyled"
                                _focus={{
                                    borderWidth: 0
                                }}
                                icon={<CloseIcon size="3"/>}
                                _icon={{
                                    color: "coolGray.600"
                                }}
                                onPress={props.closeFn}
                    />
                </HStack>
                <Box pl="6" _text={{
                    color: "coolGray.600"
                }}>
                    <Text>
                        {props.message}
                    </Text>
                </Box>
            </VStack>
        </Alert>
    </Center>;
}