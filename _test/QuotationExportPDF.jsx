import { Button, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import Pdf from 'rn-pdf-reader-js';

function QuotationExportPDF() {
  const [pdfDataUri, setPdfDataUri] = useState('');

  async function printQuotation() {
    try {
      const docType = 'Quotation';
      const name = 'SAL-QTN-2023-00001';
      const format = 'test-qt';

      // Construct the URL for the print request
      const apiUrl = `https://tonen.vsiam.com/api/method/frappe.utils.print_format.download_pdf?doctype=${docType}&name=${name}&format=${format}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa',
        },
      });

      if (response.ok) {
        const pdfBlob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = () => {
          let pdfBase64 = reader.result;
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
    printQuotation();
  }, []);

  return (
    <View flex={1}>
      {pdfDataUri !== '' && (
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
      )}
    </View>
  );
}

export default QuotationExportPDF;
