import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import theme from '../theme'
import ViewHeading from './ViewHeading'
import Button from './Button'
import EntryStorage from '../utils/entryStorage'
import { useHistory } from 'react-router-native'
import EntryContext from '../entryContext'

const AddEntry = () => {
  const [name, setName] = useState('')
  const [multiplier, setMultiplier] = useState('1')
  const entryStorage = new EntryStorage()
  const entryContext = useContext(EntryContext)
  const nameInput = useRef()
  const multiplierInput = useRef()
  const history = useHistory()

  useEffect(() => {
    nameInput.current.focus()
  }, [])

  const handleSave = async () => {
    const multiplierNum = Number.parseInt(multiplier)

    if (name === '') {
      console.log('Please enter a name.')
      return
    } else if (multiplierNum <= 0) {
      console.log('Please enter a number greater than 0.')
      return
    }

    const newEntries = await entryStorage.addEntry(name, multiplier)
    entryContext.setEntries(newEntries)
    nameInput.current.blur()
    multiplierInput.current.blur()
    history.push('/')
  }

  return (
    <View>
      <ViewHeading title={'Add Entry'} />
      <View style={style.flexRowContainer}>
        <TextInput
          style={[style.input, style.nameInput]}
          placeholder={'Name'}
          returnKeyType={'done'}
          onChangeText={setName}
          ref={nameInput}
        />
        <TextInput
          style={[style.input, style.entriesInput]}
          placeholder={'# Entries'}
          keyboardType={'numeric'}
          returnKeyType={'done'}
          defaultValue={'1'}
          onChangeText={setMultiplier}
          ref={multiplierInput}
        />
      </View>
      <Button
        containerStyle={[style.button, style.saveButton]}
        text={'Save'}
        onPress={handleSave} />
      <Button
        containerStyle={[style.button, style.cancelButton]}
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
  button: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  cancelButton: {
    backgroundColor: theme.colors.darkBlue,
  },
})

export default AddEntry