import React from 'react'
import { StyleSheet, Text as NativeText } from 'react-native'
import theme from '../theme'

const Text = ({ style, ...props }) => {
  return <NativeText style={[defaultStyle.text, style]} {...props} />
}

const defaultStyle = StyleSheet.create({
  text: {
    fontSize: 16,
    color: theme.colors.darkBlue,
  },
})

export default Text