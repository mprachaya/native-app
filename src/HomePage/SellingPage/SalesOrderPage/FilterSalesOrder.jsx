import {
  Button,
  Center,
  CheckIcon,
  CloseIcon,
  FormControl,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Select,
  VStack,
  View,
} from 'native-base';
import React, { useState, useMemo, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import useConfig from '../../../../config/path';
import { DynamicSelectPage } from '../../../../components';
// import useConfig from '../../../../config/path';

const ContainerStyled = (props) => {
  const { height } = useWindowDimensions();
  return (
    <View
      _android={{ height: height }}
      bg={'blueGray.100'}
      {...props}
    >
      {props.children}
    </View>
  );
};

function FilterSalesOrder({ route, navigation }) {
  const { storeFilter } = route.params; // get State from storeFilter
  const { baseURL, CUSTOMERS } = useConfig(true);

  const initialsFilterState = {
    status: '',
    customer: '',
    transaction_date_from: '',
    transaction_date_to: '',
    delivery_date_from: '',
    delivery_date_to: '',
    delivery_status: '',
    billing_status: '',
  };

  const RouteName = 'SalesOrder';

  const [filterState, setFilterState] = useState(initialsFilterState);

  // date now for ios
  const [dateIOS, setDateIOS] = useState(new Date());
  const [dateIOSNextMonth, setDateIOSNextMonth] = useState(new Date());
  const [deliveryDateIOS, setDeliveryDateIOS] = useState(new Date());
  const [deliveryDateIOSNextMonth, setDeliveryDateIOSNextMonth] = useState(new Date());
  const [checkedFromDateState, setCheckedFromDateState] = useState(false);
  const [checkedToDateState, setCheckedToDateState] = useState(false);
  const [checkedDeliveryFromDateState, setCheckedDeliveryFromDateState] = useState(false);
  const [checkedDeliveryToDateState, setCheckedDeliveryToDateState] = useState(false);
  // const [show, setShow] = useState(false);
  const onChangeIOSfrom = (event, selectedDate, type) => {
    const currentDate = selectedDate;
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth(); // Months start at 0!
    let dd = currentDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    if (event?.type === 'dismissed') {
    } else {
      type === 'transaction'
        ? setFilterState((pre) => ({ ...pre, transaction_date_from: formattedToday }))
        : setFilterState((pre) => ({ ...pre, delivery_date_from: formattedToday }));
    }
  };
  const onChangeIOSto = (event, selectedDate, type) => {
    const currentDate = selectedDate;
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth(); // Months start at 0!
    let dd = currentDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    if (event?.type === 'dismissed') {
    } else {
      type === 'transaction'
        ? setFilterState((pre) => ({ ...pre, transaction_date_to: formattedToday }))
        : setFilterState((pre) => ({ ...pre, delivery_date_to: formattedToday }));
    }
  };

  // set Default value of to Date Object (+ 1 month)
  useMemo(() => {
    const plusMonth = new Date();
    plusMonth.setMonth(plusMonth.getMonth() + 1);
    // setAndroidNextMount(() => plusMonth);
    setDateIOSNextMonth(() => plusMonth);
    setDeliveryDateIOSNextMonth(() => plusMonth);
  }, []);

  useMemo(() => {
    if (checkedToDateState) {
      const currentDate = new Date();
      const yyyy = currentDate.getFullYear();
      let mm = currentDate.getMonth() + 2; // Months start at 0!
      let dd = currentDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      const formattedToday = yyyy + '-' + mm + '-' + dd;
      setFilterState((pre) => ({ ...pre, transaction_date_to: formattedToday }));
    }
  }, [checkedToDateState]);

  useMemo(() => {
    if (checkedFromDateState) {
      const currentDate = new Date();
      const yyyy = currentDate.getFullYear();
      let mm = currentDate.getMonth() + 1; // Months start at 0!
      let dd = currentDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      const formattedToday = yyyy + '-' + mm + '-' + dd;
      setFilterState((pre) => ({ ...pre, transaction_date_from: formattedToday }));
    }
  }, [checkedFromDateState]);

  useMemo(() => {
    if (checkedDeliveryFromDateState) {
      const currentDate = new Date();
      const yyyy = currentDate.getFullYear();
      let mm = currentDate.getMonth() + 2; // Months start at 0!
      let dd = currentDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      const formattedToday = yyyy + '-' + mm + '-' + dd;
      setFilterState((pre) => ({ ...pre, delivery_date_from: formattedToday }));
    }
  }, [checkedDeliveryFromDateState]);

  useMemo(() => {
    if (checkedDeliveryToDateState) {
      const currentDate = new Date();
      const yyyy = currentDate.getFullYear();
      let mm = currentDate.getMonth() + 1; // Months start at 0!
      let dd = currentDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      const formattedToday = yyyy + '-' + mm + '-' + dd;
      setFilterState((pre) => ({ ...pre, delivery_date_to: formattedToday }));
    }
  }, [checkedDeliveryToDateState]);

  useMemo(() => {
    // if filtered set state with storeFilter
    if (storeFilter !== undefined) {
      setFilterState(storeFilter);
      // set Filter Date from storeFilter
      if (storeFilter.transaction_date_from) {
        setCheckedFromDateState(true);
        setCheckedToDateState(true);
      }
      // set Filter Date from storeFilter
      if (storeFilter.delivery_date_from) {
        setCheckedDeliveryFromDateState(true);
        setCheckedDeliveryToDateState(true);
      }
    }
  }, [storeFilter]);

  useEffect(() => {
    console.log(filterState);
  }, [filterState]);

  const handleSetFilter = () => {
    // select from date but not select to date
    if (filterState.transaction_date_from && !filterState.transaction_date_to) {
      alert('Please select transaction to date!');
    }
    // select from to but not select to from
    else if (!filterState.transaction_date_from && filterState.transaction_date_to) {
      alert('Please select transaction from date!');
    } else if (filterState.delivery_date_from && !filterState.delivery_date_to) {
      alert('Please delivery to date!');
    } else if (!filterState.delivery_date_from && filterState.delivery_date_to) {
      alert('Please select delivery from date!');
    } else {
      navigation.pop();
      navigation.replace(RouteName, { filterData: filterState, toggleFilter: true });
    }
  };

  // for customer fetch select
  const [titleSelection, setTitleSelection] = useState('');
  const [urlSelected, setUrlSelected] = useState('');
  const [propertySelected, setPropertySelected] = useState('');
  // state for show / hide selection (dynamically)
  const [openSelection, setOpenSelection] = useState(false);

  const getValueFromSelection = (name) => {
    setPropertySelected(name);
  };

  const handleChangeURL = (title, name, url) => {
    setTitleSelection(title);
    getValueFromSelection(name);
    setUrlSelected(url);
    setOpenSelection(true);
  };

  const handleOpenDynamicSelection = (title, name, url) => {
    handleChangeURL(title, name, url);
    // set main state with sub state
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
            onChangeAndroidFromText={props.handleChange}
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

  return (
    <ContainerStyled>
      <Center>
        {/* {!openSelection && !openCustomerType && ( */}
        {!openSelection && (
          <ScrollView
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
                placeholder='None'
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
                  label='To Deliver and Bill'
                  value='To Deliver and Bill'
                />
                <Select.Item
                  label='To Bill'
                  value='To Bill'
                />
                <Select.Item
                  label='To Deliver'
                  value='To Deliver'
                />
                <Select.Item
                  label='Completed'
                  value='Completed'
                />
              </Select>
            </View>
            {/*customer */}
            <View w={'container'}>
              <OnPressContainer onPress={() => handleOpenDynamicSelection('Customer', 'customer', baseURL + CUSTOMERS)}>
                <StyledTextField
                  // isRequired
                  caretHidden
                  value={filterState.customer}
                  label={'Customer'}
                  placeholder={'None'}
                  // name={'default_price_list'}
                  showSoftInputOnFocus={false}
                />
              </OnPressContainer>
            </View>
            <View w={'container'}>
              <FormControl justifyContent={'center'}>
                <FormControl.Label mx={6}>Delivery Status</FormControl.Label>
              </FormControl>
              <Select
                dropdownIcon={true}
                selectedValue={filterState.delivery_status}
                mx={6}
                w={'full'}
                fontSize={18}
                borderWidth={2}
                borderColor={'gray.200'}
                accessibilityLabel='Delivery Status'
                placeholder='None'
                _selectedItem={{
                  bg: 'blueGray.200',
                  endIcon: <CheckIcon color={'blueGray.400'} />,
                }}
                onValueChange={(itemValue) => setFilterState((pre) => ({ ...pre, delivery_status: itemValue }))}
              >
                <Select.Item
                  label='Not Delivered'
                  value='Not Delivered'
                />

                <Select.Item
                  label='Fully Delivered'
                  value='Fully Delivered'
                />
                <Select.Item
                  label='Partly Delivered'
                  value='Partly Delivered'
                />
                <Select.Item
                  label='Closed'
                  value='Closed'
                />
                <Select.Item
                  label='Not Applicable'
                  value='Not Applicable'
                />
              </Select>
            </View>
            <View w={'container'}>
              <FormControl justifyContent={'center'}>
                <FormControl.Label mx={6}>Billing Status</FormControl.Label>
              </FormControl>
              <Select
                dropdownIcon={true}
                selectedValue={filterState.billing_status}
                mx={6}
                w={'full'}
                fontSize={18}
                borderWidth={2}
                borderColor={'gray.200'}
                accessibilityLabel='Billing Status'
                placeholder='None'
                _selectedItem={{
                  bg: 'blueGray.200',
                  endIcon: <CheckIcon color={'blueGray.400'} />,
                }}
                onValueChange={(itemValue) => setFilterState((pre) => ({ ...pre, billing_status: itemValue }))}
              >
                <Select.Item
                  label='Not Billed'
                  value='Not Billed'
                />

                <Select.Item
                  label='Fully Billed'
                  value='Fully Billed'
                />
                <Select.Item
                  label='Partly Billed'
                  value='Partly Billed'
                />
                <Select.Item
                  label='Closed'
                  value='Closed'
                />
              </Select>
            </View>
            {/* for IOS */}
            {/* {Platform.OS === 'ios' && ( */}
            <React.Fragment>
              <FormControl justifyContent={'center'}>
                <FormControl.Label mx={6}> Transaction Date</FormControl.Label>
              </FormControl>

              <HStack
                mx={6}
                rounded={'md'}
                borderColor={'blueGray.200'}
                borderWidth={2}
              >
                <View
                  ml={2.5}
                  my={3}
                  w={'40'}
                >
                  <FormControl justifyContent={'center'}>
                    <FormControl.Label my={0}>From Date</FormControl.Label>
                  </FormControl>
                  <HStack justifyContent={'space-between'}>
                    <Button
                      ml={-3}
                      opacity={checkedFromDateState ? 1 : 0.1}
                      px={0}
                      onPress={() => setCheckedFromDateState(true)}
                      variant={'unstyled'}
                    >
                      <RNDateTimePicker
                        display='clock'
                        disabled={!checkedFromDateState}
                        is24Hour={true}
                        mode='date'
                        value={dateIOS}
                        onChange={(e, value) => onChangeIOSfrom(e, value, 'transaction')}
                      />
                    </Button>
                    {checkedFromDateState && (
                      <Button
                        variant={'unstyled'}
                        onPress={() => {
                          setFilterState((pre) => ({ ...pre, transaction_date_from: '' }));
                          setCheckedFromDateState(false);
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    )}
                  </HStack>
                </View>
                <View
                  ml={3}
                  my={3}
                >
                  <FormControl justifyContent={'center'}>
                    <FormControl.Label my={0}>To Date</FormControl.Label>
                  </FormControl>
                  <HStack justifyContent={'space-between'}>
                    <Button
                      ml={-3}
                      px={0}
                      opacity={checkedToDateState ? 1 : 0.1}
                      onPress={() => setCheckedToDateState(true)}
                      variant={'unstyled'}
                    >
                      <RNDateTimePicker
                        display='clock'
                        disabled={!checkedToDateState}
                        is24Hour={true}
                        mode='date'
                        value={dateIOSNextMonth}
                        onChange={(e, value) => onChangeIOSto(e, value, 'transaction')}
                      />
                    </Button>
                    {checkedToDateState && (
                      <Button
                        variant={'unstyled'}
                        onPress={() => {
                          setFilterState((pre) => ({ ...pre, transaction_date_to: '' }));
                          setCheckedToDateState(false);
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    )}
                  </HStack>
                </View>
              </HStack>
            </React.Fragment>
            <React.Fragment>
              <FormControl justifyContent={'center'}>
                <FormControl.Label mx={6}> Delivery Date</FormControl.Label>
              </FormControl>

              <HStack
                mx={6}
                mb={6}
                rounded={'md'}
                borderColor={'blueGray.200'}
                borderWidth={2}
              >
                <View
                  ml={2.5}
                  my={3}
                  w={'40'}
                >
                  <FormControl justifyContent={'center'}>
                    <FormControl.Label my={0}>From Date</FormControl.Label>
                  </FormControl>
                  <HStack justifyContent={'space-between'}>
                    <Button
                      ml={-3}
                      opacity={checkedDeliveryFromDateState ? 1 : 0.1}
                      px={0}
                      onPress={() => setCheckedDeliveryFromDateState(true)}
                      variant={'unstyled'}
                    >
                      <RNDateTimePicker
                        display='clock'
                        disabled={!checkedDeliveryFromDateState}
                        is24Hour={true}
                        mode='date'
                        value={deliveryDateIOS}
                        onChange={onChangeIOSfrom}
                      />
                    </Button>
                    {checkedDeliveryFromDateState && (
                      <Button
                        variant={'unstyled'}
                        onPress={() => {
                          setFilterState((pre) => ({ ...pre, delivery_date_from: '' }));
                          setCheckedDeliveryFromDateState(false);
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    )}
                  </HStack>
                </View>
                <View
                  ml={3}
                  my={3}
                >
                  <FormControl justifyContent={'center'}>
                    <FormControl.Label my={0}>To Date</FormControl.Label>
                  </FormControl>
                  <HStack justifyContent={'space-between'}>
                    <Button
                      ml={-3}
                      px={0}
                      opacity={checkedDeliveryToDateState ? 1 : 0.1}
                      onPress={() => setCheckedDeliveryToDateState(true)}
                      variant={'unstyled'}
                    >
                      <RNDateTimePicker
                        display='clock'
                        disabled={!checkedDeliveryToDateState}
                        is24Hour={true}
                        mode='date'
                        value={deliveryDateIOSNextMonth}
                        onChange={onChangeIOSto}
                      />
                    </Button>
                    {checkedDeliveryToDateState && (
                      <Button
                        variant={'unstyled'}
                        onPress={() => {
                          setFilterState((pre) => ({ ...pre, delivery_date_to: '' }));
                          setCheckedDeliveryToDateState(false);
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    )}
                  </HStack>
                </View>
              </HStack>
            </React.Fragment>
            {/* )} */}
            {!openSelection && (
              <HStack
                mb={24}
                justifyContent={'center'}
                space={2.5}
              >
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
                    navigation.replace(RouteName, { filterData: initialsFilterState, toggleFilter: true });
                  }}
                >
                  CLEAR
                </Button>
              </HStack>
            )}
          </ScrollView>
        )}
      </Center>
      <DynamicSelectPage
        title={titleSelection} // for change dynamic title
        url={urlSelected} // for change dynamic data in selection
        open={openSelection} // state for show/hide selection
        setOpen={setOpenSelection} // for control show/hide
        setState={setFilterState} // for send data to outside selection and set it in main state by property
        property={propertySelected} // name of property for send data to outside
      />
    </ContainerStyled>
  );
}

export default FilterSalesOrder;
