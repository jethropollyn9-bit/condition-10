import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const userQuery = req.body.query;

    const prompt = `
      You are a shopping assistant for a sneaker store. 
      Read the user's natural language request and convert it into a strictly formatted JSON object that matches our website's filters.
      
      Rules:
      - Only output valid JSON. No markdown formatting, no conversational text.
      - "brand" can be a specific brand name (e.g., "Nike", "Adidas") or "All".
      - "gender" must be exactly "Men", "Women", "Unisex", or "All".
      - "maxPrice" should be a number. If no price is mentioned, use 2000.
      - "searchQuery" should contain any descriptive keywords (e.g., "white", "casual", "high top"). If none, use an empty string "".

      User Request: "${userQuery}"

      Expected Output Format:
      {
        "brand": "Nike",
        "gender": "Men",
        "maxPrice": 150,
        "searchQuery": "white trainers"
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const filterData = JSON.parse(cleanJsonString);

    return res.status(200).json(filterData);

  } catch (error) {
    console.error("AI API Error:", error);
    return res.status(500).json({ message: "Failed to parse search query" });
  }
}