import { Box, Center, HStack, ScrollView, Text, View } from 'native-base';
import { Dimensions, SafeAreaView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import MenuIcon from '../../../components/MenuIcon';
import {
  ChevronBackWard,
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
      position={'relative'}
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
  const activeColor = COLORS.primary;
  const inActiveColor = COLORS.gray2;
  return (
    <SafeAreaView>
      <ContainerStyled>
        <View
          width={50}
          height={53}
          roundedBottomRight={'full'}
          background={COLORS.primary}
        >
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ margin: 8.5 }}
            position={'absolute'}
            roundedBottomRight={'full'}
          >
            <ChevronBackWard color={'white'} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Center w={'full'}>
            <Text
              letterSpacing={0.5}
              fontSize={'lg'}
              fontWeight={'black'}
              color={COLORS.primary}
            >
              Selling
            </Text>
            <HStack
              space={6}
              w={400}
              mt={8}
              justifyContent={{ base: 'center', lg: 'space-around' }}
            >
              <MenuIcon
                // onPress={() => navigation.navigate('Selling')}
                menuLabel={'Lead'}
                Icon={
                  <Lead
                    width={24}
                    height={24}
                    color={inActiveColor}
                  />
                }
              />

              <MenuIcon
                menuLabel={'Opportunity'}
                Icon={
                  <Opportunity
                    width={24}
                    height={24}
                    color={inActiveColor}
                  />
                }
              />
              <MenuIcon
                // active={true}
                onPress={() => navigation.navigate('Customer', { filterData: [] })}
                menuLabel={'Customer'}
                Icon={
                  <Customer
                    width={24}
                    height={24}
                    color={activeColor}
                  />
                }
              />
            </HStack>
            <HStack
              space={6}
              w={400}
              mt={4}
              flexWrap={'wrap'}
              justifyContent={{ base: 'center', lg: 'space-around' }}
            >
              <MenuIcon
                menuLabel={'Address'}
                Icon={
                  <Location
                    width={24}
                    height={24}
                    color={inActiveColor}
                  />
                }
              />
              <MenuIcon
                menuLabel={'Contact'}
                Icon={
                  <Contact
                    width={24}
                    height={24}
                    color={inActiveColor}
                  />
                }
              />
              <MenuIcon
                menuLabel={'Customer\nVisit'}
                Icon={
                  <CustomerVisit
                    width={24}
                    height={24}
                    color={inActiveColor}
                  />
                }
              />
            </HStack>
            <HStack
              space={6}
              w={400}
              mt={4}
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
                    color={activeColor}
                  />
                }
              />
              <MenuIcon
                onPress={() => navigation.navigate('SalesOrder', { filterData: [] })}
                menuLabel={'Sales Order'}
                Icon={
                  <SaleOrder
                    width={24}
                    height={24}
                    color={activeColor}
                  />
                }
              />
              <MenuIcon
                onPress={() => navigation.navigate('SalesInvoice', { filterData: [] })}
                menuLabel={'Sale\nInvoice'}
                Icon={
                  <SaleInvoice
                    width={24}
                    height={24}
                    color={activeColor}
                  />
                }
              />
            </HStack>
            <HStack
              mt={4}
              w={400}
              space={SPACING.small}
              flexWrap={'wrap'}
              justifyContent={{ base: 'center', lg: 'space-around' }}
            >
              <MenuIcon
                onPress={() => navigation.navigate('PaymentEntry', { filterData: [] })}
                menuLabel={'Payment\nEntry'}
                Icon={
                  <PaymentEntry
                    width={24}
                    height={24}
                    color={activeColor}
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
