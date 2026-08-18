import { render, screen } from "@testing-library/react";
import ProfileValue from "@/components/ProfileValue";

const mockUseProfile = jest.fn();

jest.mock("@ninetailed/experience.js-next", () => ({
  useProfile: () => mockUseProfile(),
}));

const resolved = (profile) => mockUseProfile.mockReturnValue({
  loading: false,
  profile,
});

describe("ProfileValue", () => {
  it("reads a dot path off the profile", () => {
    resolved({ location: { city: "London" } });

    render(<ProfileValue id="location.city" fallback="there" />);

    expect(screen.getByText("London")).toBeInTheDocument();
  });

  it("reads a nested trait path", () => {
    resolved({ traits: { company: { name: "Contentful" } } });

    render(<ProfileValue id="traits.company.name" />);

    expect(screen.getByText("Contentful")).toBeInTheDocument();
  });

  it("shows the fallback while the profile is still loading", () => {
    // The SDK's own MergeTag renders null here, which breaks any sentence the
    // tag sits inside on every cold load.
    mockUseProfile.mockReturnValue({ loading: true, profile: null });

    render(<ProfileValue id="location.city" fallback="there" />);

    expect(screen.getByText("there")).toBeInTheDocument();
  });

  it("shows the fallback when the path is missing", () => {
    resolved({ location: { countryCode: "GB" } });

    render(<ProfileValue id="location.city" fallback="there" />);

    expect(screen.getByText("there")).toBeInTheDocument();
  });

  it("does not blow up on a partially missing path", () => {
    resolved({});

    const { container } = render(
      <ProfileValue id="location.coordinates.latitude" fallback="somewhere" />,
    );

    expect(container.textContent).toBe("somewhere");
  });

  it("renders nothing when there is no value and no fallback", () => {
    resolved({ location: {} });

    const { container } = render(<ProfileValue id="location.city" />);

    expect(container.textContent).toBe("");
  });
});
