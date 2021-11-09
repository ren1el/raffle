import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { useHistory } from 'react-router-native'
import theme from '../theme'
import Text from './Text'

const Logo = () => {
  const history = useHistory()

 return (
    <Pressable style={style.container} onPress={() => history.push('/')}>
      <Text style={[style.heading, style.title]}>Raffle</Text>
      <Text style={[style.heading, style.period]}>.</Text>
    </Pressable>
 )
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  heading: {
    fontSize: theme.fontSizes.logo,
    marginBottom: 20,
  },
  title: {
    color: theme.colors.pink,
    fontWeight: theme.fontWeights.bold,
    textTransform: 'lowercase',
  },
  period: {
    color: theme.colors.darkBlue,
    fontWeight: theme.fontWeights.bolder,
  },
})

export default Logo