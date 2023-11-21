<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	function gotoHome() {
		goto("/home");
	}
</script>

<div class="container">
	<div class="row">
		<div class="error-gif">
			{#if $page.status == 404}
				<img class="gif" src={"/assets/images/not-found.svg"} alt="" />
			{:else}
				<img class="gif" src={"/assets/images/server-down.svg"} alt="" />
			{/if}
		</div>
		<div class="error-text">
			<p class="error-status">{$page.status} - {$page.error.message}</p>
			<p class="error-description">The page you are looking for might be temporarily unavailable</p>
			<button on:click={gotoHome} class="home-btn">Go To Home</button>
		</div>
	</div>
</div>

<style>
	.container {
		padding: 40px;
		height: 100vh;
	}

	.container {
		background-color: #141019;
		background: radial-gradient(at 50% -20%, #fff, #0d060e) fixed;
	}

	.row {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.error-status {
		font-size: 32px;
		font-weight: 600;
		color: white;
		font-family: "Switzer";
		line-height: 40px;
	}

	.error-description {
		font-size: 18px;
		font-weight: 500;
		color: white;
		font-family: "Switzer";
		line-height: 20px;
	}

	.home-btn {
		padding: 12px;
		border-radius: 300px;
		border: none;
		background-color: #40404f;
		color: white;
		cursor: pointer;
	}

	.gif {
		width: 100%;
		height: 60vh;
	}

	.error-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
	}

	/*************swing************/
	@keyframes swing {
		0% {
			transform: rotate(10deg);
		}
		100% {
			transform: rotate(-10deg);
		}
	}

	/*************swing hair************/
	@keyframes swinghair {
		0% {
			transform: rotate(6deg);
		}
		100% {
			transform: rotate(-6deg);
		}
	}
</style>
