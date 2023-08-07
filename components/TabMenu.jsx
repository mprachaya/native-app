import { Box, Button, HStack } from 'native-base';
import React from 'react';
import { COLORS } from '../constants/theme';
import TextStyled from './TextStyled';
import { Search } from '../constants/icons';

function TabMenu() {
  return (
    <Box
      bottom={0}
      position={'absolute'}
      w={'full'}
      h={'32'}
      bg={COLORS.primary}
      roundedTop={20}
      justifyContent={'center'}
    >
      <HStack justifyContent={'space-around'}>
        <Button
          variant={'unstyled'}
          w={'16'}
          h={'16'}
        >
          <Search
            width={32}
            height={32}
            color={'#5CA1D4'}
          />
        </Button>
        <TextStyled color={'white'}>Modules</TextStyled>
        <TextStyled color={'white'}>Home</TextStyled>
        <TextStyled color={'white'}>Bell</TextStyled>
        <TextStyled color={'white'}>Account Settings</TextStyled>
      </HStack>
    </Box>
  );
}

export default TabMenu;
