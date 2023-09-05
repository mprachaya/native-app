import {
  Box,
  Button,
  Center,
  CheckIcon,
  Container,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Select,
  Text,
  VStack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState, useMemo } from 'react';
import { DynamicSelectPage, StaticSelectPage } from '../../../../components';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';
import FadeTransition from '../../../../components/FadeTransition';
import { Platform, Pressable } from 'react-native';
import useSubmit from '../../../../hooks/useSubmit';
import useConfig from '../../../../config/path';
import axios from 'axios';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

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
function AddNewQuotation({ navigation }) {
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
    currency: 'THB',
    selling_price_list: 'Standard Selling',
    items: null,
  };

  // main state
  const [state, setState] = useState(initialState);
  // for handle selection title (dynamic)
  const [titleSelection, setTitleSelection] = useState('');
  // for handle dynamic url selection
  const [urlSelected, setUrlSelected] = useState('');
  // url path for fetching selection data
  const { baseURL, CUSTOMER, LEAD, ADDRESS, CONTACT, CURRENCY, PRICE_LIST, SALE_PARTNER, PAYMENT_TERM } =
    useConfig(true);
  const urlCurrency = baseURL + CURRENCY;
  const urlPriceList = baseURL + PRICE_LIST;
  const urlSalePartner = baseURL + SALE_PARTNER;
  const urlPaymentTerm = baseURL + PAYMENT_TERM;

  const urlCustomer = baseURL + CUSTOMER;
  const urlLead = baseURL + LEAD;
  const urlAddress = baseURL + ADDRESS;
  const urlContact = baseURL + CONTACT;
  // handle dynamic property for multi selection in page
  const [propertySelected, setPropertySelected] = useState('');

  //option selection with static option
  const customerTypes = [{ name: 'Company' }, { name: 'Individual' }];

  const handleSubmit = (state) => {
    useSubmit(
      {
        headers: {
          Authorization: '',
        },
      },
      baseURL + CUSTOMER,
      state,
      () => void 0,
      () => void 0
    );
  };

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
    const [requiredState] = useState(['party_name']);
    const [nullState, setNullState] = useState({
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

    const handleBack = () => {
      // handleClose();
      navigation.goBack();
      setState(initialState);
    };

    const handleOpenDynamicSelection = (title, name, url) => {
      handleChangeURL(title, name, url);
      // set main state with sub state
      setState(ctmState);
    };

    // const handleOpenStaticSelection = () => {
    //   setOpenCustomerType(true);
    //   // set main state with sub state
    //   setState(ctmState);
    // };

    const BackButton = () => (
      <Button
        m={2}
        w={'20'}
        rounded={'lg'}
        variant={'unstyled'}
        background={COLORS.lightWhite}
        _pressed={{ bg: 'blueGray.200' }}
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
        {stepState !== maxStep ? 'Next' : 'Submit'}
      </Button>
    );

    const DisplayStep = () => (
      <HStack mt={{ base: 20, lg: 24 }}>
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
      console.log(ctmState);
    }, [ctmState]);
    // set Default value of to Date Object (+ 1 month)
    useMemo(() => {
      const plusMonth = new Date();
      plusMonth.setMonth(plusMonth.getMonth() + 1);
      setAndroidNextMount(() => plusMonth);
      setDateIOSNextMonth(() => plusMonth);

      const dateNow = new Date();
      dateNow.setMonth(dateNow.getMonth());
      setDateIOS(dateNow);

      const currentDate = dateNow;

      const yyyy = currentDate.getFullYear();
      let mm = currentDate.getMonth() + 1; // Months start at 0!
      let dd = currentDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      const formattedToday = yyyy + '-' + mm + '-' + dd;

      const nextDate = plusMonth;
      const yyyy2 = plusMonth.getFullYear();
      let mm2 = nextDate.getMonth() + 1; // Months start at 0!
      let dd2 = nextDate.getDate();
      if (dd2 < 10) dd = '0' + dd2;
      if (mm2 < 10) mm = '0' + mm2;
      const formattedNextMonth = yyyy2 + '-' + mm2 + '-' + dd2;

      setCtmState((pre) => ({ ...pre, transaction_date: formattedToday, valid_till: formattedNextMonth }));
    }, []);

    // useMemo(() => {
    //   // console.log(ctmState);
    //   if (customer) {
    //     setCtmState((pre) => ({ ...pre, party_name: customer.name }));
    //   }
    // }, [customer]);
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
          m={6}
          space={SPACING.small}
          h={{ base: 500, lg: 1200 }}
        >
          <ScrollView>
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
            <HStack
              space={2}
              direction={{ base: 'column', lg: 'row' }}
            >
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
                <React.Fragment>
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
                </React.Fragment>
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
            </HStack>
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
            {/* <HStack
              space={2}
              direction={{ base: 'column', lg: 'row' }}
            >
              <OnPressContainer
                onPress={() => handleOpenDynamicSelection('Market Segment', 'market_segment', urlMarketSegment)}
              >
                <StyledTextField
                  caretHidden
                  label={'Market Segment'}
                  name={'market_segment'}
                  value={ctmState.market_segment}
                  showSoftInputOnFocus={false} // disable toggle keyboard
                />
              </OnPressContainer>
              <OnPressContainer onPress={() => handleOpenDynamicSelection('Industry', 'industry', urlIndustry)}>
                <StyledTextField
                  caretHidden
                  label={'Industry'}
                  name={'industry'}
                  value={ctmState.industry}
                />
              </OnPressContainer>
            </HStack>
            <HStack
              space={2}
              direction={{ base: 'column', lg: 'row' }}
            >
              <StyledTextField
                value={ctmState.mobile_no}
                keyboardType='number-pad'
                maxLength={10}
                handleChange={(val) => handleChange('mobile_no', val, setCtmState)}
                label={'Mobile Number'}
                name={'mobile_no'}
              />
              <StyledTextField
                value={ctmState.email_id}
                handleChange={(val) => handleChange('email_id', val, setCtmState)}
                label={'Email Address'}
                name={'email_id'}
              />
            </HStack>
            <HStack
              space={2}
              direction={{ base: 'column', lg: 'row' }}
            >
              <StyledTextField
                value={ctmState.tax_id}
                handleChange={(val) => handleChange('tax_id', val, setCtmState)}
                label={'Tax ID'}
                name={'email_id'}
              />
              <StyledTextField
                value={ctmState.primary_address}
                handleChange={(val) => handleChange('primary_address', val, setCtmState)}
                label={'Address'}
                name={'primary_address'}
              />
            </HStack>
            <HStack
              space={2}
              direction={{ base: 'column', lg: 'row' }}
            >
              <StyledTextField
                value={ctmState.website}
                handleChange={(val) => handleChange('website', val, setCtmState)}
                label={'Website'}
                name={'website'}
              />
            </HStack>
            <HStack>
              <VStack m={1}>
                <FormControl.Label>Customer Details</FormControl.Label>
                <TextArea
                  h={20}
                  value={ctmState.customer_details}
                  onChangeText={(val) => handleChange('customer_details', val, setCtmState)}
                  name={'customer_details'}
                  minW={{ base: 'full', lg: 800 }}
                  bg={'blueGray.100'}
                  borderWidth={2}
                  borderColor={'gray.200'}
                  variant={'filled'}
                  rounded={6}
                  fontSize={{ base: SIZES.medium || props.baseSize, lg: SIZES.large || props.lgSize }}
                  _focus={{
                    borderColor: 'blueGray.300',
                    backgroundColor: 'blueGray.100',
                  }}
                />
              </VStack>
            </HStack> */}
          </ScrollView>
        </VStack>
      </React.Fragment>
    );
  };
  // sub component second step
  const SecondStep = ({ state, setState }) => {
    const [ctmState2, setCtmState2] = useState(state);

    const [requiredState] = useState([]);
    const [nullState, setNullState] = useState({
      customer_name: false,
      customer_type: false,
      customer_group: false,
      territory: false,
    });

    const handleCheckRequired = () => {
      requiredState.forEach((st_name) => {
        if (!ctmState2[st_name]) {
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
        if (!ctmState2[st_name]) {
          check.push(st_name);
        }
      });
      // if have any length of check mean required state is still not filled yet
      if (check.length !== 0) {
      } else {
        // if filled go to next step
        handleSubmit(ctmState2);
        setStepState((post) => post + 1);
        // setState(ctmState2);
      }
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
        {stepState !== maxStep ? 'Next' : 'Submit'}
      </Button>
    );

    const DisplayStep = () => (
      <HStack mt={{ base: 20, lg: 24 }}>
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

    // useEffect(() => {
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
        <DisplayStep />
        <VStack
          mt={2}
          m={6}
          space={SPACING.small}
          h={{ base: 500, lg: 1200 }}
        >
          <ScrollView>
            <HStack
              space={2}
              direction={{ base: 'column', lg: 'row' }}
            >
              <OnPressContainer onPress={() => handleOpenDynamicSelection('Currency', 'default_currency', urlCurrency)}>
                <StyledTextField
                  caretHidden
                  value={ctmState2.default_currency}
                  label={'Currency'}
                  name={'default_currency'}
                  showSoftInputOnFocus={false}
                />
              </OnPressContainer>
              <OnPressContainer
                onPress={() => handleOpenDynamicSelection('Price List', 'default_price_list', urlPriceList)}
              >
                <StyledTextField
                  caretHidden
                  value={ctmState2.default_price_list}
                  label={'Price List'}
                  name={'default_price_list'}
                  showSoftInputOnFocus={false}
                />
              </OnPressContainer>
            </HStack>
            <HStack
              space={2}
              direction={{ base: 'column', lg: 'row' }}
            >
              <OnPressContainer
                onPress={() => handleOpenDynamicSelection('Sales Partner', 'default_sales_partner', urlSalePartner)}
              >
                <StyledTextField
                  caretHidden
                  value={ctmState2.default_sales_partner}
                  label={'Sale Partner'}
                  name={'default_sales_partner'}
                  showSoftInputOnFocus={false}
                />
              </OnPressContainer>
              <OnPressContainer
                onPress={() => handleOpenDynamicSelection('Payment Terms', 'payment_terms', urlPaymentTerm)}
              >
                <StyledTextField
                  caretHidden
                  value={ctmState2.payment_terms}
                  label={'Payment Terms Template'}
                  name={'payment_terms'}
                  showSoftInputOnFocus={false}
                />
              </OnPressContainer>
            </HStack>
            <StyledTextField
              isDisabled
              label={'Credit Limit'}
              placeholder={'Credit Limit'}
            />
          </ScrollView>
        </VStack>
      </React.Fragment>
    );
  };

  const SuccessMessage = ({ setState }) => {
    const handleBack = () => {
      // setState(initialState);
      // refetchData();
      navigation.pop();
      navigation.replace('Customer', { filterData: [] });
    };
    const handleAddAnother = () => {
      setState(initialState);
      setStepState(1);
    };

    return (
      <FadeTransition animated={stepState === 3 && true}>
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
              {'Registration\nSuccess!'}
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
                Back to Customer Page
              </Button>
              <Button
                rounded={24}
                minW={{ base: 'full', lg: 400 }}
                bg={COLORS.tertiary}
                _text={{ fontWeight: 'bold' }}
                _pressed={{ bg: COLORS.tertiary2 }}
                onPress={() => handleAddAnother()}
              >
                Add another customer
              </Button>
            </VStack>
          </VStack>
        </Container>
      </FadeTransition>
    );
  };
  // log when state having changed
  // useEffect(() => {
  //   console.log('state: ', state);
  // }, [state]);

  return (
    <ContainerStyled>
      <FadeTransition animated={stepState}>
        <Center>
          {stepState !== 3 && (
            <Text
              position={'absolute'}
              fontWeight={'bold'}
              color={COLORS.tertiary2}
              top={6}
            >
              {title}
            </Text>
          )}
          {/* display when step = 1 and do not have any selection displayed */}
          {stepState === 1 && !openSelection && !openCustomerType && (
            <FirstStep
              state={state}
              setState={setState}
            />
          )}
          {/* display when step = 2 and do not have any selection displayed */}
          {/* {stepState === 2 && !openSelection && !openCustomerType && (
            <SecondStep
              state={state}
              setState={setState}
            />
          )}
          {stepState === 3 && !openSelection && !openCustomerType && <SuccessMessage setState={setState} />} */}
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
          {openCustomerType && (
            <StaticSelectPage
              title={'Customer Type'} // name of statice selection
              data={customerTypes} // data of statice selection
              open={openCustomerType} // state for show/hide selection
              setOpen={setOpenCustomerType} // for control show/hide
              setState={setState} // for send data to outside selection and set it in main state by property
              property={'customer_type'} // name of property for send data to outside
            />
          )}
        </Center>
      </FadeTransition>
    </ContainerStyled>
  );
}

export default AddNewQuotation;
