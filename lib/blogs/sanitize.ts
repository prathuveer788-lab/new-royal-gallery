import type { BlogContentMode } from "./constants";

export function isHtmlContent(content: string, mode?: BlogContentMode): boolean {
  if (mode === "html") return true;
  if (mode === "text") return false;
  return /^\s*</.test(content);
}

/**
 * Normalizes pasted HTML/JSX blog code and strips dangerous script tags / inline event handlers.
 */
export function normalizeBlogHtml(raw: string): string {
  return raw
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\bclassName=/g, "class=");
}

export function stripHtmlToExcerpt(raw: string, maxLen = 180): string {
  const plain = raw
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen).trimEnd()}...`;
}
