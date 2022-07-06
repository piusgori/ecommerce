import React from 'react'
import LoginScreen from '../screens/Authentication/LoginScreen';
import MainAuthenticationScreen from '../screens/Authentication/MainAuthenticationScreen';
import SignupScreen from '../screens/Authentication/SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions, View } from 'react-native';
import RequestResetPasswordScreen from '../screens/Authentication/RequestResetPasswordScreen';
import EnterResetCodeScreen from '../screens/Authentication/EnterResetCodeScreen';
import CreateNewPasswordScreen from '../screens/Authentication/CreateNewPasswordScreen';
import AdminLoginScreen from '../screens/Authentication/AdminLoginScreen';

const Stack = createNativeStackNavigator();

const AuthenticationNavigation = () => {

  const { height, width } = useWindowDimensions();

  return (
    <View style={{ height, width }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: {backgroundColor: 'white'} }}>
          <Stack.Screen name='Main' component={MainAuthenticationScreen}></Stack.Screen>
          <Stack.Screen name='Signup' component={SignupScreen}></Stack.Screen>
          <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
          <Stack.Screen name='AdminLogin' component={AdminLoginScreen}></Stack.Screen>
          <Stack.Screen name='RequestResetPasswordScreen' component={RequestResetPasswordScreen}></Stack.Screen>
          <Stack.Screen name='EnterResetCodeScreen' component={EnterResetCodeScreen}></Stack.Screen>
          <Stack.Screen name='CreateNewPasswordScreen' component={CreateNewPasswordScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

    </View>
  )
}

export default AuthenticationNavigation;