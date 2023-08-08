import { Box, Button, HStack, NativeBaseProvider, StatusBar, Text, View } from 'native-base';
import Store from './reducer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/HomePage';
import PurchaseOrder from './src/HomePage/PurchaseOrder';
import OtherTest from './src/HomePage/OtherTest';
import AppBar from './components/AppBar2';
import TabMenu from './components/TabMenu';
import SellingPage from './src/HomePage/SellingPage';
import CustomerPage from './src/HomePage/SellingPage/CustomerPage';
import { COLORS } from './constants/theme';
import NavHeader from './components/NavHeader';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

const OptionContainer = ({ children }) => (
  <Box
    justifyContent={'center'}
    px={{ base: 1, lg: 4 }}
  >
    {children}
  </Box>
);

export default function App() {
  const iconColor = COLORS.primary;
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {/* stored global state */}
        <Store>
          {/* hidden a status bar IOS/Android */}
          {/* <StatusBar hidden /> */}

          <AppBar />
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name='Home'
                component={HomePage}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='Selling'
                component={SellingPage}
                options={{
                  title: '',
                  headerShadowVisible: true,
                  header: () =>
                    Platform.OS !== 'ios' ? (
                      <NavHeader
                        pageName={'Selling'}
                        // pageBackName={'Modules'}
                      />
                    ) : null,
                }}
              />
              <Stack.Screen
                name='Customer'
                component={CustomerPage}
                options={{
                  title: '',

                  header: () => (
                    <NavHeader
                      pageName={'Customer'}
                      pageBackName={'Selling'}
                    />
                  ),
                  // headerRight: () => (
                  //   <HStack space={6}>
                  //     <OptionContainer>
                  //       <AddNew color={iconColor} />
                  //     </OptionContainer>
                  //     <OptionContainer>
                  //       <Sort color={iconColor} />
                  //     </OptionContainer>
                  //     <OptionContainer>
                  //       <Filter color={iconColor} />
                  //     </OptionContainer>
                  //   </HStack>
                  // ),
                }}
              />
            </Stack.Group>
            <Stack.Screen
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
            />
          </Stack.Navigator>
          <TabMenu />
        </Store>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
