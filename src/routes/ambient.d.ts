type Logo = 'Android' | 'Svelte' | 'Other';
interface PauProject {
	title: String;
	description: String;
	logo: Logo;
}

interface PauArt {
	title: String;
	thumbnail: String;
}

type CatObject = {
	chopperCatFound: boolean;
	total: number;
};
