import { NativeBaseProvider, StatusBar, Text, View } from 'native-base';
import Store from './reducer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/HomePage';
import PurchaseOrder from './src/HomePage/PurchaseOrder';
import OtherTest from './src/HomePage/OtherTest';
import AppBar from './components/AppBar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {/* stored global state */}
        <Store>
          {/* hidden a status bar IOS/Android */}
          <StatusBar hidden />
          {/* <StyledContainer> */}
          <AppBar />
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={HomePage}
              options={{ title: 'Home Page', headerLeft: () => <Text></Text> }}
            />
            <Stack.Screen
              name='Purchase Order'
              component={PurchaseOrder}
              options={{ title: 'Purchase Order', headerLeft: () => <Text></Text> }}
            />
            <Stack.Screen
              name='Other Test'
              component={OtherTest}
              options={{ title: 'Other Test', headerLeft: () => <Text></Text> }}
            />
          </Stack.Navigator>
          {/* </StyledContainer> */}
        </Store>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
