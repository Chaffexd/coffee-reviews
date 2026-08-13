# Content model migrations

Schema changes as code, run through `contentful-cli`. One logical change per
file, numbered in the order they must run.

## Running one

Two credentials, neither of which lives in `.env.local`:

```bash
export CONTENTFUL_SPACE_ID=a3pray39687x
export CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=<CMA token>

npm run migrate -- migrations/002-add-featured-reviews-block-to-page.js
```

Create the CMA token at **Account settings → CMA tokens**
(`https://app.contentful.com/account/profile/cma_tokens`). It is a personal
token with write access to the whole space — keep it out of git.

The CLI prints a diff and waits for confirmation before applying anything.

## Testing first

`master` is the only environment in this space, so there is no sandbox to
rehearse in. To make one:

```bash
npx contentful space environment create --name sandbox --source master
npm run migrate -- migrations/002-... --environment-id sandbox
```

Worth doing for anything that edits or deletes an existing field. Purely
additive migrations like 002 are low risk.

## Applied state

| Migration | master |
|---|---|
| `001-create-featured-reviews-block` | Applied via CMA, not via this script |
| `002-add-featured-reviews-block-to-page` | Pending |

001 is kept so a fresh environment can be built from migrations alone. Running
it against `master` will fail with "content type already exists" — expected.
