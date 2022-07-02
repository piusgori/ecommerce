import { View, StyleSheet, useWindowDimensions, Animated } from 'react-native'
import React from 'react'
import { styling } from '../../constants/styles';

const Paginator = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
        const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
        })

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
        })

        return (
            <Animated.View key={i.toString()} style={[styles.dot, { width: dotWidth, opacity }]}></Animated.View>
        )
      }
      )}
    </View>
  )
}

export default Paginator;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 64,
        alignSelf: 'center',
        flex: 1,
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: styling.color.primary700,
        marginHorizontal: 8,
    }
})