"use client";

import { motion } from "framer-motion";
import { SentimentData } from "@/types";

interface SentimentPanelProps {
  sentiment: SentimentData;
}

const classificationConfig = {
  positive: {
    label: "Positive",
    badge: "bg-emerald-950/50 text-emerald-400 border-emerald-900/40",
    tag: "bg-emerald-950/40 text-emerald-400 border-emerald-900/30",
  },
  mixed: {
    label: "Mixed",
    badge: "bg-amber-950/50 text-amber-400 border-amber-900/40",
    tag: "bg-amber-950/40 text-amber-400 border-amber-900/30",
  },
  negative: {
    label: "Negative",
    badge: "bg-red-950/50 text-red-400 border-red-900/40",
    tag: "bg-red-950/40 text-red-400 border-red-900/30",
  },
};

export default function SentimentPanel({ sentiment }: SentimentPanelProps) {
  const config = classificationConfig[sentiment.classification];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full max-w-3xl mx-auto mt-4"
    >
      <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 md:p-8">
        {/* Header */}
          <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-medium bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Sentiment Analysis</h3>
            <p className="text-neutral-600 text-xs mt-0.5">via Groq AI</p>
          </div>
          <span className={`px-3 py-1 rounded-md border text-xs font-medium uppercase tracking-wider ${config.badge}`}>
            {config.label}
          </span>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-blue-400/60 mb-1.5">
              Audience Sentiment
            </h4>
            <p className="text-neutral-300 leading-relaxed text-sm">{sentiment.sentimentSummary}</p>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-blue-400/60 mb-1.5">
              Key Highlights
            </h4>
            <p className="text-neutral-400 leading-relaxed text-sm">{sentiment.audienceHighlights}</p>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-blue-400/60 mb-2">
              Key Themes
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {sentiment.keyThemes.map((theme, i) => (
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className={`px-2.5 py-1 rounded-md border text-xs ${config.tag}`}
                >
                  {theme}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-800">
            <h4 className="text-xs font-medium uppercase tracking-wider text-blue-400/60 mb-1.5">
              Recommended For
            </h4>
            <p className="text-neutral-500 text-sm">{sentiment.recommendedFor}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
