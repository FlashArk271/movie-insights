"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-3xl mx-auto space-y-4"
    >
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 shrink-0">
            <div className="aspect-[2/3] bg-neutral-800 animate-pulse" />
          </div>
          <div className="flex-1 p-6 md:p-8 space-y-4">
            <div className="h-8 w-3/4 bg-neutral-800 rounded-lg animate-pulse" />
            <div className="flex gap-2">
              <div className="h-5 w-14 bg-neutral-800 rounded animate-pulse" />
              <div className="h-5 w-16 bg-neutral-800 rounded animate-pulse" />
              <div className="h-5 w-12 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-neutral-800 rounded animate-pulse" />
              <div className="h-3.5 w-5/6 bg-neutral-800 rounded animate-pulse" />
              <div className="h-3.5 w-4/6 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="flex gap-1.5">
              <div className="h-7 w-20 bg-neutral-800 rounded-md animate-pulse" />
              <div className="h-7 w-24 bg-neutral-800 rounded-md animate-pulse" />
              <div className="h-7 w-18 bg-neutral-800 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-36 bg-neutral-800 rounded animate-pulse" />
          <div className="h-6 w-20 bg-neutral-800 rounded-md animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-3.5 w-full bg-neutral-800 rounded animate-pulse" />
          <div className="h-3.5 w-5/6 bg-neutral-800 rounded animate-pulse" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-6 w-24 bg-neutral-800 rounded-md animate-pulse" />
          <div className="h-6 w-28 bg-neutral-800 rounded-md animate-pulse" />
          <div className="h-6 w-20 bg-neutral-800 rounded-md animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
