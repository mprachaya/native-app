import { Button, Center, FormControl, HStack, Input, Pressable, VStack, View } from 'native-base';
import React, { useState, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { DynamicSelectPage, StaticSelectPage } from '../../../../components';
import { COLORS, SIZES } from '../../../../constants/theme';
import { url } from '../../../../config';
import useConfig from '../../../../config/path';

const ContainerStyled = (props) => {
  const { height } = useWindowDimensions();
  return (
    <View
      height={height}
      bg={'blueGray.100'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function FilterCustomer({ route, navigation }) {
  const { baseURL, CUSTOMER_GROUPS, TERRITORY } = useConfig(true);
  const { storeFilter } = route.params; // get State from storeFilter

  const initialsFilterState = {
    customer_type: '',
    customer_group: '',
    territory: '',
  };

  const [filterState, setFilterState] = useState({
    customer_type: '',
    customer_group: '',
    territory: '',
  });

  useMemo(() => {
    // if filtered set state with storeFilter
    if (storeFilter !== undefined) {
      setFilterState(storeFilter);
    }
  }, [storeFilter]);

  // for handle selection title (dynamic)
  const [titleSelection, setTitleSelection] = useState('');
  // for handle dynamic url selection
  const [urlSelected, setUrlSelected] = useState('');
  // url path for fetching selection data
  const urlCtmGroup = baseURL + CUSTOMER_GROUPS;
  const urlTerritory = baseURL + TERRITORY;

  // handle dynamic property for multi selection in page
  const [propertySelected, setPropertySelected] = useState('');

  const [openSelection, setOpenSelection] = useState(false);

  const [openCustomerType, setOpenCustomerType] = useState(false);
  const customerTypes = [{ name: 'Company' }, { name: 'Individual' }];

  const getValueFromSelection = (name) => {
    setPropertySelected(name);
  };
  // handle change details of selection
  const handleChangeURL = (title, name, url) => {
    setTitleSelection(title);
    getValueFromSelection(name);
    setUrlSelected(url);
    setOpenSelection(true);
  };
  const handleOpenDynamicSelection = (title, name, url) => {
    handleChangeURL(title, name, url);
  };

  const handleOpenStaticSelection = () => {
    setOpenCustomerType(true);
  };

  const handleSetFilter = () => {
    navigation.pop();
    navigation.replace('Customer', { filterData: filterState, toggleFilter: true });
  };

  const StyledTextField = (props) => {
    return (
      <VStack mx={6}>
        <FormControl isInvalid={props.isRequired || false}>
          <FormControl.Label>{props.label}</FormControl.Label>
          <Input
            {...props}
            name={props.name}
            value={props.value}
            bg={'blueGray.100'}
            borderWidth={2}
            borderColor={'gray.200'}
            variant={'filled'}
            rounded={6}
            placeholder={props.placeholder}
            fontSize={{ base: SIZES.medium || props.baseSize, lg: SIZES.large || props.lgSize }}
            minW={{ base: 'full', lg: 400 }}
            w={{ base: 'full' || props.baseSize, lg: 400 || props.lgSize }}
            _focus={{
              borderColor: 'blueGray.300',
              backgroundColor: 'blueGray.100',
            }}
            onChangeText={props.handleChange}
          />
        </FormControl>
      </VStack>
    );
  };

  const OnPressContainer = ({ children, onPress }) => (
    <Pressable onPress={() => onPress()}>
      <View pointerEvents='none'>{children}</View>
    </Pressable>
  );

  // useEffect(() => {
  //   console.log(filterState);
  // }, [filterState]);

  return (
    <ContainerStyled>
      <Center>
        {!openSelection && !openCustomerType && (
          <VStack
            mt={6}
            space={4}
          >
            <OnPressContainer onPress={() => handleOpenStaticSelection()}>
              <StyledTextField
                caretHidden
                // isRequired={nullState.customer_type}
                label={'Customer Type'}
                name={'customer_type'}
                placeholder={'Select Customer Type'}
                value={filterState.customer_type}
                showSoftInputOnFocus={false} // disable toggle keyboard
              />
            </OnPressContainer>
            <OnPressContainer
              onPress={() => handleOpenDynamicSelection('Customer Group', 'customer_group', urlCtmGroup)}
            >
              <StyledTextField
                caretHidden
                // isRequired={nullState.customer_type}
                label={'Customer Group'}
                name={'customer_group'}
                placeholder={'Select Customer Group'}
                value={filterState.customer_group}
                showSoftInputOnFocus={false} // disable toggle keyboard
              />
            </OnPressContainer>
            <OnPressContainer onPress={() => handleOpenDynamicSelection('Territory', 'territory', urlTerritory)}>
              <StyledTextField
                caretHidden
                // isRequired={nullState.customer_type}
                label={'Territory'}
                name={'territory'}
                placeholder={'Select Territory'}
                value={filterState.territory}
                showSoftInputOnFocus={false} // disable toggle keyboard
              />
            </OnPressContainer>
          </VStack>
        )}
        <View m={6}>
          {openSelection && (
            <DynamicSelectPage
              title={titleSelection} // for change dynamic title
              url={urlSelected} // for change dynamic data in selection
              open={openSelection} // state for show/hide selection
              setOpen={setOpenSelection} // for control show/hide
              setState={setFilterState} // for send data to outside selection and set it in main state by property
              property={propertySelected} // name of property for send data to outside
            />
          )}
          {openCustomerType && (
            <StaticSelectPage
              title={'Customer Type'} // name of statice selection
              data={customerTypes} // data of statice selection
              open={openCustomerType} // state for show/hide selection
              setOpen={setOpenCustomerType} // for control show/hide
              setState={setFilterState} // for send data to outside selection and set it in main state by property
              property={'customer_type'} // name of property for send data to outside
            />
          )}
        </View>
        <HStack space={2.5}>
          <Button
            px={6}
            mt={12}
            minW={'32'}
            rounded={20}
            variant={'unstyled'}
            bg={COLORS.tertiary2}
            _text={{ color: 'white', fontWeight: 'semibold', letterSpacing: 0.5 }}
            _pressed={{ bg: COLORS.tertiary }}
            onPress={() => handleSetFilter()}
          >
            Apply Filter
          </Button>
          <Button
            px={6}
            mt={12}
            minW={'32'}
            rounded={20}
            borderWidth={1}
            borderColor={'blueGray.200'}
            variant={'unstyled'}
            // bg={COLORS.tertiary2}
            _text={{ color: 'blueGray.400', fontWeight: 'semibold', letterSpacing: 0.5 }}
            _pressed={{ bg: 'blueGray.200' }}
            onPress={() => {
              navigation.pop();
              navigation.replace('Customer', { filterData: initialsFilterState, toggleFilter: true });
            }}
          >
            CLEAR
          </Button>
        </HStack>
      </Center>
    </ContainerStyled>
  );
}

export default FilterCustomer;
