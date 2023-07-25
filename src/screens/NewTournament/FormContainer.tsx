import { Button, Center, Container, Text } from "native-base";
import React from "react";

export default ({ onPressNextPage, children }) => {
  return <Center mt={8}>
    <Container alignItems={"center"}>
      {children}
    </Container>
    <Button
      onPress={onPressNextPage}
      minW={100}>
      <Text color="white">
        Próximo
      </Text>
    </Button>
  </Center>;
}