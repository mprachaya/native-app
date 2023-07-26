import { Button } from 'native-base';
import React from 'react';

function MoreButton(props) {
  return (
    <Button
      variant={'link'}
      size='lg'
      px={20}
      _text={{
        fontSize: 'md',
        fontWeight: 'bold',
        color: 'blue.400',
      }}
      {...props}
    >
      VIEW MORE
    </Button>
  );
}

export default MoreButton;
