/* eslint-env node */
module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	parser: "@typescript-eslint/parser",
	ignorePatterns: ["node_modules/", "dist/", "bin/"],
	plugins: ["@typescript-eslint"],
	root: true,
	rules: {},
};
