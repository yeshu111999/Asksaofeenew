<script>
	import { onMount, createEventDispatcher } from "svelte";

	export let type = "success";

	export let showPopup = false;

	let dispatch = createEventDispatcher();

	let successTitle = "Plan Upgrade Successful 🥳";
	let successDescription =
		"You Enjoy premium features with ImmiGPT's PRO plan. Thanks for choosing the PRO experience";

	let failureTitle = "Oops! Payment Failed ☹️";
	let failureDescription =
		"There seems to be an issue with processing our payment. Please check your payment details and try again";

	function closePopup() {
		showPopup = false;
		dispatch("closePopup");
	}

	function retry() {
		showPopup = false;
		dispatch("retryPayment");
	}
</script>

{#if showPopup}
	<div class="overlay">
		<div class="popup">
			<button on:click={closePopup} class="close-btn" on:click={closePopup}>
				<img src="/assets/icons/close-icon-black.svg" alt="" />
			</button>
			<div class="header">
				<div class="icon-wrapper {type == 'success' ? 'success' : 'failure'}">
					{#if type == "success"}
						<img src="/assets/icons/payment-success.svg" alt="" />
					{:else}
						<img src="/assets/icons/payment-failure.svg" alt="" />
					{/if}
				</div>
			</div>
			<div class="body">
				<p class="title">{type == "success" ? successTitle : failureTitle}</p>
				<p class="description">{type == "failue" ? successDescription : failureDescription}</p>
			</div>
			<div class="footer">
				{#if type == "success"}
					<button class="main-btn">Explore PRO features</button>
					<button on:click={closePopup} class="secondary-btn">Continue browsing</button>
				{:else}
					<button on:click={retry} class="main-btn">Retry Payment</button>
					<button on:click={closePopup} class="secondary-btn">Cancel Upgrade</button>
				{/if}
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
		background-color: rgba(0, 0, 0, 0.24);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2000;
		opacity: 1;
	}

	.popup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-radius: 12px;
		/* background: var(--brand-colors-pure-white, #fff); */
		background-color: var(--primary-background-color);
		width: 500px;
		max-width: 95vw;
		height: auto;
		border-radius: 12px;
		border: 1px solid #e1e1e1;
		padding: 40px;
		position: relative;
		gap: 24px;
	}

	.icon-wrapper {
		display: flex;
		width: 80px;
		height: 80px;
		padding: 20px;
		justify-content: center;
		align-items: center;
		border-radius: 80px;
	}

	.icon-wrapper.success {
		background: linear-gradient(0deg, rgba(255, 255, 255, 0.84) 0%, rgba(255, 255, 255, 0.84) 100%),
			#54f0cb;
	}

	.icon-wrapper.failure {
		background: linear-gradient(0deg, rgba(255, 255, 255, 0.89) 0%, rgba(255, 255, 255, 0.89) 100%),
			#f05454;
	}

	.header {
		display: flex;
		justify-content: center;
	}

	.close-btn {
		position: absolute;
		right: 24px;
		top: 24px;
	}

	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	.title {
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.description {
		color: var(--secondary-text-color);
		text-align: center;
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 21px;
	}

	.footer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.main-btn {
		display: flex;
		width: 328px;
		height: 42px;
		padding: 10px 16px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		background: #5454f0;

		color: #fff;

		text-align: center;
		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		line-height: 18px;
	}

	.secondary-btn {
		display: flex;
		height: 42px;
		padding: 10px 16px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		align-self: stretch;
		border: none;
		background: transparent;
		color: var(--primary-text-color);
	}

	@media (max-width: 768px) {
		.popup {
			width: 96%;
			height: auto;
		}
	}
</style>
