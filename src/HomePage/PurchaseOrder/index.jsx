import { Badge, Button, Center, CircleIcon, Divider, HStack, ScrollView, VStack } from 'native-base';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { SPACING } from '../../../constants/theme';
import { Context } from '../../../reducer';
import TextStyled from '../../../components/TextStyled';
import StyledContainer from '../../../components/StyledContainer';
import GetScreenSize from '../../../hooks/GetScreenSize';
import MoreButton from '../../../components/MoreButton';
import Badges from '../../../components/Badges';
import useFetch from '../../../hooks/useFetch';
import { config, url } from '../../../config';

function PurchaseOrder({ navigation }) {
  const [state, dispatch] = useContext(Context);
  const path = 'PurchaseOrder';
  const {
    data: purchaseOrder,
    loading,
    error,
  } = useFetch(url.PURCHASE_ORDER, {
    headers: {
      Authorization: config.API_TOKEN,
    },
  });

  useEffect(() => {
    dispatch({ type: 'SET_PATHNAME', payload: path });
  }, []);

  useEffect(() => {
    // if (purchaseOrder) {
    console.log('data ', purchaseOrder);
    console.log('error ', error);
    console.log('api_token', config.API_TOKEN);
    // }
  }, [purchaseOrder]);

  return (
    <SafeAreaView>
      <StyledContainer>
        <ScrollView h='full'>
          <Center>
            <VStack
              space={SPACING.small}
              w={{ lg: 1000 }}
            >
              {!loading &&
                Object.values(purchaseOrder)?.map((order) => (
                  <VStack key={order.name}>
                    <HStack>
                      <TextStyled>{order.supplier.replace(/['"]+/g, '')}</TextStyled>
                      <Badges type='receive'>{order.status}</Badges>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                      <HStack>
                        <TextStyled>{order.transaction_date}</TextStyled>
                        <TextStyled>{order.name}</TextStyled>
                      </HStack>
                      <GetScreenSize type='lg'>
                        <MoreButton />
                      </GetScreenSize>
                    </HStack>
                    <GetScreenSize type='sm'>
                      <MoreButton />
                    </GetScreenSize>
                    <Divider my={4} />
                  </VStack>
                ))}
            </VStack>
          </Center>
        </ScrollView>
      </StyledContainer>
    </SafeAreaView>
  );
}

export default PurchaseOrder;
