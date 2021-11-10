import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import useEntries from '../hooks/useEntries'
import theme from '../theme'
import Text from './Text'

const EntryList = () => {
  const { entries } = useEntries()

  return (
    <View style={style.container}>
      <View style={style.row}>
        <Text style={[style.column, style.columnHeader]}>{'Name'}</Text>
        <Text style={[style.column, style.centerColumn, style.columnHeader]}>{'Entries'}</Text>
        <Text style={[style.column, style.centerColumn, style.columnHeader]}>{'Edit'}</Text>
      </View>
      <FlatList
        style={style.list}
        data={entries}
        renderItem={({ item }) => <Entry entry={item} />}
        keyExtractor={item => item.name}
      />
    </View>
  )
}

const Entry = ({ entry }) => {
  return (
    <View style={style.row}>
      <Text style={[style.column, style.name]}>{entry.name}</Text>
      <Text style={[style.column, style.centerColumn]}>{entry.multiplier}</Text>
      <Text style={[style.column, style.centerColumn]}>{'Edit'}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1,
  },
  list: {
    height: '50%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.subheading,
  },
  centerColumn: {
    textAlign: 'center',
  },
  name: {
    color: theme.colors.cyan,
    fontWeight: 'bold',
  },
})

export default EntryList