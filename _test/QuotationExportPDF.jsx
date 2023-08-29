import { Button, HStack, Spinner, View } from 'native-base';
import React, { useEffect, useState } from 'react';
// import Pdf from 'rn-pdf-reader-js';
import useConfig from '../config/path';
import PdfReader from 'rn-pdf-reader-js';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import axios from 'axios';

function QuotationExportPDF() {
  const [pdfDataUri, setPdfDataUri] = useState('');
  const { baseURL } = useConfig(true);
  const docType = 'Quotation';
  const name = 'SAL-QTN-2023-00001';
  const format = 'test-qt';

  async function printQuotation() {
    try {
      // Construct the URL for the print request
      const apiUrl = `${baseURL}/api/method/frappe.utils.print_format.download_pdf?doctype=${docType}&name=${name}&format=${format}`;

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
  async function downloadAndSharePdf() {
    const apiUrl = `${baseURL}/api/method/frappe.utils.print_format.download_pdf?doctype=${docType}&name=${name}&format=${format}`;

    try {
      const response = await axios.get(apiUrl, {
        responseType: 'blob', // Specify that the response should be treated as a binary blob.
      });

      if (response.status === 200) {
        const pdfBlob = response.data;
        const pdfUri = `${FileSystem.cacheDirectory}${name}.pdf`;

        await FileSystem.writeAsStringAsync(pdfUri, pdfBlob, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Share the downloaded PDF using Expo Sharing
        const shared = await Sharing.shareAsync(pdfUri);
        if (shared.action === Sharing.sharedAction) {
          // PDF shared successfully
        } else {
          // Handle sharing error or cancellation
        }
      } else {
        // Handle download error
        console.error('Download failed with status:', response.status);
      }
    } catch (error) {
      // Handle other errors
      console.error('An error occurred:', error);
    }
  }
  useEffect(() => {
    if (baseURL) printQuotation();
  }, [baseURL]);

  return (
    <View
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {/* <View width={600}> */}
      {pdfDataUri !== '' ? (
        <View
          width={{ base: 'full', lg: 1200 }}
          height={800}
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
            >
              Back
            </Button>
            <Button
              w='60%'
              onPress={downloadAndSharePdf}
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
    </View>
  );
}

export default QuotationExportPDF;
