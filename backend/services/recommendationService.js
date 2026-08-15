import Song from "../models/Song.js";
import ListeningHistory from "../models/ListeningHistory.js";

/**
 * RecommendationService Abstraction Layer
 * Standard interface for song recommendation engine.
 * Transparent rule-based implementation, designed so a machine-learning model
 * can replace it in the future without changing caller signatures.
 */
export class RecommendationService {
  /**
   * Get personalized song recommendations for a user
   * @param {Object} params
   * @param {string} params.userId - MongoDB user ID
   * @param {string[]} [params.preferredGenres]
   * @param {string[]} [params.preferredLanguages]
   * @param {string} [params.mood]
   * @param {string} [params.activity]
   * @param {number} [params.limit=10]
   */
  static async getRecommendations({ userId, preferredGenres = [], preferredLanguages = [], mood, activity, limit = 10 }) {
    try {
      let queryFilters = {};

      // 1. If user has listening history, derive top genres & un-skipped preferences
      if (userId) {
        const history = await ListeningHistory.find({ userId, skipped: false })
          .sort({ playedAt: -1 })
          .limit(20)
          .populate("songId");

        const historyGenres = history
          .map((h) => h.songId?.genre)
          .filter(Boolean);

        const combinedGenres = [...new Set([...preferredGenres, ...historyGenres])];
        if (combinedGenres.length > 0) {
          queryFilters.genre = { $in: combinedGenres };
        }
      } else if (preferredGenres.length > 0) {
        queryFilters.genre = { $in: preferredGenres };
      }

      if (preferredLanguages.length > 0) {
        queryFilters.language = { $in: preferredLanguages };
      }

      if (mood) {
        queryFilters.mood = new RegExp(mood, "i");
      }

      if (activity) {
        queryFilters.activity = new RegExp(activity, "i");
      }

      // Fetch top matching songs sorted by popularity (playsCount & likesCount)
      let recommended = await Song.find(queryFilters)
        .sort({ playsCount: -1, likesCount: -1 })
        .limit(limit);

      // Fallback: If no matches, return overall popular songs
      if (!recommended || recommended.length === 0) {
        recommended = await Song.find({ status: "active" })
          .sort({ playsCount: -1 })
          .limit(limit);
      }

      return {
        engine: "RuleBasedEngine-v1",
        count: recommended.length,
        recommendations: recommended
      };
    } catch (error) {
      console.error("RecommendationService Error:", error);
      throw error;
    }
  }
}
