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
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-5 py-16 md:py-24">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
            Movie Insights
          </h1>
          <p className="mt-3 text-neutral-500 text-base max-w-sm mx-auto">
            Enter an IMDb ID to get movie details and audience sentiment
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
              <div className="px-5 py-4 rounded-xl bg-red-950/40 border border-red-900/30 text-red-400 text-center text-sm">
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
            <p className="text-neutral-600 text-sm">
              Try one of these:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {[
                { id: "tt0133093", name: "The Matrix" },
                { id: "tt0111161", name: "Shawshank Redemption" },
                { id: "tt1375666", name: "Inception" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSearch(m.id)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 text-sm hover:bg-neutral-800 hover:text-neutral-300 transition-colors duration-150"
                >
                  {m.name} <span className="text-neutral-600">{m.id}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
