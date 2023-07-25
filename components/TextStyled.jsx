import { Text } from 'native-base';
import React from 'react';

function TextStyled(props) {
  return (
    <Text
      lineHeight={0}
      fontWeight={'light'}
      fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }}
      {...props}
    >
      {props.children}
    </Text>
  );
}

export default TextStyled;
