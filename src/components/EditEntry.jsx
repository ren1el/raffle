import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useParams, useHistory } from 'react-router-native'
import useEntries from '../hooks/useEntries'
import theme from '../theme'
import Button from './Button'
import ViewHeading from './ViewHeading'

const EditEntry = () => {
  const params = useParams()
  const { getEntry, editEntry } = useEntries()
  const entry = getEntry(params.id)

  if (entry === undefined) {
    history.push('/')
    return
  }

  const [name, setName] = useState(entry.name)
  const [multiplier, setMultiplier] = useState(entry.multiplier)
  const history = useHistory()
  const nameInput = useRef()
  const multiplierInput = useRef()

  useEffect(() => {
    nameInput.current.focus()
  }, [])

  const handleEdit = async () => {
    if (name === '') {
      console.log('Please enter a name.')
      return
    } else if (multiplier <= 0) {
      console.log('Please enter a number greater than 0.')
      return
    }

    await editEntry(entry, { name, multiplier: multiplier })
    history.push('/')
  }

  return (
    <View>
      <ViewHeading title={`Edit ${entry.name}'s Entry`} />
      <View style={style.flexRowContainer}>
        <TextInput
          style={[style.input, style.nameInput]}
          placeholder={'Name'}
          returnKeyType={'done'}
          onChangeText={setName}
          ref={nameInput}
          defaultValue={name} />
        <TextInput
          style={[style.input, style.entriesInput]}
          placeholder={'# Entries'}
          keyboardType={'numeric'}
          returnKeyType={'done'}
          onChangeText={(value) => {value === '' ? setMultiplier(0) : setMultiplier(Number.parseInt(value))}}
          ref={multiplierInput}
          defaultValue={entry.multiplier.toString()} />
      </View>
      <Button
        text={'Save'}
        onPress={handleEdit} />
      <Button
        containerStyle={style.cancelButton}
        text={'Cancel'}
        onPress={() => history.push('/')} />
    </View>
  )
}

const style = StyleSheet.create({
  flexRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 2,
  },
  nameInput: {
    flex: 2,
    marginRight: 5,
    borderColor: theme.colors.darkBlue,
  },
  entriesInput: {
    flex: 1,
    borderColor: theme.colors.pink,
  },
  cancelButton: {
    backgroundColor: theme.colors.darkBlue,
  },
})

export default EditEntry