import { Button, CheckIcon, Select, Text, View } from 'native-base';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';

export default function StaticSelect({ label, menus, id, defaultData }) {
  const navigation = useNavigation();
  const [selectValue, setSelectValue] = useState('');
  const isFocused = useIsFocused();

  useMemo(() => {
    setSelectValue('');
  }, [isFocused]);

  return (
    <View position={'relative'}>
      <Select
        selectedValue={selectValue}
        style={{ display: selectValue !== '' && 'none' }}
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
        onValueChange={(value) => {
          navigation.navigate(value, { CreateFrom: id, defaultData: defaultData });
          setSelectValue(value);
        }}
      >
        {Object.values(menus)?.map((menu) => (
          <Select.Item
            key={menu.value}
            label={menu.label}
            value={menu.value}
          />
        ))}
      </Select>
      {selectValue !== '' && (
        <Text
          position={'absolute'}
          letterSpacing={0.75}
          color={'gray.400'}
          fontWeight={'bold'}
          fontSize={'sm'}
          pl={0.5}
          ml={7}
          m={3.5}
          w={'24'}
        >
          Create
        </Text>
      )}
    </View>
  );
}
