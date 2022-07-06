import { Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { styling } from '../../constants/styles';
import { products } from '../../constants/products';
import DiscountItem from './DiscountItem';
import NewProduct from './NewProduct';

const HomeDisplay = () => {

    const discountProducts = products.filter((product) => !isNaN(product.newPrice));

  return (
    <ScrollView>
      <Text style={styles.title}>Discount Items</Text>
      <FlatList
        data={discountProducts}
        bounces={false}
        horizontal 
        keyExtractor={(item) => Math.random()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={(itemData) => <DiscountItem item={itemData.item}></DiscountItem>}
      ></FlatList>
      <Text style={styles.title}>New products</Text>
      <FlatList
        data={products}
        bounces={false}
        horizontal 
        keyExtractor={(item) => Math.random()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={(itemData) => <NewProduct item={itemData.item}></NewProduct>}
      ></FlatList>
    </ScrollView>
  )
}

export default HomeDisplay;

const styles = StyleSheet.create({
    title: {
        fontFamily: styling.fontFamily.goboldBold,
        fontSize: styling.fontSize.title,
        textAlign: 'center',
        marginVertical: 16,
    }
})