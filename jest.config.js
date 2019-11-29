module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        ".(ts|tsx)": "ts-jest"
    },
    moduleNameMapper: {
        "\\.(scss|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    moduleFileExtensions: ["ts", "tsx", "js"],
    setupFilesAfterEnv: [
        "<rootDir>/jest.setup.ts"
    ]
};