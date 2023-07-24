import { HStack, Input } from 'native-base';
import { ICON, SIZES, SPACING } from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

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
