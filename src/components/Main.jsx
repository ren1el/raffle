import React from 'react'
import { StyleSheet, View } from 'react-native'
import theme from '../theme';
import { Route, Switch, Redirect } from 'react-router-native'
import AddEntry from './AddEntry';
import Logo from './Logo';
import Home from './Home';

const Main = () => {
  return (
    <View style={style.mainContainer}>
      <Logo />
      <View style={style.viewContainer}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/add-entry" exact>
            <AddEntry />
          </Route>
          <Redirect to="/" />
        </Switch>
      </View>
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
  viewContainer: {
    flex: 1,
  },
});

export default Main;