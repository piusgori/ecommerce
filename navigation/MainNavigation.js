import React, { useEffect } from 'react';
import LoginScreen from '../screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainNavigation = () => {

    // useEffect(() => {
    //     const clear =  async () => {
    //         try {
    //             await AsyncStorage.removeItem('@viewedOnBoarding');
    //         } catch (err) {
    //             console.log('There is an Error');
    //         }
    //     }
    //     clear();
    // }, [])

    return (
        <LoginScreen></LoginScreen>
    )
}

export default MainNavigation