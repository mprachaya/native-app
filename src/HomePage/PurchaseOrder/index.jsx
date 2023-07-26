import { Center, ScrollView, VStack, View } from 'native-base';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { SPACING } from '../../../constants/theme';
import { Context } from '../../../reducer';
import useFetch from '../../../hooks/useFetch';
import Header from './Header';
import { config, url } from '../../../config';
import List from './List';
import SearchFilter from '../../../hooks/SearchFilter';
import Pagination from '../../../components/Pagination';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler } from 'react-native-reanimated';

const ContainerStyled = (props) => {
  return (
    <View
      pt={12}
      height={'full'}
      bg={'blueGray.100'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function PurchaseOrder() {
  //reducer
  const [state, dispatch] = useContext(Context);
  const path = 'PurchaseOrder';
  // sorting
  const [sort, setSort] = useState(true); // true = asc , false = desc
  const [sortOption, setSortOption] = useState('transaction_date');
  const [sortOptionDisplay, setSortOptionDisplay] = useState('Created On');
  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowNumber, setRowNumber] = useState(0);
  var perPage = 2;
  // hot reload
  const [hotReload, setHotReload] = useState(false);
  // fetch data
  const [searchState, setSearchState] = useState({
    id: '',
    supplier: '',
    status: '',
    company: '',
  });

  const {
    data: purchaseOrder,
    setData: setPurchaseOrder,
    loading,
    error,
  } = useFetch(url.PURCHASE_ORDER, {
    headers: {
      Authorization: config.API_TOKEN,
    },
  });

  // must use useEffect
  useEffect(() => {
    dispatch({ type: 'SET_PATHNAME', payload: path });
  }, []);

  // detect scroll position bottom

  // call search function
  useMemo(() => {
    SearchFilter(purchaseOrder, sort, sortOption, setPurchaseOrder);
  }, [sort, sortOption]);

  useMemo(() => {
    if (purchaseOrder.length > 0) {
      setRowNumber(purchaseOrder.length);
    }
  }, [purchaseOrder]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (lastContentOffset.value > event.contentOffset.y && isScrolling.value) {
        translateY.value = 0;
        console.log('scrolling up');
      } else if (lastContentOffset.value < event.contentOffset.y && isScrolling.value) {
        translateY.value = 100;
        console.log('scrolling down');
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
      isScrolling.value = true;
    },
    onEndDrag: (e) => {
      isScrolling.value = false;
    },
  });

  return (
    <SafeAreaView>
      <ContainerStyled>
        <Center>
          {/* Sort and Filter */}
          <Header
            sort={sort}
            setSort={setSort}
            sortOption={sortOption}
            setSortOption={setSortOption}
            handleSearchChange={setSearchState}
            sortOptionDisplay={sortOptionDisplay}
            setSortOptionDisplay={setSortOptionDisplay}
          />
          {/* {!loading && ( */}

          {/* )} */}
          <ScrollView
            h='full'
            w={'full'}
            px={{ base: 0, lg: 24 }}
            onScroll={({ nativeEvent }) => {
              // detect only scroll down
              if (nativeEvent.contentOffset.y > 0 && nativeEvent.contentOffset.y <= 30) {
                console.log(nativeEvent.contentOffset.y);
              }
            }}
            scrollEventThrottle={1000}
          >
            <Pagination
              rowNumber={rowNumber}
              setCurrentPage={setCurrentPage}
              perPage={perPage}
              setHotReload={setHotReload}
            />
            <VStack
              space={SPACING.small}
              mt={2}
              mx={{ base: 6, lg: 0 }}
            >
              <List
                loading={loading}
                perPage={perPage}
                error={error}
                data={purchaseOrder}
                hotReload={hotReload}
                setHotReload={setHotReload}
                sort={sort}
                sortOption={sortOption}
                searchState={searchState}
                currentPage={currentPage}
              />
            </VStack>
          </ScrollView>
        </Center>
      </ContainerStyled>
    </SafeAreaView>
  );
}

export default PurchaseOrder;
