import Song from "../models/Song.js";

/**
 * AIAssistantService Layer
 * Converts natural language user queries into validated, sanitized MongoDB filter schemas.
 * Prevents arbitrary database code execution by strictly enforcing a predefined filter schema.
 */
export class AIAssistantService {
  /**
   * Allowed filter keys and their validation rules
   */
  static ALLOWED_GENRES = [
    "Devotional", "Indian Classical", "International", "Folk", "Pop", "Rock",
    "Hip-hop", "Rap", "Jazz", "Blues", "Electronic", "Instrumental",
    "Meditation", "Lo-fi", "Bollywood", "Regional", "Independent", "Historical"
  ];

  static ALLOWED_ERAS = ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];

  /**
   * Parse natural language query into validated filter object
   * @param {string} prompt - e.g. "Give me peaceful Marathi songs from the 1990s"
   */
  static parsePromptToFilters(prompt) {
    if (!prompt || typeof prompt !== "string") {
      return {};
    }

    const text = prompt.toLowerCase();
    const filters = {};

    // 1. Language detection
    const languages = ["marathi", "hindi", "sanskrit", "tamil", "telugu", "kannada", "bengali", "english", "punjabi", "gujarati"];
    for (const lang of languages) {
      if (text.includes(lang)) {
        filters.language = lang.charAt(0).toUpperCase() + lang.slice(1);
        break;
      }
    }

    // 2. Era detection (1950s..2020s or 90s, 80s)
    for (const era of AIAssistantService.ALLOWED_ERAS) {
      const decadeNum = era.substring(0, 4); // "1990"
      const shortNum = era.substring(2, 4); // "90"
      if (text.includes(era) || text.includes(`${decadeNum}`) || text.includes(`${shortNum}s`)) {
        filters.era = era;
        break;
      }
    }

    // 3. Genre detection
    for (const g of AIAssistantService.ALLOWED_GENRES) {
      if (text.includes(g.toLowerCase())) {
        filters.genre = g;
        break;
      }
    }

    // 4. Mood detection
    const moods = ["peaceful", "calm", "energetic", "devotional", "meditative", "romantic", "nostalgic", "uplifting"];
    for (const m of moods) {
      if (text.includes(m)) {
        filters.mood = m.charAt(0).toUpperCase() + m.slice(1);
        break;
      }
    }

    // 5. Devotional categories
    const devotionalCategories = ["bhajan", "kirtan", "abhang", "aarti", "mantra", "pravachan"];
    for (const cat of devotionalCategories) {
      if (text.includes(cat)) {
        filters.genre = "Devotional";
        filters.activity = cat.charAt(0).toUpperCase() + cat.slice(1);
        break;
      }
    }

    return filters;
  }

  /**
   * Process natural language query and fetch validated results
   * @param {string} prompt
   * @param {number} [limit=10]
   */
  static async processNaturalQuery(prompt, limit = 10) {
    const rawFilters = this.parsePromptToFilters(prompt);
    
    // Strict schema validation step (sanitization)
    const mongoQuery = { status: "active" };

    if (rawFilters.language) mongoQuery.language = rawFilters.language;
    if (rawFilters.era && this.ALLOWED_ERAS.includes(rawFilters.era)) mongoQuery.era = rawFilters.era;
    if (rawFilters.genre && this.ALLOWED_GENRES.includes(rawFilters.genre)) mongoQuery.genre = rawFilters.genre;
    if (rawFilters.mood) mongoQuery.mood = new RegExp(rawFilters.mood, "i");
    if (rawFilters.activity) mongoQuery.activity = new RegExp(rawFilters.activity, "i");

    // Execute query securely
    const results = await Song.find(mongoQuery).limit(limit);

    return {
      userPrompt: prompt,
      validatedFilters: rawFilters,
      generatedMongoQuery: mongoQuery,
      count: results.length,
      songs: results
    };
  }
}
