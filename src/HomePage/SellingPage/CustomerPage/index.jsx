import React, { useState, useMemo, useEffect } from 'react';
import { Box, Center, HStack, Text, VStack, View } from 'native-base';
import { Loading, SortModal, NavHeaderRight } from '../../../../components';
import { COLORS } from '../../../../constants/theme';
import { CustomerList } from './CustomerList';
import { config, url } from '../../../../config';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';
import { SortBy } from '../../../../utils/sorting';
import useFetch from '../../../../hooks/useFetch';
import TextSearchDropdown from '../../../../_test/TextSearchDropdown';
import { memo } from 'react/cjs/react.production.min';
import AddNewCustomer from './AddNewCustomer';
import FadeTransition from '../../../../components/FadeTransition';

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

function CustomerPage() {
  // for hot reload
  const [reloadState, setReloadState] = useState(true);
  // for background search function
  const [showBackgroundSearch, setShowBackgroundSearch] = useState(false);
  // for display total from list data
  const [lengthSearch, setLengthSearch] = useState(0);
  const [dataShowLength, setDataShowLength] = useState(null);
  // for navigate between pages
  const navigation = useNavigation();
  // for add ,sort ,filter state controller
  const [openState, setOpenState] = useState({
    add: false,
    sort: false,
    filter: false,
  });
  // column for searching
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

  const initialOpen = {
    add: false,
    sort: false,
    filter: false,
  };

  const initialState = {
    customer_name: '',
    customer_type: '',
    customer_group: '',
    territory: '',
    market_segment: '',
    industry: '',
    mobile_no: '',
    email_id: '',
    tax_id: '',
    primary_address: '',
    website: '',
    print_language: 'English',
    customer_details: '',
    default_currency: 'THB',
    default_price_list: '',
    default_sales_partner: '',
    payment_terms: '',
  };

  const [state, setState] = useState(initialState);

  const [sortByState, setSortByState] = useState(initialsSortBy);
  const [sortTypeState, setSortTypeState] = useState(initialsSortType);

  // data fetching with custom hook useFetch
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

  const {
    data: companyData,
    setData: setCompanyData,
    loading: loadingCompany,
    error: errorCompany,
  } = useFetch(url.COMPANY, {
    headers: {
      Authorization: config.API_TOKEN,
    },
  });

  // reset open state modal when navigate from back event
  useMemo(() => {
    const handleBack = navigation.addListener('focus', () => {
      setOpenState(initialOpen);
    });
    return handleBack;
  }, [navigation]);

  // hot loading when data still not available
  if (loading && loadingCompany) {
    return <Loading loading={loading} />;
  }
  // handle error when data is not available
  if (error && errorCompany) {
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
            // mb={2}
            justifyContent={{ base: 'flex-end', lg: 'flex-end' }}
          >
            {Platform.OS === 'android' && (
              <NavHeaderRight
                openAdd={() => setOpenState((pre) => ({ ...pre, add: true }))}
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
            {Platform.OS === 'ios' && (
              <NavHeaderRight
                openAdd={() => setOpenState((pre) => ({ ...pre, add: true }))}
                openSort={() => setOpenState((pre) => ({ ...pre, sort: true }))}
                // openFilter={() => setOpenState((pre) => ({ ...pre, filter: true }))}
              />
            )}
          </HStack>
          {openState.add && (
            <Box
              top={0}
              left={0}
              right={'25%'}
              position='absolute'
              bg={'blueGray.100'}
              height={SCREEN_HEIGHT}
              width={'full'}
              zIndex={999}
            >
              <FadeTransition animated={openState.add}>
                <AddNewCustomer
                  state={state}
                  initialState={initialState}
                  handleClose={() => setOpenState((pre) => ({ ...pre, add: false }))}
                />
              </FadeTransition>
            </Box>
          )}
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
                  {customerData.length}
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
                  {companyData.length}
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
                  SOON
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
            <Text>
              {dataShowLength} to {customerData.length}
            </Text>
          </HStack>
          {!showBackgroundSearch && !openState.add && !openState.filter && (
            <CustomerList
              reload={reloadState}
              setReload={setReloadState}
              data={customerData}
              token={config.API_TOKEN}
              returnDataIndex={setDataShowLength}
            />
          )}
        </VStack>
      </Center>
      {/* {Platform.OS === 'ios' && ( */}
      <SortModal
        open={openState.sort}
        setOpen={setOpenState}
        setReload={setReloadState}
        data={customerData}
        setData={setCustomerData}
        sortBy={SortBy}
      />
      {/* )} */}
      {/* {openState.add && navigation.navigate('AddNewCustomer')} */}
    </ContainerStyled>
  );
}

export default memo(CustomerPage);
