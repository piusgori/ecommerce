import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { styling } from '../../constants/styles';
import Input from '../../components/ui/Input';
import { ActivityIndicator, TextInput } from 'react-native-paper'
import Button from '../../components/ui/Button';
import { AuthContext } from '../../services/authentication-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {

  const { isLoading, setIsLoading, setUser, signup } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailErrors, setEmailErrors] = useState();
  const [passwordErrors, setPasswordErrors] = useState();
  const [nameErrors, setNameErrors] = useState();
  const [phoneNumberErrors, setPhoneNumberErrors] = useState();
  const [nameInput, setNameInput] = useState('');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const emailChangingHandler = (typedEmail) => {
    setEmailInput(typedEmail);
  }

  const passwordChangingHandler = (typedPassword) => {
    setPasswordInput(typedPassword);
  }

  const nameChangingHandler = (typedName) => {
    setNameInput(typedName);
  }

  const phoneNumberChangingHandler = (typedPhoneNumber) => {
    setPhoneNumberInput(typedPhoneNumber);
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

  const checkNameIsValid = () => {
    if(nameInput.trim().length < 3){
      setIsNameValid(false);
      setNameErrors('Please enter a valid name of at least 3 characters');
    } else {
      setIsNameValid(true);
      setNameErrors(null);
    }
  }

  const checkPhoneNumberIsValid = () => {
    if(phoneNumberInput.trim().length !== 10 ){
      setIsPhoneNumberValid(false);
      setPhoneNumberErrors('Please enter a valid phone number');
    } else {
      setIsPhoneNumberValid(true);
      setPhoneNumberErrors(null)
    }
  }

  const signupHandler = async () => {
    setIsLoading(true);
    try {
      const data = await signup(nameInput, emailInput, phoneNumberInput, passwordInput);
      if(data.content){
        for(const i of data.content){
          if(i.type === 'email'){
            setEmailErrors(i.message);
            setIsEmailValid(false);
          } else if(i.type === 'password'){
            setPasswordErrors(i.message);
            setIsPasswordValid(false);
          } else if(i.type === 'name'){
            setNameErrors(i.message);
            setIsNameValid(false);
          } else if(i.type === 'phoneNumber'){
            setPhoneNumberErrors(i.message);
            setIsPhoneNumberValid(false);
          }
        }
      } else {
        setUser({id: data.id, email: data.email, phoneNumber: data.phoneNumber, token: data.token, name: data.name, cart: data.cart, orders: data.orders});
        await AsyncStorage.setItem('user', JSON.stringify({id: data.id, email: data.email, phoneNumber: data.phoneNumber, token: data.token, name: data.name, cart: data.cart, orders: data.orders, sessionExpiry: (new Date().getTime() + (1000 * 60 * 60))}));
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
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Input label='Name' onCheckValidity={checkNameIsValid} onInputChange={nameChangingHandler} errors={nameErrors} inputIsValid={isNameValid} autoCapitalize='words' autoComplete='name' autoCorrect={false} keyboardType='default' placeholder='Name' type='name'></Input>
        <Input label='Your Phone Number (Safaricom)' onCheckValidity={checkPhoneNumberIsValid} onInputChange={phoneNumberChangingHandler} errors={phoneNumberErrors} inputIsValid={isPhoneNumberValid} autoCapitalize='none' autoComplete='off' autoCorrect={false} keyboardType='phone-pad' placeholder='Phone Number' type='phone'></Input>
        <Input label='Your E_Mail Address' onCheckValidity={checkEmailIsValid} onInputChange={emailChangingHandler} errors={emailErrors} inputIsValid={isEmailValid} autoCapitalize='none' autoComplete='email' autoCorrect={false} keyboardType='email-address' placeholder='E-Mail' type='email'></Input>
        <Input label='Password' onCheckValidity={checkPasswordlIsValid} onInputChange={passwordChangingHandler} errors={passwordErrors} inputIsValid={isPasswordValid} autoCapitalize='none' autoComplete='password' autoCorrect={false} secureTextEntry={isVisible ? false : true} placeholder='Password' right={<TextInput.Icon onPress={changeVisibilityHandler} name={isVisible ? 'eye' : 'eye-off'}></TextInput.Icon>} type='password'></Input>
        <Text onPress={() => { navigation.navigate('Login')}} style={styles.text}>Already have an account?</Text>
      </View>
      <View style={styles.buttonContainer}>
        {!isLoading && <Button onPress={signupHandler} style={styles.button}>Create Account</Button>}
        {isLoading && <ActivityIndicator></ActivityIndicator>}
        {/* <Text style={styles.orText}>OR</Text>
        <TouchableOpacity style={styles.googleAuthentication}>
          <Image style={styles.image} source={require('../../assets/google.png')}></Image>
          <Text style={styles.loginText}>Sign Up with google</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

export default SignupScreen;

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