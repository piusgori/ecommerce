import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { styling } from '../../constants/styles';
import Input from '../../components/ui/Input';
import { ActivityIndicator, TextInput } from 'react-native-paper'
import Button from '../../components/ui/Button';
import { AuthContext } from '../../services/authentication-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminLoginScreen = ({ navigation }) => {

  const { setIsLoading, isLoading, adminLogin, setAdmin } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailErrors, setEmailErrors] = useState();
  const [passwordErrors, setPasswordErrors] = useState();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const emailChangingHandler = (typedEmail) => {
    setEmailInput(typedEmail);
  }

  const passwordChangingHandler = (typedPassword) => {
    setPasswordInput(typedPassword);
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

  const checkPasswordlIsValid = () => {
    if(passwordInput.trim().length < 7){
      setIsPasswordValid(false);
      setPasswordErrors('Please enter a strong password of at least 8 characters long');
    } else {
      setIsPasswordValid(true);
      setPasswordErrors(null)
    }
  }

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const data = await adminLogin(emailInput, passwordInput);
      if(data.content){
        for(const i of data.content){
          if(i.type === 'email'){
            setEmailErrors(i.message);
            setIsEmailValid(false);
          } else if(i.type === 'password'){
            setPasswordErrors(i.message);
            setIsPasswordValid(false);
          }
        }
      } else {
        setAdmin({id: data.id, email: data.email, phoneNumber: data.phoneNumber, token: data.token, name: data.name });
        await AsyncStorage.setItem('admin', JSON.stringify({id: data.id, email: data.email, phoneNumber: data.phoneNumber, token: data.token, name: data.name }));
      }
    } catch (err) {
      console.log(err);
      console.log('There is an error');
    } finally {
      setIsLoading(false);
    }
  }

  const changeVisibilityHandler = () => {
    setIsVisible(prevVisibility => !prevVisibility);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In As Admin</Text>
      <View style={styles.inputContainer}>
        <Input onCheckValidity={checkEmailIsValid} onInputChange={emailChangingHandler} errors={emailErrors} inputIsValid={isEmailValid} autoCapitalize='none' autoComplete='email' autoCorrect={false} keyboardType='email-address' placeholder='E-Mail' type='email'></Input>
        <Input onCheckValidity={checkPasswordlIsValid} onInputChange={passwordChangingHandler} errors={passwordErrors} inputIsValid={isPasswordValid} autoCapitalize='none' autoComplete='password' autoCorrect={false} secureTextEntry={isVisible ? false : true} placeholder='Password' right={<TextInput.Icon onPress={changeVisibilityHandler} name={isVisible ? 'eye' : 'eye-off'}></TextInput.Icon>} type='password'></Input>
      </View>
      <View style={styles.buttonContainer}>
        {!isLoading && <Button onPress={loginHandler} style={styles.button}>Log In</Button>}
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

export default AdminLoginScreen;

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