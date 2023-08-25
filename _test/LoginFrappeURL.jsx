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

  const authenticate = (url, usr, pwd) => {
    axios
      .post(`https://${url}/api/method/login`, { usr: usr, pwd: pwd })
      .then((response) => {
        if (response.status === 200) {
          storeData('URL', state.url);
          storeData('NAME', response.data.full_name);
          setLoginSuccess(true);
        }
      })
      .catch((error) => {
        alert(`Invalid Authentication`);
      });
  };

  useEffect(() => {
    // if (loginSuccess) {
    //   getData('URL').then((value) => console.log(value));
    // }
    // const { BASE_URL } = useConfig();
    // if (loginSuccess) console.log(baseURL);
    if (loginSuccess) {
      alert(`Login Sucessfully`);
      setTimeout(() => {
        // navigation.replace('Home');
        navigation.replace('TestQRScanner');
      }, 1500);
    }
  }, [loginSuccess]);

  // useEffect(() => {
  //   console.log(url);
  // }, [url]);
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
            autoCapitalize='none'
            onChangeText={(value) => handleTyping('url', value)}
          />
          <FormControl.Label>Username</FormControl.Label>
          <InputStyled
            autoCapitalize='none'
            onChangeText={(value) => handleTyping('usr', value)}
          />
          <FormControl.Label>Password</FormControl.Label>
          <InputStyled
            autoCapitalize='none'
            type={'password'}
            onChangeText={(value) => handleTyping('pwd', value)}
          />
          <Button
            rounded={20}
            my={6}
            px={6}
            bg={COLORS.primary}
            _text={{ fontSize: 'lg', fontWeight: 'bold', letterSpacing: 0.5 }}
            _pressed={{ bg: COLORS.secondary }}
            onPress={() => authenticate(state.url, state.usr, state.pwd)}
          >
            Login
          </Button>
        </FormControl>
      </VStack>
    </View>
  );
}

export default LoginFrappeURL;
