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
function tsExpressSequeliseDotenvNodemonServerFolderStruct(_a) {
    var packageManager = _a.packageManager, appAuthor = _a.appAuthor, appDescription = _a.appDescription, appLicense = _a.appLicense, appName = _a.appName;
    var packageJsonContent = "{\n\t\"name\": \"".concat(appName, "\",\n\t\"version\": \"1.0.0\",\n\t\"description\": \"").concat(appDescription, "\",\n\t\"author\": \"").concat(appAuthor, "\",\n\t\"keywords\": [],\n\t\"license\": \"").concat(appLicense, "\",\n\t\"private\": true,\n\t\"scripts\": {\n\t\t\"test\": \"echo \\\"Error: no test specified\\\" && exit 1\",\n\t\t\"dev\": \"nodemon src/server.ts\",\n\t\t\"build\": \"tsc\",\n\t\t\"start\": \"node dist/server.js\"\n\t},\n\t\"dependencies\": {},\n\t\"devDependencies\": {}\n}");
    var readmeContent = "#MY app";
    var gitIgnoreContent = "node_modules\n.env\n*.jpg\n*.png\n*.gif\njunk.js\npull-server.sh\nsync.sh\ndb.sqlite";
    var appJsFile = "import express, { Express, Request, Response } from 'express';\n\nclass App {\n\tpublic app: Express;\n\n\tconstructor() {\n\t\tthis.app = express();\n\n\t\t// Rota de exemplo\n\t\tthis.app.get('/', (req: Request, res: Response) => {\n\t\t\tres.send('Hello, World!');\n\t\t});\n\t}\n}\n\nexport default new App().app;\n";
    var serverJsFile = "import app from './app';\n\nconst PORT: number = Number(process.env.APP_PORT) || 3000;\n\napp.listen(PORT, () => {\n\tconsole.log(`Server is running on port ${PORT}`);\n});";
    var envFileExample = "DATABASE='api_database'\nDATABASE_HOST='127.0.0.1'\nDATABASE_PORT=3306\nDATABASE_USERNAME='root'\nDATABASE_PASSWORD='root'\n\nTOKEN_SECRET='sua_secret_key_aqui'\nTOKEN_EXPIRATION=7d\n\nAPP_PORT=3000\nAPP_URL=http://localhost:3000";
    var sequelizeFile = "const { resolve } = require('path');\n\nmodule.exports = {\n\tconfig: resolve(__dirname, 'src', 'config', 'database.js'),\n\t'models-path': resolve(__dirname, 'src', 'models'),\n\t'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),\n\t'seeders-path': resolve(__dirname, 'src', 'database','seeds'),\n}";
    var nodemonFile = "{\n\t\"execMap\": {\n\t\t\"ts\": \"node -r ts-node/register\"\n\t}\n}";
    var tsconfigJsonFile = "{\n\t\"compilerOptions\": {\n\t\t\"target\": \"es6\",\n\t\t\"module\": \"commonjs\",\n\t\t\"outDir\": \"./dist\",\n\t\t\"rootDir\": \"./src\",\n\t\t\"strict\": true,\n\t\t\"esModuleInterop\": true,\n\t\t\"skipLibCheck\": true,\n\t\t\"forceConsistentCasingInFileNames\": true,\n\t\t\"moduleResolution\": \"node\",\n\t\t\"resolveJsonModule\": true,\n\t\t\"isolatedModules\": true,\n\t\t\"strictPropertyInitialization\": false,\n\t\t\"strictNullChecks\": false,\n\t\t\"removeComments\": true,\n\t\t\"allowJs\": true\n\t},\n}";
    var folderName = appName;
    if (fs.existsSync(folderName)) {
        fs.rmSync(folderName, { recursive: true, force: true });
    }
    fs.mkdirSync(folderName);
    fs.mkdirSync(folderName + '/src');
    fs.mkdirSync(folderName + '/src/configs');
    fs.mkdirSync(folderName + '/src/controllers');
    fs.mkdirSync(folderName + '/src/database');
    fs.mkdirSync(folderName + '/src/middlewares');
    fs.mkdirSync(folderName + '/src/models');
    fs.mkdirSync(folderName + '/src/routes');
    fs.writeFileSync(folderName + '/src/app.ts', appJsFile);
    fs.writeFileSync(folderName + '/src/server.ts', serverJsFile);
    fs.mkdirSync(folderName + '/uploads');
    fs.mkdirSync(folderName + '/uploads/images');
    fs.writeFileSync(folderName + '/.env', envFileExample);
    fs.writeFileSync(folderName + '/.gitignore', gitIgnoreContent);
    fs.writeFileSync(folderName + '/.sequelizerc', sequelizeFile);
    fs.writeFileSync(folderName + '/nodemon.json', nodemonFile);
    fs.writeFileSync(folderName + '/package.json', packageJsonContent);
    fs.writeFileSync(folderName + '/README.md', readmeContent);
    fs.writeFileSync(folderName + '/tsconfig.json', tsconfigJsonFile);
    var installDependencies, installDevDependencies = ['install'];
    var dependencies = ['express', 'cors', 'dotenv', 'helmet', 'sequelize'];
    var devDependencies = [
        'nodemon',
        'sequelize-cli',
        '@types/express',
        '@types/node',
        'ts-node',
        'typescript',
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
                    console.log("# My App\n\nThis is my app.\n\n## Getting Started\n\nTo get started, run the following commands:\n\n### npm start\n\n### 'npm run dev'\n\n### 'npm run build'\n\n### yarn start\n\n### yarn dev\n\n### yarn build\n\nThen, open [http://localhost:3000] to view it in the browser.\n\n## License Gabriel Logan Copyright 2023\n\n## Happy hacking (: \n");
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
export default tsExpressSequeliseDotenvNodemonServerFolderStruct;
