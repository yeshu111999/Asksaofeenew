<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { goto, invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import "../styles/main.css";
	import { base } from "$app/paths";
	import { PUBLIC_ORIGIN, PUBLIC_APP_DISCLAIMER } from "$env/static/public";

	import { shareConversation } from "$lib/shareConversation";
	import { UrlDependency } from "$lib/types/UrlDependency";
	import { error } from "$lib/stores/errors";
	import Cookies from "js-cookie";

	import MobileNav from "$lib/components/MobileNav.svelte";
	import NavMenu from "$lib/components/NavMenu.svelte";
	import Toast from "$lib/components/Toast.svelte";
	import SettingsModal from "$lib/components/SettingsModal.svelte";
	import LoginModal from "$lib/components/LoginModal.svelte";
	import { PUBLIC_APP_ASSETS, PUBLIC_APP_NAME } from "$env/static/public";
	import { SvelteUIProvider } from "@svelteuidev/core";

	import { currentTheme } from "$lib/stores/themeStore";
	import Analytics from "$lib/components/Analytics.svelte";

	import { navigating } from "$app/stores";
	import PageSpinner from "$lib/components/PageSpinner.svelte";

	export let data;

	let isNavOpen = false;
	let isSettingsOpen = false;
	let errorToastTimeout: ReturnType<typeof setTimeout>;
	let currentError: string | null;
	let canLogin = true;

	async function onError() {
		// If a new different error comes, wait for the current error to hide first
		if ($error && currentError && $error !== currentError) {
			clearTimeout(errorToastTimeout);
			currentError = null;
			await new Promise((resolve) => setTimeout(resolve, 300));
		}

		currentError = $error;

		errorToastTimeout = setTimeout(() => {
			$error = null;
			currentError = null;
		}, 3000);
	}

	async function deleteConversation(id: string) {
		try {
			const res = await fetch(`${base}/conversation/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				$error = "Error while deleting conversation, try again.";
				return;
			}

			if ($page.params.id !== id) {
				await invalidate(UrlDependency.ConversationList);
			} else {
				await goto(`${base}/`, { invalidateAll: true });
			}
		} catch (err) {
			console.error(err);
			$error = String(err);
		}
	}

	async function editConversationTitle(id: string, title: string) {
		try {
			const res = await fetch(`${base}/conversation/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title }),
			});

			if (!res.ok) {
				$error = "Error while editing title, try again.";
				return;
			}

			await invalidate(UrlDependency.ConversationList);
		} catch (err) {
			console.error(err);
			$error = String(err);
		}
	}

	onDestroy(() => {
		clearTimeout(errorToastTimeout);
	});

	$: if ($error) onError();

	onMount(() => {
		// token = Cookies.get("token");
		// if (token) {
		// 	goto("/home");
		// }
		// if (!token) {
		// 	loginModalVisible = true;
		// }
		// if (token) {
		// 	canLogin = false;
		// }
	});
</script>

<svelte:head>
	<title>{PUBLIC_APP_NAME}</title>
	<meta name="description" content="A Generative AI for Immigration and Travel." />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@huggingface" />
	<meta property="og:title" content={PUBLIC_APP_NAME} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{PUBLIC_ORIGIN || $page.url.origin}{base}" />

	<!-- <meta
		property="og:image"
		content="{PUBLIC_ORIGIN || $page.url.origin}{base}/{PUBLIC_APP_ASSETS}/thumbnail.png"
	/>
	<link
		rel="icon"
		href="{PUBLIC_ORIGIN || $page.url.origin}{base}/{PUBLIC_APP_ASSETS}/favicon.svg"
		type="image/svg+xml"
	/>
	<link
		rel="icon"
		href="{PUBLIC_ORIGIN || $page.url.origin}{base}/{PUBLIC_APP_ASSETS}/favicon.png"
		type="image/png"
	/>
	
	<link
		rel="apple-touch-icon"
		href="{PUBLIC_ORIGIN || $page.url.origin}{base}/{PUBLIC_APP_ASSETS}/touch-icon-ipad-retina.png"
		sizes="167x167"
		type="image/png"
	/>
	<link
		rel="apple-touch-icon"
		href="{PUBLIC_ORIGIN || $page.url.origin}{base}/{PUBLIC_APP_ASSETS}/touch-icon-ipad.png"
		sizes="152x152"
		type="image/png"
	/>
	<link
		rel="apple-touch-icon"
		href="{PUBLIC_ORIGIN ||
			$page.url.origin}{base}/{PUBLIC_APP_ASSETS}/touch-icon-iphone-retina.png"
		sizes="180x180"
		type="image/png"
	/> -->
	<!-- <meta name="color-scheme" content={$currentTheme == "light" ? "light" : "dark"} /> -->
	<meta name="color-scheme" content={$currentTheme == "light" ? "light" : "dark"} />
	<link rel="stylesheet" href={`../../themes/${$currentTheme}.css`} />
</svelte:head>

<Analytics />
<div
	class="grid h-full w-screen grid-cols-1 grid-rows-[auto,1fr] overflow-hidden text-smd dark:text-gray-300 "
>
	<!-- <MobileNav
		isOpen={isNavOpen}
		on:toggle={(ev) => (isNavOpen = ev.detail)}
		title={data.conversations.find((conv) => conv.id === $page.params.id)?.title}
	>
		<NavMenu
			conversations={data.conversations}
			user={data.user}
			{canLogin}
			bind:loginModalVisible
			on:shareConversation={(ev) => shareConversation(ev.detail.id, ev.detail.title)}
			on:deleteConversation={(ev) => deleteConversation(ev.detail)}
			on:clickSettings={() => (isSettingsOpen = true)}
			on:editConversationTitle={(ev) => editConversationTitle(ev.detail.id, ev.detail.title)}
		/>
	</MobileNav>
	<nav class="grid max-h-screen grid-cols-1 grid-rows-[auto,1fr,auto] max-md:hidden">
		<NavMenu
			conversations={data.conversations}
			user={data.user}
			{canLogin}
			bind:loginModalVisible
			on:shareConversation={(ev) => shareConversation(ev.detail.id, ev.detail.title)}
			on:deleteConversation={(ev) => deleteConversation(ev.detail)}
			on:clickSettings={() => (isSettingsOpen = true)}
			on:editConversationTitle={(ev) => editConversationTitle(ev.detail.id, ev.detail.title)}
		/>
	</nav>
	{#if currentError}
		<Toast message={currentError} />
	{/if}
	{#if isSettingsOpen}
		<SettingsModal
			on:close={() => (isSettingsOpen = false)}
			settings={data.settings}
			models={data.models}
		/>
	{/if}
	{#if (requiresLogin && data.messagesBeforeLogin === 0) || loginModalVisible}
		<LoginModal settings={data.settings} />
	{/if} -->
	<SvelteUIProvider>
		<!-- {#if $navigating}
			<PageSpinner />
		{/if} -->
		<slot />
	</SvelteUIProvider>
</div>

<style>
	@import "../global.css";
</style>
