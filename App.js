import React, { useState } from 'react'
import Main from './src/components/Main'
import NamesContext from './src/namesContext'

const App = () => {
  const [names, setNames] = useState([])
  const contextValue = { names, setNames }

  return (
    <NamesContext.Provider value={contextValue}>
      <Main />
    </NamesContext.Provider>
  )
}

export default App