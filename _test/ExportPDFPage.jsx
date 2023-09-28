import { Button, CheckIcon, HStack, Select, Spinner, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../constants/theme';
import { LoadingFullScreen } from '../components';
import PdfReader from 'rn-pdf-reader-js';
import GetScreenSize from '../hooks/GetScreenSize';
import useConfig from '../config/path';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import axios from 'axios';

function ExportPDFPage({ navigation, route }) {
  // const [docType, setDocType] = useState(undefined);
  // const [name, setName] = useState(undefined);

  const [pdfDataUri, setPdfDataUri] = useState('');
  const { baseURL, DOCTYPE_EXPORT, PRINT_FORMAT_DOCTYPE } = useConfig(true);
  const [loading, setLoading] = useState(false);
  const [formatList, setFormatList] = useState(null);
  const [format, setFormat] = useState(null);

  async function printDoctype() {
    if (route.params?.DOCTYPE && route.params?.NAME)
      if (format) {
        try {
          // console.log(route.params?.NAME);
          // Construct the URL for the print request
          const apiUrl = `${baseURL + DOCTYPE_EXPORT}?doctype=${route.params?.DOCTYPE}&name=${
            route.params?.NAME
          }&format=${format}`;
          // console.log(apiUrl);
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
          const apiUrl = `${baseURL + DOCTYPE_EXPORT}?doctype=${route.params?.DOCTYPE}&name=${route.params?.NAME}`;
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
    if (route.params?.DOCTYPE) {
      const formatURI = `${baseURL + PRINT_FORMAT_DOCTYPE}?filters=[["doc_type","=","${route.params?.DOCTYPE}"]]`;
      axios
        .get(formatURI)
        .then((response) => {
          setFormatList(response.data.data);
          setFormat(response.data.data[0].name);
        })

        .catch((err) => {
          alert(err);
        });
    }
  }

  const downloadPDF = async () => {
    if (format && baseURL) {
      const DOCTYPE = encodeURIComponent(route.params?.DOCTYPE);
      const NAME = encodeURIComponent(route.params?.NAME);
      const FORMAT = encodeURIComponent(format);

      const fileName = FileSystem.documentDirectory + 'print-' + '-' + route.params?.NAME + '.pdf';
      const path = `${baseURL}/api/method/frappe.utils.print_format.download_pdf?doctype=${DOCTYPE}&name=${NAME}&format=${FORMAT}`;
      // console.log(path);
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
    <View flex={1}>
      {pdfDataUri !== '' ? (
        <View
          width={{ base: 'full', lg: 1200 }}
          height={{ base: 700, lg: 1000 }}
        >
          <PdfReader
            source={{ base64: pdfDataUri }} // Use the base64 property
            onError={(error) => {}}
          />
          <HStack my={6}>
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
                    onPress={() => navigation.pop()}
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
                      {formatList !== null &&
                        Object.values(formatList)?.map((format) => (
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
          </HStack>
        </View>
      ) : (
        <LoadingFullScreen loading={loading} />
      )}
    </View>
  );
}

export default ExportPDFPage;
