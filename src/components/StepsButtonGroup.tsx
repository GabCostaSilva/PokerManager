import {Button, HStack, Text} from "native-base";
import React from "react";

const StepsButtonGroup = ({setPage, currentPage, pages}) => {
  return (
      <HStack justifyContent='center' space='md'>
          <Button
              variant="outline"
              disabled={currentPage === 0}
              onPress={() => setPage(currentPage => currentPage - 1)}>
              <Text>
                  Voltar
              </Text>
          </Button>
          {/* CURRENT PAGE === 3 IS A TEMP WORKAROUND*/}
          <Button
              disabled={currentPage === pages.lenght - 1 || currentPage === 3}
              onPress={() => setPage(currentPage => currentPage === 3 ? currentPage + 2 : currentPage + 1)}>
              <Text color="white">
                  Próximo
              </Text>
          </Button>
      </HStack>
  )
}

export default StepsButtonGroup;