import { render, screen } from "@testing-library/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { richTextOptions } from "@/lib/richTextOptions";

const mockUseProfile = jest.fn();

jest.mock("@ninetailed/experience.js-next", () => ({
  useProfile: () => mockUseProfile(),
}));

const mergeTagEntry = (id, fallback) => ({
  sys: { id: "tag-1", contentType: { sys: { id: "nt_mergetag" } } },
  fields: { nt_mergetag_id: id, nt_fallback: fallback },
});

// A paragraph with an inline entry in the middle, the way an editor authors it.
const documentWith = (target) => ({
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        { nodeType: "text", value: "A short walk from ", marks: [], data: {} },
        {
          nodeType: INLINES.EMBEDDED_ENTRY,
          data: { target },
          content: [],
        },
        { nodeType: "text", value: ".", marks: [], data: {} },
      ],
    },
  ],
});

const renderDoc = (target) =>
  render(<>{documentToReactComponents(documentWith(target), richTextOptions)}</>);

describe("richTextOptions merge tags", () => {
  it("resolves an inline nt_mergetag against the profile", () => {
    mockUseProfile.mockReturnValue({
      loading: false,
      profile: { location: { city: "London" } },
    });

    const { container } = renderDoc(mergeTagEntry("location.city", "there"));

    expect(container.textContent).toBe("A short walk from London.");
  });

  it("shows the tag's fallback while the profile loads", () => {
    mockUseProfile.mockReturnValue({ loading: true, profile: null });

    const { container } = renderDoc(mergeTagEntry("location.city", "there"));

    expect(container.textContent).toBe("A short walk from there.");
  });

  it("never emits the renderer's default placeholder", () => {
    // Without a handler the renderer prints "type: embedded-entry-inline id: …"
    // straight into the prose, which is how this was first spotted.
    mockUseProfile.mockReturnValue({
      loading: false,
      profile: { location: { city: "London" } },
    });

    renderDoc(mergeTagEntry("location.city", "there"));

    expect(screen.queryByText(/embedded-entry-inline/)).not.toBeInTheDocument();
  });

  it("renders nothing for an inline entry of another content type", () => {
    mockUseProfile.mockReturnValue({ loading: false, profile: {} });

    const { container } = renderDoc({
      sys: { id: "other-1", contentType: { sys: { id: "locationImages" } } },
      fields: {},
    });

    expect(container.textContent).toBe("A short walk from .");
  });
});
