import { useState } from 'react';
import { useNavigation } from '@react-navigation/native' 
import { IconButton, HStack, VStack, useTheme, Text, Heading, FlatList, Center } from "native-base";

import { SignOut, ChatTeardropText } from "phosphor-react-native";        

import  Logo  from './../assets/logo_secondary.svg'; 

import { Filter } from './../components/Filter';
import { Button } from '../components/Button';
import { Order, OrderProps } from './../components/Order';

export function Home() {
  const [ statusSelected, setStatusSelected ] = useState<'open' | 'close'>('open');
  const [ order, setOrder ] = useState<OrderProps[]>([
    {
      id: '143',
      patrimony: '1234',
      when: '14/04/2020 às 14:00',
      status: 'open',
    }
  ]);

  const navegation = useNavigation();
  const { colors } = useTheme();
  function handleOrder() {
    navegation.navigate('new')
  }

  function handleOpenDetails(orderId: string) {
    navegation.navigate('details', { orderId })
  }

  return( 
    <VStack flex={1} pb={6} bg="gray.700" >
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
          icon={<SignOut size={26} color={colors.gray[300]} />} 
        />
      </HStack>
      
      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center" >
          <Heading color="gray.100">
            Meu Chamados
          </Heading>
          <Text color="gray.200">
            {order.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />

          <Filter
            type="close"
            title="finalizados"
            onPress={() => setStatusSelected('close')}
            isActive={statusSelected === 'close'}
          />

        </HStack>

        <FlatList 
          data={order}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={()=> (
          <Center>
            <ChatTeardropText color={colors.gray[300]} size={40}/> 
            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center" >
              Você ainda não possui{'\n'}
              solicitações { statusSelected === 'open' ? 'em andamento' : 'finalizados' }
            </Text>
          </Center>
          )}
        />
        <Button title="Nova Solitação" onPress={handleOrder} />
      </VStack>
    </VStack>
  ); 
}
