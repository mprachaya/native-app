import { Center, HStack, VStack, View } from 'native-base';
import React, { useContext } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import TextStyled from '../../components/TextStyled';
import MenuIcon from '../../components/MenuIcon';
import { Accounts, Advance, Buying, HR, Reports, Shop, Stock } from '../../constants/icons';
// import DetectBack from '../../hooks/DetectBack';
// import NavigateStorePath from '../../hooks/NavigateStorePath';
// import { Context } from '../../reducer';
// import TextStyled from '../../components/TextStyled';

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

function HomePage({ navigation }) {
  // const [state, dispatch] = useContext(Context);
  // DetectBack(navigation, 'Home');

  return (
    <SafeAreaView>
      <ContainerStyled>
        <Center>
          {/* <Text fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>Purchase Order</Text> */}
          <Center
            pt={12}
            width={'100%'}
            background={'white'}
          >
            <TextStyled
              mb={12}
              fontSize={24}
              fontWeight={'bold'}
              color={COLORS.tertiary}
            >
              Modules
            </TextStyled>
          </Center>
          <HStack
            w={320}
            mt={12}
            space={SPACING.large}
            flexWrap={'wrap'}
            justifyContent={'center'}
          >
            <MenuIcon
              menuLabel={'Selling'}
              Icon={
                <Shop
                  width={24}
                  height={24}
                />
              }
            />
            <MenuIcon
              menuLabel={'Stock'}
              Icon={
                <Stock
                  width={24}
                  height={24}
                />
              }
            />
            <MenuIcon
              menuLabel={'Buying'}
              Icon={
                <Buying
                  width={24}
                  height={24}
                />
              }
            />
          </HStack>
          <HStack
            w={320}
            mt={12}
            space={SPACING.large}
            flexWrap={'wrap'}
            justifyContent={'center'}
          >
            <MenuIcon
              menuLabel={'Accounts'}
              Icon={
                <Accounts
                  width={24}
                  height={24}
                />
              }
            />
            <MenuIcon
              menuLabel={'HR'}
              Icon={
                <HR
                  width={24}
                  height={24}
                />
              }
            />
            <MenuIcon
              menuLabel={'Reports'}
              Icon={
                <Reports
                  width={24}
                  height={24}
                />
              }
            />
          </HStack>
          {/* <TextStyled onPress={() => NavigateStorePath(navigation, 'Purchase Order', dispatch)}>
              Purchase Order
            </TextStyled>
            <TextStyled onPress={() => NavigateStorePath(navigation, 'Other Test', dispatch)}>Other</TextStyled> */}
        </Center>
      </ContainerStyled>
    </SafeAreaView>
  );
}

export default HomePage;
