import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticationNavigation from './AuthenticationNavigation';
import StoreNavigation from './StoreNavigation';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from '../services/authentication-context';
import { Text, View } from 'react-native';
import AdminNavigation from './AdminNavigation';

const MainNavigation = () => {

    const [checkingStorage, setCheckingStorage] = useState(false);
    const { user, setUser, admin, setAdmin } = useContext(AuthContext);

    useEffect(() => {
        // const clear =  async () => {
        //     try {
        //         await AsyncStorage.removeItem('@viewedOnBoarding');
        //     } catch (err) {
        //         console.log('There is an Error');
        //     }
        // }
        // clear();

        const checkStorageHandler = async () => {
            setCheckingStorage(true);
            try {
                const foundUser = await AsyncStorage.getItem('user');
                const stringifiedUser = JSON.parse(foundUser);
                if(stringifiedUser){
                    const currentTime = new Date().getTime();
                    if(currentTime < stringifiedUser.sessionExpiry){
                        setUser(stringifiedUser)
                    } else {
                        setUser(null);
                    }
                } else if(!stringifiedUser) {
                    setUser(null);
                }
                const foundAdmin = await AsyncStorage.getItem('admin');
                const stringifiedAdmin = JSON.parse(foundAdmin);
                if(stringifiedAdmin){
                    setAdmin(stringifiedAdmin);
                } else {
                    setAdmin(null)
                }

            } catch (err) {
                console.log(error)
                console.log('There is an error')
            } finally {
                setCheckingStorage(false);
            }
        }
        
        checkStorageHandler();
    }, [])

    const LoadingView = () => {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                <ActivityIndicator size='large'></ActivityIndicator>
            </View>
        )
    }

    if(checkingStorage){
        return <LoadingView></LoadingView>
    } 
    if(!checkingStorage && user){
        return <StoreNavigation></StoreNavigation>
    }

    if(!checkingStorage && admin){
        return <AdminNavigation></AdminNavigation>
    }

    return (
        <AuthenticationNavigation></AuthenticationNavigation>
    )
}

export default MainNavigation