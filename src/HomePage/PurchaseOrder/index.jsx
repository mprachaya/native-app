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

  // parse purchaseOrder to data

  // call search function
  useMemo(() => {
    SearchFilter(purchaseOrder, sort, sortOption, setPurchaseOrder);
  }, [sort, sortOption]);

  useMemo(() => {
    if (purchaseOrder.length > 0) {
      setRowNumber(purchaseOrder.length);
    }
  }, [purchaseOrder]);

  return (
    <SafeAreaView>
      <ContainerStyled>
        <Center>
          {/* Sort and Filter */}
          <ScrollView
            h='full'
            px={{ base: 0, lg: 24 }}
          >
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
            <Pagination
              rowNumber={rowNumber}
              setCurrentPage={setCurrentPage}
              perPage={10}
              setHotReload={setHotReload}
            />
            {/* )} */}

            <VStack
              space={SPACING.small}
              mt={2}
              mx={{ base: 6, lg: 0 }}
            >
              <List
                loading={loading}
                perPage={10}
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
