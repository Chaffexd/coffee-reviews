import { render, screen } from "@testing-library/react";
import { RenderBaselineWhileLoading } from "@/components/FeaturedReviews";

jest.mock("@ninetailed/experience.js-next", () => ({
  useNinetailed: () => ({ track: jest.fn() }),
  EntryAnalytics: ({ component: Component, ...props }) => (
    <Component {...props} />
  ),
}));

// <Experience> calls the loading component with the baseline props plus three of
// its own. Those three must not reach the wrapped component.
const Probe = (props) => (
  <div data-testid="probe">{JSON.stringify(Object.keys(props).sort())}</div>
);

describe("RenderBaselineWhileLoading", () => {
  const experienceProps = {
    component: Probe,
    passthroughProps: undefined,
    experiences: [{ id: "exp-1" }],
    eyebrow: "Featured reviews",
    reviews: [{ sys: { id: "review-1" } }],
    id: "block-1",
  };

  it("passes the baseline fields through to the component", () => {
    render(<RenderBaselineWhileLoading {...experienceProps} />);

    expect(JSON.parse(screen.getByTestId("probe").textContent)).toEqual([
      "eyebrow",
      "id",
      "reviews",
    ]);
  });

  it("does not leak component, experiences or passthroughProps", () => {
    render(<RenderBaselineWhileLoading {...experienceProps} />);

    const keys = JSON.parse(screen.getByTestId("probe").textContent);
    expect(keys).not.toContain("component");
    expect(keys).not.toContain("experiences");
    expect(keys).not.toContain("passthroughProps");
  });

  it("merges passthroughProps over the baseline", () => {
    render(
      <RenderBaselineWhileLoading
        {...experienceProps}
        passthroughProps={{ extra: true }}
      />,
    );

    expect(JSON.parse(screen.getByTestId("probe").textContent)).toContain(
      "extra",
    );
  });

  it("marks the resolving state outside production", () => {
    // The baseline and a resolved-to-baseline render are otherwise identical,
    // which hides a stuck or failing selection completely.
    const { container } = render(
      <RenderBaselineWhileLoading {...experienceProps} />,
    );

    expect(
      container.querySelector('[data-nt-state="resolving"]'),
    ).toBeInTheDocument();
  });
});
