<script lang="ts">
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import Upgradetopro from "$lib/components/Upgrade/upgradetopro.svelte";
	import ChatWindow from "$lib/components/chat/ChatWindow.svelte";
	import { ERROR_MESSAGES, error } from "$lib/stores/errors";
	import { pendingMessage } from "$lib/stores/pendingMessage";
	import { findCurrentModel } from "$lib/utils/models";
	import Cookies from "js-cookie";
	import { onMount } from "svelte";
	import PaymentPopup from "$lib/components/PaymentPopup.svelte";
	import PageSpinner from "$lib/components/PageSpinner.svelte";
	import { retryPayment } from "$lib/stores/paymentStore";

	export let data;
	let showUpgrade = false;
	let loading = false;
	let isLoading = false;
	let showPaymentPopup = false;
	let paymentType = "";
	let sessionId = "";

	$: if ($retryPayment == true) {
		showUpgrade = true;
		retryPayment.set(false);
	}

	onMount(() => {
		isLoading = true;
		if (!Cookies.get("token")) {
			goto("/");
		}
		if ($page.data.sessionId) {
			sessionId = $page.data.sessionId;
			onPayment();
		}
		if ($page.data.isFailure) {
			isLoading = false;
			paymentType = "failure";
			showPaymentPopup = true;
		}
		isLoading = false;
	});

	function retry() {
		retryPayment.set(true);
		showPaymentPopup = false;
		goto("/home");
	}

	function toggleUpgardetoProPopup() {
		showUpgrade = false;
	}

	async function onPayment() {
		const apiUrl = "https://backend.immigpt.ai/planUpgrade";

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-ImmiGPT-Id": sessionId,
				"Google-Auth": "True",
				Authorization: "Bearer " + Cookies.get("token"),
			},
		};

		try {
			const response = await fetch(apiUrl, requestOptions);

			if (!response.ok) {
				paymentType = "failure";
				showPaymentPopup = true;
			} else {
				paymentType = "success";
				showPaymentPopup = true;
			}
			isLoading = false;
			const responseData = await response.json();
			console.log("payment response", responseData);

			// You can update the component state or perform further actions based on the response
		} catch (err) {
			console.error("Error making API request:", err.message);
			paymentType = "failure";
			showPaymentPopup = true;
			isLoading = false;
		}
		isLoading = false;
	}

	function closePaymentPopup() {
		showPaymentPopup = false;
		goto("/home");
	}

	async function createConversation(message: string) {
		try {
			loading = true;
			const res = await fetch(`${base}/conversation`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ model: data.settings.activeModel }),
			});

			if (!res.ok) {
				error.set("Error while creating conversation, try again.");
				console.error("Error while creating conversation: " + (await res.text()));
				return;
			}

			const { conversationId } = await res.json();

			// Ugly hack to use a store as temp storage, feel free to improve ^^
			pendingMessage.set(message);

			// invalidateAll to update list of conversations
			await goto(`${base}/conversation/${conversationId}`, { invalidateAll: true });
		} catch (err) {
			error.set(ERROR_MESSAGES.default);
			console.error(err);
		} finally {
			loading = false;
		}
	}
</script>

<ChatWindow
	on:message={(ev) => createConversation(ev.detail)}
	{loading}
	currentModel={findCurrentModel([...data.models, ...data.oldModels], data.settings.activeModel)}
	models={data.models}
	settings={data.settings}
/>

{#if isLoading}
	<PageSpinner />
{/if}
<PaymentPopup
	on:retryPayment={retry}
	type={paymentType}
	showPopup={showPaymentPopup}
	on:closePopup={closePaymentPopup}
/>

{#if showUpgrade}
	<Upgradetopro showTemplatesPopup={showUpgrade} on:closeTemplatesPopup={toggleUpgardetoProPopup} />
{/if}
