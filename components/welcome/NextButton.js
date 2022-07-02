import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Svg, { Circle, G } from 'react-native-svg';
import { styling } from '../../constants/styles';
import { AntDesign } from '@expo/vector-icons';

const NextButton = ({ percentage, scrollTo }) => {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, { toValue, duration: 250, useNativeDriver: true }).start();
    }

    useEffect(() => {
        animation(percentage)
    }, [percentage])

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100;
            if(progressRef?.current){
                progressRef.current.setNativeProps({ strokeDashoffset })
            }
        }, [percentage])
        return () => {
            progressAnimation.removeAllListeners()
        }
    }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation='-90' origin={center}>
            <Circle stroke={styling.color.white50} cx={center} cy={center} r={radius} strokeWidth={strokeWidth}></Circle>
            <Circle ref={progressRef} stroke={styling.color.primary700} cx={center} cy={center} r={radius} strokeWidth={strokeWidth} strokeDasharray={circumference}></Circle>
        </G>
      </Svg>
      <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
        <AntDesign name='arrowright' size={30} color={styling.color.white100}></AntDesign>
      </TouchableOpacity>
    </View>
  )
}

export default NextButton;

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        backgroundColor: styling.color.primary700,
        borderRadius: 100,
        padding: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})