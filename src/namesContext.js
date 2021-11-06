import { createContext } from 'react'

const NamesContext = createContext({
  names: [],
  setNames: () => {},
})

export default NamesContext