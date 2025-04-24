import React from 'react'
import BasicViewer from './page/BasicViewer'
import { WindCardDetailsProvider } from './context/WindCardDetailsProvider'



function App() {


  return (
    <>
    <WindCardDetailsProvider>
    <BasicViewer/>
    </WindCardDetailsProvider>
    </>
  )
}

export default App
