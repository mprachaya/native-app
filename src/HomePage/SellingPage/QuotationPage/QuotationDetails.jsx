import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  ChevronLeftIcon,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { useEffect } from 'react';
import { COLORS } from '../../../../constants/theme';
import { Edit } from '../../../../constants/icons';
import { Loading } from '../../../../components';
import useFetch from '../../../../hooks/useFetch';
import useUpdate from '../../../../hooks/useUpdate';
import useConfig from '../../../../config/path';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

// wrap components
const ContainerStyled = (props) => {
  return (
    <View
      bg={'blueGray.50'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function DetailsPage({ route, navigation }) {
  const title = 'Quotation';
  const { name } = route.params;
  const { baseURL, QUOTATION } = useConfig(true);
  const heightScrollView = 2000;
  // data fetching with custom hook useFetch
  const { data, setData, setRefetch, loading, error } = useFetch(baseURL + QUOTATION + '/' + name, {
    headers: {
      // Authorization: config.API_TOKEN,
    },
  });
  const handleDisable = () => {
    const tempState = { ...data };
    tempState.disabled = !tempState.disabled;

    useUpdate(
      {
        headers: {
          // Authorization: config.API_TOKEN,
        },
      },
      baseURL + QUOTATION + name,
      tempState,
      () => void 0,
      () => setRefetch(1)
    );
  };

  const handleOpenUpdate = () => {
    navigation.replace('UpdateCustomer', { name: data.name, preState: data });
  };

  const BackButton = () => (
    <Button
      m={2}
      w={'16'}
      rounded={'xs'}
      variant={'unstyled'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'xs', fontWeight: 'bold', color: COLORS.tertiary }}
      onPress={() => {
        // handleClose();
        navigation.pop();
        navigation.replace(title, { filterData: [] });
      }}
    >
      <ChevronLeftIcon />
    </Button>
  );
  const EditButton = () => (
    <Button
      m={2}
      w={'16'}
      rounded={'xs'}
      variant={'unstyled'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'xs', fontWeight: 'bold', color: COLORS.tertiary }}
      onPress={() => handleOpenUpdate()}
      // onPress={() => (stepState === 1 ? handleBack() : setStepState((post) => post - 1))}
    >
      <Edit color={COLORS.primary} />
    </Button>
  );
  const DisplayTextLeft = ({ children }) => (
    <Text
      textAlign='right'
      maxWidth={24}
      fontWeight={'bold'}
      fontSize={'xs'}
      letterSpacing={1}
    >
      {children}
    </Text>
  );
  const SubTextLeft = ({ children }) => (
    <Text
      fontSize={'xs'}
      textAlign={'right'}
      color={COLORS.gray}
    >
      {children}
    </Text>
  );
  const DisplayTextRight = ({ children, status }) => (
    <Text
      textAlign='left'
      maxWidth={24}
      fontWeight={'bold'}
      fontSize={'xs'}
      letterSpacing={1}
      color={
        status === 'Draft'
          ? 'error.300'
          : status === 'Open'
          ? 'warning.300'
          : status === 'Ordered'
          ? 'success.300'
          : status === 'Cancelled'
          ? 'error.300'
          : status === 'Expired'
          ? 'error.300'
          : null
      }
    >
      {children}
    </Text>
  );
  const SubTextRight = ({ children }) => (
    <Text
      fontSize={'xs'}
      textAlign={'left'}
      color={COLORS.gray}
    >
      {children}
    </Text>
  );
  // tabs details
  const FirstRoute = () => (
    <Center
      flex={1}
      my='4'
    >
      This is Tab 1
    </Center>
  );

  const SecondRoute = () => (
    <Center
      flex={1}
      my='4'
    >
      This is Tab 2
    </Center>
  );

  const ThirdRoute = () => (
    <Center
      flex={1}
      my='4'
    >
      This is Tab 3
    </Center>
  );

  const FourthRoute = () => (
    <Center
      flex={1}
      my='4'
    >
      This is Tab 4{' '}
    </Center>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const [tabIndex, setTabIndex] = useState(0);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection='row'>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.5)),
          });
          const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
          const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
          return (
            <Box
              borderBottomWidth='3'
              borderColor={borderColor}
              flex={1}
              alignItems='center'
              p='3'
              cursor='pointer'
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  if (loading) {
    return <Loading loading={loading} />;
  }
  // handle error when data is not available
  if (error) {
    return (
      <ContainerStyled>
        <HStack justifyContent='center'></HStack>
      </ContainerStyled>
    );
  }
  return (
    <ContainerStyled>
      <Center>
        <HStack
          top={2}
          px={4}
          w={'full'}
          justifyContent={'space-between'}
        >
          <HStack>
            <BackButton />
          </HStack>
          <HStack>
            <EditButton />
          </HStack>
        </HStack>
        <ScrollView w={'full'}>
          <VStack
            m={2}
            h={heightScrollView}
            alignItems={'center'}
            space={2}
          >
            <VStack
              // bg={'black'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text
                fontWeight={'bold'}
                fontSize={'md'}
              >
                {data.name}
              </Text>
              <Text color={COLORS.gray}> Quotation To : {data.quotation_to}</Text>
              <Text color={COLORS.gray}> Customer : {data.customer_name}</Text>
              <HStack
                alignItems='center'
                justifyContent='center'
                space={6}
                mt={6}
              >
                <VStack
                  space={2}
                  alignItems={'flex-end'}
                >
                  <VStack
                    alignItems={'center'}
                    minHeight={10}
                  >
                    <DisplayTextLeft>{data.transaction_date}</DisplayTextLeft>
                    <SubTextLeft>{'Date'}</SubTextLeft>
                  </VStack>
                  <VStack
                    alignItems={'flex-end'}
                    minHeight={16}
                  >
                    <DisplayTextLeft>{data.customer_group}</DisplayTextLeft>
                    <SubTextLeft>{'Customer Group'}</SubTextLeft>
                  </VStack>
                  <VStack
                    alignItems={'flex-end'}
                    minHeight={16}
                  >
                    <DisplayTextLeft>{data.territory}</DisplayTextLeft>
                    <SubTextLeft>{'Territory'}</SubTextLeft>
                  </VStack>
                </VStack>
                <Divider orientation='vertical' />
                <VStack
                  space={2}
                  alignItems={'flex-start'}
                >
                  <VStack minHeight={10}>
                    <DisplayTextLeft>{data.valid_till}</DisplayTextLeft>
                    <SubTextRight>{'Valid Till'}</SubTextRight>
                  </VStack>
                  <VStack
                    alignItems={'flex-start'}
                    minHeight={16}
                  >
                    <DisplayTextRight status={data.status}>{data.status}</DisplayTextRight>
                    <SubTextRight>{'Status'}</SubTextRight>
                  </VStack>
                  <VStack
                    alignItems={'flex-start'}
                    minHeight={16}
                  >
                    <DisplayTextRight>{data.contact_display}</DisplayTextRight>
                    <SubTextRight>{'Contact'}</SubTextRight>
                  </VStack>
                </VStack>
              </HStack>
              <VStack
                mt={6}
                textAlign={'center'}
                alignItems='center'
                justifyContent={'center'}
              >
                <VStack maxW={300}>
                  <Text
                    textAlign={'center'}
                    fontSize={'xs'}
                  >
                    {data.customer_address}
                  </Text>
                  <Text
                    mt={1}
                    fontSize={'xs'}
                    textAlign={'center'}
                    color={COLORS.gray}
                  >
                    {'Customer Address'}
                  </Text>
                </VStack>
                <VStack
                  maxW={300}
                  mt={6}
                >
                  <Text
                    textAlign={'center'}
                    fontSize={'xs'}
                  >
                    {data.address_display ? `${data.address_display.replaceAll(/<\/?[^>]+(>|$)/gi, '')}` : '-'}
                  </Text>
                  <Text
                    mt={1}
                    fontSize={'xs'}
                    textAlign={'center'}
                    color={COLORS.gray}
                  >
                    {'Address'}
                  </Text>
                </VStack>
              </VStack>
              <VStack
                mt={6}
                alignItems='center'
              >
                <Text
                  fontWeight={'bold'}
                  fontSize={'xs'}
                >
                  {data.contact_mobile ? data.contact_mobile : '-'}
                </Text>
                <Text
                  fontSize={'xs'}
                  textAlign={'center'}
                  color={COLORS.gray}
                >
                  {'Contact Mobile'}
                </Text>
              </VStack>
              <VStack
                mt={6}
                alignItems='center'
              >
                <Text
                  fontWeight={'bold'}
                  fontSize={'xs'}
                >
                  {data.contact_email ? data.contact_email : '-'}
                </Text>
                <Text
                  fontSize={'xs'}
                  textAlign={'center'}
                  color={COLORS.gray}
                >
                  {'Contact Email'}
                </Text>
              </VStack>
            </VStack>
            <Divider
              w={'300'}
              mt={2}
            />
            <VStack
              mt={6}
              space={2}
              alignItems='center'
            >
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Order Type</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.order_type ? data.order_type : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Currency</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.currency ? data.currency : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Exchange Rate</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.conversion_rate ? parseFloat(data.conversion_rate).toFixed(2) : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Price List</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.selling_price_list ? data.selling_price_list : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Price List Currency</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.price_list_currency ? data.price_list_currency : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Price List Exchange Rate</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.plc_conversion_rate ? parseFloat(data.plc_conversion_rate).toFixed(2) : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Terms & Conditions</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.tc_name ? data.tc_name : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>{'Payment Terms Template'}</Text>
                <View>
                  <Text
                    fontWeight='bold'
                    _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                  >
                    {data.payment_terms_template ? data.payment_terms_template : '-'}
                  </Text>
                </View>
              </HStack>
            </VStack>
            <Divider
              w={'300'}
              mt={2}
            />
            <VStack
              mt={6}
              space={2}
              alignItems='center'
            >
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Total Quantity</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.total_qty ? parseFloat(data.total_qty).toFixed(2) : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Total {data.currency}</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.base_total ? parseFloat(data.base_total).toFixed(2) : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Net Total {data.currency}</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.base_net_total ? parseFloat(data.base_net_total).toFixed(2) : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Total</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.total ? parseFloat(data.total).toFixed(2) : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Net Total</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.net_total ? parseFloat(data.net_total).toFixed(2) : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Total Taxes and Charges</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.base_total_taxes_and_charges ? parseFloat(data.base_total_taxes_and_charges).toFixed(2) : '0.0'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Apply Additional Discount On</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.apply_discount_on ? data.apply_discount_on : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Additional Discount Amount {data.currency}</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.base_discount_amount ? parseFloat(data.base_discount_amount).toFixed(2) : '0.0'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Additional Discount Percentage</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.payment_terms ? parseFloat(data.payment_terms).toFixed(2) : '0.0'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Additional Discount Amount</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.discount_amount ? parseFloat(data.discount_amount).toFixed(2) : '0.0'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Grand Total {data.currency}</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.base_grand_total ? parseFloat(data.base_grand_total).toFixed(2) : '0.0'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>In Words {data.currency}</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.in_words ? data.in_words : '-'}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </ScrollView>
      </Center>
    </ContainerStyled>
  );
}

export default DetailsPage;
