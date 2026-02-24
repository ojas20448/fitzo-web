"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import type { BlogPost } from "@/lib/blog";

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function ArticleCard({ post, featured = false }: ArticleCardProps) {
  return (
    <motion.div variants={fadeUp}>
      <Link href={`/blog/${post.slug}`} className="block group">
        <div
          className={`glass-card p-6 sm:p-8 hover:border-black/[0.12] dark:hover:border-white/[0.12] transition-all duration-500 ${
            featured ? "sm:p-10" : ""
          }`}
        >
          {/* Category + Read Time */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-black/[0.04] dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400 border border-black/[0.04] dark:border-white/[0.04]">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-600">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-bold group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors mb-3 ${
              featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-[15px] text-neutral-500 leading-relaxed mb-4">
            {post.description}
          </p>

          {/* Date + Arrow */}
          <div className="flex items-center justify-between">
            <time dateTime={post.date} className="text-xs text-neutral-500 dark:text-neutral-600">
              {new Date(post.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="flex items-center gap-1 text-sm text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors">
              Read
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
