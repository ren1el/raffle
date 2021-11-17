import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import theme from '../theme'
import ViewHeading from './ViewHeading'
import Button from './Button'
import { useHistory } from 'react-router-native'
import useEntries from '../hooks/useEntries'
import Modal from './Modal'

const AddEntry = () => {
  const [name, setName] = useState('')
  const [multiplier, setMultiplier] = useState(0)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const { addEntry } = useEntries()
  const nameInput = useRef()
  const multiplierInput = useRef()
  const history = useHistory()

  useEffect(() => {
    nameInput.current.focus()
  }, [])

  const showErrorModal = (message) => {
    setModalMessage(message)
    setIsErrorModalVisible(true)
  }

  const handleSave = async () => {
    if (name === '') {
      showErrorModal('Please enter a name.')
      return
    } else if (multiplier <= 0) {
      showErrorModal('Please enter a number greater than 0.')
      return
    }

    try {
      await addEntry(name, multiplier)
    } catch(e) {
      showErrorModal('This name is already in the raffle.')
      return
    }

    nameInput.current.blur()
    multiplierInput.current.blur()
    history.push('/')
    setModalMessage('Entry saved successfully.')
    setIsSuccessModalVisible(true)
  }

  return (
    <View>
      <Modal
        isVisible={isErrorModalVisible}
        setIsVisible={setIsErrorModalVisible}
        message={modalMessage} />
      <Modal
        isVisible={isSuccessModalVisible}
        setIsVisible={setIsSuccessModalVisible}
        onClose={() => history.push('/')}
        message={modalMessage} />
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
          ref={multiplierInput}
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