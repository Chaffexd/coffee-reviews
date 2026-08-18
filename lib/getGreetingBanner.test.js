import { getGreetingBanner } from "@/lib/getGreetingBanner";
import { client } from "@/lib/contentful";

jest.mock("@/lib/contentful", () => ({
  client: { getEntries: jest.fn() },
}));

const returning = (items) =>
  client.getEntries.mockResolvedValue({ items });

const queryFor = async (locale) => {
  returning([]);
  await getGreetingBanner(locale);
  return client.getEntries.mock.calls.at(-1)[0];
};

beforeEach(() => jest.clearAllMocks());

describe("getGreetingBanner", () => {
  it("pins the query to a specific entry", async () => {
    // Variants are entries of the same content type, so filtering by
    // content_type alone returns an arbitrary one of them — which rendered a
    // variant directly and skipped personalization entirely.
    const query = await queryFor("en-GB");

    expect(query["sys.id"]).toBeTruthy();
    expect(query.content_type).toBe("greetingBanner");
  });

  it("asks deep enough to resolve variants and their merge tags", async () => {
    // banner -> nt_experiences -> nt_variants -> message -> nt_mergetag
    const query = await queryFor("en-GB");

    expect(query.include).toBeGreaterThanOrEqual(4);
  });

  it("translates the routing-only 'default' locale", async () => {
    // Contentful answers "Unknown locale: default" and the build fails.
    expect((await queryFor("default")).locale).toBe("en-GB");
  });

  it("falls back when no locale is given at all", async () => {
    expect((await queryFor(undefined)).locale).toBe("en-GB");
  });

  it("passes a real locale straight through", async () => {
    expect((await queryFor("ja-JP")).locale).toBe("ja-JP");
  });

  it("returns the entry when one is published", async () => {
    returning([{ sys: { id: "banner-1" }, fields: {} }]);

    await expect(getGreetingBanner("en-GB")).resolves.toMatchObject({
      sys: { id: "banner-1" },
    });
  });

  it("returns null, not undefined, when nothing is published", async () => {
    // getStaticProps props have to be JSON-serialisable.
    returning([]);

    await expect(getGreetingBanner("en-GB")).resolves.toBeNull();
  });
});
