// Placeholder Gemini service. Replace stubs with Google Gemini SDK calls later.
export async function genSummary(content) {
  // naive "summary"
  const text = content?.trim() || "";
  if (!text) return "";
  const first = text.slice(0, 180).replace(/\s+/g, " ");
  return `Auto-summary: ${first}${text.length > 180 ? "..." : ""}`;
}

export async function genTags(content) {
  // naive "tags"
  const words = (content || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const freq = {};
  words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
  const tags = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([w]) => w);
  return tags.length ? tags : ["general"];
}

// toy embedding: DO NOT use in production.
// Replace with real embeddings from Gemini (or a vector DB).
export async function createEmbedding(text) {
  let h = 0;
  for (let i = 0; i < (text || "").length; i++)
    h = (h * 31 + text.charCodeAt(i)) >>> 0;
  // return a tiny fixed-length vector derived from hash
  return [h % 97, (h >> 3) % 97, (h >> 5) % 97, (h >> 7) % 97].map(
    (n) => n / 100
  );
}

export async function answerQuestion(question, contextChunks = []) {
  // simple stitched answer using context
  const ctx = contextChunks
    .slice(0, 3)
    .map((c, i) => `(${i + 1}) ${c}`)
    .join("\n");
  return `Q: ${question}\nA (placeholder): Based on provided docs:\n${ctx}`;
}
