import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper';
import { styling } from '../../constants/styles';

const Input = ({ onCheckValidity, onInputChange, inputIsValid, errors ,placeholder, autoCapitalize, autoComplete, autoCorrect=false, keyboardAppearance='default', keyboardType, right=null, secureTextEntry=false, type }) => {
    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const [isValidatedOnBlur, setIsValidatedOnBlur] = useState(false);

    const checkValidityHandler = () => {
        if(isTouched){
            onCheckValidity();
            setIsValidatedOnBlur(true);
        }
    }

    const changeValidityOnChangeHandler = () => {
        if(isTouched && isValidatedOnBlur){
            onCheckValidity();
        }
    }

  return (
    <View style={styles.container}>
        <TextInput 
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            autoComplete={autoComplete}
            keyboardAppearance={keyboardAppearance}
            keyboardType={keyboardType}
            onChangeText={(text) => {setInputValue(text); onInputChange(text); changeValidityOnChangeHandler()}}
            onBlur={checkValidityHandler}
            onFocus={() => {setIsTouched(true)}}
            placeholder={placeholder}
            placeholderTextColor='black' 
            secureTextEntry={secureTextEntry}
            style={[styles.input, !inputIsValid && styles.error]} 
            outlineColor={!inputIsValid && styling.color.error100}
            right={right}
            mode='outlined'
            value={inputValue}
        ></TextInput>
        {!inputIsValid && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    error: {
        borderColor: styling.color.error100
    },
    errorText: {
        fontSize: styling.fontSize.smallTitle,
        color: styling.color.error100
    },
    input: {
        width: '100%',
        marginVertical: 12,
    }
})