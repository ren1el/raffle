import AsyncStorage from '@react-native-async-storage/async-storage';
import { EntryDoesNotExistError, EntryAlreadyExistsError } from '../errors';

// ex. stored array (as str)
// [
//   {
//     id: 143242,
//     name: "user1",
//     multiplier: 1,
//   },
//   {
//     id: 243242,
//     name: "user2",
//     multiplier: 4,
//   },
//   {
//     id: 313426,
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
      const errMsg = `Tried adding ${name} but they have already been stored`
      console.log(errMsg)
      throw new EntryAlreadyExistsError(errMsg)
    }

    storedEntries.push({
      id: new Date().valueOf().toString(),
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
      const errMsg = `Tried removing ${name} but they couldn't be found`
      console.log(errMsg)
      throw new EntryDoesNotExistError(errMsg)
    }

    const updatedEntries = storedEntries.filter(storedEntry => storedEntry.name !== name)
    await AsyncStorage.setItem(this.key, JSON.stringify(updatedEntries))
    return updatedEntries
  }

  async editName(name, newName) {
    const storedEntries = await this.getEntries()
    const entryIndex = storedEntries.findIndex(storedEntry => storedEntry.name === name)

    if (entryIndex < 0) {
      console.log(`Tried editing ${name} to ${newName} but they couldn't be found.`)
      return storedEntries
    }

    storedEntries[entryIndex].name = newName
    await AsyncStorage.setItem(this.key, JSON.stringify(storedEntries))
    return storedEntries
  }

  async editMultiplier(name, newMultiplier) {
    const storedEntries = await this.getEntries()
    const entryIndex = storedEntries.findIndex(storedEntry => storedEntry.name === name)

    if (entryIndex < 0) {
      console.log(`Tried editing ${name}'s number of entries to ${newMultiplier} but they couldn't be found.`)
      return storedEntries
    }

    storedEntries[entryIndex].multiplier = newMultiplier
    await AsyncStorage.setItem(this.key, JSON.stringify(storedEntries))
    return storedEntries
  }

  async clearEntries() {
    console.log('Clearing all entries')
    await AsyncStorage.setItem(this.key, '[]')
  }
}

export default EntryStorage;