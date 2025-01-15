import { render, screen } from "@testing-library/react";
import ArticleCard from "@/components/ArticleCard";
import { mockLandingPageProps } from "@/lib/exampleEntry";

describe("ArticleCard", () => {
  it("renders the article card with correct data", () => {
    render(<ArticleCard article={mockLandingPageProps.fields.featuredArticles[0]} />);

    // Check that the image is rendered
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();

    // Check that the title is rendered
    const title = screen.getByRole("heading", { level: 3 });
    expect(title).toBeInTheDocument();
  });
});
