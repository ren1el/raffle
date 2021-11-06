import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import NamesContext from '../namesContext'
import Text from './Text'

const NamesList = () => {
  const namesContext = useContext(NamesContext)

  useEffect(() => {
    namesContext.setNames(namesContext.names.concat(['asdf']))
  }, [])

  return (
    <View>
      {namesContext.names.map((name, index) => <Text key={index}>{name}</Text>)}
    </View>
  )
}

export default NamesList