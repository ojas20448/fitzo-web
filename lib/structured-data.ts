import { BlogPost } from "./blog";

const SITE_URL = "https://fitzo.app";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fitzo",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      "Science-based fitness tracking app for serious lifters. Track workouts, macros, and progress with precision.",
    sameAs: [
      "https://twitter.com/fitzoapp",
      "https://instagram.com/fitzoapp",
    ],
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      name: "Ojas Narang",
    },
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fitzo",
    url: SITE_URL,
    description:
      "Track workouts, macros, and progress with precision. 10+ training splits, AI nutrition, and science-backed education.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Fitzo",
    operatingSystem: "iOS, Android",
    applicationCategory: "HealthApplication",
    description:
      "Science-based fitness tracking app with 10+ workout splits, AI nutrition coach, and 50,000+ Indian food database.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "2500",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Workout tracking with 10+ training splits",
      "AI-powered nutrition coach",
      "50,000+ Indian food database",
      "Macro and calorie tracking",
      "Progress analytics and charts",
      "Offline mode",
      "Barcode scanner",
    ],
  };
}

export function getFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Fitzo",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Fitzo",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getBlogListSchema(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Fitzo Blog",
    description:
      "Science-backed fitness, nutrition, and training articles for Indian lifters.",
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };
}
