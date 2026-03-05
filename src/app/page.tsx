"use client";

import { useState, useRef, useEffect } from "react";
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
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setMovie(null);
    setSentiment(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  useEffect(() => {
    if (movie && !isLoading && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [movie, isLoading]);

  return (
    <main className="min-h-screen">
      {/* Subtle top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-900/40 to-transparent" />

      <div className="max-w-3xl mx-auto px-5 py-16 md:py-24">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <button onClick={handleReset} className="focus:outline-none group">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-neutral-300 transition-all duration-300">
              Movie Insights
            </h1>
          </button>
          <p className="mt-3 text-neutral-500 text-sm max-w-xs mx-auto leading-relaxed">
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
              ref={resultsRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 scroll-mt-8"
            >
              {/* Back button */}
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleReset}
                className="flex items-center gap-1.5 text-neutral-500 hover:text-white text-sm transition-colors duration-150 mb-2 group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                New search
              </motion.button>
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
