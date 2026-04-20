import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | The Data Island',
  description: 'Reach out to The Data Island for enterprise AI automation, engineering augmentation, and workflow orchestration. Start your discovery session today.',
  alternates: {
    canonical: 'https://thedataisland.com/contact',
  },
  openGraph: {
    title: 'Contact Us | The Data Island',
    description: 'Reach out to The Data Island for enterprise AI automation, engineering augmentation, and workflow orchestration. Start your discovery session today.',
    url: 'https://thedataisland.com/contact',
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
            "@type": "ContactPage",
            "name": "Contact The Data Island",
            "url": "https://thedataisland.com/contact",
            "description": "Get in touch with TDI for an automation discovery session.",
            "mainEntity": {
              "@type": "Organization",
              "name": "The Data Island",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+880171100000",
                "contactType": "Sales and Discovery",
                "email": "connect@thedataisland.com"
              }
            }
          })
        }}
      />
      <ContactClient />
    </>
  );
}
