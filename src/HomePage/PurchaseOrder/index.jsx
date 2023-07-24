import { Center, Divider, HStack, ScrollView, Spinner, VStack, View } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { SPACING } from '../../../constants/theme';
import { Context } from '../../../reducer';
import TextStyled from '../../../components/TextStyled';
import GetScreenSize from '../../../hooks/GetScreenSize';
import useFetch from '../../../hooks/useFetch';
import MoreButton from '../../../components/MoreButton';
import Header from './Header';
import Badges from '../../../components/Badges';
import { config, url } from '../../../config';
import { Platform } from 'react-native';
import { PurchaseOrderListSkeleton } from '../../../components/Skeleton';

const ContainerStyled = (props) => {
  return (
    <View
      pt={12}
      height={'full'}
      bg={'blueGray.50'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function PurchaseOrder() {
  const [state, dispatch] = useContext(Context);
  const path = 'PurchaseOrder';
  const [sort, setSort] = useState(true); // true = asc , false = desc
  const [sortOption, setSortOption] = useState('Created On');
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

  return (
    <SafeAreaView>
      <ContainerStyled>
        <Center>
          {/* Sort and Filter */}
          <Header
            sort={sort}
            setSort={setSort}
            sortOption={sortOption}
            handleChange={setSortOption}
          />
          <ScrollView
            h='full'
            px={12}
          >
            <VStack
              space={SPACING.small}
              w={{ lg: 1000 }}
            >
              {!loading
                ? Object.values(purchaseOrder)?.map((order) => (
                    <VStack key={order.name}>
                      <TextStyled fontWeight={'bold'}>{order.company}</TextStyled>
                      <HStack>
                        <TextStyled>{order.supplier.replace(/['"]+/g, '')}</TextStyled>
                        <Badges type='receive'>{order.status}</Badges>
                      </HStack>
                      <HStack justifyContent={'space-between'}>
                        <HStack>
                          <TextStyled>{order.transaction_date}</TextStyled>
                          <TextStyled>{order.name}</TextStyled>
                        </HStack>
                        <GetScreenSize
                          from='md'
                          to={'lg'}
                        >
                          <MoreButton />
                        </GetScreenSize>
                      </HStack>
                      <GetScreenSize
                        from='sm'
                        to={'md'}
                      >
                        <MoreButton mt={6} />
                      </GetScreenSize>
                      <Divider my={6} />
                    </VStack>
                  ))
                : Platform.OS === 'ios'
                ? Array.from(Array(10).fill()).map((index) => (
                    <View key={index + Math.random().toString(16).slice(2)}>
                      <PurchaseOrderListSkeleton />
                    </View>
                  ))
                : Platform.OS === 'android' && <Spinner size='lg' />}
              {error && <TextStyled> Error Fetching Data Please Check. </TextStyled>}
            </VStack>
          </ScrollView>
        </Center>
      </ContainerStyled>
    </SafeAreaView>
  );
}

export default PurchaseOrder;
