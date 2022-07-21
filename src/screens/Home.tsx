import { VStack, useTheme, HStack, IconButton, Text, Heading, FlatList, Center } from "native-base";
import Logo from '../assets/logo_secondary.svg';
import { Filter } from "../components/Filter";
import React, { useState } from "react";
import { SignOut } from "phosphor-react-native";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";
import { ChatTeardropText } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";

export function Home() {

    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');

    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: "123",
            patrimony: "123456",
            when: "18/07/2022 as 14:00",
            status: 'open'
        }
    ])

    const { colors } = useTheme()

    const navigation = useNavigation()

    function handleNewOrder() {
        navigation.navigate('new');
    }

    function handleOpenDetails(orderId: string) {
        navigation.navigate('details', { orderId });
    }

    function handleLogOut() {
        auth()
            .signOut()
            .catch(error => {
                console.log(error)
                return Alert.alert('Sair', 'Não foi possível sair');
            })
    };


    return (
        <VStack flex={1} bg="gray.700" pb={9}>

            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />
                <IconButton
                    icon={<SignOut size={26} color={colors.gray['300']} />}
                    onPress={handleLogOut}
                />
            </HStack>

            <VStack flex={1} px={6} >
                <HStack
                    w="full"
                    mt={8}
                    mb={4}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Heading color="gray.100">
                        Solicitações
                    </Heading>
                    <Text color="gray.200">
                        3
                    </Text>
                </HStack>

                <HStack
                    w="full"
                    space={3}
                    mb={8}
                >
                    <Filter
                        type="open"
                        title="em andamento"
                        onPress={() => { setStatusSelected('open') }}
                        isActive={statusSelected === 'open'}
                    />
                    <Filter
                        type="closed"
                        title="finalizados"
                        onPress={() => { setStatusSelected('closed') }}
                        isActive={statusSelected === 'closed'}
                    />

                </HStack>

                <FlatList
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Order data={item} onPress={() => { handleOpenDetails(item.id) }} />}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={() => (
                        <Center>
                            <ChatTeardropText color={colors.gray['300']} size={40} />
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                Você ainda não possui  {'\n'}
                                solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                            </Text>

                        </Center>
                    )}
                />

                <Button title="Nova solicitação" onPress={handleNewOrder} />

            </VStack>
        </VStack>
    )
}