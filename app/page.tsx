import type { Metadata } from "next";
import {
  DemoSection,
  HeroSection,
  HowItWorksSection,
  LandingFooter,
  LandingHeader,
  ProductsSection,
  SecuritySection,
  WhatWeDoSection,
  WhatYouGetSection,
  WhoThisIsForSection,
} from "./components/landing-page-sections";

const siteUrl = "https://www.opttera.com";

export const metadata: Metadata = {
  title: "Opttera | Audit-ready analysts intellegence for regulated workflows",
  description:
    "Audit-ready analysts intellegence for regulated workflows. Reproducible reporting. Evidence attached. Provenance preserved.",
  openGraph: {
    title: "Opttera | Audit-ready analysts intellegence for regulated workflows",
    description: "Reproducible reporting. Evidence attached. Provenance preserved.",
    type: "website",
    url: siteUrl,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Opttera",
  url: siteUrl,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "contact@opttera.com",
    },
  ],
};

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 antialiased">
      <LandingHeader />

      <main className="mx-auto max-w-[1024px] space-y-10 px-4 pb-20 pt-8 md:space-y-12 md:px-6 md:pt-10">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />

        <HeroSection />
        <WhatWeDoSection />
        <WhoThisIsForSection />
        <HowItWorksSection />
        <WhatYouGetSection />
        <ProductsSection />
        <SecuritySection />
        <DemoSection />
      </main>

      <LandingFooter />
    </div>
  );
}
