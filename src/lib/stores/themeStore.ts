import { writable } from 'svelte/store';

const currentTheme = writable('light');
export {currentTheme} 
