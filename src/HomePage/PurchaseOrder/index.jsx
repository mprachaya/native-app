import { Center, ScrollView, VStack, View } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
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
  const [state, dispatch] = useContext(Context);
  const path = 'PurchaseOrder';
  const [sort, setSort] = useState(true); // true = asc , false = desc
  const [sortOption, setSortOption] = useState('transaction_date');
  const [sortOptionDisplay, setSortOptionDisplay] = useState('Created On');
  const [searchState, setSearchState] = useState({
    id: '',
    supplier: '',
    status: '',
    company: '',
  });
  const {
    data: purchaseOrder,
    loading,
    error,
  } = useFetch(url.PURCHASE_ORDER, {
    headers: {
      Authorization: config.API_TOKEN,
    },
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch({ type: 'SET_PATHNAME', payload: path });
  }, []);

  // parse purchaseOrder to data
  useEffect(() => {
    if (purchaseOrder) {
      setData(purchaseOrder);
    }
  }, [purchaseOrder]);

  // call search function
  useEffect(() => {
    SearchFilter(data, sort, sortOption, setData);
  }, [sort, sortOption]);

  // log data
  useEffect(() => {
    if (data) {
      // console.log('Data ', data);
    }
  }, [data]);

  // log search state
  useEffect(() => {
    console.log('Search ', searchState);
  }, [searchState]);

  return (
    <SafeAreaView>
      <ContainerStyled>
        <Center>
          {/* Sort and Filter */}
          <ScrollView
            h='full'
            px={{ base: 4, lg: 24 }}
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
            <Pagination />

            <VStack
              space={SPACING.small}
              mt={4}
            >
              <List
                loading={loading}
                error={error}
                data={data}
                sort={sort}
                sortOption={sortOption}
                searchState={searchState}
              />
            </VStack>
          </ScrollView>
        </Center>
      </ContainerStyled>
    </SafeAreaView>
  );
}

export default PurchaseOrder;
