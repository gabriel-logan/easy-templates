export declare const templateChoices: readonly [
	"reactjs_ts_webpack_react-router-dom_styled-components_babel",
	"simple-Html-Js-Css-Structure",
];
export declare const packageManager: readonly ["npm", "yarn"];
export declare const firstChoice: readonly ["Complete template", "Separete files"];
export declare const filesToInstall: readonly ["js-eslint-generic", "ts-eslint-prettier"];
export declare const firstQuestion: (
	| {
			type: string;
			name: string;
			message: string;
			choices: readonly ["Complete template", "Separete files"];
	  }
	| {
			type: string;
			name: string;
			message: string;
			choices: readonly ["npm", "yarn"];
	  }
)[];
export declare const separetedFiles: {
	type: string;
	name: string;
	message: string;
	choices: readonly ["js-eslint-generic", "ts-eslint-prettier"];
}[];
export declare const questions: (
	| {
			type: string;
			name: string;
			message: string;
			choices?: undefined;
	  }
	| {
			type: string;
			name: string;
			message: string;
			choices: readonly [
				"reactjs_ts_webpack_react-router-dom_styled-components_babel",
				"simple-Html-Js-Css-Structure",
			];
	  }
)[];
