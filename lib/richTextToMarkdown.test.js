import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { richTextToMarkdown } from "@/lib/richTextToMarkdown";

const text = (value, marks = []) => ({
  nodeType: "text",
  value,
  marks: marks.map((type) => ({ type })),
  data: {},
});
const node = (nodeType, content = [], data = {}) => ({
  nodeType,
  content,
  data,
});
const paragraph = (...content) => node(BLOCKS.PARAGRAPH, content);
const doc = (...content) => node(BLOCKS.DOCUMENT, content);

const mergeTag = (fallback) =>
  node(INLINES.EMBEDDED_ENTRY, [], {
    target: {
      sys: { contentType: { sys: { id: "nt_mergetag" } } },
      fields: { nt_fallback: fallback },
    },
  });

describe("richTextToMarkdown", () => {
  it("returns an empty string for a missing field", () => {
    expect(richTextToMarkdown(undefined)).toBe("");
  });

  it("passes a plain-string body through", () => {
    // coffeeArticle.body can be a string as well as rich text.
    expect(richTextToMarkdown("  Just text  ")).toBe("Just text");
  });

  it("renders headings and marks", () => {
    const input = doc(
      node(BLOCKS.HEADING_2, [text("Espresso")]),
      paragraph(
        text("Very "),
        text("good", [MARKS.BOLD]),
        text(" and "),
        text("quick", [MARKS.ITALIC]),
      ),
    );

    expect(richTextToMarkdown(input)).toBe(
      "## Espresso\n\nVery **good** and _quick_",
    );
  });

  it("renders hyperlinks", () => {
    const input = doc(
      paragraph(
        node(INLINES.HYPERLINK, [text("Monmouth")], {
          uri: "https://monmouthcoffee.co.uk",
        }),
      ),
    );

    expect(richTextToMarkdown(input)).toBe(
      "[Monmouth](https://monmouthcoffee.co.uk)",
    );
  });

  it("renders nested lists", () => {
    const item = (...content) => node(BLOCKS.LIST_ITEM, content);
    const input = doc(
      node(BLOCKS.UL_LIST, [
        item(
          paragraph(text("Beans")),
          node(BLOCKS.OL_LIST, [
            item(paragraph(text("Grind"))),
            item(paragraph(text("Weigh"))),
          ]),
        ),
        item(paragraph(text("Water"))),
      ]),
    );

    expect(richTextToMarkdown(input)).toBe(
      "- Beans\n  1. Grind\n  2. Weigh\n- Water",
    );
  });

  it("prefixes every line of a quote", () => {
    const input = doc(
      node(BLOCKS.QUOTE, [paragraph(text("One")), paragraph(text("Two"))]),
    );

    expect(richTextToMarkdown(input)).toBe("> One\n>\n> Two");
  });

  it("gives embedded assets an absolute URL", () => {
    // Contentful asset URLs are protocol-relative.
    const input = doc(
      node(BLOCKS.EMBEDDED_ASSET, [], {
        target: {
          fields: {
            title: "Cup",
            description: "A flat white",
            file: { url: "//images.ctfassets.net/space/cup.jpg" },
          },
        },
      }),
    );

    expect(richTextToMarkdown(input)).toBe(
      "![A flat white](https://images.ctfassets.net/space/cup.jpg)",
    );
  });

  it("drops an embedded asset that did not resolve", () => {
    const input = doc(
      node(BLOCKS.EMBEDDED_ASSET, [], { target: { sys: { id: "missing" } } }),
      paragraph(text("After")),
    );

    expect(richTextToMarkdown(input)).toBe("After");
  });

  it("renders tables with the first row as the header", () => {
    const cell = (value) =>
      node(BLOCKS.TABLE_CELL, [paragraph(text(value))]);
    const row = (...cells) => node(BLOCKS.TABLE_ROW, cells);
    const input = doc(
      node(BLOCKS.TABLE, [
        row(cell("Brew"), cell("Ratio")),
        row(cell("V60"), cell("1:16 | strong")),
      ]),
    );

    expect(richTextToMarkdown(input)).toBe(
      "| Brew | Ratio |\n| --- | --- |\n| V60 | 1:16 \\| strong |",
    );
  });

  it("writes a merge tag's fallback, since there is no visitor", () => {
    const input = doc(paragraph(text("Hello "), mergeTag("friend")));

    expect(richTextToMarkdown(input)).toBe("Hello friend");
  });

  it("leaves out inline entries that are not merge tags", () => {
    const other = node(INLINES.EMBEDDED_ENTRY, [], {
      target: { sys: { contentType: { sys: { id: "author" } } }, fields: {} },
    });

    expect(richTextToMarkdown(doc(paragraph(text("By "), other)))).toBe("By ");
  });

  it("lets the caller render embedded entries", () => {
    const input = doc(
      node(BLOCKS.EMBEDDED_ENTRY, [], {
        target: { fields: { title: "Featured" } },
      }),
    );

    expect(
      richTextToMarkdown(input, {
        renderEmbeddedEntry: (entry) => `**${entry.data.target.fields.title}**`,
      }),
    ).toBe("**Featured**");
  });
});
