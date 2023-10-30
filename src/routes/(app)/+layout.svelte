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
	import { SvelteUIProvider, Menu, Burger, Modal, Textarea, TextInput } from "@svelteuidev/core";
	import { bubble } from "svelte/internal";
	import NavConversationItem from "$lib/components/NavConversationItem.svelte";
	import { Button, PinRight } from "radix-icons-svelte";
	import ConfirmationModal from "$lib/components/ConfirmationModal.svelte";
	import SettingsPopup from "$lib/components/SettingsPopup.svelte";
	import RaiseAnIssuePopup from "$lib/components/RaiseAnIssuePopup.svelte";
	import BrowseTemplatesPopup from "$lib/components/BrowseTemplatesPopup.svelte";

	export let data;

	let isNavOpen = false;
	let isSettingsOpen = false;
	let errorToastTimeout: ReturnType<typeof setTimeout>;
	let currentError: string | null;
	let canLogin = true;
	let logoutConfirmationModal = false;
	let opened = false;

	let issue = "";
	let issueDescription = "";

	let showRaiseAnIssuePopup = false;

	let showSettingsPopup = false;
	let showBrowseTemplatesPopup = false;
	let menuToggleFlag = false;

	function toggleBrowseTemplatesPopup(){
		showBrowseTemplatesPopup = !showBrowseTemplatesPopup;
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
		<div class="ham">
			<Burger opened={menuToggleFlag} on:click={() => (menuToggleFlag = !menuToggleFlag)} />
		</div>
		<div class="logoWrap">
			<img src="/assets/images/statue-liberty.jpg" width="40px" />
			<p class="title">ImmiGPT</p>
		</div>
		<div class="user-profile">
			<div class="button-wrapper">
				<button class="upgrade-btn">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M10.8059 2.5L3.95837 11.6667H10L9.19421 17.5L16.0417 8.33333H10L10.8059 2.5Z"
							stroke="#fff"
							stroke-opacity="0.87"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					Upgrade to Pro
				</button>
			</div>
			<!-- <Menu size="xl" on:open={() => (opened = true)} on:close={() => (opened = false)}> -->
			<Menu size="xl">
				<div class="user-profile" slot="control">
					{#if profileImg}
						<div class="profile-image" on:click={() => (opened = !opened)}>
							<p>{profileImg ? profileImg : ""}</p>
						</div>
						{#if opened}
							<span class="dropdown" on:click={() => (opened = !opened)}
								><img
									style="transform: rotate(180deg);"
									src="/assets/icons/dropdown-icon.svg"
									alt=""
								/></span
							>
						{:else if !opened}
							<span class="dropdown" on:click={() => (opened = !opened)}
								><img src="/assets/icons/dropdown-icon.svg" alt="" /></span
							>
						{/if}
					{/if}
				</div>
				<!-- </div> -->
				<div class="menuWrap">
					<span class="menuTitle">ACCOUNT</span>
					<div class="user-profile-menu">
						<div class="profile-image">
							<p>{profileImg}</p>
						</div>
						<div class="user-details">
							<p class="user-name">{userName}</p>
							<p class="user-email">{userMail}</p>
						</div>
					</div>
					<hr />
					<div class="menuActionBtnWrap">
						<button class="menuBtnWrap" on:click={toggleSettingsPopup}>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M9.65304 18.6368L10.1793 19.8203C10.4989 20.54 11.2125 21.0037 12 21.0037V21.0037C12.7875 21.0037 13.5012 20.54 13.8208 19.8203L14.347 18.6368C14.5343 18.2168 14.8494 17.8667 15.2474 17.6363V17.6363C15.6478 17.4053 16.1111 17.3069 16.5709 17.3552L17.8585 17.4923C18.6415 17.5751 19.3998 17.1889 19.7933 16.5069V16.5069C20.1872 15.8253 20.1425 14.9755 19.6792 14.339L18.9169 13.2915C18.6455 12.9158 18.5004 12.4635 18.5027 12V12C18.5026 11.5377 18.649 11.0873 18.9209 10.7135L19.6832 9.66602C20.1465 9.02951 20.1913 8.17974 19.7973 7.49812V7.49812C19.4038 6.8161 18.6455 6.42989 17.8625 6.51271L16.5749 6.64977C16.1151 6.69806 15.6518 6.59966 15.2514 6.36865V6.36865C14.8526 6.13698 14.5374 5.78503 14.351 5.36323L13.8208 4.17974C13.5012 3.45999 12.7875 2.99625 12 2.99625V2.99625C11.2125 2.99625 10.4989 3.45999 10.1793 4.17974L9.65304 5.36323C9.4666 5.78503 9.15142 6.13698 8.75267 6.36865V6.36865C8.35219 6.59966 7.88891 6.69806 7.42911 6.64977L6.13758 6.51271C5.35456 6.42989 4.59625 6.8161 4.20277 7.49812V7.49812C3.80878 8.17974 3.85349 9.02951 4.31682 9.66602L5.07914 10.7135C5.351 11.0873 5.49739 11.5377 5.49731 12V12C5.49739 12.4623 5.351 12.9127 5.07914 13.2865L4.31682 14.334C3.85349 14.9705 3.80878 15.8203 4.20277 16.5019V16.5019C4.59661 17.1835 5.35466 17.5696 6.13758 17.4873L7.42511 17.3502C7.88491 17.3019 8.34819 17.4003 8.74866 17.6313V17.6313C9.14891 17.8624 9.46555 18.2144 9.65304 18.6368V18.6368Z"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
								/>
								<circle
									cx="12.0002"
									cy="12"
									r="2.6481"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>

							<span class="menuBtnTxt">Settings</span>
						</button>
						<button
							class="menuBtnWrap"
							on:click={() => {
								window.open("/faq", "_blank");
							}}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle
									cx="12.0001"
									cy="12"
									r="9.00375"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M10.9998 15.5015H13.3101"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M12.1593 15.5015V11.2497H11.0088"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M12.1002 8.24569C12.1002 8.38382 11.9882 8.4958 11.8501 8.4958C11.7119 8.4958 11.6 8.38382 11.6 8.24569C11.6 8.10756 11.7119 7.99559 11.8501 7.99559"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M11.85 7.99559C11.9881 7.99559 12.1001 8.10757 12.1001 8.2457"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<span class="menuBtnTxt">Help & FAQ</span>
						</button>
						<button on:click={openBlogs} class="menuBtnWrap">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="3"
									y="3"
									width="18"
									height="18"
									rx="5"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M17 8.50078V14.6667C17 15.0971 16.7246 15.4792 16.3162 15.6154L12.3162 16.9487C12.111 17.0171 11.889 17.0171 11.6838 16.9487L7.68377 15.6154C7.27543 15.4792 7 15.0971 7 14.6667V8.50078C7 8.17933 7.15452 7.87748 7.41529 7.68953C7.67606 7.50158 8.01128 7.45044 8.31623 7.55209L11.6838 8.67461C11.889 8.74303 12.111 8.74303 12.3162 8.67461L15.6838 7.55209C15.9887 7.45044 16.3239 7.50158 16.5847 7.68953C16.8455 7.87748 17 8.17933 17 8.50078Z"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M12 8.72507V17"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<span class="menuBtnTxt">Blogs</span>
						</button>
						<button class="menuBtnWrap" on:click={openRaiseAnIssuePopup}>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M10.8559 13.144C9.6859 11.974 8.8039 10.664 8.2179 9.33499C8.0939 9.05399 8.1669 8.72499 8.3839 8.50799L9.2029 7.68999C9.8739 7.01899 9.8739 6.06999 9.2879 5.48399L8.1139 4.30999C7.3329 3.52899 6.0669 3.52899 5.2859 4.30999L4.6339 4.96199C3.8929 5.70299 3.5839 6.77199 3.7839 7.83199C4.2779 10.445 5.7959 13.306 8.2449 15.755C10.6939 18.204 13.5549 19.722 16.1679 20.216C17.2279 20.416 18.2969 20.107 19.0379 19.366L19.6889 18.715C20.4699 17.934 20.4699 16.668 19.6889 15.887L18.5159 14.714C17.9299 14.128 16.9799 14.128 16.3949 14.714L15.4919 15.618C15.2749 15.835 14.9459 15.908 14.6649 15.784C13.3359 15.197 12.0259 14.314 10.8559 13.144Z"
									stroke="black"
									stroke-opacity="0.87"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<span class="menuBtnTxt">Contact Us</span>
						</button>
						<button class="menuBtnWrap" on:click={() => (logoutConfirmationModal = true)}>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8 15V9"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M14.5 9.5L17 12L14.5 14.5"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M17 12H11"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<circle
									cx="12"
									cy="12"
									r="9"
									stroke="black"
									stroke-opacity="0.65"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>

							<span class="menuBtnTxt">Logout</span>
						</button>
					</div>
					<!-- <Menu.Item icon={PinRight} on:click={() => (logoutConfirmationModal = true)}
					><span class="menuText">Logout</span></Menu.Item
				> -->
				</div></Menu
			>
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
					<button class="icon-text" on:click={toggleBrowseTemplatesPopup}>
						<img src="/assets/icons/template-icon-black.svg" alt="" />
						<p>Browse Templates</p>
					</button>
					<!-- <button class="icon-text">
						<img src="/assets/icons/chat-icon-black.svg" alt="" />
						<p>P2P Chatter</p>
					</button> -->
					<button class="icon-text">
						<img src="/assets/icons/visa-icon-black.svg" alt="" />
						<p>Visa Preparation</p>
					</button>
					<button class="icon-text">
						<img src="/assets/icons/help-icon-black.svg" alt="" />
						<p>Immigration Help</p>
					</button>
					<button on:click={openBlogs} class="icon-text">
						<img src="/assets/icons/visa-icon-black.svg" alt="" />
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
						<!-- <button class="icon-text">
						<img src="/assets/icons/chat-icon-black.svg" alt="" />
						<p>P2P Chatter</p>
					</button> -->
						<button class="icon-text">
							<img src="/assets/icons/visa-icon-black.svg" alt="" />
							<p>Visa Preparation</p>
						</button>
						<button class="icon-text">
							<img src="/assets/icons/help-icon-black.svg" alt="" />
							<p>Immigration Help</p>
						</button>
						<button on:click={openBlogs} class="icon-text">
							<img src="/assets/icons/visa-icon-black.svg" alt="" />
							<p>Blogs</p>
						</button>
						<!-- <div class="button-wrapper">
						<button class="upgrade-btn"> Upgrade to Pro </button>
					</div> -->
					</div>
				</div>
			</div>
		{/if}
		<div class="right-body">
			{#if logoutConfirmationModal}
				<ConfirmationModal
					on:close={() => (logoutConfirmationModal = false)}
					on:confirm={logOut}
					confirmationText="Click confirm to logout"
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
<BrowseTemplatesPopup showTemplatesPopup={showBrowseTemplatesPopup} on:closeTemplatesPopup={toggleBrowseTemplatesPopup}/>

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
		height: 200px;
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
	}

	.ham {
		display: none;
	}

	.left-menu-mobile {
		display: none;
	}

	@media screen and (max-width: 786px) {
		.left-menu {
			display: none;
		}

		.left-menu-mobile {
			width: 240px;
			height: calc(100vh - 70px);
			flex-shrink: 0;
			background: #fff;
			box-shadow: 1px 0px 0px 0px #e1e1e1;
			border-right: 1px solid #e1e1e1;
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
	}
</style>
