import { CheckIcon, Select } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function StaticSelect({ label, menus, navigateName, id }) {
  const navigation = useNavigation();
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
      // onValueChange={() => navigation.replace(navigateName, { CreateFrom: id })}
      onValueChange={() => console.log('Create Sales Invoice from ' + id)}
    >
      {Object.values(menus)?.map((menu) => (
        <Select.Item
          label={menu.label}
          value={menu.value}
        />
      ))}
    </Select>
  );
}
