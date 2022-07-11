import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useContext } from 'react'
import Button from '../../components/ui/Button';
import { AuthContext } from '../../services/authentication-context';

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  const logoutHandler = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [{ text: 'No', style: 'cancel' }, { text: 'Yes', style: 'default', onPress: logout }])
  }

  return (
    <View style={styles.container}>
      <Button style={styles.buttonEach}>My Orders</Button>
      <Button onPress={logoutHandler} style={styles.buttonEach}>Logout</Button>
    </View>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 24,
  },
  buttonEach: {
    marginVertical: 24,
    width: '90%',
  }
})