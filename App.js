import React, { useState } from 'react';
import Store from './reducer';
import { Platform } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// app component
import AppBar from './components/AppBar2';
import NavHeader from './components/NavHeader';
// page
import HomePage from './src/HomePage';

import SellingPage from './src/HomePage/SellingPage';

// customer
import CustomerPage from './src/HomePage/SellingPage/CustomerPage';
import SortAndroid from './src/HomePage/SellingPage/CustomerPage/SortAndroid';
import CustomerDetails from './src/HomePage/SellingPage/CustomerPage/CustomerDetails';
import UpdateCustomer from './src/HomePage/SellingPage/CustomerPage/UpdateCustomer';
import AddNewCustomer from './src/HomePage/SellingPage/CustomerPage/AddNewCustomer';
import FilterCustomer from './src/HomePage/SellingPage/CustomerPage/FilterCustomer';

// quotation
import QuotationPage from './src/HomePage/SellingPage/QuotationPage';
import SortAndroidQuotation from './src/HomePage/SellingPage/QuotationPage/SortAndroid';
import FilterQuotation from './src/HomePage/SellingPage/QuotationPage/FilterQuotation';
import QuotationDetails from './src/HomePage/SellingPage/QuotationPage/QuotationDetails';
import QuotationItemDetails from './src/HomePage/SellingPage/QuotationPage/ItemDetails';
import AddNewQuotation from './src/HomePage/SellingPage/QuotationPage/AddNewQuotation';
import UpdateQuotation from './src/HomePage/SellingPage/QuotationPage/UpdateQuotation';

// sales order
import SalesOrderPage from './src/HomePage/SellingPage/SalesOrderPage';
import AddNewSalesOrder from './src/HomePage/SellingPage/SalesOrderPage/AddNewSalesOrder';
import SalesOrderDetails from './src/HomePage/SellingPage/SalesOrderPage/SalesOrderDetails';
import SalesOrderItemDetails from './src/HomePage/SellingPage/SalesOrderPage/ItemDetails';
import UpdateSalesOrder from './src/HomePage/SellingPage/SalesOrderPage/UpdateSalesOrder';
import FilterSalesOrder from './src/HomePage/SellingPage/SalesOrderPage/FilterSalesOrder';

// sales invoice
import SalesInvoicePage from './src/HomePage/SellingPage/SalesInvoicePage';
import SalesInvoiceDetailPage from './src/HomePage/SellingPage/SalesInvoicePage/SalesInvoiceDetails';
import AddNewSalesInvoice from './src/HomePage/SellingPage/SalesInvoicePage/AddNewSalesInvoice';
import SalesInvoiceItemDetails from './src/HomePage/SellingPage/SalesInvoicePage/ItemDetails';
import UpdateSalesInvoice from './src/HomePage/SellingPage/SalesInvoicePage/UpdateSalesInvoice';
import FilterSalesInvoice from './src/HomePage/SellingPage/SalesInvoicePage/FilterSalesInvoice';

//payment entry
import PaymentEntryPage from './src/HomePage/SellingPage/PaymentEntryPage';
import PaymentEntryDetails from './src/HomePage/SellingPage/PaymentEntryPage/PaymentEntryDetails';
import AddNewPaymentEntry from './src/HomePage/SellingPage/PaymentEntryPage/AddNewPaymentEntry';
import UpdatePaymentEntry from './src/HomePage/SellingPage/PaymentEntryPage/UpdatePaymentEntry';

// etc
import QRScannerAutofill from './_test/QRScannerAutofill';
import LoginFrappeURL from './_test/LoginFrappeURL';
import ExportPDF from './_test/ExportPDF';

// import QuotationExportPDF from './_test/QuotationExportPDF';

const Stack = createNativeStackNavigator();

