import { useState } from 'react'
import { generateCoverLetter } from '../services/gorq.js'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker
function CoverLetterForm({ setLetter }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    skills: '',
  })
  const [resume, setResume] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleResumeUpload(e) {
    const file = e.target.files[0]

    if (!file) return

    setResume(file)

    const arrayBuffer = await file.arrayBuffer()

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise

    let text = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)

      const content = await page.getTextContent()

      text += content.items.map((item) => item.str).join(' ')
    }

    setResumeText(text)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = { ...formData, resumeText: resumeText }
      const generatedLetter = await generateCoverLetter(data)
      setLetter(generatedLetter)
      setFormData({
        name: '',
        role: '',
        company: '',
        skills: '',
      })
      setResume(null)
      setResumeText('')
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
    <>
      <h1 className="mb-8 text-3xl font-bold uppercase bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
        fill details for AI Cover Letter Generator
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-transparent text-white p-8 rounded-xl shadow-md mt-2 w-[80%] mx-auto border border-gray-400 backdrop-blur-2xl"
        aria-busy={loading}
      >
        <label className="block mb-2 text-bold font-medium uppercase ">
          Candidate Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Candidate Name"
          className="w-full px-4 py-3 mb-3 rounded-xl border bg-transparent  border-gray-300  text-white text-semibold capitalize placeholder:text-gray-400 outline-none "
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
          disabled={loading}
        />

        <label className="block mb-2 text-bold font-medium uppercase ">
          Job Role
        </label>
        <input
          type="text"
          name="role"
          placeholder="Job Role"
          className="w-full px-4 py-3 mb-3 rounded-xl border bg-transparent  border-gray-300  text-white text-semibold capitalize placeholder:text-gray-400 outline-none "
          value={formData.role}
          onChange={handleChange}
          required
          autoComplete="organization-title"
          disabled={loading}
        />

        <label className="block mb-2 text-bold uppercase font-medium">
          Target Company
        </label>
        <input
          type="text"
          name="company"
          placeholder="Target Company"
          className="w-full px-4 py-3 mb-3 rounded-xl border border-gray-300  text-white text-semibold capitalize placeholder:text-gray-400 outline-none "
          value={formData.company}
          onChange={handleChange}
          required
          autoComplete="organization"
          disabled={loading}
        />

        <label className="block mb-2 text-bold uppercase font-medium">
          Skills (comma separated)
        </label>
        <textarea
          name="skills"
          placeholder="e.g., React, Node.js, SQL"
          className="w-full px-4 py-3 mb-3 rounded-xl border border-gray-300  text-white text-semibold capitalize placeholder:text-gray-400 outline-none "
          rows="4"
          value={formData.skills}
          onChange={handleChange}
          disabled={loading}
        />
        <div className="mb-3">
          <label className="block mb-2 font-medium">Upload Resume (PDF)</label>

          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeUpload}
            className="w-full border p-3 rounded"
          />

          {resume && (
            <p className="mt-2 text-green-600">Selected: {resume.name}</p>
          )}
        </div>
        {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded w-full disabled:opacity-60 cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Cover Letter'}
        </button>
      </form>
    </>
  )
}

export default CoverLetterForm
