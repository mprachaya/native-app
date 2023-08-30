import {
  Avatar,
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
import React, { useEffect } from 'react';
import { COLORS } from '../../../../constants/theme';
import { Edit } from '../../../../constants/icons';
import { config } from '../../../../config';
import { Loading } from '../../../../components';
import useFetch from '../../../../hooks/useFetch';
import WebView from 'react-native-webview';
import useUpdate from '../../../../hooks/useUpdate';
import useConfig from '../../../../config/path';

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

function DetailsPage({ route, navigation }) {
  const title = 'Customer Details';
  const { name } = route.params;
  const { baseURL, CUSTOMER } = useConfig(true);
  // data fetching with custom hook useFetch
  const { data, setData, setRefetch, loading, error } = useFetch(baseURL + CUSTOMER + '/' + name, {
    headers: {
      // Authorization: config.API_TOKEN,
    },
  });
  const handleDisable = () => {
    const tempState = { ...data };
    tempState.disabled = !tempState.disabled;

    useUpdate(
      {
        headers: {
          // Authorization: config.API_TOKEN,
        },
      },
      baseURL + CUSTOMER + name,
      tempState,
      () => void 0,
      () => setRefetch(1)
    );
  };

  const handleOpenUpdate = () => {
    navigation.replace('UpdateCustomer', { name: data.name, preState: data });
  };

  const BackButton = () => (
    <Button
      m={2}
      w={'12'}
      rounded={'xs'}
      variant={'unstyled'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'xs', fontWeight: 'bold', color: COLORS.tertiary }}
      onPress={() => {
        // handleClose();
        navigation.pop();
        navigation.replace('Customer', { filterData: [] });
      }}
    >
      <ChevronLeftIcon />
    </Button>
  );
  const EditButton = () => (
    <Button
      m={2}
      w={'12'}
      rounded={'xs'}
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
  const DisplayTextLeft = ({ children }) => (
    <Text
      textAlign='right'
      maxWidth={20}
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
  const DisplayTextRight = ({ children }) => (
    <Text
      textAlign='left'
      maxWidth={20}
      fontWeight={'bold'}
      fontSize={'xs'}
      letterSpacing={1}
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
  if (loading) {
    return <Loading loading={loading} />;
  }
  // handle error when data is not available
  if (error) {
    return (
      <ContainerStyled>
        <HStack justifyContent='center'>
          <Text>ERROR</Text>
        </HStack>
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
          <HStack>
            <EditButton />
          </HStack>
        </HStack>
        <ScrollView w={'full'}>
          <VStack
            h={1000}
            m={2}
            alignItems={'center'}
            space={2}
          >
            {data.image ? (
              <Box
                m={4}
                w={20}
                h={20}
                rounded={6}
                shadow={1}
              >
                <Image
                  style={{ flex: 1, resizeMode: 'cover' }}
                  rounded={6}
                  alt={'customer image'}
                  source={{
                    uri: url.BASE_URL + data.image,
                    method: 'GET',
                    headers: {
                      // Authorization: config.API_TOKEN,
                    },
                  }}
                />
              </Box>
            ) : (
              <Box
                m={4}
                w={20}
                h={20}
                rounded={6}
                background={'black'}
                shadow={1}
              >
                <Box
                  w={'full'}
                  h={'full'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  position={'absolute'}
                >
                  <Text color={'white'}>No Image</Text>
                </Box>

                <Image
                  alt={'customer image'}
                  opacity={'0.5'}
                  rounded={6}
                  style={{ flex: 1, resizeMode: 'cover' }}
                  source={{
                    uri: 'https://images.pexels.com/photos/2887582/pexels-photo-2887582.jpeg?auto=compress&cs=tinysrgb&w=600',
                  }}
                />
              </Box>
            )}

            {/* <Avatar size={'xl'} /> */}
            <VStack
              // bg={'black'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text
                fontWeight={'bold'}
                fontSize={'xs'}
              >
                {data.customer_name}
              </Text>
              <Text color={COLORS.gray}> {data.email_id}</Text>

              <HStack
                alignItems='center'
                justifyContent='center'
                space={6}
                mt={6}
              >
                <VStack
                  space={2}
                  alignItems={'flex-end'}
                >
                  <VStack
                    alignItems={'center'}
                    minHeight={16}
                  >
                    <DisplayTextLeft>0.0</DisplayTextLeft>
                    <SubTextLeft>{'Customer\nBalance'}</SubTextLeft>
                  </VStack>
                  <VStack
                    alignItems={'flex-end'}
                    minHeight={12}
                  >
                    <DisplayTextLeft>{data.customer_type}</DisplayTextLeft>
                    <SubTextLeft>{'Customer Type'}</SubTextLeft>
                  </VStack>
                  <VStack
                    alignItems={'flex-end'}
                    minHeight={12}
                  >
                    <DisplayTextLeft>{data.customer_group}</DisplayTextLeft>
                    <SubTextLeft>{'Customer Group'}</SubTextLeft>
                  </VStack>
                  <VStack
                    alignItems={'flex-end'}
                    minHeight={12}
                  >
                    <DisplayTextLeft>{data.territory}</DisplayTextLeft>
                    <SubTextLeft>{'Territory'}</SubTextLeft>
                  </VStack>
                </VStack>
                <Divider orientation='vertical' />
                <VStack
                  space={2}
                  alignItems={'flex-start'}
                >
                  <VStack
                    alignItems={'center'}
                    minHeight={16}
                  >
                    <Checkbox
                      aria-label='disable-check'
                      isChecked={data.disabled || 0}
                      _checked={{ bg: COLORS.gray, borderColor: COLORS.lightWhite }}
                      onPress={() => handleDisable()}
                    />
                    <Text color={COLORS.gray}>{'Disable'}</Text>
                  </VStack>
                  <VStack
                    alignItems={'flex-start'}
                    minHeight={12}
                  >
                    <DisplayTextRight>{data.industry ? data.industry : '-'}</DisplayTextRight>
                    <SubTextRight>{'Industry'}</SubTextRight>
                  </VStack>
                  <VStack
                    alignItems={'flex-start'}
                    minHeight={12}
                  >
                    <DisplayTextRight>{data.tax_id ? data.tax_id : '-'}</DisplayTextRight>
                    <SubTextRight>{'Tax ID'}</SubTextRight>
                  </VStack>
                  <VStack
                    alignItems={'flex-start'}
                    minHeight={12}
                  >
                    <DisplayTextRight>{data.market_segment ? data.market_segment : '-'}</DisplayTextRight>
                    <SubTextRight>{'Market Segment'}</SubTextRight>
                  </VStack>
                </VStack>
              </HStack>
              <VStack
                mt={6}
                alignItems='center'
              >
                {/* <WebView html></WebView> */}
                <Text
                  w={250}
                  fontWeight={'bold'}
                  fontSize={'xs'}
                  letterSpacing={0.5}
                  textAlign='center'
                >
                  {data.primary_address ? `${data.primary_address.replaceAll(/<\/?[^>]+(>|$)/gi, '')}` : '-'}
                </Text>
                <Text
                  fontSize={'xs'}
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
                  fontSize={'xs'}
                >
                  {data.mobile_no ? data.mobile_no : '-'}
                </Text>
                <Text
                  fontSize={'xs'}
                  textAlign={'center'}
                  color={COLORS.gray}
                >
                  {'Mobile Number'}
                </Text>
              </VStack>
            </VStack>
            <Divider
              w={'200'}
              mt={2}
            />
            <VStack
              mt={6}
              space={2}
              alignItems='center'
            >
              <HStack
                w={150}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Currency</Text>
                <Text fontWeight='bold'>{data.default_currency ? data.default_currency : '-'}</Text>
              </HStack>
              <HStack
                w={150}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Price List</Text>
                <Text fontWeight='bold'>{data.default_price_list ? data.default_price_list : '-'}</Text>
              </HStack>
              <HStack
                w={150}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Sale Partner</Text>
                <Text fontWeight='bold'>{data.default_sales_partner ? data.default_sales_partner : '-'}</Text>
              </HStack>
              <HStack
                w={150}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Payment Terms</Text>
                <Text fontWeight='bold'>{data.payment_terms ? data.payment_terms : '-'}</Text>
              </HStack>
              <HStack
                w={150}
                space={6}
                justifyContent='space-between'
              >
                <Text fontSize={'xs'}>Credit Limit</Text>
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
