import spawn from "cross-spawn";
import { SeparetedFiles } from "../../types/index";

// Tratamento de erros não tratados de promessa
process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

function installDependencies(packageManager: SeparetedFiles["packageManager"]) {
	const executorCode = packageManager === "npm" ? "npx" : "yarn";

	const child = spawn(`${executorCode} eslint --init`, { stdio: "inherit" });

	return new Promise<number>((resolve, reject) => {
		child.on("exit", (code) => {
			console.log(code);
			if (code === 0) {
				resolve(code);
			} else {
				reject(new Error(`Error running '${packageManager} install' with exit code ${code}`));
			}
		});
	});
}

async function createAndInstallJsEslint({ packageManager }: SeparetedFiles) {
	try {
		await installDependencies(packageManager);
		console.log(`# My App
## Used npx eslint --init or yarn eslint --init in this case

## License Gabriel Logan Copyright 2023

## Happy hacking (:\n `);
	} catch (error: unknown) {
		switch (typeof error) {
			case "string":
				console.error(error); // Se for uma string, apenas imprima
				break;

			default:
				console.error("An unknown error occurred."); // Caso contrário, trate como erro desconhecido
				break;
		}
	}
}

export default createAndInstallJsEslint;
