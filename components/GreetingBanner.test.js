import { render, screen } from "@testing-library/react";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import GreetingBanner, {
  GreetingBannerContent,
} from "@/components/GreetingBanner";

const mockUseProfile = jest.fn();

// <Experience> is exercised for real elsewhere; here it stands in as a
// pass-through so these tests cover the banner's own behaviour.
jest.mock("@ninetailed/experience.js-next", () => ({
  useProfile: () => mockUseProfile(),
  Experience: ({ component: Component, experiences, loadingComponent, ...baseline }) => (
    <>
      <span data-testid="experience-count">{experiences.length}</span>
      <Component {...baseline} />
    </>
  ),
}));

const greetingText = () => screen.getByTestId("greeting").textContent;

const inLondon = () =>
  mockUseProfile.mockReturnValue({
    loading: false,
    profile: { location: { city: "London" } },
  });

const messageSaying = (lead) => ({
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        { nodeType: "text", value: lead, marks: [], data: {} },
        {
          nodeType: INLINES.EMBEDDED_ENTRY,
          data: {
            target: {
              sys: {
                id: "tag-city",
                contentType: { sys: { id: "nt_mergetag" } },
              },
              fields: {
                nt_mergetag_id: "location.city",
                nt_fallback: "there",
              },
            },
          },
          content: [],
        },
      ],
    },
  ],
});

describe("GreetingBannerContent", () => {
  it("renders the authored message, resolving its merge tags", () => {
    inLondon();

    render(
      <GreetingBannerContent enabled message={messageSaying("Pull up a chair in ")} />,
    );

    expect(greetingText()).toBe("Pull up a chair in London");
  });

  it("uses the merge tag's own fallback while loading", () => {
    mockUseProfile.mockReturnValue({ loading: true, profile: null });

    render(
      <GreetingBannerContent enabled message={messageSaying("Pull up a chair in ")} />,
    );

    expect(greetingText()).toBe("Pull up a chair in there");
  });

  it("renders nothing when the editor switches the banner off", () => {
    inLondon();

    const { container } = render(
      <GreetingBannerContent enabled={false} message={messageSaying("Hi ")} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("falls back to the built-in copy without a message", () => {
    inLondon();

    render(<GreetingBannerContent />);

    expect(greetingText()).toBe("Hello London, we're glad you are here");
  });
});

describe("GreetingBanner", () => {
  const bannerEntry = (nt_experiences) => ({
    sys: { id: "banner-1" },
    fields: {
      internalName: "Site-wide greeting",
      enabled: true,
      message: messageSaying("Hello from "),
      ...(nt_experiences ? { nt_experiences } : {}),
    },
  });

  it("renders the built-in copy when no entry was fetched", () => {
    inLondon();

    render(<GreetingBanner />);

    expect(greetingText()).toBe("Hello London, we're glad you are here");
  });

  it("renders the entry's message through Experience", () => {
    inLondon();

    render(<GreetingBanner banner={bannerEntry()} />);

    expect(greetingText()).toBe("Hello from London");
  });

  it("passes no experiences when the entry has none attached", () => {
    inLondon();

    render(<GreetingBanner banner={bannerEntry()} />);

    expect(screen.getByTestId("experience-count").textContent).toBe("0");
  });

  it("drops experiences that do not validate rather than throwing", () => {
    // Unresolved links reach us as bare objects when something is unpublished.
    inLondon();

    render(<GreetingBanner banner={bannerEntry([{ sys: { id: "bare" } }])} />);

    expect(screen.getByTestId("experience-count").textContent).toBe("0");
    expect(greetingText()).toBe("Hello from London");
  });
});
