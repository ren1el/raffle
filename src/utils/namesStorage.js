import AsyncStorage from '@react-native-async-storage/async-storage';

class NamesStorage {
  constructor(namespace = 'names') {
    this.key = `${namespace}:names`
  }

  async getNames() {
    const names = await AsyncStorage.getItem(this.key)

    return names ? names.split(',') : []
  }

  async addName(name) {
    const storedNames = await this.getNames()
    const newNames = storedNames.concat(name)
    await AsyncStorage.setItem(this.key, newNames.toString())

    return newNames
  }

  async removeName(name) {
    const storedNames = await this.getNames()
    const nameIndex = storedNames.indexOf(name)

    if (nameIndex === -1) {
      console.log(`Tried removing ${name} but it wasn't found`)

      return storedNames
    }

    const newNames = storedNames.filter((storedName, index) => index !== nameIndex)
    await AsyncStorage.setItem(this.key, newNames.toString())

    return newNames
  }
}

export default NamesStorage;