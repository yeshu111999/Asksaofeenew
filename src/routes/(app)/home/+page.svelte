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

	export let data;
	let loading = false;

	onMount(() => {
		if (!Cookies.get("token")) {
			goto("/");
		}

		const isSessionIdPresent = $page.url.searchParams.has("session_id");
		console.log("Session id present :" + isSessionIdPresent);
		if (isSessionIdPresent) {
			const sessionId = $page.url.searchParams.get("session_id");
			upgradetopro(sessionId);
		}
	});

	const upgradetopro = async (sessionId: string | null) => {
		// saveChangesLoader = true;
		let headers = new Headers({
			Authorization: "Bearer " + Cookies.get("token"),
		});
		headers.append("X-ImmiGPT-Id", sessionId!);
		let gauth = Cookies.get("Google-Auth");
		if (gauth) {
			headers.append("Google-Auth", "True");
		}
		// let body = {
		// 	username: firstName + " " + lastName,
		// 	email: userMail,
		// 	firstName: firstName,
		// 	lastName: lastName,
		// 	phoneNumber: mobileNumber,
		// };

		// let formData = new FormData();
		// formData.append("request", JSON.stringify(body));
		// formData.append("file", imageFile);

		let config = {
			method: "POST",
			headers: headers,
		};

		try {
			const response = await fetch("https://backend.immigpt.ai/planUpgrade", config);

			if (response.ok) {
				const data = await response.json();
				console.log(JSON.stringify(data));
				// saveChangesLoader = false;
				// showUpdateDetailsSuccess = true;
				// setTimeout(() => {
				// 	showUpdateDetailsSuccess = false;
				// });
				// apiSuccessFlag = true;
			} else {
				const error = await response.json();
				console.log(error);
				// saveChangesLoader = false;
				// showUpdateDetailsError = true;
				// updateDetailsError = error.message ? error.message : "Something went wrong!! Try again";
				// apiErrorFlag = true;
			}
		} catch (error) {
			console.error(error);
			// saveChangesLoader = false;
			// showUpdateDetailsError = true;
			// updateDetailsError = "Something went wrong!! Try again";
			// apiErrorFlag = true;
		}
	};

	async function createConversation(message: string) {
		try {
			loading = true;
			console.log(data.settings.activeModel);
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
