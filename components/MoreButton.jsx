import { Button } from 'native-base';
import React from 'react';

function MoreButton(props) {
  return (
    <Button
      variant={'link'}
      size='lg'
      // background={'blue.500'}
      px={20}
      // _pressed={{
      //   bg: 'blue.300',
      // }}
      _text={{
        fontSize: 'md',
        fontWeight: 'bold',
        color: 'blue.600',
        // color: 'white',
      }}
      {...props}
    >
      VIEW MORE
    </Button>
  );
}

export default MoreButton;
