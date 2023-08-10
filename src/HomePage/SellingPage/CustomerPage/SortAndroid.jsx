import React from 'react';
import { HStack, Text, View } from 'native-base';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
import { Dimensions } from 'react-native';
const ContainerStyled = (props) => {
  return (
    <View
      height={SCREEN_HEIGHT}
      bg={'blueGray.100'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function SortAndroid() {
  return (
    <ContainerStyled>
      <HStack>
        <Text>Sort Android</Text>
      </HStack>
    </ContainerStyled>
  );
}

export default SortAndroid;