export default function App() {
  // ignore pass function to useNavigation
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
  // ignore SSR Warning
  LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
  LogBox.ignoreLogs(['Warning: Each', 'Warning: Failed']);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Store>
          <Stack.Navigator>
            <Stack.Screen
              // name='TestQRScanner'
              // component={QRScannerAutofill}
              name='LoginERPNext'
              component={LoginFrappeURL}
              options={{
                header: () => '',
              }}
            />
            {/* <Stack.Screen
              // name='TestQRScanner'
              // component={QRScannerAutofill}
              name='QuotationExportPDF'
              component={QuotationExportPDF}
              options={{
                header: () => '',
              }}
            /> */}
            <Stack.Screen
              name='TestQRScanner'
              component={QRScannerAutofill}
              options={{
                header: () => '',
              }}
            />
            <Stack.Screen
              name='Home'
              component={HomePage}
              options={{
                header: () => <AppBar />,
              }}
            />
            {/* Selling Page */}
            {Platform.OS !== 'ios' ? (
              <Stack.Screen
                name='Selling'
                component={SellingPage}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <React.Fragment>
                      <AppBar />
                      <NavHeader pageName={'Selling'} />
                    </React.Fragment>
                  ),
                }}
              />
            ) : (
              <Stack.Screen
                name='Selling'
                component={SellingPage}
                options={{
                  header: () => (
                    <React.Fragment>
                      <AppBar />
                    </React.Fragment>
                  ),
                }}
              />
            )}
            {/* Customer Page */}
            <Stack.Group>
              <Stack.Screen
                name='Customer'
                component={CustomerPage}
                options={{
                  header: () => (
                    <NavHeader
                      pageName={'Customer'}
                      pageBackName={'Selling'}
                      noHeader={true}
                    />
                  ),
                }}
              />

              <Stack.Screen
                name='SortAndroid'
                component={SortAndroid}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <NavHeader
                      pageName={'Sort'}
                      noHeader={true}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name='CustomerDetails'
                component={CustomerDetails}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <NavHeader
                      pageName={'Customer Details'}
                      noHeader={true}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name='AddNewCustomer'
                component={AddNewCustomer}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <NavHeader
                      // pageName={'Add New Customer'}
                      noHeader={true}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name='UpdateCustomer'
                component={UpdateCustomer}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <NavHeader
                      pageName={'Customer Update'}
                      noHeader={true}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name='FilterCustomer'
                component={FilterCustomer}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <NavHeader
                      pageName={'Filter Customer'}
                      noHeader={true}
                    />
                  ),
                }}
              />
            </Stack.Group>
            {/* Quotation Page */}
            <Stack.Group>
              <Stack.Screen
                name='Quotation'
                component={QuotationPage}
                options={{
                  header: () => (
                    <NavHeader
                      pageName={'Quotation'}
                      pageBackName={'Selling'}
                      noHeader={true}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name='SortAndroidQuotation'
                component={SortAndroidQuotation}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <NavHeader
                      pageName={'Sort'}
                      noHeader={true}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name='FilterQuotation'
                component={FilterQuotation}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <NavHeader
                      pageName={'Filter Quotation'}
                      noHeader={true}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name='AddNewQuotation'
                component={AddNewQuotation}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <NavHeader
                      pageName={'Add New Quotation'}
                      noHeader={true}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name='QuotationDetails'
                component={QuotationDetails}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <NavHeader
                      pageName={'Quotation Details'}
                      noHeader={true}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name='QuotationItemsDetails'
                component={QuotationItemDetails}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <NavHeader
                      pageName={'Item Details'}
                      noHeader={true}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name='UpdateQuotation'
                component={UpdateQuotation}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () => (
                    <NavHeader
                      pageName={'Edit Quotation'}
                      noHeader={true}
                    />
                  ),
                }}
              />
            </Stack.Group>
            <Stack.Screen
              name='ExportPDF'
              component={ExportPDF}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'EXPORT DOCTYPE'}
                    noHeader={true}
                  />
                ),
              }}
            />
            {/* SalesOrder Page */}
            <Stack.Screen
              name='SalesOrder'
              component={SalesOrderPage}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Sales Order'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='AddNewSalesOrder'
              component={AddNewSalesOrder}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Create New Sales Order'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='SalesOrderDetails'
              component={SalesOrderDetails}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Sales Order Details'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='SalesOrderItemDetails'
              component={SalesOrderItemDetails}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Item Details'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='UpdateSalesOrder'
              component={UpdateSalesOrder}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Edit Sales Order'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='FilterSalesOrder'
              component={FilterSalesOrder}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Filter Sales Order'}
                    noHeader={true}
                  />
                ),
              }}
            />
            {/* SalesInvoice Page */}
            <Stack.Screen
              name='SalesInvoice'
              component={SalesInvoicePage}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Sales Invoice'}
                    noHeader={true}
                  />
                ),
              }}
            />
            {/* SalesInvoice Details Page */}
            <Stack.Screen
              name='SalesInvoiceDetails'
              component={SalesInvoiceDetailPage}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Sales Invoice Details'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='AddNewSalesInvoice'
              component={AddNewSalesInvoice}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Create New Sales Invoice'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='SalesInvoiceItemDetails'
              component={SalesInvoiceItemDetails}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Item Details'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='UpdateSalesInvoice'
              component={UpdateSalesInvoice}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Edit Sales Invoice'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='FilterSalesInvoice'
              component={FilterSalesInvoice}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Filter Sales Invoice'}
                    noHeader={true}
                  />
                ),
              }}
            />
            {/* PaymentEntry Page */}
            <Stack.Screen
              name='PaymentEntry'
              component={PaymentEntryPage}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Payment Entry'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='PaymentEntryDetails'
              component={PaymentEntryDetails}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Payment Entry Details'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='AddNewPaymentEntry'
              component={AddNewPaymentEntry}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Create New Payment Entry'}
                    noHeader={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name='UpdatePaymentEntry'
              component={UpdatePaymentEntry}
              options={{
                title: '',
                headerShadowVisible: true,
                header: () => (
                  <NavHeader
                    pageName={'Edit Payment Entry'}
                    noHeader={true}
                  />
                ),
              }}
            />
          </Stack.Navigator>
        </Store>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
