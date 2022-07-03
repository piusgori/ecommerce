import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper';
import { styling } from '../../constants/styles';
import { validation } from '../../utils/form-validation';

const Input = ({ placeholder, autoCapitalize, autoComplete, autoCorrect=false, keyboardAppearance='default', keyboardType, right=null, secureTextEntry=false, type }) => {
    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const [isValidatedOnBlur, setIsValidatedOnBlur] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState();

    const checkValidityHandler = () => {
        if(isTouched){
            const validationResult = validation(type, inputValue);
            setIsValid(validationResult.validity);
            setError(validationResult.error);
            setIsValidatedOnBlur(true);
        }
    }

    const changeValidityOnChangeHandler = () => {
        if(isTouched && isValidatedOnBlur){
            const validationResult = validation(type, inputValue);
            setIsValid(validationResult.validity);
            setError(validationResult.error);
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
            onChangeText={(text) => {setInputValue(text); changeValidityOnChangeHandler()}}
            onBlur={checkValidityHandler}
            onFocus={() => {setIsTouched(true)}}
            placeholder={placeholder}
            placeholderTextColor='black' 
            secureTextEntry={secureTextEntry}
            style={[styles.input, !isValid && styles.error]} 
            outlineColor={!isValid && styling.color.error100}
            right={right}
            mode='outlined'
            value={inputValue}
        ></TextInput>
        {!isValid && <Text style={styles.errorText}>{error}</Text>}
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