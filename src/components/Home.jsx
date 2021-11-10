import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import EntryContext from '../entryContext'
import EntryStorage from '../utils/entryStorage'
import Button from './Button'
import { useHistory } from 'react-router-native'
import EntryList from './EntryList'

const Home = () => {
  const entryContext = useContext(EntryContext)
  const entryStorage = new EntryStorage()
  const history = useHistory()

  useEffect(() => {
    const getEntries = async () => {
      const storedEntries = await entryStorage.getEntries()
      entryContext.setEntries(storedEntries)
    }

    getEntries()
  }, [])

  const handleClearEntries = async () => {
    await entryStorage.clearAllEntries()
    entryContext.setEntries([])
  }

  return (
    <View style={style.container}>
      <EntryList />
      <View>
        <Button text={'Add Entry'} onPress={() => history.push('/add-entry')} />
        <Button text={'Clear Names'} onPress={() => handleClearEntries()} />
        <Button
          text={'Choose a Winner'}
          onPress={() => {console.log('pressed')}}
        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
})

export default Home