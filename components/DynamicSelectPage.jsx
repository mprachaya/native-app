import { Button, Center, Divider, FlatList, HStack, Text, VStack, View } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import FadeTransition from './FadeTransition';
import { COLORS } from '../constants/theme';
import useFetch from '../hooks/useFetch';
import { config } from '../config';
import { Loading, SearchInput } from '.';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const ContainerStyled = (props) => {
  return (
    <View
      style={{ zIndex: 0 }}
      height={SCREEN_HEIGHT}
      width={SCREEN_WIDTH}
      bg={'blueGray.100'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function DynamicSelectPage({ title, url, open, setOpen }) {
  const Item = ({ name }) => (
    <Button
      mx={2}
      mb={2}
      p={2}
      borderBottomWidth={2}
      borderColor={'blueGray.200'}
      rounded={12}
      bg={'blueGray.50'}
      _pressed={{ bg: 'blueGray.200' }}
    >
      <Text
        p={2}
        w={'full'}
        color={COLORS.gray}
        fontSize={'md'}
        textAlign={'center'}
      >
        {name}
      </Text>
    </Button>
  );

  // data fetching with custom hook useFetch
  const { data, loading, error } = useFetch(url, {
    headers: {
      Authorization: config.API_TOKEN,
    },
  });

  if (loading) {
    return <Loading loading={loading} />;
  }
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
    <FadeTransition animated={open}>
      <ContainerStyled>
        <Center>
          <VStack
            position={'absolute'}
            left={{ base: 4, lg: 80 }}
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
              onPress={() => setOpen(false)}
            >
              Back
            </Button>
          </VStack>
          <HStack
            mt={{ base: '18%', lg: 20 }}
            ml={{ base: 32, lg: 0 }}
            mr={{ base: 6, lg: 0 }}
            justifyContent={'center'}
          >
            <SearchInput />
          </HStack>
          <VStack
            justifyContent={'center'}
            alignItems={'center'}
            space={12}
            mt={12}
            mx={{ base: 10, lg: 0 }}
          >
            <Text
              color={COLORS.tertiary}
              fontWeight={'bold'}
              fontSize={'lg'}
            >
              {title}
            </Text>

            <FlatList
              h={500}
              data={data}
              w={{ base: 'sm', lg: 'lg' }}
              // showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <Item name={item.name} />}
            />
          </VStack>
        </Center>
      </ContainerStyled>
    </FadeTransition>
  );
}

export default DynamicSelectPage;
