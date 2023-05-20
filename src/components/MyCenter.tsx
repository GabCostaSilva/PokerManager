import {View} from "react-native";

const MyCenter = ({children}) => {
    return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>{children}</View>)
}

export default MyCenter