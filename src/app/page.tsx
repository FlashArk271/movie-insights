"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import SentimentPanel from "@/components/SentimentPanel";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { MovieData, SentimentData } from "@/types";

export default function Home() {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (imdbId: string) => {
    setIsLoading(true);
    setError("");
    setMovie(null);
    setSentiment(null);

    try {
      const movieRes = await fetch(`/api/movie?id=${encodeURIComponent(imdbId)}`);
      const movieData = await movieRes.json();

      if (!movieRes.ok) {
        setError(movieData.error || "Failed to fetch movie");
        setIsLoading(false);
        return;
      }

      setMovie(movieData);

      const sentimentRes = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: movieData.title,
          year: movieData.year,
          imdbRating: movieData.imdbRating,
          plot: movieData.plot,
          genre: movieData.genre,
        }),
      });

      const sentimentData = await sentimentRes.json();
      if (sentimentRes.ok) {
        setSentiment(sentimentData);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            AI-Powered Movie Insights
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Movie <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Insights</span>
          </h1>
          <p className="mt-4 text-white/40 text-lg max-w-md mx-auto">
            Enter an IMDb ID to discover movie details and AI-analyzed audience sentiment
          </p>
        </motion.header>

        {/* Search */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-xl mx-auto mb-8"
            >
              <div className="px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-center">
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading */}
        {isLoading && <LoadingSkeleton />}

        {/* Results */}
        <AnimatePresence>
          {movie && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <MovieCard movie={movie} />
              {sentiment && <SentimentPanel sentiment={sentiment} />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!movie && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-20"
          >
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-white/20 text-lg">
              Search for a movie to get started
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                { id: "tt0133093", name: "The Matrix" },
                { id: "tt0111161", name: "Shawshank Redemption" },
                { id: "tt1375666", name: "Inception" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSearch(m.id)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 text-sm hover:bg-white/10 hover:text-white/60 transition-all duration-200"
                >
                  {m.name} <span className="text-white/20">{m.id}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
