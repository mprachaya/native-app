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
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';
import { useNavigation } from '@react-navigation/native';

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
            label={'Name'}
            placeholder={'Customer Name*'}
          />
          <StyledTextField
            label={'Type'}
            placeholder={'Customer Type*'}
          />
        </HStack>
        <HStack direction={{ base: 'column', lg: 'row' }}>
          <StyledTextField
            label={'Group'}
            placeholder={'Customer Group*'}
          />
          <StyledTextField
            label={'Territory'}
            placeholder={'Territory*'}
          />
        </HStack>
        <HStack direction={{ base: 'column', lg: 'row' }}>
          <StyledTextField
            label={'Market Segment'}
            placeholder={'Market Segment'}
          />
          <StyledTextField
            label={'Industry'}
            placeholder={'Industry'}
          />
        </HStack>
        <HStack direction={{ base: 'column', lg: 'row' }}>
          <StyledTextField
            label={'Mobile Number'}
            placeholder={'Mobile Number'}
          />
          <StyledTextField
            label={'Email Address'}
            placeholder={'Email Address'}
          />
        </HStack>
        <HStack direction={{ base: 'column', lg: 'row' }}>
          <StyledTextField
            label={'Tax ID'}
            placeholder={'Tax ID'}
          />
          <StyledTextField
            label={'Address'}
            placeholder={'Address'}
          />
        </HStack>
        <HStack direction={{ base: 'column', lg: 'row' }}>
          <StyledTextField
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
            label={'Currency'}
            placeholder={'Currency*'}
          />
          <StyledTextField
            label={'Price List'}
            placeholder={'Price List*'}
          />
        </HStack>
        <HStack direction={{ base: 'column', lg: 'row' }}>
          <StyledTextField
            label={'Sale Partner'}
            placeholder={'Sale Partner'}
          />
          <StyledTextField
            label={'Payment Terms Template'}
            placeholder={'Payment Terms Template'}
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
const ThirdStep = () => {
  return (
    <VStack
      m={6}
      space={SPACING.small}
      h={{ base: 500, lg: 1200 }}
    >
      <ScrollView>
        <VStack>
          <StyledTextField
            label={'Credit Limit'}
            placeholder={'Credit Limit'}
          />
          <HStack
            m={3}
            justifyContent={'space-between'}
          >
            <Text>By pass Credit Limit Check at Sales Order</Text>
            <Checkbox
              size='sm'
              accessibilityLabel='By pass checkbox'
            />
          </HStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
};
function AddNewCustomer() {
  const [stepState, setStepState] = useState(1);
  const maxStep = 2;
  const Navigation = useNavigation();

  // const [state, setState] = {};

  return (
    <SafeAreaView>
      <ContainerStyled>
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
              onPress={() => (stepState === 1 ? Navigation.goBack() : setStepState((post) => post - 1))}
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
          {stepState === 1 && (
            <PresenceTransition
              visible={stepState === 1 ? true : false}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 500,
                },
              }}
            >
              <FirstStep />
            </PresenceTransition>
          )}
          {stepState === 2 && (
            <PresenceTransition
              visible={stepState === 2 ? true : false}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 500,
                },
              }}
            >
              <SecondStep />
            </PresenceTransition>
          )}
          {/* {stepState === 3 && (
            <PresenceTransition
              visible={stepState === 3 ? true : false}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 500,
                },
              }}
            >
              <ThirdStep />
            </PresenceTransition>
          )} */}
        </Center>
      </ContainerStyled>
    </SafeAreaView>
  );
}

export default AddNewCustomer;
