import { Button, FormControl, Input, Text, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../constants/theme';
import { FrappeLogo } from '../components';
import axios from 'axios';
import { storeData } from '../utils/async-storage';

const InputStyled = (props) => (
  <Input
    {...props}
    height={{ base: 9, lg: 10 }}
    rounded={12}
    fontSize={{ base: SIZES.medium, lg: SIZES.large }}
    backgroundColor='blueGray.100'
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
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleTyping = (name, value) => {
    setState((pre) => ({ ...pre, [name]: value }));
  };

  const authenticate = async (url, usr, pwd, naviagateTo) => {
    axios
      .post(`https://${url}/api/method/login`, { usr: usr, pwd: pwd })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          storeData('URL', state.url);
          storeData('NAME', response.data.full_name);
          setLoginSuccess(true);
          naviagateTo();
        }
      })
      .catch((error) => {
        alert(`Invalid Authentication`);
      });
  };

  return (
    <View
      bg={'blueGray.200'}
      h={1200}
    >
      <VStack
        m={12}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <View
          m={6}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <View m={6}>
            <FrappeLogo size={'md'} />
          </View>
          <Text
            color={COLORS.primary}
            fontWeight={'bold'}
            fontSize={'lg'}
            textAlign={'center'}
          >{`ERP Next`}</Text>
        </View>
        <FormControl w={{ base: 300, lg: 400 }}>
          <FormControl.Label>URL</FormControl.Label>
          <InputStyled
            value={state.url}
            autoCapitalize='none'
            onChangeText={(value) => handleTyping('url', value)}
          />
          <FormControl.Label>Username</FormControl.Label>
          <InputStyled
            value={state.usr}
            autoCapitalize='none'
            onChangeText={(value) => handleTyping('usr', value)}
          />
          <FormControl.Label>Password</FormControl.Label>
          <InputStyled
            value={state.pwd}
            autoCapitalize='none'
            type={'password'}
            onChangeText={(value) => handleTyping('pwd', value)}
          />
          <Button
            rounded={20}
            mt={6}
            mb={2.5}
            px={6}
            bg={COLORS.primary}
            _text={{ fontSize: 'lg', fontWeight: 'bold', letterSpacing: 0.5 }}
            _pressed={{ bg: COLORS.secondary }}
            onPress={() =>
              authenticate(state.url, state.usr, state.pwd, () => {
                navigation.replace('Home');
                // navigation.replace('Home');
              })
            }
          >
            {'Login -> main app'}
          </Button>
          <Button
            rounded={20}
            px={6}
            bg={COLORS.primary}
            _text={{ fontSize: 'lg', fontWeight: 'bold', letterSpacing: 0.5 }}
            _pressed={{ bg: COLORS.secondary }}
            onPress={() => authenticate(state.url, state.usr, state.pwd, () => navigation.replace('TestQRScanner'))}
          >
            {'Login -> scan add item'}
          </Button>
        </FormControl>
      </VStack>
    </View>
  );
}

export default LoginFrappeURL;
