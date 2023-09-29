import { Avatar, Box, Button, Center, ChevronRightIcon, HStack, Hidden, Link, Text, View } from 'native-base';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';
// import { SearchInput } from './Inputs';
// import { useContext } from 'react';
// import { Context } from '../reducer';
import FrappeLogo from './FrappeLogo';
import TextStyled from './TextStyled';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../utils/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';

export default function AppBar() {
  // const [state] = useContext(Context);
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getData('NAME').then((value) => {
      setUserName(value);
    });
  }, []);

  const handleLogOut = () => {
    clearAsyncStorage = async () => {
      AsyncStorage.clear();
    };
    axios
      .get(`https://tonen.vsiam.com/api/method/logout`)
      .then((response) => {
        if (response.status === 200) {
          navigation.replace('LoginERPNext');
        }
      })
      .catch((error) => {
        // alert(`Invalid Authentication`);
      });
  };
  return (
    <Box
      safeAreaTop
      mt={2}
      height={125}
      pt={{ base: 12, lg: 10 }}
      bg={COLORS.lightWhite}
      // shadow={SHADOWS.medium}
    >
      <HStack
        justifyContent='space-between'
        marginX={{ base: 0, lg: 2 }}
      >
        <HStack>
          <Box m={4}>
            <Avatar
              size={'md'}
              source={{
                uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
              }}
            ></Avatar>
          </Box>
          <Box my={4}>
            <TextStyled
              fontSize={{ base: 16, lg: 24 }}
              fontWeight='bold'
              color={COLORS.tertiary2}
            >
              {userName}
            </TextStyled>
            <TextStyled
              fontSize={{ base: 12, lg: 20 }}
              color={'#919394'}
            >
              Simply dummy
            </TextStyled>
          </Box>
        </HStack>
        <View
          // my={4}
          mt={0.5}
          mb={6}
          mr={3.5}
          px={4}
          borderBottomLeftRadius={30}
          justifyContent={'center'}
          bg={COLORS.primary}
        >
          <TouchableOpacity
            variant={'unstyled'}
            // _pressed={{ bg: COLORS.secondary }}
            onPress={handleLogOut}
          >
            <TextStyled
              color={COLORS.white}
              fontWeight='bold'
            >
              Logout
            </TextStyled>
          </TouchableOpacity>
        </View>
      </HStack>
    </Box>
  );
}
