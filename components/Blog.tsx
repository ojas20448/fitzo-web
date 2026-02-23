/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Blog Section
 * Fitness tips and articles (placeholder)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight, Clock } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const blogPosts = [
  {
    title: "Protein ki Puri? — Indian Foods High in Protein",
    excerpt: "Discover traditional Indian foods that are packed with protein. From chana to paneer, we break down the macros.",
    category: "Nutrition",
    readTime: "5 min",
    date: "Coming Soon",
    featured: true,
  },
  {
    title: "Beginner's Guide to the Gym in India",
    excerpt: "Walking into a gym for the first time can be intimidating. Here's everything you need to know to start strong.",
    category: "Training",
    readTime: "8 min",
    date: "Coming Soon",
    featured: false,
  },
  {
    title: "Why Sleep Matters More Than You Think",
    excerpt: "Indian lifestyle often overlooks recovery. Here's the science behind sleep and muscle growth.",
    category: "Recovery",
    readTime: "6 min",
    date: "Coming Soon",
    featured: false,
  },
];

export default function Blog() {
  return (
    <section id="blog" className="relative py-16 sm:py-24 bg-black">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-neutral-500 border border-white/[0.06] mb-6">
              <FileText className="w-3 h-3" />
              Blog
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              Fitness Tips<br />
              <span className="text-neutral-500">& Insights</span>
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Featured Post */}
          <motion.article
            variants={fadeUp}
            className="lg:col-span-2 glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                {blogPosts[0].category}
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <Clock className="w-3 h-3" />
                {blogPosts[0].readTime}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
              {blogPosts[0].title}
            </h3>
            <p className="text-neutral-400 mb-4">{blogPosts[0].excerpt}</p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
              Read more <ArrowRight className="w-4 h-4" />
            </span>
          </motion.article>

          {/* Side Posts */}
          <div className="flex flex-col gap-4">
            {blogPosts.slice(1).map((post) => (
              <motion.article
                key={post.title}
                variants={fadeUp}
                className="glass-card rounded-xl p-5 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group cursor-pointer flex-1"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded-full text-[9px] font-semibold bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-neutral-600">
                    <Clock className="w-2.5 h-2.5" />
                    {post.readTime}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-neutral-500 line-clamp-2">{post.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Mobile View All */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 sm:hidden text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-green-950/20 to-transparent border border-green-500/10 text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20 mb-4">
            🚀 Coming Soon
          </span>
          <h3 className="text-xl font-bold text-white mb-2">More Content On The Way</h3>
          <p className="text-neutral-400 max-w-lg mx-auto">
            We&apos;re working on detailed guides, workout plans, nutrition tips, and success stories from the Fitzo community. Stay tuned!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
