import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import EntryContext from '../entryContext'
import EntryStorage from '../utils/entryStorage'
import Button from './Button'
import { useHistory } from 'react-router-native'
import EntryList from './EntryList'
import theme from '../theme'
import Text from './Text'

const Home = () => {
  const entryContext = useContext(EntryContext)
  const entryStorage = new EntryStorage()
  const history = useHistory()

  const handleClearEntries = async () => {
    if (entryContext.entries <= 0){
      return
    }

    await entryStorage.clearAllEntries()
    entryContext.setEntries([])
  }

  const handleChooseWinner = async () => {
    if (entryContext.entries <= 0) {
      return
    }
  }

  return (
    <View style={style.container}>
      {entryContext.entries.length > 0 ? <EntryList /> : <Text>No entries yet!</Text>}
      <View>
        <View style={style.addClearContainer}>
          <Button containerStyle={style.clearButton} text={'Clear'} onPress={() => handleClearEntries()} />
          <Button containerStyle={style.addButton} text={'Add'} onPress={() => history.push('/add-entry')} />
        </View>
        <Button
          text={'Choose a Winner'}
          onPress={handleChooseWinner}
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
})

export default Home