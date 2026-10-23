/**
 * Adds an optional one-line summary to reviews (article) and articles
 * (coffeeArticle), used as the link description in /llms.txt.
 *
 * NOT YET APPLIED. lib/llms.js reads llmSummary first and falls back to the
 * SEO description, then the intro snippet, so nothing breaks before it runs.
 * Try it against a sandbox environment first:
 *   npm run migrate -- migrations/003-add-llm-summary.js --environment-id sandbox
 */
module.exports = function (migration) {
  for (const id of ["article", "coffeeArticle"]) {
    const contentType = migration.editContentType(id);

    contentType
      .createField("llmSummary")
      .name("LLM summary")
      .type("Symbol")
      .localized(true)
      .validations([{ size: { max: 200 } }]);

    contentType.changeFieldControl("llmSummary", "builtin", "singleLine", {
      helpText:
        "One factual line describing this page for AI agents (llms.txt): what it covers, not a sales pitch.",
    });
  }
};
