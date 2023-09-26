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
import React, { useState, useMemo, useEffect } from 'react';
import { DynamicSelectPage } from '../../../../components';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';
import FadeTransition from '../../../../components/FadeTransition';
import { Pressable } from 'react-native';
import useConfig from '../../../../config/path';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

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
          selectTextOnFocus={true}
          name={props.name}
          value={props.value}
          bg={'blueGray.100'}
          borderWidth={2}
          borderColor={'gray.200'}
          variant={'filled'}
          rounded={6}
          keyboardType={props.keyboardType}
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
function AddNewPaymentEntry({ navigation, route }) {
  // page name display
  const display_title = 'Payment Entry';
  //for navigation
  const title = 'PaymentEntry';
  // navigate step state
  const [stepState, setStepState] = useState(1);
  // max of steps
  const maxStep = 1;
  // const [parentId, setParentId] = useState('');
  // Check if route.params is defined
  // useEffect(() => {
  //   if (route.params?.CreateFrom) setParentId(route.params.CreateFrom);
  //   if (route.params?.defaultData) setState(route.params.defaultData);
  // }, [route.params]);

  // state for show / hide selection (dynamically)
  const [openSelection, setOpenSelection] = useState(false);

  // initial state no ref
  const initialState = {
    payment_type: 'Receive',
    payment_received: 0, // Amount received
    paid_amount: 0,
    received_amount: 0,
    mode_of_payment: null,
    posting_date: '',
    paid_from: '113110 - Accounts receivable - Domestic - VCL',
    paid_to: '111100 - Cash in hand - VCL',
    party_type: 'Customer', // Type of party (Customer, Supplier, etc.)
    party: '', // Name of the party
    company: '', // Name of your company
  };

  // initial state with ref
  const initialStateWithRef = {
    payment_type: 'Receive',
    payment_received: 0, // Amount received
    paid_amount: 0,
    received_amount: 0,
    mode_of_payment: null,
    posting_date: '',
    paid_from: '113110 - Accounts receivable - Domestic - VCL',
    paid_to: '111100 - Cash in hand - VCL',
    party_type: 'Customer', // Type of party (Customer, Supplier, etc.)
    party: '', // Name of the party
    company: '', // Name of your company
    references: [
      // Add references to link with Sales Invoices or other documents
      {
        doctype: 'Payment Entry Reference',
        reference_doctype: 'Sales Invoice',
        reference_name: '',
        allocated_amount: 0,
        due_date: '',
        account: '113110 - Accounts receivable - Domestic - VCL',
        party_type: '',
        party: '',
      },
    ],
  };
  // main state
  const [state, setState] = useState(initialState);
  // for handle selection title (dynamic)
  const [titleSelection, setTitleSelection] = useState('');
  // for handle dynamic url selection
  const [urlSelected, setUrlSelected] = useState('');
  // url path for fetching selection data
  const {
    baseURL,
    PAYMENT_ENTRY_IN_UP,
    CUSTOMER, //
    COMPANY, //
    PAYMENT_MODE,
    SUPPLIER,
    ACCOUNT,
  } = useConfig(true);

  const urlCompany = baseURL + COMPANY;
  const urlCustomer = baseURL + CUSTOMER;
  const urlPaymentMode = baseURL + PAYMENT_MODE;
  const urlSupplier = baseURL + SUPPLIER;
  const urlAccount = baseURL + ACCOUNT;
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
    const [dateIOS, setDateIOS] = useState(new Date());
    // filter address
    // start for required validation
    const [requiredState] = useState(['company', 'party']);
    const [nullState, setNullState] = useState({
      company: false,
      party: false,
    });

    const handleCheckRequired = () => {
      if (ctmState.payment_type !== 'Internal Transfer') {
        requiredState.forEach((st_name) => {
          if (!ctmState[st_name]) {
            setNullState((pre) => ({ ...pre, [st_name]: true }));
          } else {
            setNullState((pre) => ({ ...pre, [st_name]: false }));
          }
        });
      } else {
        requiredState.forEach((st_name) => {
          if (!ctmState[st_name] && st_name !== 'party') {
            setNullState((pre) => ({ ...pre, [st_name]: true }));
          } else {
            setNullState((pre) => ({ ...pre, [st_name]: false }));
          }
        });
      }

      // console.log(nullState);
    };
    const onChangeDate = (event, selectedDate) => {
      const currentDate = selectedDate;
      const yyyy = currentDate.getFullYear();
      let mm = currentDate.getMonth() + 1; // Months start at 0!
      let dd = currentDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      // const formattedToday = dd + '-' + mm + '-' + yyyy;
      const formattedToday = yyyy + '-' + mm + '-' + dd;
      if (event?.type === 'dismissed') {
        setCtmState((pre) => ({ ...pre, posting_date: formattedToday }));
        return;
      } else {
        setCtmState((pre) => ({ ...pre, posting_date: formattedToday }));
      }
    };
    const handleForward = () => {
      // before go to next step check all required state
      // check then make input error style
      handleCheckRequired();
      // if column required is not filled push property name into check array
      let check = [];
      if (ctmState.payment_type !== 'Internal Transfer') {
        requiredState.forEach((st_name) => {
          if (!ctmState[st_name]) {
            check.push(st_name);
          }
        });
      } else {
        // check case payment type = Internal Transfer
        requiredState.forEach((st_name) => {
          if (!ctmState[st_name] && st_name !== 'party') {
            check.push(st_name);
          }
        });
      }
      // console.log(check);
      // if have any length of check mean required state is still not filled yet
      if (check.length !== 0) {
      } else {
        if (ctmState.paid_amount === 0) {
          alert('Paid Amount Can not  be 0');
        } else if (ctmState.payment_type !== 'Internal Transfer') {
          // alert(`Submit :${ctmState.payment_type}`);
          if (ctmState) {
            // console.log(baseURL + PAYMENT_ENTRY_IN_UP);
            console.log(ctmState);
            axios
              .post(baseURL + PAYMENT_ENTRY_IN_UP, ctmState)
              .then((res) => {
                // alert('Create Successfully');
                setStepState((post) => post + 1);
              })
              .catch((err) => alert(err));
          }
        } else {
          // alert('Submit Internal Transfer! ');
          let { party, ...formatData } = ctmState;
          // console.log(formatData);
          if (formatData) {
            axios
              .post(baseURL + PAYMENT_ENTRY_IN_UP, formatData)
              .then((res) => {
                // alert('Create Successfully');
                setStepState((post) => post + 1);
              })
              .catch((err) => alert(err));
          }
        }

        // setStepState((post) => post + 1);
        // setState(ctmState);
      }
    };

    const handleBackFirstPage = () => {
      navigation.pop();
      // setState(initialState);
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
        {stepState !== maxStep ? 'Next' : 'Submit'}
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
    useEffect(() => {
      const currentDate = new Date();

      const yyyy = currentDate.getFullYear();
      let mm = currentDate.getMonth() + 1; // Months start at 0!
      let dd = currentDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      const formattedToday = yyyy + '-' + mm + '-' + dd;
      setCtmState((pre) => ({ ...pre, posting_date: formattedToday }));
      // setDateIOS(new Date(formattedToday));
    }, []);

    // useMemo(() => {
    //   console.log(ctmState);
    // }, [ctmState]);

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
            <VStack h={1000}>
              <View w={'container'}>
                <FormControl justifyContent={'center'}>
                  <FormControl.Label>Payment Type</FormControl.Label>
                </FormControl>
                <Select
                  isDisabled={route.params?.defaultData}
                  dropdownIcon={true}
                  selectedValue={ctmState.payment_type}
                  w={'full'}
                  rounded={'md'}
                  fontSize={18}
                  borderWidth={2}
                  borderColor={'gray.200'}
                  accessibilityLabel='Status'
                  placeholder='None'
                  _selectedItem={{
                    bg: 'blueGray.200',
                    endIcon: <CheckIcon color={'blueGray.400'} />,
                  }}
                  onValueChange={(itemValue) => {
                    switch (itemValue) {
                      case 'Receive':
                        {
                          const NewObj = { ...initialState, payment_type: itemValue, party_type: 'Customer' };
                          setCtmState(NewObj);
                        }
                        break;

                      case 'Pay':
                        {
                          const NewObj = { ...initialState, payment_type: itemValue, party_type: 'Supplier' };
                          setCtmState(NewObj);
                        }
                        break;
                      case 'Internal Transfer':
                        {
                          const NewObj = { ...initialState, payment_type: itemValue, party_type: 'Customer' };
                          setCtmState(NewObj);
                        }
                        break;
                    }
                  }}
                >
                  <Select.Item
                    label='Receive'
                    value='Receive'
                  />

                  <Select.Item
                    label='Pay'
                    value='Pay'
                  />
                  <Select.Item
                    label='Internal Transfer'
                    value='Internal Transfer'
                  />
                </Select>
              </View>
              <View w={'container'}>
                <FormControl justifyContent={'center'}>
                  <FormControl.Label>Party Type</FormControl.Label>
                </FormControl>
                <Select
                  isDisabled
                  selectedValue={ctmState.party_type}
                  w={'full'}
                  rounded={'md'}
                  fontSize={18}
                  borderWidth={2}
                  borderColor={'gray.200'}
                  accessibilityLabel='Status'
                  placeholder='None'
                  _selectedItem={{
                    bg: 'blueGray.200',
                    endIcon: <CheckIcon color={'blueGray.400'} />,
                  }}
                  // onValueChange={(itemValue) => setCtmState((pre) => ({ ...pre, payment_type: itemValue }))}
                >
                  <Select.Item
                    label='Customer'
                    value='Customer'
                  />

                  <Select.Item
                    label='Supplier'
                    value='Supplier'
                  />
                </Select>
              </View>
              <OnPressContainer onPress={() => handleOpenDynamicSelection('Company', 'company', urlCompany)}>
                <StyledTextField
                  isDisabled={route.params?.defaultData}
                  caretHidden
                  isRequired={nullState.company}
                  label={'Company*'}
                  value={ctmState?.company}
                  showSoftInputOnFocus={false} // disable toggle keyboard
                />
              </OnPressContainer>

              <VStack space={2}>
                {ctmState.payment_type !== 'Internal Transfer' && (
                  <OnPressContainer
                    onPress={() =>
                      handleOpenDynamicSelection(
                        ctmState.party_type === 'Customer' ? 'Customer' : 'Supplier',
                        'party',
                        ctmState.payment_type === 'Pay' ? urlSupplier : urlCustomer
                      )
                    }
                  >
                    <StyledTextField
                      isDisabled={route.params?.defaultData}
                      caretHidden
                      isRequired={nullState.party}
                      label={ctmState.party_type === 'Customer' ? 'Customer*' : 'Supplier*'}
                      value={ctmState?.party}
                      showSoftInputOnFocus={false} // disable toggle keyboard
                    />
                  </OnPressContainer>
                )}
                <View w={'container'}>
                  <FormControl justifyContent={'center'}>
                    <FormControl.Label>Posting Date*</FormControl.Label>
                  </FormControl>
                  <View alignItems={'start'}>
                    <RNDateTimePicker
                      display='spinner'
                      // disabled={preState !== ''}
                      is24Hour={true}
                      mode='date'
                      value={dateIOS}
                      onChange={onChangeDate}
                    />
                  </View>
                </View>
                {ctmState.payment_type === 'Internal Transfer' ? (
                  <React.Fragment>
                    <OnPressContainer
                      onPress={() => handleOpenDynamicSelection('Payment From', 'paid_from', urlAccount)}
                    >
                      <StyledTextField
                        caretHidden
                        label={'Payment From'}
                        value={ctmState?.paid_from !== null ? ctmState?.paid_from : ''}
                        showSoftInputOnFocus={false} // disable toggle keyboard
                      />
                    </OnPressContainer>
                    <OnPressContainer onPress={() => handleOpenDynamicSelection('Payment From', 'paid_to', urlAccount)}>
                      <StyledTextField
                        caretHidden
                        label={'Payment To'}
                        value={ctmState?.paid_to !== null ? ctmState?.paid_to : ''}
                        showSoftInputOnFocus={false} // disable toggle keyboard
                      />
                    </OnPressContainer>
                  </React.Fragment>
                ) : (
                  <OnPressContainer
                    onPress={() => handleOpenDynamicSelection('Mode of Payment', 'mode_of_payment', urlPaymentMode)}
                  >
                    <StyledTextField
                      caretHidden
                      label={'Mode of Payment'}
                      value={ctmState?.mode_of_payment !== null ? ctmState?.mode_of_payment : ''}
                      showSoftInputOnFocus={false} // disable toggle keyboard
                    />
                  </OnPressContainer>
                )}

                <StyledTextField
                  label={'Paid Amount'}
                  keyboardType='numeric'
                  value={ctmState?.paid_amount ? String(ctmState?.paid_amount) : '0'}
                  handleChange={(value) => {
                    if (value[0] === '0') {
                      setCtmState((pre) => ({
                        ...pre,
                        paid_amount: value.substring(1),
                        payment_received: value.substring(1), // Amount received
                        received_amount: value.substring(1),
                      }));
                    } else if (value === '' && String(value).length === 0) {
                      setCtmState((pre) => ({
                        ...pre,
                        paid_amount: 0,
                        payment_received: 0, // Amount received
                        received_amount: 0,
                      }));
                      // console.log('empty');
                    } else {
                      let lastIndex = value.length - 1;
                      if (value[lastIndex] === '.') {
                        setCtmState((pre) => ({
                          ...pre,
                          paid_amount: value,
                          payment_received: value, // Amount received
                          received_amount: value,
                        }));
                      } else {
                        setCtmState((pre) => ({
                          ...pre,
                          paid_amount: parseFloat(value),
                          payment_received: parseFloat(value), // Amount received
                          received_amount: parseFloat(value),
                        }));
                      }
                    }
                  }}
                />

                {/* </OnPressContainer> */}
              </VStack>
            </VStack>
          </ScrollView>
        </VStack>
      </React.Fragment>
    );
  };

  const SuccessMessage = ({ setState }) => {
    const handleBack = () => {
      if (route.params?.defaultData !== undefined) {
        navigation.pop();
      } else {
        navigation.pop();
        navigation.replace(title, { filterData: [] });
      }

      // }
    };
    const handleAddAnother = () => {
      setState(initialState);
      navigation.replace('AddNewPaymentEntry');
      // setStepState(1);
    };

    return (
      <FadeTransition animated={stepState === 2 && true}>
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
              {'Add ' + display_title + '\nSuccess!'}
            </Text>

            <VStack
              mt={{ base: 16, lg: 24 }}
              space={6}
            >
              {route.params?.defaultData !== undefined ? (
                <Button
                  rounded={24}
                  minW={{ base: 'full', lg: 400 }}
                  bg={COLORS.white}
                  _text={{ color: COLORS.gray }}
                  _pressed={{ bg: 'blueGray.200' }}
                  onPress={() => handleBack()}
                >
                  {'Back '}
                </Button>
              ) : (
                <Button
                  rounded={24}
                  minW={{ base: 'full', lg: 400 }}
                  bg={COLORS.white}
                  _text={{ color: COLORS.gray }}
                  _pressed={{ bg: 'blueGray.200' }}
                  onPress={() => handleBack()}
                >
                  {'Back to ' + display_title + ' Page '}
                </Button>
              )}
              {route.params?.defaultData === undefined && (
                <Button
                  rounded={24}
                  minW={{ base: 'full', lg: 400 }}
                  bg={COLORS.tertiary}
                  _text={{ fontWeight: 'bold' }}
                  _pressed={{ bg: COLORS.tertiary2 }}
                  onPress={() => handleAddAnother()}
                >
                  {'Add another ' + display_title}
                </Button>
              )}
            </VStack>
          </VStack>
        </Container>
      </FadeTransition>
    );
  };

  const [doOnce, setDoOnce] = useState(true);

  useMemo(() => {
    const reformatData = () => {
      if (route.params?.defaultData) {
        // console.log('newData', newData);
        setState(route.params?.defaultData);
        // console.log('from Sales Invoice:', route.params?.defaultData);
        // console.log(newData);
      } else {
        setState(initialState);
      }
    };
    if (doOnce) {
      reformatData();
      setDoOnce(false);
    }
  }, [route.params]);

  // log when state having changed
  // useMemo(() => {
  //   console.log('state: ', state);
  // }, [state]);

  return (
    <ContainerStyled>
      <FadeTransition animated={stepState}>
        <Center>
          {/* display when step = 1 and do not have any selection displayed */}
          {stepState === 1 && !openSelection && (
            <FirstStep
              state={state}
              setState={setState}
            />
          )}
          {stepState === 2 && !openSelection && <SuccessMessage setState={setState} />}

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

export default AddNewPaymentEntry;
