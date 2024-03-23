<script>
	import { Input } from "@svelteuidev/core";
	import { MagnifyingGlass } from "radix-icons-svelte";
	import ChatCard from "$lib/components/ChatCard.svelte";
	import { onMount, afterUpdate } from "svelte";
	import Cookies from "js-cookie";
	import ChatInput from "$lib/components/chat/ChatInput.svelte";

	import CarbonSendAltFilled from "~icons/carbon/send-alt-filled";
	import CarbonStopFilledAlt from "~icons/carbon/stop-filled-alt";
	import EosIconsLoading from "~icons/eos-icons/loading";
	import Logo from "$lib/components/icons/Logo.svelte";
	import { goto } from "$app/navigation";
	import { Tooltip } from "@svelteuidev/core";
	import { ActionIcon } from "@svelteuidev/core";
	import { PlusCircled } from "radix-icons-svelte";
	import { SvelteUIProvider, Modal, Button, Loader } from "@svelteuidev/core";
	import { Checkbox } from "@svelteuidev/core";

	import LogoSmall from "$lib/components/icons/LogoSmall.svelte";
	import { PUBLIC_APP_NAME } from "$env/static/public";

	import { theme } from "$lib/stores/theme";
	import { ChatBubble } from "radix-icons-svelte";
	import { browser } from "$app/environment";

	let searchInput = "";
	let chatSection;
	let openSearchFriends = false;
	let searchFriendsInput = "";

	import { createStyles, Tabs } from "@svelteuidev/core";

	const useStyles = createStyles((them) => ({
		root: {
			// padding: "8px 16px", // Add your desired styles for the root class here
			// borderRadius: "4px", // For example, you can set padding and border radius
			// display: "flex",
			// alignItems: "center",
			// gap: "8px", // Add any other desired styles
			// color: "#000",
			// color: "red",

			"&.active": {
				// backgroundColor: "blue", // Add your active styles here
				// backgroundColor: "red", // Add your active styles here
				background: $theme == "light" ? "#228be6" : "#228be6",
				color: $theme == "light" ? "#fff" : "#fff",
				borderRadius: 8,
				fontSize: 16,
				fontWeight: 600,
				// Add more active styles as needed
			},
		},
	}));

	$: ({ classes } = useStyles());

	$: selected = selectedChat;

	$: {
		if (chatSection) {
			chatSection.scrollTop = chatSection.scrollHeight;
		}
	}

	let friendCards = [];

	let selectedChat;
	let chatMsg = "";
	let chats = [];
	let userId;
	let searchResults;
	let active = 1;

	let isReadOnly = false;
	let loading = false;
	// let themeVariable = localStorage.getItem("theme");
	let themeVariable = "light";
	if (browser) {
		let tempTheme = window.localStorage.getItem("theme");
		// themeVariable = tempTheme ? tempTheme : themeVariable;
	}

	let activeClassVariable = "active-chat";
	let addFriendsLoading = false;
	let noMatches = false;
	let token;

	async function sendMsg() {
		loading = true;
		console.log("message sent", chatMsg);
		let newChat = {
			sender: userId,
			message: chatMsg,
			recipient: selectedChat.emailId,
		};

		await fetch(`https://0p0uuuryfi.execute-api.us-west-2.amazonaws.com/dev/messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newChat),
		})
			.then(async (response) => {
				if (response.status == 201) {
					chats = [...chats, newChat];
					chatMsg = "";
					loading = false;
				} else {
					console.log("error", response);
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
	}

	async function getMessages(selectedChat) {
		await fetch(
			`https://0p0uuuryfi.execute-api.us-west-2.amazonaws.com/dev/messages?sender=${userId}&recipient=${selectedChat.emailId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then(async (response) => {
				if (response.status == 200) {
					let data = await response.json();
					chats = data;
				} else {
					console.log("error", response);
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
	}

	async function onChatSelected(event) {
		selectedChat = event.detail;
		console.log("selected chat", selectedChat);
		getMessages(selectedChat);
	}

	async function getContacts() {
		let headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		let gauth = Cookies.get("Google-Auth");
		if (gauth) {
			headers["Google-Auth"] = "True";
		}
		await fetch("https://backend.immigpt.ai/users/myContacts?length=100", {
			method: "GET",
			headers: headers,
		})
			.then(async (response) => {
				if (response.status == 200) {
					let data = await response.json();
					friendCards = data.users;
					selectedChat = friendCards[0];
					getMessages(selectedChat);
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
	}

	onMount(async () => {
		//console.log("check", localStorage.getItem("theme"));
		userId = Cookies.get("email");
		token = Cookies.get("token");

		// themeVariable == "light"
		true ? (activeClassVariable = "active-chat-light") : (activeClassVariable = "active-chat");

		console.log(userId, token);
		getContacts();
	});

	async function searchFriends(event) {
		if (event.key === "Enter") {
			if (searchFriendsInput != "") {
				console.log("search friends", searchFriendsInput);
				await fetch(
					`https://backend.immigpt.ai/users/searchUsers?searchValue=${searchFriendsInput}&length=10`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				)
					.then(async (response) => {
						if (response.status == 200) {
							let data = await response.json();
							searchResults = data.users;
							noMatches = false;
						} else {
							console.log("error", response);
							noMatches = true;
						}
					})
					.catch((error) => {
						console.log("error", error);
						noMatches = true;
					});
			}
		}
	}

	function gotoHomePage() {
		goto("/");
	}

	let selectedItems = [];

	function toggleSelection(item) {
		if (selectedItems.includes(item)) {
			selectedItems = selectedItems.filter((selected) => selected !== item);
		} else {
			selectedItems = [...selectedItems, item];
		}
	}

	async function addFriends() {
		addFriendsLoading = true;
		console.log("add member!! clicked");
		let usersData = selectedItems.map((item) => item.id);
		let users = {
			users: usersData,
		};

		await fetch(`https://backend.immigpt.ai/users/sendFriendRequest`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(users),
		})
			.then(async (response) => {
				if (response.status == 200) {
					console.log("Friend requests have been sent");
					openSearchFriends = false;
					getContacts();
				} else {
					console.log("error", response);
				}
				addFriendsLoading = false;
			})
			.catch((error) => {
				console.log("error", error);
				addFriendsLoading = false;
			});
	}

	function onActiveChange(event) {
		const { index, key } = event.detail;
		if (index == 0) {
			gotoHomePage();
		} else {
			return;
		}
	}

	afterUpdate(() => {
		if (chatSection) {
			chatSection.scrollTop = chatSection.scrollHeight;
		}
	});
	async function openSearchFriendsModal() {
		openSearchFriends = !openSearchFriends;
		searchResults = [];
		selectedItems = [];
		addFriendsLoading = false;
		searchFriendsInput = "";
		console.log("reached", openSearchFriends);
	}
</script>

<div class={themeVariable != "light" ? "wrapper" : "wrapper-light"}>
	<div class={themeVariable != "light" ? "container" : "container-light"}>
		<div class="left-container">
			<div class="tabs">
				<!-- <Tabs on:change={onActiveChange} variant="pills"> -->
				<Tabs bind:active on:change={onActiveChange} variant="unstyled">
					<Tabs.Tab label={PUBLIC_APP_NAME} class={classes.root} icon={LogoSmall} />
					<Tabs.Tab label="Chats" class={classes.root} icon={ChatBubble} />
				</Tabs>
			</div>
			<div class="chat-top">
				<p class="title">Messages</p>
				<Tooltip withArrow transitionDuration={200} label="Add Friends" position="bottom">
					<ActionIcon on:click={openSearchFriendsModal}>
						<PlusCircled size={24} />
					</ActionIcon>
				</Tooltip>
				<!-- <Tooltip withArrow transitionDuration={200} label="ImmiGPT" position="bottom">
					<button class="logo-btn" on:click={gotoHomePage}>
						<Logo classNames="mr-1" />
					</button>
				</Tooltip> -->
			</div>
			<div class="search-input">
				<Input
					icon={MagnifyingGlass}
					placeholder="Search Chats"
					rightSectionWidth={70}
					styles={{ rightSection: { pointerEvents: "none" } }}
					bind:value={searchInput}
					size="lg"
					className="search-box"
					style={themeVariable == "light"
						? "border-radius:8px;color:#222;"
						: "border-radius:8px;color:#222;"}
				/>
				<!-- : "background-color:#343a40;border:none;border-radius:8px;color:#FFF;"} -->
				<!-- style="background-color:#343a40;border:none;border-radius:8px;color:#FFF;" -->
			</div>
			<div class="list-of-friends">
				{#each friendCards as friendCard}
					<div
						class="chat-card {selected.emailId == friendCard.emailId ? activeClassVariable : ''}"
					>
						<ChatCard on:chatSelected={onChatSelected} cardData={friendCard} />
					</div>
				{/each}
			</div>
		</div>
		<div class="right-container">
			{#if !openSearchFriends}
				<div class="right-wrapper">
					{#if selectedChat}
						<div class="top">
							{#if selectedChat.imageUrl}
								<img class="chat-img" src={selectedChat.imageUrl} alt="" />
							{:else}
								<div class="profile-image">
									<span class="initial">{selectedChat.userName[0].toUpperCase()}</span>
								</div>
							{/if}
							<div class="name-and-chat">
								<span class="name">{selectedChat.userName}</span>
								<!-- <span class="preview">{cardData.chat}</span> -->
							</div>
						</div>
						<div class="chat-section" bind:this={chatSection}>
							{#each chats as chat}
								<span class="bubble {chat.sender == userId ? 'me' : 'you'}">{chat.message}</span>
							{/each}
						</div>
						<div class="chat-wrapper">
							<form
								on:submit|preventDefault={sendMsg}
								class="relative flex w-full max-w-4xl flex-1 items-center rounded-xl border bg-gray-100 focus-within:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus-within:border-gray-500 
				{isReadOnly ? 'opacity-30' : ''}"
							>
								<div class="flex w-full flex-1 border-none bg-transparent">
									<!-- <Input
							class="chat-msg"
							variant="default"
							bind:value={chatMsg}
							placeholder="Enter your message.."
						/>
						<button on:click={sendMsg}
							><img class="icon" src="/chatui/send-msg-icon.svg" alt="" /></button
						> -->
									<ChatInput
										placeholder="Type your message"
										bind:value={chatMsg}
										on:submit={sendMsg}
										maxRows={4}
										disabled={isReadOnly}
									/>
									{#if loading}
										<button
											class="btn mx-1 my-1 inline-block h-[2.4rem] self-end rounded-lg bg-transparent p-1 px-[0.7rem] text-gray-400 disabled:opacity-60 enabled:hover:text-gray-700 dark:disabled:opacity-40 enabled:dark:hover:text-gray-100 md:hidden"
										>
											<CarbonStopFilledAlt />
										</button>
										<div
											class="mx-1 my-1 hidden h-[2.4rem] items-center p-1 px-[0.7rem] text-gray-400 disabled:opacity-60 enabled:hover:text-gray-700 dark:disabled:opacity-40 enabled:dark:hover:text-gray-100 md:flex"
										>
											<EosIconsLoading />
										</div>
									{:else}
										<button
											class="btn mx-1 my-1 h-[2.4rem] self-end rounded-lg bg-transparent p-1 px-[0.7rem] text-gray-400 disabled:opacity-60 enabled:hover:text-gray-700 dark:disabled:opacity-40 enabled:dark:hover:text-gray-100"
											disabled={!chatMsg || isReadOnly}
											type="submit"
										>
											<CarbonSendAltFilled />
										</button>
									{/if}
								</div>
							</form>
						</div>
					{/if}
				</div>
			{:else}
				<!-- <div class="right-wrapper"> -->
				<div class={themeVariable != "light" ? "search-friends-light" : "search-friends"}>
					<Input
						icon={MagnifyingGlass}
						placeholder="Search friends"
						rightSectionWidth={70}
						styles={{ rightSection: { pointerEvents: "none" } }}
						bind:value={searchFriendsInput}
						on:keydown={searchFriends}
						size="lg"
						className="search-box"
						style={themeVariable == "light"
							? "border-radius:8px;color:#222;"
							: "border-radius:8px;color:#222;"}
					/>
					<!-- : "background-color:#343a40;border:none;border-radius:8px;color:#FFF;"} -->
				</div>
				<div class="search-results">
					{#if searchResults}
						{#each searchResults as result}
							<div class="friend-card" on:click={() => toggleSelection(result)}>
								<div class="card-left">
									<Checkbox checked={selectedItems.includes(result)} size="sm" />
									<div class="profile-image search">
										{#if result.userName}
											<span class="initial">{result.userName[0].toUpperCase()}</span>
										{:else if result.emailId}
											<span class="initial">{result.emailId[0].toUpperCase()}</span>
										{:else}
											<span class="initial">?</span>
										{/if}
									</div>
								</div>
								<div class="center">
									<p class="friend-name">{result.userName}</p>
									<p class="friend-email">{result.emailId}</p>
								</div>
							</div>
						{/each}
					{:else if noMatches}
						<h1>No Matches Found!!</h1>
					{/if}
				</div>
				<div class={themeVariable != "light" ? "search-footer-dark" : "search-footer"}>
					{#if !addFriendsLoading}
						<Button
							disabled={!selectedItems || !selectedItems.length > 0}
							style={themeVariable != "light" && (!selectedItems || !selectedItems.length > 0)
								? "width:100%; background-color: rgba(255, 255, 255, 0.2);"
								: "width:100%;"}
							on:click={addFriends}
							>Add Member
						</Button>
					{:else}
						<Button disabled style="width:100%;"><Loader /></Button>
					{/if}
				</div>
				<!-- </div> -->
			{/if}
		</div>
	</div>
	<div>
		<SvelteUIProvider>
			<Modal {openSearchFriends} centered title="Introduce yourself!">
				<p>GET</p>
			</Modal>
		</SvelteUIProvider>
	</div>
</div>

<style>
	.wrapper {
		padding: 35px 100px;
		max-height: 100vh;
		background-color: #343a40;
	}
	.wrapper-light {
		padding: 35px 100px;
		max-height: 100vh;
		/* background-color: #fff; */
	}

	.container {
		display: flex;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		min-height: 85vh;
		--tw-bg-opacity: 1;
		background-color: rgb(17 24 39 / var(--tw-bg-opacity));
		border-radius: 8px;
	}
	.container-light {
		display: flex;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		min-height: 85vh;
		--tw-bg-opacity: 1;
		/* background-color: rgb(17 24 39 / var(--tw-bg-opacity)); */
		border-radius: 8px;
	}

	.title {
		font-size: 22px;
	}

	.chat-card.active-chat {
		background-color: #343a40;
		border-radius: 8px;
	}

	.chat-card.active-chat-light {
		background-color: #e7ebf0;
		border-radius: 8px;
	}

	.left-container {
		/* padding: 20px; */
		/* border-right: 1px solid #e5e7eb; */
		box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.35);
	}

	.left-container {
		/* padding: 20px; */
		gap: 15px;
		display: flex;
		flex-direction: column;
		/* height: 100vh; */

		width: 350px;
	}

	.right-container {
		width: calc(100% - 350px);
		position: relative;
	}

	.list-of-friends {
		height: 63vh;
		overflow-y: auto;
	}

	.list-of-friends::-webkit-scrollbar {
		width: 0 !important;
	}
	.list-of-friends {
		overflow: -moz-scrollbars-none;
	}
	.list-of-friends {
		-ms-overflow-style: none;
	}

	.chat-top {
		display: flex;
		justify-content: space-between;
		padding: 0 20px 20px 20px;
	}

	.search-input {
		padding: 0 20px;
	}

	.logo-btn {
		border: none;
		background: none;
	}

	.top {
		width: 100%;
		/* height: 47px; */
		padding: 15px 29px;
		/* border-bottom: 1px solid #e5e7eb; */
		box-shadow: 5px 0px 15px rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.top span {
		font-size: 18px;
		color: grey;
	}

	.tabs {
		padding: 12px;
		box-sizing: border-box;
	}

	.chat-section {
		padding: 20px 50px;
		height: 75vh;
		overflow-y: auto;
	}

	.chat-section::-webkit-scrollbar {
		width: 0 !important;
	}
	.chat-section {
		overflow: -moz-scrollbars-none;
	}
	.chat-section {
		-ms-overflow-style: none;
	}

	.bubble {
		font-size: 18px;
		position: relative;
		display: inline-block;
		clear: both;
		margin-bottom: 8px;
		padding: 6px 14px;
		vertical-align: top;
		border-radius: 5px;
		align-self: flex-end !important;
	}
	.bubble:before {
		position: absolute;
		top: 3px;
		display: block;
		width: 8px;
		height: 6px;
		content: " ";
		transform: rotate(29deg) skew(-35deg);
	}
	.bubble.you {
		float: left;
		color: white;
		background-color: #3b82f6;
		align-self: flex-start;
		-webkit-animation-name: slideFromLeft;
		animation-name: slideFromLeft;
	}
	.bubble.you:before {
		left: -3px;
		background-color: #3b82f6;
	}
	.bubble.me {
		float: right;
		color: black;
		background-color: #e5e7eb;
		align-self: flex-end;
		-webkit-animation-name: slideFromRight;
		animation-name: slideFromRight;
	}
	.bubble.me:before {
		right: -3px;
		background-color: #e5e7eb;
	}

	.chat-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 70px;
		/* border-top: 1px solid #e5e7eb; */
		box-shadow: 5px 0px 15px rgba(0, 0, 0, 0.15);
		padding: 12px;
	}

	.chat-img {
		float: left;
		width: 40px;
		height: 40px;
		margin-right: 12px;
		border-radius: 50%;
		object-fit: cover;
	}

	.profile-image {
		width: 30px;
		height: 30px;
		background-color: #3498db; /* Background color for the image */
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		color: #ffffff; /* Text color */
	}

	.chat-img {
		float: left;
		width: 40px;
		height: 40px;
		margin-right: 12px;
		border-radius: 50%;
		object-fit: cover;
	}

	.top .initial {
		color: white;
	}
	.search-box {
		background-color: #343a40 !important;
		border: none !important;
	}

	.search-friends {
		padding: 20px;
		background-color: #e7ebf0;
	}
	.search-friends-light {
		padding: 20px;
		/* background-color: #e7ebf0; */
	}

	.friend-card {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px;
		cursor: pointer;
	}

	.friend-name {
		font-size: 18px;
		font-weight: bold;
	}

	.friend-email {
		font-size: 16px;
	}

	.card-left {
		display: flex;
		gap: 16px;
	}

	.search-results {
		height: 71vh;
		overflow-y: auto;
	}

	.search-footer {
		padding: 20px;
		background-color: #e7ebf0;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	.search-footer-dark {
		padding: 20px;
		/* background-color: #e7ebf0; */
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.profile-image.search {
		height: 45px;
		width: 45px;
	}
	.add-friends {
		background-color: rgb(52, 58, 64);
	}
</style>
