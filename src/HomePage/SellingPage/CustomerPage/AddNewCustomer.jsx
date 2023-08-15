import { Button, Center, HStack, Text, VStack, View } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { COLORS, SPACING } from '../../../../constants/theme';
import { useNavigation } from '@react-navigation/native';

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

function AddNewCustomer() {
  const Navigation = useNavigation();
  return (
    <SafeAreaView>
      <ContainerStyled>
        <Center>
          <HStack>
            <Button onPress={() => Navigation.goBack()}>Back</Button>
            <Text
              mt={2}
              color={COLORS.tertiary}
              fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
              fontWeight={'bold'}
              letterSpacing={2}
            >
              1
            </Text>
            <Text
              mt={2}
              fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
              fontWeight={'bold'}
              letterSpacing={2}
            >
              /3
            </Text>
            <Text
              mt={2}
              ml={2}
              fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
              fontWeight={'bold'}
            >
              STEP
            </Text>
          </HStack>
        </Center>
      </ContainerStyled>
    </SafeAreaView>
  );
}

export default AddNewCustomer;
