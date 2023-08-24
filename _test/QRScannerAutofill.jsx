import {
  Button,
  ChevronLeftIcon,
  CloseIcon,
  FormControl,
  HStack,
  Input,
  Modal,
  Pressable,
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

function QRScannerAutofill({ navigation }) {
  // const { height, width } = useWindowDimensions();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const initialState = {
    item_code: '',

    stock_uom: '',
  };
  const [qrCodeData, setQrCodeData] = useState({
    item_code: '',
  });
  const [showAlert, setShowAlert] = useState(false);

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

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    // console.log(hasPermission);
    if (!hasPermission && scanned) {
      getBarCodeScannerPermissions();
    }
    // console.log(permission !== null && permission.granted);
  }, [scanned]);

  const handleBarCodeScanned = ({ type, data }) => {
    axios
      .get(
        `https://tonen.vsiam.com/api/resource/Item?fields=["*"]&filters=[["Item Barcode","barcode", "=", ${data}]]`,
        {
          headers: {
            Authorization: config.API_TOKEN,
          },
        }
      )
      .then((response) => response.data)
      .then((res) => {
        res.data && alert(`Item exist!:`);
        console.log(res.data);
        setQrCodeData(String(data));
      })
      .catch((err) => {
        console.log(err);
        alert(`Item not exist!`);
        setQrCodeData('');
      });

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanned(false);
  };

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
            value={qrCodeData}
            label={'Read data from QR Code'}
            // name={'default_currency'}
            showSoftInputOnFocus={false}
          />
        </HStack>
      </VStack>
    </View>
  );
}

export default QRScannerAutofill;
