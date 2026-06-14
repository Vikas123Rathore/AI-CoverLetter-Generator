import React from 'react'
import CoverLetterForm from './components/CoverLetterForm'
import CoverLetterOutput from './components/CoverLetterOutput'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const [letter, setLetter] = React.useState('')
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 p-6 bg-slate-900 ">
      <Toaster position="top-right" />
      <div className="w-full md:w-1/2 border-x-2 border-gray-700 ">
        <CoverLetterForm setLetter={setLetter} />
      </div>

      <div className="w-full md:w-1/2 mt-10">
        <CoverLetterOutput letter={letter} />
      </div>
    </div>
  )
}

export default App
