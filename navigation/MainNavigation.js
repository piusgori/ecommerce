import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticationNavigation from './AuthenticationNavigation';

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
        <AuthenticationNavigation></AuthenticationNavigation>
    )
}

export default MainNavigation