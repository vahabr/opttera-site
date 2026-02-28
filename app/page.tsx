import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { DemoForm } from "./components/demo-form";
import logo from "./logo.png";

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

const steps = [
  {
    title: "Ingest",
    body: "We connect to documents, operational exports, and existing systems through controlled interfaces. We preserve source context, timestamps, and ownership metadata from the first touchpoint.",
  },
  {
    title: "Structure",
    body: "We map inputs into stable data and rule structures aligned with reporting obligations. Field-level mappings, validation checks, and rule logic stay explicit so teams can review and approve changes.",
  },
  {
    title: "Freeze",
    body: "We lock quantitative outputs and supporting artefacts so each result can be traced and reproduced. Versioned snapshots ensure the same inputs and rules always resolve to the same published numbers.",
  },
  {
    title: "Explain",
    body: "We generate narratives that cite evidence while leaving figures under deterministic control. The narrative layer references approved calculations and exceptions without introducing unverified quantitative claims.",
  },
] as const;

const outcomes = [
  {
    title: "Deterministic analytics",
    body: "Structured runs produce repeatable quantitative outputs from the same source inputs.",
  },
  {
    title: "Evidence packs",
    body: "Each reported number is paired with linked evidence and supporting artefacts.",
  },
  {
    title: "Governance by design",
    body: "Controls, approvals, and traceability are built into the workflow from the start.",
  },
  {
    title: "Faster reporting",
    body: "Teams complete recurring reporting cycles faster without weakening review standards.",
  },
] as const;

const products = [
  {
    name: "Fund Analyst Intelligence",
    lines: [
      "Investment research and reporting with evidence packs.",
      "Coverage includes performance, exposures, risk, and peer context.",
    ],
    cta: "Request a walkthrough",
    demoHref: "/?useCase=Fund%20reporting#demo",
  },
  {
    name: "Denial Analyst Intelligence",
    lines: [
      "Denial and return intelligence for billing operations.",
      "We structure insurer feedback and quantify drivers of delay and rework.",
    ],
    cta: "Request early access",
    demoHref: "/?useCase=Denials#demo",
  },
  {
    name: "Validator Analyst Intelligence",
    lines: [
      "Validation packs with traceable evidence.",
      "We standardise findings, exceptions, and control narratives.",
    ],
    cta: "Join the pilot list",
    demoHref: "/?useCase=Validation#demo",
  },
] as const;

const sectionTitleClass = "text-center text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl";
const sectionIntroClass = "mx-auto mt-3 max-w-[760px] text-center text-sm text-slate-600 md:text-base";

