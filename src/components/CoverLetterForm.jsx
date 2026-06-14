import { useState } from 'react'
import { generateCoverLetter } from '../services/gemini.js'

function CoverLetterForm({ setLetter }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    skills: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const generatedLetter = await generateCoverLetter(formData)
      setLetter(generatedLetter)
      setFormData({
        name: '',
        role: '',
        company: '',
        skills: '',
      })
    } catch (error) {
      console.error('Error generating cover letter:', error)
      setError(
        error?.message || 'Failed to generate cover letter. Please try again.',
      )
      setLetter('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md mt-2 w-full"
    >
      <input
        type="text"
        name="name"
        placeholder="Candidate Name"
        className="w-full border p-3 mb-3 rounded"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="role"
        placeholder="Job Role"
        className="w-full border p-3 mb-3 rounded"
        value={formData.role}
        onChange={handleChange}
      />

      <input
        type="text"
        name="company"
        placeholder="Target Company"
        className="w-full border p-3 mb-3 rounded"
        value={formData.company}
        onChange={handleChange}
      />

      <textarea
        name="skills"
        placeholder="Skills"
        className="w-full border p-3 mb-3 rounded"
        rows="4"
        value={formData.skills}
        onChange={handleChange}
      />

      {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded w-full disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Cover Letter'}
      </button>
    </form>
  )
}

export default CoverLetterForm
