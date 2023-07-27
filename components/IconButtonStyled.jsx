import React from 'react';
import IconStyled from './Icons';
import { Button, HStack } from 'native-base';
import TextStyled from './TextStyled';

function IconButtonStyled({ variant, icon, etc, OnPress, label, active }) {
  if (variant === 'contained' || variant === undefined) {
    switch (icon) {
      case 'search':
        return (
          <Button
            bg={'blueGray.100'}
            borderColor={'blueGray.300'}
            onPress={OnPress}
            _pressed={{ bg: 'transparent', opacity: 70 }}
          >
            <HStack rounded={'md'}>
              <IconStyled
                color={'#808080'}
                name={'search'}
              />
              {label && (
                <TextStyled
                  mx={1.5}
                  textStyle='body'
                  color={'blueGray.500'}
                  alignSelf='center'
                >
                  {label}
                </TextStyled>
              )}
              {etc}
            </HStack>
          </Button>
        );
      case 'clearFilter':
        return (
          <Button
            bg={'transparent'}
            onPress={OnPress}
            _pressed={{ bg: 'transparent', opacity: 70 }}
          >
            <HStack>
              <IconStyled
                color={active ? '#E6483F' : '#808080'}
                name={'circle-with-cross'}
              />
              {label && (
                <TextStyled
                  mx={1.5}
                  textStyle='body'
                  color={'blueGray.500'}
                  alignSelf='center'
                >
                  {label}
                </TextStyled>
              )}
            </HStack>
          </Button>
        );
      default:
        break;
    }
  }
  if (variant === 'outlined') {
    switch (icon) {
      case 'menu':
        break;

      default:
        break;
    }
  }
}

export default IconButtonStyled;
