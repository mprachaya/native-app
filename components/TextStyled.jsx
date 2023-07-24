import { Text } from 'native-base';
import React from 'react';

function TextStyled(props) {
  return (
    <Text
      m={2}
      fontWeight={'light'}
      fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
      {...props}
    >
      {props.children}
    </Text>
  );
}

export default TextStyled;
