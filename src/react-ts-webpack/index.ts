import * as fs from 'fs';
import { exec } from 'child_process';
import spawn from 'cross-spawn';
import { userInputProps } from '../types/index';

// Função para criar a estrutura de pastas e arquivos

function criarEstruturaDePastasReactTsWebpack({
	packageManager,
	appAuthor,
	appDescription,
	appLicense,
	appName,
}: userInputProps) {
	const appContent = `import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <h1>App criado pelo Logan</h1>
    </div>
  );
}

export default App;
`;

	const indexContent = `
	import React from 'react';
	import ReactDOM from 'react-dom/client';
	import App from './App';

	const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
	`;

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
		"react-router-dom": "^6.17.0"
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

	const folderName: string = appName || 'my-app';

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
	fs.mkdirSync(folderName + '/src/Routes');
	fs.mkdirSync(folderName + '/src/styles');
	fs.mkdirSync(folderName + '/src/types');
	fs.mkdirSync(folderName + '/public');
	fs.mkdirSync(folderName + '/public/static');

	fs.writeFileSync(folderName + '/public/static/robots.txt', robotsContent);

	fs.writeFileSync(folderName + '/public/index.html', indexHtmlContent);

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

			exec(packageManager === 'npm' ? 'npm run lint' : 'yarn lint');

			// Resto do seu código aqui
		} else {
			console.error(`Error running '${packageManager} install' with exit code ${code}`);
		}
	});
}

export default criarEstruturaDePastasReactTsWebpack;
