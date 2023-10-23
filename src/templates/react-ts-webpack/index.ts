import * as fs from 'fs';
import { exec } from 'child_process';
import spawn from 'cross-spawn';
import { UserInputProps } from '../../types/index';

// Função para criar a estrutura de pastas e arquivos

function criarEstruturaDePastasReactTsWebpackRouterDomBabel({
	packageManager,
	appAuthor,
	appDescription,
	appLicense,
	appName,
}: UserInputProps) {
	const notFoundPageContent = `import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div\`
	text-align: center;
	margin-top: 100px;
	font-family: Arial, sans-serif;
\`;

const NotFoundHeading = styled.h1\`
	font-size: 2em;
	color: #ff0000;
\`;

const NotFoundText = styled.p\`
	font-size: 1.2em;
\`;

const NotFoundLink = styled(Link)\`
	text-decoration: none;
	color: #0074d9;
\`;

function NotFound() {
	return (
		<NotFoundContainer>
			<NotFoundHeading>404 - Page Not Found</NotFoundHeading>
			<NotFoundText>The page you are looking for does not exist.</NotFoundText>
			<NotFoundText>
				Go back to the <NotFoundLink to="/">home page</NotFoundLink>.
			</NotFoundText>
		</NotFoundContainer>
	);
}

export default NotFound;`;

	const mainPageContent = `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

interface UserData {
	login: string;
	html_url: string;
	name: string;
	avatar_url: string;
	followers: number;
	following: number;
	public_repos: number;
	created_at: string;
	updated_at: string;
}

const PageContainer = styled.div\`
	font-family: Arial, sans-serif;
\`;

const IntroContainer = styled.div\`
	background-color: #0074d9;
	color: white;
	padding: 20px;
	text-align: center;
\`;

const MainContainer = styled.main\`
	text-align: center;
	padding: 20px;
\`;

const MainHeading = styled.h1\`
	font-size: 2em;
\`;

const MainText = styled.p\`
	font-size: 1.2em;
\`;

const Image = styled.img\`
	border-radius: 50px;
	width: 150px;
	animation: rotate 4s linear infinite;
\`;

const rotate = keyframes\`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
\`;

const DivWithAnimation = styled.div\`
	animation: \${rotate} 4s linear infinite;
\`;

const H4 = styled.h4\`
	color: #0074d9;
	font-size: 1.5em;
\`;

function Main() {
	const [userData, setUserData] = useState<UserData | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch('https://api.github.com/users/gabriel-logan');
				if (response.ok) {
					const data: UserData = await response.json();
					setUserData(data);
				} else {
					console.error('Error fetching data:', response.status);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<PageContainer>
			<IntroContainer>
				<MainHeading>My React Template</MainHeading>
				<MainText>This is a demo page created with my own React template.</MainText>
				{userData && <MainText>Created by: {userData.name}</MainText>}
			</IntroContainer>
			<MainContainer>
				{userData ? (
					<div>
						<DivWithAnimation>
							<Image src={userData.avatar_url} alt="photo" />
						</DivWithAnimation>
						<MainHeading>Welcome to my demo page</MainHeading>
						<H4>Application started successfully!!!</H4>
						<MainText>This is an example of how you can use the GitHub API:</MainText>
						<MainText>Name: {userData.name || 'Name not provided'}</MainText>
						<MainText>Username: {userData.login}</MainText>
						<MainText>Followers: {userData.followers}</MainText>
						<MainText>Following: {userData.following}</MainText>
						<Link to={userData.html_url} target="_blank">
							Visit my GitHub profile
						</Link>
					</div>
				) : (
					<MainText>Loading user data...</MainText>
				)}
			</MainContainer>
		</PageContainer>
	);
}

export default Main;`;

	const routesContent = `import React from 'react';
// Server routes
import { Route, Routes } from 'react-router-dom';

// Page 404
import NotFoundPage from '../pages/NotFound';

// My Pages
import Main from '../pages/Main';

export default function ConfigRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}`;

	const appContent = `import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import MyRoutes from './Routes';

import GlobalStyleComponent from './styles/global';

function App() {
	return (
		<Router>
			<GlobalStyleComponent />
			<MyRoutes />
		</Router>
	);
}

export default App;`;

	const indexContent = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);`;

	const packageJsonContent = `{
	"name": "${appName}",
	"version": "1.0.0",
	"description": "${appDescription}",
	"author": "${appAuthor}",
	"keywords": [],
	"license": "${appLicense}",
	"private": true,
	"scripts": {
		"lint": "npx eslint src --fix",
		"start": "webpack serve --mode development",
		"build": "webpack --mode production"
	},
	"dependencies": {
		"react": "^18.2.0",
		"react-dom": "^18.2.0",
		"react-router-dom": "^6.17.0",
		"styled-components": "^6.1.0"
	},
	"devDependencies": {
		"@babel/core": "^7.23.2",
		"@babel/preset-env": "^7.23.2",
		"@babel/preset-react": "^7.22.15",
		"@types/node": "^20.8.7",
		"@types/react": "^18.2.29",
		"@types/react-dom": "^18.2.13",
		"@types/react-router-dom": "^5.3.3",
		"@typescript-eslint/eslint-plugin": "^6.8.0",
		"@typescript-eslint/parser": "^6.8.0",
		"babel-loader": "^9.1.3",
		"copy-webpack-plugin": "^11.0.0",
		"css-loader": "^6.8.1",
		"eslint": "^8.51.0",
		"eslint-config-prettier": "^9.0.0",
		"eslint-plugin-prettier": "^5.0.1",
		"eslint-plugin-react-hooks": "^4.6.0",
		"html-webpack-plugin": "^5.5.3",
		"prettier": "^3.0.3",
		"style-loader": "^3.3.3",
		"ts-loader": "^9.5.0",
		"ts-node": "^10.9.1",
		"typescript": "^5.2.2",
		"webpack": "^5.89.0",
		"webpack-cli": "^5.1.4",
		"webpack-dev-server": "^4.15.1"
	}
}`;

	const prettierContent = `module.exports = {
	semi: true,
	trailingComma: 'all',
	singleQuote: true,
	printWidth: 100,
}`;

	const eslintContent = `/* eslint-env node */
