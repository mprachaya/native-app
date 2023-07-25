import { Button, Card, HStack, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import TextStyled from '../../../components/TextStyled';
import Badges from '../../../components/Badges';
import GetScreenSize from '../../../hooks/GetScreenSize';
import MoreButton from '../../../components/MoreButton';
import uuid from 'react-native-uuid';
import { PurchaseOrderListSkeleton } from '../../../components/Skeleton';

function List({ data, loading, error, searchState, sort, sortOption }) {
  const [hotReload, setHotReload] = useState(false);

  const SkeletonList = () => (
    <View mt={6}>
      {Array.from(Array(10).fill()).map((index) => (
        <View key={uuid.v1()}>
          <PurchaseOrderListSkeleton />
        </View>
      ))}
    </View>
  );

  useEffect(() => {
    setHotReload(true);
  }, [sort, sortOption]);

  useEffect(() => {
    if (hotReload) {
      setTimeout(function () {
        setHotReload(false);
      }, 50);
    }
  }, [hotReload]);

  if (hotReload) {
    return (
      <View mt={6}>
        <SkeletonList />
      </View>
    );
  }

  return (
    <React.Fragment>
      {!loading ? (
        Object.values(data)
          ?.filter((order) => {
            return (
              order.name.toLowerCase().includes(searchState.id.toLowerCase()) &&
              order.company.toLowerCase().includes(searchState.company.toLowerCase()) &&
              order.status.toLowerCase().includes(searchState.status.toLowerCase()) &&
              order.supplier.toLowerCase().includes(searchState.supplier.toLowerCase())
            );
          })
          .map((orderFilter, index) => (
            <Card
              key={uuid.v1()}
              pl={{ base: 0, lg: 16 }}
              my={4}
              py={8}
              shadow={0}
              background={'blueGray.50'}
              rounded={6}
            >
              <VStack key={orderFilter.name}>
                <HStack
                  space={1}
                  justifyContent={'space-between'}
                  direction={{ base: 'column', lg: 'row' }}
                >
                  <HStack
                    justifyContent={'center'}
                    direction={{ base: 'row', lg: 'column' }}
                  >
                    <HStack
                      py={{ base: 3, lg: 0 }}
                      pt={{ base: 3, lg: 2 }}
                    >
                      <TextStyled> {index + 1}. </TextStyled>
                      <TextStyled fontWeight={'bold'}> {orderFilter.supplier.replace(/['"]+/g, '')}</TextStyled>
                    </HStack>
                    <GetScreenSize
                      from={'md'}
                      to={'lg'}
                    >
                      <Button
                        variant={'link'}
                        _text={{
                          lineHeight: 0,
                          fontSize: { base: 'sm', lg: 'lg' },
                          fontWeight: 'bold',
                          color: 'blue.600',
                          // color: 'white',
                        }}
                      >
                        {'   ' + orderFilter.company}
                      </Button>
                    </GetScreenSize>
                    <GetScreenSize
                      from={'sm'}
                      to={'md'}
                    >
                      <Button
                        variant={'link'}
                        _text={{
                          lineHeight: 0,
                          fontSize: { base: 'sm', lg: 'lg' },
                          fontWeight: 'bold',
                          color: 'blue.600',
                          // color: 'white',
                        }}
                      >
                        {orderFilter.company}
                      </Button>
                    </GetScreenSize>
                  </HStack>
                  <HStack
                    w={{ base: 'full', lg: 200 }}
                    direction={{ base: 'row-reverse', lg: 'column' }}
                    justifyContent={'center'}
                  >
                    <TextStyled>{orderFilter.transaction_date}</TextStyled>
                    <TextStyled>{orderFilter.name}</TextStyled>
                  </HStack>
                  <HStack
                    w={{ base: 'full', lg: 200 }}
                    justifyContent={{ base: 'center', lg: 'start' }}
                  >
                    <Badges
                      mt={{ base: 4, lg: 0 }}
                      pt={1}
                      py={2}
                      type='receive'
                    >
                      {orderFilter.status}
                    </Badges>
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
              </VStack>
            </Card>
          ))
      ) : Platform.OS === 'ios' ? (
        <SkeletonList />
      ) : (
        Platform.OS === 'android' && <Spinner size='lg' />
      )}
      {error && <TextStyled> Error Fetching Data Please Check. </TextStyled>}
    </React.Fragment>
  );
}

export default List;
