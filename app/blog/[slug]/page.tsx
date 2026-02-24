import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/blog/MDXComponents";
import Link from "next/link";
import FitzoLogo from "@/components/FitzoLogo";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/structured-data";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `https://fitzo.app/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: "Fitzo" }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      url,
      siteName: "Fitzo",
      authors: ["Fitzo"],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@fitzoapp",
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category || true)
    .slice(0, 3);

  const breadcrumbs = [
    { name: "Home", url: "https://fitzo.app" },
    { name: "Blog", url: "https://fitzo.app/blog" },
    { name: post.title, url: `https://fitzo.app/blog/${post.slug}` },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-black/[0.04] dark:border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <FitzoLogo size="sm" />
          </Link>
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
            {post.category}
          </span>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <nav className="max-w-3xl mx-auto px-4 sm:px-6 pt-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-[12px] text-neutral-400">
          <li><Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:text-black dark:hover:text-white transition-colors">Blog</Link></li>
          <li>/</li>
          <li className="text-neutral-600 dark:text-neutral-500 truncate max-w-[200px]">{post.title}</li>
        </ol>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Article Header */}
        <div className="mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold bg-black/[0.04] dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400 border border-black/[0.04] dark:border-white/[0.04] mb-6">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-neutral-500 mb-6">{post.description}</p>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent mb-10" />

        {/* MDX Content */}
        <article className="prose-fitzo">
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
            <h2 className="text-2xl font-bold mb-6">Keep Reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group p-4 rounded-xl border border-black/[0.04] dark:border-white/[0.04] hover:border-black/[0.1] dark:hover:border-white/[0.1] transition-colors"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    {related.category}
                  </span>
                  <h3 className="text-sm font-bold mt-2 group-hover:text-green-500 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-[12px] text-neutral-500 mt-1">{related.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-12 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
          <div className="glass-card p-8 text-center">
            <p className="text-xl font-bold mb-2">
              Track your fitness with Fitzo
            </p>
            <p className="text-neutral-500 text-sm mb-6">
              50,000+ Indian foods. Science-based workouts. Free forever.
            </p>
            <Link
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
          >
            &larr; Back to all articles
          </Link>
        </div>
      </main>
    </div>
  );
}
