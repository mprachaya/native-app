import { Box, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { COLORS } from '../constants/theme';

export default function ConnectionLinks({ Icon, name, count }) {
  return (
    <VStack
      px={4}
      h={'24'}
      bg={'white'}
      justifyContent={'center'}
      rounded={'lg'}
      shadow={1}
    >
      <HStack justifyContent={'space-between'}>
        <HStack
          ml={4}
          space={3}
        >
          {Icon}
          <Text
            fontWeight={'bold'}
            color={COLORS.primary}
          >
            {name}
          </Text>
        </HStack>
        <Text
          mr={6}
          fontWeight={'semibold'}
          color={COLORS.gray2}
        >
          {count}
        </Text>
      </HStack>
    </VStack>
  );
}
