import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styling } from '../../constants/styles';
import Input from '../../components/ui/Input';
import { TextInput } from 'react-native-paper'
import Button from '../../components/ui/Button';

const SignupScreen = ({ navigation }) => {

  const [isVisible, setIsVisible] = useState(false);

  const changeVisibilityHandler = () => {
    setIsVisible(prevVisibility => !prevVisibility);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Input autoCapitalize='words' autoComplete='name' autoCorrect={false} keyboardType='default' placeholder='Name' type='name'></Input>
        <Input autoCapitalize='none' autoComplete='off' autoCorrect={false} keyboardType='phone-pad' placeholder='Phone Number' type='phone'></Input>
        <Input autoCapitalize='none' autoComplete='email' autoCorrect={false} keyboardType='email-address' placeholder='E-Mail' type='email'></Input>
        <Input autoCapitalize='none' autoComplete='password' autoCorrect={false} secureTextEntry={isVisible ? false : true} placeholder='Password' right={<TextInput.Icon onPress={changeVisibilityHandler} name={isVisible ? 'eye' : 'eye-off'}></TextInput.Icon>} type='password'></Input>
        <Text onPress={() => { navigation.navigate('Login')}} style={styles.text}>Already have an account?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button}>Create Account</Button>
        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity style={styles.googleAuthentication}>
          <Image style={styles.image} source={require('../../assets/google.png')}></Image>
          <Text style={styles.loginText}>Sign Up with google</Text>
        </TouchableOpacity>
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