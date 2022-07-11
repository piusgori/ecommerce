import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../services/authentication-context'
import { styling } from '../../constants/styles';
import Icon from '../../components/ui/Icon';
import { StoreContext } from '../../services/store-context';
import Button from '../../components/ui/Button';

const Cart = () => {
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(StoreContext); 
    const totalAmount = user.cart.reduce((ta, each) => ta += each.totalAmount, 0)

    const ItemInCart = ({ item }) => {
        const increaseCartHandler = () => {
            addToCart(item, 'increase', user.id);
        }

        const decreaseCartHandler = () => {
            addToCart(item, 'decrease', user.id);
        }
        
        return(
            <View style={styles.contentContainer}>
                <Text style={styles.contentText}>{item.title}</Text>
                <View style={styles.contentModify}>
                    <TouchableOpacity onPress={decreaseCartHandler}>
                        <Icon icon='remove-outline' size={16}></Icon>
                    </TouchableOpacity>
                    <Text style={styles.contentNumber}>{item.quantity}</Text>
                    <TouchableOpacity onPress={increaseCartHandler}>
                        <Icon icon='add-outline' size={16}></Icon>
                    </TouchableOpacity>
                </View>
                <Text style={styles.contentText}>Ksh {item.price}</Text>
                <Text style={styles.contentText}>Ksh {item.totalAmount}</Text>
            </View>
        )
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {user.cart.length === 0 && <Text style={styles.text}>There are no items in this cart</Text>}
      {user.cart.length > 0 && <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Item</Text>
            <Text style={styles.headerTitle}>Quantity</Text>
            <Text style={styles.headerTitle}>Unit Price</Text>
            <Text style={styles.headerTitle}>Total Price</Text>
        </View>
        <ScrollView>
            {user.cart.map((cartItem) => <ItemInCart key={cartItem.id} item={cartItem}></ItemInCart>)}
        </ScrollView>
        <View style={styles.afterItemsContainer}>
            <Text style={styles.afterItemsTitle}>Total Amount</Text>
            <Text style={styles.afterItemsTitle}>Ksh {totalAmount}</Text>
        </View>
        <Button>Order</Button>
      </ScrollView>}
    </View>
  )
}

export default Cart;

const styles = StyleSheet.create({
    afterItemsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 16
    },
    afterItemsTitle: {
        fontSize: styling.fontSize.smallTitle,
        fontFamily: styling.fontFamily.goboldBold,
        color: styling.color.primary500,
    },
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 12,
    },
    contentModify: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 6
    },
    contentNumber: {
        textAlign: 'center',
        fontSize: styling.fontSize.smallTitle,
        fontFamily: styling.fontFamily.shandora,
    },
    contentText: {
        fontSize: styling.fontSize.smallTitle,
        fontFamily: styling.fontFamily.shandora,
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 12,
    },
    headerTitle: {
        fontSize: styling.fontSize.smallTitle,
        fontFamily: styling.fontFamily.goboldBold,
        color: styling.color.primary500,
        flex: 1,
    },
    scrollView: {
        width: '100%'
    },
    text: {
        fontFamily: styling.fontFamily.shandora,
        fontSize: styling.fontSize.mediumTitle,
        marginVertical: 12,
    },
    title: {
        textAlign: 'center',
        fontSize: styling.fontSize.title,
        fontFamily: styling.fontFamily.goboldBold,
        color: styling.color.primary500,
    }
})