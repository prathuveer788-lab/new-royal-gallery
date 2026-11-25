import fs from "fs";
import os from "os";
import path from "path";

export type SubmissionType = "newsletter" | "media-kit" | "partnership";

export interface SiteSubmission {
  id: string;
  type: SubmissionType;
  email: string;
  fullName?: string;
  company?: string;
  jobTitle?: string;
  brandCategory?: string;
  phone?: string;
  interests?: string[];
  message?: string;
  source: string;
  submittedAt: string;
}

interface SubmissionsStore {
  submissions: SiteSubmission[];
}

const REPO_STORE_PATH = path.join(process.cwd(), "data", "submissions-store.json");
const TMP_STORE_PATH = path.join(os.tmpdir(), "royal-gallerys-submissions-store.json");
const KV_KEY = "rg_submissions_store_v1";

function getKvConfig(): { url: string; token: string } | null {
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
  if (url && token) {
    return { url: url.replace(/\/$/, ""), token };
  }
  return null;
}

function isServerlessFs(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

function readFilesystemStore(): SubmissionsStore {
  if (isServerlessFs()) {
    try {
      if (fs.existsSync(TMP_STORE_PATH)) {
        const parsed = JSON.parse(fs.readFileSync(TMP_STORE_PATH, "utf8")) as SubmissionsStore;
        if (Array.isArray(parsed.submissions)) return parsed;
      }
    } catch {}
    return { submissions: [] };
  }

  try {
    if (fs.existsSync(REPO_STORE_PATH)) {
      const parsed = JSON.parse(fs.readFileSync(REPO_STORE_PATH, "utf8")) as SubmissionsStore;
      if (Array.isArray(parsed.submissions)) return parsed;
    }
  } catch {
    try {
      if (fs.existsSync(TMP_STORE_PATH)) {
        const parsed = JSON.parse(fs.readFileSync(TMP_STORE_PATH, "utf8")) as SubmissionsStore;
        if (Array.isArray(parsed.submissions)) return parsed;
      }
    } catch {}
  }

  return { submissions: [] };
}

function writeFilesystemStore(submissions: SiteSubmission[]): void {
  const payload = JSON.stringify({ submissions }, null, 2);

  if (isServerlessFs()) {
    fs.writeFileSync(TMP_STORE_PATH, payload, "utf8");
    return;
  }

  try {
    const dir = path.dirname(REPO_STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(REPO_STORE_PATH, payload, "utf8");
  } catch {
    fs.writeFileSync(TMP_STORE_PATH, payload, "utf8");
  }
}

export async function getAllSubmissions(): Promise<SiteSubmission[]> {
  const kv = getKvConfig();
  if (kv) {
    try {
      const res = await fetch(`${kv.url}/get/${KV_KEY}`, {
        headers: { Authorization: `Bearer ${kv.token}` },
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as { result?: string | null };
        if (data?.result) {
          const parsed = JSON.parse(data.result) as SubmissionsStore;
          if (Array.isArray(parsed.submissions)) return parsed.submissions;
        }
      }
    } catch (err) {
      console.error("[SubmissionsStore] KV read failed, falling back:", err);
    }
  }

  return readFilesystemStore().submissions;
}

export async function addSubmission(
  entry: Omit<SiteSubmission, "id" | "submittedAt">
): Promise<SiteSubmission> {
  const current = await getAllSubmissions();
  const created: SiteSubmission = {
    ...entry,
    id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    submittedAt: new Date().toISOString(),
  };

  const updated = [created, ...current].slice(0, 500);
  const kv = getKvConfig();

  if (kv) {
    const res = await fetch(`${kv.url}/set/${KV_KEY}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kv.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSON.stringify({ submissions: updated })),
    });
    if (!res.ok) {
      throw new Error(`KV write failed with status ${res.status}`);
    }
  } else {
    writeFilesystemStore(updated);
  }

  return created;
}
