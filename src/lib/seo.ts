import type { Metadata } from 'next';
import { SITE } from './site';

interface PageSeo {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
}

/** Build consistent metadata (title, canonical, OpenGraph, Twitter) for a page. */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = 'website',
  publishedTime,
}: PageSeo): Metadata {
  const url = `${SITE.url}${path}`;
  const isHome = path === '/';
  // Home gets an absolute title; other pages use a plain title and let the root
  // layout's title template append "| SITE.name" exactly once.
  const fullTitle = isHome ? `${SITE.name} — ${SITE.tagline}` : `${title} | ${SITE.name}`;
  const ogImage = `${SITE.url}/og?title=${encodeURIComponent(title)}`;
  return {
    title: isHome ? { absolute: fullTitle } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: SITE.twitter,
      images: [ogImage],
    },
  };
}

/** WebApplication schema for a tool page. */
export function softwareAppSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE.url}${path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function articleSchema(title: string, description: string, path: string, published: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: published,
    dateModified: published,
    author: { '@type': 'Person', name: SITE.author },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}${path}` },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/world-clock?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}
