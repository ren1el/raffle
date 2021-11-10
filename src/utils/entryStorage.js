import AsyncStorage from '@react-native-async-storage/async-storage';

// ex. stored array (as str)
// [
//   {
//     name: "user1",
//     multiplier: 1,
//   },
//   {
//     name: "user2",
//     multiplier: 4,
//   },
//   {
//     names: "user3",
//     multiplier: 1,
//   },
// ]

class EntryStorage {
  constructor(namespace = 'entries') {
    this.key = `${namespace}:entries`
  }

  async getEntries() {
    const entries = await AsyncStorage.getItem(this.key)

    return entries ? JSON.parse(entries): []
  }

  async addEntry(name, multiplier) {
    console.log(`Adding ${name} (x${multiplier}) to entry list...`)
    const storedEntries = await this.getEntries()
    const isStored = storedEntries.some(storedEntry => storedEntry.name === name)

    if (isStored) {
      console.log(`Tried adding ${name} but they have already been stored`)
      return storedEntries
    }

    storedEntries.push({
      name: name,
      multiplier: multiplier,
    })

    await AsyncStorage.setItem(this.key, JSON.stringify(storedEntries))
    return storedEntries
  }

  async removeEntry(name) {
    console.log(`Removing ${name} from entry list...`)
    const storedEntries = await this.getEntries()
    const isStored = storedEntries.some(storedEntry => storedEntry.name === name)

    if (!isStored) {
      console.log(`Tried removing ${name} but they couldn't be found`)
      return storedEntries
    }

    const updatedEntries = storedEntries.filter(storedEntry => storedEntry.name !== name)
    await AsyncStorage.setItem(this.key, JSON.stringify(updatedEntries))
    return updatedEntries
  }

  async clearEntries() {
    console.log('Clearing all entries')
    await AsyncStorage.setItem(this.key, '[]')
  }
}

export default EntryStorage;