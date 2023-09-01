import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  ChevronLeftIcon,
  CloseIcon,
  Divider,
  FlatList,
  HStack,
  Image,
  // Modal,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { useState } from 'react';
import { COLORS } from '../../../../constants/theme';
import { Edit } from '../../../../constants/icons';
import { Loading } from '../../../../components';
import useFetch from '../../../../hooks/useFetch';
import useUpdate from '../../../../hooks/useUpdate';
import useConfig from '../../../../config/path';
import FadeTransition from '../../../../components/FadeTransition';
import { Modal, Pressable } from 'react-native';

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

  const PaymentDetails = () => (
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
  );
  const TotalDetails = () => (
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
  );

  const Items = Object.values({ ...data.items });

  const ItemProperty = ({ firstName, firstValue, secondName, secondValue }) => (
    <VStack
      w={'full'}
      pl={2}
    >
      <HStack justifyContent={'space-between'}>
        <HStack
          w={20}
          justifyContent={'space-between'}
        >
          <Text
            fontSize={'xs'}
            color={'blueGray.500'}
          >
            {firstName}
          </Text>
          <Text>:</Text>
        </HStack>
        <Text fontSize={'xs'}>{firstValue}</Text>
      </HStack>

      <HStack justifyContent={'space-between'}>
        <HStack
          w={20}
          justifyContent={'space-between'}
        >
          <Text
            fontSize={'xs'}
            color={'blueGray.500'}
          >
            {secondName} :
          </Text>
          <Text>:</Text>
        </HStack>
        <Text fontSize={'xs'}>{secondValue}</Text>
      </HStack>
    </VStack>
  );

  const ItemsQuotation = () => (
    <VStack
      my={1}
      alignItems={'center'}
    >
      <Text
        mt={2}
        mb={1}
      >
        Item List
      </Text>
      {Items.map((item, index) => (
        <Button
          variant={'unstyled'}
          key={item.name}
          rounded={12}
          w={300}
          mt={3}
          p={4}
          bg={'white'}
          _pressed={{ bg: 'blueGray.100' }}
          onPress={() => handleClickShowItemDetails(item)}
        >
          <HStack
            space={2}
            justifyContent={'space-between'}
          >
            {item.image !== '' ? (
              <Box
                my={4}
                w={16}
                h={16}
                rounded={6}
              >
                <Image
                  style={{ flex: 1, resizeMode: 'cover' }}
                  rounded={6}
                  alt={'item image'}
                  source={{
                    uri: baseURL + item.image,
                    method: 'GET',
                    // headers: {
                    //   Authorization: token,
                    // },
                  }}
                />
              </Box>
            ) : (
              <Box
                my={4}
                w={16}
                h={16}
                rounded={6}
                background={'black'}
                shadow={1}
              >
                <Box
                  w={'full'}
                  h={'full'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  position={'absolute'}
                >
                  <Text color={'white'}>No Image</Text>
                </Box>

                <Image
                  alt={'item image'}
                  opacity={'0.5'}
                  rounded={6}
                  style={{ flex: 1, resizeMode: 'cover' }}
                  source={{
                    uri: 'https://images.pexels.com/photos/5825604/pexels-photo-5825604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                  }}
                />
              </Box>
            )}

            <VStack>
              <HStack
                mx={2}
                position={'absolute'}
                left={0}
                top={-8}
              >
                <Text
                  fontSize={'xs'}
                  color={'blueGray.400'}
                >
                  {index + 1}.
                </Text>
              </HStack>
              <Divider
                color={'blueGray.50'}
                m={2}
                w={'container'}
              />

              <ItemProperty
                firstName={'Code'}
                firstValue={item.item_code}
                secondName={'Item Group'}
                secondValue={item.item_group}
              />
              <ItemProperty
                firstName={'OUM'}
                firstValue={item.uom}
                secondName={'Quantity'}
                secondValue={item.qty}
              />
              <HStack
                w={210}
                pl={2}
                justifyContent={'space-between'}
              >
                <HStack
                  w={20}
                  justifyContent={'space-between'}
                >
                  <Text
                    fontWeight={'bold'}
                    fontSize={'xs'}
                  >
                    Amount
                  </Text>
                  <Text>:</Text>
                </HStack>
                <Text
                  fontWeight={'bold'}
                  fontSize={'xs'}
                >
                  {parseFloat(item.amount).toFixed(2)}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Button>
      ))}
    </VStack>
  );

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);

  const handleClickShowItemDetails = (getItem) => {
    setItem(getItem);
    setOpen(true);
  };

  const TaxesDetails = () => (
    <VStack>
      <Text>test taxes</Text>
    </VStack>
  );

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
              <Divider
                w={'300'}
                mt={2}
              />
              <PaymentDetails />
              <TotalDetails />
              <Divider
                w={'300'}
                mt={2}
              />
            </VStack>
            <ItemsQuotation />
            <Modal
              // isOpen={open}
              // onClose={() => setOpen(false)}
              useNativeDriver={true}
              animationType='fade'
              transparent={true}
              visible={open}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setOpen(!open);
              }}
            >
              <View
                w={'full'}
                h={'full'}
                justifyContent={'center'}
                alignItems={'center'}
                bgColor={'rgba(0, 0, 0, 0.5)'}
              >
                <View
                  m={6}
                  flex={1}
                  py={8}
                  px={8}
                  // px={12}
                  rounded={12}
                  w={{ base: 'full', lg: 600 }}
                  bg={'blueGray.100'}
                >
                  <View
                    position={'absolute'}
                    top={0}
                    right={0}
                  >
                    <Button
                      w={20}
                      h={20}
                      variant={'unstyled'}
                      onPress={() => setOpen(false)}
                    >
                      <CloseIcon size={'sm'} />
                    </Button>
                  </View>
                  <Center>
                    <Text>{item?.item_code}</Text>
                  </Center>
                </View>
              </View>
            </Modal>
            {/* <ModalItemDetails item={item} /> */}
            <Divider
              w={'300'}
              mt={2}
            />
            <TaxesDetails />
          </VStack>
        </ScrollView>
      </Center>
    </ContainerStyled>
  );
}

export default DetailsPage;
