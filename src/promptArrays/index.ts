export const templateChoices = [
	"reactjs_ts_webpack_react-router-dom_styled-components_babel",
	"simple-Html-Js-Css-Structure",
	"js-express-sequelise-dotenv-nodemon-sucrase",
	"ts-express-sequelise-dotenv-nodemon-tsnode",
] as const;

export const packageManager = ["npm", "yarn"] as const;

export const firstChoice = ["Complete template", "Separete files"] as const;

export const filesToInstall = ["js-eslint-generic", "ts-eslint-prettier"] as const;

// Arrays ->
export const firstQuestion = [
	{
		type: "list",
		name: "firstQuestionChoice",
		message: "Install separate files or complete template?",
		choices: firstChoice,
	},
	{
		type: "list",
		name: "packageManager",
		message: "Choose package manager: ",
		choices: packageManager,
	},
];

export const separetedFiles = [
	{
		type: "list",
		name: "filesToInstall",
		message: "Choose your configuration: ",
		choices: filesToInstall,
	},
];

export const questions = [
	{
		type: "input",
		name: "appName",
		message: "Enter the name of your app in package.json:",
	},
	{
		type: "input",
		name: "appDescription",
		message: "Enter the description:",
	},
	{
		type: "input",
		name: "appAuthor",
		message: "Enter the author:",
	},
	{
		type: "input",
		name: "appLicense",
		message: "Enter the license:",
	},
	{
		type: "list",
		name: "template",
		message: "Choose a template:",
		choices: templateChoices,
	},
];
