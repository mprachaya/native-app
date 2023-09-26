import { Button, CheckIcon, FormControl, HStack, Modal, Select, Spinner, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
// import Pdf from 'rn-pdf-reader-js';
import useConfig from '../config/path';
import PdfReader from 'rn-pdf-reader-js';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import GetScreenSize from '../hooks/GetScreenSize';
import { COLORS } from '../constants/theme';
import axios from 'axios';

function ExportPDF({ open, handleClose, docType, name }) {
  const [pdfDataUri, setPdfDataUri] = useState('');
  const { baseURL, DOCTYPE_EXPORT, PRINT_FORMAT_DOCTYPE } = useConfig(true);
  const [loading, setLoading] = useState(false);
  const [formatList, setFormatList] = useState(null);
  const [format, setFormat] = useState(null);

  // const docType = 'Quotation';
  // const name = 'SAL-QTN-2023-00001';
  // const format = 'test-qt';

  async function printDoctype() {
    if (docType && name)
      if (format) {
        try {
          // Construct the URL for the print request
          const apiUrl = `${baseURL + DOCTYPE_EXPORT}?doctype=${docType}&name=${name}&format=${format}`;
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              // Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa',
            },
          });

          if (response.ok) {
            const pdfBlob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(pdfBlob);
            reader.onloadend = () => {
              let pdfBase64 = reader.result.replace('octet-stream', 'pdf');
              setPdfDataUri(pdfBase64);
            };
          } else {
            // console.error('Error printing quotation:', response.status);
          }
        } catch (error) {
          // console.error('Network error:', error);
        }
      } else {
        try {
          // Construct the URL for the print request
          // const apiUrl = `${baseURL + DOCTYPE_EXPORT}?doctype=${docType}&name=${name}&format=${format}`;
          const apiUrl = `${baseURL + DOCTYPE_EXPORT}?doctype=${docType}&name=${name}`;
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              // Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa',
            },
          });

          if (response.ok) {
            const pdfBlob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(pdfBlob);
            reader.onloadend = () => {
              let pdfBase64 = reader.result.replace('octet-stream', 'pdf');
              setPdfDataUri(pdfBase64);
            };
          } else {
            // console.error('Error printing quotation:', response.status);
          }
        } catch (error) {
          // console.error('Network error:', error);
        }
      }
  }
  async function getFormat() {
    if (docType) {
      const formatURI = `${baseURL + PRINT_FORMAT_DOCTYPE}?filters=[["doc_type","=","${docType}"]]`;
      // console.log(formatURI);

      axios
        .get(formatURI)
        .then((response) => {
          setFormatList(response.data.data);
          setFormat(response.data.data[0].name);
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }

  const downloadPDF = async () => {
    if (format && baseURL) {
      const DOCTYPE = encodeURIComponent(docType);
      const NAME = encodeURIComponent(name);
      const FORMAT = encodeURIComponent(format);

      const fileName = FileSystem.documentDirectory + 'print-' + '-' + name + '.pdf';
      const path = `${baseURL}/api/method/frappe.utils.print_format.download_pdf?doctype=${DOCTYPE}&name=${NAME}&format=${FORMAT}`;
      console.log(path);
      const downloadRef = await FileSystem.downloadAsync(path, fileName);
      save(downloadRef.uri);
    }
  };

  const save = (uri) => {
    Sharing.shareAsync(uri);
  };
  useEffect(() => {
    // if (baseURL) printDoctype();
    if (baseURL) {
      setLoading(true);
    }
  }, [baseURL]);

  useEffect(() => {
    if (loading === true) {
      printDoctype();
      getFormat();
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (format) {
      printDoctype();
    }
  }, [format]);

  return (
    <Modal
      isOpen={open}
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      bg={COLORS.white}
    >
      {/* <View width={600}> */}
      {pdfDataUri !== '' ? (
        <View
          width={{ base: 'full', lg: 1200 }}
          height={{ base: 700, lg: 1000 }}
        >
          <PdfReader
            source={{ base64: pdfDataUri }} // Use the base64 property
            onLoadComplete={(numberOfPages, filePath) => {
              // console.log(`Number of pages: ${numberOfPages}`);
              // console.log(`File path: ${filePath}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              // console.log(`Current page: ${page}`);
              // console.log(`Number of pages: ${numberOfPages}`);
            }}
            onError={(error) => {
              // console.error('Error:', error);
            }}
          />
          <HStack
            my={6}

            // justifyContent={'center'}
            // alignContent={'center'}
          >
            <GetScreenSize
              from={'sm'}
              to={'md'}
            >
              <VStack
                w={'full'}
                alignItems={'center'}
                justifyContent={'center'}
                space={1}
              >
                <Button
                  w={'92%'}
                  onPress={downloadPDF}
                >
                  Download
                </Button>
                <HStack
                  space={1}
                  w={'full'}
                  justifyContent={'center'}
                >
                  <Button
                    w={'45%'}
                    variant={'outline'}
                    onPress={handleClose}
                  >
                    Back
                  </Button>
                  <View w={'45%'}>
                    <Select
                      selectedValue={format}
                      // _text={{ color: 'amber.100' }}
                      textAlign={'center'}
                      dropdownIcon={true}
                      fontSize={'md'}
                      borderWidth={0}
                      _ios={{ borderWidth: 4, borderColor: COLORS.gray2 }}
                      bgColor={COLORS.gray2}
                      accessibilityLabel='Print Format'
                      placeholder='Format'
                      _selectedItem={{
                        bg: 'blueGray.200',
                        endIcon: <CheckIcon color={'blueGray.400'} />,
                      }}
                      onValueChange={(itemValue) => {
                        setFormat(itemValue);
                      }}
                    >
                      {Object.values(formatList)?.map((format) => (
                        <Select.Item
                          key={format.name}
                          label={'Format :' + format.name}
                          value={format.name}
                        />
                      ))}
                    </Select>
                  </View>
                </HStack>
              </VStack>
            </GetScreenSize>
            <GetScreenSize
              from={'md'}
              to={'lg'}
            >
              <HStack
                space={1}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Button
                  w='20%'
                  bg='blueGray.700'
                  onPress={handleClose}
                >
                  Back
                </Button>

                <Button
                  w='60%'
                  onPress={downloadPDF}
                >
                  Download
                </Button>
                <View w={'20%'}>
                  <Select
                    selectedValue={format}
                    textAlign={'center'}
                    dropdownIcon={true}
                    fontSize={'md'}
                    borderWidth={4}
                    borderColor={COLORS.gray2}
                    bgColor={COLORS.gray2}
                    accessibilityLabel='Print Format'
                    placeholder='Format'
                    _selectedItem={{
                      bg: 'blueGray.200',
                      endIcon: <CheckIcon color={'blueGray.400'} />,
                    }}
                    onValueChange={(itemValue) => {
                      setFormat(itemValue);
                    }}
                  >
                    {Object.values(formatList)?.map((format) => (
                      <Select.Item
                        key={format.name}
                        label={'Format : ' + format.name}
                        value={format.name}
                      />
                    ))}
                  </Select>
                </View>
              </HStack>
            </GetScreenSize>
          </HStack>
        </View>
      ) : (
        <View
          m={'40'}
          w={'full'}
          h={1200}
        >
          <Spinner />
        </View>
      )}
      {/* </View> */}
    </Modal>
  );
}

export default ExportPDF;
