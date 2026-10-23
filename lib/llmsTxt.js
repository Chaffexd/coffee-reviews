// Formatting for the llms.txt convention (https://llmstxt.org). Like
// richTextToMarkdown, this knows nothing about the site; lib/llms.js supplies
// the content.

// Square brackets in a title would end the link text early. Titles come
// straight from editors, stray whitespace included ("BØLGE ").
function escapeLinkText(text) {
  return String(text).trim().replace(/[[\]]/g, "\\$&");
}

export function formatLink({ title, url, description }) {
  const link = `- [${escapeLinkText(title)}](${url})`;
  return description ? `${link}: ${description}` : link;
}

// An "Optional" section is part of the spec: agents short on context may skip
// it. Sections with no links are left out rather than rendered as bare
// headings.
export function formatLlmsTxt({ name, summary, details, sections = [] }) {
  return [
    `# ${name}`,
    summary && `> ${summary}`,
    details,
    ...sections
      .filter(({ links }) => links.length)
      .map(({ title, links }) =>
        [`## ${title}`, links.map(formatLink).join("\n")].join("\n\n"),
      ),
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function formatFrontMatter(fields) {
  const lines = Object.entries(fields)
    .filter(([, value]) => value != null && value !== "")
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
  return ["---", ...lines, "---"].join("\n");
}

export function truncate(text = "", max = 160) {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}
