import { render, screen } from "@testing-library/react";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import GreetingBanner from "@/components/GreetingBanner";

const mockUseProfile = jest.fn();

jest.mock("@ninetailed/experience.js-next", () => ({
  useProfile: () => mockUseProfile(),
}));

const greetingText = () => screen.getByTestId("greeting").textContent;

const inLondon = () =>
  mockUseProfile.mockReturnValue({
    loading: false,
    profile: { location: { city: "London" } },
  });

// "Pull up a chair in {City of the visitor}" as Contentful stores it.
const bannerEntry = ({ enabled = true } = {}) => ({
  fields: {
    enabled,
    message: {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: "text",
              value: "Pull up a chair in ",
              marks: [],
              data: {},
            },
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
    },
  },
});

describe("GreetingBanner", () => {
  describe("without CMS content", () => {
    it("greets the visitor by city once the profile resolves", () => {
      inLondon();

      render(<GreetingBanner />);

      expect(greetingText()).toBe("Hello London, we're glad you are here");
    });

    it("keeps the sentence complete while the profile is still loading", () => {
      // The SDK's own MergeTag renders null until the profile resolves, which
      // would paint "Hello , we're glad..." on first load.
      mockUseProfile.mockReturnValue({ loading: true, profile: null });

      render(<GreetingBanner />);

      expect(greetingText()).toBe("Hello there, we're glad you are here");
    });

    it("falls back when the profile resolves without a city", () => {
      mockUseProfile.mockReturnValue({
        loading: false,
        profile: { location: { countryCode: "GB" } },
      });

      render(<GreetingBanner />);

      expect(greetingText()).toBe("Hello there, we're glad you are here");
    });
  });

  describe("with CMS content", () => {
    it("renders the authored message, resolving its merge tags", () => {
      inLondon();

      render(<GreetingBanner banner={bannerEntry()} />);

      expect(greetingText()).toBe("Pull up a chair in London");
    });

    it("uses the merge tag's own fallback while loading", () => {
      mockUseProfile.mockReturnValue({ loading: true, profile: null });

      render(<GreetingBanner banner={bannerEntry()} />);

      expect(greetingText()).toBe("Pull up a chair in there");
    });

    it("renders nothing when the editor switches the banner off", () => {
      inLondon();

      const { container } = render(
        <GreetingBanner banner={bannerEntry({ enabled: false })} />,
      );

      expect(container).toBeEmptyDOMElement();
    });

    it("falls back to the built-in copy when the entry has no message", () => {
      inLondon();

      render(<GreetingBanner banner={{ fields: { enabled: true } }} />);

      expect(greetingText()).toBe("Hello London, we're glad you are here");
    });
  });
});
