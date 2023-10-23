import * as fs from 'fs';
import { exec } from 'child_process';
import spawn from 'cross-spawn';
function criarEstruturaDePastasReactTsWebpack(_a) {
    var packageManager = _a.packageManager, appAuthor = _a.appAuthor, appDescription = _a.appDescription, appLicense = _a.appLicense, appName = _a.appName;
    var appContent = "import React from 'react';\n\nfunction App() {\n  return (\n    <div>\n      <h1>Hello, World!</h1>\n      <h1>App criado pelo Logan</h1>\n    </div>\n  );\n}\n\nexport default App;\n";
    var indexContent = "\n\timport React from 'react';\n\timport ReactDOM from 'react-dom/client';\n\timport App from './App';\n\n\tconst root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);\n\troot.render(\n\t\t<React.StrictMode>\n\t\t\t<App />\n\t\t</React.StrictMode>,\n\t);\n\t";
    var packageJsonContent = "{\n\t\"name\": \"".concat(appName, "\",\n\t\"version\": \"1.0.0\",\n\t\"description\": \"").concat(appDescription, "\",\n\t\"author\": \"").concat(appAuthor, "\",\n\t\"keywords\": [],\n\t\"license\": \"").concat(appLicense, "\",\n\t\"private\": true,\n\t\"scripts\": {\n\t\t\"lint\": \"npx eslint src --fix\",\n\t\t\"start\": \"webpack serve --mode development\",\n\t\t\"build\": \"webpack --mode production\"\n\t},\n\t\"dependencies\": {\n\t\t\"react\": \"^18.2.0\",\n\t\t\"react-dom\": \"^18.2.0\",\n\t\t\"react-router-dom\": \"^6.17.0\"\n\t},\n\t\"devDependencies\": {\n\t\t\"@babel/core\": \"^7.23.2\",\n\t\t\"@babel/preset-env\": \"^7.23.2\",\n\t\t\"@babel/preset-react\": \"^7.22.15\",\n\t\t\"@types/node\": \"^20.8.7\",\n\t\t\"@types/react\": \"^18.2.29\",\n\t\t\"@types/react-dom\": \"^18.2.13\",\n\t\t\"@types/react-router-dom\": \"^5.3.3\",\n\t\t\"@typescript-eslint/eslint-plugin\": \"^6.8.0\",\n\t\t\"@typescript-eslint/parser\": \"^6.8.0\",\n\t\t\"babel-loader\": \"^9.1.3\",\n\t\t\"copy-webpack-plugin\": \"^11.0.0\",\n\t\t\"css-loader\": \"^6.8.1\",\n\t\t\"eslint\": \"^8.51.0\",\n\t\t\"eslint-config-prettier\": \"^9.0.0\",\n\t\t\"eslint-plugin-prettier\": \"^5.0.1\",\n\t\t\"eslint-plugin-react-hooks\": \"^4.6.0\",\n\t\t\"html-webpack-plugin\": \"^5.5.3\",\n\t\t\"prettier\": \"^3.0.3\",\n\t\t\"style-loader\": \"^3.3.3\",\n\t\t\"ts-loader\": \"^9.5.0\",\n\t\t\"ts-node\": \"^10.9.1\",\n\t\t\"typescript\": \"^5.2.2\",\n\t\t\"webpack\": \"^5.89.0\",\n\t\t\"webpack-cli\": \"^5.1.4\",\n\t\t\"webpack-dev-server\": \"^4.15.1\"\n\t}\n}");
    var prettierContent = "module.exports = {\n\tsemi: true,\n\ttrailingComma: 'all',\n\tsingleQuote: true,\n\tprintWidth: 100,\n}";
    var eslintContent = "/* eslint-env node */\nmodule.exports = {\n\textends: [\n\t\t'eslint:recommended',\n\t\t'plugin:@typescript-eslint/recommended',\n\t\t'plugin:prettier/recommended',\n\t],\n\tparser: '@typescript-eslint/parser',\n\tplugins: ['@typescript-eslint', 'react-hooks'],\n\troot: true,\n\trules: {\n\t\t'react-hooks/rules-of-hooks': 'error', // Check rules of Hooks\n\t\t'react-hooks/exhaustive-deps': 'warn', // Add this rule\n\t},\n};";
    var babelRcContent = '{"presets": ["@babel/preset-env", "@babel/preset-react"]}';
    var webpackContent = "const path = require('path');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\nconst CopyPlugin = require('copy-webpack-plugin');\n\nmodule.exports = {\n\tentry: './src/index.tsx',\n\toutput: {\n\t\tpath: path.resolve(__dirname, 'build'),\n\t\tfilename: 'bundle.js',\n\t},\n\tmodule: {\n\t\trules: [\n\t\t\t{\n\t\t\t\ttest: /\\.(js|jsx|ts|tsx)$/,\n\t\t\t\texclude: /node_modules/,\n\t\t\t\tuse: ['babel-loader', 'ts-loader'],\n\t\t\t},\n\n\t\t\t// Regra para arquivos CSS\n\t\t\t{\n\t\t\t\ttest: /\\.css$/,\n\t\t\t\tuse: ['style-loader', 'css-loader'],\n\t\t\t},\n\t\t],\n\t},\n\tresolve: {\n\t\textensions: ['.js', '.jsx', '.ts', '.tsx'],\n\t},\n\tplugins: [\n\t\tnew HtmlWebpackPlugin({\n\t\t\ttemplate: './public/index.html',\n\t\t}),\n\t\tnew CopyPlugin({\n\t\t\tpatterns: [{ from: 'public/static', to: '.' }],\n\t\t}),\n\t],\n\tdevtool: 'nosources-source-map',\n\tdevServer: {\n\t\tstatic: {\n\t\t\tdirectory: path.join(__dirname, 'public'), // Diret\u00F3rio raiz para arquivos est\u00E1ticos\n\t\t\twatch: true,\n\t\t},\n\t\tport: 3000,\n\t\thistoryApiFallback: true, // Configura\u00E7\u00E3o para tratar rotas desconhecidas\n\t\topen: true,\n\t\tcompress: true,\n\t\thot: true,\n\t},\n};";
    var tsconfigContent = "{\n\t\"compilerOptions\": {\n\t\t\"target\": \"es2016\",\n\t\t\"lib\": [\"DOM\", \"ESNext\"],\n\t\t\"jsx\": \"react\",\n\t\t\"module\": \"commonjs\",\n\t\t\"esModuleInterop\": true,\n\t\t\"forceConsistentCasingInFileNames\": true,\n\t\t\"strict\": true,\n\t\t\"skipLibCheck\": true\n\t}\n}";
    var readmeContent = "#MY app";
    var indexHtmlContent = "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset=\"UTF-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t<title>My App</title>\n\t<meta\n\t\tname=\"description\"\n\t\tcontent=\"Web site created using logan-templates\"\n\t/>\n</head>\n<body>\n\t<noscript>You need to enable JavaScript to run this app.</noscript>\n\t<div id=\"root\"></div>\n</body>\n</html>";
    var gitIgnoreContent = "# dependencies\n/node_modules\n/.pnp\n.pnp.js\n\n# testing\n/coverage\n\n# production\n/build\n\n# misc\n.DS_Store\n.env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\n\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*";
    var robotsContent = "# https://www.robotstxt.org/robotstxt.html\nUser-agent: *\nDisallow:";
    var folderName = appName || 'my-app';
    if (fs.existsSync(folderName)) {
        fs.rmSync(folderName, { recursive: true, force: true });
    }
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
    var child = spawn(packageManager, ['install'], { cwd: folderName, stdio: 'inherit' });
    child.on('exit', function (code) {
        if (code === 0) {
            console.log('\nFolder structure created and dependencies installed successfully\n');
            console.log("# My App\n\nThis is my app.\n\n## Getting Started\n\nTo get started, run the following commands:\n\n### npm start\n\n### 'npm run build'\n\n### yarn start\n\n### yarn build\n\nThen, open [http://localhost:3000] to view it in the browser.\n\n## License Gabriel Logan Copyright 2023\n\n## Happy hacking (:\n");
            exec(packageManager === 'npm' ? 'npm run lint' : 'yarn lint');
        }
        else {
            console.error("Error running '".concat(packageManager, " install' with exit code ").concat(code));
        }
    });
}
export default criarEstruturaDePastasReactTsWebpack;
