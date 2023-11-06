// import { writable } from 'svelte/store';

// const currentTheme = writable('light');
// export {currentTheme}

import { browser } from "$app/environment";
import { writable } from "svelte/store";

const defaultValue = "light";
const initialValue = browser ? window.localStorage.getItem("theme") ?? defaultValue : defaultValue;

const currentTheme = writable(initialValue);

currentTheme.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("theme", value);
	}
});

export { currentTheme };
