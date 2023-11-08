<script>
	import { createEventDispatcher } from "svelte";
	import { Button } from "@svelteuidev/core";

	import ResumeTemplate from "../BrowseTemplates/ResumeTemplate.svelte";

	import { theme } from "$lib/stores/theme";

	let dispatch = createEventDispatcher();
	export let showTemplatesPopup = false;

	let themeVariable = "light";
	let renderedText = "";

	function closePopup() {
		dispatch("closeTemplatesPopup");
	}

	function contactUs() {
		dispatch("contactUs");
	}
</script>

{#if showTemplatesPopup}
	<div class="overlay">
		<div class="popup">
			<div class="header">
				<p class="title">Upgrade Plan</p>
				<button class="close-btn" on:click={closePopup}>
					<img src="/assets/icons/close-icon-black.svg" alt="" />
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
						<Button fullSize style="background-color:var(--primary-btn-color);">Upgrade Plan</Button
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
		background: var(--brand-colors-pure-white, #fff);
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
		color: var(--primary-btn-color);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
	}

	.title {
		color: #000;
		font-family: Inter;
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.description {
		color: rgba(0, 0, 0, 0.54);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 19px;
		padding: 12px 16px;
	}

	.description-amount {
		color: rgba(0, 0, 0, 0.54);
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
</style>
