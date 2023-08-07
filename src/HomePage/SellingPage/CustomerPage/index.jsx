import { Center, Text, View } from 'native-base';
import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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

function CustomerPage() {
  return (
    <ContainerStyled>
      <Center mt={6}>
        <Text>Customer Page</Text>
      </Center>
    </ContainerStyled>
  );
}

export default CustomerPage;
