import React, { useRef, useState } from 'react'
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import NextButton from '../components/welcome/NextButton';
import Paginator from '../components/welcome/Paginator';
import WelcomeItem from '../components/welcome/WelcomeItem';
import { slideShow } from '../constants/slides';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({ onViewed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const renderSlide = (itemData) => <WelcomeItem item={itemData.item}></WelcomeItem>
  const keyExtractor = (item) => item.id;
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {setCurrentIndex(viewableItems[0].index)}).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if(currentIndex < slideShow.length - 1){
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onViewed();
      try {
        await AsyncStorage.setItem('@viewedOnBoarding', 'true');
       } catch (err) {
        console.log('There is an error');
       }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList 
          bounces={false}
          contentContainerStyle={{height: '100%'}}
          data={slideShow} 
          horizontal 
          keyExtractor={keyExtractor} 
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          onViewableItemsChanged={viewableItemsChanged}
          pagingEnabled
          ref={slidesRef}
          renderItem={renderSlide}
          scrollEventThrottle={32}
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={viewConfig}
        ></FlatList>
      </View>
      <Paginator data={slideShow} scrollX={scrollX}></Paginator>
      <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slideShow.length)}></NextButton>
    </View>
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  listContainer: {
    flex: 5
  }
})