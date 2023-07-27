import { Button } from 'native-base';
import React from 'react';

const primary = 'blue.400';
const primary_active = 'blue.300';

function ButtonStyled({ label, variant, handleClick }) {
  if (variant === undefined || variant === '' || variant === 'contained')
    return (
      <Button
        {...styles['primary']}
        onPress={() => handleClick()}
      >
        {label}
      </Button>
    );
  if (variant === 'outlined')
    return (
      <Button
        {...styles['outlined']}
        onPress={() => handleClick()}
      >
        {label}
      </Button>
    );
}
const styles = {
  primary: {
    minWidth: 16,
    rounded: 'md',
    paddingLeft: 3.5,
    paddingRight: 3.5,
    bg: primary,
    margin: 1,
    _pressed: {
      bg: primary_active,
    },
  },
  outlined: {
    minWidth: 16,
    rounded: 'md',
    paddingLeft: 3.5,
    paddingRight: 3.5,
    borderColor: 'white',
    bg: 'transparent',
    _text: {
      color: 'blueGray.500',
    },
    borderColor: 'blueGray.400',
    margin: 1,
    _pressed: { bg: 'blueGray.100' },
  },
};

export default ButtonStyled;
