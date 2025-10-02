import express from "express";
import axios from "axios";

const router = express.Router();

// Simple in-memory context (for one user / dev mode)
// 👉 For multi-user deployment, store per user in DB or Redis
let lastContext = { intent: null, category: null };

// Chat endpoint
router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // 1️⃣ Send user message to AI service
    const aiResponse = await axios.post("http://127.0.0.1:5001/analyze", {
      text: userMessage,
    });

    let { intent, entities, category, region, reply } = aiResponse.data;

    // 2️⃣ If AI already has a reply (small talk or fallback) → return it directly
    if (reply) {
      return res.json({
        reply,
        data: null,
      });
    }

    // 3️⃣ Handle follow-up questions with context
    if (intent === "general_query" && lastContext.intent) {
      // Reuse last intent/category if new one is too vague
      intent = lastContext.intent;
      category = lastContext.category;
    }

    // 4️⃣ Save context if user gave us a clear query
    if (intent === "category_search" || intent === "general_attractions") {
      lastContext = { intent, category };
    }

    // 5️⃣ Handle category-based search
    if (intent === "category_search") {
      const queryCategory = category || "";
      const queryRegion = region || "Singapore";

      const attractionsResponse = await axios.get(
        "http://localhost:5000/api/attractions/category",
        {
          params: { region: queryRegion, category: queryCategory },
        }
      );

      const attractions = attractionsResponse.data;
      const topAttractions = attractions.slice(0, 3);

      if (topAttractions.length === 0) {
        return res.json({
          reply: `Hmm, I couldn’t find any ${queryCategory} in ${queryRegion}. Try asking about a different place!`,
          data: [],
        });
      }

      let formattedReply = `Here are some ${queryCategory || "attractions"} you can check out in ${queryRegion}:\n\n`;
      topAttractions.forEach((a, idx) => {
        formattedReply += `${idx + 1}. ${a.name}`;
        if (a.location) formattedReply += ` — 📍 ${a.location}`;
        if (a.description && a.description.length > 10) {
          formattedReply += `\n   ${a.description}`;
        }
        formattedReply += `\n\n`;
      });

      return res.json({
        reply: formattedReply.trim(),
        data: topAttractions,
      });
    }

    // 6️⃣ Handle general attractions search
    if (intent === "general_attractions") {
      let attractionsResponse;

      if (region) {
        // Case: Region specified
        attractionsResponse = await axios.get(
          "http://localhost:5000/api/attractions/category",
          { params: { region } }
        );
      } else {
        // Case: No region → all Singapore
        attractionsResponse = await axios.get(
          "http://localhost:5000/api/attractions"
        );
      }

      const attractions = attractionsResponse.data;
      const randomAttractions = attractions
        .sort(() => 0.5 - Math.random()) // shuffle
        .slice(0, 3);

      if (randomAttractions.length === 0) {
        return res.json({
          reply: region
            ? `I couldn’t find any attractions in ${region}. Try another region!`
            : "I couldn’t find any attractions in Singapore right now.",
          data: [],
        });
      }

      let formattedReply = region
        ? `Here are a few attractions you can check out around ${region}:\n\n`
        : `Here are a few attractions you can explore across Singapore:\n\n`;

      randomAttractions.forEach((a, idx) => {
        formattedReply += `${idx + 1}. ${a.name}`;
        if (a.location) formattedReply += ` — 📍 ${a.location}`;
        if (a.description && a.description.length > 10) {
          formattedReply += `\n   ${a.description}`;
        }
        formattedReply += `\n\n`;
      });

      return res.json({
        reply: formattedReply.trim(),
        data: randomAttractions,
      });
    }

    // 7️⃣ Fallback if nothing else matches
    res.json({
      reply: `🤔 I didn’t fully understand that. Intent: ${intent}, Category: ${category || "N/A"}, Region: ${region || "N/A"}`,
      data: null,
    });
  } catch (error) {
    console.error("AI service error:", error.message);
    res.status(500).json({ error: "AI service unavailable" });
  }
});

export default router;
