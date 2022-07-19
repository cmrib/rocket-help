import { VStack, Heading, Icon, useTheme } from 'native-base';
import { useState } from 'react';
import React from 'react';
import Logo from '../assets/logo_primary.svg';
import { Input } from '../components/Input';
import { Envelope, Key } from 'phosphor-react-native';
import { Button } from '../components/Button';

export function SignIn() {

    const { colors } = useTheme()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    function handleSignIn() {
        console.log(name, password)
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px="8" pt={94} >
            <Logo width={163} height={87} />
            <Heading color="gray.100" fontSize="xl" mt={20} mb={6} fontWeight="bold">
                Acesse sua conta
            </Heading>

            <Input
                mb={4}
                placeholder="E-mail"
                InputLeftElement={<Icon as={<Envelope color={colors.gray['300']} />} ml={4} />}
                onChangeText={setName}
            />

            <Input
                mb={8}
                placeholder="Senha"
                InputLeftElement={<Icon as={<Key color={colors.gray['300']} />} ml={4} />}
                secureTextEntry
                onChangeText={setPassword}
            />

            <Button
                onPress={handleSignIn}
                title="Entrar" w="full"
            />
        </VStack >
    );
}
