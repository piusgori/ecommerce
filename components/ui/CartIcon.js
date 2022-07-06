import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { styling } from '../../constants/styles';

const CartIcon = () => {
  return (
    <TouchableOpacity>
      <Ionicons name='cart-outline' size={40}></Ionicons>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>5</Text>
      </View>
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