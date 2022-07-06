import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CategoriesScroll from '../../components/home/CategoriesScroll';
import HomeDisplay from '../../components/home/HomeDisplay';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <CategoriesScroll></CategoriesScroll>
      <HomeDisplay></HomeDisplay>
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
  }
})