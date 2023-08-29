import { Button, Spinner, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import Pdf from 'rn-pdf-reader-js';
import useConfig from '../config/path';

function QuotationExportPDF() {
  const [pdfDataUri, setPdfDataUri] = useState('');
  const { baseURL } = useConfig(true);

  async function printQuotation() {
    try {
      const docType = 'Quotation';
      const name = 'SAL-QTN-2023-00001';
      const format = 'test-qt';

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
          <Pdf
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
