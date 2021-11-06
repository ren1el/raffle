import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import theme from '../theme';

const Button = ({ text, onPress, containerStyle, textStyle }) => {
  return (
    <Pressable onPress={onPress} style={[defaultStyle.button, containerStyle]}>
      <Text style={[defaultStyle.text, textStyle]}>
        {text}
      </Text>
    </Pressable>
  )
}

const defaultStyle = StyleSheet.create({
  button: {
    borderRadius: theme.style.borderRadius,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.button,
  },
})

export default Button