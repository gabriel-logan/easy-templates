import {
	filesToInstall,
	firstChoice,
	packageManager,
	templateChoices,
} from "../promptArrays/index";

type PackageManager = (typeof packageManager)[number];

export interface FirstsQuestionProps {
	firstQuestionChoice: (typeof firstChoice)[number];
	packageManager: PackageManager;
}

export interface SeparetedFiles {
	filesToInstall: (typeof filesToInstall)[number];
	packageManager: PackageManager;
}

export interface UserInputProps {
	packageManager: PackageManager;
	appName: string;
	appDescription: string;
	appAuthor: string;
	appLicense: string;
	selectedTemplate: (typeof templateChoices)[number];
}
