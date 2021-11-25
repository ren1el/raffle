import { useContext } from 'react'
import EntryContext from '../contexts/entryContext'
import EntryStorage from '../utils/entryStorage'

const useEntries = () => {
  const entryContext = useContext(EntryContext)
  const storageUtil = new EntryStorage()
  const entries = entryContext.entries

  const getEntries = async () => {
    const entries = await storageUtil.getEntries()
    entryContext.setEntries(entries)
  }

  const getEntry = (id) => {
    return entries.find((entry) => entry.id === id)
  }

  const addEntry = async (name, multiplier) => {
    const entries = await storageUtil.addEntry(name, multiplier)
    entryContext.setEntries(entries)
  }

  const removeEntry = async (name) => {
    const entries = await storageUtil.removeEntry(name)
    entryContext.setEntries(entries)
  }

  const editEntry = async (entry, changes) => {
    if (changes.name !== undefined && changes.name !== entry.name) {
      const entries = await storageUtil.editName(entry.name, changes.name)
      entryContext.setEntries(entries)
    }

    if (changes.multiplier !== undefined && changes.multiplier !== entry.multiplier) {
      const entries = await storageUtil.editMultiplier(entry.name, changes.multiplier)
      entryContext.setEntries(entries)
    }
  }

  const clearEntries = async () => {
    await storageUtil.clearEntries()
    entryContext.setEntries([])
  }

  return { entries, getEntries, getEntry, addEntry, removeEntry, editEntry, clearEntries }
}

export default useEntries