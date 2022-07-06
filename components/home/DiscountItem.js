import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import Button from '../ui/Button';
import { styling } from '../../constants/styles';

const DiscountItem = ({ item }) => {

    const { width } = useWindowDimensions();


  return (
    <View style={[styles.container, { width: width - 24}]}>
        <Image style={styles.image} source={{uri: item.image}}></Image>
        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.pricesContainer}>
                <Text style={styles.price}>Ksh {item.newPrice}</Text>
                <Text style={styles.oldPrice}>Ksh {item.price}</Text>
            </View>
        </View>
        <Button>Add To Cart</Button>
    </View>
  )
}

export default DiscountItem;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
    },
    detailsContainer: {
        marginVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        minHeight: 250,
        resizeMode: 'cover',
        borderRadius: 15,
    },
    price: {
        marginHorizontal: 12,
        fontSize: styling.fontSize.smallTitle,
        fontFamily: styling.fontFamily.gobold

    },

    oldPrice: {
        color: styling.color.gray100,
        textDecorationLine: 'line-through',
        fontFamily: styling.fontFamily.gobold,
        fontSize: styling.fontSize.smallTitle,
    },
    pricesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: styling.fontSize.smallTitle,
        fontFamily: styling.fontFamily.gobold
    },
})