import React, { useState, useMemo, useEffect } from 'react';
import { Box, Center, HStack, Text, VStack, View } from 'native-base';
import { Loading, SortModal, NavHeaderRight, TextSearchDropdown } from '../../../../components';
import { COLORS } from '../../../../constants/theme';
import { CustomerList } from './CustomerList';
import { config, url } from '../../../../config';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';
import { SortBy } from '../../../../utils/sorting';
import useFetch from '../../../../hooks/useFetch';
import { FilterList } from '../../../../utils/filter';

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

function CustomerPage({ route }) {
  const { filterData } = route.params;
  // for hot reload
  const [reloadState, setReloadState] = useState(true);
  // for background search function
  const [showBackgroundSearch, setShowBackgroundSearch] = useState(false);
  // for display total from list data
  const [lengthSearch, setLengthSearch] = useState(0);
  const [dataShowLength, setDataShowLength] = useState(null);
  // for navigate between pages
  const navigation = useNavigation();

  const [openState, setOpenState] = useState({
    sort: false,
  });

  // column for searching
  const dataColumn = ['customer_group', 'territory', 'customer_name'];
  const initialsSortBy = {
    Creation: false,
    Modified: false,
    Name: false,
  };

  const initialsSortType = {
    DESC: false,
    ASC: false,
  };

  const initialsFilterState = {
    customer_type: '',
    customer_group: '',
    territory: '',
  };

  const [sortByState, setSortByState] = useState(initialsSortBy);
  const [sortTypeState, setSortTypeState] = useState(initialsSortType);

  const [filterState, setFilterState] = useState(initialsFilterState);
  // data fetching with custom hook useFetch
  const {
    data: customerData,
    setData: setCustomerData,
    setRefetch: refetchData,
    loading,
    error,
  } = useFetch(url.CUSTOMERS, {
    headers: {
      Authorization: config.API_TOKEN,
    },
  });

  var countType = customerData.filter((cus) => {
    return cus.customer_type === 'Company';
  }).length;

  var countIndividualType = customerData.filter((cus) => {
    return cus.customer_type === 'Individual';
  }).length;

  const handleClickDetails = (name) => {
    navigation.navigate('CustomerDetails', {
      name: name,
    });
  };

  // // reset open state modal when navigate from back event
  useMemo(() => {
    const handleBack = navigation.addListener('focus', () => {
      refetchData();
      setReloadState(true);
    });

    handleBack();
  }, [navigation]);

  // useMemo(() => {
  //   if (filterData) setFilterState(filterData);
  // }, [filterData]);

  useMemo(() => {
    // console.log('FilterState: ', filterData);
    if (filterData) {
      FilterList(
        customerData,
        setCustomerData,
        ['customer_type', 'customer_group', 'territory'],
        Object.values(filterData)
      );
      console.log(filterData);
    }
  }, [filterData]);

  // hot loading when data still not available
  if (loading) {
    return <Loading loading={loading} />;
  }
  // handle error when data is not available
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
            // mb={2}
            justifyContent={{ base: 'flex-end', lg: 'flex-end' }}
          >
            {Platform.OS === 'android' && (
              <NavHeaderRight
                openAdd={() => navigation.navigate('AddNewCustomer')}
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
                openFilter={() => navigation.navigate('FilterCustomer')}
              />
            )}
            {Platform.OS === 'ios' && (
              <NavHeaderRight
                openAdd={() => navigation.navigate('AddNewCustomer')}
                // openAdd={() => setOpenState((pre) => ({ ...pre, add: true }))}
                openSort={() => setOpenState((pre) => ({ ...pre, sort: true }))}
                openFilter={() => navigation.navigate('FilterCustomer')}
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
              handleClick={handleClickDetails}
              // handleClick={() => setOpenState((pre) => ({ ...pre, details: true }))}
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
                  {/* {companyData.length} */}
                  {countType}
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
                  {countIndividualType}
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
          {!showBackgroundSearch && (
            <CustomerList
              reload={reloadState}
              setReload={setReloadState}
              data={customerData}
              token={config.API_TOKEN}
              returnDataIndex={setDataShowLength}
              handleClickDetails={handleClickDetails}
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

export default CustomerPage;
