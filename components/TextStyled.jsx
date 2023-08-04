import { Text } from 'native-base';
import React from 'react';

function TextStyled(props) {
  if (props.textStyle === 'header') {
    return (
      <Text
        letterSpacing={0.2}
        fontWeight={'bold'}
        fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
        color={props.color || 'blueGray.700'}
        {...props}
      >
        {props.children}
      </Text>
    );
  }
  if (props.textStyle === 'body') {
    return (
      <Text
        fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }}
        color={'blueGray.500'}
        {...props}
      >
        {props.children}
      </Text>
    );
  }
  return (
    <Text
      // lineHeight={0}
      fontWeight={'light'}
      fontSize={props.fontSize}
      // fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
      color={props.color || 'black'}
      {...props}
    >
      {props.children}
    </Text>
  );
}

export default TextStyled;
