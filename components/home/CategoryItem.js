import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { styling } from '../../constants/styles';

const CategoryItem = ({ category }) => {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}><Image style={styles.image} source={{uri: category.image}}></Image></View>
        <Text style={styles.name}>{category.name}</Text>
    </View>
  )
}

export default CategoryItem;

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    imageContainer: {
        height: 90,
        width: 90,
        borderRadius: 45,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    name: {
        fontFamily: styling.fontFamily.shandora,
        textAlign: 'center',
        fontSize: styling.fontSize.regular,
        textTransform: 'capitalize'
    },
})