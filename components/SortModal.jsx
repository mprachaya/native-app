import {
  Actionsheet,
  Button,
  CheckIcon,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
  useDisclose,
  useToast,
} from 'native-base';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { COLORS } from '../constants/theme';
import { Context } from '../reducer';

function SortModal({ open, setOpen, data, setData, setReload, sortBy }) {
  const toast = useToast();
  const [state, dispatch] = useContext(Context);
  const ModalContainer = ({ children }) => (
    <Actionsheet
      isOpen={open}
      onClose={() => setOpen((pre) => ({ ...pre, sort: false }))}
      maxWidth={{ base: '400px', lg: 'full' }}
      style={{ marginBottom: 0, marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto' }}
    >
      {children}
    </Actionsheet>
  );

  const initialsSortBy = {
    Creation: false,
    Modified: false,
    Name: false,
  };

  const initialsSortType = {
    DESC: false,
    ASC: false,
  };

  const [sortByState, setSortByState] = useState({
    Creation: false,
    Modified: false,
    Name: false,
  });
  const [sortTypeState, setSortTypeState] = useState({
    DESC: false,
    ASC: false,
  });

  const handleActiveItem = (label, type) => {
    if (type !== 'sortType') {
      Object.keys(sortByState).map((key) => {
        if (key === label) {
          //clear all state
          setSortByState(initialsSortBy);
          // default type when select sort by state

          const checkSortBy = Object.keys(sortByState).filter((key) => sortByState[key]);
          const checkSortType = Object.keys(sortTypeState).filter((key) => sortTypeState[key]);
          if (checkSortBy.length > 0 && checkSortType.length > 0) {
            !sortTypeState[0]
              ? setSortTypeState((pre) => ({ ...pre, DESC: false }))
              : setSortTypeState((pre) => ({ ...pre, ASC: false }));
          } else {
            setSortTypeState((pre) => ({ ...pre, DESC: true }));
          }
          !sortByState[key]
            ? toast.show({ description: `Sort By ${label}`, duration: 2000 })
            : toast.show({ description: `Cancel Sort By ${label}`, duration: 2000 });
          !sortByState[key]
            ? dispatch({ type: 'SET_CTM_SORT_BY', payload: label })
            : dispatch({ type: 'SET_CTM_SORT_BY', payload: '' });
          !sortByState[key]
            ? setSortByState((pre) => ({ ...pre, [key]: true }))
            : setSortByState((pre) => ({ ...pre, [key]: false }));
          setReload(true);
        }
      });
    } else {
      Object.keys(sortTypeState).map((key) => {
        if (key === label) {
          const checkSortBy = Object.keys(sortByState).filter((key) => sortByState[key]);
          if (checkSortBy.length > 0) {
            // setSortTypeState.ASC === true && sortTypeState[key] === false;
            key === 'DESC' &&
              // console.log('Switch ASC false') &&
              setSortTypeState((pre) => ({ ...pre, ASC: false }));
            sortTypeState.DESC === true && sortTypeState[key] === false;
            key === 'ASC' &&
              // console.log('Switch DESC false') &&
              setSortTypeState((pre) => ({ ...pre, DESC: false }));

            !sortTypeState[key]
              ? toast.show({ description: `Sort Type ${label}`, duration: 2000 })
              : toast.show({ description: `Cancel Sort Type ${label}`, duration: 2000 });
            !sortByState[key]
              ? dispatch({ type: 'SET_CTM_SORT_TYPE', payload: label })
              : dispatch({ type: 'SET_CTM_SORT_TYPE', payload: '' });

            setSortTypeState((pre) => ({ ...pre, [key]: true }));

            setReload(true);
          } else {
            toast.show({ description: `Please select sort by`, duration: 2000 });
          }
        }
      });
    }
    setOpen(false);
  };

  const handleSort = () => {
    // value of sortByState
    const sortValue = Object.values(sortByState).map((data) => data);
    // find sort by name
    const sortSelected = Object.keys(sortByState).filter((key, index) => sortValue[index] && key);
    // value of sortTypeState
    const sortTypeValue = Object.values(sortTypeState).map((data) => data);
    // find sort type
    const sortTypeSelected = Object.keys(sortTypeState).filter((key, index) => sortTypeValue[index] && key);
    // call sort function
    if (sortSelected.length !== 0 && sortTypeSelected !== 0) sortBy(data, setData, sortSelected, sortTypeSelected);
    if (sortSelected.length === 0) {
      sortBy(data, setData, 'Creation', 'DESC');
    }
  };

  useEffect(() => {
    handleSort();
  }, [sortByState, sortTypeState]);

  const SortItem = ({ label, handleSort, type }) => (
    <Button
      variant={'unstyled'}
      mx={1}
      px={4}
      h={10}
      rounded={20}
      bg={
        type === 'sortBy'
          ? sortByState[label]
            ? 'lightBlue.100'
            : 'gray.100'
          : type === 'sortType' && sortTypeState[label]
          ? 'lightBlue.100'
          : 'gray.100'
      }
      justifyContent={'center'}
      onPress={() => handleSort()}
    >
      {type === 'sortBy' && sortByState[label] && (
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
      {type === 'sortBy' && !sortByState[label] && (
        <HStack space={1}>
          <Text
            color={'gray.400'}
            fontSize={'md'}
          >
            {label}
          </Text>
        </HStack>
      )}
      {type === 'sortType' && sortTypeState[label] && (
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
      {type === 'sortType' && !sortTypeState[label] && (
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
    <ModalContainer>
      <Actionsheet.Content
        w='100%'
        h={500}
        px={4}
        justifyContent='start'
        justifyItems={'center'}
        bg={COLORS.lightWhite}
      >
        <HStack
          mt={2}
          justifyContent={'center'}
        >
          <Text
            fontSize={'lg'}
            fontWeight={'bold'}
          >
            Sort
          </Text>
        </HStack>

        <HStack justifyContent={'center'}>
          <Divider
            mt={6}
            mb={10}
          />
        </HStack>

        <HStack justifyContent={'center'}>
          <VStack
            w={{ base: 'full', lg: 600 }}
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
              setSortByState(initialsSortBy);
              setSortTypeState(initialsSortType);
              dispatch({ type: 'SET_CTM_SORT_BY', payload: '' });
              dispatch({ type: 'SET_CTM_SORT_TYPE', payload: '' });
              sortBy(data, setData, 'Creation', 'ASC');
              setOpen(false);
              toast.show({ description: 'Clear all sort', duration: 2000 });
            }}
          >
            Reset All
          </Button>
        </VStack>
      </Actionsheet.Content>
    </ModalContainer>
  );
}

export default SortModal;
