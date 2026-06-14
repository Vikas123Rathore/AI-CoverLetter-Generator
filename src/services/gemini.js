const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
console.log("API Key:", API_KEY);
export async function generateCoverLetter(data) {
  const prompt = `
Generate a professional ATS-friendly cover letter approx 500 words.

Name: ${data.name}
Role: ${data.role}
Company: ${data.company}
Skills: ${data.skills}

Make it professional and concise.
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
