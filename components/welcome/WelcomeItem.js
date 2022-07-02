import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { styling } from '../../constants/styles';


const WelcomeItem = ({ item }) => {
    const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width, height }]}>
        <View style={[styles.image, { width: width * 0.9, height: '40%' }]}>
            <LottieView autoPlay loop resizeMode='contain' key='animation' source={item.image}></LottieView>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    </View>
  )
}

export default WelcomeItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontSize: styling.fontSize.smallTitle,
        color: styling.color.gray500,
        fontFamily: styling.fontFamily.shandoraz,
        textAlign: 'center',
        paddingHorizontal: 64,
    },
    detailsContainer: {
        flex: 0.3
    },
    image: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    title: {
        fontSize: styling.fontSize.title,
        fontFamily: styling.fontFamily.goboldBold,
        color: styling.color.primary500,
        textAlign: 'center'
    },
})