import { NativeBaseProvider } from 'native-base';
import Store from './reducer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/HomePage';
import AppBar from './components/AppBar2';
import SellingPage from './src/HomePage/SellingPage';
import CustomerPage from './src/HomePage/SellingPage/CustomerPage';
import NavHeader from './components/NavHeader';
import { Platform } from 'react-native';
import React, { useState } from 'react';
import SortAndroid from './src/HomePage/SellingPage/CustomerPage/SortAndroid';
import { LogBox } from 'react-native';
import CustomerDetails from './src/HomePage/SellingPage/CustomerPage/CustomerDetails';
import UpdateCustomer from './src/HomePage/SellingPage/CustomerPage/UpdateCustomer';
import AddNewCustomer from './src/HomePage/SellingPage/CustomerPage/AddNewCustomer';
import FilterCustomer from './src/HomePage/SellingPage/CustomerPage/FilterCustomer';
import QRScannerAutofill from './_test/QRScannerAutofill';
import LoginFrappeURL from './_test/LoginFrappeURL';
import QuotationExportPDF from './_test/QuotationExportPDF';

const Stack = createNativeStackNavigator();

export default function App() {
  // ignore pass function to useNavigation params
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
  // ignore SSR Warning
  LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);

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
            <Stack.Screen
              // name='TestQRScanner'
              // component={QRScannerAutofill}
              name='QuotationExportPDF'
              component={QuotationExportPDF}
              options={{
                header: () => '',
              }}
            />
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
                      pageName={'Add New Customer'}
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
          </Stack.Navigator>
        </Store>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
