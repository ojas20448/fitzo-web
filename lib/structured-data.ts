import { PRODUCT_DESCRIPTION } from "@/lib/product";
import { BlogPost } from "./blog";
import { SITE_URL, STORE, CONTACT_EMAIL } from "@/lib/links";



export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Fitzo",
    email: CONTACT_EMAIL,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: PRODUCT_DESCRIPTION,
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
    "@id": `${SITE_URL}/#website`,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
    name: "Fitzo",
    url: SITE_URL,
    description: PRODUCT_DESCRIPTION,
  };
}

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#app`,
    url: SITE_URL,
    downloadUrl: [STORE.android, STORE.ios],
    publisher: { "@id": `${SITE_URL}/#organization` },
    name: "Fitzo",
    operatingSystem: "iOS, Android",
    applicationCategory: "HealthApplication",
    description:
      PRODUCT_DESCRIPTION,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    /*
     * ⚠️ aggregateRating removed deliberately: do not restore from memory.
     *
     * This shipped `ratingValue: "4.8"` with `ratingCount: "2500"` to Google
     * as review markup. Two problems: the count was the tester headcount, not
     * a count of ratings, and neither figure was traceable to the Play
     * listing. Google treats unverifiable review markup as a structured-data
     * violation and can demote the whole site for it.
     *
     * To put it back, take BOTH numbers from the live Play Console rating
     * summary and keep them in sync when they move. If nobody owns that,
     * leave this out: Google reads the real rating from the Play listing
     * regardless.
     */
    featureList: [
      "Workout drafts, automatic timing and exercise reordering",
      "Optional Fitzo AI coaching, voice and photo logging",
      "Indian food tracking with editable diary portions and dates",
      "Macro and calorie tracking",
      "Progress analytics and charts",
      "246 exercise movements with offline photos and instructions",
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
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    inLanguage: "en-IN",
    image: `${SITE_URL}/og-image.png`,
    headline: post.title,
    description: post.description,
    keywords: post.keywords?.join(", "),
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
