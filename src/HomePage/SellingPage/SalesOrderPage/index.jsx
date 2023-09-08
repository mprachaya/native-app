import { Text, View } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function SalesOrderPage() {
  const ContainerStyled = (props) => {
    return (
      <View
        style={{ zIndex: 0 }}
        height={SCREEN_HEIGHT}
        bg={'blueGray.100'}
        {...props}
      >
        {props.children}
      </View>
    );
  };
  return (
    <ContainerStyled>
      <Text>Sales Order Page</Text>
    </ContainerStyled>
  );
}

export default SalesOrderPage;
