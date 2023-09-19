import { Box, Button, ChevronRightIcon, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

export default function ConnectionLinks({ Icon, name, links, navigateTo }) {
  const navigation = useNavigation();

  return links !== undefined ? (
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

      {Object.values(links)?.map((link, index) => (
        <HStack
          key={index}
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
              onPress={() => navigation.navigate(navigateTo, { connectName: link.parent })}
              _pressed={{ background: 'white' }}
              variant={'unstyled'}
              my={2}
            >
              <ChevronRightIcon />
            </Button>
          </HStack>
        </HStack>
      ))}
    </VStack>
  ) : (
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
          {0}
        </Text>
      </HStack>
    </VStack>
  );
}
