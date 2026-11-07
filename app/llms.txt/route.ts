import { getAllPosts } from "@/lib/blog";
import { SITE_URL, STORE, CONTACT_EMAIL } from "@/lib/links";
import { FAQS, PRODUCT_DESCRIPTION } from "@/lib/product";

export const dynamic = "force-static";

export function GET() {
  const tools = [
    ["bmr-calculator", "BMR calculator", "Estimate energy used at rest."],
    ["tdee-calculator", "TDEE calculator", "Estimate daily energy use including activity."],
    ["macro-calculator", "Macro calculator", "Estimate daily protein, carbohydrate and fat targets."],
    ["protein-calculator", "Protein calculator", "Estimate a daily protein range."],
    ["body-fat-calculator", "Body fat calculator", "Estimate body fat using the US Navy tape method."],
    ["1rm-calculator", "One-rep max calculator", "Estimate one-rep maximum from a completed set."],
  ];
  const text = [
    "# Fitzo",
    `> ${PRODUCT_DESCRIPTION}`,
    "Fitzo is a fitness app for iOS and Android, with a focus on Indian meals and training. Website calculators provide estimates, not individual medical advice.",
    "## Official pages",
    `- [Fitzo](${SITE_URL}): Product features, FAQs and downloads.`,
    `- [Release notes](${SITE_URL}/changelog): Published product updates.`,
    `- [Compare features](${SITE_URL}/compare): Fitzo's feature comparison.`,
    `- [Fitness and nutrition guides](${SITE_URL}/blog): Articles published by Fitzo.`,
    `- [Google Play](${STORE.android}): Android app.`,
    `- [App Store](${STORE.ios}): iOS app.`,
    "## Common questions",
    ...FAQS.map(({ question, answer }) => `### ${question}\n${answer}`),
    "## Free calculators",
    ...tools.map(([slug, name, description]) => `- [${name}](${SITE_URL}/tools/${slug}): ${description}`),
    "## Guides",
    ...getAllPosts().map(post => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`),
    "## Privacy and support",
    `- [Privacy policy](${SITE_URL}/privacy-policy): App data handling and website analytics choices.`,
    `- [Delete your account](${SITE_URL}/delete-account): Account deletion instructions.`,
    `- [Terms](${SITE_URL}/terms): Terms of service.`,
    `- Contact: ${CONTACT_EMAIL}`,
  ].join("\n\n");
  return new Response(`${text}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
