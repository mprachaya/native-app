import { Box, Button, ChevronLeftIcon, ChevronRightIcon, HStack, Text } from 'native-base';
import React, { useCallback, useMemo, useState } from 'react';
import TextStyled from './TextStyled';

function Pagination({ total }) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useMemo(() => {
    setTotalPage(total);
  }, [total]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage((page) => page - 1);
    } else {
      return false;
    }
  }, [page]);

  const nextPage = useCallback(() => {
    if (page < totalPage) {
      setPage((page) => page + 1);
    } else {
      return false;
    }
  }, [page]);

  return (
    <HStack
      mx={{ base: 6 }}
      justifyContent={'flex-end'}
    >
      <HStack
        w={{ base: 'full', lg: '64' }}
        space={6}
        bg={{ base: 'blueGray.50', lg: 'blueGray.100' }}
        justifyContent={'center'}
      >
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
          onPress={prevPage}
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
          <Box
            my={4}
            rounded={6}
            h={10}
            justifyContent={'center'}
          >
            <TextStyled
              fontWeight={'semibold'}
              letterSpacing={2}
            >
              ...{'   ' + total}
            </TextStyled>
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
          onPress={nextPage}
        >
          <ChevronRightIcon
            size='4'
            my={3}
            color='blueGray.400'
          />
        </Button>
      </HStack>
    </HStack>
  );
}

export default Pagination;
