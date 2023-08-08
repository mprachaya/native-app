import { Center, HStack, Text, VStack, View } from 'native-base';
import { Dimensions } from 'react-native';
import { SearchInput } from '../../../../components/Inputs';
import { COLORS } from '../../../../constants/theme';
import { CustomerListIOS } from './CustomerList';
import useFetch from '../../../../hooks/useFetch';
import { config, url } from '../../../../config';
import Loading from '../../../../components/Loading';
import { useMemo } from 'react';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ContainerStyled = (props) => {
  return (
    <View
      height={SCREEN_HEIGHT}
      bg={'blueGray.100'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function CustomerPage() {
  const {
    data: customerData,
    setData: setCustomerData,
    loading,
    error,
  } = useFetch(url.CUSTOMERS, {
    headers: {
      Authorization: config.API_TOKEN,
    },
  });

  if (loading) {
    return <Loading loading={loading} />;
  }

  useMemo(() => {
    console.log(customerData);
  }, [customerData]);

  return (
    <ContainerStyled>
      <Center
        mt={6}
        mx={6}
      >
        <VStack>
          <SearchInput />
          <HStack
            mt={6}
            mr={2}
            justifyContent={'space-evenly'}
          >
            <VStack
              w={'1/4'}
              alignItems={'center'}
            >
              <Text color={COLORS.secondary}>Total</Text>
              <Text
                color={COLORS.primary}
                fontWeight={'bold'}
                fontSize={'lg'}
              >
                1.9k
              </Text>
            </VStack>
            <VStack
              w={'1/4'}
              alignItems={'center'}
            >
              <Text color={COLORS.secondary}>Company</Text>
              <Text
                color={COLORS.primary}
                fontWeight={'bold'}
                fontSize={'lg'}
              >
                4.6k
              </Text>
            </VStack>
            <VStack
              w={'1/4'}
              alignItems={'center'}
            >
              <Text color={COLORS.secondary}>Individual</Text>
              <Text
                color={COLORS.primary}
                fontWeight={'bold'}
                fontSize={'lg'}
              >
                902
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <CustomerListIOS
          data={customerData}
          token={config.API_TOKEN}
        />
      </Center>
    </ContainerStyled>
  );
}

export default CustomerPage;
