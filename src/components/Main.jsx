import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import theme from '../theme';
import { Route, Switch, Redirect } from 'react-router-native'
import AddEntry from './AddEntry';
import Logo from './Logo';
import Home from './Home';
import EditEntry from './EditEntry';
import useEntries from '../hooks/useEntries';
import Winner from './Winner';

const Main = () => {
  const { getEntries } = useEntries()

  useEffect(() => {
    const getStoredEntries = async () => {await getEntries()}
    getStoredEntries()
  })

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
          <Route path="/winner" exact>
            <Winner />
          </Route>
          <Route path="/edit-entry/:id" exact>
            <EditEntry />
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