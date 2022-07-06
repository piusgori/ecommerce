import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { styling } from '../../constants/styles';
import CategoryItem from './CategoryItem';
import { categories } from '../../constants/categories';

const CategoriesScroll = () => {
  return (
    <View>
      <Text style={styles.topTitle}>Popular Categories</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.categoriesContainer}>
        {categories.map((category) => <CategoryItem key={category.id} category={category}></CategoryItem>)}
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