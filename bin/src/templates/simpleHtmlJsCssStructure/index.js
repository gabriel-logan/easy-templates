import * as fs from 'fs';
import path from 'path';
function simpleHtmlJsCssStructure(_a) {
    var appAuthor = _a.appAuthor, appDescription = _a.appDescription, appLicense = _a.appLicense, appName = _a.appName;
    var rootFolder = appName;
    var packageJson = {
        name: appName,
        version: '1.0.0',
        description: appDescription,
        scripts: {
            test: 'echo "Error: no test specified" && exit 1',
        },
        author: appAuthor,
        license: appLicense,
        dependencies: {},
        devDependencies: {},
    };
    if (!fs.existsSync(rootFolder))
        fs.mkdirSync(rootFolder);
    if (!fs.existsSync(rootFolder + '/package.json'))
        fs.writeFileSync(rootFolder + '/package.json', JSON.stringify(packageJson, null, 2));
    var indexHtml = path.join(rootFolder, 'index.html');
    if (!fs.existsSync(indexHtml)) {
        fs.writeFileSync(indexHtml, "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset=\"UTF-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t<title>Document</title>\n\t<link rel=\"stylesheet\" type=\"text/css\" href=\"css/style.css\">\n</head>\n<body>\n\t<header>\n\t\t<h1>Welcome to My Web Page</h1>\n\t\t<p>Created by Gabriel Logan</p>\n\t</header>\n\t<nav>\n\t\t<ul>\n\t\t\t<li><a href=\"#\">Home</a></li>\n\t\t\t<li><a href=\"#\">About</a></li>\n\t\t\t<li><a href=\"#\">Services</a></li>\n\t\t\t<li><a href=\"#\">Portfolio</a></li>\n\t\t\t<li><a href=\"#\">Contact</a></li>\n\t\t</ul>\n\t</nav>\n\t<main>\n\t\t<section id=\"about\">\n\t\t\t<h2>About Me</h2>\n\t\t\t<p>I'm a web developer with a passion for creating awesome websites.</p>\n\t\t</section>\n\t\t<section id=\"services\">\n\t\t\t<h2>Services</h2>\n\t\t\t<ul>\n\t\t\t\t<li>Web Design</li>\n\t\t\t\t<li>Web Development</li>\n\t\t\t\t<li>SEO</li>\n\t\t\t</ul>\n\t\t</section>\n\t</main>\n\t<footer>\n\t\t<p>&copy; 2023 Gabriel Logan</p>\n\t</footer>\n\t<script src=\"js/script.js\"></script>\n</body>\n</html>");
    }
    var cssFolder = path.join(rootFolder, 'css');
    if (!fs.existsSync(cssFolder))
        fs.mkdirSync(cssFolder);
    var styleCss = path.join(cssFolder, 'style.css');
    if (!fs.existsSync(styleCss)) {
        fs.writeFileSync(styleCss, "/* Basic styling */\nbody {\n\tfont-family: Arial, sans-serif;\n\tmargin: 0;\n\tpadding: 0;\n\tbackground-color: #f0f0f0;\n}\n\nheader {\n\tbackground-color: #333;\n\tcolor: #fff;\n\ttext-align: center;\n\tpadding: 20px;\n}\n\nnav ul {\n\tlist-style-type: none;\n\tmargin: 15px;\n\tpadding: 0;\n\tdisplay: flex;\n\tjustify-content: center;\n}\n\nnav li {\n\tdisplay: inline;\n\tmargin-right: 20px;\n}\n\nmain {\n\tmargin: 20px;\n\tpadding: 20px;\n\tbackground-color: #fff;\n\tmin-height: 100vh;\n}\n\nfooter {\n\tbackground-color: #333;\n\tcolor: #fff;\n\ttext-align: center;\n\tpadding: 10px;\n}");
    }
    var jsFolder = path.join(rootFolder, 'js');
    if (!fs.existsSync(jsFolder))
        fs.mkdirSync(jsFolder);
    var scriptJs = path.join(jsFolder, 'script.js');
    if (!fs.existsSync(scriptJs)) {
        fs.writeFileSync(scriptJs, "// JavaScript code (you can add more as needed)\ndocument.addEventListener('DOMContentLoaded', function () {\n\t// Example: Change the header background color on click\n\tconst header = document.querySelector('header');\n\theader.addEventListener('click', function () {\n\t\theader.style.backgroundColor = 'blue';\n\t});\n});\n");
    }
}
export default simpleHtmlJsCssStructure;
