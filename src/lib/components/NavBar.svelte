<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { goto, invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import "../../styles/main.css";
	import { base } from "$app/paths";
	import { PUBLIC_ORIGIN, PUBLIC_APP_DISCLAIMER } from "$env/static/public";
	import { createEventDispatcher } from "svelte";

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
	import { SvelteUIProvider, Menu, Burger, Modal, Textarea, Switch } from "@svelteuidev/core";
	import { bubble } from "svelte/internal";
	import NavConversationItem from "$lib/components/NavConversationItem.svelte";
	import { Button, PinRight } from "radix-icons-svelte";
	import ConfirmationModal from "$lib/components/ConfirmationModal.svelte";
	import SettingsPopup from "$lib/components/SettingsPopup.svelte";
	import RaiseAnIssuePopup from "$lib/components/RaiseAnIssuePopup.svelte";
	import CorporateContactUs from "./CorporateContactUs.svelte";
	import BrowseTemplatesPopup from "$lib/components/BrowseTemplatesPopup.svelte";
	import AboutUsPopup from "./AboutUsPopup.svelte";
	import Upgradetopro from "$lib/components/Upgrade/upgradetopro.svelte";
	import { currentTheme } from "$lib/stores/themeStore";

	let dispatch = createEventDispatcher();

	// export let data;
	export let proUser = false;

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
	let showCorporateContactPopup = false;

	let showSettingsPopup = false;
	let showBrowseTemplatesPopup = false;
	let showUpgardetoProPopup = false;
	export let menuToggleFlag = false;

	function toggleBrowseTemplatesPopup() {
		showBrowseTemplatesPopup = !showBrowseTemplatesPopup;
	}

	function toggleUpgardetoProPopup() {
		showUpgardetoProPopup = !showUpgardetoProPopup;
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

	function gotoHome() {
		goto("/");
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
		var cookiesToRemove = ["token", "name", "email", "userId", "Google-Auth"];

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
		showUpgardetoProPopup = false;
		showRaiseAnIssuePopup = true;
	}

	function closeRaiseAnIssuePopup() {
		showRaiseAnIssuePopup = false;
	}

	function openCorporateContactPopUp() {
		console.log("$$$$$$$$$$$$reached till here");
		showUpgardetoProPopup = false;
		showCorporateContactPopup = true;
	}

	function closeCorporateContactPopup() {
		showCorporateContactPopup = false;
	}

	let showAboutUsPopup = false;
	function openAboutUsPopup() {
		showAboutUsPopup = true;
	}

	function closeAboutUsPopup() {
		showAboutUsPopup = false;
	}

	function onIssueSubmit() {
		console.log("issue submitted");
	}

	onDestroy(() => {
		clearTimeout(errorToastTimeout);
	});

	$: if ($error) onError();

	function changeTheme() {
		if ($currentTheme == "light") {
			currentTheme.set("dark");
		} else {
			currentTheme.set("light");
		}
	}

	// const requiresLogin =
	// 	!$page.error &&
	// 	!$page.route.id?.startsWith("/r/") &&
	// 	(data.requiresLogin
	// 		? !data.user
	// 		: !data.settings.ethicsModalAcceptedAt && !!PUBLIC_APP_DISCLAIMER);

	let loginModalVisible = false;
	let userName;
	let userMail;
	let profileImg;

	function gotoPolicies() {
		// goto("/privacy-policy");
		window.open("/privacy-policy", "_blank");
	}

	function googleTranslateElementInit() {
		// new google.translate.TranslateElement({ pageLanguage: "en" }, "google_translate_element");
		google.translate.TranslateElement({ pageLanguage: "en" }, "google_translate_element");
	}

	function closeMenu() {
		console.log("closing menu");
		//menuToggleFlag = false;
		dispatch("closeMenu");
	}

	function handleBodyClick(event) {
		const target = event.target;
		const hamBurgerMenu = document.querySelector(".ham"); // Adjust this selector based on your actual HTML structure

		// Check if the click is outside the hamburger menu
		if (hamBurgerMenu && !hamBurgerMenu.contains(target)) {
			closeMenu();
		}
	}

	onMount(() => {
		googleTranslateElementInit();
		let token = Cookies.get("token");
		if (!token) {
			loginModalVisible = true;
			//goto("/");
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
		document.body.addEventListener("click", handleBodyClick);

		return () => {
			document.body.removeEventListener("click", handleBodyClick);
		};
	});
</script>

<svelte:head>
	<title>{PUBLIC_APP_NAME}</title>
	<meta name="description" content="A Generative AI For Immigration and Travel" />
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
	<!-- <meta name="color-scheme" content={$currentTheme == "light" ? "light" : "light"} />
	<link rel="stylesheet" href={`themes/${$currentTheme}.css`} /> -->
</svelte:head>

<div class="top-navbar">
	<div class="ham">
		<Burger
			size="sm"
			opened={menuToggleFlag}
			color={$currentTheme == "light" ? "#222" : "#fff"}
			on:click={() => {
				menuToggleFlag = !menuToggleFlag;
				dispatch("hamClick");
			}}
		/>
	</div>
	<button class="logoWrap" on:click={gotoHome}>
		{#if $currentTheme == "light"}
			<img class="logoImage" src="/assets/images/statue-liberty.jpg" width="40px" />
			<!-- {:else}
			<img src="/assets/images/logo.svg" width="25px" /> -->
		{/if}
		<p class="title">Ask Soafee</p>
	</button>
	<div class="user-profile">
		<div class="dropdown">
			<button class="upgrade-btn">
				<img
					width="30px"
					style="min-width: 30px;"
					src="/assets/icons/language-translator-icon.svg"
					alt=""
				/>
			</button>
			<div class="dropdown-content">
				<div id="google_translate_element" />
			</div>
		</div>
		{#if !proUser}
			<div class="button-wrapper">
				<button class="upgrade-btn" on:click={toggleUpgardetoProPopup}>
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
			<div class="button-wrapper-mobile">
				<button class="upgrade-btn" on:click={toggleUpgardetoProPopup}>
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
					</svg>Pro
				</button>
			</div>
		{/if}
		<!-- <Menu size="xl" on:open={() => (opened = true)} on:close={() => (opened = false)}> -->
		<Menu size="xl">
			<div class="user-profile" slot="control">
				{#if profileImg}
					<div class="profile-image" on:click={() => (opened = !opened)}>
						<p>{profileImg ? profileImg : ""}</p>
					</div>
					{#if opened}
						<span class="dropdown" on:click={() => (opened = !opened)}>
							{#if $currentTheme == "light"}
								<img
									style="transform: rotate(180deg);"
									src="/assets/icons/dropdown-icon.svg"
									alt=""
								/>
							{:else}
								<img
									style="transform: rotate(180deg);"
									src="/assets/icons/dropdown-icon-white.svg"
									alt=""
								/>
							{/if}
						</span>
					{:else if !opened}
						<span class="dropdown" on:click={() => (opened = !opened)}>
							{#if $currentTheme == "light"}
								<img src="/assets/icons/dropdown-icon.svg" alt="" />
							{:else}
								<img src="/assets/icons/dropdown-icon-white.svg" alt="" />
							{/if}
						</span>
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

					<button class="menuBtnWrap">
						<img class="icon" src="/assets/icons/theme-icon.png" alt="" />
						<span class="menuBtnTxt">Theme</span>
						<Switch
							checked={$currentTheme == "light"}
							onLabel="light"
							offLabel="dark"
							size="md"
							on:click={changeTheme}
						/>
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
					<button
						class="menuBtnWrap"
						on:click={() => {
							logoutConfirmationModal = true;
							dispatch("logoutClick");
						}}
					>
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

<SettingsPopup on:closeSettingsPopup={toggleSettingsPopup} {showSettingsPopup} />
<RaiseAnIssuePopup {showRaiseAnIssuePopup} on:closeRaiseAnIssuePopup={closeRaiseAnIssuePopup} />
<CorporateContactUs
	{showCorporateContactPopup}
	on:closeCorporateContactUsPopup={closeCorporateContactPopup}
/>
<AboutUsPopup {showAboutUsPopup} on:closeAboutUsPopup={closeAboutUsPopup} />
<BrowseTemplatesPopup
	showTemplatesPopup={showBrowseTemplatesPopup}
	on:closeTemplatesPopup={toggleBrowseTemplatesPopup}
/>
<Upgradetopro
	showTemplatesPopup={showUpgardetoProPopup}
	on:closeTemplatesPopup={toggleUpgardetoProPopup}
	on:contactUs={openRaiseAnIssuePopup}
	on:corporateContact={openCorporateContactPopUp}
/>

<style>
	.chgatsScroll::-webkit-scrollbar {
		width: 5px;
	}

	select {
		color: #fff !important;
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

	.top-navbar {
		display: inline-flex;
		padding: 15px 24px 15px 16px;
		align-items: center;
		background: var(--primary-background-color);
		box-shadow: 0px 1px 0px 0px var(--primary-border-color);
		height: 70px;
		width: 100%;
		justify-content: space-between;
		border-bottom: 1px solid var(--primary-border-color);
	}

	.title {
		color: var(--primary-text-color);
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
		/* background: var(--secondary-background-color); */
		background: var(--profile-bg-color);
	}

	.profile-image p {
		color: var(--primary-text-color);

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
		background: var(--primary-btn-color);
	}
	.new-search-btn p {
		color: var(--primary-btn-text-color);
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
	.button-wrapper-mobile {
		display: none;
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
		gap: 4px;
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

	.dropbtn {
		background-color: #000;
		color: white;
		padding: 10px 16px;
		font-size: 16px;
		border: none;
		border-radius: 8px;
	}

	.dropdown {
		/* position: relative; */
		/* display: inline-block; */
	}

	.dropdown-content {
		display: none;
		position: absolute;
		background-color: #ffffff;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 2000;
		padding: 8px;
		border-radius: 8px;
	}

	.dropdown:hover .dropdown-content {
		display: block;
	}

	@media screen and (max-width: 786px) {
		.left-menu {
			display: none;
		}

		.upgrade-btn {
			display: flex;
			width: 100%;
			padding: 6px 10px;
			justify-content: center;
			align-items: center;
			gap: 8px;
			border-radius: 8px;
			background: var(--primary-btn-color);
			color: var(--primary-btn-text-color, white);
		}

		.title {
			color: var(--primary-text-color);
			font-family: Inter;
			font-size: 16px;
			font-style: normal;
			font-weight: 700;
			line-height: normal;
		}

		.logoImage {
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
			z-index: 1000;
		}
		.button-wrapper {
			display: none;
		}
		.button-wrapper-mobile {
			display: block;
		}

		.ham {
			display: block;
		}
	}
</style>
