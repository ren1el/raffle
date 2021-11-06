import React from 'react'
import Constants from 'expo-constants'
import { Text, StyleSheet, View } from 'react-native'
import theme from '../theme';
import Button from './Button';

const Main = () => {
  return (
    <View style={style.mainContainer}>
      <Text>
        <Text style={[style.heading, style.title]}>Raffle</Text>
        <Text style={[style.heading, style.period]}>.</Text>
      </Text>
      <View style={style.listContainer}>
        <Text>Main Content</Text>
      </View>
      <Button
        text={'Choose a Winner'}
        onPress={() => {console.log('pressed')}}
        containerStyle={style.button}
        textStyle={style.buttonText}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    marginTop: Constants.statusBarHeight,
    marginBottom: 50,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.offwhite,
    padding: 20,
  },
  heading: {
    fontWeight: theme.fontWeights.bold,
  },
  listContainer: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    color: theme.colors.pink,
    textTransform: 'lowercase',
  },
  period: {
    color: theme.colors.darkBlue,
    fontSize: 50,
  },
  button: {
    backgroundColor: theme.colors.pink,
    color: theme.colors.white,
  },
  buttonText: {
    color: theme.colors.white,
  },
});

export default Main;