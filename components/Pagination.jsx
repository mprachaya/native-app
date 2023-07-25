import { Box, Button, ChevronLeftIcon, ChevronRightIcon, HStack, Text } from 'native-base';
import React from 'react';
import TextStyled from './TextStyled';

function Pagination() {
  return (
    <HStack
      space={6}
      p={2}
      justifyContent={{ base: 'center', lg: 'flex-end' }}
    >
      <Button
        my={4}
        rounded={'full'}
        borderWidth={2}
        borderColor={'transparent'}
        backgroundColor={'transparent'}
        _pressed={{
          borderWidth: 2,
          borderColor: 'blue.500',
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
            0
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
            ... 12
          </TextStyled>
        </Box>
      </HStack>
      <Button
        my={4}
        rounded={'full'}
        backgroundColor={'transparent'}
        borderWidth={2}
        borderColor={'transparent'}
        _pressed={{
          borderWidth: 2,
          borderColor: 'blue.500',
        }}
      >
        <ChevronRightIcon
          size='4'
          my={3}
          color='blueGray.400'
        />
      </Button>
    </HStack>
  );
}

export default Pagination;
