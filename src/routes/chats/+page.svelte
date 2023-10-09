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

	let searchInput = "";
	let chatSection;

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

	let isReadOnly = false;
	let loading = false;

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
		// chats = [
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1694027587109",
		// 		message: "Hello",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "tamatammadan@gmail.com",
		// 		createdAt: "1694027611765",
		// 		message: "Tell me",
		// 		recipient: "murugeshraja2000@gmail.com",
		// 	},
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1694027689736",
		// 		message: "ooh god!",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "tamatammadan@gmail.com",
		// 		createdAt: "1694027702710",
		// 		message: "Nice",
		// 		recipient: "murugeshraja2000@gmail.com",
		// 	},
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1694027709481",
		// 		message: "No No",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1694027718251",
		// 		message: "okay",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1694027731365",
		// 		message: "Don't worry!",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1695320218394",
		// 		message: "Hello",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "tamatammadan@gmail.com",
		// 		createdAt: "1695320229067",
		// 		message: "Tell me",
		// 		recipient: "murugeshraja2000@gmail.com",
		// 	},
		// 	{
		// 		sender: "tamatammadan@gmail.com",
		// 		createdAt: "1695571472614",
		// 		message: "Hii",
		// 		recipient: "murugeshraja2000@gmail.com",
		// 	},
		// 	{
		// 		sender: "tamatammadan@gmail.com",
		// 		createdAt: "1695745561750",
		// 		message: "Hello",
		// 		recipient: "murugeshraja2000@gmail.com",
		// 	},
		// 	{
		// 		sender: "tamatammadan@gmail.com",
		// 		createdAt: "1695752587679",
		// 		message: "Namasthe",
		// 		recipient: "murugeshraja2000@gmail.com",
		// 	},
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1695752659425",
		// 		message: "Tell me your name?",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "tamatammadan@gmail.com",
		// 		createdAt: "1695752942850",
		// 		message: "ok",
		// 		recipient: "murugeshraja2000@gmail.com",
		// 	},
		// 	{
		// 		sender: "tamatammadan@gmail.com",
		// 		createdAt: "1695753086195",
		// 		message: "you are rocking!",
		// 		recipient: "murugeshraja2000@gmail.com",
		// 	},
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1695753124109",
		// 		message: "Excellent work?",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1695753238038",
		// 		message: "Nice Job Bro",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1695753285757",
		// 		message: "Nie",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1695753293472",
		// 		message: "Hello man",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "tamatammadan@gmail.com",
		// 		createdAt: "1695753301447",
		// 		message: "No way ?",
		// 		recipient: "murugeshraja2000@gmail.com",
		// 	},
		// 	{
		// 		sender: "tamatammadan@gmail.com",
		// 		createdAt: "1695753315786",
		// 		message: "Hello man",
		// 		recipient: "murugeshraja2000@gmail.com",
		// 	},
		// 	{
		// 		sender: "murugeshraja2000@gmail.com",
		// 		createdAt: "1695753358696",
		// 		message: "hi",
		// 		recipient: "tamatammadan@gmail.com",
		// 	},
		// 	{
		// 		sender: "tamatammadan@gmail.com",
		// 		createdAt: "1695753366373",
		// 		message: "New",
		// 		recipient: "murugeshraja2000@gmail.com",
		// 	},
		// ];
	}

	onMount(async () => {
		userId = Cookies.get("email");
		let token = Cookies.get("token");

		await fetch("https://backend.immigpt.net/users/myContacts?length=100", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
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
	});

	afterUpdate(() => {
		if (chatSection) {
			chatSection.scrollTop = chatSection.scrollHeight;
		}
	});
</script>

<div class="wrapper">
	<div class="container">
		<div class="left-container">
			<p class="title">Messages</p>
			<Input
				icon={MagnifyingGlass}
				placeholder="Search friends"
				rightSectionWidth={70}
				styles={{ rightSection: { pointerEvents: "none" } }}
				bind:value={searchInput}
			/>
			<div class="list-of-friends">
				{#each friendCards as friendCard}
					<ChatCard on:chatSelected={onChatSelected} cardData={friendCard} />
				{/each}
			</div>
		</div>
		<div class="right-container">
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
	</div>
</div>

<style>
	/* .wrapper {
		padding: 20px;
	} */

	.container {
		display: flex;
	}

	.left-container {
		padding: 20px;
		border: 1px solid;
	}

	.left-container {
		padding: 20px;
		gap: 15px;
		display: flex;
		flex-direction: column;
		height: 100vh;

		width: 350px;
	}

	.right-container {
		width: calc(100% - 350px);
		position: relative;
	}

	.top {
		width: 100%;
		/* height: 47px; */
		padding: 15px 29px;
		background-color: #eceff1;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.top span {
		font-size: 15px;
		color: grey;
	}

	.chat-section {
		padding: 20px;
		padding: 20px;
		height: 80vh;
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
		font-size: 16px;
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
		color: var(--white);
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
		background-color: #eceff1;
		align-self: flex-end;
		-webkit-animation-name: slideFromRight;
		animation-name: slideFromRight;
	}
	.bubble.me:before {
		right: -3px;
		background-color: #eceff1;
	}

	.chat-wrapper {
		padding: 10px;
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
</style>
