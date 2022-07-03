import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { styling } from '../../constants/styles';

const Button = ({ onPress, children, style, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={[styles.buttonText, textColor]}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 36,
        paddingVertical: 16,
        margin: 12,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: styling.color.primary400,
        backgroundColor: styling.color.primary400,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: styling.fontFamily.gobold,
        color: styling.color.white100
    }
})