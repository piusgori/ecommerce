import { Modal, StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AlertDialogue from './AlertDialogue';
import { ModalContext } from '../../services/modal-context';

const ModalView = ({}) => {

  const { isOpen, message, onClose } = useContext(ModalContext);
  const { width } = useWindowDimensions();


  return (
    <Modal animationType='slide' visible={isOpen} transparent style={styles.modal}>
      <View style={styles.overallContainer}>
        <View style={styles.container(width, width - 75)}>
          <AlertDialogue message={message} onClose={onClose}></AlertDialogue>
        </View>
      </View>
    </Modal>
  )
}

export default ModalView;

const styles = StyleSheet.create({
  container: (height, width) => ({
    backgroundColor: 'white',
    padding: 24,
    height: height,
    width: width,
    alignSelf: 'center',
    elevation: 5,
    borderRadius: 25,
  }),
  overallContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099'
  }
})