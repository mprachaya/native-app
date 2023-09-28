import {
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
import React, { useMemo, useState } from 'react';
import { COLORS } from '../../../../constants/theme';
import { Edit, PaymentEntry, SaleOrder } from '../../../../constants/icons';
import { ConnectionLinks, CreateSelect, Loading } from '../../../../components';
import useFetch from '../../../../hooks/useFetch';
import useConfig from '../../../../config/path';
import { Alert } from 'react-native';
import axios from 'axios';
import ExportPDF from '../../../../_test/ExportPDF';
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
  const title = 'SalesInvoice';
  const { name } = route.params; // for sales invoice page
  // const [linkName, setLinkName] = useState(''); // for connection link
  const connectionSalesOrderTo = 'SalesOrderDetails'; // fior Sales Order Connection
  const connectionPaymentTo = 'PaymentEntryDetails';
  const { baseURL, SALES_INVOICE, PAYMENT_BY_SALES_INVOICE } = useConfig(true);
  // const heightScrollView = 2000;
  // data fetching with custom hook useFetch
  const { data, setData, setRefetch, loading, error } = useFetch(
    baseURL + SALES_INVOICE + '/' + (name ? name : route.params.connectName),
    {
      headers: {
        // Authorization: config.API_TOKEN,
      },
    }
  );
  const [openPrint, setOpenPrint] = useState(false);

  const handleOpenUpdate = () => {
    function mapProperties(inputObject) {
      return {
        doctype: 'Sales Invoice',
        customer: inputObject.customer,
        customer_address: inputObject.customer_address || '',

        contact_person: inputObject.contact_person || '',
        project: inputObject.project || '',

        posting_date: inputObject.posting_date,
        due_date: inputObject.due_date,
        company: inputObject.company,
        currency: inputObject.currency,
        cost_center: inputObject.cost_center || '',
        update_stock: inputObject.update_stock || '0',
        set_warehouse: inputObject.set_warehouse || '',
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
    // console.log('newData', newData);
    const sales_order = Object.values(links).map((link) => link.parent);
    let removeBlanketSO = String(sales_order).replace(/\[|\]/g, '');
    navigation.navigate('UpdateSalesInvoice', {
      name: data.name,
      preState: newData,
      amend: 0,
      CreateFrom: removeBlanketSO !== undefined ? removeBlanketSO : undefined,
    });
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
      // onPress={() => (stepState === 1 ? handleBack() : setStepState((post) => post - 1))}
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
      onPress={() => navigation.navigate('ExportPage', { DOCTYPE: 'Sales Invoice', NAME: name })}
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
      // onPress={() => handleOpenUpdate()}
      // onPress={() => (stepState === 1 ? handleBack() : setStepState((post) => post - 1))}
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
            : status === 'Unpaid' // show when already create invoice
            ? 'error.400'
            : status === 'Paid' // show when summit Sales Order (Status from To Deliver and Bill To Deliver) already create invoice
            ? 'error.400'
            : status === 'Cancelled'
            ? 'error.400'
            : null
        }
        color={
          status === 'Draft' // default status
            ? 'blue.400'
            : status === 'Unpaid' // show when already create invoice
            ? 'error.400'
            : status === 'Paid' // show when summit Sales Order (Status from To Deliver and Bill To Deliver) already create invoice
            ? 'error.400'
            : status === 'Cancelled'
            ? 'error.400'
            : null
        }
      >
        {status === 'Draft' ? 'Submit' : status === 'Unpaid' ? 'Cancel' : status === 'Cancelled' ? 'Amend' : null}
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
          : status === 'Submitted'
          ? 'emerald.300'
          : status === 'Paid'
          ? 'emerald.300'
          : status === 'Unpaid'
          ? 'warning.300'
          : status === 'Overdue'
          ? 'error.300'
          : status === 'Cancelled'
          ? 'error.300'
          : status === 'Return'
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
    const urlUpdateStatus = baseURL + SALES_INVOICE + '/' + data.name;
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
                  res.data && setRefetch(true);
                })
                .catch((err) => {
                  // console.log('An error occurred. Awkward.. : ', err.response);
                  alert('Status Error: ' + err.response.data.exception);
                });
            },
          },
          {
            text: 'Cancel',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel', // This makes the button appear differently (e.g., grayed out)
          },
        ],
        { cancelable: false } // Prevents users from dismissing the alert by tapping outside of it
      );
    } else if (status === 'Unpaid') {
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
                  res.data && res.data && setRefetch(true);
                })
                .catch((err) => {
                  // console.log('An error occurred. Awkward.. : ', err);
                  alert('Status Error: ' + err);
                });
            },
          },
          {
            text: 'Cancel',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel', // This makes the button appear differently (e.g., grayed out)
          },
        ],
        { cancelable: false } // Prevents users from dismissing the alert by tapping outside of it
      );
    } else if (status === 'Cancelled') {
      // function mapProperties(inputObject) {
      //   return {
      //     doctype: 'Sales Invoice',
      //     customer: inputObject.customer,
      //     customer_address: inputObject.customer_address || '',
      //     order_type: inputObject.order_type,
      //     contact_person: inputObject.contact_person || '',
      //     project: inputObject.project,
      //     conversion_rate: inputObject.conversion_rate,
      //     transaction_date: inputObject.transaction_date,
      //     delivery_date: inputObject.delivery_date,
      //     company: inputObject.company,
      //     currency: inputObject.currency,
      //     set_warehouse: inputObject.set_warehouse,
      //     selling_price_list: inputObject.selling_price_list || '',
      //     payment_terms_template: inputObject.payment_terms_template || '',
      //     tc_name: inputObject.tc_name || '',
      //     sales_partner: inputObject.sales_partner || '',
      //     items: Object.values(inputObject.items).map((it) => {
      //       return { item_code: it.item_code, rate: parseFloat(it.rate), qty: it.qty };
      //     }),
      //   };
      // return { doctype: inputObject.doctype };
      // return { doctype: inputObject.doctype };
      // }
      // const newData = mapProperties(data);
      // navigation.replace('UpdateSalesOrder', { name: data.name, preState: newData, amend: 1, QuotationState: [] });
    }
  };

  const handleChangeStatus = (status) => {
    switch (status) {
      case 'Draft':
        console.log('status Draft =', status);
        break;
      case 'Unpaid':
        console.log('status Unpaid =', status);
        break;
      case 'Paid':
        console.log('status Paid =', status);
        break;
      case 'Overdue':
        console.log('status Overdue =', status);
        // do add new with old states
        break;

      case 'Cancelled':
        console.log('status Cancelled =', status);
        break;
      // default:
      //   // Handle other cases or set a default color
      //   break;
    }
    UpdateStatus(status);
  };
  const handleShowItemDetails = (data) => {
    navigation.navigate('SalesInvoiceItemDetails', {
      data: data,
    });
  };

  // get connection links
  const [links, setLinks] = useState([]); // sales order
  const [linksPayment, setLinksPayment] = useState([]); // payment entry
  const isFocused = useIsFocused();
  const [doOnce, setDoOnce] = useState(true); // for loading when is focused once

  const handleFetchLinks = (path, byName, setState) => {
    if (path && baseURL) {
      axios
        .get(baseURL + path + byName)
        .then((res) => {
          setState(res.data.message);
          // console.log('message', res.data.message);
        })
        .catch((error) => {
          alert(error.message);
          // console.log(path + byName);
        });
    }
  };

  useMemo(() => {
    // console.log('is Focused:', isFocused);
    if ((data !== undefined && doOnce && baseURL) || isFocused) {
      handleFetchLinks(PAYMENT_BY_SALES_INVOICE, data.name, setLinksPayment);
      const temp = { ...data.items };
      if (temp) {
        const _links = Object.values(temp).filter((item, index) => item.sales_order !== undefined);
        if (_links.length !== 0 && _links[0].sales_order !== '') {
          // console.log('has connection (Sales Order)');
          // console.log(_links)
          // console.log('link:', _links);
          const LinkCreated = [
            {
              parent: _links[0].sales_order,
              transaction_date: _links[0].creation.slice(0, 10),
            },
          ];
          // console.log('LinkCreated:', LinkCreated);
          setLinks(LinkCreated);
          setDoOnce(false);
          // console.log('link:', LinkCreated);
        }
        if (isFocused) {
          // console.log('has no connection (Sales Order)');
          setDoOnce(true);
        }
      }
    }
  }, [data, isFocused, baseURL]);
  // refetch when back to page
  useMemo(() => {
    setRefetch(true);
  }, [isFocused]);

  const UpdateIsReturn = () => {
    if (data.items !== undefined && data.status === 'Draft') {
      // console.log('items: ', data?.items);
      const cloneItems = Object.values(data?.items).map((item) => ({
        item_code: item.item_code,
        rate: item.rate,
        qty: -parseInt(item.qty),
      }));
      // console.log(cloneItems);
      const arrayItems = Object.values(cloneItems);

      axios
        .put(baseURL + SALES_INVOICE + '/' + (name ? name : route.params.connectName), {
          is_return: !data?.is_return,
          items: arrayItems,
        })
        .then((response) => response.data)
        .then((res) => {
          res.data && setRefetch(true);
          // console.log(res.data);
        })
        .catch((err) => {
          //  console.log('An error occurred. Awkward.. : ', err);
          alert('Status Error: ' + err);
        });
    } else {
      setRefetch(true);

      // console.log(data);
    }
  };

  const reformatDefaultSalesInvoice = (salesInvoice) => {
    return (
      salesInvoice !== undefined && {
        payment_type: 'Receive',
        payment_received: salesInvoice?.total, // Amount received
        paid_amount: salesInvoice?.total || 0,
        received_amount: salesInvoice?.total || 0,
        mode_of_payment: null,
        posting_date: '',
        party: salesInvoice?.customer,
        company: salesInvoice?.company,
        paid_from: '113110 - Accounts receivable - Domestic - VCL',
        paid_to: '111100 - Cash in hand - VCL',
        party_type: 'Customer',
        references: [
          // Add references to link with Sales Invoices or other documents
          {
            doctype: 'Payment Entry Reference',
            reference_doctype: 'Sales Invoice',
            reference_name: salesInvoice?.name,
            allocated_amount: salesInvoice?.total,
            due_date: salesInvoice?.due_date,
            account: '113110 - Accounts receivable - Domestic - VCL',
            party_type: 'Customer',
            party: salesInvoice?.customer,
          },
        ],
      }
    );
  };

  const [defaultInvoiceData, setDefaultInvoiceData] = useState([]);

  useMemo(() => {
    if (data) {
      const formatData = reformatDefaultSalesInvoice(data);
      setDefaultInvoiceData(formatData);
      // console.log('formatData', formatData);
    }
  }, [data]);
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
            {data?.status === 'Unpaid' && (
              <CreateSelect
                id={name}
                defaultData={defaultInvoiceData}
                label={'Create'}
                menus={[{ label: 'Payment Entry', value: 'AddNewPaymentEntry' }]}
              />
            )}
            {data?.status !== 'Paid' && data?.status !== 'Cancelled' && data?.status !== 'Overdue' && (
              <StatusButton status={data?.status} />
            )}
            {data?.status !== 'Cancelled' && data?.status !== 'Overdue' && <PrintAndExport />}

            {data?.status === 'Draft' && <EditButton />}
          </HStack>
        </HStack>
        <ScrollView w={'full'}>
          <VStack
            m={2}
            mt={6}
            mb={24}
            space={2.5}
            // h={heightScrollView}

            alignItems={'center'}
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
                    <DisplayTextLeft>{data.posting_date}</DisplayTextLeft>
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
                    <DisplayTextLeft>{data.due_date}</DisplayTextLeft>
                    <SubTextRight>{'Due Date'}</SubTextRight>
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
                    <DisplayTextRight>{data.contact_display ? data.contact_display : '-'}</DisplayTextRight>
                    <SubTextRight>{'Contact'}</SubTextRight>
                  </VStack>
                </VStack>
              </HStack>
            </VStack>
            <Divider
              w={'300'}
              mt={2}
            />
            <VStack
              mt={6}
              space={2.5}
              alignItems='center'
            >
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Is Return</Text>
                <HStack>
                  <Checkbox
                    isDisabled={data?.status === 'Cancelled'}
                    aria-label='return-check'
                    isChecked={data.is_return || 0}
                    _checked={{ bg: COLORS.gray, borderColor: COLORS.lightWhite }}
                    onPress={data?.status === 'Draft' ? UpdateIsReturn : null}
                    // }
                  />
                </HStack>
              </HStack>
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
                <Text fontSize={'xs'}>Cost Center</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.cost_center ? data.cost_center : '-'}
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
                  {data.party_account_currency ? data.party_account_currency : '-'}
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
                <Text fontSize={'xs'}>Ignore Pricing Rule</Text>
                <HStack>
                  <Checkbox
                    aria-label='ignore-check'
                    isChecked={data.ignore_pricing_rule || 0}
                    _checked={{ bg: COLORS.gray, borderColor: COLORS.lightWhite }}
                    // onPress={() => handleDisable()}
                  />
                </HStack>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Update Stock</Text>
                <HStack>
                  <Checkbox
                    aria-label='update-stock-check'
                    isChecked={data.update_stock || 0}
                    _checked={{ bg: COLORS.gray, borderColor: COLORS.lightWhite }}
                    // onPress={() => handleDisable()}
                  />
                </HStack>
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
              space={2.5}
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
                              // headers: {
                              //   Authorization: token,
                              // },
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
                            <Text
                              letterSpacing={1}
                              fontWeight={'bold'}
                              fontSize={'lg'}
                              color={'white'}
                            >
                              #{index + 1}
                            </Text>
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
                        mt={3}
                        ml={2}
                        mr={12}
                        w={'full'}
                        maxW={'40'}
                      >
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
                  navigateTo={connectionSalesOrderTo}
                  Icon={<SaleOrder color={COLORS.secondary} />}
                  name={'Sales Order'}
                />
                <ConnectionLinks
                  links={linksPayment}
                  navigateTo={connectionPaymentTo}
                  Icon={<PaymentEntry color={COLORS.secondary} />}
                  name={'Payment Entry'}
                />
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
        {/* <ExportPDF
          open={openPrint}
          handleClose={() => setOpenPrint(false)}
          docType={'Sales Invoice'}
          name={name}
          // format={'test-qt'}
        /> */}
      </Center>
    </ContainerStyled>
  );
}

export default DetailsPage;
