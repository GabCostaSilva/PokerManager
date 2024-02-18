import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {routes_names} from "../../routes/routes_names";
import {UserProfile} from "./UserProfile";
import {EditProfile} from "./EditProfile";
import { ChangePassword } from "./ChangePassword";

export function Profile() {
    const Stack = createNativeStackNavigator();

    return <Stack.Navigator>
        <Stack.Screen name={routes_names.user_area} component={UserProfile}/>
        <Stack.Screen name={routes_names.edit_profile} component={EditProfile}/>
        <Stack.Screen name={routes_names.change_password} component={ChangePassword}/>
    </Stack.Navigator>
}
