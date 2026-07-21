import { render, screen } from "@testing-library/react";
import BeanRating, { beanScore, StampScore } from "@/components/BeanRating";

describe("beanScore", () => {
  it("maps a 0-100 rating to a 0-5 score", () => {
    expect(beanScore(100)).toBe(5);
    expect(beanScore(92)).toBeCloseTo(4.6);
    expect(beanScore(0)).toBe(0);
  });
  it("clamps out-of-range input", () => {
    expect(beanScore(140)).toBe(5);
    expect(beanScore(-10)).toBe(0);
  });
});

describe("BeanRating", () => {
  it("renders 5 bean glyphs and the numeric value", () => {
    render(<BeanRating rating={92} />);
    expect(screen.getAllByTestId("bean")).toHaveLength(5);
    expect(screen.getByText("4.6")).toBeInTheDocument();
  });

  it("renders a half bean at a half-score rating (90 -> 4.5)", () => {
    render(<BeanRating rating={90} />);
    const opacities = screen
      .getAllByTestId("bean")
      .map((svg) => svg.querySelector("ellipse").getAttribute("opacity"));
    expect(opacities.filter((o) => o === "1")).toHaveLength(4);
    expect(opacities.filter((o) => o === "0.55")).toHaveLength(1);
    expect(opacities.filter((o) => o === "0.32")).toHaveLength(0);
  });

  it("renders all full beans at max rating", () => {
    render(<BeanRating rating={100} />);
    const opacities = screen
      .getAllByTestId("bean")
      .map((svg) => svg.querySelector("ellipse").getAttribute("opacity"));
    expect(opacities.every((o) => o === "1")).toBe(true);
  });

  it("renders all empty beans at a zero rating", () => {
    render(<BeanRating rating={0} />);
    const opacities = screen
      .getAllByTestId("bean")
      .map((svg) => svg.querySelector("ellipse").getAttribute("opacity"));
    expect(opacities.every((o) => o === "0.32")).toBe(true);
  });

  it("hides the numeric label when showValue is false", () => {
    render(<BeanRating rating={100} showValue={false} />);
    expect(screen.queryByText("5.0")).not.toBeInTheDocument();
  });
});

describe("StampScore", () => {
  it("renders the score and label", () => {
    render(<StampScore rating={92} />);
    expect(screen.getByText("4.6")).toBeInTheDocument();
    expect(screen.getByText("BEAN SCORE")).toBeInTheDocument();
  });
});
