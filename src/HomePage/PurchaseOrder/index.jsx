import {
  Button,
  Center,
  ChevronDownIcon,
  ChevronUpIcon,
  Divider,
  HStack,
  Menu,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { SIZES, SPACING } from '../../../constants/theme';
import { Context } from '../../../reducer';
import TextStyled from '../../../components/TextStyled';
import StyledContainer from '../../../components/StyledContainer';
import GetScreenSize from '../../../hooks/GetScreenSize';
import MoreButton from '../../../components/MoreButton';
import Badges from '../../../components/Badges';
import useFetch from '../../../hooks/useFetch';
import { config, url } from '../../../config';
import { SearchInputFilled } from '../../../components/Inputs';
import { PurchaseOrderListSkeleton } from '../../../components/Skeleton';
import { Platform } from 'react-native';

function PurchaseOrder({ navigation }) {
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

  useEffect(() => {
    // if (purchaseOrder) {
    console.log('data ', purchaseOrder);
    console.log('error ', error);
    // }
  }, [purchaseOrder]);

  return (
    <SafeAreaView>
      <StyledContainer>
        <Center>
          <GetScreenSize type={'lg'}>
            <HStack
              w={1000}
              mb={12}
              justifyContent={'space-between'}
            >
              <VStack space={SPACING.small}>
                <SearchInputFilled label={'ID'} />
                <SearchInputFilled label={'Supplier'} />
                <SearchInputFilled label={'Status'} />
                <SearchInputFilled label={'Company'} />
              </VStack>
              <HStack h={12}>
                <Button.Group
                  isAttached
                  colorScheme='blueGray'
                  mx={{
                    base: 'auto',
                    md: 0,
                  }}
                  size='md'
                >
                  <Button
                    borderLeftRadius={12}
                    background={'blueGray.50'}
                    borderWidth={1}
                    borderColor={'blueGray.200'}
                    shadow={1}
                    onPress={() => setSort(!sort)}
                    _pressed={{
                      background: 'blueGray.100',
                    }}
                  >
                    <HStack
                      space={2}
                      w={'20'}
                      justifyContent={'center'}
                    >
                      {sort ? <ChevronUpIcon my={1.5} /> : <ChevronDownIcon my={1.5} />}
                      {sort ? <Text fontSize={SIZES.large}>ASC</Text> : <Text fontSize={SIZES.large}>DESC</Text>}
                    </HStack>
                  </Button>
                  <Menu
                    size={'72'}
                    height={'container'}
                    value={sortOption}
                    trigger={(triggerProps) => {
                      return (
                        <Button
                          background={'blueGray.50'}
                          borderWidth={1}
                          shadow={1}
                          borderColor={'blueGray.200'}
                          borderRightRadius={12}
                          borderTopLeftRadius={0}
                          borderBottomLeftRadius={0}
                          accessibilityLabel='More options menu'
                          {...triggerProps}
                        >
                          <Text
                            fontSize={SIZES.large}
                            my={-0.5}
                            mx={2}
                          >
                            {sortOption}
                          </Text>
                        </Button>
                      );
                    }}
                  >
                    <Menu.Item onPress={() => setSortOption('Created On')}>
                      <TextStyled>Created On</TextStyled>
                    </Menu.Item>
                    <Menu.Item onPress={() => setSortOption('Status')}>
                      <TextStyled>Status</TextStyled>
                    </Menu.Item>
                    <Menu.Item onPress={() => setSortOption('Title')}>
                      <TextStyled>Title</TextStyled>
                    </Menu.Item>
                    <Menu.Item onPress={() => setSortOption('Company')}>
                      <TextStyled>Company</TextStyled>
                    </Menu.Item>
                  </Menu>
                </Button.Group>
              </HStack>
            </HStack>
          </GetScreenSize>
          <ScrollView
            h='full'
            px={12}
          >
            <VStack
              space={SPACING.small}
              w={{ lg: 1000 }}
            >
              {!loading ? (
                Object.values(purchaseOrder)?.map((order) => (
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
                      <GetScreenSize type='lg'>
                        <MoreButton />
                      </GetScreenSize>
                    </HStack>
                    <GetScreenSize type='sm'>
                      <MoreButton mt={6} />
                    </GetScreenSize>
                    <Divider my={6} />
                  </VStack>
                ))
              ) : Platform.OS === 'ios' ? (
                Array.from(Array(10).fill()).map((index) => (
                  <View key={index + Math.random().toString(16).slice(2)}>
                    <PurchaseOrderListSkeleton />
                  </View>
                ))
              ) : (
                <Spinner size='lg' />
              )}
            </VStack>
          </ScrollView>
        </Center>
      </StyledContainer>
    </SafeAreaView>
  );
}

export default PurchaseOrder;
