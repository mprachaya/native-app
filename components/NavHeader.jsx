import { Button, HStack, Text, View } from 'native-base';
import React from 'react';
import { ChevronBackWard } from '../constants/icons';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavHeaderRight from './NavHeaderRight';

function NavHeader({ pageName, pageBackName, activeFunction, openAdd, openSort, openFilter, noHeader }) {
  const Navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  return (
    <View
      _android={{ pt: noHeader ? 12 : 0 }}
      _ios={{ pt: 12 }}
      pb={6}
      style={{ backgroundColor: 'white' }}
      shadow={1}
    >
      <HStack
        py={1.5}
        style={{ width: windowWidth }}
        justifyContent={'space-between'}
      >
        <HStack
          justifyContent={'center'}
          alignItems={'center'}
        >
          {!noHeader && (
            <Button
              onPress={() => Navigation.goBack()}
              p={1}
              variant={'unstyled'}
              w={pageName !== '' ? '40' : 'full'}
              justifyContent={'start'}
              // bg={'amber.400'}
            >
              <HStack
                ml={1}
                alignItems={'center'}
                w={windowWidth - 24}
                space={2}
              >
                <ChevronBackWard
                  color={'#267BFF'}
                  width={32}
                  height={32}
                />
                <Text
                  ml={-2}
                  my={1}
                  fontWeight={'semibold'}
                  letterSpacing={0.5}
                  color={'#267BFF'}
                >
                  {pageBackName}
                </Text>
              </HStack>
            </Button>
          )}

          {pageName !== '' && (
            <HStack
              justifyContent={'center'}
              alignItems={'center'}
              w={windowWidth}
              position={'absolute'}
              left={0}
              right={0}
              my={2}
            >
              <Text
                fontWeight={'semibold'}
                letterSpacing={0.5}
                fontSize={'md'}
              >
                {pageName}
              </Text>
            </HStack>
          )}
        </HStack>
        {activeFunction && (
          <NavHeaderRight
            openSort={openSort}
            openAdd={openAdd}
            openFilter={openFilter}
          />
        )}
      </HStack>
    </View>
  );
}

export default NavHeader;
