import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import ArticleCard from "@/components/blog/ArticleCard";
import Link from "next/link";
import FitzoLogo from "@/components/FitzoLogo";
import { ArrowLeft } from "lucide-react";
import { getBlogListSchema, getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Blog — Fitness, Nutrition & Training Articles",
  description:
    "Science-backed fitness, nutrition, and training articles for Indian lifters. Learn about workout splits, macro tracking, supplements, and more.",
  alternates: {
    canonical: "https://fitzo.app/blog",
  },
  openGraph: {
    title: "Fitzo Blog — Science-Backed Fitness Articles",
    description:
      "Expert articles on training, nutrition, supplements, and building a stronger version of yourself. Written for Indian lifters.",
    type: "website",
    url: "https://fitzo.app/blog",
    siteName: "Fitzo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitzo Blog — Science-Backed Fitness Articles",
    description:
      "Expert articles on training, nutrition, supplements, and building a stronger version of yourself.",
    creator: "@fitzoapp",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  const breadcrumbs = [
    { name: "Home", url: "https://fitzo.app" },
    { name: "Blog", url: "https://fitzo.app/blog" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogListSchema(posts)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-black/[0.04] dark:border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <FitzoLogo size="sm" />
          </Link>
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-600">Blog</span>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 pt-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-[12px] text-neutral-400">
          <li><Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link></li>
          <li>/</li>
          <li className="text-neutral-600 dark:text-neutral-500">Blog</li>
        </ol>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Page Header */}
        <div className="mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium bg-black/[0.04] dark:bg-white/[0.04] text-neutral-500 border border-black/[0.06] dark:border-white/[0.06] mb-6">
            Articles
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            The Fitzo Blog
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl">
            Science-backed articles on training, nutrition, and building a
            stronger version of yourself.
          </p>
        </div>

        {/* Featured Post */}
        {featured && (
          <div className="mb-8">
            <ArticleCard post={featured} featured />
          </div>
        )}

        {/* Rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
