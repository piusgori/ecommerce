import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'
import Button from '../../components/ui/Button';
import { styling } from '../../constants/styles';

const MainAuthenticationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <FontAwesome name='shopping-basket' size={100} color={styling.color.primary400}></FontAwesome>
        <Text style={styles.title}>Our Shop</Text>
        <Text style={styles.text}>Create an account with us or login to an existing one to be a part of our esteemed onine customer</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Button style={styles.button}>Login</Button>
        <Button style={[styles.button, {backgroundColor: 'white'}]} textColor={{color: styling.color.primary400}}>Sign Up</Button>
      </View>
    </View>
  )
}

export default MainAuthenticationScreen;

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        width: '80%',
    },
    container: {
        paddingHorizontal: 24,
        paddingVertical: 36,
    },
    text: {
        margin: 12,
        fontSize: styling.fontSize.mediumTitle,
        textAlign: 'center',
        fontFamily: styling.fontFamily.shandora,
    },
    title: {
        marginHorizontal: 12,
        marginTop: 48,
        fontSize: styling.fontSize.largeTitle,
        textAlign: 'center',
        fontFamily: styling.fontFamily.goboldBold,
        color: styling.color.primary400
    },
    topContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    }
})