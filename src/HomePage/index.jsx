import { Center, VStack, View } from 'native-base';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { SPACING } from '../../constants/theme';
import DetectBack from '../../hooks/DetectBack';
import NavigateStorePath from '../../hooks/NavigateStorePath';
import { Context } from '../../reducer';
import TextStyled from '../../components/TextStyled';

const ContainerStyled = (props) => {
  return (
    <View
      pt={12}
      height={'full'}
      bg={'blueGray.100'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function HomePage({ navigation }) {
  const [state, dispatch] = useContext(Context);
  DetectBack(navigation, 'Home');

  return (
    <SafeAreaView>
      <ContainerStyled>
        <Center>
          {/* <Text fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>Purchase Order</Text> */}
          <VStack space={SPACING.small}>
            <TextStyled onPress={() => NavigateStorePath(navigation, 'Purchase Order', dispatch)}>
              Purchase Order
            </TextStyled>
            <TextStyled onPress={() => NavigateStorePath(navigation, 'Other Test', dispatch)}>Other</TextStyled>
          </VStack>
        </Center>
      </ContainerStyled>
    </SafeAreaView>
  );
}

export default HomePage;
