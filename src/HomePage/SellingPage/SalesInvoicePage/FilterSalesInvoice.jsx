import {
  Button,
  Center,
  CheckIcon,
  Checkbox,
  CloseIcon,
  FormControl,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Select,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { useState, useMemo, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Platform } from 'react-native';
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

function FilterSalesInvoice({ route, navigation }) {
  // const { baseURL, quotation_toS, TERRITORY } = useConfig(true);
  const { storeFilter } = route.params; // get State from storeFilter
  const { baseURL, CUSTOMERS } = useConfig(true);

  const initialsFilterState = {
    status: '',
    customer: '',
    from_date: '',
    to_date: '',
  };

  const RouteName = 'SalesInvoice';

  const [filterState, setFilterState] = useState(initialsFilterState);

  // date now for ios
  const [dateIOS, setDateIOS] = useState(new Date());
  const [dateIOSNextMonth, setDateIOSNextMonth] = useState(new Date());
  const [checkedFromDateState, setCheckedFromDateState] = useState(false);
  const [checkedToDateState, setCheckedToDateState] = useState(false);

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
      // setFilterState((pre) => ({ ...pre, from_date: formattedToday }));
    } else {
      setFilterState((pre) => ({ ...pre, from_date: formattedToday }));
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
      // setFilterState((pre) => ({ ...pre, to_date: formattedToday }));
    } else {
      setFilterState((pre) => ({ ...pre, to_date: formattedToday }));
    }
  };

  // set Default value of to Date Object (+ 1 month)
  useMemo(() => {
    const plusMonth = new Date();
    plusMonth.setMonth(plusMonth.getMonth() + 1);
    // setAndroidNextMount(() => plusMonth);
    setDateIOSNextMonth(() => plusMonth);

    // const dateNow = new Date();
    // dateNow.setMonth(dateNow.getMonth());
    // setDateIOS(dateNow);
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
      setFilterState((pre) => ({ ...pre, to_date: formattedToday }));
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
      setFilterState((pre) => ({ ...pre, from_date: formattedToday }));
    }
  }, [checkedFromDateState]);

  useMemo(() => {
    // if filtered set state with storeFilter
    if (storeFilter !== undefined) {
      setFilterState(storeFilter);
      // set Filter Date from storeFilter
      if (storeFilter.from_date && storeFilter.to_date) {
        setCheckedFromDateState(true);
        setCheckedToDateState(true);
      }
      // set Filter Date from storeFilter
    }
  }, [storeFilter]);

  useEffect(() => {
    console.log(filterState);
  }, [filterState]);

  const handleSetFilter = () => {
    // select from date but not select to date
    if (filterState.from_date && !filterState.to_date) {
      alert('Please select to date!');
    }
    // select from to but not select to from
    else if (!filterState.from_date && filterState.to_date) {
      alert('Please select from date!');
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
                  label='Paid'
                  value='Paid'
                />
                <Select.Item
                  label='Unpaid'
                  value='Unpaid'
                />
                <Select.Item
                  label='Overdue'
                  value='Overdue'
                />
                <Select.Item
                  label='Cancelled'
                  value='Cancelled'
                />
                <Select.Item
                  label='Return'
                  value='Return'
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

            <React.Fragment>
              <HStack
                mt={6}
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
                        onChange={(e, value) => onChangeIOSfrom(e, value)}
                      />
                    </Button>
                    {checkedFromDateState && (
                      <Button
                        variant={'unstyled'}
                        onPress={() => {
                          setFilterState((pre) => ({ ...pre, from_date: '' }));
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
                        onChange={(e, value) => onChangeIOSto(e, value)}
                      />
                    </Button>
                    {checkedToDateState && (
                      <Button
                        variant={'unstyled'}
                        onPress={() => {
                          setFilterState((pre) => ({ ...pre, to_date: '' }));
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

export default FilterSalesInvoice;
