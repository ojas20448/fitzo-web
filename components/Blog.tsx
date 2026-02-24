/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Blog Section (Homepage)
 * Dynamically loads from /content/blog
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { getAllPosts } from "@/lib/blog";
import { FileText, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default function Blog() {
  const allPosts = getAllPosts();
  const featured = allPosts.find((p) => p.featured) || allPosts[0];
  const sidePosts = allPosts.filter((p) => p.slug !== featured?.slug).slice(0, 2);

  if (!featured) return null;

  return (
    <section id="blog" className="relative py-16 sm:py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-black/[0.04] dark:bg-white/[0.04] text-neutral-500 border border-black/[0.06] dark:border-white/[0.06] mb-6">
              <FileText className="w-3 h-3" />
              Blog
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              Fitness Tips<br />
              <span className="text-neutral-500">& Insights</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            View all {allPosts.length} posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            <Link href={`/blog/${featured.slug}`} className="block group">
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.06] hover:border-black/[0.12] dark:hover:border-white/[0.12] transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-neutral-500">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                  {featured.title}
                </h3>
                <p className="text-neutral-400 dark:text-neutral-400 mb-4">{featured.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>

          {/* Side Posts */}
          <div className="flex flex-col gap-4">
            {sidePosts.map((post) => (
              <div key={post.slug} className="flex-1">
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <div className="glass-card rounded-xl p-5 border border-black/[0.06] dark:border-white/[0.06] hover:border-black/[0.12] dark:hover:border-white/[0.12] transition-all duration-300 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 rounded-full text-[9px] font-semibold bg-black/[0.04] dark:bg-white/[0.04] text-neutral-400 border border-black/[0.06] dark:border-white/[0.06]">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-neutral-500 dark:text-neutral-600">
                        <Clock className="w-2.5 h-2.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h4 className="text-base font-bold mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2">{post.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            View all {allPosts.length} posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
