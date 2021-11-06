import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import NamesContext from '../namesContext'
import NamesStorage from '../utils/namesStorage'
import Button from './Button'
import Text from './Text'

const NamesList = () => {
  const namesContext = useContext(NamesContext)
  const storageUtil = new NamesStorage()

  useEffect(() => {
    const getNames = async () => {
      const storedNames = await storageUtil.getNames()
      namesContext.setNames(storedNames)
    }

    getNames()
  }, [])

  const handleAddName = async (name) => {
    console.log(`Adding ${name} to list...`)

    const newNames = await storageUtil.addName(name)
    namesContext.setNames(newNames)
  }

  const handleRemoveName = async (name) => {
    console.log(`Removing ${name} to list...`)

    const newNames = await storageUtil.removeName(name)
    namesContext.setNames(newNames)
  }

  return (
    <View>
      {namesContext.names.map((name, index) => <Text key={index}>{name}</Text>)}
      <Button text={'Add Name'} onPress={() => handleAddName('asdf')} />
      <Button text={'Remove Name'} onPress={() => handleRemoveName('asdf')} />
    </View>
  )
}

export default NamesList