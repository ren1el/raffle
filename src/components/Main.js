import React from 'react'
import Constants from 'expo-constants'
import { Text, StyleSheet, View } from 'react-native'
import theme from '../theme';

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>
          <Text style={[styles.heading, styles.title]}>Raffle</Text>
          <Text style={[styles.heading, styles.period]}>.</Text>
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.offwhite,
    padding: 20,
  },
  heading: {
    fontWeight: theme.fontWeights.bold,
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
});

export default Main;