import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { styling } from '../../constants/styles';
import CategoryItem from './CategoryItem';
import { StoreContext } from '../../services/store-context';

const CategoriesScroll = () => {

  const { categories } = useContext(StoreContext);
  const [popularCategories, setPopularCategories] = useState([]);

  useLayoutEffect(() => {
    const firstCategories = [];
    if(categories.length > 6) {
      for(let i = 0; i < 6; i++){
        firstCategories.push(categories[i]);
        setPopularCategories(firstCategories);
      }
    } else {
      setPopularCategories(categories);
    }
  }, [])

  return (
    <View>
      <Text style={styles.topTitle}>Popular Categories</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.categoriesContainer}>
        {popularCategories.map((category) => <CategoryItem key={category.id} category={category}></CategoryItem>)}
      </ScrollView>
    </View>
  )
}

export default CategoriesScroll;

const styles = StyleSheet.create({
    categoriesContainer: {
        paddingVertical: 18,
    },
    topTitle: {
        fontSize: styling.fontSize.smallTitle,
        fontFamily: styling.fontFamily.gobold,
    }
})