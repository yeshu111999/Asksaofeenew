import { theme } from "./stores/theme";
export function switchTheme() {
	const { classList } = document.querySelector("html") as HTMLElement;
	if (classList.contains("dark")) {
		classList.remove("dark");
		localStorage.theme = "light";
		localStorage.setItem("theme", "light");
		theme.set("light");
	} else {
		classList.add("dark");
		localStorage.theme = "dark";
		localStorage.setItem("theme", "dark");
		theme.set("dark");
	}
}
