import { Button, Center, CheckIcon, FormControl, HStack, Pressable, Select, VStack, View } from 'native-base';
import React, { useState, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
// import { DynamicSelectPage, StaticSelectPage } from '../../../../components';
import { COLORS } from '../../../../constants/theme';
// import useConfig from '../../../../config/path';

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

function FilterQuotation({ route, navigation }) {
  // const { baseURL, quotation_toS, TERRITORY } = useConfig(true);
  const { storeFilter } = route.params; // get State from storeFilter

  const initialsFilterState = {
    status: '',
    quotation_to: '',
    order_type: '',
    transaction_date: '',
    valid_till: '',
  };

  const [filterState, setFilterState] = useState({
    status: '',
    quotation_to: '',
    order_type: '',
    transaction_date: '',
    valid_till: '',
  });

  useMemo(() => {
    // if filtered set state with storeFilter
    if (storeFilter !== undefined) {
      setFilterState(storeFilter);
    }
  }, [storeFilter]);

  // for handle selection title (dynamic)
  // const [titleSelection, setTitleSelection] = useState('');
  // for handle dynamic url selection
  // const [urlSelected, setUrlSelected] = useState('');
  // url path for fetching selection data
  // const urlCtmGroup = baseURL + quotation_toS;
  // const urlTerritory = baseURL + TERRITORY;

  // handle dynamic property for multi selection in page
  // const [propertySelected, setPropertySelected] = useState('');

  // const [openSelection, setOpenSelection] = useState(false);

  // const [openCustomerType, setOpenCustomerType] = useState(false);

  // const customerTypes = [{ name: 'Company' }, { name: 'Individual' }];

  // const getValueFromSelection = (name) => {
  //   setPropertySelected(name);
  // };
  // handle change details of selection
  // const handleChangeURL = (title, name, url) => {
  //   setTitleSelection(title);
  //   getValueFromSelection(name);
  //   setUrlSelected(url);
  //   setOpenSelection(true);
  // };
  // const handleOpenDynamicSelection = (title, name, url) => {
  //   handleChangeURL(title, name, url);
  // };

  // const handleOpenStaticSelection = () => {
  //   setOpenCustomerType(true);
  // };

  const handleSetFilter = () => {
    navigation.pop();
    navigation.replace('Customer', { filterData: filterState, toggleFilter: true });
  };

  // const StyledTextField = (props) => {
  //   return (
  //     <VStack mx={6}>
  //       <FormControl isInvalid={props.isRequired || false}>
  //         <FormControl.Label>{props.label}</FormControl.Label>
  //         <Input
  //           {...props}
  //           name={props.name}
  //           value={props.value}
  //           bg={'blueGray.100'}
  //           borderWidth={2}
  //           borderColor={'gray.200'}
  //           variant={'filled'}
  //           rounded={6}
  //           placeholder={props.placeholder}
  //           fontSize={{ base: SIZES.medium || props.baseSize, lg: SIZES.large || props.lgSize }}
  //           minW={{ base: 'full', lg: 400 }}
  //           w={{ base: 'full' || props.baseSize, lg: 400 || props.lgSize }}
  //           _focus={{
  //             borderColor: 'blueGray.300',
  //             backgroundColor: 'blueGray.100',
  //           }}
  //           onChangeText={props.handleChange}
  //         />
  //       </FormControl>
  //     </VStack>
  //   );
  // };

  // const OnPressContainer = ({ children, onPress }) => (
  //   <Pressable onPress={() => onPress()}>
  //     <View pointerEvents='none'>{children}</View>
  //   </Pressable>
  // );

  // useEffect(() => {
  //   console.log(filterState);
  // }, [filterState]);

  return (
    <ContainerStyled>
      <Center>
        {/* {!openSelection && !openCustomerType && ( */}
        <VStack
          mt={6}
          space={4}
          w={{ base: 'full', lg: 500 }}
        >
          {/* status  */}
          <View w={'container'}>
            <FormControl justifyContent={'center'}>
              <FormControl.Label mx={6}>Status</FormControl.Label>
            </FormControl>
            <Select
              dropdownIcon={true}
              selectedValue={filterState.status}
              mx={6}
              w={'full'}
              fontSize={18}
              borderWidth={2}
              borderColor={'gray.200'}
              accessibilityLabel='Status'
              placeholder='Choose Status'
              _selectedItem={{
                bg: 'blueGray.200',
                endIcon: <CheckIcon color={'blueGray.400'} />,
              }}
              onValueChange={(itemValue) => setFilterState((pre) => ({ ...pre, status: itemValue }))}
            >
              <Select.Item
                label='Draft'
                value='Draft'
              />

              <Select.Item
                label='Open'
                value='Open'
              />
              <Select.Item
                label='Ordered'
                value='Ordered'
              />
              <Select.Item
                label='Cancelled'
                value='Cancelled'
              />
              <Select.Item
                label='Expired'
                value='Expired'
              />
            </Select>
          </View>
          {/* quotation to  */}
          <View w={'container'}>
            <FormControl justifyContent={'center'}>
              <FormControl.Label mx={6}>Quotation To</FormControl.Label>
            </FormControl>
            <Select
              dropdownIcon={true}
              selectedValue={filterState.quotation_to}
              mx={6}
              w={'full'}
              fontSize={18}
              borderWidth={2}
              borderColor={'gray.200'}
              accessibilityLabel='Quotation To'
              placeholder='Choose Quotation To'
              _selectedItem={{
                bg: 'blueGray.200',
                endIcon: <CheckIcon color={'blueGray.400'} />,
              }}
              onValueChange={(itemValue) => setFilterState((pre) => ({ ...pre, quotation_to: itemValue }))}
            >
              <Select.Item
                label='Lead'
                value='Lead'
              />

              <Select.Item
                label='Customer'
                value='Customer'
              />
            </Select>
          </View>
          {/* order type  */}
          <View w={'container'}>
            <FormControl justifyContent={'center'}>
              <FormControl.Label mx={6}>Order Type</FormControl.Label>
            </FormControl>
            <Select
              dropdownIcon={true}
              selectedValue={filterState.order_type}
              mx={6}
              w={'full'}
              fontSize={18}
              borderWidth={2}
              borderColor={'gray.200'}
              accessibilityLabel='Order Type'
              placeholder='Choose Order Type'
              _selectedItem={{
                bg: 'blueGray.200',
                endIcon: <CheckIcon color={'blueGray.400'} />,
              }}
              onValueChange={(itemValue) => setFilterState((pre) => ({ ...pre, order_type: itemValue }))}
            >
              <Select.Item
                label='Sales'
                value='Sales'
              />

              <Select.Item
                label='Maintenance'
                value='Maintenance'
              />
              <Select.Item
                label='Shopping Cart'
                value='Shopping Cart'
              />
            </Select>
          </View>
          {/* <OnPressContainer onPress={() => handleOpenDynamicSelection('Customer Group', 'quotation_to', urlCtmGroup)}>
              <StyledTextField
                caretHidden
                // isRequired={nullState.status}
                label={'Customer Group'}
                name={'quotation_to'}
                placeholder={'Select Customer Group'}
                value={filterState.quotation_to}
                showSoftInputOnFocus={false} // disable toggle keyboard
              />
            </OnPressContainer>
            <OnPressContainer onPress={() => handleOpenDynamicSelection('Territory', 'order_type', urlTerritory)}>
              <StyledTextField
                caretHidden
                // isRequired={nullState.status}
                label={'Territory'}
                name={'order_type'}
                placeholder={'Select Territory'}
                value={filterState.order_type}
                showSoftInputOnFocus={false} // disable toggle keyboard
              />
            </OnPressContainer> */}
        </VStack>
        {/* )} */}
        {/* <View m={6}>
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
              property={'status'} // name of property for send data to outside
            />
          )}
        </View> */}
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

export default FilterQuotation;
