# AI Cover Letter Generator

AI Cover Letter Generator is a modern React + Vite application that helps job seekers create polished, ATS-friendly cover letters from a few simple inputs. Users can enter their name, target role, company, and skills, upload a resume in PDF format, and generate a tailored cover letter powered by Groq's chat completion API.

## Features

- Generate professional cover letters with AI.
- Upload a PDF resume and extract text automatically.
- Copy the generated letter to the clipboard.
- Download the cover letter as a PDF.
- Clean, responsive interface built with React and Tailwind CSS.

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- Groq API
- pdfjs-dist for PDF text extraction
- jsPDF for PDF export
- react-hot-toast for notifications
- react-markdown for rendering formatted output

## Prerequisites

- Node.js 18 or newer
- npm or another compatible package manager
- A Groq API key

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add your Groq API key:

```bash
VITE_GROQ_API_KEY=your_groq_api_key_here
```

## Running the App

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Linting

Run ESLint to check the codebase:

```bash
npm run lint
```

## How It Works

1. Fill in your name, role, target company, and skills.
2. Upload a resume PDF to extract supporting details.
3. Submit the form to generate a tailored cover letter.
4. Review the result in the output panel.
5. Copy the letter or download it as a PDF.

## Project Structure

```text
src/
	App.jsx
	components/
		CoverLetterForm.jsx
		CoverLetterOutput.jsx
	services/
		gorq.js
```

## Notes

- The app expects `VITE_GROQ_API_KEY` to be available in the browser build environment.
- Resume uploads currently support PDF files only.
- Generated output is designed to be professional, concise, and ready to use in an application.

## License

No license has been specified for this project yet.
