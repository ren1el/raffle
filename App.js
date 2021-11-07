import React, { useState } from 'react'
import Main from './src/components/Main'
import EntryContext from './src/entryContext'

const App = () => {
  const [entries, setEntries] = useState([])
  const contextValue = { entries, setEntries }

  return (
    <EntryContext.Provider value={contextValue}>
      <Main />
    </EntryContext.Provider>
  )
}

export default App