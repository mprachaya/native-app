import { Center, HStack, ScrollView, View } from 'native-base';
import { Dimensions, SafeAreaView, useWindowDimensions } from 'react-native';
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
import { TabMenu } from '../../../components';

const ContainerStyled = (props) => {
  const { height, width } = useWindowDimensions();
  return (
    <View
      {...props}
      height={'full'}
      // _android={{ height: (height * 81) / 100 }}
      // _ios={{ height: { base: (height * 78) / 100, lg: height > width ? (height * 91) / 100 : (height * 88) / 100 } }}
      bg={'blueGray.100'}
    >
      {props.children}
    </View>
  );
};

function SellingPage({ navigation }) {
  const iconColor = COLORS.primary;
  const iconActive = COLORS.tertiary;
  return (
    <SafeAreaView>
      <ContainerStyled>
        <ScrollView>
          <Center w={'full'}>
            <HStack
              w={400}
              mt={12}
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
                active={true}
                onPress={() => navigation.navigate('Customer', { filterData: [] })}
                menuLabel={'Customer'}
                Icon={
                  <Customer
                    width={24}
                    height={24}
                    color={iconActive}
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
              mt={6}
              flexWrap={'wrap'}
              justifyContent={{ base: 'center', lg: 'space-around' }}
            >
              <MenuIcon
                active={true}
                onPress={() => navigation.navigate('Quotation', { filterData: [] })}
                menuLabel={'Quotation'}
                Icon={
                  <Quotation
                    width={24}
                    height={24}
                    color={iconActive}
                  />
                }
              />
              <MenuIcon
                active={true}
                onPress={() => navigation.navigate('SalesOrder', { filterData: [] })}
                menuLabel={'Sales Order'}
                Icon={
                  <SaleOrder
                    width={24}
                    height={24}
                    color={iconActive}
                  />
                }
              />
              <MenuIcon
                active={true}
                onPress={() => navigation.navigate('SalesInvoice', { filterData: [] })}
                menuLabel={'Sale\nInvoice'}
                Icon={
                  <SaleInvoice
                    width={24}
                    height={24}
                    color={iconActive}
                  />
                }
              />
            </HStack>
            <HStack
              mt={6}
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
      <TabMenu />
    </SafeAreaView>
  );
}

export default SellingPage;
