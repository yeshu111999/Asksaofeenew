<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { goto, invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import "../../styles/main.css";
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
	import { bubble } from "svelte/internal";
	import NavConversationItem from "$lib/components/NavConversationItem.svelte";

	export let data;

	let isNavOpen = false;
	let isSettingsOpen = false;
	let errorToastTimeout: ReturnType<typeof setTimeout>;
	let currentError: string | null;
	let canLogin = true;

	async function onError() {
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

	const requiresLogin =
		!$page.error &&
		!$page.route.id?.startsWith("/r/") &&
		(data.requiresLogin
			? !data.user
			: !data.settings.ethicsModalAcceptedAt && !!PUBLIC_APP_DISCLAIMER);

	let loginModalVisible = false;
	let userName;
	let userMail;
	let profileImg;

	onMount(() => {
		let token = Cookies.get("token");
		if (!token) {
			loginModalVisible = true;
			goto("/");
		}
		if (token) {
			canLogin = false;
			//getRecentSearches();
			userName = Cookies.get("name");
			userMail = Cookies.get("email");
			if (userName) {
				let nameList = userName?.split(" ");
				if (nameList.length > 1) {
					profileImg = nameList[0][0] + nameList[1][0];
				} else {
					profileImg = nameList[0][0];
				}
			}
		}
	});
</script>

<svelte:head>
	<title>{PUBLIC_APP_NAME}</title>
	<meta name="description" content="The first open source alternative to ChatGPT. 💪" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@huggingface" />
	<meta property="og:title" content={PUBLIC_APP_NAME} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{PUBLIC_ORIGIN || $page.url.origin}{base}" />
	<meta
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
	/>
</svelte:head>

<!-- <div
	class="grid h-full w-screen grid-cols-1 grid-rows-[auto,1fr] overflow-hidden text-smd dark:text-gray-300 md:grid-cols-[280px,1fr] md:grid-rows-[1fr]"
>
	<MobileNav
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
	<nav class="grid max-h-screen max-md:hidden">
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
	{/if}
	<SvelteUIProvider>
		<slot />
	</SvelteUIProvider>
</div> -->

<div class="navbar-container">
	<div class="top-navbar">
		<p class="title">ImmiGPT</p>
		<div class="user-profile">
			<div class="profile-image">
				<p>{profileImg}</p>
			</div>
			<div class="user-details">
				<p class="user-name">{userName}</p>
				<p class="user-email">{userMail}</p>
			</div>
			<span class="dropdown"><img src="/assets/icons/dropdown-icon.svg" alt="" /></span>
		</div>
	</div>
	<div class="navbar-body">
		<div class="left-menu">
			<div class="left-menu-top">
				<a class="new-search-btn" href={`${base}/`}>
					<img src="/assets/icons/search-icon-white.svg" alt="" />
					<p>New Search</p>
				</a>
			</div>
			<div class="left-menu-body">
				<div class="left-menu-center chgatsScroll">
					<p class="recent-searches-text">Recent Searches</p>
					<div class="recent-searches">
						{#each data.conversations as conv}
							<!-- <a
								class="recent-search-btn {conv.id === $page.params.id ? 'active' : ''}"
								href="{base}/conversation/{conv.id}"
							>
								{#if conv.id === $page.params.id}
									<img src="/assets/icons/search-icon-white.svg" alt="" />
								{:else}
									<img src="/assets/icons/search-icon-black.svg" alt="" />
								{/if}
								<p>{conv.title}</p>
							</a> -->
							<NavConversationItem
								on:editConversationTitle={(ev) =>
									editConversationTitle(ev.detail.id, ev.detail.title)}
								on:deleteConversation={(ev) => deleteConversation(ev.detail)}
								{conv}
							/>
						{/each}
					</div>
				</div>
				<div class="left-menu-bottom">
					<button class="icon-text">
						<img src="/assets/icons/template-icon-black.svg" alt="" />
						<p>Browse Templates</p>
					</button>
					<button class="icon-text">
						<img src="/assets/icons/chat-icon-black.svg" alt="" />
						<p>P2P Chatter</p>
					</button>
					<button class="icon-text">
						<img src="/assets/icons/visa-icon-black.svg" alt="" />
						<p>Visa Preparation</p>
					</button>
					<button class="icon-text">
						<img src="/assets/icons/help-icon-black.svg" alt="" />
						<p>Immigration Help</p>
					</button>
					<div class="button-wrapper">
						<button class="upgrade-btn"> Upgrade to Pro </button>
					</div>
				</div>
			</div>
		</div>
		<div class="right-body">
			<SvelteUIProvider>
				<slot />
			</SvelteUIProvider>
		</div>
	</div>
	{#if (requiresLogin && data.messagesBeforeLogin === 0) || loginModalVisible}
		<LoginModal settings={data.settings} />
	{/if}
</div>

<style>
	.chgatsScroll::-webkit-scrollbar {
		width: 5px;
	}

	.chgatsScroll::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}

	/* Handle */
	.chgatsScroll::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 10px;
	}

	/* Handle on hover */
	.chgatsScroll::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.4);
	}
	.navbar-container {
		height: 100vh;
		width: 100vw;
	}
	.top-navbar {
		display: inline-flex;
		padding: 15px 24px 15px 16px;
		align-items: center;
		background: #fff;
		box-shadow: 0px 1px 0px 0px #e1e1e1;
		height: 70px;
		width: 100%;
		justify-content: space-between;
		border-bottom: 1px solid #e1e1e1;
	}

	.title {
		color: #131313;
		font-family: Inter;
		font-size: 24px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}

	.user-profile {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.profile-image {
		display: flex;
		padding: 12px 10px 11px 10px;
		justify-content: center;
		align-items: center;
		border-radius: 32px;
		background: #ececec;
	}

	.profile-image p {
		color: #5d5c5c;

		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		letter-spacing: 0.14px;
	}

	.user-name {
		color: #000;
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.user-email {
		color: rgba(0, 0, 0, 0.54);
		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.left-menu {
		width: 240px;
		height: calc(100vh - 70px);
		flex-shrink: 0;
		background: #fff;
		box-shadow: 1px 0px 0px 0px #e1e1e1;
		border-right: 1px solid #e1e1e1;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.left-menu-top {
		padding: 20px;
	}

	.navbar-body {
		width: 100%;
		display: flex;
		height: calc(100vh - 70px);
	}

	.right-body {
		height: 100%;
		width: 100%;
	}

	.new-search-btn {
		display: flex;
		width: 100%;
		height: 38px;
		padding: 10px 16px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
		border-radius: 8px;
		background: rgba(0, 0, 0, 0.87);
	}
	.new-search-btn p {
		color: #fff;
		text-align: center;
		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		line-height: 18px; /* 138.462% */
	}

	.icon-text {
		display: flex;
		width: 100%;
		padding: 10px 16px;
		align-items: center;
		gap: 8px;
	}

	.button-wrapper {
		padding: 0 20px 0 20px;
		margin-top: 10px;
	}

	.upgrade-btn {
		display: flex;
		width: 100%;
		padding: 10px 16px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		background: rgba(0, 0, 0, 0.87);
		color: white;
	}

	.left-menu-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		/* padding: 20px; */
		height: 250px;
		padding-bottom: 20px;
		border-top: 1px solid #e1e1e1;
		background: white;
		z-index: 1;
	}

	.recent-searches-text {
		color: #555;
		font-family: Inter;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		line-height: 16px;
		padding: 0 20px 12px 20px;
	}

	.recent-search-btn {
		display: flex;
		width: 100%;
		padding: 10px 16px;
		align-items: center;
		gap: 8px;
	}

	.recent-search-btn.active {
		background-color: black;
		border-radius: 4px;
	}

	.recent-search-btn.active p {
		color: white;
	}

	.left-menu-center {
		/* height: calc(100vh -390px); */
		min-height: auto;
		overflow-y: auto;
		max-height: calc(100% - 250px);
	}

	.recent-search-btn p {
		overflow: hidden;
		color: rgba(0, 0, 0, 0.87);
		text-overflow: ellipsis;
		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 500;
		line-height: 16px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		flex: 1 0 0;
	}

	.left-menu-body {
		height: 100%;
	}
</style>
