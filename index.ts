#!/usr/bin/env node

import inquirer from 'inquirer';
import path from 'path';
import criarEstruturaDePastasReactTsWebpack from './src/react-ts-webpack/index.js';
import { questions, userInputProps } from './src/types/index.js';

inquirer.prompt(questions).then((answers) => {
	const currentFolder = path.basename(process.cwd()).replace(/\s+/g, '-');

	const userInput: userInputProps = {
		packageManager: answers.packageManager,
		appName: answers.appName || currentFolder,
		appDescription: answers.appDescription || 'App Description',
		appAuthor: answers.appAuthor || '',
		appLicense: answers.appLicense || 'ISC',
		selectedTemplate: answers.template,
	};

	if (
		userInput.selectedTemplate === 'reactjs_ts_webpack_react-router-dom_styled-components_babel'
	) {
		criarEstruturaDePastasReactTsWebpack(userInput);
	} else {
		console.error("This template doesn't exist");
	}
});
