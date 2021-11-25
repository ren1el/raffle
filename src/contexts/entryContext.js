import { createContext } from 'react'

const EntryContext = createContext({
  entries: [],
  setEntries: () => {},
})

export default EntryContext