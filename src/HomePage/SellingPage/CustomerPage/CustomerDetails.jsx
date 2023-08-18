import {
  Avatar,
  Button,
  Center,
  CheckIcon,
  Checkbox,
  ChevronLeftIcon,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import React from 'react';
import { COLORS } from '../../../../constants/theme';
import { Edit } from '../../../../constants/icons';
// import { ChevronBackWard } from '../../../../constants/icons';

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

function DetailsPage({ handleClose }) {
  const title = 'Customer Details';

  const BackButton = () => (
    <Button
      m={2}
      w={'12'}
      rounded={'lg'}
      variant={'unstyled'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}
      onPress={() => handleClose()}
    >
      <ChevronLeftIcon />
    </Button>
  );
  const EditButton = () => (
    <Button
      m={2}
      w={'12'}
      rounded={'lg'}
      variant={'unstyled'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}

      // onPress={() => (stepState === 1 ? handleBack() : setStepState((post) => post - 1))}
    >
      <Edit color={COLORS.primary} />
    </Button>
  );

  return (
    <ContainerStyled>
      <Center>
        <HStack
          top={2}
          w={'full'}
          justifyContent={'space-between'}
        >
          <HStack>
            <BackButton />
          </HStack>
          <HStack>
            <EditButton />
          </HStack>
        </HStack>
        <ScrollView>
          <VStack
            _android={{ h: 1000 }}
            m={4}
            alignItems={'center'}
            space={2}
          >
            <Avatar size={'xl'} />
            <VStack
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text
                fontWeight={'bold'}
                fontSize={'lg'}
              >
                Name
              </Text>
              <Text color={COLORS.gray}>Email</Text>

              <HStack
                space={12}
                mt={6}
              >
                <VStack
                  space={2}
                  minWidth={100}
                  alignItems={'flex-end'}
                >
                  <VStack
                    alignItems={'center'}
                    minHeight={16}
                  >
                    <Text
                      fontWeight={'bold'}
                      fontSize={'lg'}
                    >
                      0.0
                    </Text>
                    <Text
                      textAlign={'center'}
                      color={COLORS.gray}
                    >
                      {'Customer\nBalance'}
                    </Text>
                  </VStack>
                  <VStack
                    alignItems={'flex-end'}
                    minHeight={12}
                  >
                    <Text
                      fontWeight={'bold'}
                      fontSize={'lg'}
                      letterSpacing={1}
                    >
                      COMPANY
                    </Text>
                    <Text
                      textAlign={'center'}
                      color={COLORS.gray}
                    >
                      {'Customer Type'}
                    </Text>
                  </VStack>
                  <VStack
                    alignItems={'flex-end'}
                    minHeight={12}
                  >
                    <Text
                      fontWeight={'bold'}
                      fontSize={'lg'}
                      letterSpacing={1}
                    >
                      COMMERCIAL
                    </Text>
                    <Text
                      textAlign={'center'}
                      color={COLORS.gray}
                    >
                      {'Customer Group'}
                    </Text>
                  </VStack>
                  <VStack
                    alignItems={'flex-end'}
                    minHeight={12}
                  >
                    <Text
                      fontWeight={'bold'}
                      fontSize={'lg'}
                      letterSpacing={1}
                    >
                      THAILAND
                    </Text>
                    <Text
                      textAlign={'center'}
                      color={COLORS.gray}
                    >
                      {'Territory'}
                    </Text>
                  </VStack>
                </VStack>
                <Divider orientation='vertical' />
                <VStack
                  space={2}
                  minWidth={100}
                  alignItems={'flex-start'}
                >
                  <VStack
                    alignItems={'center'}
                    minHeight={16}
                  >
                    <Checkbox aria-label='disable-check' />
                    <Text color={COLORS.gray}>{'Disable'}</Text>
                  </VStack>
                  <VStack
                    alignItems={'flex-start'}
                    minHeight={12}
                  >
                    <Text
                      fontWeight={'bold'}
                      fontSize={'lg'}
                      letterSpacing={1}
                    >
                      ACCOUNTING
                    </Text>
                    <Text
                      textAlign={'center'}
                      color={COLORS.gray}
                    >
                      {'Industry'}
                    </Text>
                  </VStack>
                  <VStack
                    alignItems={'flex-start'}
                    minHeight={12}
                  >
                    <Text
                      fontWeight={'bold'}
                      fontSize={'lg'}
                      letterSpacing={0.5}
                    >
                      32321245
                    </Text>
                    <Text
                      textAlign={'center'}
                      color={COLORS.gray}
                    >
                      {'Tax ID'}
                    </Text>
                  </VStack>
                  <VStack
                    alignItems={'flex-start'}
                    minHeight={12}
                  >
                    <Text
                      fontWeight={'bold'}
                      fontSize={'lg'}
                      letterSpacing={0.5}
                    >
                      -
                    </Text>
                    <Text
                      textAlign={'center'}
                      color={COLORS.gray}
                    >
                      {'Market Segment'}
                    </Text>
                  </VStack>
                </VStack>
              </HStack>
              <VStack
                mt={6}
                alignItems='center'
              >
                <Text
                  fontWeight={'bold'}
                  fontSize={'lg'}
                  letterSpacing={0.5}
                >
                  {'Haitham-Billing'}
                </Text>
                <Text
                  textAlign={'center'}
                  color={COLORS.gray}
                >
                  {'Contact'}
                </Text>
              </VStack>
              <VStack
                mt={6}
                alignItems='center'
              >
                <Text
                  fontWeight={'bold'}
                  fontSize={'lg'}
                >
                  {'01028349192'}
                </Text>
                <Text
                  textAlign={'center'}
                  color={COLORS.gray}
                >
                  {'Mobile Number'}
                </Text>
              </VStack>
            </VStack>
            <Divider mt={2} />
            <VStack
              mt={6}
              space={2}
              alignItems='center'
            >
              <HStack
                w={200}
                space={6}
                justifyContent='space-between'
              >
                <Text>Currency</Text>
                <Text fontWeight='bold'>EGP</Text>
              </HStack>
              <HStack
                w={200}
                space={6}
                justifyContent='space-between'
              >
                <Text>Price List</Text>
                <Text fontWeight='bold'>A</Text>
              </HStack>
              <HStack
                w={200}
                space={6}
                justifyContent='space-between'
              >
                <Text>Sale Partner</Text>
                <Text fontWeight='bold'>-</Text>
              </HStack>
              <HStack
                w={200}
                space={6}
                justifyContent='space-between'
              >
                <Text>Payment Terms</Text>
                <Text fontWeight='bold'>-</Text>
              </HStack>
              <HStack
                w={200}
                space={6}
                justifyContent='space-between'
              >
                <Text>Credit Limit</Text>
                <Text fontWeight='bold'>0.00</Text>
              </HStack>
            </VStack>
          </VStack>
        </ScrollView>
      </Center>
    </ContainerStyled>
  );
}

export default DetailsPage;
