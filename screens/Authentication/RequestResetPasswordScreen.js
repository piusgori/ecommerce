import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { styling } from '../../constants/styles';
import Input from '../../components/ui/Input';
import { ActivityIndicator, TextInput } from 'react-native-paper'
import Button from '../../components/ui/Button';
import { AuthContext } from '../../services/authentication-context';

const RequestResetPasswordScreen = ({ navigation }) => {

  const { setIsLoading, isLoading, requestPasswordReset, setPasswordResetToken } = useContext(AuthContext);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailErrors, setEmailErrors] = useState();
  const [emailInput, setEmailInput] = useState('');

  const emailChangingHandler = (typedEmail) => {
    setEmailInput(typedEmail);
  }

  const checkEmailIsValid = () => {
    if(!emailInput.includes('@')){
      setIsEmailValid(false);
      setEmailErrors('Please enter a valid Email address');
    } else {
      setIsEmailValid(true);
      setEmailErrors(null);
    }
  }

  const requestPasswordResetHandler = async () => {
    setIsLoading(true);
    try {
      const data = await requestPasswordReset(emailInput);
      console.log(data);
      if(data.content){
        for(const i of data.content){
          if(i.type === 'email'){
            setEmailErrors(i.message);
            setIsEmailValid(false);
          }
        }
      } else {
        setPasswordResetToken(data.token);
        navigation.navigate('EnterResetCodeScreen');
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
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.inputContainer}>
        <Input label='Email Address' onCheckValidity={checkEmailIsValid} onInputChange={emailChangingHandler} errors={emailErrors} inputIsValid={isEmailValid} autoCapitalize='none' autoComplete='email' autoCorrect={false} keyboardType='email-address' placeholder='E-Mail' type='email'></Input>
      </View>
      <View style={styles.buttonContainer}>
        {!isLoading && <Button onPress={requestPasswordResetHandler} style={styles.button}>Get Reset Code</Button>}
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

export default RequestResetPasswordScreen;

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