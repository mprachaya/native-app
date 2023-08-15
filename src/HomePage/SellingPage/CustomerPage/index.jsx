import React, { useContext, useState, useMemo } from 'react';
import { Box, Center, HStack, Text, VStack, View } from 'native-base';
import { SearchInput, Loading, SortModal, NavHeaderRight } from '../../../../components';
import { COLORS } from '../../../../constants/theme';
import { CustomerList } from './CustomerList';
import { config, url } from '../../../../config';
import { Context } from '../../../../reducer';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';
import { SortBy } from '../../../../utils/sorting';
import useFetch from '../../../../hooks/useFetch';
import TextSearchDropdown from '../../../../_test/TextSearchDropdown';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ContainerStyled = (props) => {
  return (
    <View
      style={{ zIndex: 0 }}
      height={SCREEN_HEIGHT}
      bg={'blueGray.100'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function CustomerPage({ openState, setOpenState }) {
  const [state, dispatch] = useContext(Context);
  const [reloadState, setReloadState] = useState(true);
  const [showBackgroundSearch, setShowBackgroundSearch] = useState(false);
  const [lengthSearch, setLengthSearch] = useState(0);
  const [dataShowLength, setDataShowLength] = useState(null);
  const navigation = useNavigation();

  const dataColumn = ['customer_group', 'territory', 'name'];

  const initialsSortBy = {
    Creation: false,
    Modified: false,
    Name: false,
  };

  const initialsSortType = {
    DESC: false,
    ASC: false,
  };

  const [sortByState, setSortByState] = useState(initialsSortBy);
  const [sortTypeState, setSortTypeState] = useState(initialsSortType);
  const {
    data: customerData,
    setData: setCustomerData,
    loading,
    error,
  } = useFetch(url.CUSTOMERS, {
    headers: {
      Authorization: config.API_TOKEN,
    },
  });
  useMemo(() => console.log(customerData.slice(0, 2)), [customerData]);

  if (loading) {
    return <Loading loading={loading} />;
  }
  if (error) {
    return (
      <ContainerStyled>
        <HStack justifyContent='center'>
          <Text>ERROR</Text>
        </HStack>
      </ContainerStyled>
    );
  }

  return (
    <ContainerStyled>
      <Center
        mt={2}
        mx={{ base: 4, lg: 40 }}
      >
        <VStack>
          {Platform.OS === 'ios' && showBackgroundSearch && (
            <Box
              w={'100%'}
              h={'800'}
              top={0}
              left={0}
              right={0}
              bottom={0}
              // justifyContent='center'
              alignItems='center'
              background={'blueGray.100'}
              position='absolute'
              zIndex={-1}
            >
              {/* {lengthSearch === 0 && <Text mt={24}>Empty</Text>} */}
            </Box>
          )}
          <HStack
            mb={2}
            justifyContent={{ base: 'flex-end', lg: 'flex-end' }}
          >
            {Platform.OS === 'android' && (
              <NavHeaderRight
                // openAdd={() => setOpenState((pre) => ({ ...pre, add: true }))}
                openSort={() =>
                  navigation.navigate('SortAndroid', {
                    sortBy: SortBy,
                    data: customerData,
                    setData: setCustomerData,
                    setReload: setReloadState,
                    sortByst: sortByState,
                    sortTypest: sortTypeState,
                    setSortByst: setSortByState,
                    setSortTypest: setSortTypeState,
                  })
                }
                // openFilter={() => setOpenState((pre) => ({ ...pre, filter: true }))}
              />
            )}
          </HStack>

          <HStack
            mx={{ base: 0, lg: 24 }}
            justifyContent={{ base: 'center', lg: 'flex-end' }}
          >
            {/* <SearchInput /> */}

            <Box
              w={'full'}
              height={'16'}
            />
            <TextSearchDropdown
              allData={customerData}
              dataColumn={dataColumn}
              returnData={setShowBackgroundSearch}
              returnLength={setLengthSearch}
            />
          </HStack>
          {!showBackgroundSearch && (
            <HStack
              mt={6}
              mr={2}
              justifyContent={'space-evenly'}
            >
              <VStack
                w={'1/4'}
                alignItems={'center'}
              >
                <Text color={COLORS.secondary}>Total</Text>
                <Text
                  color={COLORS.primary}
                  fontWeight={'bold'}
                  fontSize={'lg'}
                >
                  1.9k
                </Text>
              </VStack>
              <VStack
                w={'1/4'}
                alignItems={'center'}
              >
                <Text color={COLORS.secondary}>Company</Text>
                <Text
                  color={COLORS.primary}
                  fontWeight={'bold'}
                  fontSize={'lg'}
                >
                  4.6k
                </Text>
              </VStack>
              <VStack
                w={'1/4'}
                alignItems={'center'}
              >
                <Text color={COLORS.secondary}>Individual</Text>
                <Text
                  color={COLORS.primary}
                  fontWeight={'bold'}
                  fontSize={'lg'}
                >
                  902
                </Text>
              </VStack>
            </HStack>
          )}
        </VStack>
        <VStack
          justifyContent={'center'}
          style={{
            zIndex: -2,
          }}
        >
          <HStack
            justifyContent='flex-end'
            mt={6}
            mr={{ base: 8, lg: 6 }}
          >
            <Text>1 to {dataShowLength !== null ? dataShowLength : '1'}</Text>
          </HStack>
          <CustomerList
            reload={reloadState}
            setReload={setReloadState}
            data={customerData}
            token={config.API_TOKEN}
            returnDataIndex={setDataShowLength}
          />
        </VStack>
      </Center>
      {Platform.OS === 'ios' && (
        <SortModal
          open={openState.sort}
          setOpen={setOpenState}
          setReload={setReloadState}
          data={customerData}
          setData={setCustomerData}
          sortBy={SortBy}
        />
      )}
    </ContainerStyled>
  );
}

export default CustomerPage;
