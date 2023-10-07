import {Button, HStack, Text} from "native-base";
import React from "react";

interface StepsButtonGroupProps {
    functions?: (() => void)[],
    setPage: ((page) => void),
    currentPage: number,
    pages: String[]
}

const StepsButtonGroup = ({setPage, currentPage, pages, functions = []}: StepsButtonGroupProps) => {
    function executeFunctions() {
        functions.forEach(f => f())
    }

    function nextPage() {
        executeFunctions()
        setPage(currentPage => currentPage === 3 ? currentPage + 2 : currentPage + 1);
    }

    return (
        <HStack justifyContent='center' space='2xl' mb={5}>
            <Button
                variant="outline"
                isDisabled={currentPage === 0}
                onPress={() => setPage(currentPage => currentPage - 1)}
                minW={100}
            >

                <Text>
                    Voltar
                </Text>
            </Button>
            {/* CURRENT PAGE === 3 IS A TEMP WORKAROUND*/}
            <Button
                isDisabled={currentPage === pages.length - 1}
                onPress={() => nextPage()}
                minW={100}
            >
                <Text color="white">
                    Próximo
                </Text>
            </Button>

        </HStack>
    )
}

export default StepsButtonGroup;