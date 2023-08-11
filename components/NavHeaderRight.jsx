import { Box, Button, HStack } from 'native-base';
import React from 'react';
import { AddNew, Filter, Sort } from '../constants/icons';
import { COLORS } from '../constants/theme';

function NavHeaderRight({ openAdd, openSort, openFilter }) {
  const iconColor = COLORS.primary;

  const OptionContainer = ({ handleOpen, children }) => (
    <Button
      variant={'unstyled'}
      justifyContent={'center'}
      onPress={handleOpen}
    >
      {children}
    </Button>
  );

  return (
    <HStack
      // mr={2}
      _android={{ mr: 0, space: { base: 2, lg: 10 } }}
      _ios={{ mr: 0, space: { base: 2, lg: 12 } }}
    >
      <OptionContainer handleOpen={() => openAdd(true)}>
        <AddNew color={iconColor} />
      </OptionContainer>
      <OptionContainer handleOpen={() => openSort(true)}>
        <Sort color={iconColor} />
      </OptionContainer>
      <OptionContainer handleOpen={() => openFilter(true)}>
        <Filter color={iconColor} />
      </OptionContainer>
    </HStack>
  );
}

export default NavHeaderRight;
