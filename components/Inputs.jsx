import { HStack, Input } from 'native-base';
import { ICON, SIZES, SPACING } from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextStyled from './TextStyled';

export const SearchInput = (props) => (
  <Input
    {...props}
    height={{ base: 9, lg: 10 }}
    rounded={12}
    mx='2'
    placeholder='Search'
    fontSize={{ base: SIZES.medium, lg: SIZES.large }}
    w={{ base: 200, lg: 400 }}
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
  />
);

export const SearchInputFilled = (props) => (
  <Input
    {...props}
    bg={'blueGray.50'}
    variant={'filled'}
    rounded={12}
    placeholder={props.label}
    fontSize={{ base: SIZES.medium, lg: SIZES.large }}
    minW={{ base: 'full', lg: 400 }}
    w={{ base: 'full', lg: 400 }}
    _focus={{
      borderColor: 'blueGray.300',
      backgroundColor: 'blueGray.100',
    }}
    onChangeText={props.handleChange}
  />
);
