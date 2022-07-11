import { View, Text, StyleSheet, useWindowDimensions, VirtualizedList } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { styling } from '../../constants/styles';
import { AdminProductsContext } from '../../services/admin-products-context';
import { ActivityIndicator } from 'react-native-paper';
import Category from '../../components/home-admin/Category';

const AdminCategoriesScreen = ({ navigation }) => {

  const { categories, isLoading, getCategories } = useContext(AdminProductsContext);
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    const gettingCategoriesHandler = async () => {
      await getCategories();
    }
    gettingCategoriesHandler();
  }, [])

  const navigateToCategory = () => {
    navigation.navigate('CreateCategory');
  }

  return (
    <View style={styles.container}>
      {isLoading && <View style={styles.loadingContainer}><ActivityIndicator size='large'></ActivityIndicator></View>}
      {!isLoading && <View style={styles.innerContainer}>
        <Text style={styles.title}>Categories</Text>
        {categories.length === 0 && <Text style={styles.text}>No categories added yet</Text>}
        {categories.length === 0 && <Text style={styles.belowText}>Cannot See a category? <Text onPress={navigateToCategory} style={styles.addText}>Add One.</Text></Text>}
        {categories.length > 0 && <View style={[styles.list, { width: width - 24 }]}>
          <VirtualizedList
            data={categories}
            bounces={false}
            contentContainerStyle={{ paddingHorizontal: 8}}
            showsVerticalScrollIndicator={false}
            initialNumToRender={1}
            keyExtractor={(item) => item.id}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            renderItem={(itemData) => <Category category={itemData.item}></Category>}
            ListFooterComponent={() => <Text style={styles.belowText}>Cannot See a category? <Text onPress={navigateToCategory} style={styles.addText}>Add One.</Text></Text>}
          >
          </VirtualizedList>
        </View>}
      </View>}
    </View>
  )
}

export default AdminCategoriesScreen;

const styles = StyleSheet.create({
  addText: {
    fontSize: styling.fontSize.mediumTitle,
    fontFamily: styling.fontFamily.shandora,
    color: styling.color.primary500
  },
  belowText: {
    fontSize: styling.fontSize.mediumTitle,
    fontFamily: styling.fontFamily.shandora,
  },
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
    alignItems: 'center',
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