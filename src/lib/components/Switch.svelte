<script lang="ts">
	import { currentTheme } from "$lib/stores/themeStore";
	export let checked: boolean;
	export let name: string;
</script>

<input bind:checked type="checkbox" {name} class="peer pointer-events-none absolute opacity-0" />
<div
	on:click
	on:keypress
	class={$currentTheme == "blue"
		? "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-gray-300 p-1 shadow-inner ring-gray-400 transition-all peer-checked:bg-blue-600 peer-focus-visible:ring peer-focus-visible:ring-offset-1 hover:bg-gray-400 dark:bg-gray-600 peer-checked:[&>div]:translate-x-3.5"
		: "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-gray-300 p-1 shadow-inner ring-gray-400 transition-all peer-checked:bg-blue-600 peer-focus-visible:ring peer-focus-visible:ring-offset-1 hover:bg-gray-400 dark:bg-gray-600 peer-checked:[&>div]:translate-x-3.5"}
>
	<div class="h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-all" />
</div>
