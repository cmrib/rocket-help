import { useRoute } from '@react-navigation/native';
import { VStack, Text, HStack, ScrollView } from 'native-base';
import { Header } from '../components/Header';
import { useEffect, useState } from 'react'
import { OrderProps } from '../components/Order';
import firestore from '@react-native-firebase/firestore';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native';
import { useTheme } from 'native-base';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

type RouteParams = {
    orderId: string;
};

interface OrderDetails extends OrderProps {
    description: string;
    solution: string;
    closed: string;
};

export function Details() {

    const [isLoading, setIsLoading] = useState(true);
    const [solution, setSolution] = useState('')
    const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)
    const route = useRoute()
    const { orderId } = route.params as RouteParams;
    const { colors } = useTheme()

    useEffect(() => {
        firestore()
            .collection<OrderFirestoreDTO>('orders')
            .doc(orderId)
            .get()
            .then((doc) => {
                const { patrimony, description, status, created_at, closed_at } = doc.data()

                const closed = closed_at ? dateFormat(closed_at) : null

                setOrder({
                    id: doc.id,
                    patrimony,
                    description,
                    status,
                    solution,
                    when: dateFormat(created_at),
                    closed
                });


                setIsLoading(false)
            })

    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bg="gray.700">
            <Header title="Solicitação" />


            <HStack
                bg="gray.500"
                justifyContent="center"
                p={4}
            >

                {
                    order.status === 'closed' ?
                        <CircleWavyCheck size={22} color={colors.green['300']} />
                        : <Hourglass size={22} color={colors.secondary['700']} />
                }

                <Text
                    fontSize="sm"
                    color={order.status === 'closed' ? colors.green['300'] : colors.secondary['700']}
                    ml={2}
                    textTransform="uppercase"
                >
                    {order.status === 'closed' ? 'finalizado' : 'em andamento'}

                </Text>
            </HStack>

            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <CardDetails
                    title="equipamento"
                    description={`Patrimônio ${order.patrimony}`}
                    icon={DesktopTower}
                    footer={order.when}
                />

                <CardDetails
                    title="descrição do problema"
                    description={order.description}
                    icon={Clipboard}
                />

                <CardDetails
                    title="solução"
                    icon={CircleWavyCheck}
                    footer={order.closed && `Encerrado em ${order.closed}`}
                >
                    <Input
                        placeholder='Descrição da solução'
                        onChangeText={setSolution}
                        textAlignVertical="top"
                        multiline
                        h={24}
                    />
                </CardDetails>
            </ScrollView>

            {
                order.status === 'open' && <Button title="Encerrar solicitação" m={5} />
            }


        </VStack>
    )
}