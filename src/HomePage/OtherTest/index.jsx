import { Center, Text, VStack, View } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { SPACING } from '../../../constants/theme';

const ContainerStyled = (props) => {
  return (
    <View
      height={'full'}
      bg={'blueGray.50'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function OtherTest() {
  return (
    <SafeAreaView>
      <ContainerStyled>
        <Center>
          <VStack space={SPACING.small}>
            <Text
              m={2}
              fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            >
              Other
            </Text>
          </VStack>
        </Center>
      </ContainerStyled>
    </SafeAreaView>
  );
}

export default OtherTest;
