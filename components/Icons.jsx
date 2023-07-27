import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

function IconStyled({ name, size, color }) {
  if (name === 'search') {
    return (
      <Icon
        name={'magnifying-glass'}
        size={size || 24}
        color={color}
      />
    );
  }
  if (name === 'circle-with-cross') {
    return (
      <Icon
        name={'circle-with-cross'}
        size={size || 24}
        color={color}
      />
    );
  }
}
export default IconStyled;
