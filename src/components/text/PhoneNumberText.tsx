import {Text} from "@gluestack-ui/themed";
import {getPhoneMasked} from "../../utils/utils";

const PhoneNumberText = ({value}) => {
    return <Text>{getPhoneMasked(value)}</Text>
}