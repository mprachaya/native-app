import { Button, HStack, Image, InfoIcon, Text, View } from 'native-base';
import React from 'react';
import { ChevronBackWard } from '../constants/icons';
import { Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavHeaderRight from './NavHeaderRight';
import { COLORS } from '../constants/theme';

function NavHeader({ type, pageName, pageBackName, activeFunction, openAdd, openSort, openFilter, noHeader }) {
  const Navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  return (
    <View bg={'blueGray.100'}>
      <View
        borderBottomLeftRadius={'full'}
        _android={{ pt: noHeader ? 12 : 0, pb: 3 }}
        _ios={{ pt: 20, pb: 6 }}
        style={{ backgroundColor: COLORS.primary }}
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
                justifyContent={'flex-end'}
                alignItems={'center'}
                w={windowWidth}
                position={'absolute'}
                left={0}
                right={0}
                my={2}
                space={3}
              >
                <TouchableOpacity>
                  <InfoIcon color={'blueGray.600'} />
                </TouchableOpacity>
                <Text
                  textTransform='uppercase'
                  opacity={0.9}
                  mr={6}
                  color={COLORS.white}
                  fontWeight={'bold'}
                  letterSpacing={1}
                  fontSize={type === 'main' ? 'xl' : 'md'}
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
    </View>
  );
}

export default NavHeader;
