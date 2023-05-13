import {Circle, Flex, Icon, IconButton} from "native-base";
import React from "react";
import {AntDesign} from "@expo/vector-icons";
import {View} from "react-native";

const CloseableCircle = ({
                             size = "40px",
                             bg, shadow = "9",
                             handleClose,
                             children
                         }) => {

    return (<Flex>
            <IconButton
                onPress={handleClose}
                icon={<Icon as={<AntDesign name="close"/>} size="sm"/>}
            />
            <View
                style={{
                    borderRadius: 50,
                    shadowColor: "black",
                    backgroundColor: bg,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 60,
                    width: 60,
                }}
            >
                {children}
            </View>
        </Flex>
    )
}

export default CloseableCircle