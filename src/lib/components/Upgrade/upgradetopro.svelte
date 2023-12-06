<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { Button } from "@svelteuidev/core";

	import { currentTheme } from "$lib/stores/themeStore";
	import { retryPayment } from "$lib/stores/paymentStore";
	import { goto } from "$app/navigation";

	let dispatch = createEventDispatcher();
	let retryValue = false;
	let upgradeForm;
	export let showTemplatesPopup = false;

	function closePopup() {
		dispatch("closeTemplatesPopup");
	}

	function contactUs() {
		dispatch("contactUs");
	}

	async function handleUpgrade() {
		const formData = new FormData();
		formData.append("price-id", "price_1OELxvLDxrOrP8vt6aoIyZxU");
		// Add more form data as needed

		try {
			const response = await fetch("?/checkout", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				console.log("Upgrade successful!");
			} else {
				console.error("Upgrade failed!");
			}
		} catch (error) {
			console.error("Upgrade failed:", error);
		}
	}

	// Watch for changes in planStore
	$: {
		// Check if retryPayment is true
		if ($retryPayment) {
			handleUpgrade();
			retryPayment.set(false); // Set the store value to false
		}
	}

	function gotoPayment() {
		goto("/home/payment");
	}

	onMount(() => {
		if ($retryPayment == true) {
			retryValue = true;
		}
	});
</script>

{#if showTemplatesPopup}
	<div class="overlay">
		<div class="popup">
			<div class="header">
				<p class="title">Upgrade Plan</p>
				<button class="close-btn" on:click={closePopup}>
					<!-- <img src="/assets/icons/close-icon-black.svg" alt="" /> -->
					{#if $currentTheme == "light"}
						<img src="/assets/icons/close-icon-black.svg" alt="" />
					{:else}
						<img src="/assets/icons/close-icon-white.svg" alt="" />
					{/if}
				</button>
			</div>
			<div class="plan-container">
				<div class="plan-content">
					<p>Free</p>
					<p class="description-amount">$0</p>
					<div class="plan-button">
						<Button fullSize disabled>Current Plan</Button>
					</div>
					<p>Plan includes:</p>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access to ImmiGPT Basic model</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Basic model updates</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access to templates</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access to Visa Preparation Centre</p>
					</div>
				</div>
				<div class="plan-content">
					<p>Pro</p>
					<p class="description-amount">$10/Month</p>
					<div class="plan-button">
						<!-- <Button fullSize style="background-color:var(--primary-btn-color);">Coming Soon</Button> -->
						<!-- <form bind:this={upgradeForm} method="POST" action="?/checkout">
							<input type="hidden" name="price-id" value="price_1OELxvLDxrOrP8vt6aoIyZxU" />
							<Button fullSize style="background-color:var(--primary-btn-color);"
								>Upgrade Plan</Button
							>
						</form> -->
						<Button
							on:click={gotoPayment}
							fullSize
							style="background-color:var(--primary-btn-color);">Upgrade Plan</Button
						>
					</div>
					<p>Plan includes:</p>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access to our ImmiGPT Pro Model</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Faster response speed</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access to templates</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access to Visa Preparation Centre</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access Beta features</p>
					</div>
				</div>
			</div>
			<div class="footer">
				<p class="description">Need more Enterprise capabilities?</p>
				<div on:click={contactUs}>
					<p class="footer-text">Contact Us</p>
				</div>
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
		z-index: 2;
		opacity: 1;
	}

	.popup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-radius: 4px;
		/* background: var(--brand-colors-pure-white, #fff); */
		background: var(--secondary-background-color);
		width: 45%;
		/* height: 620px; */
	}

	.header {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e1e1e1;
	}
	.footer {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid #e1e1e1;
	}
	.footer-text {
		/* color: #335fd1; */
		color: var(--secondary-text-color);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
	}

	.title {
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.description {
		color: var(--secondary-text-color);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 19px;
		padding: 12px 16px;
	}

	.description-amount {
		/* color: rgba(0, 0, 0, 0.54); */
		color: var(--secondary-text-color);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 19px;
	}

	.body {
		width: 100%;
		height: 100%;
		display: flex;
		padding: 16px;
		overflow-y: auto;
	}

	.tabDetailsWrapInternal {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		padding: 12px 0;
		/* justify-content: center; */
	}
	.features {
		display: flex;
		flex-direction: row;
		padding: 8px 0px;
	}
	.plan-content {
		border-right: 1px solid #e1e1e1;
		flex: auto;
		padding: 16px;
	}
	.plan-container {
		display: flex;
	}
	.plan-button {
		padding: 16px 0px;
	}
	.tick-gap {
		margin-right: 8px;
	}

	@media (max-width: 768px) {
		.popup {
			width: 100%;
		}
	}
</style>
