<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { Button } from "@svelteuidev/core";
	import Cookies from "js-cookie";
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

	async function createSubscription() {
		console.log("createSubscription");
		const headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: "Bearer " + Cookies.get("token"),
		};
		const gauth = Cookies.get("Google-Auth");
		if (gauth) {
			headers["Google-Auth"] = "True";
		}
		console.log("headers", headers);
		const response = await fetch("https://backend.immigpt.ai/create-subscription", {
			method: "POST",
			headers: headers,
			body: JSON.stringify({ planId: "plan_NIf6lW1EopNhsx" }),
		});
		// console.log('response', response)
		// console.log('response-statu', response.ok)
		if (response.ok) {
			const data = await response.json();
			console.log("data", data.id);
			openRazorpay(data.id);
		} else {
			const data = await response.json();
			console.error("Subscription creation failed:", data);
		}
	}

	async function upgradePlanUpdate(subscriptionId) {
		const apiUrl = "https://backend.immigpt.ai/planUpgradeRazorPay";
		let gauth = Cookies.get("Google-Auth");

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-ImmiGPT-Id": subscriptionId,
				// "Google-Auth": "True",
				Authorization: "Bearer " + Cookies.get("token"),
			},
		};
		console.log("request", requestOptions);
		if (gauth) {
			requestOptions.headers["Google-Auth"] = "True";
		}
		console.log("request", requestOptions);

		try {
			const response = await fetch(apiUrl, requestOptions);
			if (response.ok) {
				showTemplatesPopup = false;
				goto("/home");
			}

			// You can update the component state or perform further actions based on the response
		} catch (err) {
			console.error("Error making API request:", err.message);
		}
	}

	function openRazorpay(subscriptionId) {
		console.log("openRazorpay");
		const options = {
			key: "rzp_test_HV4tUhpyqqO38s",
			subscription_id: subscriptionId,
			prefill: {
				name: Cookies.get("name"),
				email: Cookies.get("email"),
			},
			handler: function (response) {
				console.log(response);
				// Handle post-payment logic here
				upgradePlanUpdate(response.razorpay_subscription_id);
			},
		};
		const rzp1 = new Razorpay(options);
		console.log("rzp1", rzp1);

		rzp1.open();
	}
	function gotoPayment() {
		let country = Cookies.get("country");
		if (country?.toUpperCase() == "UNITED STATES OF AMERICA") {
			goto("/home/payment");
		} else {
			createSubscription();
		}
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
						<p>Access to Search Web Functionality</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access to Visa Preparation Centre</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access to Visa immigration Help</p>
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
						<p>Access to Search Web Functionality</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access to Visa Preparation Centre</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access to Immigration Help</p>
					</div>
					<div class="features">
						<img class="tick-gap" src="/chatui/tick-icon.svg" alt="" />
						<p>Access to Templates and Document Generation</p>
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
		z-index: 1000;
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
