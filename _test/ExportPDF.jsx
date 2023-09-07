import { Button, HStack, Modal, Spinner, View } from 'native-base';
import React, { useEffect, useState } from 'react';
// import Pdf from 'rn-pdf-reader-js';
import useConfig from '../config/path';
import PdfReader from 'rn-pdf-reader-js';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

function ExportPDF({ open, handleClose, docType, name, format }) {
  const [pdfDataUri, setPdfDataUri] = useState('');
  const { baseURL, DOCTYPE_EXPORT } = useConfig(true);
  // const docType = 'Quotation';
  // const name = 'SAL-QTN-2023-00001';
  // const format = 'test-qt';

  async function printDoctype() {
    if (docType && name && format)
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
          console.error('Error printing quotation:', response.status);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
  }

  const downloadPDF = async () => {
    const fileName = FileSystem.documentDirectory + 'print-' + '-' + name + '.pdf';
    const downloadRef = await FileSystem.downloadAsync(
      `${baseURL}/api/method/frappe.utils.print_format.download_pdf?doctype=${docType}&name=${name}&format=${format}`,
      fileName
    );
    save(downloadRef.uri);
  };

  const save = (uri) => {
    Sharing.shareAsync(uri);
  };
  useEffect(() => {
    if (baseURL) printDoctype();
  }, [baseURL]);

  return (
    <Modal
      isOpen={open}
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
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
              console.log(`Number of pages: ${numberOfPages}`);
              console.log(`File path: ${filePath}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onError={(error) => {
              console.error('Error:', error);
            }}
          />
          <HStack
            my={6}
            w='full'
            space={6}
            justifyContent={'center'}
            alignContent={'center'}
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
          </HStack>
        </View>
      ) : (
        <View m={'25%'}>
          <Spinner />
        </View>
      )}
      {/* </View> */}
    </Modal>
  );
}

export default ExportPDF;
