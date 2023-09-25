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
  const [parentId, setParentId] = useState('');
  // Check if route.params is defined
  useEffect(() => {
    if (route.params?.CreateFrom) setParentId(route.params.CreateFrom);
    if (route.params?.defaultData) setState(route.params.defaultData);
  }, [route.params]);

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

  // function sumAmount(obj) {
  //   let totalAmount = 0;
  //   for (let key in obj) {
  //     if (obj[key] !== null && typeof obj[key] === 'object' && 'amount' in obj[key]) {
  //       totalAmount += parseFloat(obj[key].amount);
  //     }
  //   }
  //   return totalAmount.toFixed(2);
  // }

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
        if (ctmState.payment_type !== 'Internal Transfer') {
          // alert(`Submit :${ctmState.payment_type}`);
          if (ctmState) {
            console.log(baseURL + PAYMENT_ENTRY_IN_UP);
            axios
              .post(baseURL + PAYMENT_ENTRY_IN_UP, ctmState)
              .then((res) => alert('Create Successfully'))
              .catch((err) => alert(err));
          }
        } else {
          // alert('Submit Internal Transfer! ');
          let { party, ...formatData } = ctmState;
          // console.log(formatData);
          if (formatData) {
            axios
              .post(baseURL + PAYMENT_ENTRY_IN_UP, formatData)
              .then((res) => alert('Create Successfully'))
              .catch((err) => alert(err));
          }
        }

        // setStepState((post) => post + 1);
        // setState(ctmState);
      }
    };

    const handleBackFirstPage = () => {
      navigation.goBack();
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
      //  const plusMonth = new Date(state.due_date);
      //  plusMonth.setMonth(plusMonth.getMonth());
      //  setAndroidNextMount(() => plusMonth);

      //  const dateNow = new Date(state.posting_date);
      //  dateNow.setMonth(dateNow.getMonth());
      //  setDateIOS(dateNow);

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

    useMemo(() => {
      console.log(ctmState);
    }, [ctmState]);

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
            <VStack h={1400}>
              <View w={'container'}>
                <FormControl justifyContent={'center'}>
                  <FormControl.Label>Payment Type</FormControl.Label>
                </FormControl>
                <Select
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
  // // sub component second step
  // const SecondStep = ({ state, setState }) => {
  //   const [ctmState2, setCtmState2] = useState(state);
  //   const [requiredState] = useState(['selling_price_list', 'set_warehouse']);
  //   const [nullState, setNullState] = useState({
  //     set_warehouse: false,
  //     selling_price_list: false,
  //   });

  //   const handleCheckRequired = () => {
  //     // console.log(ctmState2['set_warehouse']);
  //     requiredState.forEach((st_name) => {
  //       if (!ctmState2[st_name]) {
  //         setNullState((pre) => ({ ...pre, [st_name]: true }));
  //       } else {
  //         setNullState((pre) => ({ ...pre, [st_name]: false }));
  //       }
  //     });
  //     // console.log(nullState);
  //   };
  //   const handleForward = () => {
  //     handleCheckRequired();
  //     let check = [];
  //     requiredState.forEach((st_name) => {
  //       if (!ctmState2[st_name]) {
  //         // check update_stock if true required set_warehouse
  //         if (st_name === 'set_warehouse' && !ctmState2.update_stock) {
  //         } else {
  //           check.push(st_name);
  //         }
  //       }
  //     });
  //     // if have any length of check mean required state is still not filled yet

  //     if (check.length !== 0) {
  //       console.log('check:', check);
  //     } else {
  //       // if filled go to next step
  //       setStepState((post) => post + 1);
  //       setState(ctmState2);
  //     }
  //   };

  //   const handleBack = () => {
  //     navigation.goBack();
  //     setState(initialState);
  //   };

  //   const handleOpenDynamicSelection = (title, name, url) => {
  //     handleChangeURL(title, name, url);
  //     // set main state with sub state
  //     setState(ctmState2);
  //   };

  //   const BackButton = () => (
  //     <Button
  //       m={2}
  //       w={'20'}
  //       rounded={'lg'}
  //       variant={'unstyled'}
  //       background={COLORS.lightWhite}
  //       _pressed={{ background: COLORS.white }}
  //       _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}
  //       onPress={() => (stepState === 1 ? handleBack() : setStepState((post) => post - 1))}
  //     >
  //       Back
  //     </Button>
  //   );

  //   const ForwardButton = () => (
  //     <Button
  //       m={2}
  //       w={'20'}
  //       rounded={'lg'}
  //       variant={'unstyled'}
  //       background={COLORS.tertiary}
  //       _pressed={{ background: COLORS.tertiary2 }}
  //       _text={{ fontSize: 'sm', fontWeight: 'extrabold', color: COLORS.lightWhite }}
  //       onPress={() => stepState <= maxStep && handleForward()}
  //     >
  //       {stepState !== maxStep ? 'Next' : 'Submit'}
  //     </Button>
  //   );

  //   const DisplayStep = () => (
  //     <HStack
  //       mt={{ base: 6, lg: 12 }}
  //       mb={6}
  //     >
  //       <Text
  //         color={COLORS.tertiary}
  //         fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
  //         fontWeight={'bold'}
  //         letterSpacing={2}
  //       >
  //         {stepState}
  //       </Text>
  //       <Text
  //         fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
  //         fontWeight={'bold'}
  //         letterSpacing={2}
  //       >
  //         /{maxStep}
  //       </Text>
  //       <Text
  //         ml={2}
  //         fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
  //         fontWeight={'bold'}
  //       >
  //         STEP
  //       </Text>
  //     </HStack>
  //   );

  //   const OnPressContainer = ({ children, onPress }) => (
  //     <Pressable onPress={() => onPress()}>
  //       <View pointerEvents='none'>{children}</View>
  //     </Pressable>
  //   );

  //   return (
  //     <React.Fragment>
  //       <HStack
  //         position={'absolute'}
  //         left={2}
  //         top={2}
  //       >
  //         <BackButton />
  //       </HStack>
  //       <HStack
  //         position={'absolute'}
  //         right={2}
  //         top={2}
  //       >
  //         <ForwardButton />
  //       </HStack>
  //       <View mt={12}>
  //         <DisplayStep />
  //       </View>
  //       <VStack
  //         mt={2}
  //         m={6}
  //         space={SPACING.small}
  //       >
  //         <ScrollView>
  //           <VStack h={1000}>
  //             <VStack
  //               space={2}
  //               mt={6}
  //             >
  //               <HStack
  //                 w={'container'}
  //                 space={6}
  //                 justifyContent='space-between'
  //               >
  //                 <HStack w={'1/3'}>
  //                   <Text fontSize={'xs'}>Is Return</Text>
  //                   <HStack>
  //                     <Checkbox
  //                       ml={6}
  //                       isDisabled
  //                       aria-label='return-check'
  //                       isChecked={ctmState2.is_return || 0}
  //                       _checked={{ bg: COLORS.gray, borderColor: COLORS.lightWhite }}
  //                       // onPress={() => {
  //                       //   setCtmState2((pre) => ({ ...pre, is_return: !ctmState2.is_return }));
  //                       //   setState((pre) => ({ ...pre, is_return: !ctmState2.is_return }));
  //                       // }}
  //                     />
  //                   </HStack>
  //                 </HStack>
  //                 <HStack w={'1/2'}>
  //                   <Text fontSize={'xs'}>Update Stock</Text>
  //                   <HStack>
  //                     <Checkbox
  //                       ml={6}
  //                       aria-label='update-stock-check'
  //                       isChecked={ctmState2.update_stock || 0}
  //                       _checked={{ bg: COLORS.gray, borderColor: COLORS.lightWhite }}
  //                       onPress={() => {
  //                         if (!ctmState2.update_stock === true) {
  //                           setCtmState2((pre) => ({
  //                             ...pre,
  //                             update_stock: !ctmState2.update_stock,
  //                             set_warehouse: '',
  //                           }));
  //                         } else {
  //                           setCtmState2((pre) => ({ ...pre, update_stock: !ctmState2.update_stock }));
  //                         }
  //                       }}
  //                     />
  //                   </HStack>
  //                 </HStack>
  //               </HStack>
  //               <OnPressContainer onPress={() => handleOpenDynamicSelection('Project', 'project', urlProject)}>
  //                 <StyledTextField
  //                   // isRequired
  //                   caretHidden
  //                   value={ctmState2.project}
  //                   label={'Project'}
  //                   name={'project'}
  //                   showSoftInputOnFocus={false}
  //                 />
  //               </OnPressContainer>
  //               <OnPressContainer
  //                 onPress={() => handleOpenDynamicSelection('Cost Center', 'cost_center', urlCostCenter)}
  //               >
  //                 <StyledTextField
  //                   // isRequired
  //                   caretHidden
  //                   value={ctmState2.cost_center}
  //                   label={'Cost Center'}
  //                   name={'cost_center'}
  //                   showSoftInputOnFocus={false}
  //                 />
  //               </OnPressContainer>
  //               <OnPressContainer onPress={() => handleOpenDynamicSelection('Currency', 'currency', urlCurrency)}>
  //                 <StyledTextField
  //                   // isRequired
  //                   caretHidden
  //                   value={ctmState2.currency}
  //                   label={'Currency'}
  //                   name={'currency'}
  //                   showSoftInputOnFocus={false}
  //                 />
  //               </OnPressContainer>
  //               <OnPressContainer
  //                 onPress={() => handleOpenDynamicSelection('Price List', 'selling_price_list', urlPriceList)}
  //               >
  //                 <StyledTextField
  //                   // isRequired
  //                   caretHidden
  //                   isRequired={nullState.selling_price_list}
  //                   value={ctmState2.selling_price_list}
  //                   label={'Price List'}
  //                   name={'selling_price_list'}
  //                   showSoftInputOnFocus={false}
  //                 />
  //               </OnPressContainer>
  //               {ctmState2.update_stock && (
  //                 <OnPressContainer
  //                   onPress={() => handleOpenDynamicSelection('Set Source Warehouse', 'set_warehouse', urlWarehouse)}
  //                 >
  //                   <StyledTextField
  //                     isRequired={nullState.set_warehouse && ctmState2.update_stock}
  //                     caretHidden
  //                     value={ctmState2.set_warehouse}
  //                     label={'Set Source Warehouse'}
  //                     name={'set_warehouse'}
  //                     showSoftInputOnFocus={false}
  //                   />
  //                 </OnPressContainer>
  //               )}

  //               <OnPressContainer
  //                 onPress={() =>
  //                   handleOpenDynamicSelection(
  //                     'Price Payment Terms Template',
  //                     'payment_terms_template',
  //                     urlPaymentTermTemplate
  //                   )
  //                 }
  //               >
  //                 <StyledTextField
  //                   // isRequired
  //                   caretHidden
  //                   value={ctmState2.payment_terms_template}
  //                   label={'Price Payment Terms Template'}
  //                   // name={'default_price_list'}
  //                   showSoftInputOnFocus={false}
  //                 />
  //               </OnPressContainer>
  //               <OnPressContainer
  //                 onPress={() => handleOpenDynamicSelection('Terms & Conditions', 'tc_name', urlTermAndConditions)}
  //               >
  //                 <StyledTextField
  //                   // isRequired
  //                   caretHidden
  //                   value={ctmState2.tc_name}
  //                   label={'Terms & Conditions'}
  //                   // name={'default_price_list'}
  //                   showSoftInputOnFocus={false}
  //                 />
  //               </OnPressContainer>
  //               <OnPressContainer
  //                 onPress={() => handleOpenDynamicSelection('Sales Partner', 'sales_partner', urlSalesPartner)}
  //               >
  //                 <StyledTextField
  //                   // isRequired
  //                   caretHidden
  //                   value={ctmState2.sales_partner}
  //                   label={'Sales Partner'}
  //                   // name={'default_price_list'}
  //                   showSoftInputOnFocus={false}
  //                 />
  //               </OnPressContainer>
  //             </VStack>
  //           </VStack>
  //         </ScrollView>
  //       </VStack>
  //     </React.Fragment>
  //   );
  // };

  // const ThirdStep = ({ state, setState }) => {
  //   const [items, setItems] = useState({ items: state.items });
  //   const [hasPermission, setHasPermission] = useState(null);
  //   const [scanned, setScanned] = useState(false);
  //   const [qrCodeData, setQrCodeData] = useState('');
  //   const [showAlert, setShowAlert] = useState(false);

  //   const handleForward = () => {
  //     let checkNull = stateWithAmount.items === null;
  //     if (checkNull) {
  //       alert('Please Add Items');
  //     } else {
  //       const cloneState = { ...state };

  //       const stateNoAmount = Object.values(stateWithAmount)?.map((obj) => {
  //         // Create a new object with properties other than "amount"
  //         const { amount, ...newObj } = obj;
  //         return newObj;
  //       });
  //       const stateWithParent = Object.values(stateNoAmount).map((obj) => ({
  //         ...obj,
  //         sales_order: parentId,
  //       }));
  //       cloneState.items = Object.values(stateWithParent);
  //       console.log(cloneState);
  //       if (cloneState) {
  //         axios
  //           .post(urlSubmit, cloneState)
  //           .then(
  //             (response) =>
  //               // console.log('Response:', response.data);
  //               response.data && setStepState(4)
  //           )
  //           .catch((err) => {
  //             alert('An error occurred. Awkward.. : ' + err);
  //             // alert('Status Error: ' + err);
  //           });
  //       }
  //     }
  //   };

  //   const handleBack = () => {
  //     navigation.goBack();
  //     setState(initialState);
  //   };

  //   const handleBackStoreItems = () => {
  //     setStepState((post) => post - 1);
  //     // console.log('items: ', stateWithAmount);
  //     if (items.items === null) {
  //       setState((pre) => ({ ...pre, items: null }));
  //     } else {
  //       setState((pre) => ({ ...pre, items: stateWithAmount }));
  //     }
  //   };

  //   const BackButton = () => (
  //     <Button
  //       m={2}
  //       w={'20'}
  //       rounded={'lg'}
  //       variant={'unstyled'}
  //       background={COLORS.lightWhite}
  //       _pressed={{ background: COLORS.white }}
  //       _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}
  //       onPress={() => (stepState === 1 ? handleBack() : handleBackStoreItems())}
  //     >
  //       Back
  //     </Button>
  //   );

  //   const ForwardButton = () => (
  //     <Button
  //       m={2}
  //       w={'20'}
  //       rounded={'lg'}
  //       variant={'unstyled'}
  //       background={COLORS.tertiary}
  //       _pressed={{ background: COLORS.tertiary2 }}
  //       _text={{ fontSize: 'sm', fontWeight: 'extrabold', color: COLORS.lightWhite }}
  //       onPress={() => stepState <= maxStep && handleForward()}
  //     >
  //       {stepState !== maxStep ? 'Next' : 'Submit'}
  //     </Button>
  //   );

  //   const DisplayStep = () => (
  //     <HStack
  //       mt={{ base: 6, lg: 12 }}
  //       mb={6}
  //     >
  //       <Text
  //         color={COLORS.tertiary}
  //         fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
  //         fontWeight={'bold'}
  //         letterSpacing={2}
  //       >
  //         {stepState}
  //       </Text>
  //       <Text
  //         fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
  //         fontWeight={'bold'}
  //         letterSpacing={2}
  //       >
  //         /{maxStep}
  //       </Text>
  //       <Text
  //         ml={2}
  //         fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
  //         fontWeight={'bold'}
  //       >
  //         STEP
  //       </Text>
  //     </HStack>
  //   );

  //   const OnPressContainer = ({ children, onPress }) => (
  //     <Pressable onPress={() => onPress()}>
  //       <View pointerEvents='none'>{children}</View>
  //     </Pressable>
  //   );

  //   const [stateWithAmount, setStateWithAmount] = useState({ items: null });

  //   const AskCameraPermission = () =>
  //     Alert.alert('Ask for Permission', '"ERP Next" Would Like to Access the Camera', [
  //       {
  //         text: `Don't Allow`,
  //         onPress: () => {
  //           setShowAlert(false);
  //           setScanned(false);
  //         },
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           Linking.openSettings();
  //           setShowAlert(false);
  //         },
  //       },
  //     ]);
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       setShowAlert(true);
  //     } else {
  //       setHasPermission(true);
  //     }
  //   };
  //   const handleBarCodeScanned = ({ type, data }) => {
  //     axios
  //       .get(`${urlItemQRCode}?fields=["*"]&filters=[["Item Barcode","barcode","=","${data}"]]`)
  //       .then((response) => response.data)
  //       .then((res) => {
  //         if (res.data.length > 0) {
  //           // res.data && alert(`Item exist!:`);
  //           if (items.items !== null) {
  //             const duplicated = items.items.find((item) => item.item_code === res.data[0].item_code);
  //             console.log('duplicated = ', duplicated);
  //             if (duplicated === undefined) {
  //               setItems((pre) => ({
  //                 items: [...items.items, { item_code: res.data[0].item_code, qty: 1, rate: 1 }],
  //               }));
  //               setQrCodeData(res.data[0].item_code);
  //               // setItemCode(res.data[0].item_code);
  //             } else {
  //               alert(`Item is duplicated!`);
  //             }
  //           } else {
  //             setItems((pre) => ({
  //               ...pre,
  //               items: [{ item_code: res.data[0].item_code, qty: 1, rate: 1 }],
  //             }));
  //             setQrCodeData(res.data[0].item_code);
  //             // setItemCode(res.data[0].item_code);
  //           }
  //         } else {
  //           alert(`Item not exist!`);
  //           setQrCodeData('');
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         alert(`Item not exist!`);
  //         setQrCodeData('');
  //       });

  //     setScanned(false);
  //   };
  //   useMemo(() => {
  //     getBarCodeScannerPermissions();
  //   }, []);

  //   useMemo(() => {
  //     // console.log(hasPermission);
  //     if (!hasPermission && scanned) {
  //       getBarCodeScannerPermissions();
  //     }
  //   }, [scanned]);

  //   useMemo(() => {
  //     if (items?.items !== null) {
  //       const updateState = Object.values(items?.items).map((data, index) => {
  //         const temp = { ...items.items };
  //         // console.log('temp', temp);
  //         temp[index].amount = (parseFloat(temp[index]?.qty) * parseFloat(temp[index]?.rate)).toFixed(2);
  //         return temp;
  //       });

  //       setStateWithAmount(...updateState);
  //     } else {
  //       setStateWithAmount(items);
  //     }
  //   }, [items]);

  //   return (
  //     <React.Fragment>
  //       <HStack
  //         position={'absolute'}
  //         left={2}
  //         top={2}
  //       >
  //         <BackButton />
  //       </HStack>
  //       <HStack
  //         position={'absolute'}
  //         right={2}
  //         top={2}
  //       >
  //         <ForwardButton />
  //       </HStack>
  //       <DisplayStep />
  //       <VStack
  //         mt={2}
  //         m={2}
  //         space={SPACING.small}
  //         alignItems={'center'}
  //       >
  //         <Text>Item List (Net Total:{sumAmount(stateWithAmount)})</Text>
  //         <View h={500}>
  //           {scanned && hasPermission && (
  //             <Modal
  //               isOpen={scanned}
  //               // w={useWindowDimensions.width}
  //               avoidKeyboard
  //               justifyContent='flex-end'
  //             >
  //               <BarCodeScanner
  //                 onBarCodeScanned={!scanned ? undefined : handleBarCodeScanned}
  //                 style={StyleSheet.absoluteFillObject}
  //               />
  //               <Button
  //                 pr={4}
  //                 rounded={20}
  //                 position={'absolute'}
  //                 bottom={20}
  //                 bg={COLORS.primary}
  //                 leftIcon={<ChevronLeftIcon />}
  //                 onPress={() => setScanned(false)}
  //               >
  //                 Back to Page
  //               </Button>
  //             </Modal>
  //           )}
  //           {showAlert && <AskCameraPermission />}
  //           <ScrollView>
  //             <View w={'96'}>
  //               {items.items !== null &&
  //                 Object.values(stateWithAmount)?.map((data, index) => (
  //                   <VStack
  //                     key={data?.item_code}
  //                     bg={COLORS.white}
  //                     rounded={20}
  //                     space={2}
  //                     // w={{ base: width - 60, lg: 600 }}
  //                     m={2}
  //                     px={4}
  //                   >
  //                     <HStack
  //                       space={2}
  //                       alignContent={'center'}
  //                       justifyContent={'space-between'}
  //                     >
  //                       <HStack
  //                         my={4}
  //                         mx={2}
  //                       >
  //                         <Text
  //                           color={COLORS.primary}
  //                           fontSize={'xs'}
  //                           fontWeight={'bold'}
  //                         >
  //                           {index + 1 + '. '}
  //                         </Text>
  //                         <Text
  //                           color={COLORS.primary}
  //                           fontSize={'xs'}
  //                           fontWeight={'medium'}
  //                         >
  //                           {data?.item_code}
  //                         </Text>
  //                       </HStack>

  //                       {/* <Divider mt={2} /> */}
  //                       <OnPressContainer
  //                         bg={'blueGray.500'}
  //                         onPress={() => {
  //                           if (stateWithAmount !== undefined) {
  //                             const cloneState = Object.values(stateWithAmount).find(
  //                               (ele) => ele.item_code !== data.item_code
  //                             );
  //                             console.log('cloneState', cloneState);

  //                             ModiState = Object.values([cloneState]);

  //                             // console.log('ModiState.', { ...ModiState });
  //                             // console.log('ModiState[0]', ModiState[0]);
  //                             if (ModiState[0] !== undefined) {
  //                               setStateWithAmount(ModiState);
  //                               setItems((pre) => ({ ...pre, items: { ...ModiState } }));
  //                             } else {
  //                               setState((pre) => ({ ...pre, items: null }));
  //                               setStateWithAmount({ items: null });
  //                               setItems({ items: null });
  //                             }
  //                           }
  //                         }}
  //                       >
  //                         <HStack
  //                           py={4}
  //                           px={1}
  //                           rounded={6}
  //                           space={0.5}
  //                         >
  //                           <Text
  //                             color={'error.400'}
  //                             fontWeight={'bold'}
  //                           >
  //                             {'  Delete'}
  //                           </Text>
  //                           <DeleteIcon color={'error.400'} />
  //                         </HStack>
  //                       </OnPressContainer>
  //                     </HStack>
  //                     <Divider
  //                       mt={-3}
  //                       h={0.3}
  //                     />

  //                     <VStack
  //                       ml={2}
  //                       space={2}
  //                     >
  //                       <HStack
  //                         space={2}
  //                         alignItems={'center'}
  //                         justifyContent={'space-between'}
  //                       >
  //                         <Text fontSize={'xs'}>Quantity :</Text>
  //                         <Input
  //                           h={8}
  //                           p={2.5}
  //                           minW={24}
  //                           fontSize={'2xs'}
  //                           textAlign={'right'}
  //                           color={'gray.400'}
  //                           bg={COLORS.lightWhite}
  //                           variant={'filled'}
  //                           keyboardType='numeric'
  //                           selectTextOnFocus
  //                           value={String(data?.qty)}
  //                           onBlur={() => {
  //                             if (data?.qty === '' || data?.qty === undefined) {
  //                               const updatedItems = items.items;
  //                               updatedItems[index].qty = 1;
  //                               setItems((pre) => ({
  //                                 ...pre,
  //                                 items: updatedItems,
  //                               }));
  //                             }
  //                           }}
  //                           onChangeText={(value) => {
  //                             if (value === '') {
  //                               const updatedItems = items.items;
  //                               updatedItems[index].qty = 1;

  //                               setItems((pre) => ({
  //                                 ...pre,
  //                                 items: updatedItems,
  //                               }));
  //                             } else {
  //                               const updatedItems = items.items;
  //                               updatedItems[index].qty = parseFloat(value);
  //                               setItems((pre) => ({
  //                                 ...pre,
  //                                 items: updatedItems,
  //                               }));
  //                             }
  //                           }}
  //                         />
  //                       </HStack>
  //                       <HStack
  //                         space={2}
  //                         alignItems={'center'}
  //                         justifyContent={'space-between'}
  //                       >
  //                         <Text fontSize={'xs'}>Rate :</Text>
  //                         <Input
  //                           h={8}
  //                           p={2.5}
  //                           minW={24}
  //                           fontSize={'2xs'}
  //                           textAlign={'right'}
  //                           color={'gray.400'}
  //                           bg={COLORS.lightWhite}
  //                           variant={'filled'}
  //                           keyboardType='numeric'
  //                           selectTextOnFocus
  //                           value={String(data?.rate)}
  //                           onBlur={() => {
  //                             if (data?.rate === '' || data?.rate === '1') {
  //                               const updatedItems = items.items;
  //                               updatedItems[index].rate = 0.0;
  //                               setItems((pre) => ({
  //                                 ...pre,
  //                                 items: updatedItems,
  //                               }));
  //                             } else {
  //                               const updatedItems = items.items;
  //                               updatedItems[index].rate = parseFloat(updatedItems[index].rate).toFixed(2);
  //                               setItems((pre) => ({
  //                                 ...pre,
  //                                 items: updatedItems,
  //                               }));
  //                             }
  //                           }}
  //                           onChangeText={(value) => {
  //                             const updatedItems = items.items;
  //                             updatedItems[index].rate = parseFloat(value);
  //                             setItems((pre) => ({
  //                               ...pre,
  //                               items: updatedItems,
  //                             }));
  //                           }}
  //                         />
  //                       </HStack>
  //                       <FormControl>
  //                         <View
  //                           alignItems={'flex-end'}
  //                           mr={1}
  //                         >
  //                           <FormControl.Label _text={{ fontSize: 'xs', fontWeight: 'medium', color: COLORS.primary }}>
  //                             Total Amount
  //                           </FormControl.Label>
  //                         </View>
  //                         <Input
  //                           caretHidden
  //                           h={8}
  //                           p={2.5}
  //                           minW={12}
  //                           isDisabled
  //                           fontSize={'2xs'}
  //                           textAlign={'right'}
  //                           bg={COLORS.lightWhite}
  //                           variant={'filled'}
  //                           keyboardType='numeric'
  //                           value={data?.amount}
  //                         />
  //                       </FormControl>
  //                     </VStack>
  //                     {index === (items.items !== null ? items.items.length : 0) - 1 && (
  //                       <Divider
  //                         opacity={0.4}
  //                         shadow={1}
  //                         mt={2}
  //                       />
  //                     )}
  //                   </VStack>
  //                 ))}
  //             </View>
  //           </ScrollView>
  //         </View>
  //         <HStack
  //           m={6}
  //           space={2}
  //           w={'96'}
  //           justifyContent={'center'}
  //         >
  //           <Button
  //             onPress={() => setScanned(true)}
  //             bg={COLORS.primary}
  //             _text={{ fontWeight: 'bold' }}
  //             _pressed={{ bg: COLORS.secondary }}
  //             leftIcon={
  //               <Icon
  //                 name='qrcode-scan'
  //                 size={18}
  //                 color='white'
  //               />
  //             }
  //           >
  //             QR CODE
  //           </Button>
  //         </HStack>
  //       </VStack>
  //     </React.Fragment>
  //   );
  // };

  const SuccessMessage = ({ setState }) => {
    const handleBack = () => {
      if (parentId !== undefined) {
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
              {'Add ' + display_title + '\nSuccess!'}
            </Text>

            <VStack
              mt={{ base: 16, lg: 24 }}
              space={6}
            >
              {parentId !== '' ? (
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
              {parentId === '' && (
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
  useMemo(() => {
    const reformatData = () => {
      function mapProperties(inputObject) {
        return {
          doctype: 'Sales Order',
          customer: inputObject.party_name,
          customer_address: inputObject.customer_address || '',
          // order_type: inputObject.order_type,
          contact_person: inputObject.contact_person || '',
          project: '',
          // conversion_rate: 1.0,
          posting_date: '',
          due_date: '',
          company: inputObject.company,
          currency: inputObject.currency,
          set_warehouse: '',
          selling_price_list: inputObject.selling_price_list || '',
          payment_terms_template: inputObject.payment_terms_template || '',
          tc_name: inputObject.tc_name || '',
          sales_partner: '',
          items: Object.values(inputObject.items).map((it) => {
            return { item_code: it.item_code, rate: parseFloat(it.rate), qty: it.qty };
          }),
        };
        // return { doctype: inputObject.doctype };
      }
      if (route.params?.defaultData) {
        const newData = mapProperties(route.params?.defaultData);
        // console.log('newData', newData);
        setState(newData);
        console.log(newData);
      } else {
        setState(initialState);
      }
    };
    reformatData();
  }, [route.params]);

  // log when state having changed
  useMemo(() => {
    console.log('state: ', state);
  }, [state]);

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
