import { Box, Button, ChevronDownIcon, ChevronUpIcon, HStack, Menu, Text } from 'native-base';
import { SIZES } from '../constants/theme';
import TextStyled from './TextStyled';

export const CustomSort = ({ sort, setSortOption, setSort, sortOptionDisplay, setSortOptionDisplay }) => (
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
        {sort ? (
          <HStack
            space={2}
            w={'20'}
            justifyContent={'center'}
          >
            <ChevronUpIcon my={{ base: 0.8, lg: 1.5 }} />
            <Text fontSize={{ base: SIZES.small, lg: SIZES.large }}>ASC</Text>
          </HStack>
        ) : (
          <HStack
            space={2}
            w={'20'}
            justifyContent={'center'}
          >
            <ChevronDownIcon my={{ base: 0.8, lg: 1.5 }} />
            <Text fontSize={{ base: SIZES.small, lg: SIZES.large }}>DESC</Text>
          </HStack>
        )}
      </Button>
      <HStack>
        <Menu
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
                  fontSize={{ base: SIZES.small, lg: SIZES.large }}
                  my={-0.5}
                  mx={2}
                >
                  {sortOptionDisplay}
                </Text>
              </Button>
            );
          }}
        >
          <Menu.Item
            onPress={() => {
              setSortOption('transaction_date');
              setSortOptionDisplay('Created On');
            }}
          >
            <TextStyled>Created On</TextStyled>
          </Menu.Item>
          <Menu.Item
            onPress={() => {
              setSortOption('status');
              setSortOptionDisplay('Status');
            }}
          >
            <TextStyled>Status</TextStyled>
          </Menu.Item>
          <Menu.Item
            onPress={() => {
              setSortOption('supplier');
              setSortOptionDisplay('Title');
            }}
          >
            <TextStyled>Title</TextStyled>
          </Menu.Item>
          <Menu.Item
            onPress={() => {
              setSortOption('company');
              setSortOptionDisplay('Company');
            }}
          >
            <TextStyled>Company</TextStyled>
          </Menu.Item>
        </Menu>
      </HStack>
    </Button.Group>
  </HStack>
);
