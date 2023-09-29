import { Button, Center, Circle, VStack, View } from 'native-base';
import React from 'react';
import { COLORS } from '../constants/theme';
import TextStyled from './TextStyled';
import { TouchableOpacity } from 'react-native';

function MenuIcon({ Icon, menuLabel, onPress, active }) {
  return (
    <TouchableOpacity
      width={'24'}
      height={'24'}
      variant={'unstyled'}
      onPress={onPress}
    >
      <VStack>
        <Circle
          background={!active ? 'white' : 'blueGray.200'}
          size={'md'}
        >
          {Icon}
        </Circle>
      </VStack>
      <Center my={1}>
        <TextStyled
          textAlign={'center'}
          fontSize={{ base: 12, lg: 16 }}
        >
          {menuLabel}
        </TextStyled>
      </Center>
    </TouchableOpacity>
  );
}

export default MenuIcon;
