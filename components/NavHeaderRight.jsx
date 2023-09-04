import { Box, Button, ChevronLeftIcon, HStack, Text, View } from 'native-base';
import React from 'react';
import { AddNew, Filter, Sort } from '../constants/icons';
import { COLORS } from '../constants/theme';

function NavHeaderRight({ sortActive, filterActive, openAdd, openSort, openFilter }) {
  const iconColor = COLORS.primary;

  const OptionContainer = ({ filterName, handleOpen, children, active }) => (
    <Button
      ml={1}
      rounded={12}
      variant={'unstyled'}
      justifyContent={'center'}
      onPress={handleOpen}
      _pressed={{ bg: 'blueGray.200' }}
      bg={active !== undefined && active === filterName && 'blueGray.300'}
    >
      {children}
    </Button>
  );
  const OptionContainerAdd = ({ filterName, handleOpen, children, active }) => (
    <Button
      ml={1}
      rounded={12}
      variant={'unstyled'}
      justifyContent={'center'}
      onPress={handleOpen}
      _pressed={{ bg: 'blueGray.200' }}
    >
      {children}
    </Button>
  );

  return (
    <HStack
      // m={6}
      // _android={{ mr: 0, space: { base: 2, lg: 10 } }}
      h={12}
      _ios={{ mr: 0, space: { base: 2, lg: 6 } }}
      justifyContent={'flex-end'}
    >
      <OptionContainerAdd handleOpen={() => openAdd(true)}>
        <AddNew color={iconColor} />
      </OptionContainerAdd>
      <OptionContainer
        filterName={'sort'}
        handleOpen={() => openSort(true)}
        active={sortActive}
      >
        <Sort color={iconColor} />
      </OptionContainer>
      <OptionContainer
        filterName={'filter'}
        handleOpen={() => openFilter(true)}
        active={filterActive}
      >
        <Filter color={iconColor} />
      </OptionContainer>
    </HStack>
  );
}

export default NavHeaderRight;
