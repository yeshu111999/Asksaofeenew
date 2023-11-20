import { browser } from "$app/environment";
import { writable } from "svelte/store";

// const defaultValue = "light";
// const initialValue = browser ? window.localStorage.getItem("theme") ?? defaultValue : defaultValue;
let initialValue = 'light'

if (browser && window.localStorage.getItem("theme")) {
	initialValue = window.localStorage.getItem("theme")
}

const currentTheme = writable(initialValue);

currentTheme.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("theme", value);
	}
});

export { currentTheme };
