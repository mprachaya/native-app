import {
  Button,
  Center,
  ChevronLeftIcon,
  CloseIcon,
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
import { Alert, Linking, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import axios from 'axios';
import { config } from '../config';

function QRScannerAutofill() {
  // const { height, width } = useWindowDimensions();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [itemCode, setItemCode] = useState('');
  const [items, setItems] = useState([]);
  const [itemsLength, setItemLength] = useState(0);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [state, setState] = useState({
    name: 'SAL-QTN-2023-00002',
    quotation_to: 'Customer',
    doctype: 'Quotation',
    customer: 'บริษัท สยามไทยคัทติ่งทูล กำจัด',
  });

  const urlGetItemsQuotation =
    'https://tonen.vsiam.com/api/method/frappe.quotation.oneitem?quotation_name=SAL-QTN-2023-00002';

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
          res.data && alert(`Item exist!:`);

          // console.log(res.data[0].item_code);
          const duplicated = state.items.find((item) => item.item_code === res.data[0].item_code);
          if (duplicated === undefined) {
            setState((pre) => ({
              ...pre,
              items: [...state.items, { item_code: res.data[0].item_code, qty: 1, rate: 0 }],
            }));
            setItemCode(res.data[0].item_code);
          } else {
            alert(`Item is duplicated!`);
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

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        setItems(response.data.message.data);
        setState((pre) => ({ ...pre, items: response.data.message.data }));
        setItemLength(response.data.message.data.length);
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
    // console.log(state);
    // console.log(state.items);
    if (state.items !== undefined) {
      // get last item before scanning
      const testGetLastItemBf = state.items.filter((item, index) => index === itemsLength - 1);
      // get last item after scanning
      const testGetLastItemAft = state.items.filter((item, index) => index === itemsLength);
      console.log('Last item before', testGetLastItemBf);
      console.log('Last item after', testGetLastItemAft);
    }
  }, [state]);

  // https://tonen.vsiam.com/api/method/frappe.quotation.oneitem?quotation_name=SAL-QTN-2023-00001

  // useEffect(() => {
  //   console.log(hasPermission);
  // }, [hasPermission]);

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
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
    <Pressable onPress={() => onPress()}>
      <View pointerEvents='none'>{children}</View>
    </Pressable>
  );

  return (
    <View bg={'blueGray.200'}>
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
          m={6}
          space={2}
        >
          <OnPressContainer onPress={() => setScanned(true)}>
            <StyledTextField
              caretHidden
              value={qrCodeData}
              label={'Read data from QR Code'}
              // name={'default_currency'}
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
            <OnPressContainer onPress={() => setQrCodeData('')}>
              <View
                mx={1}
                my={10}
              >
                <CloseIcon color={'red.500'} />
              </View>
            </OnPressContainer>
          ) : (
            <View
              mx={1}
              my={10}
            >
              <CloseIcon color={'blueGray.200'} />
            </View>
          )}
        </HStack>
        <HStack>
          <StyledTextField
            caretHidden
            value={itemCode}
            label={'Read data from QR Code'}
            // name={'default_currency'}
            showSoftInputOnFocus={false}
          />
          <View
            mx={1}
            my={10}
          >
            <CloseIcon color={'blueGray.200'} />
          </View>
        </HStack>
        <HStack>
          <StyledTextField
            caretHidden
            // value={state.items?.item_code[0] !== undefined ? state.items[itemsLength].item_code : ''}
            // name={'default_currency'}
            showSoftInputOnFocus={false}
          />
          <View
            mx={1}
            my={10}
          >
            <CloseIcon color={'blueGray.200'} />
          </View>
        </HStack>
        <Button>Insert Item</Button>
      </VStack>
      <Center>
        <Text>Quotation SAL-QTN-2023-00002 </Text>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <HStack
              space={2}
              w={300}
              justifyContent={'space-between'}
            >
              <Text>{item.item_code}</Text>
              <HStack space={2}>
                <Text>Quantity {item.qty}</Text>
                <Text>Rate {item.rate}</Text>
              </HStack>
            </HStack>
          )}
          keyExtractor={(item) => item.item_code}
        />
      </Center>
    </View>
  );
}

export default QRScannerAutofill;
