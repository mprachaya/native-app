import { Button, Center, Circle, VStack, View } from 'native-base';
import React from 'react';
import { COLORS } from '../constants/theme';
import TextStyled from './TextStyled';

function MenuIcon({ Icon, menuLabel, onPress }) {
  return (
    <View
      width={'24'}
      height={'24'}
    >
      <Button
        variant={'unstyled'}
        onPress={onPress}
      >
        <VStack>
          <Circle
            background={'white'}
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
      </Button>
    </View>
  );
}

export default MenuIcon;
