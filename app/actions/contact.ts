"use server";

import { headers } from "next/headers";
import { z } from "zod";

const useCaseValues = ["Fund reporting", "Denials", "Validation", "Other"] as const;
const dataSourceValues = ["PDF", "Excel", "Emails", "Database", "Other"] as const;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_PER_WINDOW = 3;
const SUPABASE_TABLE = process.env.SUPABASE_DEMO_REQUESTS_TABLE ?? "opttera_demo_requests";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const emailRateLimiter = new Map<string, RateLimitEntry>();
const ipRateLimiter = new Map<string, RateLimitEntry>();

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  company: z.string().trim().min(1, "Company is required."),
  role: z.string().trim().max(120, "Role must be 120 characters or fewer.").optional().or(z.literal("")),
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  useCase: z.enum(useCaseValues, { message: "Select a use case." }),
  dataSources: z.array(z.enum(dataSourceValues)).default([]),
  notes: z.string().trim().max(2000, "Notes must be 2000 characters or fewer.").optional().or(z.literal("")),
});

type ContactField = keyof z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<ContactField, string[]>>;
};

function applyRateLimit(store: Map<string, RateLimitEntry>, key: string): boolean {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_PER_WINDOW) {
    return true;
  }

  existing.count += 1;
  store.set(key, existing);
  return false;
}

function normaliseOptional(value: string | undefined): string | undefined {
  if (!value || value.trim() === "") {
    return undefined;
  }

  return value.trim();
}

async function insertIntoSupabase(row: {
  name: string;
  company: string;
  role?: string;
  email: string;
  useCase: (typeof useCaseValues)[number];
  dataSources: (typeof dataSourceValues)[number][];
  notes?: string;
  submittedAt: string;
  sourceIp?: string;
  userAgent?: string;
}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return false;
  }

  const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${SUPABASE_TABLE}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: row.name,
      company: row.company,
      role: row.role ?? null,
      email: row.email,
      use_case: row.useCase,
      data_sources: row.dataSources,
      notes: row.notes ?? null,
      submitted_at: row.submittedAt,
      source_ip: row.sourceIp ?? null,
      user_agent: row.userAgent ?? null,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed with status ${response.status}`);
  }

  return true;
}

export async function submitContact(_: ContactState, formData: FormData): Promise<ContactState> {
  const honeypot = formData.get("companyWebsite")?.toString().trim() ?? "";
  if (honeypot) {
    return {
      status: "success",
      message: "Thank you. Your request has been received.",
    };
  }

  const rawData = {
    name: formData.get("name")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    role: formData.get("role")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    useCase: formData.get("useCase")?.toString() ?? "",
    dataSources: formData.getAll("dataSources").map((value) => value.toString()),
    notes: formData.get("notes")?.toString() ?? "",
  };

  const parsed = contactSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const submission = {
    ...parsed.data,
    role: normaliseOptional(parsed.data.role),
    notes: normaliseOptional(parsed.data.notes),
  };

  const emailKey = submission.email.toLowerCase();
  if (applyRateLimit(emailRateLimiter, emailKey)) {
    return {
      status: "error",
      message: "Too many requests from this email. Please try again shortly.",
    };
  }

  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for") ?? "";
  const ipKey = forwardedFor.split(",")[0]?.trim();
  if (ipKey && applyRateLimit(ipRateLimiter, ipKey)) {
    return {
      status: "error",
      message: "Too many requests from this network. Please try again shortly.",
    };
  }

  const payload = {
    type: "governed-intelligence.demo-request",
    receivedAt: new Date().toISOString(),
    submission,
  };

  try {
    const inserted = await insertIntoSupabase({
      ...submission,
      submittedAt: payload.receivedAt,
      sourceIp: ipKey,
      userAgent: requestHeaders.get("user-agent") ?? undefined,
    });

    if (!inserted && process.env.CONTACT_WEBHOOK_URL) {
      const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed with status ${response.status}`);
      }
    } else if (!inserted) {
      console.log("Demo request submission", payload);
    }

    return {
      status: "success",
      message: "Thank you for requesting a demo. We will contact you soon.",
    };
  } catch (error) {
    console.error("Contact submission failed", error);
    return {
      status: "error",
      message: "We could not submit your request right now. Please try again shortly.",
    };
  }
}
