<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { goto, invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import "../../styles/main.css";
	import { base } from "$app/paths";
	import { PUBLIC_ORIGIN, PUBLIC_APP_DISCLAIMER } from "$env/static/public";
	import Analytics from "$lib/components/Analytics.svelte";

	import { shareConversation } from "$lib/shareConversation";
	import { UrlDependency } from "$lib/types/UrlDependency";
	import { error } from "$lib/stores/errors";
	import Cookies from "js-cookie";
	import { visaPrompt } from "$lib/stores/promptStore";

	import MobileNav from "$lib/components/MobileNav.svelte";
	import NavMenu from "$lib/components/NavMenu.svelte";
	import Toast from "$lib/components/Toast.svelte";
	import SettingsModal from "$lib/components/SettingsModal.svelte";
	import LoginModal from "$lib/components/LoginModal.svelte";
	import NavBar from "$lib/components/NavBar.svelte";
	import { PUBLIC_APP_ASSETS, PUBLIC_APP_NAME } from "$env/static/public";
	import {
		SvelteUIProvider,
		Menu,
		Burger,
		Modal,
		Textarea,
		TextInput,
		Switch,
	} from "@svelteuidev/core";
	import { bubble } from "svelte/internal";
	import NavConversationItem from "$lib/components/NavConversationItem.svelte";
	import { Button, PinRight } from "radix-icons-svelte";
	import ConfirmationModal from "$lib/components/ConfirmationModal.svelte";
	import SettingsPopup from "$lib/components/SettingsPopup.svelte";
	import RaiseAnIssuePopup from "$lib/components/RaiseAnIssuePopup.svelte";
	import BrowseTemplatesPopup from "$lib/components/BrowseTemplatesPopup.svelte";
	import Upgradetopro from "$lib/components/Upgrade/upgradetopro.svelte";
	import VisaPreperationPopUp from "$lib/components/VisaPreperationPopUp.svelte";
	import ImmigrationHelpPopUp from "$lib/components/ImmigrationHelpPopUp.svelte";
	import { currentTheme } from "$lib/stores/themeStore";

	export let data;

	let isNavOpen = false;
	let isSettingsOpen = false;
	let errorToastTimeout: ReturnType<typeof setTimeout>;
	let currentError: string | null;
	let canLogin = true;
	let logoutConfirmationModal = false;
	let deleteCoveConfirmationModal = false;
	let tallId = "";
	let opened = false;

	let issue = "";
	let issueDescription = "";

	let showRaiseAnIssuePopup = false;

	let showSettingsPopup = false;
	let showBrowseTemplatesPopup = false;
	let showUpgardetoProPopup = false;
	let showVisaPreperationPopUp = false;
	let showImmigrationHelpPopUp = false;
	let menuToggleFlag = false;

	function closeBurger() {
		menuToggleFlag = false;
	}

	function toggleBrowseTemplatesPopup() {
		showBrowseTemplatesPopup = !showBrowseTemplatesPopup;
	}

	function toggleVisaPreperationPopUp() {
		showVisaPreperationPopUp = !showVisaPreperationPopUp;
	}

	function toggleImmigrationHelpPopUp() {
		showImmigrationHelpPopUp = !showImmigrationHelpPopUp;
	}

	function toggleUpgardetoProPopup() {
		showUpgardetoProPopup = !showUpgardetoProPopup;
	}

	function visaPromptMethod(prompt) {
		console.log("prompt", prompt.detail);
		visaPrompt.set(prompt.detail);
		closeBurger();
	}
	function immiHelpPrompt(prompt) {
		console.log("prompt", prompt.detail);
		visaPrompt.set(prompt.detail);
		closeBurger();
	}

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

	// async function deleteConversation(id: string) {
	async function deleteConversation() {
		try {
			let id = tallId;
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
				deleteCoveConfirmationModal = false;
				await goto(`${base}/`, { invalidateAll: true });
			}
		} catch (err) {
			console.error(err);
			$error = String(err);
		}
	}

	function logOut() {
		var cookiesToRemove = ["token", "name", "email", "userId"];

		cookiesToRemove.forEach(function (cookieName) {
			document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		});
		window.location.href = "/";
	}

	function openBlogs() {
		window.open("https://immigpt.blog/", "_blank");
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

	function toggleSettingsPopup() {
		showSettingsPopup = !showSettingsPopup;
	}

	function openRaiseAnIssuePopup() {
		showRaiseAnIssuePopup = true;
	}

	function closeRaiseAnIssuePopup() {
		showRaiseAnIssuePopup = false;
	}

	function onIssueSubmit() {
		console.log("issue submitted");
	}

	onDestroy(() => {
		clearTimeout(errorToastTimeout);
	});

	$: if ($error) onError();

	function changeTheme() {
		console.log("hello");
		if ($currentTheme == "light") {
			currentTheme.set("blue");
		} else {
			currentTheme.set("light");
		}
	}

	function gotoPolicies() {
		goto("/privacy-policy");
	}

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

	let themeVariable = $currentTheme;

	function gotoHome() {
		goto("/");
	}

	function handleOutsideClick(event) {
		if (menuToggleFlag && !event.target.closest(".navbar-container")) {
			closeBurger();
		}
	}

	onMount(() => {
		let token = Cookies.get("token");
		if (!token) {
			//loginModalVisible = true;
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
		//document.addEventListener("click", handleOutsideClick);
	});

	// onDestroy(() => {
	// 	document.removeEventListener("click", handleOutsideClick);
	// });
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
	<meta name="color-scheme" content={$currentTheme == "light" ? "light" : "dark"} />
	<link rel="stylesheet" href={`themes/${$currentTheme}.css`} />
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
<Analytics />

<div class="navbar-container">
	<NavBar
		{menuToggleFlag}
		on:hamClick={() => (menuToggleFlag = !menuToggleFlag)}
		on:logoutClick={() => (logoutConfirmationModal = !logoutConfirmationModal)}
	/>

	<div class="navbar-body">
		<div class="left-menu">
			<div class="left-menu-top">
				<a class="new-search-btn" href={`${base}/`}>
					{#if $currentTheme == "light"}
						<img src="/assets/icons/search-icon-white.svg" alt="" />
					{:else}
						<img src="/assets/icons/search-icon-black.svg" alt="" />
					{/if}
					<p>New Search</p>
				</a>
			</div>
			<div class="left-menu-body">
				<p class="recent-searches-text">Recent Searches</p>
				<div class="left-menu-center chgatsScroll">
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
								on:deleteConversation={(ev) => {
									tallId = ev.detail;
									deleteCoveConfirmationModal = true;
								}}
								on:conversationSelected={closeBurger}
								{conv}
							/>
							<!-- on:deleteConversation={(ev) => deleteConversation(ev.detail)} -->
						{/each}
					</div>
				</div>
				<div class="left-menu-bottom">
					<button class="icon-text" on:click={toggleBrowseTemplatesPopup}>
						{#if $currentTheme == "light"}
							<img src="/assets/icons/template-icon-black.svg" alt="" />
						{:else}
							<img src="/assets/icons/template-icon-white.svg" alt="" />
						{/if}
						<p>Browse Templates</p>
					</button>
					<!-- <button class="icon-text">
						<img src="/assets/icons/chat-icon-black.svg" alt="" />
						<p>P2P Chatter</p>
					</button> -->
					<button class="icon-text" on:click={toggleVisaPreperationPopUp}>
						{#if $currentTheme == "light"}
							<img src="/assets/icons/visa-icon-black.svg" alt="" />
						{:else}
							<img src="/assets/icons/visa-icon-white.svg" alt="" />
						{/if}
						<p>Visa Preparation</p>
					</button>
					<button class="icon-text" on:click={toggleImmigrationHelpPopUp}>
						{#if $currentTheme == "light"}
							<img src="/assets/icons/help-icon-black.svg" alt="" />
						{:else}
							<img src="/assets/icons/help-icon-white.svg" alt="" />
						{/if}
						<p>Immigration Help</p>
					</button>
					<button on:click={openBlogs} class="icon-text">
						{#if $currentTheme == "light"}
							<img src="/assets/icons/visa-icon-black.svg" alt="" />
						{:else}
							<img src="/assets/icons/visa-icon-white.svg" alt="" />
						{/if}
						<p>Blogs</p>
					</button>
					<!-- <div class="button-wrapper">
						<button class="upgrade-btn"> Upgrade to Pro </button>
					</div> -->
				</div>
			</div>
		</div>
		{#if menuToggleFlag}
			<div class="left-menu-mobile">
				<div class="left-menu-top">
					<a class="new-search-btn" href={`${base}/`}>
						{#if $currentTheme == "dark"}
							<img src="/assets/icons/search-icon-black.svg" alt="" />
						{:else}
							<img src="/assets/icons/search-icon-white.svg" alt="" />
						{/if}
						<p>New Search</p>
					</a>
				</div>
				<div class="left-menu-body">
					<p class="recent-searches-text">Recent Searches</p>
					<div class="left-menu-center chgatsScroll">
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
									on:deleteConversation={(ev) => {
										tallId = ev.detail;
										deleteCoveConfirmationModal = true;
									}}
									on:conversationSelected={closeBurger}
									{conv}
								/>
								<!-- on:deleteConversation={(ev) => deleteConversation(ev.detail)} -->
							{/each}
						</div>
					</div>
					<div class="left-menu-bottom">
						<button class="icon-text" on:click={toggleBrowseTemplatesPopup}>
							{#if $currentTheme == "light"}
								<img src="/assets/icons/template-icon-black.svg" alt="" />
							{:else}
								<img src="/assets/icons/template-icon-white.svg" alt="" />
							{/if}
							<p>Browse Templates</p>
						</button>
						<!-- <button class="icon-text">
							<img src="/assets/icons/chat-icon-black.svg" alt="" />
							<p>P2P Chatter</p>
						</button> -->
						<button class="icon-text" on:click={toggleVisaPreperationPopUp}>
							{#if $currentTheme == "light"}
								<img src="/assets/icons/visa-icon-black.svg" alt="" />
							{:else}
								<img src="/assets/icons/visa-icon-white.svg" alt="" />
							{/if}
							<p>Visa Preparation</p>
						</button>
						<button class="icon-text" on:click={toggleImmigrationHelpPopUp}>
							{#if $currentTheme == "light"}
								<img src="/assets/icons/help-icon-black.svg" alt="" />
							{:else}
								<img src="/assets/icons/help-icon-white.svg" alt="" />
							{/if}
							<p>Immigration Help</p>
						</button>
						<button on:click={openBlogs} class="icon-text">
							{#if $currentTheme == "light"}
								<img src="/assets/icons/visa-icon-black.svg" alt="" />
							{:else}
								<img src="/assets/icons/visa-icon-white.svg" alt="" />
							{/if}
							<p>Blogs</p>
						</button>
						<!-- <div class="button-wrapper">
							<button class="upgrade-btn"> Upgrade to Pro </button>
						</div> -->
					</div>
				</div>
			</div>
		{/if}
		<div class="right-body scrollbar-custom">
			{#if logoutConfirmationModal}
				<ConfirmationModal
					on:close={() => (logoutConfirmationModal = false)}
					on:confirm={logOut}
					confirmationText="Click confirm to logout"
				/>
			{/if}
			{#if deleteCoveConfirmationModal}
				<ConfirmationModal
					on:close={() => (deleteCoveConfirmationModal = false)}
					on:confirm={deleteConversation}
					confirmationText="Click confirm to delete chat"
				/>
			{/if}
			<SvelteUIProvider>
				<slot />
			</SvelteUIProvider>
		</div>
	</div>
	{#if (requiresLogin && data.messagesBeforeLogin === 0) || loginModalVisible}
		<LoginModal settings={data.settings} />
	{/if}
</div>

<SettingsPopup on:closeSettingsPopup={toggleSettingsPopup} {showSettingsPopup} />
<RaiseAnIssuePopup {showRaiseAnIssuePopup} on:closeRaiseAnIssuePopup={closeRaiseAnIssuePopup} />
<BrowseTemplatesPopup
	showTemplatesPopup={showBrowseTemplatesPopup}
	on:closeTemplatesPopup={toggleBrowseTemplatesPopup}
	on:closeBurger={closeBurger}
/>
<Upgradetopro
	showTemplatesPopup={showUpgardetoProPopup}
	on:closeTemplatesPopup={toggleUpgardetoProPopup}
	on:contactUs={openRaiseAnIssuePopup}
/>
<VisaPreperationPopUp
	showTemplatesPopup={showVisaPreperationPopUp}
	on:closeTemplatesPopup={toggleVisaPreperationPopUp}
	on:visaPrompt={visaPromptMethod}
/>
<ImmigrationHelpPopUp
	showTemplatesPopup={showImmigrationHelpPopUp}
	on:closeTemplatesPopup={toggleImmigrationHelpPopUp}
	on:immiHelpPrompt={immiHelpPrompt}
/>

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

	.icon {
		width: 24px;
		height: 24px;
	}

	.popup-header {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e1e1e1;
	}

	.popup-title {
		color: #000;
		font-family: Inter;
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.popup-body {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.user-profile {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.user-profile-menu {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 8px;
	}

	.menuTitle {
		color: rgba(0, 0, 0, 0.4);
		font-size: 14px;
		font-weight: 500;
	}

	.menuWrap {
		padding: 8px;
		display: flex;
		flex-direction: column;
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
		width: 200px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.user-email {
		color: rgba(0, 0, 0, 0.54);
		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		width: 200px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.left-menu {
		width: 240px;
		height: calc(100vh - 70px);
		flex-shrink: 0;
		background: var(--primary-background-color);
		box-shadow: 1px 0px 0px 0px #e1e1e1;
		border-right: 1px solid var(--primary-border-color);
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
		/* padding-bottom: 70px; */
	}

	.right-body {
		height: 100%;
		width: 100%;
		overflow-y: auto;
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
		background: var(--new-search-btn-color);
	}
	.new-search-btn p {
		color: var(--new-search-btn-text-color);
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
	}

	.upgrade-btn {
		display: flex;
		width: 100%;
		padding: 10px 16px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		background: var(--primary-btn-color);
		color: var(--primary-btn-text-color, white);
	}

	.left-menu-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		/* padding: 20px; */
		height: 200px;
		padding-bottom: 20px;
		border-top: 1px solid var(--primary-border-color);
		background: var(--primary-background-color);
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
		max-height: calc(100% - 200px);
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

	.menuText {
		font-weight: 600;
	}

	.menuBtnTxt {
		color: rgba(0, 0, 0, 0.65);
		font-size: 13px;
		font-weight: 500;
	}

	.menuBtnWrap {
		display: flex;
		gap: 8px;
		padding: 8px 8px;
		border-radius: 8px;
		/* background-color: var(--secondary-btn-color); */
	}

	.menuBtnWrap:hover {
		background-color: #e4e4e4;
	}

	.menuActionBtnWrap {
		display: flex;
		flex-direction: column;
		/* gap: 16px; */
	}

	.user-details {
		white-space: nowrap;
		width: 250px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.logoWrap {
		display: flex;
		gap: 8px;
		justify-content: center;
		align-items: center;
		border: none;
		background-color: transparent;
	}

	.ham {
		display: none;
	}

	.left-menu-mobile {
		display: none;
	}

	.icon-text p {
		color: var(--primary-text-color);
	}

	@media screen and (max-width: 786px) {
		.left-menu {
			display: none;
		}

		.left-menu-mobile {
			width: 240px;
			height: 100%;
			flex-shrink: 0;
			background: var(--primary-background-color);
			box-shadow: 1px 0px 0px 0px #e1e1e1;
			border-right: 1px solid var(--primary-border-color);
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			z-index: 10;
		}
		.button-wrapper {
			display: none;
		}

		.ham {
			display: block;
		}

		.right-body {
			padding-bottom: 70px;
		}
	}
</style>
