import { Center, ScrollView, Text, View } from 'native-base';
import React from 'react';
import WebView from 'react-native-webview';

function QuotationExportPDF() {
  const docType = 'Quotation';
  const name = 'SAL-QTN-2023-00001';
  const format = 'test-qt';
  const key = '5891d01ccc2961e:0e446b332dc22aa';
  const pdfUrl = `https://tonen.vsiam.com/api/method/frappe.utils.print_format.download_pdf?doctype=${docType}&name=${name}&format=${format}&key=${key}`;
  return (
    <View flex={1}>
      <Center m={24}>
        <Text>Quotation Export PDF</Text>
        <View
          mt={12}
          w={'full'}
          h={'full'}
        >
          <WebView
            source={{ uri: pdfUrl }}
            onLoad={() => console.log('PDF loaded')}
          />
        </View>
      </Center>
    </View>
  );
}

export default QuotationExportPDF;
