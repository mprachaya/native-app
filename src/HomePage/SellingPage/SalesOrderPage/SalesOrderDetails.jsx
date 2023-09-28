import {
  Avatar,
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { useMemo, useState } from 'react';
import { COLORS } from '../../../../constants/theme';
import { Edit, SaleInvoice } from '../../../../constants/icons';
import { ConnectionLinks, Loading, CreateSelect } from '../../../../components';
import useFetch from '../../../../hooks/useFetch';
import useConfig from '../../../../config/path';
import { Alert } from 'react-native';
import axios from 'axios';
import ExportPDF from '../../../../_test/ExportPDF';
import { getDataAPICustom } from '../../../../utils/reformatresponse';
import { useIsFocused } from '@react-navigation/native';
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
  const title = 'SalesOrder';
  const connectionTo = 'SalesInvoiceDetails';
  const { name } = route.params;
  const { baseURL, SALES_ORDER, SALES_INVOICE_BY_SALES_ORDER } = useConfig(true);
  const { data, setData, setRefetch, loading, error } = useFetch(
    baseURL + SALES_ORDER + '/' + (name ? name : route.params.connectName),
    {
      headers: {
        // Authorization: config.API_TOKEN,
      },
    }
  );
  const [openPrint, setOpenPrint] = useState(false);

  const mapProperties = (inputObject) => {
    return {
      doctype: 'Sales Order',
      customer: inputObject.customer,
      customer_address: inputObject.customer_address || '',
      order_type: inputObject.order_type,
      contact_person: inputObject.contact_person || '',
      project: inputObject.project,
      conversion_rate: inputObject.conversion_rate || '0.0',
      transaction_date: inputObject.transaction_date,
      delivery_date: inputObject.delivery_date,
      company: inputObject.company,
      currency: inputObject.currency,
      set_warehouse: inputObject.set_warehouse,
      selling_price_list: inputObject.selling_price_list || '',
      payment_terms_template: inputObject.payment_terms_template || '',
      tc_name: inputObject.tc_name || '',
      sales_partner: inputObject.sales_partner || '',
      items: Object.values(inputObject.items).map((it) => {
        return { item_code: it.item_code, rate: parseFloat(it.rate), qty: it.qty };
      }),
    };
  };
  const handleOpenUpdate = () => {
    const newData = mapProperties(data);
    // console.log('newData', newData);
    navigation.navigate('UpdateSalesOrder', { name: data.name, preState: newData, amend: 0, QuotationState: [] });
  };

  const BackButton = () => (
    <Button
      m={2}
      px={2}
      rounded={'lg'}
      variant={'unstyled'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'xs', fontWeight: 'bold', color: COLORS.tertiary }}
      onPress={() => {
        navigation.pop();
      }}
    >
      <ChevronLeftIcon />
    </Button>
  );
  const EditButton = () => (
    <Button
      ml={3}
      mr={2}
      px={2}
      justifyContent={'center'}
      rounded={'lg'}
      variant={'unstyled'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'xs', fontWeight: 'bold', color: COLORS.tertiary }}
      onPress={() => handleOpenUpdate()}
    >
      <Edit color={COLORS.primary} />
    </Button>
  );
  const PrintAndExport = () => (
    <Button
      mr={0}
      px={3.5}
      rounded={'xl'}
      variant={'outline'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'xs', fontWeight: 'bold', color: COLORS.tertiary }}
      // onPress={() => setOpenPrint(true)}
      onPress={() => navigation.navigate('ExportPage', { DOCTYPE: 'Sales Order', NAME: name })}
    >
      <Text
        textAlign='left'
        maxWidth={24}
        fontWeight={'bold'}
        fontSize={'sm'}
        letterSpacing={1}
        color={COLORS.tertiary2}
      >
        Export
      </Text>
    </Button>
  );
  const CreateSalesOrderButton = () => (
    <Button
      mr={2}
      px={3.5}
      rounded={'xl'}
      variant={'outline'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'xs', fontWeight: 'bold', color: COLORS.tertiary }}
      onPress={() => navigation.navigate('AddNewSalesOrder', { QuotationState: data })}
    >
      <Text
        textAlign='left'
        maxWidth={24}
        fontWeight={'bold'}
        fontSize={'sm'}
        letterSpacing={1}
        color={'blue.400'}
      >
        Create
      </Text>
    </Button>
  );
  const StatusButton = ({ status }) => (
    <Button
      mr={2}
      px={3.5}
      rounded={'xl'}
      variant={'outline'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}
      onPress={() => handleChangeStatus(data?.status)}
    >
      <Text
        textAlign='left'
        maxWidth={24}
        fontWeight={'bold'}
        fontSize={'sm'}
        letterSpacing={1}
        borderColor={
          status === 'Draft' // default status
            ? 'blue.400'
            : status === 'To Deliver and Bill' // show when already create invoice
            ? 'error.400'
            : status === 'To Deliver' // show when summit Sales Order (Status from To Deliver and Bill To Deliver) already create invoice
            ? 'error.400'
            : status === 'Cancelled'
            ? 'error.400'
            : null
        }
        color={
          status === 'Draft' // default status
            ? 'blue.400'
            : status === 'To Deliver and Bill' // show when already create invoice
            ? 'error.400'
            : status === 'To Deliver' // show when summit Sales Order (Status from To Deliver and Bill To Deliver) already create invoice
            ? 'error.400'
            : status === 'Cancelled'
            ? 'error.400'
            : null
        }
      >
        {status === 'Draft'
          ? 'Submit'
          : status === 'To Deliver and Bill' || status === 'To Deliver'
          ? 'Cancel'
          : status === 'Cancelled'
          ? 'Amend'
          : null}
      </Text>
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
        status === 'Draft' // default status
          ? 'error.300'
          : status === 'To Deliver and Bill' // show when already create invoice
          ? 'warning.300'
          : status === 'To Deliver' // show when summit Sales Order (Status from To Deliver and Bill To Deliver) already create invoice
          ? 'warning.300'
          : status === 'Completed'
          ? 'success.300'
          : status === 'Cancelled'
          ? 'error.300'
          : status === 'Closed'
          ? 'error.300'
          : status === 'On Hold'
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

  const UpdateStatus = (status) => {
    const urlUpdateStatus = baseURL + SALES_ORDER + '/' + data.name;
    // console.log(urlUpdateStatus);
    if (status === 'Draft') {
      Alert.alert(
        'Confirm Submit',
        `Permanently Submit \n${data.name}?`,
        [
          {
            text: 'Confirm',
            onPress: () => {
              axios
                .put(urlUpdateStatus, { docstatus: 1 })
                .then((response) => response.data)
                .then((res) => {
                  //  navigation.replace('SalesOrderDetails', { name: data.name });
                  res.data &&
                    navigation.reset({
                      index: 1,
                      routes: [{ name: 'SalesOrderDetails', params: { name: data.name } }],
                    });
                })
                .catch((err) => {
                  console.log('An error occurred. Awkward.. : ', err);
                  alert('Status Error: ' + err);
                });
            },
          },
          {
            text: 'Cancel',
            style: 'cancel', // This makes the button appear differently (e.g., grayed out)
          },
        ],
        { cancelable: false } // Prevents users from dismissing the alert by tapping outside of it
      );
    } else if (status === 'To Deliver and Bill' || status === 'to Bill' || status === 'To Deliver') {
      Alert.alert(
        'Confirm Cancel',
        `Permanently Cancel \n${data.name}?`,
        [
          {
            text: 'Confirm',
            onPress: () => {
              axios
                .put(urlUpdateStatus, { docstatus: 2 })
                .then((response) => response.data)
                .then((res) => {
                  res.data && navigation.replace('SalesOrderDetails', { name: data.name });
                })
                .catch((err) => {
                  console.log('An error occurred. Awkward.. : ', err);
                  alert('Status Error: ' + err);
                });
            },
          },
          {
            text: 'Cancel',
            style: 'cancel', // This makes the button appear differently (e.g., grayed out)
          },
        ],
        { cancelable: false } // Prevents users from dismissing the alert by tapping outside of it
      );
    } else if (status === 'Cancelled') {
      function mapProperties(inputObject) {
        return {
          doctype: 'Sales Order',
          customer: inputObject.customer,
          customer_address: inputObject.customer_address || '',
          order_type: inputObject.order_type,
          contact_person: inputObject.contact_person || '',
          project: inputObject.project,
          conversion_rate: inputObject.conversion_rate,
          transaction_date: inputObject.transaction_date,
          delivery_date: inputObject.delivery_date,
          company: inputObject.company,
          currency: inputObject.currency,
          set_warehouse: inputObject.set_warehouse,
          selling_price_list: inputObject.selling_price_list || '',
          payment_terms_template: inputObject.payment_terms_template || '',
          tc_name: inputObject.tc_name || '',
          sales_partner: inputObject.sales_partner || '',
          items: Object.values(inputObject.items).map((it) => {
            return { item_code: it.item_code, rate: parseFloat(it.rate), qty: it.qty };
          }),
        };
      }
      const newData = mapProperties(data);
      navigation.navigate('UpdateSalesOrder', { name: data.name, preState: newData, amend: 1, QuotationState: [] });
    } else if (status === 'Expired') {
    } else if (status === 'Ordered') {
    } else if (state === 'Expired') {
    }
  };

  const handleChangeStatus = (status) => {
    switch (status) {
      case 'Draft':
        console.log('status Draft =', status);
        break;
      case 'Open':
        console.log('status Open =', status);
        break;
      case 'Ordered':
        console.log('status Ordered =', status);
        break;
      case 'Cancelled':
        console.log('status Cancelled =', status);
        // do add new with old states
        break;

      case 'Expired':
        console.log('status Expired =', status);
        break;
      // default:
      //   // Handle other cases or set a default color
      //   break;
    }
    UpdateStatus(status);
  };

  const reformatDefaultSalesInvoice = (salesOrder) => {
    return (
      salesOrder !== undefined && {
        doctype: 'Sales Invoice',
        //step 1
        customer: salesOrder.customer,
        company: salesOrder.company,
        posting_date: '',
        due_date: '',
        contact_person: salesOrder.contact_person || '',
        customer_address: salesOrder.customer_address || '',
        //step 2
        is_return: 0,
        project: salesOrder.project,
        cost_center: '',
        currency: salesOrder.currency,
        update_stock: 1,
        selling_price_list: salesOrder.selling_price_list || '',
        set_warehouse: salesOrder.set_warehouse,
        payment_terms_template: salesOrder.payment_terms_template || '',
        tc_name: salesOrder.tc_name || '',
        sales_partner: salesOrder.sales_partner || '',
        //step3
        items: Object.values(salesOrder.items)?.map((it) => {
          return { item_code: it.item_code, rate: parseFloat(it.rate), qty: it.qty, sales_order: salesOrder.name };
        }),
      }
    );
  };

  const [defaultInvoiceData, setDefaultInvoiceData] = useState([]);

  useMemo(() => {
    if (data.items) {
      const formatData = reformatDefaultSalesInvoice(data);
      setDefaultInvoiceData(formatData);
    }
  }, [data]);

  const handleShowItemDetails = (data) => {
    navigation.navigate('SalesOrderItemDetails', {
      data: data,
    });
  };

  // get connection links
  const [links, setLinks] = useState([]);
  const isFocused = useIsFocused();
  const [doOnce, setDoOnce] = useState(true);

  // useMemo(() => {
  //   if (baseURL) {
  //     if (doOnce) {
  //       setRefetch(true);
  //       // console.log(baseURL + SALES_INVOICE_BY_SALES_ORDER + name);
  //       axios
  //         .get(baseURL + SALES_INVOICE_BY_SALES_ORDER + data?.name)
  //         .then((response) => {
  //           // Handle the successful response here

  //           // console.log('Response:', getDataAPICustom(response));
  //           setLinks(getDataAPICustom(response));
  //         })
  //         .catch((error) => {
  //           // Handle any errors that occur during the request
  //           // console.error('Error:', error);
  //         });
  //     } else {
  //       setDoOnce(false);
  //     }
  //   }
  // }, [isFocused]);
  useMemo(() => {
    // console.log('is Focused:', isFocused);
    if ((data !== undefined && doOnce && baseURL) || isFocused) {
      // handleFetchLinks(PAYMENT_BY_SALES_INVOICE, data.name, setLinksPayment);
      axios
        .get(baseURL + SALES_INVOICE_BY_SALES_ORDER + data?.name)
        .then((response) => {
          // Handle the successful response here

          // console.log('Response:', getDataAPICustom(response));
          setLinks(getDataAPICustom(response));
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          // console.error('Error:', error);
        });

      // console.log('LinkCreated:', LinkCreated);
      setDoOnce(false);
      // console.log('link:', LinkCreated);

      if (isFocused) {
        // console.log('has no connection (Sales Order)');
        setDoOnce(true);
      }
    }
  }, [data, isFocused, baseURL]);
  // useMemo(() => {

  // }, [baseURL, data, isFocused]);

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
          <HStack h={10}>
            {/* {data?.status === 'Open' && <CreateSalesOrderButton />} */}
            {data?.status === 'To Deliver and Bill' && (
              <CreateSelect
                id={name}
                defaultData={defaultInvoiceData}
                label={'Create'}
                menus={[{ label: 'Sales Invoice', value: 'AddNewSalesInvoice' }]}
              />
            )}
            {data?.status !== 'Completed' && <StatusButton status={data?.status} />}
            <PrintAndExport />
            {data?.status === 'Draft' && <EditButton />}
          </HStack>
        </HStack>
        <ScrollView w={'full'}>
          <VStack
            m={2}
            mt={6}
            mb={24}
            alignItems={'center'}
            space={2}
          >
            <VStack
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text
                fontWeight={'bold'}
                fontSize={'md'}
              >
                {data.name}
              </Text>
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
                    alignItems={'flex-end'}
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
                    <DisplayTextLeft>{data.delivery_date}</DisplayTextLeft>
                    <SubTextRight>{'Delivery Date'}</SubTextRight>
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
                <Text fontSize={'xs'}>Project</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.project ? data.project : '-'}
                </Text>
              </HStack>
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
                <Text fontSize={'xs'}>Source Warehouse</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 140 }}
                >
                  {data.set_warehouse ? data.set_warehouse : '-'}
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
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>{'Campaign'}</Text>
                <View>
                  <Text
                    fontWeight='bold'
                    _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                  >
                    {data.campaign ? data.campaign : '-'}
                  </Text>
                </View>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>{'Sales Partner'}</Text>
                <View>
                  <Text
                    fontWeight='bold'
                    _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                  >
                    {data.sales_partner ? data.sales_partner : '-'}
                  </Text>
                </View>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>{'Commission Rate'}</Text>
                <View>
                  <Text
                    fontWeight='bold'
                    _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                  >
                    {data.commission_rate ? data.commission_rate + '%' : '0.0%'}
                  </Text>
                </View>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>{'Total Commission'}</Text>
                <View>
                  <Text
                    fontWeight='bold'
                    _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                  >
                    {data.total_commission ? data.total_commission : '0.0'}
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

              <VStack
                mt={4}
                space={2}
              >
                <Text textAlign={'center'}> Items list</Text>
                {data.items?.map((item, index) => (
                  <Button
                    p={0}
                    key={item.item_name}
                    variant={'unstyled'}
                    onPress={() => handleShowItemDetails(item)}
                  >
                    <HStack
                      p={2}
                      shadow={1}
                      rounded={6}
                      bg={'white'}
                      justifyContent={'space-between'}
                      w={300}
                    >
                      {item.image !== '' ? (
                        <Box
                          w={20}
                          h={20}
                          my={2}
                          mx={2}
                          _ios={{ mr: 1 }}
                          rounded={6}
                          shadow={1}
                        >
                          <Image
                            style={{ flex: 1, resizeMode: 'cover' }}
                            rounded={6}
                            alt={'customer image'}
                            source={{
                              uri: item.image,
                              method: 'GET',
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          w={20}
                          h={20}
                          my={2}
                          mx={2}
                          _ios={{ mr: 2 }}
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
                            alt={'customer image'}
                            opacity={'0.5'}
                            rounded={6}
                            style={{ flex: 1, resizeMode: 'cover' }}
                            source={{
                              uri: 'https://images.pexels.com/photos/56030/pyrite-pyrites-mineral-sulfide-56030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                            }}
                          />
                        </Box>
                      )}
                      <VStack
                        mt={1}
                        mr={12}
                        maxW={'48'}
                      >
                        <Text fontSize={'xs'}>#{index + 1}.</Text>
                        <Text fontSize={'xs'}>
                          {item.item_name + ' '}({item.item_group})
                        </Text>
                        <Text fontSize={'xs'}>OUM: {' ' + item.uom + ' '}</Text>
                        <Text fontSize={'xs'}>
                          Quantity: {' ' + item.qty + ' '} Rate:{' '}
                          {' ' + parseFloat(item.price_list_rate).toFixed(2) + ' '}
                        </Text>
                        <Text fontSize={'xs'}>
                          Amount: {' ' + parseFloat(item.amount).toFixed(2) + ' ' + data.price_list_currency}
                        </Text>
                      </VStack>
                    </HStack>
                  </Button>
                ))}
                <Divider
                  w={'300'}
                  mt={6}
                />
                <Text
                  textAlign={'center'}
                  mt={2}
                >
                  Connections
                </Text>
                <ConnectionLinks
                  links={links}
                  navigateTo={connectionTo}
                  Icon={<SaleInvoice color={COLORS.secondary} />}
                  name={'Sales Invoice'}
                />
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
        <ExportPDF
          open={openPrint}
          handleClose={() => setOpenPrint(false)}
          docType={'Sales Order'}
          name={name}
          // format={'test-qt'}
        />
      </Center>
    </ContainerStyled>
  );
}

export default DetailsPage;
