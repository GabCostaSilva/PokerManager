import React from "react";
import {useTourneyStore} from "../../../state/Tournament";
import {routes_names} from "../../../routes/routes_names";
import FormContainer from "../FormContainer";
import MyTextInput from "../../../components/MyTextInput";

export default function TourneyName({navigation, route}) {
    let {name} = useTourneyStore(state => state.tourney) || {name: ""};
    let patchTourney = useTourneyStore(state => state.patchTourney);

    function onPress() {
        navigation.navigate(routes_names.tournament, {screen: "Stack Inicial"});
    }

    return <FormContainer onPressNextPage={onPress}>
        <MyTextInput onChange={(text: any) => patchTourney("name", text)}
                     value={name}>
        </MyTextInput>
    </FormContainer>;
}