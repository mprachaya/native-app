import { Button, Center, HStack, Text, VStack, View } from 'native-base';
import { Dimensions } from 'react-native';
import { SearchInput } from '../../../../components/Inputs';
import { COLORS } from '../../../../constants/theme';
import { CustomerList } from './CustomerList';
import useFetch from '../../../../hooks/useFetch';
import { config, url } from '../../../../config';
import Loading from '../../../../components/Loading';
import { useContext, useState } from 'react';
import SortModal from '../../../../components/SortModal';
import { Platform } from 'react-native';
import { Context } from '../../../../reducer';
import { useNavigation } from '@react-navigation/native';
import SortOption from '../../../../components/NavHeaderRight';

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

function CustomerPage({ openState, setOpenState }) {
  const [state, dispatch] = useContext(Context);
  const [reloadState, setReloadState] = useState(true);
  const navigation = useNavigation();

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

  const SortBy = (list, setList, key, type) => {
    if (list.lenght > 0) {
      var updatedList = [...list];
      // console.log('sort Type =', type);
      if (type === 'DESC') setList(() => [...updatedList].sort((a, b) => (a[key] > b[key] ? -1 : 1)));
      else {
        setList(() => [...updatedList].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
      }
    }
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <ContainerStyled>
      <Center
        mt={2}
        mx={6}
      >
        <VStack>
          <HStack
            mb={2}
            justifyContent={{ base: 'flex-end', lg: 'flex-end' }}
          >
            {Platform.OS === 'android' && (
              <SortOption
                // openAdd={() => setOpenState((pre) => ({ ...pre, add: true }))}
                openSort={() => navigation.navigate('SortAndroid')}
                // openFilter={() => setOpenState((pre) => ({ ...pre, filter: true }))}
              />
            )}
          </HStack>
          <HStack
            mx={{ base: 0, lg: 24 }}
            justifyContent={{ base: 'center', lg: 'flex-end' }}
          >
            <SearchInput />
          </HStack>
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
        <CustomerList
          reload={reloadState}
          setReload={setReloadState}
          data={customerData}
          token={config.API_TOKEN}
        />
      </Center>
      {Platform.OS === 'ios' && (
        <SortModal
          open={openState.sort}
          setOpen={setOpenState}
          setReload={setReloadState}
          data={customerData}
          setData={setCustomerData}
          sortBy={SortBy}
        />
      )}
    </ContainerStyled>
  );
}

export default CustomerPage;
