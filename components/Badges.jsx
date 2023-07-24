import { Badge, CircleIcon, HStack } from 'native-base';
import React from 'react';
import TextStyled from './TextStyled';

function Badges({ type, children }) {
  if (type === 'receive') {
    return (
      <Badge
        ml={4}
        p={-1}
        rounded={10}
        colorScheme='warning'
        alignSelf='center'
        variant={'subtle'}
      >
        <HStack
          space={0}
          ml={4}
          mr={1.5}
        >
          <CircleIcon
            size='1.5'
            my={4}
          />
          <TextStyled fontWeight={'bold'}>{children}</TextStyled>
        </HStack>
      </Badge>
    );
  }
}
export default Badges;
