import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Icon = ({ icon, size, color='black', onPress }) => {
  return (
    <Ionicons onPress={onPress} name={icon} size={size} color={color}></Ionicons>
  )
}

export default Icon;