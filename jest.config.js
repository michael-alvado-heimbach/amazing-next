module.exports = {
	testPathIgnorePatterns: [
		"<rootDir>/.next/",
		"<rootDir>/out/",
		"<rootDir>/pages",
		"<rootDir>/node_modules/"
	],
	collectCoverage: true,
	moduleNameMapper: {
		"\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
	}
};
