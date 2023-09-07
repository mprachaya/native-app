import {
  Box,
  Button,
  Center,
  CheckIcon,
  ChevronLeftIcon,
  Container,
  DeleteIcon,
  Divider,
  FlatList,
  FormControl,
  HStack,
  Image,
  Input,
  Modal,
  ScrollView,
  Select,
  Text,
  VStack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState, useMemo, useEffect } from 'react';
import { DynamicSelectPage, StaticSelectPage } from '../../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';
import FadeTransition from '../../../../components/FadeTransition';
import { Platform, Pressable, StyleSheet } from 'react-native';
import useSubmit from '../../../../hooks/useSubmit';
import useConfig from '../../../../config/path';
import axios from 'axios';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Quotation } from '../../../../constants/icons';

// wrap components
const ContainerStyled = (props) => {
  return (
    <View
      height={'full'}
      bg={'blueGray.50'}
      {...props}
    >
      {props.children}
    </View>
  );
};
// input
const StyledTextField = (props) => {
  return (
    <VStack>
      <FormControl isInvalid={props.isRequired || false}>
        <FormControl.Label>{props.label}</FormControl.Label>
        <Input
          {...props}
          name={props.name}
          value={props.value}
          bg={'blueGray.100'}
          borderWidth={2}
          borderColor={'gray.200'}
          variant={'filled'}
          rounded={6}
          placeholder={props.placeholder}
          fontSize={{ base: SIZES.medium || props.baseSize, lg: SIZES.large || props.lgSize }}
          minW={{ base: 'full', lg: 400 }}
          w={{ base: 'full' || props.baseSize, lg: 400 || props.lgSize }}
          _focus={{
            borderColor: 'blueGray.300',
            backgroundColor: 'blueGray.100',
          }}
          onChangeText={props.handleChange}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>Required</FormControl.ErrorMessage>
      </FormControl>
    </VStack>
  );
};
// main component
function UpdateQuotation({ route, navigation, handleClose }) {
  const { name, preState, amend } = route.params;
  // page name display
  const title = 'Add New Quotation';
  // navigate step state
  const [stepState, setStepState] = useState(1);
  // max of steps
  const maxStep = 3;

  // state for show / hide selection (dynamically)
  const [openSelection, setOpenSelection] = useState(false);
  // state for show / hide selection (static)
  const [openCustomerType, setOpenCustomerType] = useState(false);

  // initial state
  const initialState = {
    doctype: 'Quotation',
    quotation_to: 'Customer',
    party_name: '',
    customer_address: '',
    contact_person: '',
    transaction_date: '',
    valid_till: '',
    company: '',
    order_type: 'Sales',
    currency: 'THB',
    selling_price_list: 'Standard Selling',
    payment_terms_template: '',
    tc_name: '',
    items: null,
  };

  // main state
  const [state, setState] = useState(preState);
  // for handle selection title (dynamic)
  const [titleSelection, setTitleSelection] = useState('');
  // for handle dynamic url selection
  const [urlSelected, setUrlSelected] = useState('');
  // url path for fetching selection data
  const {
    baseURL,
    CUSTOMER,
    LEAD,
    ADDRESS,
    CONTACT,
    CURRENCY,
    PRICE_LIST,
    PAYMENT_TERMS_TEMPLATES,
    TERMS_AND_CONDITIONS,
    ITEM_QRCODE,
    QUOTATION,
    COMPANY,
  } = useConfig(true);
  const urlCurrency = baseURL + CURRENCY;
  const urlPriceList = baseURL + PRICE_LIST;
  const urlPaymentTermTemplate = baseURL + PAYMENT_TERMS_TEMPLATES;
  const urlTermAndConditions = baseURL + TERMS_AND_CONDITIONS;
  const urlItemQRCode = baseURL + ITEM_QRCODE;
  const urlSubmit = baseURL + QUOTATION;
  const urlCompany = baseURL + COMPANY;

  const urlCustomer = baseURL + CUSTOMER;
  const urlLead = baseURL + LEAD;
  const urlAddress = baseURL + ADDRESS;
  const urlContact = baseURL + CONTACT;
  // handle dynamic property for multi selection in page
  const [propertySelected, setPropertySelected] = useState('');

  // handle change property when open selection (dynamic)
  const getValueFromSelection = (name) => {
    setPropertySelected(name);
  };
  // handle change details of selection
  const handleChangeURL = (title, name, url) => {
    setTitleSelection(title);
    getValueFromSelection(name);
    setUrlSelected(url);
    setOpenSelection(true);
  };

  // sub component first step
  const FirstStep = ({ state, setState }) => {
    // sub state
    const [ctmState, setCtmState] = useState(state);
    const [customer, setCustomer] = useState(null);
    // filter address
    var filterAddress = `?filters=[["address_title","=","${customer?.name}"]]&fields=["*"]`;
    var filterContact = `?fields=["*"]&filters=[["Dynamic Link","link_name", "=", "${customer?.name}"]]`;
    // start for required validation
    const [requiredState] = useState(['company', 'party_name']);
    const [nullState, setNullState] = useState({
      company: false,
      party_name: false,
    });

    // date now for android
    const [dateAndroidNow] = useState(new Date());
    const [dateAndroidNextMount, setAndroidNextMount] = useState(new Date()); // add 1 mount
    const onChangeAndroidFrom = (event, selectedDate) => {
      const currentDate = selectedDate;
      const yyyy = currentDate.getFullYear();
      let mm = currentDate.getMonth() + 1; // Months start at 0!
      let dd = currentDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      const formattedToday = yyyy + '-' + mm + '-' + dd;
      if (event?.type === 'dismissed') {
        setCtmState((pre) => ({ ...pre, transaction_date: formattedToday }));
        return;
      }
      setCtmState((pre) => ({ ...pre, transaction_date: formattedToday }));
    };
    const onChangeAndroidTo = (event, selectedDate) => {
      const currentDate = selectedDate;
      const yyyy = currentDate.getFullYear();
      let mm = currentDate.getMonth() + 1; // Months start at 0!
      let dd = currentDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      const formattedToday = yyyy + '-' + mm + '-' + dd;
      if (event?.type === 'dismissed') {
        setCtmState((pre) => ({ ...pre, valid_till: formattedToday }));
        return;
      }
      setCtmState((pre) => ({ ...pre, valid_till: formattedToday }));
    };

    const showAndoirdDatepickerFrom = () => {
      DateTimePickerAndroid.open({
        value: dateAndroidNow,
        onChange: (event, date) => onChangeAndroidFrom(event, date),
        mode: 'date',
        is24Hour: true,
      });
    };

    const showAndoirdDatepickerTo = () => {
      DateTimePickerAndroid.open({
        value: dateAndroidNextMount,
        onChange: (event, date) => onChangeAndroidTo(event, date),
        mode: 'date',
        is24Hour: true,
      });
    };
    // date now for ios
    const [dateIOS, setDateIOS] = useState(new Date());
    const [dateIOSNextMonth, setDateIOSNextMonth] = useState(new Date());
    // const [show, setShow] = useState(false);
    const onChangeIOSfrom = (event, selectedDate) => {
      console.log(selectedDate);
      const currentDate = selectedDate;
      const yyyy = currentDate.getFullYear();
      let mm = currentDate.getMonth() + 1; // Months start at 0!
      let dd = currentDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      // const formattedToday = dd + '-' + mm + '-' + yyyy;
      const formattedToday = yyyy + '-' + mm + '-' + dd;
      if (event?.type === 'dismissed') {
        setCtmState((pre) => ({ ...pre, transaction_date: formattedToday }));
        return;
      } else {
        setCtmState((pre) => ({ ...pre, transaction_date: formattedToday }));
      }
    };
    const onChangeIOSto = (event, selectedDate) => {
      const currentDate = selectedDate;
      const yyyy = currentDate.getFullYear();
      let mm = currentDate.getMonth() + 1; // Months start at 0!
      let dd = currentDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      const formattedToday = yyyy + '-' + mm + '-' + dd;
      if (event?.type === 'dismissed') {
        setCtmState((pre) => ({ ...pre, valid_till: formattedToday }));
        return;
      } else {
        setCtmState((pre) => ({ ...pre, valid_till: formattedToday }));
      }
    };

    const handleCheckRequired = () => {
      requiredState.forEach((st_name) => {
        if (!ctmState[st_name]) {
          setNullState((pre) => ({ ...pre, [st_name]: true }));
        } else {
          setNullState((pre) => ({ ...pre, [st_name]: false }));
        }
      });
      // console.log(nullState);
    };

    const handleForward = () => {
      // before go to next step check all required state
      // check then make input error style
      handleCheckRequired();
      // if column required is not filled push property name into check array
      let check = [];
      requiredState.forEach((st_name) => {
        if (!ctmState[st_name]) {
          check.push(st_name);
        }
      });
      // if have any length of check mean required state is still not filled yet
      if (check.length !== 0) {
      } else {
        // if filled go to next step
        setStepState((post) => post + 1);
        setState(ctmState);
      }
    };

    const handleBackFirstPage = () => {
      // handleClose();
      navigation.pop();
      navigation.replace('Quotation', { filterData: [] });
      setState(initialState);
    };

    const handleOpenDynamicSelection = (title, name, url) => {
      handleChangeURL(title, name, url);
      // set main state with sub state
      setState(ctmState);
    };

    const BackButton = () => (
      <Button
        m={2}
        w={'20'}
        rounded={'lg'}
        variant={'unstyled'}
        background={COLORS.lightWhite}
        _pressed={{ bg: 'blueGray.200' }}
        _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}
        onPress={() => (stepState === 1 ? handleBackFirstPage() : setStepState((post) => post - 1))}
      >
        Back
      </Button>
    );

    const ForwardButton = () => (
      <Button
        m={2}
        w={'20'}
        rounded={'lg'}
        variant={'unstyled'}
        background={COLORS.tertiary}
        _pressed={{ background: COLORS.tertiary2 }}
        _text={{ fontSize: 'sm', fontWeight: 'extrabold', color: COLORS.lightWhite }}
        onPress={() => stepState <= maxStep && handleForward()}
      >
        {stepState !== maxStep ? 'Next' : 'Update'}
      </Button>
    );

    const DisplayStep = () => (
      <HStack
        mt={{ base: 6, lg: 12 }}
        mb={6}
      >
        <Text
          color={COLORS.tertiary}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          fontWeight={'bold'}
          letterSpacing={2}
        >
          {stepState}
        </Text>
        <Text
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          fontWeight={'bold'}
          letterSpacing={2}
        >
          /{maxStep}
        </Text>
        <Text
          ml={2}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          fontWeight={'bold'}
        >
          STEP
        </Text>
      </HStack>
    );

    const OnPressContainer = ({ children, onPress }) => (
      <Pressable onPress={() => onPress()}>
        <View pointerEvents='none'>{children}</View>
      </Pressable>
    );

    useMemo(() => {
      if (ctmState.party_name !== undefined && ctmState.party_name !== '') {
        axios
          .get(
            ctmState.quotation_to === 'Customer'
              ? urlCustomer + '/' + ctmState.party_name
              : urlLead + '/' + ctmState.party_name
          )
          .then((response) => response.data)
          .then((res) => {
            // console.log(res.data);

            //checking for multiple responses for more flexibility
            //with the url we send in.
            // alert(res.data.territory);
            setCustomer(res.data);
            // console.log(res.data);
            // console.log('Fetching successful!');
          })
          .catch((err) => {
            // console.log(err);
          });
      }
      // console.log(ctmState);
    }, [ctmState]);
    // set Default value of to Date Object (+ 1 month)
    useMemo(() => {
      setCtmState((pre) => ({ ...pre, transaction_date: preState.transaction_date, valid_till: preState.valid_till }));
      setDateIOS(new Date(preState.transaction_date));
      setDateIOSNextMonth(new Date(preState.valid_till));
    }, []);

    return (
      <React.Fragment>
        <HStack
          position={'absolute'}
          left={2}
          top={2}
        >
          <BackButton />
        </HStack>
        <HStack
          position={'absolute'}
          right={2}
          top={2}
        >
          <ForwardButton />
        </HStack>
        <View mt={12}>
          <DisplayStep />
        </View>
        <VStack
          mt={2}
          m={6}
          space={SPACING.small}
        >
          <ScrollView>
            <VStack h={{ base: 700, lg: 1400 }}>
              <OnPressContainer onPress={() => handleOpenDynamicSelection('Company', 'company', urlCompany)}>
                <StyledTextField
                  caretHidden
                  isRequired={nullState.company}
                  label={'Company*'}
                  value={ctmState.company}
                  showSoftInputOnFocus={false} // disable toggle keyboard
                />
              </OnPressContainer>
              <HStack
                w={'container'}
                space={2}
                direction={{ base: 'column', lg: 'row' }}
              >
                {/* quotation to  */}
                <View>
                  <FormControl justifyContent={'center'}>
                    <FormControl.Label>Quotation To</FormControl.Label>
                  </FormControl>
                  <Select
                    dropdownIcon={true}
                    selectedValue={ctmState.quotation_to}
                    w={{ base: 'full', lg: 400 }}
                    fontSize={18}
                    borderWidth={2}
                    borderColor={'gray.200'}
                    accessibilityLabel='Quotation To'
                    placeholder='Choose Quotation To'
                    _selectedItem={{
                      bg: 'blueGray.200',
                      endIcon: <CheckIcon color={'blueGray.400'} />,
                    }}
                    onValueChange={(itemValue) => {
                      setCtmState((pre) => ({
                        ...pre,
                        quotation_to: itemValue,
                        party_name: '',
                        customer_address: '',
                        contact_person: '',
                      }));
                      setCustomer({});
                    }}
                  >
                    <Select.Item
                      label='Lead'
                      value='Lead'
                    />

                    <Select.Item
                      label='Customer'
                      value='Customer'
                    />
                  </Select>
                </View>
              </HStack>
              <VStack space={2}>
                <OnPressContainer
                  onPress={() =>
                    handleOpenDynamicSelection(
                      ctmState.quotation_to === 'Customer' ? 'Customer' : 'Lead',
                      'party_name',
                      ctmState.quotation_to === 'Customer' ? urlCustomer : urlLead
                    )
                  }
                >
                  <StyledTextField
                    caretHidden
                    isRequired={nullState.party_name}
                    label={ctmState.quotation_to === 'Customer' ? 'Customer*' : 'Lead*'}
                    value={ctmState.party_name}
                    showSoftInputOnFocus={false} // disable toggle keyboard
                  />
                </OnPressContainer>
                {/* <OnPressContainer onPress={() => handleOpenDynamicSelection('Territory', 'territory', urlTerritory)}> */}
                {ctmState.quotation_to === 'Customer' ? (
                  <VStack>
                    <StyledTextField
                      caretHidden
                      isDisabled
                      label={'Customer Group'}
                      name={'customer_group'}
                      value={customer?.customer_group}
                      showSoftInputOnFocus={false} // disable toggle keyboard
                    />

                    <StyledTextField
                      caretHidden
                      isDisabled
                      label={'Territory'}
                      name={'territory'}
                      value={customer?.territory}
                      showSoftInputOnFocus={false} // disable toggle keyboard
                    />
                  </VStack>
                ) : (
                  <StyledTextField
                    caretHidden
                    isDisabled
                    label={'Company'}
                    value={customer?.company_name}
                    showSoftInputOnFocus={false} // disable toggle keyboard
                  />
                )}
                {/* </OnPressContainer> */}
              </VStack>
              {/* for Android */}
              {Platform.OS === 'android' && (
                <VStack space={4}>
                  <View w={'container'}>
                    <OnPressContainer onPress={() => showAndoirdDatepickerFrom()}>
                      <StyledTextField
                        caretHidden
                        label={'From Date'}
                        // placeholder={'Select Transaction Date'}
                        value={ctmState.transaction_date}
                        showSoftInputOnFocus={false} // disable toggle keyboard
                      />
                    </OnPressContainer>
                  </View>
                  <View w={'container'}>
                    <OnPressContainer onPress={() => showAndoirdDatepickerTo()}>
                      <StyledTextField
                        caretHidden
                        label={'To Date'}
                        placeholder={'Select Valid Date'}
                        value={ctmState.valid_till}
                        showSoftInputOnFocus={false} // disable toggle keyboard
                      />
                    </OnPressContainer>
                  </View>
                </VStack>
              )}
              {/* for IOS */}
              {Platform.OS === 'ios' && (
                <React.Fragment>
                  <HStack
                    justifyContent={'center'}
                    mt={2}
                  >
                    <View w={'container'}>
                      <View alignItems={'start'}>
                        <HStack>
                          <RNDateTimePicker
                            display='inline'
                            // disabled={!checkState}
                            is24Hour={true}
                            mode='date'
                            value={dateIOS}
                            onChange={onChangeIOSfrom}
                          />
                        </HStack>
                      </View>
                    </View>
                  </HStack>
                  <HStack justifyContent={'center'}>
                    <View w={'container'}>
                      <FormControl justifyContent={'center'}>
                        <FormControl.Label mx={7}>To Date</FormControl.Label>
                      </FormControl>
                      <View
                        mx={12}
                        alignItems={'start'}
                      >
                        <RNDateTimePicker
                          display='inline'
                          is24Hour={true}
                          mode='date'
                          value={dateIOSNextMonth}
                          onChange={onChangeIOSto}
                        />
                      </View>
                    </View>
                  </HStack>
                </React.Fragment>
              )}

              {ctmState.quotation_to === 'Customer' && (
                <React.Fragment>
                  <OnPressContainer
                    onPress={() => {
                      ctmState.party_name === ''
                        ? alert(ctmState.quotation_to === 'Customer' ? 'Please select Customer' : 'Please select Lead')
                        : handleOpenDynamicSelection('Address', 'customer_address', urlAddress + filterAddress);
                    }}
                  >
                    <StyledTextField
                      caretHidden
                      label={'Address'}
                      name={'customer_address'}
                      value={ctmState.customer_address}
                      showSoftInputOnFocus={false} // disable toggle keyboard
                    />
                  </OnPressContainer>

                  <OnPressContainer
                    onPress={() => {
                      handleOpenDynamicSelection('Contact Person', 'contact_person', urlContact + filterContact);
                    }}
                  >
                    <StyledTextField
                      caretHidden
                      label={'Contact Person'}
                      name={'contact_person'}
                      value={ctmState.contact_person}
                      showSoftInputOnFocus={false} // disable toggle keyboard
                    />
                  </OnPressContainer>
                </React.Fragment>
              )}
            </VStack>
          </ScrollView>
        </VStack>
      </React.Fragment>
    );
  };
  // sub component second step
  const SecondStep = ({ state, setState }) => {
    const [ctmState2, setCtmState2] = useState(state);

    // const [requiredState] = useState([]);
    // const [nullState, setNullState] = useState({
    //   customer_name: false,
    //   customer_type: false,
    //   customer_group: false,
    //   territory: false,
    // });

    // const handleCheckRequired = () => {
    //   requiredState.forEach((st_name) => {
    //     if (!ctmState2[st_name]) {
    //       setNullState((pre) => ({ ...pre, [st_name]: true }));
    //     } else {
    //       setNullState((pre) => ({ ...pre, [st_name]: false }));
    //     }
    //   });
    //   // console.log(nullState);
    // };

    const handleForward = () => {
      // before go to next step check all required state
      // check then make input error style
      // handleCheckRequired();
      // if column required is not filled push property name into check array
      // let check = [];
      // requiredState.forEach((st_name) => {
      //   if (!ctmState2[st_name]) {
      //     check.push(st_name);
      //   }
      // });
      // // if have any length of check mean required state is still not filled yet
      // if (check.length !== 0) {
      // } else {
      // if filled go to next step
      // handleSubmit(ctmState2);

      setStepState((post) => post + 1);
      // setState(ctmState2);
      // }
    };

    const handleBack = () => {
      navigation.goBack();
      setState(initialState);
    };

    const handleOpenDynamicSelection = (title, name, url) => {
      handleChangeURL(title, name, url);
      // set main state with sub state
      setState(ctmState2);
    };

    const BackButton = () => (
      <Button
        m={2}
        w={'20'}
        rounded={'lg'}
        variant={'unstyled'}
        background={COLORS.lightWhite}
        _pressed={{ background: COLORS.white }}
        _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}
        onPress={() => (stepState === 1 ? handleBack() : setStepState((post) => post - 1))}
      >
        Back
      </Button>
    );

    const ForwardButton = () => (
      <Button
        m={2}
        w={'20'}
        rounded={'lg'}
        variant={'unstyled'}
        background={COLORS.tertiary}
        _pressed={{ background: COLORS.tertiary2 }}
        _text={{ fontSize: 'sm', fontWeight: 'extrabold', color: COLORS.lightWhite }}
        onPress={() => stepState <= maxStep && handleForward()}
      >
        {stepState !== maxStep ? 'Next' : 'Update'}
      </Button>
    );

    const DisplayStep = () => (
      <HStack
        mt={{ base: 6, lg: 12 }}
        mb={6}
      >
        <Text
          color={COLORS.tertiary}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          fontWeight={'bold'}
          letterSpacing={2}
        >
          {stepState}
        </Text>
        <Text
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          fontWeight={'bold'}
          letterSpacing={2}
        >
          /{maxStep}
        </Text>
        <Text
          ml={2}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          fontWeight={'bold'}
        >
          STEP
        </Text>
      </HStack>
    );

    const OnPressContainer = ({ children, onPress }) => (
      <Pressable onPress={() => onPress()}>
        <View pointerEvents='none'>{children}</View>
      </Pressable>
    );

    // useMemo(() => {
    //   console.log(stepState);
    // }, [stepState]);

    return (
      <React.Fragment>
        <HStack
          position={'absolute'}
          left={2}
          top={2}
        >
          <BackButton />
        </HStack>
        <HStack
          position={'absolute'}
          right={2}
          top={2}
        >
          <ForwardButton />
        </HStack>
        <View mt={12}>
          <DisplayStep />
        </View>
        <VStack
          mt={2}
          m={6}
          space={SPACING.small}
        >
          <ScrollView>
            <VStack h={{ base: 700, lg: 1400 }}>
              <VStack space={2}>
                <View>
                  <FormControl justifyContent={'center'}>
                    <FormControl.Label>Order Type</FormControl.Label>
                  </FormControl>
                  <Select
                    isDisabled
                    dropdownIcon={true}
                    selectedValue={ctmState2.order_type}
                    w={{ base: 'full', lg: 400 }}
                    fontSize={18}
                    borderWidth={2}
                    borderColor={'gray.200'}
                    accessibilityLabel='Order To'
                    placeholder='Choose Order Type'
                    _selectedItem={{
                      bg: 'blueGray.200',
                      endIcon: <CheckIcon color={'blueGray.400'} />,
                    }}
                    onValueChange={(itemValue) => {
                      setCtmState2((pre) => ({
                        ...pre,
                        order_type: itemValue,
                      }));
                    }}
                  >
                    <Select.Item
                      label='Sales'
                      value='Sales'
                    />

                    <Select.Item
                      label='Maintenance'
                      value='Maintenance'
                    />
                    <Select.Item
                      label='Shopping Cart'
                      value='Shopping Cart'
                    />
                  </Select>
                </View>
                <OnPressContainer onPress={() => handleOpenDynamicSelection('Currency', 'currency', urlCurrency)}>
                  <StyledTextField
                    // isRequired
                    caretHidden
                    value={ctmState2.currency}
                    label={'Currency'}
                    name={'currency'}
                    showSoftInputOnFocus={false}
                  />
                </OnPressContainer>
                {/* currency: 'THB', conversion_rate: 1, selling_price_list: 'Standard Selling', payment_terms_template: null, */}
                {/* tc_name: null,
              <OnPressContainer
                onPress={() => handleOpenDynamicSelection('Price List', 'default_price_list', urlPriceList)}
              > */}

                {/* </OnPressContainer> */}
                <OnPressContainer
                  onPress={() => handleOpenDynamicSelection('Price List', 'default_price_list', urlPriceList)}
                >
                  <StyledTextField
                    // isRequired
                    caretHidden
                    value={ctmState2.selling_price_list}
                    label={'Price List'}
                    name={'default_price_list'}
                    showSoftInputOnFocus={false}
                  />
                </OnPressContainer>
                <OnPressContainer
                  onPress={() =>
                    handleOpenDynamicSelection('Price List', 'payment_terms_template', urlPaymentTermTemplate)
                  }
                >
                  <StyledTextField
                    // isRequired
                    caretHidden
                    value={ctmState2.payment_terms_template}
                    label={'Price Payment Terms Template'}
                    // name={'default_price_list'}
                    showSoftInputOnFocus={false}
                  />
                </OnPressContainer>
                <OnPressContainer
                  onPress={() => handleOpenDynamicSelection('Terms & Conditions', 'tc_name', urlTermAndConditions)}
                >
                  <StyledTextField
                    // isRequired
                    caretHidden
                    value={ctmState2.tc_name}
                    label={'Terms & Conditions'}
                    // name={'default_price_list'}
                    showSoftInputOnFocus={false}
                  />
                </OnPressContainer>
              </VStack>
            </VStack>
          </ScrollView>
        </VStack>
      </React.Fragment>
    );
  };

  const ThirdStep = ({ state, setState }) => {
    const [items, setItems] = useState({ items: state.items });
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [qrCodeData, setQrCodeData] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleForward = () => {
      // before go to next step check all required state
      // check then make input error style
      // handleCheckRequired();
      // if column required is not filled push property name into check array
      let checkNull = stateWithAmount.items === null;
      // requiredState.forEach((st_name) => {
      //   if (!ctmState2[st_name]) {
      //     check.push(st_name);
      //   }
      // });
      // if have any length of check mean required state is still not filled yet
      if (checkNull) {
        alert('Please Add Items');
      } else {
        // if filled go to next step
        // handleSubmit(stateWithAmount);
        // setState((pre) => ({ ...pre, items: stateWithAmount }));
        // console.log('items =', items);
        const cloneState = { ...state };

        const stateNoAmount = Object.values(stateWithAmount)?.map((obj) => {
          // Create a new object with properties other than "amount"
          const { amount, ...newObj } = obj;
          return newObj;
        });
        cloneState.items = Object.values(stateNoAmount);
        console.log(cloneState);
        console.log(urlSubmit);
        // when status === amend
        if (amend === 1) {
          axios
            .delete(`${urlSubmit}/${name}`)
            .then((response) => {
              console.log('Quotation deleted successfully:', response.data);
            })
            .catch((error) => {
              console.error('Error deleting quotation:', error);
            });
          axios
            .post(urlSubmit, cloneState)
            .then((response) => console.log('Insert Amend!:', response.data))
            .catch((err) => {
              console.log('An error occurred. Awkward.. : ', err.message);
              // alert('Status Error: ' + err);
            })
            .finally(() => {
              setStepState(4);
            });
        } else {
          // normal update
          axios
            .put(urlSubmit + '/' + name, cloneState)
            .then((response) => console.log('Update Normal!:', response.data))
            .catch((err) => {
              console.log('An error occurred. Awkward.. : ', err.message);
              // alert('Status Error: ' + err);
            })
            .finally(() => {
              setStepState(4);
            });
        }
      }
    };

    const handleBack = () => {
      navigation.goBack();
      setState(initialState);
    };

    const handleBackStoreItems = () => {
      setStepState((post) => post - 1);
      console.log('items: ', stateWithAmount);
      if (items.items === null) {
        setState((pre) => ({ ...pre, items: null }));
      } else {
        setState((pre) => ({ ...pre, items: stateWithAmount }));
      }
    };

    const BackButton = () => (
      <Button
        m={2}
        w={'20'}
        rounded={'lg'}
        variant={'unstyled'}
        background={COLORS.lightWhite}
        _pressed={{ background: COLORS.white }}
        _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}
        onPress={() => (stepState === 1 ? handleBack() : handleBackStoreItems())}
      >
        Back
      </Button>
    );

    const ForwardButton = () => (
      <Button
        m={2}
        w={'20'}
        rounded={'lg'}
        variant={'unstyled'}
        background={COLORS.tertiary}
        _pressed={{ background: COLORS.tertiary2 }}
        _text={{ fontSize: 'sm', fontWeight: 'extrabold', color: COLORS.lightWhite }}
        onPress={() => stepState <= maxStep && handleForward()}
      >
        {stepState !== maxStep ? 'Next' : 'Update'}
      </Button>
    );

    const DisplayStep = () => (
      <HStack
        mt={{ base: 6, lg: 12 }}
        mb={6}
      >
        <Text
          color={COLORS.tertiary}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          fontWeight={'bold'}
          letterSpacing={2}
        >
          {stepState}
        </Text>
        <Text
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          fontWeight={'bold'}
          letterSpacing={2}
        >
          /{maxStep}
        </Text>
        <Text
          ml={2}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          fontWeight={'bold'}
        >
          STEP
        </Text>
      </HStack>
    );

    const OnPressContainer = ({ children, onPress }) => (
      <Pressable onPress={() => onPress()}>
        <View pointerEvents='none'>{children}</View>
      </Pressable>
    );

    // useMemo(() => {
    //   console.log(stepState);
    // }, [stepState]);
    const [stateWithAmount, setStateWithAmount] = useState({ items: null });

    const AskCameraPermission = () =>
      Alert.alert('Ask for Permission', '"ERP Next" Would Like to Access the Camera', [
        {
          text: `Don't Allow`,
          onPress: () => {
            setShowAlert(false);
            setScanned(false);
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            Linking.openSettings();
            setShowAlert(false);
          },
        },
      ]);
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status !== 'granted') {
        setShowAlert(true);
      } else {
        setHasPermission(true);
      }
    };
    const handleBarCodeScanned = ({ type, data }) => {
      axios
        .get(`${urlItemQRCode}?fields=["*"]&filters=[["Item Barcode","barcode","=","${data}"]]`)
        .then((response) => response.data)
        .then((res) => {
          if (res.data.length > 0) {
            // res.data && alert(`Item exist!:`);
            if (items.items !== null) {
              const duplicated = items.items.find((item) => item.item_code === res.data[0].item_code);
              console.log('duplicated = ', duplicated);
              if (duplicated === undefined) {
                setItems((pre) => ({
                  items: [...items.items, { item_code: res.data[0].item_code, qty: 1, rate: 1 }],
                }));
                setQrCodeData(res.data[0].item_code);
                // setItemCode(res.data[0].item_code);
              } else {
                alert(`Item is duplicated!`);
              }
            } else {
              setItems((pre) => ({
                ...pre,
                items: [{ item_code: res.data[0].item_code, qty: 1, rate: 1 }],
              }));
              setQrCodeData(res.data[0].item_code);
              // setItemCode(res.data[0].item_code);
            }
          } else {
            alert(`Item not exist!`);
            setQrCodeData('');
          }
        })
        .catch((err) => {
          console.log(err);
          alert(`Item not exist!`);
          setQrCodeData('');
        });

      setScanned(false);
    };
    useMemo(() => {
      getBarCodeScannerPermissions();
    }, []);

    useMemo(() => {
      // console.log(hasPermission);
      if (!hasPermission && scanned) {
        getBarCodeScannerPermissions();
      }
      // console.log(permission !== null && permission.granted);
    }, [scanned]);

    useMemo(() => {
      if (items?.items !== null) {
        const updateState = Object.values(items?.items).map((data, index) => {
          const temp = { ...items.items };
          // console.log('temp', temp);
          temp[index].amount = (parseFloat(temp[index]?.qty) * parseFloat(temp[index]?.rate)).toFixed(2);
          return temp;
        });
        // console.log('Add Amount', ...updateState);
        setStateWithAmount(...updateState);

        // Object.values(state.items)?.map((element) => {
        //   delete element.amount;
        // });
      } else {
        setStateWithAmount(items);
      }
    }, [items]);

    return (
      <React.Fragment>
        <HStack
          position={'absolute'}
          left={2}
          top={2}
        >
          <BackButton />
        </HStack>
        <HStack
          position={'absolute'}
          right={2}
          top={2}
        >
          <ForwardButton />
        </HStack>
        <DisplayStep />
        <VStack
          mt={2}
          m={2}
          space={SPACING.small}
          alignItems={'center'}
        >
          <Text>Item List</Text>
          <View h={500}>
            {scanned && hasPermission && (
              <Modal
                isOpen={scanned}
                // w={useWindowDimensions.width}
                avoidKeyboard
                justifyContent='flex-end'
              >
                <BarCodeScanner
                  onBarCodeScanned={!scanned ? undefined : handleBarCodeScanned}
                  style={StyleSheet.absoluteFillObject}
                />
                <Button
                  pr={4}
                  rounded={20}
                  position={'absolute'}
                  bottom={20}
                  bg={COLORS.primary}
                  leftIcon={<ChevronLeftIcon />}
                  onPress={() => setScanned(false)}
                >
                  Back to Page
                </Button>
              </Modal>
            )}
            {showAlert && <AskCameraPermission />}
            <ScrollView>
              <View w={'96'}>
                {items.items !== null &&
                  Object.values(stateWithAmount)?.map((data, index) => (
                    <VStack
                      key={data?.name}
                      bg={COLORS.white}
                      rounded={20}
                      space={2}
                      // w={{ base: width - 60, lg: 600 }}
                      m={2}
                      px={4}
                    >
                      <HStack
                        space={2}
                        alignContent={'center'}
                        justifyContent={'space-between'}
                      >
                        <HStack
                          my={4}
                          mx={2}
                        >
                          <Text
                            color={COLORS.primary}
                            fontSize={'xs'}
                            fontWeight={'bold'}
                          >
                            {index + 1 + '. '}
                          </Text>
                          <Text
                            color={COLORS.primary}
                            fontSize={'xs'}
                            fontWeight={'medium'}
                          >
                            {data?.item_code}
                          </Text>
                        </HStack>

                        {/* <Divider mt={2} /> */}
                        <OnPressContainer
                          bg={'blueGray.500'}
                          onPress={() => {
                            if (stateWithAmount !== undefined) {
                              const cloneState = Object.values(stateWithAmount).find(
                                (ele) => ele.item_code !== data.item_code
                              );
                              console.log('cloneState', cloneState);
                              // const ModiState = cloneState
                              //   ? Object.values(cloneState).map((d, i) => {
                              //       return { [i]: { item_code: d.item_code, qty: d.qty, rate: d.rate } };
                              //     })
                              //   : null;

                              ModiState = Object.values([cloneState]);

                              // console.log('ModiState.', { ...ModiState });
                              // console.log('ModiState[0]', ModiState[0]);
                              if (ModiState[0] !== undefined) {
                                setStateWithAmount(ModiState);
                                setItems((pre) => ({ ...pre, items: { ...ModiState } }));
                              } else {
                                setState((pre) => ({ ...pre, items: null }));
                                setStateWithAmount({ items: null });
                                setItems({ items: null });
                              }
                            }
                          }}
                        >
                          <HStack
                            py={4}
                            px={1}
                            rounded={6}
                            space={0.5}
                          >
                            <Text
                              color={'error.400'}
                              fontWeight={'bold'}
                            >
                              {'  Delete'}
                            </Text>
                            <DeleteIcon color={'error.400'} />
                          </HStack>
                        </OnPressContainer>
                      </HStack>
                      <Divider
                        mt={-3}
                        h={0.3}
                      />

                      <VStack
                        ml={2}
                        space={2}
                      >
                        <HStack
                          space={2}
                          alignItems={'center'}
                          justifyContent={'space-between'}
                        >
                          <Text fontSize={'xs'}>Quantity :</Text>
                          <Input
                            h={8}
                            p={2.5}
                            minW={24}
                            fontSize={'2xs'}
                            textAlign={'right'}
                            color={'gray.400'}
                            bg={COLORS.lightWhite}
                            variant={'filled'}
                            keyboardType='numeric'
                            selectTextOnFocus
                            value={String(data?.qty)}
                            onBlur={() => {
                              if (data?.qty === '' || data?.qty === undefined) {
                                const updatedItems = items.items;
                                updatedItems[index].qty = '1';
                                setItems((pre) => ({
                                  ...pre,
                                  items: updatedItems,
                                }));
                              }
                            }}
                            onChangeText={(value) => {
                              const updatedItems = items.items;
                              updatedItems[index].qty = value;
                              setItems((pre) => ({
                                ...pre,
                                items: updatedItems,
                              }));
                            }}
                          />
                        </HStack>
                        <HStack
                          space={2}
                          alignItems={'center'}
                          justifyContent={'space-between'}
                        >
                          <Text fontSize={'xs'}>Rate :</Text>
                          <Input
                            h={8}
                            p={2.5}
                            minW={24}
                            fontSize={'2xs'}
                            textAlign={'right'}
                            color={'gray.400'}
                            bg={COLORS.lightWhite}
                            variant={'filled'}
                            keyboardType='numeric'
                            selectTextOnFocus
                            value={String(data?.rate) === '0' ? '1.0' : String(data?.rate)}
                            onBlur={() => {
                              if (data?.rate === '' || data?.rate === '1') {
                                const updatedItems = items.items;
                                updatedItems[index].rate = 0.0;
                                setItems((pre) => ({
                                  ...pre,
                                  items: updatedItems,
                                }));
                              } else {
                                const updatedItems = items.items;
                                updatedItems[index].rate = parseFloat(updatedItems[index].rate).toFixed(2);
                                setItems((pre) => ({
                                  ...pre,
                                  items: updatedItems,
                                }));
                              }
                            }}
                            onChangeText={(value) => {
                              const updatedItems = items.items;
                              updatedItems[index].rate = value;
                              setItems((pre) => ({
                                ...pre,
                                items: updatedItems,
                              }));
                            }}
                          />
                        </HStack>
                        <FormControl>
                          <View
                            alignItems={'flex-end'}
                            mr={1}
                          >
                            <FormControl.Label _text={{ fontSize: 'xs', fontWeight: 'medium', color: COLORS.primary }}>
                              Total Amount
                            </FormControl.Label>
                          </View>
                          <Input
                            caretHidden
                            h={8}
                            p={2.5}
                            minW={12}
                            isDisabled
                            fontSize={'2xs'}
                            textAlign={'right'}
                            bg={COLORS.lightWhite}
                            variant={'filled'}
                            keyboardType='numeric'
                            value={data?.amount}
                          />
                        </FormControl>
                      </VStack>
                      {index === (items.items !== null ? items.items.length : 0) - 1 && (
                        <Divider
                          opacity={0.4}
                          shadow={1}
                          mt={2}
                        />
                      )}
                    </VStack>
                  ))}
              </View>
            </ScrollView>
          </View>
          <HStack
            m={6}
            space={2}
            w={'96'}
            justifyContent={'center'}
          >
            {/* <Button
              onPress={() => handleOpenDynamicSelection('Items', 'currency', urlCurrency)}
              _text={{ fontWeight: 'bold', color: COLORS.tertiary }}
              variant={'outline'}
            >
              + Add Item
            </Button> */}
            <Button
              onPress={() => setScanned(true)}
              bg={COLORS.primary}
              _text={{ fontWeight: 'bold' }}
              _pressed={{ bg: COLORS.secondary }}
              leftIcon={
                <Icon
                  name='qrcode-scan'
                  size={18}
                  color='white'
                />
              }
            >
              QR CODE
            </Button>
          </HStack>
          {/* {openItemList && (
            <DynamicSelectPage
              title={'Item List'} // for change dynamic title
              url={urlItemQRCode} // for change dynamic data in selection
              open={openItemList} // state for show/hide selection
              setOpen={setOpenItemList} // for control show/hide
              setState={setItems} // for send data to outside selection and set it in main state by property
              property={propertySelected} // name of property for send data to outside
            />
          )} */}
        </VStack>
      </React.Fragment>
    );
  };

  const SuccessMessage = ({ setState }) => {
    const handleBack = () => {
      // setState(initialState);
      // refetchData();
      navigation.pop();
      navigation.replace('Quotation', { filterData: [] });
    };
    const handleAddAnother = () => {
      setState(initialState);
      setStepState(1);
    };

    return (
      <FadeTransition animated={stepState === 4 && true}>
        <Container
          h='80%'
          w='100%'
          alignItems='center'
          justifyContent={'center'}
        >
          <VStack
            alignItems='center'
            space={6}
            m={2}
            mt={{ base: 24, lg: 0 }}
          >
            <Box
              w={'24'}
              h={'24'}
              rounded={'full'}
              borderWidth={4}
              borderColor={'green.500'}
              justifyContent={'center'}
            >
              <CheckIcon
                m={5}
                mt={6}
                size='12'
                color='emerald.500'
              />
            </Box>
            <Text
              textAlign={'center'}
              color={COLORS.gray}
              textWeight={'bold'}
              fontSize={24}
            >
              {'Add Quotation\nSuccess!'}
            </Text>

            <VStack
              mt={{ base: 16, lg: 24 }}
              space={6}
            >
              <Button
                rounded={24}
                minW={{ base: 'full', lg: 400 }}
                bg={COLORS.white}
                _text={{ color: COLORS.gray }}
                _pressed={{ bg: 'blueGray.200' }}
                onPress={() => handleBack()}
              >
                Back to Quotation Page
              </Button>
              {/* <Button
                rounded={24}
                minW={{ base: 'full', lg: 400 }}
                bg={COLORS.tertiary}
                _text={{ fontWeight: 'bold' }}
                _pressed={{ bg: COLORS.tertiary2 }}
                onPress={() => handleAddAnother()}
              >
                Add another quotation
              </Button> */}
            </VStack>
          </VStack>
        </Container>
      </FadeTransition>
    );
  };
  // log when state having changed
  // useMemo(() => {
  //   console.log('state: ', state);
  // }, [state]);

  return (
    <ContainerStyled>
      <FadeTransition animated={stepState}>
        <Center>
          {/* {stepState !== 4 && (
            <Text
              position={'absolute'}
              fontWeight={'bold'}
              color={COLORS.tertiary2}
              top={6}
            >
              {title}
            </Text>
          )} */}
          {/* display when step = 1 and do not have any selection displayed */}
          {stepState === 1 && !openSelection && !openCustomerType && (
            <FirstStep
              state={state}
              setState={setState}
            />
          )}
          {/* display when step = 2 and do not have any selection displayed */}
          {stepState === 2 && !openSelection && (
            <SecondStep
              state={state}
              setState={setState}
            />
          )}
          {stepState === 3 && !openSelection && (
            <ThirdStep
              state={state}
              setState={setState}
            />
          )}
          {stepState === 4 && !openSelection && <SuccessMessage setState={setState} />}
          {/* {stepState === 3 && !openSelection && !openCustomerType && <SuccessMessage setState={setState} />} */}
          {openSelection && (
            <DynamicSelectPage
              title={titleSelection} // for change dynamic title
              url={urlSelected} // for change dynamic data in selection
              open={openSelection} // state for show/hide selection
              setOpen={setOpenSelection} // for control show/hide
              setState={setState} // for send data to outside selection and set it in main state by property
              property={propertySelected} // name of property for send data to outside
            />
          )}
        </Center>
      </FadeTransition>
    </ContainerStyled>
  );
}

export default UpdateQuotation;