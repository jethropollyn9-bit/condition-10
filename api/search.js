import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const userQuery = req.body.query;

    const prompt = `
      You are a shopping assistant for a sneaker store. 
      Read the user's natural language request and convert it into a JSON object.
      
      Rules:
      - "brand": A specific brand name (e.g., "Nike", "Adidas", "New Balance") or "All".
      - "gender": Exactly "Men", "Women", "Unisex", or "All".
      - "maxPrice": A number. If no price is mentioned, use 2000.
      - "searchQuery": Extract the core descriptive keywords as a single space-separated string. 
        CRITICAL: If the user asks for an abstract style (e.g., "casual", "workout", "hype"), DO NOT output the abstract word. Instead, translate it into tangible models, materials, or brands that fit that vibe (e.g., output "Samba", "New Balance", "canvas", or "Jordan"). 
        DO NOT include filler words like "shoes", "pair", or "looking for". If no specific descriptor is found, use an empty string "".
      - CRITICAL: DO NOT include filler words, pronouns, or conjunctions like "and", "with", "shoes", "sneakers", "pair", or "show me". If no specific descriptor is found, use an empty string "".

      User Request: "${userQuery}"
      
      Example Output:
      {
        "brand": "All",
        "gender": "All",
        "maxPrice": 2000,
        "searchQuery": "black yellow"
      }
    `;

    const result = await model.generateContent(prompt);
    
    const filterData = JSON.parse(result.response.text());

    return res.status(200).json(filterData);

  } catch (error) {
    console.error("AI API Error:", error);
    return res.status(500).json({ message: "Failed to parse search query" });
  }
}