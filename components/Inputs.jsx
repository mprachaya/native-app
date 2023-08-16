import { Button, HStack, Input } from 'native-base';
import { ICON, SIZES, SPACING } from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SearchInput = (props) => (
  <Input
    {...props}
    height={{ base: 9, lg: 10 }}
    rounded={12}
    mx='2'
    placeholder='Search'
    fontSize={{ base: SIZES.medium, lg: SIZES.large }}
    w={{ base: 'full' || props.baseSize, lg: 500 || props.lgSize }}
    backgroundColor='blueGray.100'
    _focus={{
      borderColor: 'white',
      backgroundColor: 'blueGray.200',
    }}
    InputLeftElement={
      <HStack mx={SPACING.small}>
        <Icon
          name='search'
          size={ICON.base}
          color={'gray'}
        />
      </HStack>
    }
    InputRightElement={
      props.clear && (
        <HStack mx={SPACING.small}>
          <Button
            variant={'unstyled'}
            p={1}
            onPress={props.clearAction}
          >
            <Icon
              name='close'
              size={ICON.base}
              color={'gray'}
            />
          </Button>
        </HStack>
      )
    }
  />
);

export const SearchInputFilled = (props) => (
  <Input
    {...props}
    bg={'blueGray.50'}
    variant={'filled'}
    rounded={12}
    placeholder={props.label}
    fontSize={{ base: SIZES.medium || props.baseSize, lg: SIZES.large || props.lgSize }}
    minW={{ base: 'full', lg: 400 }}
    w={{ base: 'full' || props.baseSize, lg: 400 || props.lgSize }}
    _focus={{
      borderColor: 'blueGray.300',
      backgroundColor: 'blueGray.100',
    }}
    onChangeText={props.handleChange}
  />
);
