import React from 'react'
import { StyleSheet } from 'react-native'
import theme from '../theme'
import Text from './Text'

const ViewHeading = ({ title }) => {
  return (
    <Text style={style.heading}>
      {title}
    </Text>
  )
}

const style = StyleSheet.create({
  heading: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 25,
    color: theme.colors.cyan,
  },
})

export default ViewHeading