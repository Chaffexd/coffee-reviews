import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

// Nothing in here knows about this site's content model, so it can be lifted
// into a package as-is. Site-specific rendering goes in through the options.

const MERGE_TAG_CONTENT_TYPE = "nt_mergetag";

const headingLevels = {
  [BLOCKS.HEADING_1]: 1,
  [BLOCKS.HEADING_2]: 2,
  [BLOCKS.HEADING_3]: 3,
  [BLOCKS.HEADING_4]: 4,
  [BLOCKS.HEADING_5]: 5,
  [BLOCKS.HEADING_6]: 6,
};

// Markdown has no visitor profile, so a Personalization merge tag renders the
// fallback the editor set, the same value ProfileValue falls back to.
export function renderMergeTagFallback(node) {
  const target = node.data.target;
  return target?.sys?.contentType?.sys?.id === MERGE_TAG_CONTENT_TYPE
    ? (target.fields.nt_fallback ?? "")
    : "";
}

const defaultOptions = {
  renderInlineEntry: renderMergeTagFallback,
  renderEmbeddedEntry: () => "",
};

function applyMarks(text, marks = []) {
  return marks.reduce((out, { type }) => {
    if (type === MARKS.BOLD) return `**${out}**`;
    if (type === MARKS.ITALIC) return `_${out}_`;
    if (type === MARKS.CODE) return `\`${out}\``;
    return out;
  }, text);
}

function renderInline(nodes = [], options) {
  return nodes
    .map((node) => {
      switch (node.nodeType) {
        case "text":
          return applyMarks(node.value, node.marks);
        case INLINES.HYPERLINK:
          return `[${renderInline(node.content, options)}](${node.data.uri})`;
        case INLINES.EMBEDDED_ENTRY:
          return options.renderInlineEntry(node);
        default:
          return renderInline(node.content, options);
      }
    })
    .join("");
}

function renderTable(node, options) {
  const rows = node.content.map((row) =>
    row.content.map((cell) =>
      cell.content
        .map((paragraph) => renderInline(paragraph.content, options))
        .join(" ")
        .replace(/\|/g, "\\|"),
    ),
  );
  if (!rows.length) return "";

  const [header, ...body] = rows;
  return [header, header.map(() => "---"), ...body]
    .map((cells) => `| ${cells.join(" | ")} |`)
    .join("\n");
}

function renderBlock(node, options, depth = 0) {
  const level = headingLevels[node.nodeType];
  if (level) {
    return `${"#".repeat(level)} ${renderInline(node.content, options)}`;
  }

  switch (node.nodeType) {
    case BLOCKS.PARAGRAPH:
      return renderInline(node.content, options);
    case BLOCKS.HR:
      return "---";
    case BLOCKS.QUOTE:
      return node.content
        .map((child) => renderBlock(child, options))
        .join("\n\n")
        .split("\n")
        .map((line) => `> ${line}`.trimEnd())
        .join("\n");
    case BLOCKS.UL_LIST:
    case BLOCKS.OL_LIST:
      return node.content
        .map((item, index) => {
          const marker =
            node.nodeType === BLOCKS.OL_LIST ? `${index + 1}.` : "-";
          const text = item.content
            .map((child) => renderBlock(child, options, depth + 1))
            .join("\n");
          return `${"  ".repeat(depth)}${marker} ${text}`;
        })
        .join("\n");
    // Contentful asset URLs are protocol-relative (//images.ctfassets.net),
    // and a Markdown reader has no page to resolve them against.
    case BLOCKS.EMBEDDED_ASSET: {
      const fields = node.data.target?.fields;
      return fields?.file
        ? `![${fields.description || fields.title || ""}](https:${fields.file.url})`
        : "";
    }
    case BLOCKS.EMBEDDED_ENTRY:
      return options.renderEmbeddedEntry(node);
    case BLOCKS.TABLE:
      return renderTable(node, options);
    default:
      return "";
  }
}

export function richTextToMarkdown(document, options = {}) {
  if (!document) return "";
  if (typeof document === "string") return document.trim();

  const merged = { ...defaultOptions, ...options };
  return document.content
    .map((node) => renderBlock(node, merged))
    .filter(Boolean)
    .join("\n\n");
}
