import { Button, FormControl, HStack, Input, Text, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../constants/theme';
import { FrappeLogo, LoadingFullScreen } from '../components';
import axios from 'axios';
import { storeData } from '../utils/async-storage';
import { Dimensions, TouchableOpacity } from 'react-native';

const InputStyled = (props) => (
  <Input
    {...props}
    height={{ base: 9, lg: 10 }}
    rounded={12}
    fontSize={{ base: SIZES.medium, lg: SIZES.large }}
    backgroundColor='blueGray.100'
    InputLeftElement={
      <HStack
        ml={3.5}
        minWidth={'10'}
        maxW={'10'}
        justifyContent={'space-between'}
      >
        <Text color={'blueGray.400'}>{props.title}</Text>
        <Text color={'blueGray.400'}>:</Text>
      </HStack>
    }
    _focus={{
      borderColor: 'white',
      backgroundColor: 'blueGray.100',
    }}
  />
);

function LoginFrappeURL({ navigation }) {
  const [state, setState] = useState({
    url: 'tonen.vsiam.com',
    usr: 'Administrator',
    pwd: 'ZAQ!@WSX',
  });
  const [loading, setloading] = useState(false);
  const [loginSuccess, setloginSuccess] = useState(false);

  const handleTyping = (name, value) => {
    setState((pre) => ({ ...pre, [name]: value }));
  };

  const authenticate = async (url, usr, pwd) => {
    setloading(true);
    axios
      .post(`https://${url}/api/method/login`, { usr: usr, pwd: pwd })
      .then((response) => {
        if (response.status === 200) {
          // console.log(response);
          storeData('URL', state.url);
          storeData('NAME', response.data.full_name);
          setloginSuccess(true);
        }
      })
      .catch((error) => {
        setloading(false);
        alert(`Invalid Authentication`);
      });
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setloading(false);
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    if (loginSuccess) {
      navigation.replace('Home');
    }
  }, [loginSuccess]);

  return (
    <View
      bg={'blueGray.200'}
      h={Dimensions.get('window').height}
    >
      {loading && <LoadingFullScreen loading={loading} />}
      <VStack
        m={12}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <View
          mt={12}
          mx={6}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <View
            my={6}
            mx={2}
          >
            <FrappeLogo size={'lg'} />
          </View>
          <Text
            color={COLORS.primary}
            fontWeight={'black'}
            fontSize={'lg'}
            textAlign={'center'}
          >
            Welcome to ERPNext
          </Text>
          <View
            mt={3.5}
            mb={6}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text
              letterSpacing={0}
              color={'blueGray.500'}
            >
              Application that integrates information
            </Text>
            <Text color={'blueGray.500'}>flow across departments.</Text>
          </View>
        </View>
        <VStack
          space={3.5}
          w={{ base: 300, lg: 400 }}
        >
          <InputStyled
            title={'url'}
            value={state.url}
            autoCapitalize='none'
            onChangeText={(value) => handleTyping('url', value)}
          />

          <InputStyled
            title={'user'}
            value={state.usr}
            autoCapitalize='none'
            onChangeText={(value) => handleTyping('usr', value)}
          />

          <InputStyled
            title={'pass'}
            value={state.pwd}
            autoCapitalize='none'
            type={'password'}
            onChangeText={(value) => handleTyping('pwd', value)}
          />
          <Button
            rounded={10}
            mt={6}
            mb={2.5}
            px={6}
            bg={COLORS.primary}
            _text={{ fontSize: 'xl', fontWeight: 'bold', letterSpacing: 0.75 }}
            _pressed={{ bg: COLORS.secondary }}
            onPress={() => authenticate(state.url, state.usr, state.pwd)}
          >
            {'Log in'}
          </Button>
          <TouchableOpacity>
            <Text
              textAlign={'center'}
              mt={4}
              underline={true}
            >
              Contact Us
            </Text>
          </TouchableOpacity>
          {/* <Button
            rounded={20}
            px={6}
            bg={COLORS.primary}
            _text={{ fontSize: 'lg', fontWeight: 'bold', letterSpacing: 0.5 }}
            _pressed={{ bg: COLORS.secondary }}
            onPress={() =>
              authenticate(state.url, state.usr, state.pwd, () =>
                navigation.replace('PaymentEntry', { filterData: [] })
              )
            }
          >
            {'Login -> Payment Entry'}
          </Button> */}
        </VStack>
      </VStack>
    </View>
  );
}

export default LoginFrappeURL;
