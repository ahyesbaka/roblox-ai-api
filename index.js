import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();

// Allow all origins so Roblox can call your API
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Test endpoint to check if Roblox can reach the server
app.get("/test", (req, res) => {
  res.send("API is reachable!");
});

// Main AI endpoint
app.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a cheerful, friendly character like Moondrop Daycare. Always answer politely, warmly, and with excitement."
        },
        { role: "user", content: prompt }
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AI API running on port ${PORT}`));
