import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Icon = ({ icon, size, color='black' }) => {
  return (
    <Ionicons name={icon} size={size} color={color}></Ionicons>
  )
}

export default Icon;