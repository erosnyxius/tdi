import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Home | The Data Island',
  description: 'The Data Island (TDI) provides scalable AI automation, seamless workflows, and full lifecycle engineering exclusively for enterprise production environments.',
  alternates: {
    canonical: 'https://thedataisland.com',
  },
  openGraph: {
    title: 'The Data Island (TDI) - Enterprise AI',
    description: 'The Data Island (TDI) provides scalable AI automation, seamless workflows, and full lifecycle engineering exclusively for enterprise production environments.',
    url: 'https://thedataisland.com',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "The Data Island",
            "url": "https://thedataisland.com/"
          })
        }}
      />
      <HomeClient />
    </>
  );
}
