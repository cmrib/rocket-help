import { VStack, Heading } from 'native-base';
import React from 'react';
import Logo from '../assets/logo_primary.svg'



export function SignIn() {
    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24} >
            <Heading color="gray.100" fontSize="xl" mt={20} mb="6">
                Acesse a sua conta
            </Heading>
            <Logo width={120} height={40} />

        </VStack>
    );
}
