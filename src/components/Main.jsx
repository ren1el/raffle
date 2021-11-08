import React from 'react'
import { StyleSheet, View } from 'react-native'
import theme from '../theme';
import Button from './Button';
import Text from './Text';
import EntryList from './EntryList';

const Main = () => {
  return (
    <View style={style.mainContainer}>
      <Text style={style.heading}>
        <Text style={style.title}>Raffle</Text>
        <Text style={style.period}>.</Text>
      </Text>
      <View style={style.listContainer}>
        <EntryList />
      </View>
      <Button
        text={'Choose a Winner'}
        onPress={() => {console.log('pressed')}}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    marginTop: 30,
    marginBottom: 30,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.offwhite,
    padding: 20,
  },
  heading: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 15,
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
});

export default Main;