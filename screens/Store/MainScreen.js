import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import CategoriesScroll from '../../components/home/CategoriesScroll';
import HomeDisplay from '../../components/home/HomeDisplay';
import { StoreContext } from '../../services/store-context';
import { ActivityIndicator } from 'react-native-paper';

const MainScreen = () => {

  const { isLoading, getProducts, getCategories } = useContext(StoreContext);

  useLayoutEffect(() => {
    const fetchingAllHandler = async () => {
      await getProducts();
      await getCategories();
    }
    fetchingAllHandler();
  }, [])

  return (
    <View style={styles.container}>
      {isLoading && <View style={styles.loadingContainer}><ActivityIndicator size='large'></ActivityIndicator></View>}
      {!isLoading && <View>
        <CategoriesScroll></CategoriesScroll>
        <HomeDisplay></HomeDisplay>
      </View>}
    </View>
  )
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})