module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react-hooks'],
	root: true,
	rules: {
		'react-hooks/rules-of-hooks': 'error', // Check rules of Hooks
		'react-hooks/exhaustive-deps': 'warn', // Add this rule
	},
};`;

	const babelRcContent = '{"presets": ["@babel/preset-env", "@babel/preset-react"]}';

	const webpackContent = `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'ts-loader'],
			},

			// Regra para arquivos CSS
			{
				test: /\\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new CopyPlugin({
			patterns: [{ from: 'public/static', to: '.' }],
		}),
	],
	devtool: 'nosources-source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'), // Diretório raiz para arquivos estáticos
			watch: true,
		},
		port: 3000,
		historyApiFallback: true, // Configuração para tratar rotas desconhecidas
		open: true,
		compress: true,
		hot: true,
	},
};`;

	const tsconfigContent = `{
	"compilerOptions": {
		"target": "es2016",
		"lib": ["DOM", "ESNext"],
		"jsx": "react",
		"module": "commonjs",
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"strict": true,
		"skipLibCheck": true
	}
}`;

	const readmeContent = `#MY app`;

	const indexHtmlContent = `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>My App</title>
	<meta
		name="description"
		content="Web site created using logan-templates"
	/>
</head>
<body>
	<noscript>You need to enable JavaScript to run this app.</noscript>
	<div id="root"></div>
</body>
</html>`;

	const gitIgnoreContent = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*`;

	const robotsContent = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:`;

	const globalStylesContent = `import { createGlobalStyle } from 'styled-components';

const GlobalStyleComponent = createGlobalStyle\`
	body{
		margin: 0;
    padding: 0;
	}
	section{
		min-height: 100vh;
	}
	button{
		cursor: pointer;
	}
	a{
		cursor: pointer;
	}
\`;

export default GlobalStyleComponent;`;

	const folderName: string = appName;

	// Verifica se a pasta existe
	if (fs.existsSync(folderName)) {
		// Se existir, apaga a pasta e todo o seu conteúdo
		fs.rmSync(folderName, { recursive: true, force: true });
	}

	// Cria a pasta após a verificação
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

	const child = spawn(packageManager, ['install'], { cwd: folderName, stdio: 'inherit' });

	child.on('exit', (code) => {
		if (code === 0) {
			console.log('\nFolder structure created and dependencies installed successfully\n');
			console.log(`# My App

This is my app.

## Getting Started

To get started, run the following commands:

### npm start

### 'npm run build'

### yarn start

### yarn build

Then, open [http://localhost:3000] to view it in the browser.

## License Gabriel Logan Copyright 2023

## Happy hacking (:\n`);

			exec(
				packageManager === 'npm'
					? `cd ${folderName} && npm run lint`
					: `cd ${folderName} && yarn lint`,
			);

			// Navega para o diretório folderName
			const child2 = spawn('cd', [folderName]);

			child2.on('exit', (code) => {
				if (code === 0) {
					console.log(`Run npm start or yarn start - ${folderName} directory`);
				} else {
					console.error(`Error navigating to the ${folderName} directory`);
				}
			});

			// Resto do seu código aqui
		} else {
			console.error(`Error running '${packageManager} install' with exit code ${code}`);
		}
	});
}

export default criarEstruturaDePastasReactTsWebpackRouterDomBabel;
