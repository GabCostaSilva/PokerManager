// import React, {useEffect} from "react";
// import {Button, Flex} from "native-base";
// import {routes_names} from "../routes_names";
// import screens from "./NewTournament/screens";
// import {useTourneyStore} from "../state/Tournament";
//
// export const EditTourney = ({route, navigation}) => {
//     let loadTourney = useTourneyStore(state => state.loadTourney);
//     const tourney = route.params?.tourney || {uuid: ""}
//
//     useEffect(() => {
//         return () => {
//             (async () => {
//                 await loadTourney(tourney.uuid)
//             })()
//         }
//     }, []);
//
//     function navigateToTourneyOnScreen(screen: string) {
//         navigation.navigate(routes_names.tournament, {
//             screen: screen
//         })
//     }
//
//     return <Flex alignItems="left" justifyContent={'space-between'} p="4">
//         <FullWOutlineMdButton key={0} onPress={() => navigateToTourneyOnScreen(screens.tourney_name)}>
//             Nome do Torneio
//         </FullWOutlineMdButton>
//
//         <FullWOutlineMdButton key={1} onPress={() => navigateToTourneyOnScreen(screens.initial_stack)}>
//             Stack Inicial
//         </FullWOutlineMdButton>
//
//         <FullWOutlineMdButton key={2} onPress={() => navigateToTourneyOnScreen(screens.chips)}>
//             Fichas
//         </FullWOutlineMdButton>
//
//         <FullWOutlineMdButton key={3} onPress={() => navigateToTourneyOnScreen(screens.blinds)}>
//             Blinds
//         </FullWOutlineMdButton>
//
//         <FullWOutlineMdButton key={4} onPress={() => navigateToTourneyOnScreen(screens.buy_in)}>
//             Buy In
//         </FullWOutlineMdButton>
//
//         <FullWOutlineMdButton key={5} onPress={() => navigateToTourneyOnScreen(screens.share_costs)}>
//             Resenha
//         </FullWOutlineMdButton>
//
//         <FullWOutlineMdButton key={6} onPress={() => navigateToTourneyOnScreen(screens.players)}>
//             Jogadores
//         </FullWOutlineMdButton>
//     </Flex>
// }
//
// const FullWOutlineMdButton = ({onPress, children}) => {
//     return <Button variant={'outline'} size={"md"} w={'100%'} onPress={onPress}>
//         {children}
//     </Button>
// }
//
