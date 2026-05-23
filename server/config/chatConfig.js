/**
 * chatConfig.js
 * Centralized configuration for the Gemini Chatbot.
 */

/**
 * System prompt that defines the bot's persona, behavior rules, and response guidelines.
 * Supports markdown formatting (bold with **text**).
 * Keep under 500 tokens to leave room for conversation history.
 * Modifications affect ALL bot responses.
 */
const SYSTEM_PROMPT = `You are FitMart's expert fitness assistant.
Only answer questions related to: workouts, exercise routines, diet, nutrition, 
protein intake, weight loss, muscle gain, and supplements.
If the question is unrelated to fitness, politely redirect the user.
Keep answers concise, practical, and friendly. Use short paragraphs.
**Use bold text (surround important words with **) to highlight key information like numbers, recommendations, and important terms.**`;

/**
 * Keywords that trigger a product recommendation block to be appended to the bot's response.
 */
const PRODUCT_KEYWORDS = ["protein", "supplement", "muscle", "gain", "whey", "creatine", "mass"];

/**
 * Fallback responses categorized by topic. Used when the Gemini API quota is exceeded
 * or the service is temporarily unavailable.
 */
const FALLBACK_RESPONSES = {
  protein: "**For optimal protein intake**, aim for **1.6-2.2g per kg** of body weight daily. Good sources include **chicken breast (31g/100g)**, **eggs (6g each)**, **Greek yogurt (10g/100g)**, **lentils (9g/100g)**, and **quality whey protein**. Would you like me to recommend some protein supplements from our store?",
  workout: "**A balanced workout routine** should include: **3-4 strength training sessions** per week focusing on compound movements (**squats, deadlifts, bench press, rows**), plus **2-3 cardio sessions**. Start with **3 sets of 8-12 reps** for each exercise. Remember to **warm up for 5-10 minutes** and **cool down with stretching**!",
  weightLoss: "**For sustainable weight loss**: Create a **moderate calorie deficit (300-500 calories below maintenance)**, **prioritize protein intake (1.6-2g per kg body weight)**, combine **strength training with cardio**, get **7-9 hours of sleep**, and **stay hydrated**. Aim for **0.5-1kg loss per week** for healthy results.",
  muscleGain: "**For muscle gain**: Consume a **slight calorie surplus (200-300 above maintenance)**, eat **1.6-2.2g protein per kg body weight**, focus on **progressive overload** in your training, get **adequate sleep (7-9 hours)**, and **stay consistent** with your workouts. **Compound exercises** like **squats, deadlifts, and bench press** are key!",
  generic: "I'm here to help with your fitness journey! Feel free to ask about **workouts**, **nutrition**, **protein intake**, **weight loss**, or **muscle gain**. What specific aspect of fitness would you like to know more about?"
};

/**
 * Determines the correct fallback response based on keywords in the user's message.
 */
const getFallbackResponse = (message) => {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("protein")) return FALLBACK_RESPONSES.protein;
  if (lowerMsg.includes("workout") || lowerMsg.includes("exercise")) return FALLBACK_RESPONSES.workout;
  if (lowerMsg.includes("weight loss")) return FALLBACK_RESPONSES.weightLoss;
  if (lowerMsg.includes("muscle") || lowerMsg.includes("gain")) return FALLBACK_RESPONSES.muscleGain;
  
  return FALLBACK_RESPONSES.generic;
};

/**
 * Formats a product object into a standardized markdown recommendation string.
 */
const PRODUCT_TEMPLATE = (product) => {
  let text = "\n\n**💪 Recommended Products**\n";
  text += "**" + product.name + "**";

  if (product.brand) {
    text += " **by** **" + product.brand + "**";
  }

  if (product.price) {
    text += " **— ₹" + product.price.toLocaleString("en-IN") + "**";
  }

  if (product.rating) {
    text += " **(⭐" + product.rating + "/5)**";
  }

  return text;
};

module.exports = {
  SYSTEM_PROMPT,
  PRODUCT_KEYWORDS,
  FALLBACK_RESPONSES,
  getFallbackResponse,
  PRODUCT_TEMPLATE
};
