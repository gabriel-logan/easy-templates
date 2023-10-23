const templateChoices = ['reactjs_ts_webpack_react-router-dom_styled-components_babel'];
const packageManager = ['yarn', 'npm'];
export const questions = [
    {
        type: 'list',
        name: 'packageManager',
        message: 'Choose package manager:',
        choices: packageManager,
    },
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
