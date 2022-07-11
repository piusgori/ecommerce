import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styling } from '../constants/styles';
import Icon from '../components/ui/Icon';
import AdminHomeScreen from '../screens/AdminStore/AdminHomeScreen';
import AdminCategoriesScreen from '../screens/AdminStore/AdminCategoriesScreen';
import OrdersScreen from '../screens/AdminStore/OrdersScreen';
import EditScreen from '../screens/AdminStore/EditScreen';
import AddCategoriesScreen from '../screens/AdminStore/AddCategoryScreen';
import CreateProductScreen from '../screens/AdminStore/CreateProductScreen';
import CategoryNameItemsScreen from '../screens/AdminStore/CategoryNameItemsScreen';
import AdminSettingScreen from '../screens/AdminStore/AdminSettingScreen';
import TopIcons from '../components/home-admin/TopIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AdminNavigation = () => {
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
          name='AdminHome' 
          component={AdminHomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Icon icon='home' size={size} color={color}></Icon>
          }}
        ></Tab.Screen>
        <Tab.Screen 
          name='AdminCategories' 
          component={AdminCategoriesScreen}
          options={{
            title: 'Categories',
            tabBarIcon: ({ color, size }) => <Icon icon='apps-outline' size={size} color={color}></Icon>
          }}
        ></Tab.Screen>
        <Tab.Screen 
          name='Orders' 
          component={OrdersScreen}
          options={{
            title: 'Orders',
            tabBarIcon: ({ color, size }) => <Icon icon='ios-reorder-three' size={size} color={color}></Icon>,
            tabBarBadge: 5,
          }}
        ></Tab.Screen>
        <Tab.Screen
          name='AdminProfile'
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <Icon icon='person' size={size} color={color}></Icon>
          }}
          component={AdminSettingScreen}
        ></Tab.Screen>
      </Tab.Navigator>
    )
  }

  return (
    <View style={{ height, width }}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={({ navigation }) => ({
            contentStyle: {backgroundColor: 'white'}, 
            headerRight: () => <TopIcons navigation={navigation}></TopIcons>
          })}
        >
          <Stack.Screen 
            name='Admin'
            options={{headerTitle: ''}} 
            component={TabNavigation}
          ></Stack.Screen>
          <Stack.Screen
            name='Edit'
            options={{ 
                headerTitle: 'Edit',
                headerTitleStyle: {color: styling.color.primary500, fontFamily: styling.fontFamily.goboldBold},
                headerRight: null
            }}
            component={EditScreen}
          >
          </Stack.Screen>
          <Stack.Screen
            name='CreateProduct'
            options={{ 
              headerTitle: 'Create New Product',
              headerTitleStyle: {color: styling.color.primary500, fontFamily: styling.fontFamily.goboldBold},
              headerRight: null
          }}
            component={CreateProductScreen}
          ></Stack.Screen>
          <Stack.Screen
            name='CreateCategory'
            options={{ headerShown: false }}
            component={AddCategoriesScreen}
          ></Stack.Screen>
          <Stack.Screen
            name='CategoryNameItems'
            options={{
              headerTitleStyle: {color: styling.color.primary500, fontFamily: styling.fontFamily.goboldBold},
              headerRight: null
            }}
            component={CategoryNameItemsScreen}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default AdminNavigation