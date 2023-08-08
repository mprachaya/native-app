import { Button, Center, HStack, Text, View } from 'native-base';
import React, { useState } from 'react';
import { COLORS } from '../constants/theme';
import { AccountSettings, Home, Modules, Notification, Search } from '../constants/icons';

function TabMenu() {
  const activeColor = COLORS.tertiary;
  const inactiveColor = COLORS.gray2;

  const [activeMenu, setActiveMenu] = useState('modules');

  return (
    <View
      bottom={0}
      position={'absolute'}
      w={'full'}
      h={'20'}
      bg={COLORS.primary}
      roundedTop={20}
      justifyContent={'center'}
      px={4}
    >
      <HStack
        justifyContent={'space-around'}
        space={12}
      >
        <Center>
          <Button
            variant={'unstyled'}
            w={'32'}
            h={'12'}
          >
            <Search
              width={32}
              height={32}
              color={inactiveColor}
            />
          </Button>
        </Center>
        <Center>
          <Button
            // onPress={() => setActiveMenu('modules')}
            variant={'unstyled'}
            w={'32'}
            h={'10'}
          >
            <Modules
              width={32}
              height={32}
              color={activeMenu === 'modules' ? activeColor : inactiveColor}
            />
          </Button>
          <Text color={activeMenu === 'modules' ? activeColor : inactiveColor}>modules</Text>
        </Center>
        <Center>
          <Button
            // onPress={() => setActiveMenu('home')}
            variant={'unstyled'}
            w={'32'}
            h={'10'}
          >
            <Home
              width={32}
              height={32}
              color={activeMenu === 'home' ? activeColor : inactiveColor}
            />
          </Button>
          <Text color={activeMenu === 'home' ? activeColor : inactiveColor}>home</Text>
        </Center>
        <Center>
          <Button
            // onPress={() => setActiveMenu('notification')}
            variant={'unstyled'}
            w={'32'}
            h={'10'}
          >
            <Notification
              width={32}
              height={32}
              color={activeMenu === 'notification' ? activeColor : inactiveColor}
            />
          </Button>
          <Text color={activeMenu === 'notification' ? activeColor : inactiveColor}>bell</Text>
        </Center>
        <Center>
          <Button
            // onPress={() => setActiveMenu('account-settings')}
            variant={'unstyled'}
            w={'32'}
            h={'10'}
          >
            <AccountSettings
              width={32}
              height={32}
              color={activeMenu === 'account-settings' ? activeColor : inactiveColor}
            />
          </Button>
          <Text color={activeMenu === 'account-settings' ? activeColor : inactiveColor}>home</Text>
        </Center>
      </HStack>
    </View>
  );
}

export default TabMenu;
