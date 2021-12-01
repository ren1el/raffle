import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import useEntries from '../hooks/useEntries'
import theme from '../theme'
import Button from './Button'
import Text from './Text'

const Winner = () => {
  const [winner, setWinner] = useState({ id: 0, name: '', multiplier: 0 })
  const { entries, editEntry } = useEntries()

  useEffect(() => {
    chooseWinner()
  }, [])

  const decreaseMultiplier = async (winner) => {
    await editEntry(winner, { multiplier: winner.multiplier - 1 })
  }

  const chooseWinner = async () => {
    if (entries.length <= 0) {
      return
    }
    const flatEntries = []

    entries.forEach(entry => {
      for (let i = 0; i < entry.multiplier; ++i) {
        flatEntries.push(entry)
      }
    })

    shuffle(flatEntries)

    const winner = flatEntries[Math.floor(Math.random() * flatEntries.length)]
    setWinner(winner)
    await decreaseMultiplier(winner)
  }

  const shuffle = (array) => {
    let i = array.length

    while (i-- >= 0) {
      const randomI = Math.floor(Math.random() * i);
      [array[i], array[randomI]] = [array[randomI], array[i]];
    }

    return array;
  }

  return (
    <View style={style.container}>
      <View style={style.contentContainer}>
        <Text style={style.announcementText}>And the winner is...</Text>
        <Text style={style.winnerText}>{winner.name}!</Text>
        <Text style={style.announcementText}>Congratulations!</Text>
      </View>
      <Button
        containerStyle={{ alignSelf: 'stretch' }}
        text={'Choose another winner'}
        onPress={chooseWinner}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  announcementText: {
    fontSize: theme.fontSizes.heading,
  },
  winnerText: {
    fontSize: theme.fontSizes.logo,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 25,
  },
})

export default Winner