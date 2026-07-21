import { render, screen } from "@testing-library/react";
import BeanRating, { beanScore } from "@/components/BeanRating";

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
});
