import {Circle, Flex, Icon, IconButton} from "native-base";
import React from "react";
import {AntDesign} from "@expo/vector-icons";
import {View} from "react-native";

const CloseableCircle = ({
                             size = 60,
                             bg, shadow = "9",
                             handleClose = undefined,
                             children
                         }) => {

    return (<Flex>
            {handleClose && <IconButton
                onPress={handleClose}
                icon={<Icon as={<AntDesign name="close"/>} size="sm"/>}
            />}
            <View
                style={{
                    borderRadius: 50,
                    shadowColor: "black",
                    backgroundColor: bg,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: size,
                    width: size,
                }}
            >
                {children}
            </View>
        </Flex>
    )
}

export default CloseableCircle