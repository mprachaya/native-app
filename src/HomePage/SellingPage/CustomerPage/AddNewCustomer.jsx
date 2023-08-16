import {
  Button,
  Center,
  Checkbox,
  FormControl,
  HStack,
  Input,
  PresenceTransition,
  ScrollView,
  Text,
  TextArea,
  VStack,
  View,
} from 'native-base';
import React, { useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { memo } from 'react/cjs/react.production.min';
import FadeTransition from '../../../../components/FadeTransition';

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
        // onChangeText={props.handleChange}
      />
    </VStack>
  );
};

function AddNewCustomer({ state, initialState, handleClose }) {
  const [stepState, setStepState] = useState(1);
  const [ctmState, setCtmState] = useState(state);
  const maxStep = 2;

  const handleBack = () => {
    handleClose();
    setCtmState(initialState);
  };

  const FirstStep = () => {
    return (
      <VStack
        m={6}
        space={SPACING.small}
        h={{ base: 500, lg: 1200 }}
      >
        <ScrollView>
          <HStack direction={{ base: 'column', lg: 'row' }}>
            <StyledTextField
              value={ctmState.customer_name}
              label={'Name'}
              placeholder={'Customer Name*'}
            />
            <StyledTextField
              value={ctmState.customer_type}
              label={'Type'}
              placeholder={'Dropdown*'}
            />
          </HStack>
          <HStack direction={{ base: 'column', lg: 'row' }}>
            <StyledTextField
              value={ctmState.customer_group}
              label={'Customer Group'}
              placeholder={'Selection*'}
            />
            <StyledTextField
              value={ctmState.territory}
              label={'Territory'}
              placeholder={'Selection*'}
            />
          </HStack>
          <HStack direction={{ base: 'column', lg: 'row' }}>
            <StyledTextField
              value={ctmState.market_segment}
              label={'Market Segment'}
              placeholder={'Selection'}
            />
            <StyledTextField
              value={ctmState.industry}
              label={'Industry'}
              placeholder={'Selection'}
            />
          </HStack>
          <HStack direction={{ base: 'column', lg: 'row' }}>
            <StyledTextField
              value={ctmState.mobile_no}
              label={'Mobile Number'}
              placeholder={'Mobile Number'}
            />
            <StyledTextField
              value={ctmState.email_id}
              label={'Email Address'}
              placeholder={'Email Address'}
            />
          </HStack>
          <HStack direction={{ base: 'column', lg: 'row' }}>
            <StyledTextField
              value={ctmState.email_id}
              label={'Tax ID'}
              placeholder={'Tax ID'}
            />
            <StyledTextField
              value={ctmState.primary_address}
              label={'Address'}
              placeholder={'Address'}
            />
          </HStack>
          <HStack direction={{ base: 'column', lg: 'row' }}>
            <StyledTextField
              value={ctmState.website}
              label={'Website'}
              placeholder={'Website'}
            />
          </HStack>
          <HStack>
            {/* <StyledTextField
            h={200}
            label={'Customer Details'}
            placeholder={'Customer Details'}
          /> */}
            <VStack m={1}>
              <FormControl.Label>Customer Details</FormControl.Label>
              <TextArea
                h={20}
                value={ctmState.customer_details}
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
    );
  };
  const SecondStep = () => {
    return (
      <VStack
        m={6}
        space={SPACING.small}
        h={{ base: 500, lg: 1200 }}
      >
        <ScrollView>
          <HStack direction={{ base: 'column', lg: 'row' }}>
            <StyledTextField
              value={ctmState.default_currency}
              label={'Currency'}
              placeholder={'Selection*'}
            />
            <StyledTextField
              value={ctmState.default_price_list}
              label={'Price List'}
              placeholder={'Selection*'}
            />
          </HStack>
          <HStack direction={{ base: 'column', lg: 'row' }}>
            <StyledTextField
              value={ctmState.default_sales_partner}
              label={'Sale Partner'}
              placeholder={'Selection'}
            />
            <StyledTextField
              value={ctmState.payment_terms}
              label={'Payment Terms Template'}
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
    );
  };

  // const [state, setState] = {};

  useMemo(() => {
    if (!state) {
    } else {
      setCtmState(state);
      console.log(state);
    }
  }, [state]);

  return (
    <SafeAreaView>
      <ContainerStyled>
        <FadeTransition animated={stepState}>
          <Center>
            <HStack
              position={'absolute'}
              left={6}
              top={2}
            >
              <Button
                py={0}
                px={0}
                variant={'unstyled'}
                _text={{ fontSize: 'lg', fontWeight: 'bold', color: COLORS.tertiary }}
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
                py={0}
                px={0}
                variant={'unstyled'}
                _text={{ fontSize: 'lg', fontWeight: 'bold', color: COLORS.tertiary }}
                onPress={() => stepState < maxStep && setStepState((post) => post + 1)}
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
            {stepState === 1 && <FirstStep />}
            {stepState === 2 && <SecondStep />}
          </Center>
        </FadeTransition>
      </ContainerStyled>
    </SafeAreaView>
  );
}

export default memo(AddNewCustomer);
