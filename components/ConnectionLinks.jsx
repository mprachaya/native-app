import { Box, Button, ChevronRightIcon, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { COLORS } from '../constants/theme';

export default function ConnectionLinks({ Icon, name, count, links }) {
  return (
    <VStack
      m={0}
      py={6}
      space={2}
      shadow={1}
      rounded={'lg'}
      bg={'white'}
      justifyContent={'start'}
    >
      <HStack
        px={6}
        space={3}
        w={'300'}
        justifyContent={'space-between'}
      >
        <HStack space={6}>
          {Icon}
          <Text
            fontWeight={'bold'}
            color={COLORS.primary}
          >
            {name}
          </Text>
        </HStack>
        <Text
          mr={4}
          fontWeight={'semibold'}
          color={COLORS.gray2}
        >
          {links?.length}
        </Text>
      </HStack>
      {Object.values(links)?.map((link) => (
        <HStack
          key={link.parent}
          bg={COLORS.lightWhite}
          justifyContent={'start'}
          mt={2}
          px={6}
        >
          <HStack
            py={3.5}
            w='250'
            justifyContent={'space-between'}
          >
            <VStack justifyContent={'center'}>
              <Text fontSize={'xs'}>{link.parent}</Text>
              <Text
                fontSize={'xs'}
                color={COLORS.gray}
              >
                {link.transaction_date}
              </Text>
            </VStack>
            <Button
              _pressed={{ background: COLORS.white }}
              variant={'unstyled'}
              my={2}
            >
              <ChevronRightIcon />
            </Button>
          </HStack>
        </HStack>
      ))}
    </VStack>
  );
}
