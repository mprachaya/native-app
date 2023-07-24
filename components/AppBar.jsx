import { Avatar, Box, Center, ChevronRightIcon, HStack, Hidden, Input, Link, Text } from 'native-base';
import { ICON, SHADOWS, SIZES, SPACING } from '../constants/theme';
import { FrappeLogo } from './FrappeLogo';
import { SearchInput } from './Inputs';
import { useContext } from 'react';
import { Context } from '../reducer';

export const AppBar = (props) => {
  const [state] = useContext(Context);
  return (
    <Box
      safeAreaTop
      height={20}
      bg='white'
      style={{ top: 0, bottom: 0, left: 0, right: 0 }}
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
            <Avatar>A</Avatar>
          </HStack>
        </Center>
      </HStack>
    </Box>
  );
};
