import {
  Badge,
  Box,
  Button,
  Center,
  CloseIcon,
  FlatList,
  Flex,
  HStack,
  Pressable,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import { SearchInput } from './Inputs';
import FadeTransition from './FadeTransition';
import { Dimensions, Keyboard } from 'react-native';

// import { SearchInput, FadeTransition } from '.';

const ContainerStyled = (props) => {
  return (
    <View
      w={{ base: '96', lg: 'full' }}
      h={props.Focus ? '600px' : '40px'}
      position='absolute'
      background={'blueGray.100'}
      zIndex={props.Focus ? 999 : 1}
      {...props}
    >
      {props.children}
    </View>
  );
};

function TextSearchDropdown({ allData, dataColumn, returnData, returnLength, handleClick }) {
  const [focus, setOnFocus] = useState(false);
  const [SearchText, setSearchText] = useState('');
  const [data, setData] = useState();
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleSearch = (dataList, searchText, key) => {
    // console.log(key);
    // if (dataList) {
    let tempData = dataList?.filter((item) => {
      return String(item[key]).toLowerCase().indexOf(String(searchText).toLowerCase()) > -1;
    });

    if (tempData.length > 0) {
      return tempData;
    } else {
      return false;
    }
  };

  const handleCloseClick = (name) => {
    handleClick(name);
    setOnFocus(false);
  };

  const clearSearch = () => {
    setSearchText('');
    setLoadingSearch(true);
    // returnData(false);
    // setOnFocus(false);
  };

  useEffect(() => {
    if (allData) {
      setData(allData);
    }
  }, [allData]);

  // useEffect(() => {

  // }, [SearchText]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // console.log('toggle');

      if (!SearchText && focus) {
        if (allData) {
          // console.log('reset ');
          setData(allData);
        }
      } else if (SearchText && focus) {
        // setOnFocus(true);
        setLoadingSearch(true);
        Object.keys(allData[0])?.map((key) => {
          if ((key !== 'image' && key === 'name') || key === 'customer' || key === 'status' || key === 'party') {
            const search = handleSearch(allData, SearchText, key);

            if (search) {
              // console.log('search');
              returnLength(search.length);
              setData(search);

              // console.log('setData', search);
            } else {
              // return false;
            }
          }
        });
      }

      // console.log(searchTerm);
      // Send Axios request here
    }, 200);
    if (SearchText) {
      setOnFocus(true);
    } else {
      setOnFocus(false);
    }
    return () => clearTimeout(delayDebounceFn);
  }, [SearchText]);

  useEffect(() => {
    if (loadingSearch) {
      setTimeout(() => {
        setLoadingSearch(false);
      }, 300);
    }
  }, [loadingSearch]);

  useEffect(() => {
    if (focus) {
      returnData(true);
    } else if (SearchText.length === 0 && !focus) {
      returnData(false);
    }
    // if (onFocus) {
    //   returnData(true);
    // } else {
    //   returnData(false);
    // }
  }, [focus]);

  return (
    <ContainerStyled Focus={focus}>
      <Center>
        <VStack
          m={6}
          justifyContent={'center'}
          // height={'100vh'}
        >
          <SearchInput
            // isFocused={focus}

            onChangeText={(val) => setSearchText(val)}
            onFocus={() => {
              // returnData(true);
              setOnFocus(true);
            }}
            onBlur={() => {
              // console.log('onBlur');
              if (SearchText.length > 0) {
              } else {
                // returnData(false);
                setOnFocus(false);
              }
            }}
            value={SearchText}
            clear={SearchText ? true : false}
            clearAction={() => clearSearch()}
          />
        </VStack>
        {focus && !loadingSearch ? (
          <VStack
            mt={4}
            // m={6}
            h={1000}
            bg={'blueGray.100'}
            // mx={{ base: 4 }}
            // w={{ base: '96', lg: 'full' }}
            position={'absolute'}
            top={50}
          >
            <FadeTransition animated={focus}>
              <FlatList
                w={'80'}
                mx={{ base: 0, lg: '30%' }}
                data={data}
                ListHeaderComponent={() => (
                  <View
                    w='full'
                    alignItems='flex-end'
                  >
                    <Button
                      w={24}
                      mr={2}
                      my={2}
                      rounded={'lg'}
                      bg='error.600'
                      _text={{ fontWeight: 'bold', letterSpacing: 1 }}
                      leftIcon={<CloseIcon />}
                      onPress={() => {
                        // returnData(false);
                        setOnFocus(false);
                        setSearchText('');
                      }}
                      _pressed={{ bg: 'error.800' }}
                    >
                      Close
                    </Button>
                  </View>
                )}
                renderItem={({ item }) => (
                  <Pressable
                    m={1}
                    onPress={() => handleCloseClick(item.name)}
                  >
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
                          px='4'
                          py='3'
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
                            {item.creation && (
                              <Text
                                fontSize={10}
                                color='coolGray.800'
                              >
                                {item.creation.slice(0, 10)}
                              </Text>
                            )}
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
        ) : (
          loadingSearch && (
            <Box m={'25%'}>
              <Spinner />
            </Box>
          )
        )}
      </Center>
    </ContainerStyled>
  );
}

export default TextSearchDropdown;
