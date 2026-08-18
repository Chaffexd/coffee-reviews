/**
 * Links the featuredReviews block onto the landing page.
 *
 * featuredArticles is deliberately left in place. pages/index.js falls back to
 * it when no block is linked, which is both a safe rollout and the rollback
 * path: clear featuredReviewsBlock on the page entry and the original grid
 * returns.
 *
 * This must run as a migration rather than a plain CMA content type update.
 * `page` has aliased internal field ids (agehpQENhCdh45vK -> landingPageTitle,
 * N3NXQMvofMGfcA31 -> featuredArticles, pezh -> nt_experiences), and a full
 * PUT that omits apiName would drop those fields and take their entry content
 * with them. createField only appends, so the aliases are untouched.
 */
module.exports = function (migration) {
  const page = migration.editContentType("page");

  page
    .createField("featuredReviewsBlock")
    .name("Featured Reviews Block")
    .type("Link")
    .linkType("Entry")
    .required(false)
    .localized(false)
    .validations([{ linkContentType: ["featuredReviews"] }]);

  page.moveField("featuredReviewsBlock").afterField("featuredArticles");
};
