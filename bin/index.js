#!/usr/bin/env node
import inquirer from 'inquirer';
import path from 'path';
import { firstQuestion, questions, separetedFiles } from './src/promptArrays/index.js';
import criarEstruturaDePastasReactTsWebpack from './src/templates/react-ts-webpack/index.js';
import createAndInstallTsEslintPrettier from './src/presets/ts-eslint-prettier/index.js';
import simpleHtmlJsCssStructure from './src/templates/simpleHtmlJsCssStructure/index.js';
import createAndInstallJsEslint from './src/presets/js-eslint/index.js';
inquirer.prompt(firstQuestion).then(function (answer) {
    var userFisrtInput = {
        firstQuestionChoice: answer.firstQuestionChoice,
        packageManager: answer.packageManager,
    };
    if (userFisrtInput.firstQuestionChoice === 'Complete template') {
        inquirer.prompt(questions).then(function (answers) {
            var currentFolder = path.basename(process.cwd()).replace(/\s+/g, '-');
            var userInput = {
                packageManager: userFisrtInput.packageManager,
                appName: answers.appName || currentFolder,
                appDescription: answers.appDescription || 'App Description',
                appAuthor: answers.appAuthor || '',
                appLicense: answers.appLicense || 'ISC',
                selectedTemplate: answers.template,
            };
            switch (userInput.selectedTemplate) {
                case 'reactjs_ts_webpack_react-router-dom_styled-components_babel':
                    criarEstruturaDePastasReactTsWebpack(userInput);
                    break;
                case 'simple-Html-Js-Css-Structure':
                    simpleHtmlJsCssStructure(userInput);
                    break;
                default:
                    console.error("This template doesn't exist");
                    break;
            }
        });
    }
    else if (userFisrtInput.firstQuestionChoice === 'Separete files') {
        inquirer.prompt(separetedFiles).then(function (answers) {
            var separetedFiles = {
                packageManager: userFisrtInput.packageManager,
                filesToInstall: answers.filesToInstall,
            };
            switch (separetedFiles.filesToInstall) {
                case 'ts-eslint-prettier':
                    createAndInstallTsEslintPrettier(separetedFiles);
                    break;
                case 'js-eslint-generic':
                    createAndInstallJsEslint(separetedFiles);
                    break;
                default:
                    console.error("This files doesn't exist");
                    break;
            }
        });
    }
    else {
        console.error('Exit, Process finished');
    }
});
