import { Avatar, Box, Center, ChevronRightIcon, HStack, Hidden, Link, Text } from 'native-base';
import { SHADOWS, SPACING } from '../constants/theme';
import { SearchInput } from './Inputs';
import { useContext } from 'react';
import { Context } from '../reducer';
import FrappeLogo from './FrappeLogo';
import GetScreenSize from '../hooks/GetScreenSize';

export default function AppBar(props) {
  const [state] = useContext(Context);
  return (
    <Box
      safeAreaTop
      height={32}
      pt={6}
      pb={6}
      bg='white'
      shadow={SHADOWS.small}
      {...props}
    >
      <HStack
        h='full'
        justifyContent='space-between'
        marginX={{ base: 4, lg: 12 }}
      >
        <Center>
          <HStack space={{ base: SPACING.small, lg: SPACING.medium }}>
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
          </HStack>
        </Center>
        <Center>
          <HStack space={{ base: 0, lg: SPACING.small }}>
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
          </HStack>
        </Center>
      </HStack>
    </Box>
  );
}
