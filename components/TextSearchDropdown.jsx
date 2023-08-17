import { Badge, Box, Center, FlatList, Flex, HStack, Pressable, Text, VStack, View } from 'native-base';
import React, { useState, useEffect } from 'react';

import { SearchInput, FadeTransition } from '.';

const ContainerStyled = (props) => {
  return (
    <View
      w={{ base: '96', lg: 'full' }}
      h={props.Focus ? '600px' : ''}
      position='absolute'
      background={'blueGray.100'}
      zIndex={props.Focus ? 999 : 1}
      {...props}
    >
      {props.children}
    </View>
  );
};

function TextSearchDropdown({ allData, dataColumn, returnData, returnLength }) {
  const [onFocus, setOnFocus] = useState(false);
  const [SearchText, setSearchText] = useState('');
  const [data, setData] = useState();
  // const {
  //   data: allData,
  //   setData: setAllData,
  //   loading,
  //   error,
  // } = useFetch(url, {
  //   headers: {
  //     Authorization: token,
  //   },
  // });
  // 1: first badge 2: second badge 3: main data
  // const dataColumn = ['customer_group', 'territory', 'name'];

  const handleSearch = (dataList, searchText, key) => {
    // console.log(key);
    // if (dataList) {
    let tempData = dataList?.filter((item) => {
      return String(item[key]).toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
    // if (tempData)
    // setList(tempData);
    if (tempData.length > 0) {
      // console.log('temp: ', tempData);
      return tempData;
    } else {
      return false;
    }
    // console.log('search: ', tempData);
    // }
  };

  const clearSearch = () => {
    setSearchText('');
    returnData(false);
    setOnFocus(false);
    // console.log('clear!');
  };

  useEffect(() => {
    if (allData) {
      setData(allData);
    }
  }, [allData]);

  useEffect(() => {
    if (!SearchText && onFocus) {
      // setOnFocus(false);
      if (allData) {
        console.log('reset : ', allData);
        setData(allData);
        // returnData(false);
        // setOnFocus(false);
      }
    } else if (SearchText && onFocus) {
      setOnFocus(true);
      Object.keys(allData[0])?.map((key) => {
        if (key !== 'image') {
          const search = handleSearch(data, SearchText, key);
          if (search) {
            // console.log(key);
            setData(search);
            returnLength(search.length);
          } else {
          }
        }
      });
    } else if (SearchText === '') {
      returnData(false);
      setOnFocus(false);
    }

    // console.log(SearchText);
  }, [SearchText]);

  useEffect(() => {
    if (onFocus) {
      returnData(true);
    } else if (SearchText.length === 0 && !onFocus) {
      returnData(false);
    }
  }, [onFocus]);

  return (
    // <SafeAreaView>
    <ContainerStyled Focus={onFocus}>
      <Center>
        <VStack
          m={6}
          justifyContent={'center'}
          height={'100vh'}
        >
          <SearchInput
            onChangeText={(val) => setSearchText(val)}
            onFocus={() => setOnFocus(true)}
            onBlur={() => SearchText.length === 0 && setOnFocus(false)}
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
            <FadeTransition animated={onFocus}>
              <FlatList
                h={500}
                mx={{ base: 4, lg: '30%' }}
                data={data}
                renderItem={({ item }) => (
                  <Pressable m={1}>
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <Box
                          zIndex={999}
                          mb={2}
                          bg={isPressed ? 'coolGray.200' : isHovered ? 'blueGray.200' : 'blueGray.100'}
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
                          <HStack justifyContent='space-between'>
                            <HStack
                              w={{ base: '220px', lg: '72' }}
                              flexWrap={'wrap'}
                              alignItems='center'
                              space={1}
                            >
                              <Badge
                                mb={0.5}
                                colorScheme='darkBlue'
                                _text={{
                                  color: 'white',
                                }}
                                variant='solid'
                                rounded='4'
                              >
                                {item[dataColumn[0]]}
                              </Badge>

                              <Badge
                                mb={0.5}
                                colorScheme='info'
                                _text={{
                                  color: 'white',
                                }}
                                variant='solid'
                                rounded='4'
                              >
                                {item[dataColumn[1]]}
                              </Badge>
                            </HStack>

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
                            {item[dataColumn[2]]}
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
            </FadeTransition>
          </VStack>
        )}
      </Center>
    </ContainerStyled>
    // </SafeAreaView>
  );
}

export default TextSearchDropdown;
