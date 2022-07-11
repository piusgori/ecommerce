import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { styling } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';

const CategoryItem = ({ category }) => {
    const navigation = useNavigation();

    const goToCategoriesHandler = () => {
        navigation.navigate('CategoryName', { category: category.title })
    }

  return (
    <TouchableOpacity onPress={goToCategoriesHandler} style={styles.container}>
        <View style={styles.imageContainer}><Image style={styles.image} source={{uri: category.image}}></Image></View>
        <Text style={styles.name}>{category.title}</Text>
    </TouchableOpacity>
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