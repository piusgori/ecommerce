import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Button from '../ui/Button';
import { styling } from '../../constants/styles';
import { StoreContext } from '../../services/store-context';
import { AuthContext } from '../../services/authentication-context';
import Icon from '../ui/Icon';

const NewProduct = ({ item }) => {

    const { width } = useWindowDimensions();
    const { addToCart } = useContext(StoreContext);
    const { user } = useContext(AuthContext)

    const addToCartHandler = () => {
        addToCart(item, 'increase', user.id);
    };

    const decreaseCartHandler = () => {
        addToCart(item, 'decrease', user.id);
    }

    const foundItemInCart = user.cart.find((prod) => prod.id === item.id);

  return (
    <View style={[styles.container, { width: width - 24}]}>
        <Image style={styles.image} source={{uri: item.image}}></Image>
        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.pricesContainer}>
                <Text style={styles.price}>Ksh {item.isDiscount ? item.newPrice : item.price}</Text>
                {item.isDiscount && <Text style={styles.oldPrice}>Ksh {item.price}</Text>}
            </View>
        </View>
        {!foundItemInCart && <Button onPress={addToCartHandler}>Add To Cart</Button>}
        {foundItemInCart && <View style={styles.buttonContainer}>
            <Button onPress={decreaseCartHandler} style={styles.button} textColor={{ color: styling.color.primary500 }}>
                <TouchableOpacity style={styles.minus}>
                    <Icon icon='remove-outline' size={20} color={styling.color.primary500}></Icon>
                </TouchableOpacity>
            </Button>
            <Text style={styles.quantityText}>{foundItemInCart.quantity}</Text>
            <Button onPress={addToCartHandler} style={styles.button} textColor={{ color: styling.color.primary500 }}>
                <TouchableOpacity style={styles.minus}>
                    <Icon icon='add-sharp' size={20} color={styling.color.primary500}></Icon>
                </TouchableOpacity>
            </Button>
        </View>}
    </View>
  )
}

export default NewProduct;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        width: '40%'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
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
    minus: {
        marginRight: 24,
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
    quantityText: {
        fontSize: styling.fontSize.title,
        fontFamily: styling.fontFamily.goboldBold,
        color: styling.color.primary500
    },
    title: {
        fontSize: styling.fontSize.smallTitle,
        fontFamily: styling.fontFamily.gobold
    },
})