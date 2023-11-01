<script>
	import NavBar from "$lib/components/NavBar.svelte";
	import { SvelteUIProvider } from "@svelteuidev/core";
</script>

<div class="navbar-container">
	<NavBar />
	<div class="navbar-body">
		<slot />
	</div>
</div>

<style>
	.navbar-container {
		height: 100vh;
		width: 100vw;
	}

	.navbar-body {
		padding: 0;
		background: white;
		display: flex;
		width: 100% !important;
	}
</style>
