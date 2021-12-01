import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from './Button'
import { useHistory } from 'react-router-native'
import EntryList from './EntryList'
import theme from '../theme'
import Text from './Text'
import useEntries from '../hooks/useEntries'
import Modal from './Modal'

const Home = () => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const { entries, clearEntries } = useEntries()
  const history = useHistory()

  const handleClearEntries = async () => {
    if (entries <= 0){
      return
    }

    await clearEntries()
  }

  const handleChooseWinner = async () => {
    if (entries.length <= 0) {
      return
    }

    history.push('/winner')
  }

  const handleClearPressed = () => {
    if (entries.length > 0) {
      setIsConfirmModalVisible(!isConfirmModalVisible)
    }
  }

  return (
    <View style={style.container}>
      <Modal
        isVisible={isConfirmModalVisible}
        setIsVisible={setIsConfirmModalVisible}
        message={'Are you sure want to clear all of the entries?'}
        showConfirm
        onConfirm={() => handleClearEntries()}
      />
      {entries.length > 0 ? <EntryList /> : <NoEntries />}
      <View>
        <View style={style.addClearContainer}>
          <Button
            containerStyle={style.clearButton}
            text={'Clear'}
            onPress={handleClearPressed}
          />
          <Button
            containerStyle={style.addButton}
            text={'Add'}
            onPress={() => history.push('/add-entry')}
          />
        </View>
        <Button
          text={'Choose a Winner'}
          onPress={handleChooseWinner}
        />
      </View>
    </View>
  )
}

const NoEntries = () => {
  return (
    <View style={style.noEntriesContainer}>
      <Text>You have no entries yet!</Text>
      <Text style={{ textAlign: 'center' }}>Press the Add button below to add your first entry.</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  addClearContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: theme.colors.cyan,
    flex: 1,
  },
  clearButton: {
    backgroundColor: theme.colors.darkBlue,
    flex: 1,
    marginRight: 10,
  },
  noEntriesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home