<script>
	import { goto } from "$app/navigation";
	import { theme } from "$lib/stores/theme";
	export let header = "About Us";

	function gotoHome() {
		goto("/");
	}
</script>

<div class={$theme != "light" ? "wrapper" : "wrapper-light"}>
	<div class={$theme != "light" ? "section-container" : "section-container-light"}>
		<div class="top-bar">
			<p class="header">{header}</p>
			<button class="close-btn" on:click={gotoHome}
				><img src="/chatui/close-icon.png" class="close-icon" alt="" /></button
			>
		</div>
		<div class="content">
			<slot />
		</div>
	</div>
</div>

<style>
	.wrapper {
		padding: 35px 100px;
		height: 100vh;
		background-color: #343a40;
		display: flex;
		align-items: center;
	}
	.wrapper-light {
		padding: 35px 100px;
		height: 100vh;
		background-color: #fff;
		display: flex;
		align-items: center;
	}

	.section-container {
		display: flex;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		max-height: 100%;
		--tw-bg-opacity: 1;
		background-color: rgb(17 24 39 / var(--tw-bg-opacity));
		border-radius: 8px;
		width: 100%;
		color: white;
		flex-direction: column;
	}
	.section-container-light {
		display: flex;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		max-height: 100%;
		--tw-bg-opacity: 1;
		/* background-color: rgb(17 24 39 / var(--tw-bg-opacity)); */
		border-radius: 8px;
		color: black;
		flex-direction: column;
		width: 100%;
	}

	.content {
		padding: 40px;
		height: 80vh;
		overflow-y: auto;
	}
	.top-bar {
		padding: 12px 40px;
		background-color: gray;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.close-btn {
		border-radius: 50%;
		padding: 10px;
		background-color: black;
	}

	.close-icon {
		width: 20px;
		height: 20px;
	}

	p.header {
		font-size: 20px;
		color: white;
		font-weight: 600;
	}
</style>
