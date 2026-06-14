import React from 'react'
import CoverLetterForm from './components/CoverLetterForm'
import CoverLetterOutput from './components/CoverLetterOutput'

const App = () => {
  const [letter, setLetter] = React.useState('')
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 p-6 bg-gray-400">
      <div className="w-full md:w-1/2">
        <CoverLetterForm setLetter={setLetter} />
      </div>

      <div className="w-full md:w-1/2">
        <CoverLetterOutput letter={letter} />
      </div>
    </div>
  )
}

export default App
