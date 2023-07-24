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

function PurchaseOrder({ navigation }) {
  const [state, dispatch] = useContext(Context);
  const { data: purchaseOrder, loading, error } = useFetch('https://api.quotable.io/random', header);
  const path = 'PurchaseOrder';

  useEffect(() => {
    dispatch({ type: 'SET_PATHNAME', payload: path });
  }, []);

  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <StyledContainer>
        <ScrollView h='full'>
          <Center>
            <VStack
              space={SPACING.small}
              w={{ lg: 1000 }}
            >
              <HStack>
                <TextStyled>Supplier Name</TextStyled>
                <Badges type='receive' />
              </HStack>
              <HStack justifyContent={'space-between'}>
                <HStack>
                  <TextStyled>29-01-2023</TextStyled>
                  <TextStyled>PUR-ORD-2023-00004</TextStyled>
                </HStack>
                <GetScreenSize type='lg'>
                  <MoreButton />
                </GetScreenSize>
              </HStack>
              <GetScreenSize type='sm'>
                <MoreButton />
              </GetScreenSize>
              <Divider my={2} />
            </VStack>
          </Center>
        </ScrollView>
      </StyledContainer>
    </SafeAreaView>
  );
}

export default PurchaseOrder;
