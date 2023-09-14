import { CheckIcon, Select } from 'native-base';
import React from 'react';

export default function StaticSelect({ label }) {
  return (
    <Select
      dropdownIcon={true}
      textAlign={'center'}
      borderWidth={0}
      m={2}
      w={'24'}
      fontWeight={'bold'}
      letterSpacing={0.75}
      fontSize={'sm'}
      rounded={'xl'}
      placeholder={label}
      accessibilityLabel='Order Type'
      _selectedItem={{
        bg: 'blueGray.200',
        endIcon: <CheckIcon color={'blueGray.400'} />,
      }}
      // onValueChange={(itemValue) => setFilterState((pre) => ({ ...pre, order_type: itemValue }))}
    >
      <Select.Item
        label='Sales'
        value='Sales'
      />

      <Select.Item
        label='Maintenance'
        value='Maintenance'
      />
      <Select.Item
        label='Shopping Cart'
        value='Shopping Cart'
      />
    </Select>
  );
}
