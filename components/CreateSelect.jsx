import { CheckIcon, Select } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function StaticSelect({ label, menus, id, defaultData }) {
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
      onValueChange={(value) => navigation.navigate(value, { CreateFrom: id, defaultData: defaultData })}
    >
      {Object.values(menus)?.map((menu) => (
        <Select.Item
          key={menu.value}
          label={menu.label}
          value={menu.value}
        />
      ))}
    </Select>
  );
}
