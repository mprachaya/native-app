import { Button } from 'native-base';
import React from 'react';

function MoreButton() {
  return (
    <Button
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
    >
      More
    </Button>
  );
}

export default MoreButton;
