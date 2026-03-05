"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (id: string) => void;
  isLoading: boolean;
}

const RECENT_KEY = "movie-insights-recent";
const MAX_RECENT = 5;

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_KEY);
      if (saved) setRecent(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const saveRecent = (id: string) => {
    const updated = [id, ...recent.filter((r) => r !== id)].slice(0, MAX_RECENT);
    setRecent(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();

    if (!trimmed) {
      setError("Please enter an IMDb ID");
      return;
    }

    if (!/^tt\d{7,}$/.test(trimmed)) {
      setError("Invalid format. Use IMDb ID like tt0133093");
      return;
    }

    setError("");
    saveRecent(trimmed);
    onSearch(trimmed);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="relative flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter IMDb ID (e.g., tt0133093)"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors duration-200 text-sm disabled:opacity-50"
          />
        </div>
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-3 rounded-xl bg-white text-black font-medium text-sm transition-colors duration-150 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Searching
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </>
          )}
        </motion.button>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-red-400 text-sm text-center"
        >
          {error}
        </motion.p>
      )}

      {recent.length > 0 && (
        <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-neutral-600 text-xs">Recent:</span>
          {recent.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => { setInput(id); saveRecent(id); onSearch(id); }}
              disabled={isLoading}
              className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-150 disabled:opacity-50"
            >
              {id}
            </button>
          ))}
        </div>
      )}
    </motion.form>
  );
}
