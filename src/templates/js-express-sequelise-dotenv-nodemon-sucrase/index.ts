import * as fs from 'fs';
import { exec } from 'child_process';
import spawn from 'cross-spawn';
import { UserInputProps } from '../../types/index';

// Função para criar a estrutura de pastas e arquivos

function jsExpressSequeliseDotenvNodemonSucraseServerFolderStruct({
	packageManager,
	appAuthor,
	appDescription,
	appLicense,
	appName,
}: UserInputProps) {
	const packageJsonContent = `{
	"name": "${appName}",
	"version": "1.0.0",
	"description": "${appDescription}",
	"author": "${appAuthor}",
	"keywords": [],
	"license": "${appLicense}",
	"private": true,
	"scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "dev": "nodemon src/server.js",
    "build": "sucrase ./src -d ./dist --transforms imports",
    "start": "node dist/server.js"
	},
	"dependencies": {},
	"devDependencies": {}
}`;

	const readmeContent = `#MY app`;

	const gitIgnoreContent = `node_modules
.env
*.jpg
*.png
*.gif
junk.js
pull-server.sh
sync.sh
db.sqlite`;

	const appJsFile = `import express from 'express';

class App {
	constructor() {
		this.app = express();

		// Rota de exemplo
		this.app.get('/', (req, res) => {
			res.send('Hello, World!');
		});
	}
}

export default new App().app;
	`;

	const serverJsFile = `import app from './app';

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
	console.log(\`Server is running on port \${PORT}\`);
});
`;

	const envFileExample = `DATABASE='api_database'
DATABASE_HOST='127.0.0.1'
DATABASE_PORT=3306
DATABASE_USERNAME='root'
DATABASE_PASSWORD='root'

TOKEN_SECRET='sua_secret_key_aqui'
TOKEN_EXPIRATION=7d

APP_PORT=3000
APP_URL=http://localhost:3000`;

	const sequelizeFile = `const { resolve } = require('path');

module.exports = {
	config: resolve(__dirname, 'src', 'config', 'database.js'),
	'models-path': resolve(__dirname, 'src', 'models'),
	'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
	'seeders-path': resolve(__dirname, 'src', 'database','seeds'),
}`;

	const nodemonFile = `{
	"execMap": {
		"js": "node -r sucrase/register"
	}
}
`;

	const folderName: string = appName;

	// Verifica se a pasta existe
	if (fs.existsSync(folderName)) {
		// Se existir, apaga a pasta e todo o seu conteúdo
		fs.rmSync(folderName, { recursive: true, force: true });
	}

	// Cria a pasta após a verificação
	fs.mkdirSync(folderName);

	fs.mkdirSync(folderName + '/src');
	fs.mkdirSync(folderName + '/src/configs');
	fs.mkdirSync(folderName + '/src/controllers');
	fs.mkdirSync(folderName + '/src/database');
	fs.mkdirSync(folderName + '/src/middlewares');
	fs.mkdirSync(folderName + '/src/models');
	fs.mkdirSync(folderName + '/src/routes');

	fs.writeFileSync(folderName + '/src/app.js', appJsFile);

	fs.writeFileSync(folderName + '/src/server.js', serverJsFile);

	fs.mkdirSync(folderName + '/uploads');
	fs.mkdirSync(folderName + '/uploads/images');

	fs.writeFileSync(folderName + '/.env', envFileExample);

	fs.writeFileSync(folderName + '/.gitignore', gitIgnoreContent);

	fs.writeFileSync(folderName + '/.sequelizerc', sequelizeFile);

	fs.writeFileSync(folderName + '/nodemon.json', nodemonFile);

	fs.writeFileSync(folderName + '/package.json', packageJsonContent);

	fs.writeFileSync(folderName + '/README.md', readmeContent);

	let installDependencies: string[],
		installDevDependencies: string[] = ['install'];

	const dependencies = ['express', 'cors', 'dotenv', 'helmet', 'sequelize'];

	const devDependencies = ['nodemon', 'sequelize-cli', 'sucrase'];

	switch (packageManager) {
		case 'yarn':
			installDependencies = ['add', ...dependencies];
			installDevDependencies = ['add', '--dev', ...devDependencies];
			break;

		default:
			installDependencies = ['install', ...dependencies];
			installDevDependencies = ['install', 'save-dev', ...devDependencies];
			break;
	}

	const child = spawn(packageManager, installDependencies, { cwd: folderName, stdio: 'inherit' });

	child.on('exit', (code) => {
		if (code === 0) {
			const child2devDep = spawn(packageManager, installDevDependencies, {
				cwd: folderName,
				stdio: 'inherit',
			});

			child2devDep.on('exit', (code) => {
				if (code === 0) {
					console.log('\nFolder structure created and dependencies installed successfully\n');

					console.log(`# My App

This is my app.

## Getting Started

To get started, run the following commands:

### npm start

### 'npm run dev'

### 'npm run build'

### yarn start

### yarn dev

### yarn build

Then, open [http://localhost:3000] to view it in the browser.

## License Gabriel Logan Copyright 2023

## Happy hacking (: \n`);

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
				} else {
					console.error(`Error running '${packageManager} install' with exit code ${code}`);
				}
			});
		} else {
			console.error(`Error running '${packageManager} install' with exit code ${code}`);
		}
	});
}

export default jsExpressSequeliseDotenvNodemonSucraseServerFolderStruct;
