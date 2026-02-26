type Logo = 'Android' | 'Svelte' | 'Other';
interface PauProject {
	title: String;
	description: String;
	logo: Logo;
	pathdir: string;
}

interface PauArt {
	title: String;
	thumbnail: String;
}

type CatObject = {
	chopperCatFound: boolean;
	hadoukenCatFound: boolean;
	gojoCatFound: boolean;
	total: number;
};
