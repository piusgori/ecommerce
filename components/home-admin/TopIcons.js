import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import Icon from '../ui/Icon';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styling } from '../../constants/styles';
import { AuthContext } from '../../services/authentication-context';

const TopIcons = ({ navigation }) => {
    const { adminLogout } = useContext(AuthContext);

    const logoutHandler = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [{ text: 'No', style: 'cancel' }, { text: 'Yes', style: 'default', onPress: adminLogout }])
    }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logoutHandler} style={styles.eachIconView}>
        <MaterialCommunityIcons name='logout' size={24} color={styling.color.primary400}></MaterialCommunityIcons>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate('CreateProduct')}} style={styles.eachIconView}>
        <Icon icon='add' size={24} color={styling.color.primary400}></Icon>
      </TouchableOpacity>
    </View>
  )
}

export default TopIcons;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eachIconView: {
        marginHorizontal: 12
    }
})