import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { useHistory } from 'react-router-native'
import { EntryDoesNotExistError } from '../errors'
import useEntries from '../hooks/useEntries'
import theme from '../theme'
import Modal from './Modal'
import Text from './Text'

const EntryList = () => {
  const { entries } = useEntries()

  return (
    <View style={style.container}>
      <View style={style.row}>
        <Text style={[style.column, style.columnHeader]}>{'Name'}</Text>
        <Text style={[style.column, style.centerColumn, style.columnHeader]}>{'Entries'}</Text>
        <Text style={[style.column, style.centerColumn, style.columnHeader]}>{'Edit'}</Text>
        <Text style={[style.column, style.centerColumn, style.columnHeader]}>{'Remove'}</Text>
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
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const history = useHistory()
  const { removeEntry } = useEntries()

  const showErrorModal = (message) => {
    setModalMessage(message)
    setIsErrorModalVisible(!isErrorModalVisible)
  }

  const handleRemoveEntry = async () => {
    try {
      await removeEntry(entry.name)
    } catch(e) {
      if (e instanceof EntryDoesNotExistError) {
        showErrorModal('This entry does not exist.')
      } else {
        showErrorModal('An unexpected error occurred.')
      }
    }
  }

  return (
    <View style={style.row}>
      <Modal
        isVisible={isConfirmModalVisible}
        setIsVisible={setIsConfirmModalVisible}
        message={`Are you sure you want to remove ${entry.name}’s entry?`}
        showConfirm
        onConfirm={handleRemoveEntry}
      />
      <Modal
        isVisible={isErrorModalVisible}
        setIsVisible={setIsErrorModalVisible}
        message={modalMessage}
      />
      <Text style={[style.column, style.name]}>{entry.name}</Text>
      <Text style={[style.column, style.centerColumn]}>{entry.multiplier}</Text>
      <Pressable style={style.column} onPress={() => {history.push(`/edit-entry/${entry.id}`)}}>
        <Text style={style.centerColumn}>{'Edit'}</Text>
      </Pressable>
      <Pressable style={style.column} onPress={() => {setIsConfirmModalVisible(!isConfirmModalVisible)}}>
        <Text style={style.centerColumn}>{'Remove'}</Text>
      </Pressable>
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