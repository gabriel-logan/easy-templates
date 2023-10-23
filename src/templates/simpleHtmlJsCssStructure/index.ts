import * as fs from 'fs';
import path from 'path';
import { UserInputProps } from '../../types/index';

function simpleHtmlJsCssStructure({
	appAuthor,
	appDescription,
	appLicense,
	appName,
}: UserInputProps) {
	const rootFolder = appName;

	const packageJson = {
		name: appName,
		version: '1.0.0',
		description: appDescription,
		scripts: {
			test: 'echo "Error: no test specified" && exit 1',
		},
		author: appAuthor,
		license: appLicense,
		dependencies: {
			// Adicione as dependências do seu projeto aqui
		},
		devDependencies: {
			// Adicione as dependências de desenvolvimento do seu projeto aqui
		},
	};

	// Create the root directory
	if (!fs.existsSync(rootFolder)) fs.mkdirSync(rootFolder);

	if (!fs.existsSync(rootFolder + '/package.json'))
		fs.writeFileSync(rootFolder + '/package.json', JSON.stringify(packageJson, null, 2));

	// Create the index.html file with extended content
	const indexHtml = path.join(rootFolder, 'index.html');

	if (!fs.existsSync(indexHtml)) {
		fs.writeFileSync(
			indexHtml,
			`<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<header>
		<h1>Welcome to My Web Page</h1>
		<p>Created by Gabriel Logan</p>
	</header>
	<nav>
		<ul>
			<li><a href="#">Home</a></li>
			<li><a href="#">About</a></li>
			<li><a href="#">Services</a></li>
			<li><a href="#">Portfolio</a></li>
			<li><a href="#">Contact</a></li>
		</ul>
	</nav>
	<main>
		<section id="about">
			<h2>About Me</h2>
			<p>I'm a web developer with a passion for creating awesome websites.</p>
		</section>
		<section id="services">
			<h2>Services</h2>
			<ul>
				<li>Web Design</li>
				<li>Web Development</li>
				<li>SEO</li>
			</ul>
		</section>
	</main>
	<footer>
		<p>&copy; 2023 Gabriel Logan</p>
	</footer>
	<script src="js/script.js"></script>
</body>
</html>`,
		);
	}

	// Create the css folder
	const cssFolder = path.join(rootFolder, 'css');
	if (!fs.existsSync(cssFolder)) fs.mkdirSync(cssFolder);

	// Create the style.css file with some basic styling
	const styleCss = path.join(cssFolder, 'style.css');
	if (!fs.existsSync(styleCss)) {
		fs.writeFileSync(
			styleCss,
			`/* Basic styling */
body {
	font-family: Arial, sans-serif;
	margin: 0;
	padding: 0;
	background-color: #f0f0f0;
}

header {
	background-color: #333;
	color: #fff;
	text-align: center;
	padding: 20px;
}

nav ul {
	list-style-type: none;
	margin: 15px;
	padding: 0;
	display: flex;
	justify-content: center;
}

nav li {
	display: inline;
	margin-right: 20px;
}

main {
	margin: 20px;
	padding: 20px;
	background-color: #fff;
	min-height: 100vh;
}

footer {
	background-color: #333;
	color: #fff;
	text-align: center;
	padding: 10px;
}`,
		);
	}

	// Create the js folder
	const jsFolder = path.join(rootFolder, 'js');
	if (!fs.existsSync(jsFolder)) fs.mkdirSync(jsFolder);

	// Create the script.js file with some JavaScript code
	const scriptJs = path.join(jsFolder, 'script.js');

	if (!fs.existsSync(scriptJs)) {
		fs.writeFileSync(
			scriptJs,
			`// JavaScript code (you can add more as needed)
document.addEventListener('DOMContentLoaded', function () {
	// Example: Change the header background color on click
	const header = document.querySelector('header');
	header.addEventListener('click', function () {
		header.style.backgroundColor = 'blue';
	});
});
`,
		);
	}
}

export default simpleHtmlJsCssStructure;
