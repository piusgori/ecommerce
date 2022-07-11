import { View, Text, StyleSheet, useWindowDimensions, VirtualizedList } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { styling } from '../../constants/styles';
import { AdminProductsContext } from '../../services/admin-products-context';
import { ActivityIndicator } from 'react-native-paper';
import HomeAdminProduct from '../../components/home-admin/HomeAdminProduct';

const CategoryNameItemsScreen = ({ navigation, route }) => {
  const { isLoading, sortedProductsByCategory } = useContext(AdminProductsContext);
  const { width } = useWindowDimensions();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: route.params.category })
    const catProds = sortedProductsByCategory(route.params.category);
    setCategoryProducts(catProds);
  }, [])

  return (
    <View style={styles.container}>
      {isLoading && <View style={styles.loadingContainer}><ActivityIndicator size='large'></ActivityIndicator></View>}
      {!isLoading && <View style={styles.innerContainer}>
        <Text style={styles.title}>{route.params.category}</Text>
        {categoryProducts.length === 0 && <Text style={styles.text}>No products under this category yet</Text>}
        {categoryProducts.length > 0 && <View style={[styles.list, { width: width - 24 }]}><VirtualizedList
          data={categoryProducts}
          contentContainerStyle={{ paddingHorizontal: 8}}
          initialNumToRender={1}
          keyExtractor={(item) => item.id}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          renderItem={(itemData) => <HomeAdminProduct product={itemData.item}></HomeAdminProduct>}
        >
        </VirtualizedList></View>}
      </View>}
    </View>
  )
}

export default CategoryNameItemsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 24,
        alignItems: 'center',
    },
    innerContainer: {
      flex: 1,
      alignItems: 'center',
    },
    list: {
      marginVertical: 12,
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginVertical: 12,
      fontSize: styling.fontSize.title,
      fontFamily: styling.fontFamily.shandora,
    },
    title: {
        fontSize: styling.fontSize.title,
        fontFamily: styling.fontFamily.goboldBold,
        color: styling.color.primary700,
    }
})