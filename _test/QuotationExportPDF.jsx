import { Button, Center, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

function QuotationExportPDF() {
  const [pdfUri, setPdfUri] = useState(null);

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
          Authorization: 'Bearer 5891d01ccc2961e:0e446b332dc22aa',
        },
      });

      // Handle the response here
      if (response.ok) {
        const pdfBlob = await response.blob();

        // Convert the response blob to a Base64 data URL
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = () => {
          const pdfDataUrl = reader.result;
          setPdfUri(pdfDataUrl);
          console.log(pdfDataUrl);
        };
      } else {
        // Handle errors if the request was not successful
        console.error('Error printing quotation:', response.status);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Network error:', error);
    }
  }
  useEffect(() => {
    printQuotation();
  }, []);

  // const docType = 'Quotation';
  // const name = 'SAL-QTN-2023-00001';
  // const format = 'test-qt';
  // const key = '5891d01ccc2961e:0e446b332dc22aa';
  // const pdfUrl = `https://tonen.vsiam.com/api/method/frappe.utils.print_format.download_pdf?doctype=${docType}&name=${name}&format=${format}&key=${key}`;

  // const [showPdf, setShowPdf] = useState(false);

  // const handleDownloadPDF = () => {
  //   setShowPdf(true);
  // };

  return (
    <View flex={1}>
      {/* <Center mt={24}>
        <Text>Quotation Export PDF</Text>
        <View
          mt={6}
          w={'full'}
          h={'full'}
        >
          {showPdf ? (
            <WebView
              source={{ uri: pdfUrl }}
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              onError={(error) => console.error('WebView Errror:', error)}
              onLoad={() => console.log('WebView Loaded')}
            />
          ) : (
            <Button
              mx={6}
              onPress={handleDownloadPDF}
            >
              Download PDF
            </Button>
          )}
        </View>
      </Center> */}
      <Pdf source={pdfUri} />
    </View>
  );
}

export default QuotationExportPDF;
