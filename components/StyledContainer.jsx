import { View } from 'native-base';
import React from 'react';

function StyledContainer(props) {
  return (
    <View
      paddingTop={12}
      bg={'blueGray.50'}
      height={'full'}
      {...props}
    >
      {props.children}
    </View>
  );
}

export default StyledContainer;
