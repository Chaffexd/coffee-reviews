/**
 * Creates the featuredReviews content type: a selectable group of reviews for
 * the homepage.
 *
 * It exists as its own entry rather than as a field on `page` because
 * Contentful Personalization swaps whole entries, not individual fields.
 * Variants of this block are cheap; variants of `page` would duplicate the
 * title, SEO metadata, carousel and rich text.
 *
 * ALREADY APPLIED to master via the CMA on 2026-08-13. Kept here so a fresh
 * environment can be built from the migrations alone — running it against
 * master will fail with "content type already exists", which is expected.
 */
module.exports = function (migration) {
  const featuredReviews = migration.createContentType("featuredReviews", {
    name: "🎯 Featured Reviews Block",
    description:
      "A selectable group of reviews for the homepage. Exists as its own entry so it can be personalized: variants of this block are swapped per audience.",
    displayField: "internalName",
  });

  featuredReviews
    .createField("internalName")
    .name("Internal Name")
    .type("Symbol")
    .required(true)
    .localized(false);

  featuredReviews
    .createField("eyebrow")
    .name("Eyebrow")
    .type("Symbol")
    .required(false)
    .localized(true)
    .defaultValue({ "en-GB": "Featured reviews" });

  featuredReviews
    .createField("reviews")
    .name("Reviews")
    .type("Array")
    .required(true)
    .localized(false)
    .validations([
      { size: { min: 1, max: 6 }, message: "Pick between 1 and 6 reviews" },
    ])
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["article"] }],
    });
};
