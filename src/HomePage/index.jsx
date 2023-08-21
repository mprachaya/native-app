import { Center, HStack, Text, View } from 'native-base';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import MenuIcon from '../../components/MenuIcon';
import { Accounts, Buying, HR, Reports, Shop, Stock } from '../../constants/icons';
import { TabMenu } from '../../components';

const ContainerStyled = (props) => {
  const { height, width } = useWindowDimensions();
  return (
    <View
      {...props}
      _android={{ height: (height * 88) / 100 }}
      _ios={{ height: { base: (height * 81) / 100, lg: height > width ? (height * 91) / 100 : (height * 88) / 100 } }}
      bg={'blueGray.100'}
    >
      {props.children}
    </View>
  );
};

function HomePage({ navigation }) {
  const iconColor = COLORS.primary;

  return (
    <SafeAreaView>
      <ContainerStyled>
        <Center w={'full'}>
          <Text
            mt={6}
            fontSize={'lg'}
            fontWeight={'bold'}
            color={COLORS.primary}
          >
            Modules
          </Text>
          <HStack
            w={400}
            mt={12}
            flexWrap={'wrap'}
            justifyContent={{ base: 'center', lg: 'space-around' }}
          >
            <MenuIcon
              onPress={() => navigation.navigate('Selling')}
              menuLabel={'Selling'}
              Icon={
                <Shop
                  width={24}
                  height={24}
                  color={iconColor}
                />
              }
            />
            <MenuIcon
              menuLabel={'Stock'}
              Icon={
                <Stock
                  width={24}
                  height={24}
                  color={iconColor}
                />
              }
            />
            <MenuIcon
              menuLabel={'Buying'}
              Icon={
                <Buying
                  width={24}
                  height={24}
                  color={iconColor}
                />
              }
            />
          </HStack>
          <HStack
            w={400}
            mt={6}
            flexWrap={'wrap'}
            justifyContent={{ base: 'center', lg: 'space-around' }}
          >
            <MenuIcon
              menuLabel={'Accounts'}
              Icon={
                <Accounts
                  width={24}
                  height={24}
                  color={iconColor}
                />
              }
            />
            <MenuIcon
              menuLabel={'HR'}
              Icon={
                <HR
                  width={24}
                  height={24}
                  color={iconColor}
                />
              }
            />
            <MenuIcon
              menuLabel={'Reports'}
              Icon={
                <Reports
                  width={24}
                  height={24}
                  color={iconColor}
                />
              }
            />
          </HStack>
        </Center>
      </ContainerStyled>
      <TabMenu />
    </SafeAreaView>
  );
}

export default HomePage;
