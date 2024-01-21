import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import AppHomeScreen from './screens/AppHomeScreen';
import C12Screen from './screens/certifs/C12Screen';  // Import the C12Screen

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
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
          name="AppHome"
          component={AppHomeScreen}
          options={{
            title: 'GasGate',
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="C12"
          component={C12Screen}  // Add the C12Screen component
          options={{
            title: 'C12 Page',  // Set a custom title for the C12Screen
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
