/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Add the transform property to handle JSX and modern syntax
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  testEnvironment: "jsdom", // For browser-like testing

  // Ignore transformations for node_modules except for specific modules if needed
  transformIgnorePatterns: [
    "/node_modules/(?!next).+\\.js$", // Allow Next.js to be transformed
  ],
  moduleDirectories: ['node_modules', __dirname],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    //"^contentful$": "<rootDir>/__mocks__/contentful.js", // Correct mapping
    "^@contentful/rich-text-types$":
      "<rootDir>/node_modules/@contentful/rich-text-types",
  },
};

module.exports = config;
