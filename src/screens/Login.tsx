import { Box, Button, Center, FormControl, Heading, HStack, Input, Link, Text, VStack } from "native-base";
import React, { useState } from "react";

const SignUpForm = ({ route, navigation }): JSX.Element => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log(email, password);
  }

  return <Center w="100%">
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
        Bem Vindo ao Poker Manager
      </Heading>
      <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
        Faça seu login para continuar!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            onChangeText={(text) => setEmail(prevState => text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Senha</FormControl.Label>
          <Input type="password" onChangeText={(text) => setPassword(prevState => text)} />
          <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
            Esqueceu sua senha?
          </Link>
        </FormControl>
        <Button mt="2" colorScheme="primary" onPress={handleLogin}>
          Entrar
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
            Sou um novo usuário.{" "}
          </Text>
          <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }}
                href="#"
                onPress={() => navigation.navigate("Cadastro")}
          >
            Cadastre-Se
          </Link>
        </HStack>
      </VStack>
    </Box>
  </Center>;
};

export default SignUpForm;
