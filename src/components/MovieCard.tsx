"use client";

import { motion } from "framer-motion";
import { MovieData } from "@/types";
import Image from "next/image";

interface MovieCardProps {
  movie: MovieData;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Poster */}
          {movie.poster && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full md:w-64 shrink-0"
            >
              <div className="relative aspect-[2/3] max-h-80 md:max-h-none md:aspect-auto md:h-full mx-auto w-52 md:w-full">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover rounded-lg md:rounded-none"
                  sizes="(max-width: 768px) 208px, 256px"
                  unoptimized
                />
              </div>
            </motion.div>
          )}

          {/* Details */}
          <div className="flex-1 p-6 md:p-8 space-y-4">
            <div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent"
              >
                {movie.title}
              </motion.h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
                <span className="text-neutral-400">{movie.year}</span>
                <span className="text-neutral-700">·</span>
                <span className="text-amber-400 font-medium">★ {movie.imdbRating}</span>
                {movie.rated !== "N/A" && (
                  <>
                    <span className="text-neutral-700">·</span>
                    <span className="text-neutral-500">{movie.rated}</span>
                  </>
                )}
                <span className="text-neutral-700">·</span>
                <span className="text-neutral-500">{movie.runtime}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5">
              {movie.genre.split(", ").map((g, i) => (
                <motion.span
                  key={g}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="px-2.5 py-1 rounded-md bg-neutral-800/80 text-neutral-400 text-xs border border-neutral-700/30"
                >
                  {g}
                </motion.span>
              ))}
            </div>

            {/* Plot */}
            <p className="text-neutral-400 leading-relaxed text-sm">
              {movie.plot}
            </p>

            <div className="h-px bg-neutral-800" />

            {/* Cast */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-blue-400/60 mb-2">
                Cast
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {movie.actors.split(", ").map((actor, i) => (
                  <motion.span
                    key={actor}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className="px-2.5 py-1 rounded-md bg-neutral-800/80 text-neutral-300 text-sm border border-neutral-700/30"
                  >
                    {actor}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Director */}
            <div className="h-px bg-neutral-800" />

            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-blue-400/60 text-xs uppercase tracking-wider">Director</span>
                <p className="text-neutral-300 mt-1">{movie.director}</p>
              </div>
              {movie.boxOffice && movie.boxOffice !== "N/A" && (
                <div>
                  <span className="text-blue-400/60 text-xs uppercase tracking-wider">Box Office</span>
                  <p className="text-neutral-300 mt-1">{movie.boxOffice}</p>
                </div>
              )}
              {movie.awards !== "N/A" && (
                <div>
                  <span className="text-blue-400/60 text-xs uppercase tracking-wider">Awards</span>
                  <p className="text-neutral-300 mt-1">{movie.awards}</p>
                </div>
              )}
            </div>

            {/* Ratings */}
            {movie.ratings.length > 0 && (
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-blue-400/60 mb-3">
                  Ratings
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {movie.ratings.map((r, i) => (
                    <motion.div
                      key={r.Source}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      className="px-3 py-2.5 rounded-lg bg-neutral-800/60 border border-neutral-800/80"
                    >
                      <p className="text-neutral-500 text-xs truncate">{r.Source}</p>
                      <p className="text-white font-medium mt-0.5 text-sm">{r.Value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
