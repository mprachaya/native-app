import React, { useState, useMemo, useEffect } from 'react';
import { Box, Button, Center, ChevronLeftIcon, FlatList, HStack, List, Text, VStack, View } from 'native-base';
import { Loading, SortModal, NavHeaderRight, TextSearchDropdown } from '../../../../components';
import { COLORS } from '../../../../constants/theme';
import { CustomerList } from './CustomerList';
import { config } from '../../../../config';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';
import { SortBy } from '../../../../utils/sorting';
import useFetch from '../../../../hooks/useFetch';
import useConfig from '../../../../config/path';

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

function QuotationPage({ route }) {
  const { baseURL, QUOTATIONS } = useConfig(true);
  const { filterData, toggleFilter } = route.params;
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
  const dataColumn = ['customer_name', 'status', 'name', 'transaction_date'];
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

  const FilterName = 'FilterQuotation';
  const SortName = 'SortAndroidQuotation';

  const [tempData, setTempData] = useState(null); // for store filtered Data
  // data fetching with custom hook useFetch
  const [filterActive, setFilterActive] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const {
    data: quotationData,
    setData: setquotationData,
    setRefetch: refetchData,
    loading,
    error,
  } = useFetch(baseURL + QUOTATIONS, {
    headers: {
      Authorization: '',
    },
  });
  var countDraft = quotationData.filter((qtt) => {
    return qtt.status === 'Draft';
  }).length;

  var countOpen = quotationData.filter((qtt) => {
    return qtt.status === 'Open';
  }).length;

  var countOrdered = quotationData.filter((qtt) => {
    return qtt.status === 'Ordered';
  }).length;

  var countCancelled = quotationData.filter((qtt) => {
    return qtt.status === 'Cancelled';
  }).length;
  var countExpired = quotationData.filter((qtt) => {
    return qtt.status === 'Expired';
  }).length;

  var countData = [
    {
      name: 'Draft',
      count: countDraft,
    },
    {
      name: 'Open',
      count: countOpen,
    },
    {
      name: 'Ordered',
      count: countOrdered,
    },
    {
      name: 'Cancelled',
      count: countCancelled,
    },
    {
      name: 'Expired',
      count: countExpired,
    },
  ];

  const handleClickDetails = (name) => {
    navigation.status('CustomerDetails', {
      name: name,
    });
  };

  const checkFilter = () => {
    const check = Object.fromEntries(Object.entries(filterData)?.filter(([key, value]) => value !== ''));
    var result = Object.values(check).length;
    return result > 0 ? setFilterActive(true) : setFilterActive(false);
  };

  const checkSort = () => {
    const checkSortBy = Object.keys(sortByState).filter((key) => sortByState[key]);
    const checkSortType = Object.keys(sortTypeState).filter((key) => sortTypeState[key]);

    var result = Object.values(checkSortBy).length && Object.values(checkSortType).length;
    return result > 0 ? setSortActive(true) : setSortActive(false);
  };

  const handleFilter = (active) => {
    if (active && filterData !== undefined) {
      const dataTemp = [...quotationData];
      // create new object for re formatting filter data and get only not equal ''
      const newObjFilter = Object.fromEntries(Object.entries(filterData)?.filter(([key, value]) => value !== ''));
      // console.log('FilterState: ', Object.values(newObjFilter).length);
      // filtering
      // console.log(newObjFilter[0]);
      const filterResult = dataTemp.filter((item) => {
        if (Object.keys(newObjFilter).length > 0) {
          for (let key in newObjFilter) {
            if (item[key] === '' || !newObjFilter[key].includes(item[key])) {
              return false;
              // console.log(filterData[key]);
            }
          }
        }
        return true;
      });
      if (filterResult.length > 0) setTempData(filterResult);
      else {
        setTempData(quotationData);
      }
      // console.log('filterResult:', filterResult);
    }
  };

  // // reset open state modal when navigate from back event
  useMemo(() => {
    const handleBack = navigation.addListener('focus', () => {
      refetchData();
      setReloadState(true);
    });

    handleBack();
  }, [navigation]);

  useMemo(() => {
    console.log('filterActive ', filterActive);
  }, [filterActive]);

  useMemo(() => {
    console.log('sortActive ', sortActive);
  }, [sortActive]);

  useMemo(() => {
    if (toggleFilter === undefined) {
    } else {
      handleFilter(toggleFilter);
    }
    checkFilter();
    checkSort();
    // console.log(filterData);
  }, [quotationData, toggleFilter]);

  // hot loading when data still not available
  if (loading) {
    return <Loading loading={loading} />;
  }
  // handle error when data is not available
  if (error) {
    return (
      <ContainerStyled>
        <HStack justifyContent='center'></HStack>
      </ContainerStyled>
    );
  }

  return (
    <ContainerStyled>
      <Center
        mt={2}
        mx={{ base: 0, lg: 0 }}
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
            m={0}
            pr={0}
            pl={{ base: 12, lg: 6 }}
            w={{ base: 'full', lg: 1100 }}
            justifyContent={'space-between'}
            alignSelf={'center'}
          >
            <Button
              m={{ base: 2, lg: 4 }}
              ml={{ base: 6, lg: 0 }}
              rounded={12}
              variant={'unstyled'}
              onPress={() => navigation.goBack()}
              _pressed={{ bg: 'blueGray.200' }}
            >
              <ChevronLeftIcon />
            </Button>
            {Platform.OS === 'android' && (
              <NavHeaderRight
                filterActive={filterActive ? 'filter' : null} // for active option bg color
                sortActive={sortActive ? 'sort' : null}
                openAdd={() => navigation.navigate('AddNewCustomer')}
                // openAdd={() => setOpenState((pre) => ({ ...pre, add: true }))}
                openSort={() =>
                  navigation.navigate(SortName, {
                    sortBy: SortBy,
                    data: quotationData,
                    setData: setquotationData,
                    setReload: setReloadState,
                    sortByst: sortByState,
                    sortTypest: sortTypeState,
                    setSortByst: setSortByState,
                    setSortTypest: setSortTypeState,
                  })
                }
                openFilter={() => {
                  navigation.navigate(FilterName, { toggleFilter: false, storeFilter: filterData });
                }}
              />
            )}
            {Platform.OS === 'ios' && (
              <NavHeaderRight
                filterActive={filterActive ? 'filter' : null} // for active option bg color
                sortActive={sortActive ? 'sort' : null}
                openAdd={() => navigation.navigate('AddNewCustomer')}
                // openAdd={() => setOpenState((pre) => ({ ...pre, add: true }))}
                openSort={() => setOpenState((pre) => ({ ...pre, sort: true }))}
                openFilter={() => navigation.navigate(FilterName, { toggleFilter: false, storeFilter: filterData })}
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
              allData={quotationData}
              dataColumn={dataColumn}
              returnData={setShowBackgroundSearch}
              returnLength={setLengthSearch}
              handleClick={handleClickDetails}
              // handleClick={() => setOpenState((pre) => ({ ...pre, details: true }))}
            />
          </HStack>
          {!showBackgroundSearch && (
            <Center>
              <View
                mt={6}
                px={6}
                w={{ base: 'full', lg: 1000 }}
                alignItems={'center'}
              >
                <FlatList
                  horizontal
                  mx={12}
                  removeClippedSubviews={true}
                  data={countData}
                  renderItem={({ item }) => (
                    <List
                      rounded={12}
                      mx={{ base: 2, lg: 12 }}
                      minW={'24'}
                      borderWidth={0}
                      alignItems={'center'}
                      bg={
                        item.name === 'Draft'
                          ? 'error.100'
                          : item.name === 'Open'
                          ? 'warning.100'
                          : item.name === 'Ordered'
                          ? 'success.100'
                          : item.name === 'Cancelled'
                          ? 'error.100'
                          : item.name === 'Expired'
                          ? 'error.100'
                          : null
                      }
                    >
                      <Text color={COLORS.secondary}>{item.name}</Text>
                      <Text
                        color={COLORS.primary}
                        fontWeight={'bold'}
                        fontSize={'lg'}
                      >
                        {/* {companyData.length} */}
                        {item.count}
                      </Text>
                    </List>
                  )}
                />
              </View>
            </Center>
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
              {dataShowLength} to {tempData?.length || quotationData?.length}
            </Text>
          </HStack>
          {!showBackgroundSearch && (
            <CustomerList
              reload={reloadState}
              setReload={setReloadState}
              data={tempData || quotationData}
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
        data={quotationData}
        setData={setquotationData}
        sortBy={SortBy}
      />

      {/* )} */}
      {/* {openState.add && navigation.navigate('AddNewCustomer')} */}
    </ContainerStyled>
  );
}

export default QuotationPage;
