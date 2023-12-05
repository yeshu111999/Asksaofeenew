<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { TextInput, Button, Textarea } from "@svelteuidev/core";
	import Cookies from "js-cookie";
	import { currentTheme } from "$lib/stores/themeStore";
	import Notification from "./Notification.svelte";

	let dispatch = createEventDispatcher();
	export let showRaiseAnIssuePopup = false;

	let issue = "";
	let issueDescription = "";

	let showNotification = false;
	let notificationType = "success";
	let notificationMsg = "";

	function closeNotification() {
		showNotification = false;
	}

	function closePopup() {
		dispatch("closeRaiseAnIssuePopup");
	}

	async function submitContactForm() {
		const apiUrl = "https://backend.immigpt.ai/contactUs";
		const requestBody = {
			issue: issue,
			description: issueDescription,
		};

		if (issue)
			try {
				const response = await fetch(apiUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Google-Auth": "True",
						Authorization: "Bearer " + Cookies.get("token"),
					},
					body: JSON.stringify(requestBody),
				});

				if (response.ok) {
					const responseData = await response.json();
					showNotification = true;
					notificationMsg = responseData.message;
					notificationType = "success";
					closePopup();
				} else {
					console.error("API Request Error:", response.status, response.statusText);
					showNotification = true;
					notificationMsg = response.statusText;
					notificationType = "error";
					closePopup();
				}
			} catch (error) {
				console.error("API Request Error:", error);
				showNotification = true;
				notificationMsg = "Something went wrong!! Please try again!";
				notificationType = "error";
				closePopup();
			}
	}

	function onSubmit() {
		console.log("issue submitted");
		closePopup();
	}

	onMount(() => {
		issue = "";
		issueDescription = "";
	});
</script>

<Notification
	on:closeNotification={closeNotification}
	{showNotification}
	{notificationType}
	message={notificationMsg}
/>

{#if showRaiseAnIssuePopup}
	<div class="overlay">
		<div class="popup">
			<div class="header">
				<p class="title">Contact Us</p>
				<button class="close-btn" on:click={closePopup}>
					<!-- <img src="/assets/icons/close-icon-black.svg" alt="" /> -->
					{#if $currentTheme == "light"}
						<img src="/assets/icons/close-icon-black.svg" alt="" />
					{:else}
						<img src="/assets/icons/close-icon-white.svg" alt="" />
					{/if}
				</button>
			</div>
			<div class="body">
				<div class="input-wrapper">
					<TextInput
						required
						bind:value={issue}
						label="What issue are you facing?"
						placeholder="Template"
					/>
				</div>
				<div class="input-wrapper">
					<Textarea
						bind:value={issueDescription}
						placeholder="Add description"
						label="Describe your issue"
						required
						rows={6}
					/>
				</div>
				<div class="contact-details">
					<p>
						<span class="gray">You can also find us at</span> hello@immigpt.ai
						<span class="gray"> and </span> +1 9727994702
					</p>
				</div>
				<div class="buttons-wrapper">
					<Button color="#e4e4e4" on:click={closePopup} ripple style="color:black;">Cancel</Button>
					{#if issue && issueDescription}
						<!-- style="background-color:  var(--primary-btn-color)" -->
						<Button
							on:click={submitContactForm}
							color={$currentTheme == "light" ? "black" : "white"}
							ripple><span class="submitBtn">Submit</span></Button
						>
					{:else}
						<Button color="dark" disabled ripple>Submit</Button>
					{/if}
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
		z-index: 99;
		opacity: 1;
	}

	.popup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-radius: 4px;
		/* background: var(--brand-colors-pure-white, #fff); */
		background: var(--secondary-background-color);
		width: auto;
		height: auto;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
		height: 100%;
		padding: 24px;
	}

	.header {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* border-bottom: 1px solid #e1e1e1; */
		border-bottom: 1px solid var(--primary-border-color);
	}

	.title {
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.buttons-wrapper {
		display: flex;
		gap: 12px;
		justify-content: flex-end;
	}

	.contact-details p {
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.contact-details p span.gray {
		color: var(--primary-text-color);
		font-weight: 400;
	}

	@media (max-width: 1000px) {
		.popup {
			width: 70%;
		}
	}

	@media (max-width: 600px) {
		.popup {
			width: 90%;
			height: auto;
			overflow-y: auto;
		}
	}
</style>
