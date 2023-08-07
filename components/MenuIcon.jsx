import { Button, Center, Circle, VStack } from 'native-base';
import React from 'react';
import { COLORS } from '../constants/theme';
import TextStyled from './TextStyled';

function MenuIcon({ Icon, menuLabel }) {
  return (
    <Button
      variant={'unstyled'}
      w={'16'}
      h={'16'}
    >
      <VStack>
        <Circle
          background={'white'}
          size={'md'}
        >
          {Icon}
        </Circle>
        <Center my={2}>
          <TextStyled fontSize={16}>{menuLabel}</TextStyled>
        </Center>
      </VStack>
    </Button>
  );
}

export default MenuIcon;
