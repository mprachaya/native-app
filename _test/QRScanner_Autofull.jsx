import { Button, TextField, VStack, View } from 'native-base';
import React from 'react';

function QRScanner_Autofull() {
  return (
    <View>
      <VStack
        m={6}
        space={6}
      >
        <Button>OPEN SCANNER</Button>
        <TextField size='lg' />
      </VStack>
    </View>
  );
}

export default QRScanner_Autofull;
