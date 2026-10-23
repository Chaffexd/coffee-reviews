import {
  formatFrontMatter,
  formatLink,
  formatLlmsTxt,
  truncate,
} from "@/lib/llmsTxt";

describe("formatLlmsTxt", () => {
  it("follows the spec's order: title, summary, details, sections", () => {
    const output = formatLlmsTxt({
      name: "Site",
      summary: "What it is.",
      details: "More context.",
      sections: [
        {
          title: "Pages",
          links: [{ title: "One", url: "https://x.test/1.md" }],
        },
      ],
    });

    expect(output).toBe(
      [
        "# Site",
        "> What it is.",
        "More context.",
        "## Pages",
        "- [One](https://x.test/1.md)",
      ].join("\n\n"),
    );
  });

  it("leaves out sections with no links", () => {
    const output = formatLlmsTxt({
      name: "Site",
      sections: [{ title: "Empty", links: [] }],
    });

    expect(output).toBe("# Site");
  });
});

describe("formatLink", () => {
  it("adds the description after a colon", () => {
    expect(
      formatLink({ title: "A", url: "https://x.test", description: "Desc" }),
    ).toBe("- [A](https://x.test): Desc");
  });

  it("escapes brackets that would end the link text", () => {
    expect(formatLink({ title: "Cafe [closed]", url: "https://x.test" })).toBe(
      "- [Cafe \\[closed\\]](https://x.test)",
    );
  });

  it("trims whitespace an editor left on the title", () => {
    expect(formatLink({ title: "BØLGE ", url: "https://x.test" })).toBe(
      "- [BØLGE](https://x.test)",
    );
  });
});

describe("formatFrontMatter", () => {
  it("quotes values and skips empty ones", () => {
    expect(
      formatFrontMatter({ title: 'Say "hi"', region: null, locale: "en-GB" }),
    ).toBe('---\ntitle: "Say \\"hi\\""\nlocale: "en-GB"\n---');
  });
});

describe("truncate", () => {
  it("collapses whitespace", () => {
    expect(truncate("  a \n b  ")).toBe("a b");
  });

  it("cuts long text to the limit, ellipsis included", () => {
    const result = truncate("x".repeat(200), 10);
    expect(result).toHaveLength(10);
    expect(result.endsWith("…")).toBe(true);
  });

  it("copes with a missing value", () => {
    expect(truncate(undefined)).toBe("");
    expect(truncate(null)).toBe("");
  });
});
