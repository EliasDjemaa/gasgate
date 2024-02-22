import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import AppHomeScreen from './screens/AppHomeScreen';
import CP12 from './screens/certifs/CP12';
import CP15 from './screens/certifs/CP15';
import CP16 from './screens/certifs/CP16';
import CP17 from './screens/certifs/CP17';
import Requested from './screens/requested/Requested';
import CertifSelection from './screens/CertifSelection';  
import Completed from './screens/Completed'; 
import QRScannerScreen from './screens/QRScannerScreen'; 
import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="SignIn" 
        component={SignInScreen} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppHome"
          component={AppHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Requested"
          component={Requested}  // Add the CertifSelection component
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CertifSelection"
          component={CertifSelection}  // Add the CertifSelection component
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Completed"
          component={Completed}  // Add the CertifSelection component
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CP12"
          component={CP12}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CP15"
          component={CP15}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CP16"
          component={CP16}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CP17"
          component={CP17}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QRScanner"
          component={QRScannerScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
