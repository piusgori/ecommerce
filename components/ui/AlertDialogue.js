import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { styling } from '../../constants/styles';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { ModalContext } from '../../services/modal-context';

const AlertDialogue = ({ message, onClose }) => {
    const { animationName } = useContext(ModalContext);
    const navigation = useNavigation();
    const closingHandler = () => {
        onClose(navigation);
    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <Text style={styles.title}>{message}</Text>
        </View>
        <View style={styles.animationContainer}>
        <LottieView autoPlay resizeMode='contain' key='animation' source={animationName}></LottieView>
        </View>
        <View style={styles.bottomContainer}>
            <Button onPress={closingHandler} style={styles.button}>Okay</Button>
        </View>
    </View>
  )
}

export default AlertDialogue;

const styles = StyleSheet.create({
    animation: {
        flex: 1
    },
    animationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '50%'
    },
    container: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: styling.fontSize.title,
        fontFamily: styling.fontFamily.goboldBold,
        color: styling.color.primary500,
        marginVertical: 12
    },
    topContainer: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})