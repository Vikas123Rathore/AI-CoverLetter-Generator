import { toast } from 'react-hot-toast'
import { jsPDF } from 'jspdf'
import ReactMarkdown from 'react-markdown'
function CoverLetterOutput({ letter }) {
  function handleCopy() {
    navigator.clipboard
      .writeText(letter)
      .then(() => {
        toast.success('Cover letter copied successfully!')
      })
      .catch((err) => {
        toast.error('Failed to copy cover letter. Please try again.')
      })
  }
  function downloadPDF() {
    const doc = new jsPDF()

    doc.setFont('times', 'normal')
    // doc.fontSize(12)
    const lines = doc.splitTextToSize(letter, 180)
    doc.text(lines, 10, 10)
    doc.save('cover-letter.pdf')
    toast.success('Cover letter downloaded as PDF successfully!')
  }
  return (
    <div className="bg-transparent text-white mt-6 p-6 rounded-xl shadow-md border-2 border-red-900">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-xl bg-linear-to-r from-slate-400 via-orange-300 to-purple-700 bg-clip-text text-transparent underline">
          Generated Cover Letter
        </h2>

        <button
          onClick={handleCopy}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          type="button"
        >
          Copy
        </button>
      </div>

      {letter ? (
        <div className="whitespace-pre-wrap bg-linear-to-r from-white via-green-300 to-white bg-clip-text text-transparent font-serif  leading-6">
          <ReactMarkdown>{letter}</ReactMarkdown>
        </div>
      ) : (
        <p className="text-slate-500">
          Your generated letter will appear here.
        </p>
      )}
      <button
        onClick={downloadPDF}
        disabled={!letter}
        className="bg-blue-500 mt-4 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        type="button"
      >
        Download PDF
      </button>
    </div>
  )
}

export default CoverLetterOutput
