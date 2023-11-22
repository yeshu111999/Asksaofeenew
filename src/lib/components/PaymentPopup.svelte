<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { Button } from "@svelteuidev/core";
	let dispatch = createEventDispatcher();
	export let showPopup = false;

	function closePopup() {
		dispatch("closePaymentPopup");
	}

	onMount(() => {
		console.log("");
	});
</script>

{#if showPopup}
	<div class="overlay">
		<div class="popup scrollbar-custom">
			<div class="header">
				<img class="icon" src="/assets/images/payment-success.png" alt="" />
				<p class="title">Payment Successful</p>
			</div>
			<div class="body">
				<Button
					color="black"
					on:click={() => {
						closePopup;
					}}>okay!</Button
				>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 20;
		opacity: 1;
	}

	.popup {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 4px;
		background: var(--secondary-background-color);
		width: 35%;
		padding: 20px;
		/* height: 620px; */
	}

	.header {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* border-bottom: 1px solid var(--primary-border-color); */
		flex-direction: column;
		gap: 20px;
	}

	.icon {
		width: 100px;
		height: 100px;
	}

	.title {
		font-size: 24px;
		font-weight: bold;
	}

	@media (max-width: 1000px) {
		.popup {
			width: 70%;
		}
	}

	@media (max-width: 600px) {
		/* .popup {
			width: 90%;
			height: 90%;
			overflow-y: auto;
		} */
	}
</style>
