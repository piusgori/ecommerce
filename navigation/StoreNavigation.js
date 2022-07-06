import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/Store/MainScreen';
import { styling } from '../constants/styles';
import Icon from '../components/ui/Icon';
import ProfileScreen from '../screens/Store/ProfileScreen';
import CategoriesScreen from '../screens/Store/CategoriesScreen';
import CartIcon from '../components/ui/CartIcon';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StoreNavigation = () => {
  const { width, height } = useWindowDimensions();

  const TabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: styling.color.primary500,
          headerShown: false,
          tabBarLabelStyle: {fontSize: styling.fontSize.regular, fontFamily: styling.fontFamily.gobold}
        }}
      >
        <Tab.Screen 
          name='HomeTab' 
          component={MainScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Icon icon='home' size={size} color={color}></Icon>
          }}
        ></Tab.Screen>
        <Tab.Screen 
          name='CategoriesTab' 
          component={CategoriesScreen}
          options={{
            title: 'Categories',
            tabBarIcon: ({ color, size }) => <Icon icon='apps-outline' size={size} color={color}></Icon>
          }}
        ></Tab.Screen>
        <Tab.Screen 
          name='ProfileTab' 
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <Icon icon='person' size={size} color={color}></Icon>
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    )
  }

  return (
    <View style={{ height, width }}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            contentStyle: {backgroundColor: 'white'}, 
            headerRight: () => <CartIcon></CartIcon>
          }}
        >
          <Stack.Screen 
            name='HomeScreen'
            options={{headerTitle: ''}} 
            component={TabNavigation}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default StoreNavigation