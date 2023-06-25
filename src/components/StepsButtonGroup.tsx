import {Button, HStack, Text} from "native-base";
import React, {useEffect} from "react";

interface StepsButtonGroupProps {
    functions: (() => void)[],
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
                disabled={currentPage === pages.length - 1 || currentPage === 3}
                onPress={() => nextPage()}>
                <Text color="white">
                    Próximo
                </Text>
            </Button>
        </HStack>
    )
}

export default StepsButtonGroup;