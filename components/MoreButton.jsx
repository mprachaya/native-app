import { Button } from 'native-base';
import React from 'react';

function MoreButton(props) {
  return (
    <Button
      rounded={20}
      size='sm'
      variant='outline'
      background={'blue.500'}
      px={20}
      _pressed={{
        bg: 'blue.300',
      }}
      _text={{
        fontWeight: 'bold',
        color: 'white',
      }}
      {...props}
    >
      More
    </Button>
  );
}

export default MoreButton;
