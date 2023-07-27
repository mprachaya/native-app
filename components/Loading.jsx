import { Spinner, View } from 'native-base';
import React from 'react';

function Loading({ loading }) {
  if (loading) {
    return (
      <View
        m={'auto'}
        mt={40}
      >
        <Spinner />
      </View>
    );
  }
}

export default Loading;
