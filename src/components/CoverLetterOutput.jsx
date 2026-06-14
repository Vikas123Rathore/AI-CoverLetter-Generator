function CoverLetterOutput({ letter }) {
  function handleCopy() {
    navigator.clipboard
      .writeText(letter)
      .then(() => {
        alert('Cover letter copied to clipboard!')
      })
      .catch((err) => {
        alert('Failed to copy: ', err)
      })
  }

  return (
    <div className="bg-white mt-6 p-6 rounded-xl shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-xl">Generated Cover Letter</h2>

        <button
          onClick={handleCopy}
          className="bg-green-500 text-white px-4 py-2 rounded"
          type="button"
        >
          Copy
        </button>
      </div>

      {letter ? (
        <pre className="whitespace-pre-wrap text-slate-900 font-sans leading-5">
          {letter}
        </pre>
      ) : (
        <p className="text-slate-500">
          Your generated letter will appear here.
        </p>
      )}
    </div>
  )
}

export default CoverLetterOutput
