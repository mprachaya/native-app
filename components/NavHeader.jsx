import { Box, Button, HStack, Text, View } from 'native-base';
import React from 'react';
import { ChevronBackWard } from '../constants/icons';
import { COLORS } from '../constants/theme';
import { Dimensions, StyleSheet } from 'react-native';
import TextStyled from './TextStyled';

// const styles = StyleSheet.create({
//   labelCenter: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//   },
// });

function NavHeader({ navigation, pageName, pageBackName }) {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View style={{ backgroundColor: 'white' }}>
      <HStack
        my={1.5}
        style={{ height: 30, width: windowWidth }}
        justifyContent={'space-between'}
      >
        <HStack
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Button
            ml={-1.5}
            variant={'unstyled'}
            w={pageName !== '' ? '16' : 'full'}
            justifyContent={'start'}
          >
            <HStack
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
          {pageName !== '' && (
            <HStack
              justifyContent={'center'}
              alignItems={'center'}
              w={windowWidth}
              position={'absolute'}
              left={0}
              right={0}
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
      </HStack>
    </View>
  );
}

export default NavHeader;
