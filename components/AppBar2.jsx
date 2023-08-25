import { Avatar, Box, Button, Center, ChevronRightIcon, HStack, Hidden, Link, Text } from 'native-base';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';
// import { SearchInput } from './Inputs';
// import { useContext } from 'react';
// import { Context } from '../reducer';
import FrappeLogo from './FrappeLogo';
import TextStyled from './TextStyled';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../utils/async-storage';
import { useEffect, useState } from 'react';

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
    navigation.replace('LoginERPNext');
  };
  return (
    <Box
      safeAreaTop
      height={140}
      pt={{ base: 12, lg: 10 }}
      bg={COLORS.primary}
      shadow={SHADOWS.medium}
    >
      <HStack
        justifyContent='space-between'
        marginX={{ base: 0, lg: 2 }}
      >
        <HStack>
          <Box m={4}>
            <Avatar size={'md'} />
          </Box>
          <Box my={3}>
            <TextStyled
              fontSize={{ base: 16, lg: 24 }}
              fontWeight='bold'
              color={COLORS.tertiary}
            >
              {userName}
            </TextStyled>
            <TextStyled
              fontSize={{ base: 12, lg: 20 }}
              color={'#919394'}
            >
              Simply dummy · text of the printing
            </TextStyled>
          </Box>
          {/* <HStack space={{ base: SPACING.small, lg: SPACING.medium }}>
            <FrappeLogo size={'xs'} />
            <Hidden only={'base'}>
              <Link my={2.5}>
                <ChevronRightIcon
                  my={0.5}
                  mr={2}
                />
                <Text fontSize={'md'}>{state.pathname}</Text>
              </Link>
            </Hidden>
          </HStack> */}
        </HStack>
        <Button
          variant={'unstyled'}
          _pressed={{ bg: COLORS.secondary }}
          onPress={handleLogOut}
          h={'12'}
          my={2}
          mr={8}
        >
          <TextStyled
            color={'white'}
            fontWeight='bold'
          >
            Logout
          </TextStyled>
          {/* <HStack space={{ base: 0, lg: SPACING.small }}>
            <SearchInput />
            <HStack space={{ base: 2, lg: SPACING.small }}>
              <Avatar
                bg='lightBlue.400'
                size={'10'}
              >
                A
              </Avatar>
              <Avatar size={'10'}>
                <Avatar.Badge bg='green.500' />A
              </Avatar>
            </HStack>
          </HStack> */}
        </Button>
      </HStack>
    </Box>
  );
}
