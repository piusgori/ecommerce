import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { styling } from '../../constants/styles';
import Button from '../ui/Button';
import { useNavigation } from '@react-navigation/native';

const HomeAdminProduct = ({ product }) => {
  const navigation = useNavigation();

  const editScreenHandler = () => {
    navigation.navigate('Edit', { id: product.id, title: product.title })
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: product.image }}></Image>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.pricesContainer}>
            <Text style={styles.price}>Ksh {product.isDiscount ? product.newPrice : product.price}</Text>
            {product.isDiscount && <Text style={styles.oldPrice}>Ksh {product.price}</Text>}
        </View>
      </View>
      <Button onPress={editScreenHandler}>Edit</Button>
    </View>
  )
}

export default HomeAdminProduct;

const styles = StyleSheet.create({
    bottomContainer: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container: {
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 24,
        paddingHorizontal: 18,
        elevation: 3,
        borderRadius: 10,
        marginVertical: 12
    },
    image: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: 250,
        marginBottom: 12,
        borderRadius: 10,
        overflow: 'hidden'
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
        fontFamily: styling.fontFamily.gobold,
    }
})