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
  Text,
  TextArea,
  VStack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import { DynamicSelectPage, StaticSelectPage } from '../../../../components';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';
import FadeTransition from '../../../../components/FadeTransition';
import { handleChange } from '../../../../hooks/useValidation';
import { config, url } from '../../../../config';
import { Pressable } from 'react-native';
import useFetch from '../../../../hooks/useFetch';
import useUpdate from '../../../../hooks/useUpdate';

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
function UpdateCustomer({ route, navigation, handleClose }) {
  const { name, preState } = route.params;
  // page name display
  const title = 'Add New Customer';
  const mainPage = 'Customer';
  // navigate step state
  const [stepState, setStepState] = useState(1);
  // max of steps
  const maxStep = 2;

  // state for show / hide selection (dynamically)
  const [openSelection, setOpenSelection] = useState(false);
  // state for show / hide selection (static)
  const [openCustomerType, setOpenCustomerType] = useState(false);

  useEffect(() => {
    console.log(preState);
    // console.log(preData);
  }, [preState]);

  // initial state
  const initialState = {
    customer_name: '',
    customer_type: '',
    customer_group: '',
    territory: '',
    market_segment: '',
    industry: '',
    mobile_no: '',
    email_id: '',
    tax_id: '',
    primary_address: '',
    website: '',
    print_language: 'English',
    customer_details: '',
    default_currency: 'THB',
    default_price_list: '',
    default_sales_partner: '',
    payment_terms: '',
  };

  // main state
  const [state, setState] = useState(preState);
  // for handle selection title (dynamic)
  const [titleSelection, setTitleSelection] = useState('');
  // for handle dynamic url selection
  const [urlSelected, setUrlSelected] = useState('');
  // url path for fetching selection data
  const urlCtmGroup = url.CUSTOMER_GROUPS;
  const urlTerritory = url.TERRITORY;
  const urlMarketSegment = url.MARKET_SEGMENT;
  const urlIndustry = url.INDUSTRY;
  const urlCurrency = url.CURRENCY;
  const urlPriceList = url.PRICE_LIST;
  const urlSalePartner = url.SALE_PARTNER;
  const urlPaymentTerm = url.PAYMENT_TERM;

  // handle dynamic property for multi selection in page
  const [propertySelected, setPropertySelected] = useState('');

  //option selection with static option
  const customerTypes = [{ name: 'Company' }, { name: 'Individual' }];

  const handleUpdate = (state) => {
    useUpdate(
      {
        headers: {
          Authorization: config.API_TOKEN,
        },
      },
      url.CUSTOMER + name,
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
    // start for required validation
    const [requiredState] = useState(['customer_name', 'customer_type', 'customer_group', 'territory']);
    const [nullState, setNullState] = useState({
      customer_name: false,
      customer_type: false,
      customer_group: false,
      territory: false,
    });

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

    const handleOpenStaticSelection = () => {
      setOpenCustomerType(true);
      // set main state with sub state
      setState(ctmState);
    };

    const BackButton = () => (
      <Button
        m={2}
        w={'20'}
        rounded={'lg'}
        variant={'unstyled'}
        _pressed={{ bg: 'blueGray.200' }}
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
              <StyledTextField
                isRequired={nullState.customer_name}
                label={'Customer Name*'}
                value={ctmState.customer_name}
                handleChange={(val) => handleChange('customer_name', val, setCtmState)}
              />

              <OnPressContainer onPress={() => handleOpenStaticSelection()}>
                <StyledTextField
                  caretHidden
                  isRequired={nullState.customer_type}
                  label={'Customer Type*'}
                  name={'customer_type'}
                  value={ctmState.customer_type}
                  showSoftInputOnFocus={false} // disable toggle keyboard
                />
              </OnPressContainer>
            </HStack>
            <HStack
              space={2}
              direction={{ base: 'column', lg: 'row' }}
            >
              <OnPressContainer
                onPress={() => handleOpenDynamicSelection('Customer Groups', 'customer_group', urlCtmGroup)}
              >
                <StyledTextField
                  caretHidden
                  isRequired={nullState.customer_group}
                  label={'Customer Group*'}
                  name={'customer_group'}
                  value={ctmState.customer_group}
                  showSoftInputOnFocus={false} // disable toggle keyboard
                />
              </OnPressContainer>
              <OnPressContainer onPress={() => handleOpenDynamicSelection('Territory', 'territory', urlTerritory)}>
                <StyledTextField
                  caretHidden
                  isRequired={nullState.territory}
                  label={'Territory*'}
                  name={'territory'}
                  value={ctmState.territory}
                  showSoftInputOnFocus={false} // disable toggle keyboard
                />
              </OnPressContainer>
            </HStack>
            <HStack
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
            </HStack>
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
        handleUpdate(ctmState2);
        setStepState((post) => post + 1);
        // setState(ctmState2);
      }
    };

    const handleBack = () => {
      handleClose();
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

  const SuccessMessage = () => {
    const handleBack = () => {
      navigation.pop();
      navigation.replace(mainPage, { filterData: [] });
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
              {'Update\nSuccess!'}
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
          {stepState === 2 && !openSelection && !openCustomerType && (
            <SecondStep
              state={state}
              setState={setState}
            />
          )}
          {stepState === 3 && !openSelection && !openCustomerType && <SuccessMessage setState={setState} />}
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

export default UpdateCustomer;
