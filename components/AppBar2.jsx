import { Avatar, Box, Center, ChevronRightIcon, HStack, Hidden, Link, Text } from 'native-base';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';
// import { SearchInput } from './Inputs';
// import { useContext } from 'react';
// import { Context } from '../reducer';
import FrappeLogo from './FrappeLogo';
import TextStyled from './TextStyled';

export default function AppBar(props) {
  // const [state] = useContext(Context);
  return (
    <Box
      safeAreaTop
      height={'32'}
      pt={10}
      pb={6}
      bg={COLORS.primary}
      shadow={SHADOWS.medium}
      roundedBottom={24}
    >
      <HStack
        h='full'
        justifyContent='space-between'
        marginX={4}
      >
        <HStack>
          <Box m={4}>
            <Avatar size={'md'} />
          </Box>
          <Box my={3}>
            <TextStyled
              fontSize={24}
              fontWeight='bold'
              color={COLORS.tertiary}
            >
              Lorem Ipsum
            </TextStyled>
            <TextStyled
              fontSize={20}
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
        <Box
          my={6}
          mr={8}
        >
          <TextStyled
            color={'white'}
            fontWeight='bold'
          >
            . . .
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
        </Box>
      </HStack>
    </Box>
  );
}
