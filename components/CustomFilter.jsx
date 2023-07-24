import { Box, Button, ChevronDownIcon, ChevronUpIcon, HStack, Menu, Text } from 'native-base';
import { SIZES } from '../constants/theme';
import TextStyled from './TextStyled';

export const CustomSort = ({ sort, sortOption, handleChange, setSort }) => (
  <HStack
    h={12}
    mb={6}
    justifyContent={'flex-end'}
  >
    <Button.Group
      isAttached
      colorScheme='blueGray'
      mx={{
        base: 'auto',
        md: 0,
      }}
      size='md'
    >
      <Button
        borderLeftRadius={12}
        background={'blueGray.50'}
        borderWidth={1}
        borderColor={'blueGray.200'}
        shadow={1}
        onPress={() => setSort(!sort)}
        _pressed={{
          background: 'blueGray.100',
        }}
      >
        <HStack
          space={2}
          w={'20'}
          justifyContent={'center'}
        >
          {sort ? <ChevronUpIcon my={1.5} /> : <ChevronDownIcon my={1.5} />}
          {sort ? <Text fontSize={SIZES.large}>ASC</Text> : <Text fontSize={SIZES.large}>DESC</Text>}
        </HStack>
      </Button>
      <HStack>
        <Menu
          value={sortOption}
          trigger={(triggerProps) => {
            return (
              <Button
                background={'blueGray.50'}
                borderWidth={1}
                shadow={1}
                borderColor={'blueGray.200'}
                borderRightRadius={12}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
                accessibilityLabel='More options menu'
                {...triggerProps}
              >
                <Text
                  fontSize={SIZES.large}
                  my={-0.5}
                  mx={2}
                >
                  {sortOption}
                </Text>
              </Button>
            );
          }}
        >
          <Menu.Item onPress={() => handleChange('Created On')}>
            <TextStyled>Created On</TextStyled>
          </Menu.Item>
          <Menu.Item onPress={() => handleChange('Status')}>
            <TextStyled>Status</TextStyled>
          </Menu.Item>
          <Menu.Item onPress={() => handleChange('Title')}>
            <TextStyled>Title</TextStyled>
          </Menu.Item>
          <Menu.Item onPress={() => handleChange('Company')}>
            <TextStyled>Company</TextStyled>
          </Menu.Item>
        </Menu>
      </HStack>
    </Button.Group>
  </HStack>
);
