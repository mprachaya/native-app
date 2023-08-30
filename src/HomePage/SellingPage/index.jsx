import { Center, HStack, ScrollView, View } from 'native-base';
import { Dimensions, SafeAreaView } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import MenuIcon from '../../../components/MenuIcon';
import {
  Contact,
  Customer,
  CustomerVisit,
  Lead,
  Location,
  Opportunity,
  PaymentEntry,
  Quotation,
  SaleInvoice,
  SaleOrder,
} from '../../../constants/icons';

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

function SellingPage({ navigation }) {
  const iconColor = COLORS.primary;
  return (
    <SafeAreaView>
      <ContainerStyled>
        <ScrollView>
          <Center w={'full'}>
            <HStack
              w={400}
              mt={{ base: 6, lg: 12 }}
              justifyContent={{ base: 'center', lg: 'space-around' }}
            >
              <MenuIcon
                // onPress={() => navigation.navigate('Selling')}
                menuLabel={'Lead'}
                Icon={
                  <Lead
                    width={24}
                    height={24}
                    color={iconColor}
                  />
                }
              />

              <MenuIcon
                menuLabel={'Opportunity'}
                Icon={
                  <Opportunity
                    width={24}
                    height={24}
                    color={iconColor}
                  />
                }
              />
              <MenuIcon
                onPress={() => navigation.navigate('Customer', { filterData: [] })}
                menuLabel={'Customer'}
                Icon={
                  <Customer
                    width={24}
                    height={24}
                    color={iconColor}
                  />
                }
              />
            </HStack>
            <HStack
              w={400}
              flexWrap={'wrap'}
              justifyContent={{ base: 'center', lg: 'space-around' }}
            >
              <MenuIcon
                menuLabel={'Address'}
                Icon={
                  <Location
                    width={24}
                    height={24}
                    color={iconColor}
                  />
                }
              />
              <MenuIcon
                menuLabel={'Contact'}
                Icon={
                  <Contact
                    width={24}
                    height={24}
                    color={iconColor}
                  />
                }
              />
              <MenuIcon
                menuLabel={'Customer\nVisit'}
                Icon={
                  <CustomerVisit
                    width={24}
                    height={24}
                    color={iconColor}
                  />
                }
              />
            </HStack>
            <HStack
              w={400}
              flexWrap={'wrap'}
              justifyContent={{ base: 'center', lg: 'space-around' }}
            >
              <MenuIcon
                onPress={() => navigation.navigate('Quotation', { filterData: [] })}
                menuLabel={'Quotation'}
                Icon={
                  <Quotation
                    width={24}
                    height={24}
                    color={iconColor}
                  />
                }
              />
              <MenuIcon
                menuLabel={'SaleOrder'}
                Icon={
                  <SaleOrder
                    width={24}
                    height={24}
                    color={iconColor}
                  />
                }
              />
              <MenuIcon
                menuLabel={'Sale\nInvoice'}
                Icon={
                  <SaleInvoice
                    width={24}
                    height={24}
                    color={iconColor}
                  />
                }
              />
            </HStack>
            <HStack
              w={400}
              space={SPACING.small}
              flexWrap={'wrap'}
              justifyContent={{ base: 'center', lg: 'space-around' }}
            >
              <MenuIcon
                menuLabel={'Payment\nEntry'}
                Icon={
                  <PaymentEntry
                    width={24}
                    height={24}
                    color={iconColor}
                  />
                }
              />
            </HStack>
          </Center>
        </ScrollView>
      </ContainerStyled>
    </SafeAreaView>
  );
}

export default SellingPage;
