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
    const currentRoute = checkCurrent.routes.length - 1;
    // console.log(checkCurrent.routes[currentRoute - 1].name);
    if (checkCurrent.routes[currentRoute].name !== path) {
      setActiveMenu(activeMenu);
      navigation.navigate(path);
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
        <Center></Center>
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
              account
            </Text>
          </Button>
        </Center>
      </HStack>
    </View>
  );
}

export default TabMenu;
