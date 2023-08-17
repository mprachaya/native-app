import { Button, Center, FormControl, HStack, Input, ScrollView, Text, TextArea, VStack, View } from 'native-base';
import React, { useState, useMemo, useEffect } from 'react';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';
import FadeTransition from '../../../../components/FadeTransition';
import { handleChange } from '../../../../hooks/useValidation';
import { DynamicSelectPage } from '../../../../components';
import { url } from '../../../../config';

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

const StyledTextField = (props) => {
  return (
    <VStack m={1}>
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
    </VStack>
  );
};

function AddNewCustomer({ handleClose }) {
  const title = 'Add New Customer';
  const [stepState, setStepState] = useState(1);
  const maxStep = 2;

  const [openSelection, setOpenSelection] = useState(false);

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

  const [state, setState] = useState(initialState);

  const [urlSelected, setUrlSelected] = useState('');
  const urlCtmGroup = url.CUSTOMER_GROUPS;
  const urlTerritory = url.TERRITORY;

  const [propertySelected, setPropertySelected] = useState('');

  const getValueFromSelection = (name) => {
    setPropertySelected(name);
  };

  const handleChangeURL = (name, url) => {
    getValueFromSelection(name);
    setUrlSelected(url);
    setOpenSelection(true);
  };

  const FirstStep = ({ state, setState }) => {
    const [ctmState, setCtmState] = useState(state);

    const handleForward = () => {
      setState(ctmState);
      setStepState((post) => post + 1);
    };

    const handleBack = () => {
      handleClose();
      setState(initialState);
    };

    return (
      <React.Fragment>
        <HStack
          position={'absolute'}
          left={4}
          top={2}
        >
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
        </HStack>
        <HStack
          position={'absolute'}
          right={6}
          top={2}
        >
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
        </HStack>
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
        <VStack
          mt={2}
          m={6}
          space={SPACING.small}
          h={{ base: 500, lg: 1200 }}
        >
          <ScrollView>
            <HStack direction={{ base: 'column', lg: 'row' }}>
              <StyledTextField
                value={ctmState.customer_name}
                handleChange={(val) => handleChange('customer_name', val, setCtmState)}
                label={'Name'}
                placeholder={'Customer Name*'}
              />
              <StyledTextField
                value={ctmState.customer_type}
                handleChange={(val) => handleChange('customer_type', val, setCtmState)}
                label={'Type'}
                name={'customer_type'}
                placeholder={'Dropdown*'}
              />
            </HStack>
            <HStack direction={{ base: 'column', lg: 'row' }}>
              <StyledTextField
                caretHidden
                value={ctmState.customer_group}
                onPressIn={() => handleChangeURL('customer_group', urlCtmGroup)}
                // handleChange={(val) => handleChange('customer_group', val, setCtmState)}
                label={'Customer Group'}
                name={'customer_group'}
                placeholder={'Selection*'}
              />
              <StyledTextField
                caretHidden
                value={ctmState.territory}
                onPressIn={() => handleChangeURL('territory', urlTerritory)}
                handleChange={(val) => handleChange('territory', val, setCtmState)}
                label={'Territory'}
                name={'territory'}
                placeholder={'Selection*'}
              />
            </HStack>
            <HStack direction={{ base: 'column', lg: 'row' }}>
              <StyledTextField
                value={ctmState.market_segment}
                handleChange={(val) => handleChange('market_segment', val, setCtmState)}
                label={'Market Segment'}
                name={'market_segment'}
                placeholder={'Selection'}
              />
              <StyledTextField
                value={ctmState.industry}
                handleChange={(val) => handleChange('industry', val, setCtmState)}
                label={'Industry'}
                name={'industry'}
                placeholder={'Selection'}
              />
            </HStack>
            <HStack direction={{ base: 'column', lg: 'row' }}>
              <StyledTextField
                value={ctmState.mobile_no}
                handleChange={(val) => handleChange('mobile_no', val, setCtmState)}
                label={'Mobile Number'}
                name={'mobile_no'}
                placeholder={'Mobile Number'}
              />
              <StyledTextField
                value={ctmState.email_id}
                handleChange={(val) => handleChange('email_id', val, setCtmState)}
                label={'Email Address'}
                name={'email_id'}
                placeholder={'Email Address'}
              />
            </HStack>
            <HStack direction={{ base: 'column', lg: 'row' }}>
              <StyledTextField
                value={ctmState.tax_id}
                handleChange={(val) => handleChange('tax_id', val, setCtmState)}
                label={'Tax ID'}
                name={'email_id'}
                placeholder={'Tax ID'}
              />
              <StyledTextField
                value={ctmState.primary_address}
                handleChange={(val) => handleChange('primary_address', val, setCtmState)}
                label={'Address'}
                name={'primary_address'}
                placeholder={'Address'}
              />
            </HStack>
            <HStack direction={{ base: 'column', lg: 'row' }}>
              <StyledTextField
                value={ctmState.website}
                handleChange={(val) => handleChange('website', val, setCtmState)}
                label={'Website'}
                name={'website'}
                placeholder={'Website'}
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
                  placeholder='Customer Details'
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
  const SecondStep = ({ state }) => {
    const [ctmState2, setCtmState2] = useState(state);

    const handleForward = () => {
      setState(ctmState2);
      setStepState((post) => post + 1);
    };

    const handleBack = () => {
      if (stepState === 1) {
        handleClose();
        setState(initialState);
      } else {
        setStepState((post) => post - 1);
        setState(ctmState2);
      }
    };

    // useEffect(() => {
    //   console.log(stepState);
    // }, [stepState]);

    return (
      <React.Fragment>
        <HStack
          position={'absolute'}
          left={4}
          top={2}
        >
          <Button
            m={2}
            w={'20'}
            rounded={'lg'}
            variant={'unstyled'}
            background={COLORS.lightWhite}
            _pressed={{ background: COLORS.white }}
            _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}
            onPress={() => handleBack()}
          >
            Back
          </Button>
        </HStack>
        <HStack
          position={'absolute'}
          right={6}
          top={2}
        >
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
        </HStack>
        <HStack mt={{ base: 6, lg: 24 }}>
          <Text
            mt={2}
            color={COLORS.tertiary}
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            fontWeight={'bold'}
            letterSpacing={2}
          >
            {stepState}
          </Text>
          <Text
            mt={2}
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            fontWeight={'bold'}
            letterSpacing={2}
          >
            /{maxStep}
          </Text>
          <Text
            mt={2}
            ml={2}
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            fontWeight={'bold'}
          >
            STEP
          </Text>
        </HStack>
        <VStack
          m={6}
          space={SPACING.small}
          h={{ base: 500, lg: 1200 }}
        >
          <ScrollView>
            <HStack direction={{ base: 'column', lg: 'row' }}>
              <StyledTextField
                value={ctmState2.default_currency}
                handleChange={(val) => handleChange('default_currency', val, setCtmState2)}
                label={'Currency'}
                name={'default_currency'}
                placeholder={'Selection*'}
              />
              <StyledTextField
                value={ctmState2.default_price_list}
                handleChange={(val) => handleChange('default_price_list', val, setCtmState2)}
                label={'Price List'}
                name={'default_price_list'}
                placeholder={'Selection*'}
              />
            </HStack>
            <HStack direction={{ base: 'column', lg: 'row' }}>
              <StyledTextField
                value={ctmState2.default_sales_partner}
                handleChange={(val) => handleChange('default_sales_partner', val, setCtmState2)}
                label={'Sale Partner'}
                name={'default_sales_partner'}
                placeholder={'Selection'}
              />
              <StyledTextField
                value={ctmState2.payment_terms}
                handleChange={(val) => handleChange('payment_terms', val, setCtmState2)}
                label={'Payment Terms Template'}
                name={'payment_terms'}
                placeholder={'Selection'}
              />
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

  useEffect(() => {
    console.log('state: ', state);
  }, [state]);

  return (
    // <SafeAreaView>
    <ContainerStyled>
      <FadeTransition animated={stepState}>
        <Center>
          <Text
            position={'absolute'}
            fontWeight={'bold'}
            color={COLORS.tertiary2}
            top={6}
          >
            {title}
          </Text>
          {stepState === 1 && !openSelection && (
            <FirstStep
              state={state}
              setState={setState}
            />
          )}
          {stepState === 2 && !openSelection && (
            <SecondStep
              state={state}
              setState={setState}
            />
          )}
          {openSelection && (
            <DynamicSelectPage
              title={'Customer Groups'}
              url={urlSelected}
              open={openSelection}
              setOpen={setOpenSelection}
              setState={setState}
              property={propertySelected}
            />
          )}
        </Center>
      </FadeTransition>
    </ContainerStyled>
    // </SafeAreaView>
  );
}

export default AddNewCustomer;
