import {
  Badge,
  Box,
  Center,
  FlatList,
  Flex,
  HStack,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { useState, useMemo } from 'react';

import { SafeAreaView } from 'react-native';
import { SearchInput } from '../components';
import { Platform } from 'react-native';
import useFetch from '../hooks/useFetch';

const ContainerStyled = (props) => {
  return (
    <View
      height={'full'}
      bg={'blueGray.50'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function TextSearchDropdown() {
  const [onFocus, setOnFocus] = useState(false);
  const [SearchText, setSearchText] = useState('');
  const [allData, setAllData] = useState([]);
  const {
    data: customerData,
    setData: setCustomerData,
    loading,
    error,
  } = useFetch(
    'http://111.223.38.20/api/resource/Customer?fields=["name","creation","modified","customer_name","customer_type","customer_group","territory","image"]',
    {
      headers: {
        Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa',
      },
    }
  );
  const handleSearch = (dataList, setList, searchText, key) => {
    let tempData = dataList.filter((item) => {
      return item[key].toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
    setList(tempData);
    console.log(tempData);
  };

  const clearSearch = () => {
    setSearchText('');
    console.log('clear!');
  };

  useMemo(() => {
    if (customerData.length !== 0) {
      setAllData(customerData);
      console.log('temp:', customerData);
    }
  }, [loading]);

  useMemo(() => {
    if (!SearchText && allData) {
      setOnFocus(false);
      console.log('reset : ', allData);
      setCustomerData(allData);
    } else {
      setOnFocus(true);
      handleSearch(customerData, setCustomerData, SearchText, 'name');
    }

    console.log(SearchText);
  }, [SearchText]);

  return (
    <SafeAreaView>
      <ContainerStyled>
        <Center>
          <VStack
            m={6}
            justifyContent={'center'}
            height={'100vh'}
          >
            <SearchInput
              onChangeText={(val) => setSearchText(val)}
              // onFocus={() => setOnFocus(true)}
              value={SearchText}
              clear={SearchText ? true : false}
              clearAction={() => clearSearch()}
            />
          </VStack>
          {onFocus && (
            <VStack
              m={6}
              // mx={{ base: 4 }}
              w={{ base: '96', lg: 'full' }}
              position={'absolute'}
              top={50}
            >
              <FlatList
                mx={{ base: 4, lg: '30%' }}
                data={customerData}
                renderItem={({ item }) => (
                  <Pressable
                    m={1}
                    // onPress={() => setOnFocus(false)}
                  >
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <Box
                          mb={2}
                          bg={isPressed ? 'coolGray.200' : isHovered ? 'coolGray.200' : 'coolGray.100'}
                          style={{
                            transform: [
                              {
                                scale: isPressed ? 0.99 : 1,
                              },
                            ],
                          }}
                          p='5'
                          rounded='12'
                          borderWidth='1'
                          borderColor='coolGray.300'
                        >
                          <HStack alignItems='center'>
                            <Badge
                              colorScheme='darkBlue'
                              _text={{
                                color: 'white',
                              }}
                              variant='solid'
                              rounded='4'
                            >
                              {item.customer_group}
                            </Badge>
                            <Spacer />
                            <Text
                              fontSize={10}
                              color='coolGray.800'
                            >
                              {item.creation.slice(0, 16)}
                            </Text>
                          </HStack>
                          <Text
                            color='coolGray.800'
                            mt='3'
                            fontWeight='medium'
                            fontSize='xl'
                          >
                            {item.name}
                          </Text>

                          <Flex>
                            {isFocused ? (
                              <Text
                                mt='2'
                                fontSize={12}
                                fontWeight='medium'
                                textDecorationLine='underline'
                                color='darkBlue.600'
                                alignSelf='flex-start'
                              >
                                Read More
                              </Text>
                            ) : (
                              <Text
                                mt='2'
                                fontSize={12}
                                fontWeight='medium'
                                color='darkBlue.600'
                              >
                                Read More
                              </Text>
                            )}
                          </Flex>
                        </Box>
                      );
                    }}
                  </Pressable>
                )}
              />
            </VStack>
          )}
        </Center>
      </ContainerStyled>
    </SafeAreaView>
  );
}

export default TextSearchDropdown;
