import { HStack, Input } from 'native-base';
import { ICON, SIZES, SPACING } from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextStyled from './TextStyled';

export const SearchInput = (props) => (
  <Input
    {...props}
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
    bg={'blueGray.100'}
    variant={'filled'}
    rounded={12}
    mx='2'
    placeholder={props.label}
    fontSize={{ base: SIZES.medium, lg: SIZES.large }}
    w={{ base: 200, lg: 400 }}
    _focus={{
      borderColor: 'white',
      backgroundColor: 'blueGray.200',
    }}
  />
);
