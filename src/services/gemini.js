const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
export async function generateCoverLetter(data) {
  const today = new Date().toLocaleDateString();
  const prompt = `
Generate a professional, ATS-friendly, properly formatted cover letter (plain text).

Date: ${today}
Recipient: Hiring Manager at ${data.company}
Greeting: Dear Hiring Manager,

Use the following details to write the letter.
Name: ${data.name}
Role: ${data.role}
Company: ${data.company}
Skills: ${data.skills}

Requirements:
- Include a short opening paragraph (1-2 sentences) that states the role and expresses interest.
- Include 1-2 body paragraphs describing relevant experience and achievements tied to the role.
- If skills are provided, include a short "Key Skills" bullet list (3-6 bullets).
- End with a concise closing paragraph and a signature line using the candidate's name.
- Keep the tone professional and concise; target 350-500 words.
- Output only the cover letter text with clear paragraph breaks and bullet lines (use hyphens for bullets). Do not include any commentary or metadata.

Make it ready-to-use for pasting into an email or document.
`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    }
  );

  const result = await response.json();

  console.log(result.choices[0].message.content);

  return result.choices[0].message.content;
}
