import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/ai", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: userMessage }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.json({ reply: "Server error." });
  }
});

app.listen(10000, () => console.log("AI API running on port 10000"));
