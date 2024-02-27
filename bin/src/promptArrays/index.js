export var templateChoices = [
    'reactjs_ts_webpack_react-router-dom_styled-components_babel',
    'simple-Html-Js-Css-Structure',
    'js-express-sequelise-dotenv-nodemon-sucrase',
    'ts-express-sequelise-dotenv-nodemon-tsnode',
];
export var packageManager = ['npm', 'yarn'];
export var firstChoice = ['Complete template', 'Separete files'];
export var filesToInstall = ['js-eslint-generic', 'ts-eslint-prettier'];
export var firstQuestion = [
    {
        type: 'list',
        name: 'firstQuestionChoice',
        message: 'Install separate files or complete template?',
        choices: firstChoice,
    },
    {
        type: 'list',
        name: 'packageManager',
        message: 'Choose package manager: ',
        choices: packageManager,
    },
];
export var separetedFiles = [
    {
        type: 'list',
        name: 'filesToInstall',
        message: 'Choose your configuration: ',
        choices: filesToInstall,
    },
];
export var questions = [
    {
        type: 'input',
        name: 'appName',
        message: 'Enter the name of your app in package.json:',
    },
    {
        type: 'input',
        name: 'appDescription',
        message: 'Enter the description:',
    },
    {
        type: 'input',
        name: 'appAuthor',
        message: 'Enter the author:',
    },
    {
        type: 'input',
        name: 'appLicense',
        message: 'Enter the license:',
    },
    {
        type: 'list',
        name: 'template',
        message: 'Choose a template:',
        choices: templateChoices,
    },
];
