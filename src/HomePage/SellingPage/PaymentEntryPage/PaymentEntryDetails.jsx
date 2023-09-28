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
import React, { useEffect, useMemo, useState } from 'react';
import { COLORS } from '../../../../constants/theme';
import { Edit, PaymentEntry, SaleInvoice, SaleOrder } from '../../../../constants/icons';
import { ConnectionLinks, Loading } from '../../../../components';
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
  const title = 'PaymentEntry';
  const { name } = route.params; // for sales invoice page
  // const [linkName, setLinkName] = useState(''); // for connection link
  const connectionSalesOrderTo = 'SalesOrderDetails'; // fior Sales Order Connection
  const connectionToSalesInvoice = 'SalesInvoiceDetails'; // fior Sales Invoice
  const { baseURL, PAYMENT_ENTRY, SALES_INVOICE_BY_PAYMENT_ENTRY, PAYMENT_ENTRY_UPDATE_DOCSTATUS } = useConfig(true);
  // const heightScrollView = 2000;
  // data fetching with custom hook useFetch
  const { data, setData, setRefetch, loading, error } = useFetch(
    baseURL + PAYMENT_ENTRY + (name ? name : route.params.connectName),
    {
      headers: {
        // Authorization: config.API_TOKEN,
      },
    }
  );

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const [openPrint, setOpenPrint] = useState(false);

  const handleOpenUpdate = () => {
    navigation.navigate('UpdatePaymentEntry', {
      name: data.name,
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
      onPress={() => navigation.navigate('ExportPage', { DOCTYPE: 'Payment Entry', NAME: name })}
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
            : status === 'Submitted' // show when already create invoice
            ? 'error.400'
            : status === 'Cancelled'
            ? 'error.400'
            : null
        }
        color={
          status === 'Draft' // default status
            ? 'blue.400'
            : status === 'Submitted' // show when already create invoice
            ? 'error.400'
            : status === 'Cancelled'
            ? 'error.400'
            : null
        }
      >
        {status === 'Draft' ? 'Submit' : status === 'Submitted' ? 'Cancel' : null}
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
          : status === 'Cancelled'
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
    const urlUpdateStatus = baseURL + PAYMENT_ENTRY_UPDATE_DOCSTATUS + '/' + data.name;
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
    } else if (status === 'Submitted') {
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
                  console.log('An error occurred. Awkward.. : ', err);
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
    }
  };

  const handleChangeStatus = (status) => {
    // switch (status) {
    //   case 'Draft':
    //     console.log('status Draft =', status);
    //     break;
    //   case 'Unpaid':
    //     console.log('status Unpaid =', status);
    //     break;
    //   case 'Paid':
    //     console.log('status Paid =', status);
    //     break;
    //   case 'Overdue':
    //     console.log('status Overdue =', status);
    //     // do add new with old states
    //     break;

    //   case 'Cancelled':
    //     console.log('status Cancelled =', status);
    //     break;
    //   // default:
    //   //   // Handle other cases or set a default color
    //   //   break;
    // }
    UpdateStatus(status);
  };
  // const handleShowItemDetails = (data) => {
  //   navigation.navigate('PaymentEntryItemDetails', {
  //     data: data,
  //   });
  // };

  // get connection links
  // const [links, setLinks] = useState([]); // sales order
  const [linksSalesInvoice, setLinksSalesInvoice] = useState([]); // payment entry
  const isFocused = useIsFocused();
  const [doOnce, setDoOnce] = useState(true); // for loading when is focused once

  const handleFetchLinks = (path, byName, setState) => {
    if (path) {
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
    if (data.length !== 0 && doOnce) {
      handleFetchLinks(SALES_INVOICE_BY_PAYMENT_ENTRY, data.name, setLinksSalesInvoice);
      setDoOnce(false);
    }
  }, [data, isFocused]);
  // refetch when back to page
  useMemo(() => {
    setRefetch(true);
  }, [isFocused]);

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
            {data?.status !== 'Cancelled' && <StatusButton status={data?.status} />}
            {data?.status !== 'Cancelled' && data?.status !== 'Draft' && <PrintAndExport />}

            {data?.status === 'Draft' && <EditButton />}
          </HStack>
        </HStack>
        <ScrollView w={'full'}>
          <VStack
            m={2}
            mt={8}
            mb={24}
            // h={heightScrollView}

            alignItems={'center'}
            space={2}
          >
            <VStack
              // bg={'black'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text
                // fontWeight={'bold'}
                fontSize={'sm'}
              >
                Payment Entry
              </Text>
              <Text
                fontWeight={'bold'}
                fontSize={'md'}
              >
                {data.name}
              </Text>
              <VStack
                space={6}
                mt={6}
              >
                <VStack alignItems={'center'}>
                  <DisplayTextLeft>{data.posting_date}</DisplayTextLeft>
                  <SubTextLeft>{'Date'}</SubTextLeft>
                </VStack>
                <HStack
                  w={'64'}
                  justifyContent={'space-evenly'}
                >
                  <VStack alignItems={'center'}>
                    <DisplayTextRight status={data.status}>{data.status}</DisplayTextRight>
                    <SubTextLeft>{'Status'}</SubTextLeft>
                  </VStack>

                  <VStack alignItems={'center'}>
                    <Text fontSize={'xs'}>{data.party_name}</Text>
                    <SubTextRight>{'Party Name'}</SubTextRight>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>
            {/* <Divider
              w={'300'}
              mt={2}
            /> */}
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
                <Text fontSize={'xs'}>Reference Date</Text>
                <HStack>
                  <Text
                    fontWeight='bold'
                    _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                  >
                    {data.reference_date ? data.reference_date : '-'}
                  </Text>
                </HStack>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Mode Of Payment</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.mode_of_payment ? data.mode_of_payment : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                // space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Account Paid From</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 140 }}
                >
                  {data.paid_from ? data.paid_from : '-'}
                </Text>
              </HStack>

              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Account Paid To</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 120 }}
                >
                  {data.paid_to ? data.paid_to : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Paid Amount</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.paid_amount ? parseFloat(data.paid_amount).toFixed(2) : '-'}
                </Text>
              </HStack>
              <HStack
                w={300}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Paid To Account Balance</Text>
                <Text
                  fontWeight='bold'
                  _ios={{ fontSize: 'xs', textAlign: 'right', maxWidth: 100 }}
                >
                  {data.paid_to_account_balance ? parseFloat(data.paid_to_account_balance).toFixed(2) : 0.0}
                </Text>
              </HStack>
            </VStack>
            <VStack
              mt={6}
              space={2}
              alignItems='center'
            >
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
              {/* <ConnectionLinks
                  links={links}
                  navigateTo={connectionSalesOrderTo}
                  Icon={<SaleOrder color={COLORS.secondary} />}
                  name={'Sales Order'}
                /> */}
              <ConnectionLinks
                links={linksSalesInvoice}
                navigateTo={connectionToSalesInvoice}
                Icon={<SaleInvoice color={COLORS.secondary} />}
                name={'Sales Invoice'}
              />
            </VStack>
          </VStack>
        </ScrollView>
        {/* <ExportPDF
          open={openPrint}
          handleClose={() => setOpenPrint(false)}
          docType={'Payment Entry'}
          name={name}
          // format={'test-qt'}
        /> */}
      </Center>
    </ContainerStyled>
  );
}

export default DetailsPage;
