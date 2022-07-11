import { Text, StyleSheet, ScrollView, FlatList, VirtualizedList } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { styling } from '../../constants/styles';
import DiscountItem from './DiscountItem';
import NewProduct from './NewProduct';
import { StoreContext } from '../../services/store-context';

const HomeDisplay = () => {

  const { products } = useContext(StoreContext);
  const [newProducts, setNewProducts] = useState([]);

  const discountProducts = products.filter((product) => product.isDiscount);

  useLayoutEffect(() => {
    const allProducts = [];
    const sortedProducts = [];
    for (const a of products){
      a.dateAdded = new Date(a.createdAt).getTime();
      allProducts.push(a);
    }
    allProducts.sort((a, b) => b.dateAdded - a.dateAdded);
    if(allProducts.length > 10){
      for(let i = 0; i < 10; i++){
        sortedProducts.push(allProducts[i]);
      }
      setNewProducts(sortedProducts);
    } else {
      setNewProducts(allProducts);
    }
  }, [])


  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.title}>Discount Items</Text>
      <VirtualizedList
        data={discountProducts}
        bounces={false}
        horizontal 
        initialNumToRender={1}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={(itemData) => <DiscountItem item={itemData.item}></DiscountItem>}
        ListEmptyComponent={() => <Text style={styles.title}>There are no items yet</Text>}
      ></VirtualizedList>
      <Text style={styles.title}>New products</Text>
      <VirtualizedList
        data={newProducts}
        bounces={false}
        horizontal 
        getItemCount={(data) => data.length}
        initialNumToRender={1}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={(itemData) => <NewProduct item={itemData.item}></NewProduct>}
        ListEmptyComponent={() => <Text style={styles.title}>There are no items yet</Text>}
      ></VirtualizedList>
    </ScrollView>
  )
}

export default HomeDisplay;

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 200,
  },
    title: {
        fontFamily: styling.fontFamily.goboldBold,
        fontSize: styling.fontSize.title,
        textAlign: 'center',
        marginVertical: 16,
    }
})