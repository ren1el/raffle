import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import theme from '../theme'
import ViewHeading from './ViewHeading'
import Button from './Button'
import { useHistory } from 'react-router-native'
import useEntries from '../hooks/useEntries'
import Modal from './Modal'
import { EntryExistsError } from '../errors'

const AddEntry = () => {
  const [name, setName] = useState('')
  const [multiplier, setMultiplier] = useState(0)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const { addEntry } = useEntries()
  const nameInput = useRef()
  const history = useHistory()

  useEffect(() => {
    nameInput.current.focus()
  }, [])

  const showErrorModal = (message) => {
    setModalMessage(message)
    setIsErrorModalVisible(!isErrorModalVisible)
  }

  const showSuccessModal = (message) => {
    setModalMessage(message)
    setIsSuccessModalVisible(!isSuccessModalVisible)
  }

  const handleSave = async () => {
    if (name === '') {
      showErrorModal('Please enter a name.')
      return
    } else if (isNaN(multiplier)) {
      showErrorModal('Please enter a valid number.')
      return
    } else if (multiplier <= 0) {
      showErrorModal('Please enter a number greater than 0.')
      return
    }

    try {
      await addEntry(name, multiplier)
      showSuccessModal('Entry saved successfully.')
    } catch(e) {
      if (e instanceof EntryExistsError) {
        showErrorModal('This name is already in the raffle.')
      } else {
        showErrorModal('An unexpected error occurred.')
      }
    }
  }

  return (
    <View>
      <Modal
        isVisible={isErrorModalVisible}
        setIsVisible={setIsErrorModalVisible}
        message={modalMessage}
      />
      <Modal
        isVisible={isSuccessModalVisible}
        setIsVisible={setIsSuccessModalVisible}
        onClose={() => history.push('/')}
        message={modalMessage}
      />
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
          onChangeText={(value) => {value === '' ? setMultiplier(0) : setMultiplier(Number.parseInt(value))}}
        />
      </View>
      <Button
        text={'Save'}
        onPress={handleSave} />
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

export default AddEntry