import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { styling } from '../../constants/styles';
import Input from '../../components/ui/Input';
import { ActivityIndicator, TextInput } from 'react-native-paper'
import Button from '../../components/ui/Button';
import { AuthContext } from '../../services/authentication-context';

const EnterResetCodeScreen = ({ navigation }) => {

  const { setIsLoading, isLoading, enterReceivedCodeHandler, setPasswordResetEmail } = useContext(AuthContext);

  const [isCodeValid, setIsCodeValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [codeErrors, setCodeErrors] = useState();
  const [codeInput, setCodeInput] = useState('');

  const codeChangingHandler = (typedCode) => {
    setCodeInput(typedCode);
  }

  const checkCodeIsValid = () => {
    if(codeInput.trim().length !== 6){
      setIsCodeValid(false);
      setCodeErrors('The code must be 6 digits long');
    } else {
      setIsCodeValid(true);
      setCodeErrors(null);
    }
  }

  const codeValidationHandler = async () => {
    setIsLoading(true);
    try {
      const data = await enterReceivedCodeHandler(codeInput);
      console.log(data)
      if(data.content){
        for(const i of data.content){
          if(i.type === 'code'){
            setCodeErrors(i.message);
            setIsCodeValid(false);
          }
        }
      } else {
        setPasswordResetEmail(data.email);
        navigation.navigate('CreateNewPasswordScreen');
      }
    } catch (err) {
      console.log(err);
      console.log('There is an error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Code</Text>
      <View style={styles.inputContainer}>
        <Input label='Reset Code' onCheckValidity={checkCodeIsValid} onInputChange={codeChangingHandler} errors={codeErrors} inputIsValid={isCodeValid} autoCapitalize='none' autoComplete='off' autoCorrect={false} keyboardType='phone-pad' placeholder='6 Digit Code' type='phone'></Input>
      </View>
      <View style={styles.buttonContainer}>
        {!isLoading && <Button onPress={codeValidationHandler} style={styles.button}>Change My Password</Button>}
        {isLoading && <ActivityIndicator></ActivityIndicator>}
        {/* <Text style={styles.orText}>OR</Text> */}
        {/* <TouchableOpacity style={styles.googleAuthentication}>
          <Image style={styles.image} source={require('../../assets/google.png')}></Image>
          <Text style={styles.loginText}>Login with google</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

export default EnterResetCodeScreen;

const styles = StyleSheet.create({
  button: {
    width: '75%',
  },
  buttonContainer: {
    marginVertical: 12,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingVertical: 50,
    paddingHorizontal: 24,
    flex: 1,
    width: '100%'
  },
  googleAuthentication: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: 'white'
  },
  image: {
    height: 30,
    width: 30,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 26,
    width: '90%',
    alignSelf: 'center'
  },
  loginText: {
    fontSize: 16,
    fontFamily: styling.fontFamily.gobold,
    color: styling.color.primary400
  },
  orText: {
    fontSize: styling.fontSize.title,
    fontWeight: 'bold',
    marginVertical: 10
  },
  text: {
    alignSelf: 'flex-end',
    fontSize: styling.fontSize.smallTitle,
    color: styling.color.primary500,
    fontWeight: 'bold'
  },
  title: {
    color: styling.color.primary400,
    fontSize: styling.fontSize.largeTitle,
    fontFamily: styling.fontFamily.goboldBold,
    textAlign: 'left',
    marginBottom: 40,
  }
})