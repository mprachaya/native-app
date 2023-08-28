import {
  Button,
  Center,
  ChevronLeftIcon,
  CloseIcon,
  DeleteIcon,
  Divider,
  FlatList,
  FormControl,
  HStack,
  Input,
  Modal,
  Pressable,
  Text,
  VStack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Alert, Linking, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import axios from 'axios';
import { config } from '../config';
import useUpdate from '../hooks/useUpdate';

function QRScannerAutofill({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [itemCode, setItemCode] = useState('');
  // const [items, setItems] = useState([]);
  // const [itemsLength, setItemLength] = useState(0);
  const [qrCodeData, setQrCodeData] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [state, setState] = useState({
    name: 'SAL-QTN-2023-00002',
    quotation_to: 'Customer',
    doctype: 'Quotation',
    customer: 'บริษัท สยามไทยคัทติ่งทูล กำจัด',
  });

  const [stateWithAmount, setStateWithAmount] = useState(null);

  const urlGetItemsQuotation =
    'https://tonen.vsiam.com/api/method/frappe.quotation.oneitem?quotation_name=SAL-QTN-2023-00002';

  const urlPutItems = 'https://tonen.vsiam.com/api/resource/Quotation/SAL-QTN-2023-00002';

  const handleSubmit = () => {
    // prepare object delete amount of items
    const cloneState = { ...state };
    Object.values(cloneState.items)?.map((element) => {
      delete element.amount;
    });
    if (cloneState.items.length === 0 && state.items.length === 0) {
      alert('At least one Item must be selected.');
      // () => navigation.replace('TestQRScanner');
    } else {
      useUpdate(
        {
          headers: {
            Authorization: config.API_TOKEN,
          },
        },
        urlPutItems,
        cloneState,
        () => navigation.replace('TestQRScanner'),
        () => void 0
      );
    }
  };

  const AskCameraPermission = () =>
    Alert.alert('Ask for Permission', '"ERP Next" Would Like to Access the Camera', [
      {
        text: `Don't Allow`,
        onPress: () => {
          setShowAlert(false);
          setScanned(false);
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          Linking.openSettings();
          setShowAlert(false);
        },
      },
    ]);
  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status !== 'granted') {
      setShowAlert(true);
    } else {
      setHasPermission(true);
    }
  };
  const handleBarCodeScanned = ({ type, data }) => {
    axios
      .get(
        `https://tonen.vsiam.com/api/resource/Item?fields=["*"]&filters=[["Item Barcode","barcode","=","${data}"]]`,
        {
          headers: {
            Authorization: config.API_TOKEN,
          },
        }
      )
      .then((response) => response.data)
      .then((res) => {
        if (res.data.length > 0) {
          // res.data && alert(`Item exist!:`);
          if (state.items !== undefined) {
            const duplicated = state.items.find((item) => item.item_code === res.data[0].item_code);
            if (duplicated === undefined) {
              setState((pre) => ({
                ...pre,
                items: [...state.items, { item_code: res.data[0].item_code, qty: 1, rate: 0 }],
              }));
              setQrCodeData(res.data[0].item_code);
              // setItemCode(res.data[0].item_code);
            } else {
              alert(`Item is duplicated!`);
            }
          } else {
            setState((pre) => ({
              ...pre,
              items: [{ item_code: res.data[0].item_code, qty: 1, rate: 0 }],
            }));
            setQrCodeData(res.data[0].item_code);
            // setItemCode(res.data[0].item_code);
          }
        } else {
          alert(`Item not exist!`);
          setQrCodeData('');
        }
      })
      .catch((err) => {
        console.log(err);
        alert(`Item not exist!`);
        setQrCodeData('');
      });

    setScanned(false);
  };
  useEffect(() => {
    getBarCodeScannerPermissions();
    axios
      .get(urlGetItemsQuotation, {
        headers: {
          Authorization: config.API_TOKEN,
        },
      })
      .then((response) => {
        // console.log(response.data.message.data);
        // setItems(response.data.message.data);
        setState((pre) => ({ ...pre, items: response.data.message.data }));
        // setItemLength(response.data.message.data.length);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    // console.log(hasPermission);
    if (!hasPermission && scanned) {
      getBarCodeScannerPermissions();
    }
    // console.log(permission !== null && permission.granted);
  }, [scanned]);

  useEffect(() => {
    console.log(state);
    if (state.items !== undefined) {
      const updateState = Object.values(state.items).map((data, index) => {
        const temp = [...state.items];
        temp[index].amount = (parseFloat(temp[index].qty) * parseFloat(temp[index].rate)).toFixed(2);
        return temp;
      });
      // console.log('Add Amount', ...updateState);
      setStateWithAmount(...updateState);

      // Object.values(state.items)?.map((element) => {
      //   delete element.amount;
      // });
    } else {
      setStateWithAmount(state);
    }
  }, [state]);

  // input
  const StyledTextField = (props) => {
    return (
      <VStack>
        <FormControl isInvalid={props.isRequired || false}>
          <FormControl.Label>{props.label}</FormControl.Label>
          <Input
            {...props}
            value={props.value || ''}
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
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>Required</FormControl.ErrorMessage>
        </FormControl>
      </VStack>
    );
  };
  const OnPressContainer = ({ children, onPress }) => (
    <Pressable
      my={1}
      px={2}
      rounded={12}
      _pressed={{ bg: 'blueGray.200', opacity: 0.8 }}
      onPress={() => onPress()}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Button
        m={0}
        p={0}
        minH={6}
        minW={6}
        variant={'unstyled'}
        pointerEvents='none'
        justifyContent={'center'}
        alignItems={'center'}
      >
        {children}
      </Button>
    </Pressable>
  );

  return (
    <View
      bg={'blueGray.200'}
      h={800}
    >
      <VStack
        m={12}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {scanned && hasPermission && (
          <Modal
            isOpen={scanned}
            // w={useWindowDimensions.width}
            avoidKeyboard
            justifyContent='flex-end'
          >
            <BarCodeScanner
              onBarCodeScanned={!scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            <Button
              pr={4}
              rounded={20}
              position={'absolute'}
              bottom={20}
              bg={COLORS.primary}
              leftIcon={<ChevronLeftIcon />}
              onPress={() => setScanned(false)}
            >
              Back to Page
            </Button>
          </Modal>
        )}
        {showAlert && <AskCameraPermission />}

        <HStack
          w={width}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <OnPressContainer onPress={() => navigation.replace('LoginERPNext')}>
            <HStack
              space={2}
              ml={6}
            >
              <ChevronLeftIcon color={'blue.500'} />
              <Text color={'blue.500'}>Back</Text>
            </HStack>
          </OnPressContainer>
          <Text mr={12}>Quotation SAL-QTN-2023-00002</Text>
        </HStack>
        <HStack
          mx={6}
          space={2}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <OnPressContainer onPress={() => setScanned(true)}>
            <StyledTextField
              caretHidden
              value={qrCodeData}
              label={'Read data from QR Code'}
              showSoftInputOnFocus={false}
              rightElement={
                <View mx={3}>
                  <Icon
                    name='qrcode-scan'
                    size={18}
                    color='gray'
                  />
                </View>
              }
            />
          </OnPressContainer>
          {qrCodeData !== '' ? (
            <View mt={6}>
              <OnPressContainer onPress={() => setQrCodeData('')}>
                <CloseIcon
                  size={5}
                  color={'red.500'}
                />
              </OnPressContainer>
            </View>
          ) : (
            <View mt={6}>
              <OnPressContainer onPress={() => void 0}>
                <CloseIcon
                  size={5}
                  color={'blueGray.200'}
                />
              </OnPressContainer>
            </View>
          )}
        </HStack>
      </VStack>
      <Center>
        <Text
          color={COLORS.primary}
          fontSize={'lg'}
          fontWeight={'bold'}
          letterSpacing={0.5}
        >
          Quotation Items
        </Text>
        {stateWithAmount !== null && (
          <FlatList
            h={400}
            data={stateWithAmount}
            renderItem={({ item, index }) =>
              item !== undefined && (
                <VStack
                  bg={COLORS.white}
                  rounded={20}
                  space={2}
                  w={{ base: width - 60, lg: 600 }}
                  m={2}
                  px={4}
                >
                  <HStack
                    space={2}
                    alignContent={'center'}
                    justifyContent={'space-between'}
                  >
                    <HStack
                      my={4}
                      mx={2}
                    >
                      <Text
                        color={COLORS.primary}
                        fontSize={'xs'}
                        fontWeight={'bold'}
                      >
                        {index + 1 + '. '}
                      </Text>
                      <Text
                        color={COLORS.primary}
                        fontSize={'xs'}
                        fontWeight={'medium'}
                      >
                        {item?.item_code}
                      </Text>
                    </HStack>

                    {/* <Divider mt={2} /> */}
                    <OnPressContainer
                      bg={'blueGray.500'}
                      onPress={() => {
                        if (stateWithAmount !== undefined) {
                          const cloneState = Object.values(stateWithAmount).find(
                            (ele) => ele.item_code !== item.item_code
                          );

                          if (cloneState !== undefined) {
                            setStateWithAmount([cloneState]);
                            setState((pre) => ({ ...pre, items: Array(cloneState) }));
                          } else {
                            setStateWithAmount([]);
                            setState((pre) => ({ ...pre, items: [] }));
                          }
                          // console.log('find', [cloneState]);
                          // console.log('state', stateWithAmount);
                        }
                      }}
                    >
                      <HStack
                        rounded={6}
                        space={0.5}
                      >
                        <Text
                          color={'error.400'}
                          fontWeight={'bold'}
                        >
                          {'  Delete'}
                        </Text>
                        <DeleteIcon color={'error.400'} />
                      </HStack>
                    </OnPressContainer>
                  </HStack>
                  <Divider
                    mt={-3}
                    h={0.3}
                  />
                  <VStack
                    ml={2}
                    space={2}
                  >
                    <HStack
                      space={2}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      <Text fontSize={'xs'}>Quantity :</Text>
                      <Input
                        h={8}
                        p={2.5}
                        minW={12}
                        fontSize={'2xs'}
                        textAlign={'right'}
                        color={'gray.400'}
                        bg={COLORS.lightWhite}
                        variant={'filled'}
                        keyboardType='numeric'
                        value={String(item?.qty)}
                        onBlur={() => {
                          if (item?.qty === '' || item?.qty === undefined) {
                            const updatedItems = state.items;
                            updatedItems[index].qty = '1';
                            setState((pre) => ({
                              ...pre,
                              items: updatedItems,
                            }));
                          }
                        }}
                        onChangeText={(value) => {
                          const updatedItems = state.items;
                          updatedItems[index].qty = value;
                          setState((pre) => ({
                            ...pre,
                            items: updatedItems,
                          }));
                        }}
                      />
                    </HStack>
                    <HStack
                      space={2}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      <Text fontSize={'xs'}>Rate :</Text>
                      <Input
                        h={8}
                        p={2.5}
                        minW={12}
                        fontSize={'2xs'}
                        textAlign={'right'}
                        color={'gray.400'}
                        bg={COLORS.lightWhite}
                        variant={'filled'}
                        keyboardType='numeric'
                        value={String(item?.rate) === '0' ? '0.0' : String(item?.rate)}
                        onBlur={() => {
                          if (item?.rate === '' || item?.rate === '0') {
                            const updatedItems = state.items;
                            updatedItems[index].rate = 0.0;
                            setState((pre) => ({
                              ...pre,
                              items: updatedItems,
                            }));
                          } else {
                            const updatedItems = state.items;
                            updatedItems[index].rate = parseFloat(updatedItems[index].rate);
                            setState((pre) => ({
                              ...pre,
                              items: updatedItems,
                            }));
                          }
                        }}
                        onChangeText={(value) => {
                          const updatedItems = state.items;
                          updatedItems[index].rate = value;
                          setState((pre) => ({
                            ...pre,
                            items: updatedItems,
                          }));
                        }}
                      />
                    </HStack>
                    <FormControl>
                      <View
                        alignItems={'flex-end'}
                        mr={1}
                      >
                        <FormControl.Label _text={{ fontSize: 'xs', fontWeight: 'medium', color: COLORS.primary }}>
                          Total Amount
                        </FormControl.Label>
                      </View>
                      <Input
                        h={8}
                        p={2.5}
                        minW={12}
                        isDisabled
                        fontSize={'2xs'}
                        textAlign={'right'}
                        bg={COLORS.lightWhite}
                        variant={'filled'}
                        keyboardType='numeric'
                        value={item?.amount}
                      />
                    </FormControl>
                  </VStack>
                  {index === state.items.length - 1 && (
                    <Divider
                      opacity={0.4}
                      shadow={1}
                      mt={2}
                    />
                  )}
                </VStack>
              )
            }
            keyExtractor={(item) => item?.item_code}
          />
        )}
        <Button onPress={handleSubmit}>Save Quotation Items</Button>
      </Center>
    </View>
  );
}

export default QRScannerAutofill;
