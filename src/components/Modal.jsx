import React from 'react'
import { Modal as NativeModal, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Button from './Button';
import Text from './Text'

const Modal = ({
  isVisible,
  setIsVisible,
  onClose,
  message,
  showConfirm,
  onConfirm,
  ...props
}) => {
  const handleClose = () => {
    setIsVisible(false)
    if (onClose !== undefined) {
      onClose()
    }
  }

  const handleConfirm = () => {
    onConfirm()
    handleClose()
  }

  return (
    <NativeModal
      animationType={'slide'}
      transparent={true}
      visible={isVisible}
      {...props}
    >
      <View style={style.mainContainer}>
        <View style={style.messageContainer}>
          <View style={style.messageTextContainer}><Text style={style.messageText}>{message}</Text></View>
          {showConfirm && <Button containerStyle={style.confirmButton} text={'I’m sure'} onPress={handleConfirm} />}
          <Button containerStyle={style.closeButton} text={'Close'} onPress={handleClose} />
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
  },
  messageContainer: {
    width: 200,
    height: 200,
    display: 'flex',
    borderWidth: 1,
    borderRadius: theme.style.borderRadius,
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  messageTextContainer: {
    fontSize: theme.fontSizes.modal,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: theme.colors.pink,
  },
  closeButton: {
    backgroundColor: theme.colors.darkBlue,
    marginBottom: 0,
  },
})

export default Modal