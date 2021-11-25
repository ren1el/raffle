import React, { useState } from 'react'
import { NativeRouter } from 'react-router-native'
import Main from './src/components/Main'
import EntryContext from './src/contexts/entryContext'

const App = () => {
  const [entries, setEntries] = useState([])
  const contextValue = { entries, setEntries }

  return (
    <EntryContext.Provider value={contextValue}>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </EntryContext.Provider>
  )
}

export default App