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
import NavHeaderRight from './components/NavHeaderRight';
import React, { useState } from 'react';
import OtherTest from './src/HomePage/OtherTest';
import SortAndroid from './src/HomePage/SellingPage/CustomerPage/SortAndroid';

const Stack = createNativeStackNavigator();

export default function App() {
  const [openState, setOpenState] = useState({
    add: false,
    sort: false,
    filter: false,
  });

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {/* stored global state */}
        <Store>
          {/* hidden a status bar IOS/Android */}
          {/* <StatusBar hidden /> */}

          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name='Home'
                component={HomePage}
                options={{
                  header: () => <AppBar />,
                }}
              />

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
                        <NavHeader
                          pageName={'Selling'}
                          // pageBackName={'Modules'}
                        />
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

              {Platform.OS === 'android' && (
                <Stack.Group>
                  <Stack.Screen
                    name='Customer'
                    options={{
                      header: () => (
                        <NavHeader
                          // openAdd={() => setOpenState((pre) => ({ ...pre, add: true }))}
                          // openSort={() => setOpenState((pre) => ({ ...pre, sort: true }))}
                          // openFilter={() => setOpenState((pre) => ({ ...pre, filter: true }))}
                          pageName={'Customer'}
                          pageBackName={'Selling'}
                          noHeader={true}
                          // activeFunction={true}
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
                          // pageBackName={'Modules'}
                        />
                      ),
                    }}
                  />
                </Stack.Group>
              )}
              {Platform.OS === 'ios' && (
                <Stack.Screen
                  name='Customer'
                  options={{
                    title: 'Customer',
                    headerRight: () => (
                      <NavHeaderRight
                        openAdd={() => setOpenState((pre) => ({ ...pre, add: true }))}
                        openSort={() => setOpenState((pre) => ({ ...pre, sort: true }))}
                        openFilter={() => setOpenState((pre) => ({ ...pre, filter: true }))}
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
              )}
            </Stack.Group>
            {/* <Stack.Screen
              name='Purchase Order'
              component={PurchaseOrder}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='Other Test'
              component={OtherTest}
              options={{
                headerShown: false,
              }}
            /> */}
          </Stack.Navigator>
          <TabMenu />
        </Store>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
