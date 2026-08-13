import { render, screen } from "@testing-library/react";
import GreetingBanner from "@/components/GreetingBanner";

const mockUseProfile = jest.fn();

jest.mock("@ninetailed/experience.js-next", () => ({
  useProfile: () => mockUseProfile(),
}));

const greetingText = () => screen.getByTestId("greeting").textContent;

describe("GreetingBanner", () => {
  it("greets the visitor by city once the profile resolves", () => {
    mockUseProfile.mockReturnValue({
      loading: false,
      profile: { location: { city: "London" } },
    });

    render(<GreetingBanner />);

    expect(greetingText()).toBe("Hello London, we're glad you are here");
  });

  it("keeps the sentence complete while the profile is still loading", () => {
    // The SDK's own MergeTag renders null until the profile resolves, which
    // would paint "Hello , we're glad..." on first load. The banner is always
    // visible, so it holds the fallback word instead.
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
