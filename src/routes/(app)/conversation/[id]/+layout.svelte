<script>
	import { currentTheme } from "$lib/stores/themeStore";
</script>

<svelte:head>
	<meta name="color-scheme" content={$currentTheme == "light" ? "light" : "light"} />
	<link rel="stylesheet" href={`/themes/${$currentTheme}.css`} />
</svelte:head>
<link rel="stylesheet" href={`/themes/${$currentTheme}.css`} />
<slot />
