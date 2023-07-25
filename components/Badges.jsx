import { Badge, CircleIcon, HStack, Text } from 'native-base';
import React from 'react';
import TextStyled from './TextStyled';

function Badges(props) {
  if (props.type === 'receive') {
    return (
      <Badge
        {...props}
        py={-1}
        pr={3}
        pl={0}
        rounded={10}
        colorScheme='warning'
        alignSelf='center'
        variant={'subtle'}
      >
        <HStack
          space={0}
          ml={4}
          mr={1.5}
          my={1}
          px={2}
          py={1.5}
          pb={2.5}
        >
          <CircleIcon
            size='1.5'
            my={{ base: 3, lg: 2 }}
            mr={2}
            color={'orange.500'}
          />
          <TextStyled
            my={{ base: 1.5, lg: 0 }}
            fontWeight={'bold'}
            color={'orange.500'}
          >
            {props.children}
          </TextStyled>
        </HStack>
      </Badge>
    );
  }
}
export default Badges;
