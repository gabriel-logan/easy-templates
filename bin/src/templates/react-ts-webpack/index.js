var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as fs from 'fs';
import { exec } from 'child_process';
import spawn from 'cross-spawn';
function criarEstruturaDePastasReactTsWebpackRouterDomBabel(_a) {
    var packageManager = _a.packageManager, appAuthor = _a.appAuthor, appDescription = _a.appDescription, appLicense = _a.appLicense, appName = _a.appName;
    var notFoundPageContent = "import React from 'react';\nimport { Link } from 'react-router-dom';\nimport styled from 'styled-components';\n\nconst NotFoundContainer = styled.div`\n\ttext-align: center;\n\tmargin-top: 100px;\n\tfont-family: Arial, sans-serif;\n`;\n\nconst NotFoundHeading = styled.h1`\n\tfont-size: 2em;\n\tcolor: #ff0000;\n`;\n\nconst NotFoundText = styled.p`\n\tfont-size: 1.2em;\n`;\n\nconst NotFoundLink = styled(Link)`\n\ttext-decoration: none;\n\tcolor: #0074d9;\n`;\n\nfunction NotFound() {\n\treturn (\n\t\t<NotFoundContainer>\n\t\t\t<NotFoundHeading>404 - Page Not Found</NotFoundHeading>\n\t\t\t<NotFoundText>The page you are looking for does not exist.</NotFoundText>\n\t\t\t<NotFoundText>\n\t\t\t\tGo back to the <NotFoundLink to=\"/\">home page</NotFoundLink>.\n\t\t\t</NotFoundText>\n\t\t</NotFoundContainer>\n\t);\n}\n\nexport default NotFound;";
    var mainPageContent = "import React, { useState, useEffect } from 'react';\nimport { Link } from 'react-router-dom';\nimport styled, { keyframes } from 'styled-components';\n\ninterface UserData {\n\tlogin: string;\n\thtml_url: string;\n\tname: string;\n\tavatar_url: string;\n\tfollowers: number;\n\tfollowing: number;\n\tpublic_repos: number;\n\tcreated_at: string;\n\tupdated_at: string;\n}\n\nconst PageContainer = styled.div`\n\tfont-family: Arial, sans-serif;\n`;\n\nconst IntroContainer = styled.div`\n\tbackground-color: #0074d9;\n\tcolor: white;\n\tpadding: 20px;\n\ttext-align: center;\n`;\n\nconst MainContainer = styled.main`\n\ttext-align: center;\n\tpadding: 20px;\n`;\n\nconst MainHeading = styled.h1`\n\tfont-size: 2em;\n`;\n\nconst MainText = styled.p`\n\tfont-size: 1.2em;\n`;\n\nconst Image = styled.img`\n\tborder-radius: 50px;\n\twidth: 150px;\n\tanimation: rotate 4s linear infinite;\n`;\n\nconst rotate = keyframes`\n\tfrom {\n\t\ttransform: rotate(0deg);\n\t}\n\tto {\n\t\ttransform: rotate(360deg);\n\t}\n`;\n\nconst DivWithAnimation = styled.div`\n\tanimation: ${rotate} 4s linear infinite;\n`;\n\nconst H4 = styled.h4`\n\tcolor: #0074d9;\n\tfont-size: 1.5em;\n`;\n\nfunction Main() {\n\tconst [userData, setUserData] = useState<UserData | null>(null);\n\n\tuseEffect(() => {\n\t\tconst fetchUserData = async () => {\n\t\t\ttry {\n\t\t\t\tconst response = await fetch('https://api.github.com/users/gabriel-logan');\n\t\t\t\tif (response.ok) {\n\t\t\t\t\tconst data: UserData = await response.json();\n\t\t\t\t\tsetUserData(data);\n\t\t\t\t} else {\n\t\t\t\t\tconsole.error('Error fetching data:', response.status);\n\t\t\t\t}\n\t\t\t} catch (error) {\n\t\t\t\tconsole.error('Error fetching data:', error);\n\t\t\t}\n\t\t};\n\n\t\tfetchUserData();\n\t}, []);\n\n\treturn (\n\t\t<PageContainer>\n\t\t\t<IntroContainer>\n\t\t\t\t<MainHeading>My React Template</MainHeading>\n\t\t\t\t<MainText>This is a demo page created with my own React template.</MainText>\n\t\t\t\t{userData && <MainText>Created by: {userData.name}</MainText>}\n\t\t\t</IntroContainer>\n\t\t\t<MainContainer>\n\t\t\t\t{userData ? (\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<DivWithAnimation>\n\t\t\t\t\t\t\t<Image src={userData.avatar_url} alt=\"photo\" />\n\t\t\t\t\t\t</DivWithAnimation>\n\t\t\t\t\t\t<MainHeading>Welcome to my demo page</MainHeading>\n\t\t\t\t\t\t<H4>Application started successfully!!!</H4>\n\t\t\t\t\t\t<MainText>This is an example of how you can use the GitHub API:</MainText>\n\t\t\t\t\t\t<MainText>Name: {userData.name || 'Name not provided'}</MainText>\n\t\t\t\t\t\t<MainText>Username: {userData.login}</MainText>\n\t\t\t\t\t\t<MainText>Followers: {userData.followers}</MainText>\n\t\t\t\t\t\t<MainText>Following: {userData.following}</MainText>\n\t\t\t\t\t\t<Link to={userData.html_url} target=\"_blank\">\n\t\t\t\t\t\t\tVisit my GitHub profile\n\t\t\t\t\t\t</Link>\n\t\t\t\t\t</div>\n\t\t\t\t) : (\n\t\t\t\t\t<MainText>Loading user data...</MainText>\n\t\t\t\t)}\n\t\t\t</MainContainer>\n\t\t</PageContainer>\n\t);\n}\n\nexport default Main;";
    var routesContent = "import React from 'react';\n// Server routes\nimport { Route, Routes } from 'react-router-dom';\n\n// Page 404\nimport NotFoundPage from '../pages/NotFound';\n\n// My Pages\nimport Main from '../pages/Main';\n\nexport default function ConfigRoutes() {\n\treturn (\n\t\t<Routes>\n\t\t\t<Route path=\"/\" element={<Main />} />\n\t\t\t<Route path=\"*\" element={<NotFoundPage />} />\n\t\t</Routes>\n\t);\n}";
    var appContent = "import React from 'react';\n\nimport { BrowserRouter as Router } from 'react-router-dom';\n\nimport MyRoutes from './Routes';\n\nimport GlobalStyleComponent from './styles/global';\n\nfunction App() {\n\treturn (\n\t\t<Router>\n\t\t\t<GlobalStyleComponent />\n\t\t\t<MyRoutes />\n\t\t</Router>\n\t);\n}\n\nexport default App;";
    var indexContent = "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);\nroot.render(\n\t<React.StrictMode>\n\t\t<App />\n\t</React.StrictMode>,\n);";
    var packageJsonContent = "{\n\t\"name\": \"".concat(appName, "\",\n\t\"version\": \"1.0.0\",\n\t\"description\": \"").concat(appDescription, "\",\n\t\"author\": \"").concat(appAuthor, "\",\n\t\"keywords\": [],\n\t\"license\": \"").concat(appLicense, "\",\n\t\"private\": true,\n\t\"scripts\": {\n\t\t\"lint\": \"npx eslint src --fix\",\n\t\t\"start\": \"webpack serve --mode development\",\n\t\t\"build\": \"webpack --mode production\"\n\t},\n\t\"dependencies\": {},\n\t\"devDependencies\": {}\n}");
    var prettierContent = "module.exports = {\n\tsemi: true,\n\ttrailingComma: 'all',\n\tsingleQuote: true,\n\tprintWidth: 100,\n}";
    var eslintContent = "/* eslint-env node */\nmodule.exports = {\n\textends: [\n\t\t'eslint:recommended',\n\t\t'plugin:@typescript-eslint/recommended',\n\t\t'plugin:prettier/recommended',\n\t],\n\tparser: '@typescript-eslint/parser',\n\tplugins: ['@typescript-eslint', 'react-hooks'],\n\troot: true,\n\trules: {\n\t\t'react-hooks/rules-of-hooks': 'error', // Check rules of Hooks\n\t\t'react-hooks/exhaustive-deps': 'warn', // Add this rule\n\t},\n};";
    var babelRcContent = '{"presets": ["@babel/preset-env", "@babel/preset-react"]}';
    var webpackContent = "const path = require('path');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\nconst CopyPlugin = require('copy-webpack-plugin');\n\nmodule.exports = {\n\tentry: './src/index.tsx',\n\toutput: {\n\t\tpath: path.resolve(__dirname, 'build'),\n\t\tfilename: 'bundle.js',\n\t},\n\tmodule: {\n\t\trules: [\n\t\t\t{\n\t\t\t\ttest: /\\.(js|jsx|ts|tsx)$/,\n\t\t\t\texclude: /node_modules/,\n\t\t\t\tuse: ['babel-loader', 'ts-loader'],\n\t\t\t},\n\n\t\t\t// Regra para arquivos CSS\n\t\t\t{\n\t\t\t\ttest: /\\.css$/,\n\t\t\t\tuse: ['style-loader', 'css-loader'],\n\t\t\t},\n\t\t],\n\t},\n\tresolve: {\n\t\textensions: ['.js', '.jsx', '.ts', '.tsx'],\n\t},\n\tplugins: [\n\t\tnew HtmlWebpackPlugin({\n\t\t\ttemplate: './public/index.html',\n\t\t}),\n\t\tnew CopyPlugin({\n\t\t\tpatterns: [{ from: 'public/static', to: '.' }],\n\t\t}),\n\t],\n\tdevtool: 'nosources-source-map',\n\tdevServer: {\n\t\tstatic: {\n\t\t\tdirectory: path.join(__dirname, 'public'), // Diret\u00F3rio raiz para arquivos est\u00E1ticos\n\t\t\twatch: true,\n\t\t},\n\t\tport: 3000,\n\t\thistoryApiFallback: true, // Configura\u00E7\u00E3o para tratar rotas desconhecidas\n\t\topen: true,\n\t\tcompress: true,\n\t\thot: true,\n\t},\n};";
    var tsconfigContent = "{\n\t\"compilerOptions\": {\n\t\t\"target\": \"es2016\",\n\t\t\"lib\": [\"DOM\", \"ESNext\"],\n\t\t\"jsx\": \"react\",\n\t\t\"module\": \"commonjs\",\n\t\t\"esModuleInterop\": true,\n\t\t\"forceConsistentCasingInFileNames\": true,\n\t\t\"strict\": true,\n\t\t\"skipLibCheck\": true\n\t}\n}";
    var readmeContent = "#MY app";
    var indexHtmlContent = "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset=\"UTF-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t<title>My App</title>\n\t<meta\n\t\tname=\"description\"\n\t\tcontent=\"Web site created using logan-templates\"\n\t/>\n</head>\n<body>\n\t<noscript>You need to enable JavaScript to run this app.</noscript>\n\t<div id=\"root\"></div>\n</body>\n</html>";
    var gitIgnoreContent = "# dependencies\n/node_modules\n/.pnp\n.pnp.js\n\n# testing\n/coverage\n\n# production\n/build\n\n# misc\n.DS_Store\n.env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\n\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*";
    var robotsContent = "# https://www.robotstxt.org/robotstxt.html\nUser-agent: *\nDisallow:";
    var globalStylesContent = "import { createGlobalStyle } from 'styled-components';\n\nconst GlobalStyleComponent = createGlobalStyle`\n\tbody{\n\t\tmargin: 0;\n    padding: 0;\n\t}\n\tsection{\n\t\tmin-height: 100vh;\n\t}\n\tbutton{\n\t\tcursor: pointer;\n\t}\n\ta{\n\t\tcursor: pointer;\n\t}\n`;\n\nexport default GlobalStyleComponent;";
    var folderName = appName;
    if (fs.existsSync(folderName)) {
        fs.rmSync(folderName, { recursive: true, force: true });
    }
    fs.mkdirSync(folderName);
    fs.mkdirSync(folderName + '/src');
    fs.mkdirSync(folderName + '/src/components');
    fs.mkdirSync(folderName + '/src/configs');
    fs.mkdirSync(folderName + '/src/pages');
    fs.mkdirSync(folderName + '/src/pages/Main');
    fs.mkdirSync(folderName + '/src/pages/NotFound');
    fs.mkdirSync(folderName + '/src/Routes');
    fs.mkdirSync(folderName + '/src/styles');
    fs.mkdirSync(folderName + '/src/styles/global');
    fs.mkdirSync(folderName + '/src/types');
    fs.mkdirSync(folderName + '/public');
    fs.mkdirSync(folderName + '/public/static');
    fs.writeFileSync(folderName + '/public/static/robots.txt', robotsContent);
    fs.writeFileSync(folderName + '/public/index.html', indexHtmlContent);
    fs.writeFileSync(folderName + '/src/pages/Main/index.tsx', mainPageContent);
    fs.writeFileSync(folderName + '/src/pages/NotFound/index.tsx', notFoundPageContent);
    fs.writeFileSync(folderName + '/src/Routes/index.tsx', routesContent);
    fs.writeFileSync(folderName + '/src/styles/global/index.ts', globalStylesContent);
    fs.writeFileSync(folderName + '/src/App.tsx', appContent);
    fs.writeFileSync(folderName + '/src/index.tsx', indexContent);
    fs.writeFileSync(folderName + '/package.json', packageJsonContent);
    fs.writeFileSync(folderName + '/tsconfig.json', tsconfigContent);
    fs.writeFileSync(folderName + '/webpack.config.js', webpackContent);
    fs.writeFileSync(folderName + '/.gitignore', gitIgnoreContent);
    fs.writeFileSync(folderName + '/.eslintrc.js', eslintContent);
    fs.writeFileSync(folderName + '/.eslintignore', 'webpack.config.js');
    fs.writeFileSync(folderName + '/.babelrc', babelRcContent);
    fs.writeFileSync(folderName + '/.prettierrc.js', prettierContent);
    fs.writeFileSync(folderName + '/README.md', readmeContent);
    var installDependencies = ['install'];
    var installDevDependencies = ['install'];
    var dependencies = ['react', 'react-dom', 'react-router-dom', 'styled-components'];
    var devDependencies = [
        '@babel/core',
        '@babel/preset-env',
        '@babel/preset-react',
        '@types/node',
        '@types/react',
        '@types/react-dom',
        '@types/react-router-dom',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'babel-loader',
        'copy-webpack-plugin',
        'css-loader',
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'eslint-plugin-react-hooks',
        'html-webpack-plugin',
        'prettier',
        'style-loader',
        'ts-loader',
        'ts-node',
        'typescript',
        'webpack',
        'webpack-cli',
        'webpack-dev-server',
    ];
    switch (packageManager) {
        case 'yarn':
            installDependencies = __spreadArray(['add'], dependencies, true);
            installDevDependencies = __spreadArray(['add', '--dev'], devDependencies, true);
            break;
        default:
            installDependencies = __spreadArray(['install'], dependencies, true);
            installDevDependencies = __spreadArray(['install', 'save-dev'], devDependencies, true);
            break;
    }
    var child = spawn(packageManager, installDependencies, { cwd: folderName, stdio: 'inherit' });
    child.on('exit', function (code) {
        if (code === 0) {
            var child2devDep = spawn(packageManager, installDevDependencies, {
                cwd: folderName,
                stdio: 'inherit',
            });
            child2devDep.on('exit', function (code) {
                if (code === 0) {
                    console.log('\nFolder structure created and dependencies installed successfully\n');
                    console.log("# My App\n\nThis is my app.\n\n## Getting Started\n\nTo get started, run the following commands:\n\n### npm start\n\n### 'npm run build'\n\n### yarn start\n\n### yarn build\n\nThen, open [http://localhost:3000] to view it in the browser.\n\n## License Gabriel Logan Copyright 2023\n\n## Happy hacking (: \n");
                    exec(packageManager === 'npm'
                        ? "cd ".concat(folderName, " && npm run lint")
                        : "cd ".concat(folderName, " && yarn lint"));
                    var child2 = spawn('cd', [folderName]);
                    child2.on('exit', function (code) {
                        if (code === 0) {
                            console.log("Run npm start or yarn start - ".concat(folderName, " directory"));
                        }
                        else {
                            console.error("Error navigating to the ".concat(folderName, " directory"));
                        }
                    });
                }
                else {
                    console.error("Error running '".concat(packageManager, " install' with exit code ").concat(code));
                }
            });
        }
        else {
            console.error("Error running '".concat(packageManager, " install' with exit code ").concat(code));
        }
    });
}
export default criarEstruturaDePastasReactTsWebpackRouterDomBabel;
