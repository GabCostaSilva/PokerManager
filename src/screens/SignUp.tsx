import React from "react";
import { Box, Button, Center, Flex, FormControl, Heading, HStack, Input, VStack } from "native-base";

export const SignUp = ({ route, navigation }) => {
  return <Center w="100%">
    <Box safeArea p="2" w="90%" maxW="290" py="8">
      <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
        Bem Vindo (a)
      </Heading>
      <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
        Cadastre - se para continuar
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Nome de usuário</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Senha</FormControl.Label>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirme a senha</FormControl.Label>
          <Input type="password" />
        </FormControl>
        <Button colorScheme="primary" minW={20}>
          Cadastrar
        </Button>
      </VStack>
    </Box>
  </Center>;
};