export default function Page() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 antialiased">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1024px] items-center justify-between gap-4 px-4 py-4 md:px-6">
          <a
            href="/"
            aria-label="Go to Opttera home page"
            className="flex items-center gap-3 motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:opacity-90"
          >
            <Image
              src={logo}
              alt="Opttera logo"
              width={44}
              height={44}
              className="h-[44px] w-[44px] object-contain"
              priority
            />
            <p className="max-w-[290px] text-xs font-semibold leading-tight tracking-tight text-slate-900 sm:text-sm">
              Opttera<span className="mx-2 text-slate-400">•</span>Governed Analyst Intellegence Platform
            </p>
          </a>
          <nav aria-label="Primary">
            <ul className="flex items-center gap-3 text-xs text-slate-700 sm:gap-4 sm:text-sm md:gap-6">
              <li>
                <a
                  href="#products"
                  className="motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:text-slate-900"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:text-slate-900"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#demo"
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-900 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:border-slate-900 hover:bg-slate-50 sm:px-3.5 sm:py-1.5 sm:text-sm"
                >
                  Request a demo
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1024px] space-y-10 px-4 pb-20 pt-8 md:space-y-12 md:px-6 md:pt-10">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />

        <section
          aria-labelledby="hero-heading"
          className="space-y-6 border-b border-slate-200 pb-12 md:space-y-8 md:pb-14"
        >
          <p className="mx-auto inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-slate-700">
            <span
              className="mr-2 inline-flex h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.22)] motion-safe:animate-pulse motion-reduce:animate-none"
              aria-hidden="true"
            />
            Regulated Operations Platform
          </p>
          <div className="mx-auto max-w-[900px] space-y-5 text-center">
            <h1
              id="hero-heading"
              className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl"
            >
              Audit-ready analysts intellegence for regulated workflows.
            </h1>
            <p className="mx-auto max-w-[65ch] text-base text-slate-700 md:text-lg">
              Reproducible reporting. Evidence attached. Provenance preserved.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-md border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:bg-slate-800 hover:shadow"
            >
              Request a demo
            </a>
            <a
              href="#products"
              className="text-sm font-medium text-slate-800 underline underline-offset-4 motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:text-slate-900"
            >
              View products
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Operational Figure
            </p>
            <div className="mt-4 space-y-4">
              <div className="space-y-3 sm:grid sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center sm:gap-2 sm:space-y-0">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">Traceable Items</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">100%</p>
                </div>
                <span className="hidden h-px bg-slate-300 sm:block" aria-hidden="true" />
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">Deterministic Runs</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">Locked</p>
                </div>
                <span className="hidden h-px bg-slate-300 sm:block" aria-hidden="true" />
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">Control Records</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">Complete</p>
                </div>
                <span className="hidden h-px bg-slate-300 sm:block" aria-hidden="true" />
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">Approval Gates</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">Active</p>
                </div>
              </div>
              <div className="w-full rounded-lg border border-slate-200 px-3 pb-3 pt-4">
                <div className="flow-sequence grid min-w-[520px] grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto] items-center gap-2 overflow-x-auto overflow-y-visible py-1 text-[11px] font-medium text-slate-600">
                  <span className="flow-node flow-node-1 rounded border border-slate-300 bg-slate-50 px-2 py-1 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md">
                    Ingest
                  </span>
                  <span className="flow-connector flow-connector-1 h-px bg-slate-300" />
                  <span className="flow-node flow-node-2 rounded border border-slate-300 bg-slate-50 px-2 py-1 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md">
                    Structure
                  </span>
                  <span className="flow-connector flow-connector-2 h-px bg-slate-300" />
                  <span className="flow-node flow-node-3 rounded border border-slate-300 bg-slate-50 px-2 py-1 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md">
                    Freeze
                  </span>
                  <span className="flow-connector flow-connector-3 h-px bg-slate-300" />
                  <span className="flow-node flow-node-4 rounded border border-slate-300 bg-slate-50 px-2 py-1 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md">
                    Explain
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="what-we-do-heading" className="py-2">
          <h2 id="what-we-do-heading" className={sectionTitleClass}>
            What we do
          </h2>
          <p className={sectionIntroClass}>
            We deliver structured analyst workflows for regulated reporting with clear controls and evidence lineage.
          </p>
          <div className="mt-5 grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-4 overflow-x-auto pb-1 md:auto-cols-fr">
            <article className="flex min-h-[176px] flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg">
              <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-700 shadow-sm">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="5" rx="1.5" />
                  <rect x="3" y="10" width="18" height="5" rx="1.5" />
                  <rect x="3" y="16" width="18" height="4" rx="1.5" />
                </svg>
              </span>
              <p className="text-sm text-slate-800 md:text-base">
                We turn messy documents and operational data into structured analyst outputs.
              </p>
              <p className="mt-2 text-sm text-slate-600">The structure remains consistent across repeated reporting cycles.</p>
            </article>
            <article className="flex min-h-[176px] flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg">
              <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-700 shadow-sm">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3 5 6v6c0 5 3.2 7.8 7 9 3.8-1.2 7-4 7-9V6l-7-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <p className="text-sm text-slate-800 md:text-base">
                We produce results that can be traced, reproduced, and audited.
              </p>
              <p className="mt-2 text-sm text-slate-600">Each output links back to evidence and processing context.</p>
            </article>
            <article className="flex min-h-[176px] flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg">
              <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-slate-700 shadow-sm">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="6" cy="6" r="2" />
                  <circle cx="18" cy="6" r="2" />
                  <circle cx="12" cy="18" r="2" />
                  <path d="M8 6h8M7.2 7.5 10.8 16M16.8 7.5 13.2 16" />
                </svg>
              </span>
              <p className="text-sm text-slate-800 md:text-base">
                We keep a clear separation between numbers, rules, and narrative.
              </p>
              <p className="mt-2 text-sm text-slate-600">This makes review and change control straightforward.</p>
            </article>
            <article className="flex min-h-[176px] flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg">
              <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 18h14" />
                  <path d="M5 14h4l2-3 3 2 2-4 3 2" />
                  <path d="M7 4h10v4H7z" />
                </svg>
              </span>
              <p className="text-sm text-slate-800 md:text-base">We do not invent figures.</p>
              <p className="mt-2 text-sm text-slate-600">Quantitative statements are derived only from validated inputs.</p>
            </article>
            <article className="flex min-h-[176px] flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg">
              <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-rose-200 bg-rose-50 text-rose-700 shadow-sm">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9Z" />
                  <path d="M9 17v2h6v-2" />
                  <path d="M7 7 17 17" />
                </svg>
              </span>
              <p className="text-sm text-slate-800 md:text-base">
                We do not let language models generate quantitative outputs.
              </p>
              <p className="mt-2 text-sm text-slate-600">Language models are constrained to explanation, not calculation.</p>
            </article>
          </div>
        </section>

        <section aria-labelledby="who-this-is-for-heading" className="py-2">
          <h2 id="who-this-is-for-heading" className={sectionTitleClass}>
            Who this is for
          </h2>
          <p className={sectionIntroClass}>
            Built for teams where decision quality, controls, and audit confidence matter daily.
          </p>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg">
              <span className="text-sm font-semibold text-slate-900">Regulated reporting</span>
              <p className="mt-2 text-sm text-slate-700 md:text-base">
                Regulated teams that publish reports with evidence requirements.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg">
              <span className="text-sm font-semibold text-slate-900">Operational throughput</span>
              <p className="mt-2 text-sm text-slate-700 md:text-base">
                Operations teams with repeated extraction and reconciliation work.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg">
              <span className="text-sm font-semibold text-slate-900">Leadership control</span>
              <p className="mt-2 text-sm text-slate-700 md:text-base">
                Leaders who want faster workflows without weakening governance.
              </p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="how-it-works-heading" className="py-2">
          <h2 id="how-it-works-heading" className={sectionTitleClass}>
            How it works
          </h2>
          <p className={sectionIntroClass}>
            A four-step controlled pipeline designed for consistency and traceability.
          </p>
          <div className="mt-5 overflow-x-auto pb-1">
            <div className="min-w-[860px]">
              <div
                className="how-flow-sequence grid grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto] items-center gap-2 px-2"
                aria-hidden="true"
              >
                {steps.map((step, index) => (
                  <div key={`${step.title}-track`} className="contents">
                    <span
                      className={`how-flow-node how-flow-node-${index + 1} flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-700 shadow-sm`}
                    >
                      {index + 1}
                    </span>
                    {index < steps.length - 1 ? (
                      <span className={`how-flow-connector how-flow-connector-${index + 1} h-px bg-slate-300`} />
                    ) : null}
                  </div>
                ))}
              </div>
              <ol className="mt-4 grid grid-cols-4 gap-4">
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    className={`how-step-card how-step-card-${index + 1} rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-800 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md md:p-6 md:text-base`}
                  >
                    <h3 className="mb-2 text-sm font-semibold text-slate-900 md:text-base">{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section aria-labelledby="what-you-get-heading" className="py-2">
          <h2 id="what-you-get-heading" className={sectionTitleClass}>
            What you get
          </h2>
          <p className={sectionIntroClass}>
            Practical delivery outcomes that improve control and reporting speed.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {outcomes.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-800 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md md:p-6 md:text-base"
              >
                <h3 className="mb-2 text-sm font-semibold text-slate-900 md:text-base">{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="products" aria-labelledby="products-heading" className="py-2">
          <h2 id="products-heading" className={sectionTitleClass}>
            Products
          </h2>
          <p className={sectionIntroClass}>
            Product tracks aligned with recurring regulated workflows and analyst needs.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-800 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md md:p-6 md:text-base"
              >
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-900 md:text-base">{product.name}</h3>
                  <p>{product.lines[0]}</p>
                  <p>{product.lines[1]}</p>
                </div>
                <a
                  href={product.demoHref}
                  className="pt-4 text-sm font-medium text-slate-900 underline underline-offset-4 motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:text-slate-700"
                >
                  {product.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="security" aria-labelledby="security-heading" className="py-2">
          <h2 id="security-heading" className={sectionTitleClass}>
            Security and data handling
          </h2>
          <p className={sectionIntroClass}>
            Security controls are built as first-class product behaviours.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:-rotate-[0.35deg] hover:shadow-lg">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">Data Ownership</h3>
              <p className="text-sm text-slate-800 md:text-base">
                Your data remains your asset.
                <span className="mt-1 block text-slate-600">
                  We process it for your approved workflows and do not repurpose it for unrelated model training.
                </span>
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:rotate-[0.35deg] hover:shadow-lg">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">Access Control</h3>
              <p className="text-sm text-slate-800 md:text-base">
                We support tenant isolation and role-based access.
                <span className="mt-1 block text-slate-600">
                  Permissions can be scoped by function so reviewers, operators, and approvers only see what they are authorised to access.
                </span>
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:-rotate-[0.35deg] hover:shadow-lg">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">Audit Trail</h3>
              <p className="text-sm text-slate-800 md:text-base">
                We maintain audit logs for key actions and approvals.
                <span className="mt-1 block text-slate-600">
                  Logs capture who changed what, when it changed, and which version was used for each output.
                </span>
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm motion-safe:transition motion-safe:duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:rotate-[0.35deg] hover:shadow-lg">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">Deployment Fit</h3>
              <p className="text-sm text-slate-800 md:text-base">
                We can discuss deployment options based on your constraints.
                <span className="mt-1 block text-slate-600">
                  This includes environment boundaries, network controls, and integration patterns suited to regulated operating models.
                </span>
              </p>
            </article>
          </div>
        </section>

        <section id="demo" aria-labelledby="demo-heading" className="py-2">
          <h2 id="demo-heading" className={sectionTitleClass}>
            Request a demo
          </h2>
          <p className="mx-auto mt-3 max-w-[760px] text-center text-sm text-slate-700 md:text-base">
            Share your workflow context and we will schedule a focused 20-minute walkthrough.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <Suspense fallback={null}>
              <DemoForm />
            </Suspense>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-600 md:text-sm">
        <div className="mx-auto flex max-w-[1024px] items-center justify-center gap-3 px-4 text-center md:px-6">
          <Image
            src={logo}
            alt="Opttera logo"
            width={44}
            height={44}
            className="h-[44px] w-[44px] object-contain"
          />
          <p className="text-xs font-semibold leading-tight text-slate-900 md:text-sm">
            Opttera 
            <span className="mx-2 text-slate-400">•</span>
             Governed Analyst Intellegence Platform
            <span className="mx-2 text-slate-400">•</span>
            <a
              href="mailto:contact@opttera.com"
              className="font-normal text-slate-600 motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:text-slate-900"
            >
              contact@opttera.com
            </a>
            <span className="mx-2 text-slate-400">•</span>
            <span className="font-normal text-slate-600">© 2026. All rights reserved.</span>

          </p>
        </div>
      </footer>
    </div>
  );
}
