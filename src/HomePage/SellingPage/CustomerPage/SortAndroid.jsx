import React, { useState, useContext, useMemo } from 'react';
import { Button, CheckIcon, Divider, HStack, ScrollView, Text, VStack, View } from 'native-base';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
import { Dimensions } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import { Context } from '../../../../reducer/';

const ContainerStyled = (props) => {
  return (
    <View
      height={SCREEN_HEIGHT}
      bg={'blueGray.100'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function SortAndroid({ route, navigation }) {
  const { sortBy, data, setData, setReload, sortByst, sortTypest, setSortByst, setSortTypest } = route.params;
  const [state, dispatch] = useContext(Context);

  const initialsSortBy = {
    Creation: false,
    Modified: false,
    Name: false,
  };

  const initialsSortType = {
    DESC: false,
    ASC: false,
  };

  const [loading, setLoading] = useState(false);

  const handleActiveItem = (label, type) => {
    if (type !== 'sortType') {
      Object.keys(sortByst).map((key) => {
        if (key === label) {
          //clear all state
          setSortByst(initialsSortBy);
          // default type when select sort by state

          const checkSortBy = Object.keys(sortByst).filter((key) => sortByst[key]);
          const checkSortType = Object.keys(sortTypest).filter((key) => sortTypest[key]);
          if (checkSortBy.length > 0 && checkSortType.length > 0) {
            !sortTypest[0]
              ? setSortTypest((pre) => ({ ...pre, DESC: false }))
              : setSortTypest((pre) => ({ ...pre, ASC: false }));
          } else {
            setSortTypest((pre) => ({ ...pre, DESC: true }));
          }
          !sortByst[key]
            ? dispatch({ type: 'SET_CTM_SORT_BY', payload: label })
            : dispatch({ type: 'SET_CTM_SORT_BY', payload: '' });
          !sortByst[key]
            ? setSortByst((pre) => ({ ...pre, [key]: true }))
            : setSortByst((pre) => ({ ...pre, [key]: false }));
          setReload(true);
          setLoading(true);
        }
      });
    } else {
      Object.keys(sortTypest).map((key) => {
        if (key === label) {
          const checkSortBy = Object.keys(sortByst).filter((key) => sortByst[key]);
          if (checkSortBy.length > 0) {
            // setSortTypeState.ASC === true && sortTypeState[key] === false;
            key === 'DESC' &&
              // console.log('Switch ASC false') &&
              setSortTypest((pre) => ({ ...pre, ASC: false }));
            sortTypest.DESC === true && sortTypest[key] === false;
            key === 'ASC' &&
              // console.log('Switch DESC false') &&
              setSortTypest((pre) => ({ ...pre, DESC: false }));

            !sortByst[key]
              ? dispatch({ type: 'SET_CTM_SORT_TYPE', payload: label })
              : dispatch({ type: 'SET_CTM_SORT_TYPE', payload: '' });

            setSortTypest((pre) => ({ ...pre, [key]: true }));
            setReload(true);
            setLoading(true);
          } else {
            // toast.show({ description: `Please select sort by`, duration: 2000 });
          }
        }
      });
    }
  };
  const handleSort = () => {
    // value of sortByState
    const sortValue = Object.values(sortByst).map((data) => data);
    // find sort by name
    const sortSelected = Object.keys(sortByst).filter((key, index) => sortValue[index] && key);
    // value of sortTypeState
    const sortTypeValue = Object.values(sortTypest).map((data) => data);
    // find sort type
    const sortTypeSelected = Object.keys(sortTypest).filter((key, index) => sortTypeValue[index] && key);
    // call sort function
    if (sortSelected.length !== 0 && sortTypeSelected !== 0) {
      sortBy(data, setData, sortSelected, sortTypeSelected);
    }
    if (sortSelected.length === 0) {
      sortBy(data, setData, 'Creation', 'DESC');
    }
  };

  useMemo(() => {
    if (loading)
      setTimeout(() => {
        handleSort();
        setLoading(false);
        navigation.goBack();
      }, 100);
  }, [loading]);

  const SortItem = ({ label, handleSort, type }) => (
    <Button
      variant={'unstyled'}
      mx={1}
      px={4}
      h={10}
      rounded={20}
      borderWidth={1}
      borderColor={'light.300'}
      bg={
        type === 'sortBy'
          ? sortByst[label]
            ? 'lightBlue.100'
            : 'gray.100'
          : type === 'sortType' && sortTypest[label]
          ? 'lightBlue.100'
          : 'gray.100'
      }
      justifyContent={'center'}
      onPress={() => handleSort()}
    >
      {type === 'sortBy' && sortByst[label] && (
        <HStack space={1}>
          <CheckIcon
            mt={0.5}
            size={4}
            color={'blue.500'}
          />
          <Text
            color={'blue.500'}
            fontSize={'md'}
          >
            {label}
          </Text>
        </HStack>
      )}
      {type === 'sortBy' && !sortByst[label] && (
        <HStack space={1}>
          <Text
            color={'gray.400'}
            fontSize={'md'}
          >
            {label}
          </Text>
        </HStack>
      )}
      {type === 'sortType' && sortTypest[label] && (
        <HStack space={1}>
          <CheckIcon
            mt={0.5}
            size={4}
            color={'blue.500'}
          />
          <Text
            color={'blue.500'}
            fontSize={'md'}
          >
            {label}
          </Text>
        </HStack>
      )}
      {type === 'sortType' && !sortTypest[label] && (
        <HStack space={1}>
          <Text
            color={'gray.400'}
            fontSize={'md'}
          >
            {label}
          </Text>
        </HStack>
      )}
    </Button>
  );

  return (
    <ContainerStyled>
      <HStack>
        <VStack
          justifyContent={'center'}
          m={4}
        >
          <HStack justifyContent={'center'}>
            <VStack
              w={{ base: 'full', lg: 600 }}
              mb={2}
              justifyContent={'center'}
            >
              <Text
                color={COLORS.gray}
                fontSize={'md'}
                mx={2}
              >
                Sort By
              </Text>
              <ScrollView
                mt={4}
                maxH={12}
                w={'full'}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <SortItem
                  type={'sortBy'}
                  label={'Creation'}
                  handleSort={() => handleActiveItem('Creation', 'sortBy')}
                />
                <SortItem
                  type={'sortBy'}
                  label={'Modified'}
                  handleSort={() => handleActiveItem('Modified', 'sortBy')}
                />
                <SortItem
                  type={'sortBy'}
                  label={'Name'}
                  handleSort={() => handleActiveItem('Name', 'sortBy')}
                />
              </ScrollView>
            </VStack>
          </HStack>
          <HStack justifyContent={'center'}>
            <VStack
              mt={6}
              w={{ base: 'full', lg: 600 }}
              justifyContent={'center'}
            >
              <Text
                color={COLORS.gray}
                fontSize={'md'}
                mx={2}
              >
                Sort Type
              </Text>
              <ScrollView
                w={'full'}
                mt={4}
                maxH={12}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <SortItem
                  type={'sortType'}
                  label={'DESC'}
                  handleSort={() => handleActiveItem('DESC', 'sortType')}
                />
                <SortItem
                  type={'sortType'}
                  label={'ASC'}
                  handleSort={() => handleActiveItem('ASC', 'sortType')}
                />
              </ScrollView>
            </VStack>
          </HStack>
          <VStack>
            <HStack justifyContent={'center'}>
              <Divider
                mt={6}
                mb={10}
              />
            </HStack>
            <Button
              variant={'link'}
              _text={{ color: 'blue.500', fontSize: 'lg' }}
              onPress={() => {
                // index state
                setSortByst(initialsSortBy);
                setSortTypest(initialsSortType);
                dispatch({ type: 'SET_CTM_SORT_BY', payload: '' });
                dispatch({ type: 'SET_CTM_SORT_TYPE', payload: '' });
                sortBy(data, setData, 'Creation', 'ASC');
                navigation.navigate('Customer');
              }}
            >
              Reset All
            </Button>
          </VStack>
        </VStack>
      </HStack>
    </ContainerStyled>
  );
}

export default SortAndroid;
