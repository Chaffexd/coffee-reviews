const stubClient = {
  getEntries: jest.fn(() => Promise.resolve({ items: [] })),
  getEntry: jest.fn(() => Promise.resolve({})),
};

// lib/contentful.js chains .withoutUnresolvableLinks, so the stub has to expose
// it too. It returns a client with the same surface in the real SDK.
stubClient.withoutUnresolvableLinks = stubClient;

export const createClient = jest.fn(() => stubClient);
