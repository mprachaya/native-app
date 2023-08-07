import { Center, HStack, View } from 'native-base';
import { Dimensions, SafeAreaView } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import MenuIcon from '../../components/MenuIcon';
import { Accounts, Buying, HR, Reports, Shop, Stock } from '../../constants/icons';

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
  const iconColor = COLORS.primary;

  return (
    <SafeAreaView>
      <ContainerStyled>
        <Center w={'full'}>
          <HStack
            w={400}
            mt={20}
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
    </SafeAreaView>
  );
}

export default HomePage;
