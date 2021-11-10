import { useContext } from 'react'
import EntryContext from '../entryContext'
import EntryStorage from '../utils/entryStorage'

const useEntries = () => {
  const entryContext = useContext(EntryContext)
  const storageUtil = new EntryStorage()
  const entries = entryContext.entries

  const getEntries = async () => {
    const entries = await storageUtil.getEntries()
    entryContext.setEntries(entries)
  }

  const addEntry = async (name, multiplier) => {
    const entries = await storageUtil.addEntry(name, multiplier)
    entryContext.setEntries(entries)
  }

  const removeEntry = async (name) => {
    const entries = await storageUtil.removeEntry(name)
    entryContext.setEntries(entries)
  }

  const clearEntries = async () => {
    await storageUtil.clearEntries()
    entryContext.setEntries([])
  }

  return { entries, getEntries, addEntry, removeEntry, clearEntries }
}

export default useEntries