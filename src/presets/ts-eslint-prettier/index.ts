import spawn from "cross-spawn";
import { SeparetedFiles } from "../../types/index";
import * as fs from "fs";

function installDependencies(
	packageManager: SeparetedFiles["packageManager"],
	dependencies: string[],
) {
	const args =
		packageManager === "npm"
			? ["install", "--save-dev", ...dependencies]
			: ["add", "--dev", ...dependencies];

	const child = spawn(packageManager, args, { stdio: "inherit" });

	return new Promise<number>((resolve, reject) => {
		child.on("exit", (code) => {
			if (code === 0) {
				resolve(code);
			} else {
				reject(new Error(`Error running '${packageManager} install' with exit code ${code}`));
			}
		});
	});
}

async function createAndInstallTsEslintPrettier({ packageManager }: SeparetedFiles) {
	const eslintContent = `/* eslint-env node */
module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	root: true,
	rules: {},
};`;

	const prettierContent = `module.exports = {
	semi: true,
	trailingComma: 'all',
	singleQuote: true,
	printWidth: 100,
}`;

	if (!fs.existsSync(".eslintrc.js")) fs.writeFileSync(".eslintrc.js", eslintContent);
	if (!fs.existsSync(".prettierrc.js")) fs.writeFileSync(".prettierrc.js", prettierContent);

	const dependenciesToInstall = [
		"@typescript-eslint/parser",
		"@typescript-eslint/eslint-plugin",
		"eslint",
		"typescript",
		"prettier",
		"eslint-config-prettier",
		"eslint-plugin-prettier",
		"ts-node",
	];

	try {
		await installDependencies(packageManager, dependenciesToInstall);
		console.log("\ndependencies and devDependencies installed successfully\n");
		console.log(`# My App
## License Gabriel Logan Copyright 2023

## Happy hacking (:\n `);
	} catch (error: unknown) {
		switch (typeof error) {
			case "string":
				console.error(error); // Se for uma string, apenas imprima
				break;

			default:
				console.error("An unknown error occurred."); // Caso contrário, trate como erro desconhecido
				break;
		}
	}
}

export default createAndInstallTsEslintPrettier;
