import React from 'react'
import { Modal as NativeModal, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Button from './Button';
import Text from './Text'

const Modal = ({ isVisible, setIsVisible, onClose, message, ...props }) => {
  const handleClose = () => {
    setIsVisible(false)
    if (onClose !== undefined) {
      onClose()
    }
  }

  return (
    <NativeModal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {setIsVisible(!isVisible)}}
      {...props}
    >
      <View style={style.mainContainer}>
        <View style={style.messageContainer}>
          <Text style={style.messageText}>{message}</Text>
          <Button style={style.closeButton} text={'Close'} onPress={handleClose} />
        </View>
      </View>
    </NativeModal>
  )
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  messageContainer: {
    width: 200,
    height: 200,
    position: 'relative',
    top: -50,
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: theme.style.borderRadius,
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  messageText: {
    textAlign: 'center',
    fontSize: theme.fontSizes.subheading,
    marginBottom: 30,
  },
  closeButton: {},
})

export default Modal