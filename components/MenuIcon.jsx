import { Circle } from 'native-base';
import React from 'react';
import { COLORS } from '../constants/theme';

function MenuIcon({ Icon }) {
  return (
    <Circle
      background={'white'}
      size={'md'}
    >
      {Icon}
    </Circle>
  );
}

export default MenuIcon;
