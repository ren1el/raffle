import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import EntryContext from '../entryContext'
import EntryStorage from '../utils/entryStorage'
import Button from './Button'
import Text from './Text'

const EntryList = () => {
  const entryContext = useContext(EntryContext)
  const entryStorage = new EntryStorage()

  useEffect(() => {
    const getEntries = async () => {
      const storedEntries = await entryStorage.getEntries()
      entryContext.setEntries(storedEntries)
    }

    getEntries()
  }, [])

  const handleAddEntry = async (entry) => {
    const updatedEntries = await entryStorage.addEntry(entry, 1)
    entryContext.setEntries(updatedEntries)
  }

  const handleRemoveEntry = async (entry) => {
    const updatedEntries = await entryStorage.removeEntry(entry)
    entryContext.setEntries(updatedEntries)
  }

  const handleClearEntries = async () => {
    await entryStorage.clearAllEntries()
    entryContext.setEntries([])
  }

  return (
    <View>
      {entryContext.entries.map(entry => <Text key={entry.name}>{entry.name} {entry.multiplier}</Text>)}
      <Button text={'Add Name'} onPress={() => handleAddEntry('asdf')} />
      <Button text={'Remove Name'} onPress={() => handleRemoveEntry('asdf')} />
      <Button text={'Clear Names'} onPress={() => handleClearEntries()} />
    </View>
  )
}

export default EntryList