import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { styling } from '../../constants/styles';
import { AuthContext } from '../../services/authentication-context';

const CartIcon = ({ onPress }) => {
  const { user } = useContext(AuthContext);
  const totalItems = user.cart.reduce((tq, each) => tq += each.quantity, 0)

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name='cart-outline' size={40}></Ionicons>
      {user.cart.length > 0 && <View style={styles.badge}>
        <Text style={styles.badgeText}>{totalItems}</Text>
      </View>}
    </TouchableOpacity>
  )
}

export default CartIcon;

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        backgroundColor: styling.color.error100,
        paddingHorizontal: 8,
        paddingVertical: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
    },
    badgeText: {
        color: 'white',
        fontFamily: styling.fontFamily.gobold,
        fontSize: styling.fontSize.regular
    },
    container: {

    }
})