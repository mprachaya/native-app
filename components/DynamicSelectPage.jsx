import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Input,
  PresenceTransition,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, ICON, SIZES, SPACING } from '../constants/theme';
import useFetch from '../hooks/useFetch';
import { config } from '../config';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const ContainerStyled = (props) => {
  return (
    <View
      style={{ zIndex: 0 }}
      height={SCREEN_HEIGHT}
      width={SCREEN_WIDTH}
      bg={'blueGray.100'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function DynamicSelectPage({ title, url, open, setOpen, setState, property, isRequired }) {
  const [list, setList] = useState([]);
  const [SearchText, setSearchText] = useState('');

  const returnValue = (name, value) => {
    setState((pre) => ({ ...pre, [name]: value }));
    setOpen(false);
  };
  const Item = ({ name }) => (
    <Button
      mx={2}
      mb={2}
      p={2}
      borderBottomWidth={2}
      borderColor={'blueGray.200'}
      rounded={12}
      bg={'blueGray.50'}
      _pressed={{ bg: 'blueGray.200' }}
      onPress={() => returnValue(property, name)}
    >
      <Text
        p={2}
        color={COLORS.gray}
        fontSize={'md'}
        textAlign={'center'}
      >
        {name}
      </Text>
    </Button>
  );

  // data fetching with custom hook useFetch

  const { data, loading, error } = useFetch(url, {
    headers: {
      Authorization: config.API_TOKEN,
    },
  });

  const clearSearch = () => {
    setSearchText('');
  };

  const handleSearch = (dataList, searchText, key) => {
    let tempData = dataList?.filter((item) => {
      return String(item[key]).toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });

    if (tempData.length > 0) {
      return tempData;
    } else {
      return false;
    }
  };
  const handleClear = (name) => {
    setState((pre) => ({ ...pre, [name]: '' }));
    setOpen(false);
  };

  useEffect(() => {
    if (data.length !== 0) {
      setList(data);
    }
    // console.log('data: ', data);
    // console.log('option: ', option);
  }, [data]);

  // useEffect(() => {
  //   console.log('list :', list);
  // }, [list]);

  useEffect(() => {
    if (!SearchText) {
      if (data) {
        // console.log('reset : ', data);
        setList(data);
      }
    } else {
      // Object.keys(data[0])?.map((key) => {
      //   if (key !== 'image') {
      const search = handleSearch(list, SearchText, 'name');
      if (search) {
        setList(search);
      } else {
        setList([]);
      }
    }

    // console.log(SearchText);
  }, [SearchText]);

  if (loading) {
    return (
      <View
        // m={'auto'}
        mt={40}
      >
        <Center>
          <Spinner />
        </Center>
      </View>
    );
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
    <PresenceTransition
      visible={open ? true : false}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 500,
        },
      }}
    >
      <ContainerStyled>
        <Center>
          <VStack
            position={'absolute'}
            left={{ base: 4, lg: 80 }}
            top={4}
          >
            <Button
              m={2}
              w={'20'}
              rounded={'lg'}
              variant={'unstyled'}
              background={COLORS.lightWhite}
              _pressed={{ background: COLORS.white }}
              _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}
              onPress={() => setOpen(false)}
            >
              Back
            </Button>
            {isRequired && (
              <Button
                m={2}
                w={'20'}
                rounded={'lg'}
                variant={'unstyled'}
                background={COLORS.primary}
                _pressed={{ background: COLORS.secondary }}
                _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.white }}
                onPress={() => handleClear(property)}
              >
                Clear
              </Button>
            )}
          </VStack>
          <HStack
            mt={{ base: '20%', lg: 20 }}
            ml={{ base: 32, lg: 0 }}
            mr={{ base: 6, lg: 0 }}
            justifyContent={'center'}
          >
            <Input
              value={SearchText}
              onChangeText={(val) => setSearchText(val)}
              height={{ base: 9, lg: 10 }}
              rounded={12}
              mx='2'
              placeholder='Search'
              fontSize={{ base: SIZES.medium, lg: SIZES.large }}
              w={{ base: 'full', lg: 500 }}
              backgroundColor='blueGray.100'
              _focus={{
                borderColor: 'white',
                backgroundColor: 'blueGray.200',
              }}
              InputLeftElement={
                <HStack mx={SPACING.small}>
                  <Icon
                    name='search'
                    size={ICON.base}
                    color={'gray'}
                  />
                </HStack>
              }
              InputRightElement={
                // clear && (
                <HStack mx={SPACING.small}>
                  <Button
                    variant={'unstyled'}
                    p={1}
                    onPress={clearSearch}
                  >
                    <Icon
                      name='close'
                      size={ICON.base}
                      color={'gray'}
                    />
                  </Button>
                </HStack>
                // )
              }
            />
          </HStack>
          <VStack
            justifyContent={'center'}
            alignItems={'center'}
            space={12}
            mt={20}
            mb={'48'}
            mx={{ base: 10, lg: 0 }}
          >
            <Text
              color={COLORS.tertiary}
              fontWeight={'bold'}
              fontSize={'lg'}
            >
              {title}
            </Text>
            {list.length > 0 ? (
              <FlatList
                data={list}
                w={{ base: 'sm', lg: 'lg' }}
                // showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Item name={item.name} />}
              />
            ) : (
              <Text> No data</Text>
            )}
          </VStack>
        </Center>
      </ContainerStyled>
    </PresenceTransition>
  );
}

export default DynamicSelectPage;
