import { client } from "@/lib/contentful";

const articleContentType = "coffeeArticle";

function isRichTextDocument(value) {
  return Boolean(value && typeof value === "object" && value.nodeType === "document");
}

function extractNodeText(node) {
  if (!node) {
    return "";
  }

  if (node.nodeType === "text") {
    return node.value || "";
  }

  if (!Array.isArray(node.content)) {
    return "";
  }

  return node.content.map(extractNodeText).join("");
}

export function extractArticlePreview(body) {
  if (!body) {
    return "";
  }

  if (typeof body === "string") {
    return body.replace(/\s+/g, " ").trim();
  }

  if (isRichTextDocument(body)) {
    return body.content
      .map((node) => extractNodeText(node).trim())
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  return "";
}

function normalizeArticleEntry(entry) {
  return {
    ...entry,
    fields: {
      ...entry.fields,
      excerpt: extractArticlePreview(entry.fields.body),
    },
  };
}

export async function getArticles({ locale }) {
  const response = await client.getEntries({
    content_type: articleContentType,
    include: 5,
    locale,
    order: "-fields.dateOfPublication",
  });

  return response.items.map(normalizeArticleEntry);
}

export async function getArticleBySlug({ locale, slug }) {
  const response = await client.getEntries({
    content_type: articleContentType,
    include: 5,
    locale,
    "fields.slug": slug,
    limit: 1,
  });

  return response.items[0] ? normalizeArticleEntry(response.items[0]) : null;
}
