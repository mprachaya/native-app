import { Button, Center, HStack, Text, View } from 'native-base';
import React, { useState } from 'react';
import { COLORS } from '../constants/theme';
import { AccountSettings, Home, Modules, Notification, Search } from '../constants/icons';
import { useNavigation } from '@react-navigation/native';

function TabMenu() {
  const activeColor = COLORS.tertiary;
  const inactiveColor = COLORS.gray2;

  const [activeMenu, setActiveMenu] = useState('modules');

  const navigation = useNavigation();

  const handleNavigate = (path, activeMenu) => {
    const checkCurrent = navigation.getState();
    if (checkCurrent.routes[0].name !== path) {
      setActiveMenu(activeMenu);
      navigation.replace(path);
    }
  };

  return (
    <View
      bottom={0}
      position={'absolute'}
      w={'full'}
      h={'32'}
      bg={COLORS.primary}
      roundedTop={20}
      justifyContent={'center'}
      px={4}
      zIndex={999}
    >
      <HStack
        mx={2.5}
        justifyContent={'space-around'}
        space={12}
      >
        <Center>
          {/* <Button
            _pressed={{ background: COLORS.secondary }}
            variant={'unstyled'}
            w={'79.5px'}
            h={'16'}
          >
            <View
              mx={3}
              my={1.5}
            >
              <Search
                width={26}
                height={26}
                color={inactiveColor}
              />
            </View>
            <Text color={inactiveColor}>search</Text>
          </Button> */}
        </Center>
        <Center>
          <Button
            onPress={() => handleNavigate('Home', 'modules')}
            _pressed={{ background: 'blueGray.800' }}
            variant={'unstyled'}
            rounded={'2xl'}
            w={'79.5px'}
            h={'16'}
          >
            <View
              mx={3}
              my={1.5}
            >
              <Modules
                width={26}
                height={26}
                color={activeMenu === 'modules' ? activeColor : inactiveColor}
              />
            </View>
            <Text color={activeMenu === 'modules' ? activeColor : inactiveColor}>modules</Text>
          </Button>
        </Center>
        <Center>
          <Button
            justifyContent={'center'}
            // onPress={() => handleNavigate('Home', 'modules')}
            _pressed={{ background: 'blueGray.800' }}
            variant={'unstyled'}
            rounded={'2xl'}
            w={'79.5px'}
            h={'16'}
          >
            <View
              mx={3}
              my={1}
            >
              <Home
                width={32}
                height={32}
                color={activeMenu === 'home' ? activeColor : inactiveColor}
              />
            </View>
            <Text
              textAlign={'center'}
              color={activeMenu === 'home' ? activeColor : inactiveColor}
            >
              home
            </Text>
          </Button>
        </Center>
        <Center>
          <Button
            justifyContent={'center'}
            // onPress={() => handleNavigate('Home', 'modules')}
            _pressed={{ background: 'blueGray.800' }}
            variant={'unstyled'}
            rounded={'2xl'}
            w={'79.5px'}
            h={'16'}
          >
            <View
              mx={3}
              my={1}
            >
              <Notification
                width={32}
                height={32}
                color={activeMenu === 'notification' ? activeColor : inactiveColor}
              />
            </View>
            <Text
              textAlign={'center'}
              color={activeMenu === 'notification' ? activeColor : inactiveColor}
            >
              Notify
            </Text>
          </Button>
        </Center>
        <Center>
          <Button
            justifyContent={'center'}
            // onPress={() => handleNavigate('Home', 'modules')}
            _pressed={{ background: 'blueGray.800' }}
            variant={'unstyled'}
            rounded={'2xl'}
            w={'79.5px'}
            h={'16'}
          >
            <View
              mx={3}
              my={1}
            >
              <AccountSettings
                width={32}
                height={32}
                color={activeMenu === 'account-settings' ? activeColor : inactiveColor}
              />
            </View>
            <Text
              textAlign={'center'}
              color={activeMenu === 'account-settings' ? activeColor : inactiveColor}
            >
              home
            </Text>
          </Button>
        </Center>
      </HStack>
    </View>
  );
}

export default TabMenu;
