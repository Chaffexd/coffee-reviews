import { flattenVariant, mapEntryExperiences } from "@/lib/experiences";

const variantEntry = {
  sys: { id: "variant-1", contentType: { sys: { id: "featuredReviews" } } },
  metadata: { tags: [], concepts: [] },
  fields: {
    internalName: "Homepage featured — Europe",
    eyebrow: "Featured in Europe",
    reviews: [{ sys: { id: "review-1" } }],
  },
};

describe("flattenVariant", () => {
  it("lifts the variant's fields to the top level, matching the baseline shape", () => {
    // <Experience> spreads the variant straight onto the component, so the
    // fields have to sit alongside id — not nested under .fields.
    expect(flattenVariant(variantEntry)).toEqual({
      id: "variant-1",
      internalName: "Homepage featured — Europe",
      eyebrow: "Featured in Europe",
      reviews: [{ sys: { id: "review-1" } }],
    });
  });

  it("keeps the entry id rather than any id inside fields", () => {
    expect(flattenVariant(variantEntry).id).toBe("variant-1");
  });
});

describe("mapEntryExperiences", () => {
  it("returns an empty array when the entry has no nt_experiences", () => {
    expect(mapEntryExperiences({ fields: {} })).toEqual([]);
  });

  it("returns an empty array for a missing entry", () => {
    expect(mapEntryExperiences(undefined)).toEqual([]);
  });

  it("drops experiences that do not validate", () => {
    // Unresolved links and half-published experiences reach us as bare objects.
    const entry = { fields: { nt_experiences: [{ sys: { id: "bare-link" } }] } };
    expect(mapEntryExperiences(entry)).toEqual([]);
  });
});
