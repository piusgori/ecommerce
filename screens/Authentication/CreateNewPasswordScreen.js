import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { styling } from '../../constants/styles';
import Input from '../../components/ui/Input';
import { ActivityIndicator, TextInput } from 'react-native-paper'
import Button from '../../components/ui/Button';
import { AuthContext } from '../../services/authentication-context';

const CreateNewPasswordScreen = ({ navigation }) => {

  const { setIsLoading, isLoading, setNewPasswordHandler } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState();
  const [passwordInput, setPasswordInput] = useState('');

  const passwordChangingHandler = (typedPassword) => {
    setPasswordInput(typedPassword);
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

  const newPasswordHandler = async () => {
    setIsLoading(true);
    try {
      const data = await setNewPasswordHandler(passwordInput);
      if(data.content){
        for(const i of data.content){
          if(i.type === 'password'){
            setPasswordErrors(i.message);
            setIsPasswordValid(false);
          }
        }
      } else {
        navigation.navigate('Login');
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
      <Text style={styles.title}>Create New Password</Text>
      <View style={styles.inputContainer}>
        <Input onCheckValidity={checkPasswordlIsValid} onInputChange={passwordChangingHandler} errors={passwordErrors} inputIsValid={isPasswordValid} autoCapitalize='none' autoComplete='password' autoCorrect={false} secureTextEntry={isVisible ? false : true} placeholder='Password' right={<TextInput.Icon onPress={changeVisibilityHandler} name={isVisible ? 'eye' : 'eye-off'}></TextInput.Icon>} type='password'></Input>
      </View>
      <View style={styles.buttonContainer}>
        {!isLoading && <Button onPress={newPasswordHandler} style={styles.button}>Set New Password</Button>}
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

export default CreateNewPasswordScreen;

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