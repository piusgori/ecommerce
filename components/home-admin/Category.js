import { View, Text, StyleSheet, ImageBackground, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { styling } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';

const Category = ({ category }) => {

    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    const navigateHandler = () => {
        navigation.navigate('CategoryNameItems', { category: category.title })
    }

  return (
    <TouchableOpacity onPress={navigateHandler} style={styles.touchable}>
        <ImageBackground style={styles.container(width)} source={{ uri: category.image }}></ImageBackground>
        <Text style={styles.title}>{category.title}</Text>
    </TouchableOpacity>
  )
}

export default Category;

const styles = StyleSheet.create({
    container: (wid) => ({
        width: wid - 150,
        height: wid - 150,
        borderRadius: 25,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
        padding: 12,
    }),
    title: {
        fontSize: styling.fontSize.mediumTitle,
        fontFamily: styling.fontFamily.gobold,
        color: styling.color.primary500,
        textAlign: 'center'
    },
    touchable: {
        marginVertical: 12
    }
})