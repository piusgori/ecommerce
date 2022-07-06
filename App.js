import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MainNavigation from './navigation/MainNavigation';
import WelcomeScreen from './screens/WelcomeScreen';
import { AuthContextProvider } from './services/authentication-context';

const Loading = () => {
  return (
      <View>
        <ActivityIndicator size='large'></ActivityIndicator>
      </View>
  )
}

export default function App() {
  const [loading, setloading] = useState(true);
  const [viewedOnBoarding, setViewedOnBoarding] = useState(false);

  useEffect(() => {
    const checkOnBoarding = async () => {
      try {
        const value = await AsyncStorage.getItem('@viewedOnBoarding');
        if (value){
          setViewedOnBoarding(true);
        }
      } catch (err) {
        console.log('There is an error');
      } finally {
        setloading(false);
      }
    }
    checkOnBoarding();
  }, [])

  const changeViewsHandler = () => {
    setViewedOnBoarding(true);
  }

  const [fontsLoaded] = useFonts({
    'university': require('./assets/fonts/university.otf'),
    'shandora': require('./assets/fonts/shandora.ttf'),
    'gobold-bold': require('./assets/fonts/gobold-bold.otf'),
    'gobold': require('./assets/fonts/gobold.otf'),
  })

  if(!fontsLoaded){
    return null;
  }

  return (
    <View style={styles.container}>
      <AuthContextProvider>
        {loading ? <Loading></Loading> : viewedOnBoarding ? <MainNavigation></MainNavigation> : <WelcomeScreen onViewed={changeViewsHandler}></WelcomeScreen>}
      </AuthContextProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

