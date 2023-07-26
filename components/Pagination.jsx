import { Box, Button, ChevronLeftIcon, ChevronRightIcon, HStack, Text } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import TextStyled from './TextStyled';

function Pagination({ rowNumber, setCurrentPage, perPage, setHotReload }) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useMemo(() => {
    setTotalPage(Math.ceil(rowNumber / perPage));
  }, [rowNumber]);

  useEffect(() => {
    setCurrentPage(page);
    setHotReload(true);
  }, [page]);

  return (
    <HStack
      mx={{ base: 6 }}
      justifyContent={'flex-end'}
    >
      {rowNumber !== 0 && (
        <HStack
          w={{ base: 'full', lg: '64' }}
          space={4}
          bg={{ base: 'blueGray.50', lg: 'blueGray.100' }}
          justifyContent={'center'}
        >
          <TextStyled
            alignSelf={'center'}
            letterSpacing={0.5}
            TextStyled={'body'}
          >
            items {page === 1 && page + ' ' + '-' + ' ' + Math.ceil(perPage)}
            {page !== 1 && page !== totalPage && (page - 1) * perPage + ' ' + '-' + ' ' + perPage * page}
          </TextStyled>
          <Button
            h={12}
            rounded={6}
            borderWidth={2}
            alignSelf={'center'}
            borderColor={'transparent'}
            backgroundColor={'transparent'}
            _pressed={{
              borderWidth: 2,
              borderColor: 'blue.300',
              bg: 'blue.100',
            }}
            onPress={() => {
              if (page < 2) {
              } else {
                setPage((page) => page - 1);
              }
            }}
          >
            <ChevronLeftIcon
              size='4'
              color='blueGray.400'
            />
          </Button>
          <HStack
            space={4}
            my={4}
          >
            <HStack>
              {page !== totalPage && (
                <Box
                  my={4}
                  rounded={6}
                  px={4}
                  h={10}
                  bg={'blue.500'}
                  justifyContent={'center'}
                >
                  <TextStyled
                    color={'white'}
                    fontWeight={'semibold'}
                  >
                    {page}
                  </TextStyled>
                </Box>
              )}
              {page !== totalPage && totalPage !== 1 && (
                <TextStyled
                  alignSelf='center'
                  fontWeight={'semibold'}
                  letterSpacing={2}
                >
                  {'   ...  '} {totalPage}
                </TextStyled>
              )}
            </HStack>
            <Box
              my={4}
              rounded={6}
              h={10}
              justifyContent={'center'}
            >
              {page === totalPage && Math.ceil(rowNumber / perPage) !== totalPage && totalPage !== 1 && (
                <Box
                  my={4}
                  rounded={6}
                  px={4}
                  h={10}
                  bg={'blue.500'}
                  justifyContent={'center'}
                >
                  <TextStyled
                    color={'white'}
                    fontWeight={'semibold'}
                  >
                    {totalPage}
                  </TextStyled>
                </Box>
              )}
              {Math.ceil(rowNumber / perPage) === totalPage && totalPage === 1 && (
                <TextStyled
                  pr={4}
                  fontWeight={'semibold'}
                  letterSpacing={2}
                >
                  1
                </TextStyled>
              )}
              <HStack>
                {page === totalPage && totalPage !== 1 && (
                  <TextStyled
                    alignSelf='center'
                    fontWeight={'semibold'}
                    letterSpacing={2}
                  >
                    {'  1   ... '}
                  </TextStyled>
                )}
                {page === totalPage && totalPage !== 1 && (
                  <Box
                    my={4}
                    rounded={6}
                    px={4}
                    h={10}
                    bg={'blue.500'}
                    justifyContent={'center'}
                  >
                    <TextStyled
                      color={'white'}
                      fontWeight={'semibold'}
                    >
                      {totalPage}
                    </TextStyled>
                  </Box>
                )}
              </HStack>
            </Box>
          </HStack>
          <Button
            h={12}
            alignSelf={'center'}
            backgroundColor={'transparent'}
            borderWidth={2}
            borderColor={'transparent'}
            _pressed={{
              borderWidth: 2,
              borderColor: 'blue.300',
              bg: 'blue.100',
            }}
            onPress={() => {
              if (page + 1 > totalPage) {
              } else {
                setPage((page) => page + 1);
              }
            }}
          >
            <ChevronRightIcon
              size='4'
              my={3}
              color='blueGray.400'
            />
          </Button>
        </HStack>
      )}
    </HStack>
  );
}

export default Pagination;
