import { NativeBaseProvider } from 'native-base';
import Store from './reducer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/HomePage';
import AppBar from './components/AppBar2';
import TabMenu from './components/TabMenu';
import SellingPage from './src/HomePage/SellingPage';
import CustomerPage from './src/HomePage/SellingPage/CustomerPage';
import NavHeader from './components/NavHeader';
import { Platform } from 'react-native';
import React, { useState } from 'react';
import SortAndroid from './src/HomePage/SellingPage/CustomerPage/SortAndroid';
import { LogBox } from 'react-native';
import CustomerDetails from './src/HomePage/SellingPage/CustomerPage/CustomerDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  const initialState = { add: false, sort: false, filter: false };

  const [openState, setOpenState] = useState({
    add: false,
    sort: false,
    filter: false,
  });
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
                options={{
                  header: () => (
                    <NavHeader
                      pageName={'Customer'}
                      pageBackName={'Selling'}
                      noHeader={true}
                    />
                  ),
                }}
              >
                {() => (
                  <CustomerPage
                    openState={openState}
                    setOpenState={setOpenState}
                  />
                )}
              </Stack.Screen>
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
            </Stack.Group>
          </Stack.Navigator>
          <TabMenu setInitialOpenState={() => setOpenState(initialState)} />
        </Store>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
