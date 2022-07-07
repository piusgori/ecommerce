import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { styling } from '../../constants/styles';

const AdminHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Products</Text>
    </View>
  )
}

export default AdminHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: styling.fontSize.title,
        fontFamily: styling.fontFamily.goboldBold,
        color: styling.color.primary700
    }
})