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
import { config, url } from '../../../../config';
import { Loading } from '../../../../components';
import useFetch from '../../../../hooks/useFetch';
import WebView from 'react-native-webview';

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

  // data fetching with custom hook useFetch
  const { data, setData, setRefetch, loading, error } = useFetch(url.CUSTOMER + name, {
    headers: {
      Authorization: config.API_TOKEN,
    },
  });

  const BackButton = () => (
    <Button
      m={2}
      w={'12'}
      rounded={'sm'}
      variant={'unstyled'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}
      onPress={() => {
        // handleClose();
        navigation.goBack();
      }}
    >
      <ChevronLeftIcon />
    </Button>
  );
  const EditButton = () => (
    <Button
      m={2}
      w={'12'}
      rounded={'sm'}
      variant={'unstyled'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'sm', fontWeight: 'bold', color: COLORS.tertiary }}

      // onPress={() => (stepState === 1 ? handleBack() : setStepState((post) => post - 1))}
    >
      <Edit color={COLORS.primary} />
    </Button>
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
        <ScrollView>
          <VStack
            _android={{ h: 1000 }}
            m={4}
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
                      Authorization: config.API_TOKEN,
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
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text
                fontWeight={'bold'}
                fontSize={'sm'}
              >
                {data.customer_name}
              </Text>
              <Text color={COLORS.gray}> {data.email_id}</Text>

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
                      fontSize={'sm'}
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
                      fontSize={'sm'}
                      letterSpacing={1}
                    >
                      {data.customer_type}
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
                      fontSize={'sm'}
                      letterSpacing={1}
                    >
                      {data.customer_group}
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
                      fontSize={'sm'}
                      letterSpacing={1}
                    >
                      {data.territory}
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
                      fontSize={'sm'}
                      letterSpacing={1}
                    >
                      {data.industry ? data.industry : '-'}
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
                      fontSize={'sm'}
                      letterSpacing={0.5}
                    >
                      {data.tax_id ? data.tax_id : '-'}
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
                      fontSize={'sm'}
                      letterSpacing={0.5}
                    >
                      {data.market_segment ? data.market_segment : '-'}
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
                {/* <WebView html></WebView> */}
                <Text
                  w={250}
                  fontWeight={'bold'}
                  fontSize={'sm'}
                  letterSpacing={0.5}
                  textAlign='center'
                >
                  <WebView
                    originWhitelist={['*']}
                    source={{ html: data.primary_address ? `${data.primary_address}` : '-' }}
                  />
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
                  fontSize={'sm'}
                >
                  {data.mobile_no ? data.mobile_no : '-'}
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
                <Text fontWeight='bold'>{data.default_currency ? data.default_currency : '-'}</Text>
              </HStack>
              <HStack
                w={200}
                space={6}
                justifyContent='space-between'
              >
                <Text>Price List</Text>
                <Text fontWeight='bold'>{data.default_price_list ? data.default_price_list : '-'}</Text>
              </HStack>
              <HStack
                w={200}
                space={6}
                justifyContent='space-between'
              >
                <Text>Sale Partner</Text>
                <Text fontWeight='bold'>{data.default_sales_partner ? data.default_sales_partner : '-'}</Text>
              </HStack>
              <HStack
                w={200}
                space={6}
                justifyContent='space-between'
              >
                <Text>Payment Terms</Text>
                <Text fontWeight='bold'>{data.payment_terms ? data.payment_terms : '-'}</Text>
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
