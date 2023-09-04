import {
  Button,
  Center,
  CheckIcon,
  Checkbox,
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
import { Platform } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
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

  const RouteName = 'Quotation';

  const [filterState, setFilterState] = useState(initialsFilterState);

  // date now for android
  const [dateAndroidNow] = useState(new Date());
  const [dateAndroidNextMount, setAndroidNextMount] = useState(new Date()); // add 1 mount
  const onChangeAndroidFrom = (event, selectedDate) => {
    const currentDate = selectedDate;
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth() + 1; // Months start at 0!
    let dd = currentDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    if (event?.type === 'dismissed') {
      setFilterState((pre) => ({ ...pre, transaction_date: formattedToday }));
      return;
    }
    setFilterState((pre) => ({ ...pre, transaction_date: formattedToday }));
  };
  const onChangeAndroidTo = (event, selectedDate) => {
    const currentDate = selectedDate;
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth() + 1; // Months start at 0!
    let dd = currentDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    if (event?.type === 'dismissed') {
      setFilterState((pre) => ({ ...pre, valid_till: formattedToday }));
      return;
    }
    setFilterState((pre) => ({ ...pre, valid_till: formattedToday }));
  };

  const showAndoirdDatepickerFrom = () => {
    DateTimePickerAndroid.open({
      value: dateAndroidNow,
      onChange: (event, date) => onChangeAndroidFrom(event, date),
      mode: 'date',
      is24Hour: true,
    });
  };

  const showAndoirdDatepickerTo = () => {
    DateTimePickerAndroid.open({
      value: dateAndroidNextMount,
      onChange: (event, date) => onChangeAndroidTo(event, date),
      mode: 'date',
      is24Hour: true,
    });
  };
  // date now for ios
  const [dateIOS, setDateIOS] = useState(new Date());
  const [dateIOSNextMonth, setDateIOSNextMonth] = useState(new Date());
  const [checkState, setCheckState] = useState(false);
  // const [show, setShow] = useState(false);
  const onChangeIOSfrom = (event, selectedDate) => {
    const currentDate = selectedDate;
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth() + 1; // Months start at 0!
    let dd = currentDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    // const formattedToday = dd + '-' + mm + '-' + yyyy;
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    if (event?.type === 'dismissed') {
      setFilterState((pre) => ({ ...pre, transaction_date: formattedToday }));
      return;
    } else {
      setFilterState((pre) => ({ ...pre, transaction_date: formattedToday }));
    }
  };
  const onChangeIOSto = (event, selectedDate) => {
    const currentDate = selectedDate;
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth() + 1; // Months start at 0!
    let dd = currentDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    if (event?.type === 'dismissed') {
      setFilterState((pre) => ({ ...pre, valid_till: formattedToday }));
      return;
    } else {
      setFilterState((pre) => ({ ...pre, valid_till: formattedToday }));
    }
  };

  // set Default value of to Date Object (+ 1 month)
  useMemo(() => {
    const plusMonth = new Date();
    plusMonth.setMonth(plusMonth.getMonth() + 1);
    setAndroidNextMount(() => plusMonth);
    setDateIOSNextMonth(() => plusMonth);

    // const dateNow = new Date();
    // dateNow.setMonth(dateNow.getMonth());
    // setDateIOS(dateNow);
  }, []);

  useMemo(() => {
    // if filtered set state with storeFilter
    if (storeFilter !== undefined) {
      setFilterState(storeFilter);
    }
  }, [storeFilter]);

  useEffect(() => {
    console.log(filterState);
  }, [filterState]);

  const handleSetFilter = () => {
    navigation.pop();
    navigation.replace(RouteName, { filterData: filterState, toggleFilter: true });
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
          {/* for Android */}
          {Platform.OS === 'android' && (
            <VStack space={4}>
              <View w={'container'}>
                <OnPressContainer onPress={() => showAndoirdDatepickerFrom()}>
                  <StyledTextField
                    caretHidden
                    label={'From Date'}
                    placeholder={'Select Transaction Date'}
                    value={filterState.transaction_date}
                    showSoftInputOnFocus={false} // disable toggle keyboard
                  />
                </OnPressContainer>
              </View>
              <View w={'container'}>
                <OnPressContainer onPress={() => showAndoirdDatepickerTo()}>
                  <StyledTextField
                    caretHidden
                    label={'To Date'}
                    placeholder={'Select Valid Date'}
                    value={filterState.valid_till}
                    showSoftInputOnFocus={false} // disable toggle keyboard
                  />
                </OnPressContainer>
              </View>
            </VStack>
          )}
          {/* for IOS */}
          {Platform.OS === 'ios' && (
            <React.Fragment>
              <HStack
                justifyContent={'center'}
                mt={2}
              >
                <View w={'container'}>
                  <FormControl>
                    <HStack space={2}>
                      <Checkbox
                        aria-label='dateState'
                        onChange={setCheckState}
                      />
                      <FormControl.Label>From Date</FormControl.Label>
                    </HStack>
                  </FormControl>
                  <View alignItems={'start'}>
                    <HStack>
                      <RNDateTimePicker
                        display='inline'
                        disabled={!checkState}
                        is24Hour={true}
                        mode='date'
                        value={dateIOS}
                        onChange={onChangeIOSfrom}
                      />
                    </HStack>
                  </View>
                </View>
              </HStack>
              <HStack justifyContent={'center'}>
                <View w={'container'}>
                  <FormControl justifyContent={'center'}>
                    <FormControl.Label mx={7}>To Date</FormControl.Label>
                  </FormControl>
                  <View
                    mx={12}
                    alignItems={'start'}
                  >
                    <RNDateTimePicker
                      display='inline'
                      disabled={!checkState}
                      is24Hour={true}
                      mode='date'
                      value={dateIOSNextMonth}
                      onChange={onChangeIOSto}
                    />
                  </View>
                </View>
              </HStack>
            </React.Fragment>
          )}
        </ScrollView>

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
              navigation.replace(RouteName, { filterData: initialsFilterState, toggleFilter: true });
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
