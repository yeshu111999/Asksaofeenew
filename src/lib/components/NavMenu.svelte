<script lang="ts">
	import { base } from "$app/paths";
	import { createEventDispatcher } from "svelte";

	import Logo from "$lib/components/icons/Logo.svelte";
	import { switchTheme } from "$lib/switchTheme";
	import { PUBLIC_APP_NAME, PUBLIC_ORIGIN } from "$env/static/public";
	import NavConversationItem from "./NavConversationItem.svelte";
	import type { LayoutData } from "../../routes/$types";
	import { goto } from "$app/navigation";
	import { Tooltip } from "@svelteuidev/core";

	import { theme } from "$lib/stores/theme";

	const dispatch = createEventDispatcher<{
		shareConversation: { id: string; title: string };
		clickSettings: void;
		clickLogout: void;
	}>();

	export let conversations: Array<{
		id: string;
		title: string;
	}> = [];

	export let canLogin: boolean;
	export let user: LayoutData["user"];

	export let loginModalVisible;

	function gotoProfile() {
		goto("/profile");
	}

	function gotoChats() {
		goto("/chats");
	}

	function logOut() {
		var cookiesToRemove = ["token", "name", "email"];

		cookiesToRemove.forEach(function (cookieName) {
			document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		});
		window.location.href = "/";
	}
</script>

<div class="sticky top-0 flex flex-none items-center justify-between px-3 py-3.5 max-sm:pt-0">
	<a class="flex items-center rounded-xl text-lg font-semibold" href="{PUBLIC_ORIGIN}{base}/">
		<Logo classNames="mr-1" />
		{PUBLIC_APP_NAME}
	</a>

	<Tooltip withArrow transitionDuration={200} label="Messages">
		<button class="chat-btn" on:click={gotoChats}><img src="/chatui/chat-icon.svg" alt="" /></button
		>
	</Tooltip>
	<a
		href={`${base}/`}
		class="flex rounded-lg border bg-white px-2 py-0.5 text-center shadow-sm hover:shadow-none dark:border-gray-600 dark:bg-gray-700"
	>
		New Chat
	</a>
</div>
<div
	class={$theme == "dark"
		? "scrollbar-custom flex flex-col gap-1 overflow-y-auto rounded-r-xl bg-gradient-to-l from-gray-50 px-3 pb-3 pt-2 dark:from-gray-800/30 "
		: "scrollbar-custom light-backround flex flex-col gap-1 overflow-y-auto rounded-r-xl"}
	style={$theme == "light" ? "background-color:#0b4374;color:white" : ""}
>
	{#each conversations as conv (conv.id)}
		<NavConversationItem on:editConversationTitle on:deleteConversation {conv} />
	{/each}
</div>
<div
	class={$theme == "dark"
		? "mt-0.5 flex flex-col gap-1 rounded-r-xl bg-gradient-to-l from-gray-50 p-3 text-sm dark:from-gray-800/30 "
		: "mt-0.5 flex flex-col gap-1 rounded-r-xl"}
	style={$theme == "light" ? "background-color:#0b4374;color:white;" : ""}
>
	{#if user?.username || user?.email}
		<form
			action="{base}/logout"
			method="post"
			class="group flex items-center gap-1.5 rounded-lg pl-3 pr-2 hover:bg-gray-100 dark:hover:bg-gray-700"
		>
			<span
				class={"flex h-9 flex-none shrink items-center gap-1.5 truncate pr-2 " + $theme == "dark"
					? "text-gray-500 dark:text-gray-400"
					: ""}>{user?.username || user?.email}</span
			>
			<button
				type="submit"
				class={"ml-auto h-6 flex-none items-center gap-1.5 rounded-md border bg-white px-2  shadow-sm group-hover:flex hover:shadow-none dark:border-gray-600 dark:bg-gray-600  md:hidden " +
					$theme ==
				"dark"
					? "text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
					: ""}
				style={$theme == "light" ? "color:white;background-color:#0b4374;" : ""}
			>
				Sign Out
			</button>
		</form>
	{/if}
	{#if canLogin}
		<button
			on:click={() => (loginModalVisible = true)}
			type="button"
			class={"flex h-9 flex-none items-center gap-1.5 rounded-lg pl-3 pr-2 " + $theme == "dark"
				? "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
				: "button-light-theme"}
			style={$theme == "light" ? "color:white;background-color:#0b4374;" : ""}
		>
			Login
		</button>
	{/if}
	{#if !canLogin}
		<button
			on:click={gotoProfile}
			type="button"
			class={"flex h-9 flex-none items-center gap-1.5 rounded-lg pl-3 pr-2 " + $theme == "dark"
				? "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
				: "button-light-theme"}
			style={$theme == "light" ? "color:white;background-color:#0b4374;" : ""}
		>
			Profile
		</button>
	{/if}
	<!-- <button
		on:click={switchTheme}
		type="button"
		class={"flex h-9 flex-none items-center gap-1.5 rounded-lg pl-3 pr-2 " + $theme == "dark"
			? "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
			: "button-light-theme"}
		style={$theme == "light" ? "color:white;background-color:#0b4374;" : ""}
	>
		Theme
	</button> -->
	<button
		on:click={() => dispatch("clickSettings")}
		type="button"
		class={"flex h-9 flex-none items-center gap-1.5 rounded-lg pl-3 pr-2 " + $theme == "dark"
			? "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
			: "button-light-theme"}
		style={$theme == "light" ? "color:white;background-color:#0b4374;" : ""}
	>
		Settings
	</button>
	{#if !canLogin}
		<button
			on:click={logOut}
			type="button"
			class={"flex h-9 flex-none items-center gap-1.5 rounded-lg pl-3 pr-2 " + $theme == "dark"
				? "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
				: "button-light-theme"}
			style={$theme == "light" ? "color:white;background-color:#0b4374;" : ""}
		>
			Logout
		</button>
	{/if}
	{#if PUBLIC_APP_NAME === "HuggingChat"}
		<a
			href="https://huggingface.co/spaces/huggingchat/chat-ui/discussions"
			target="_blank"
			rel="noreferrer"
			class="flex h-9 flex-none items-center gap-1.5 rounded-lg pl-3 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
		>
			Feedback
		</a>
		<a
			href="{base}/privacy"
			class="flex h-9 flex-none items-center gap-1.5 rounded-lg pl-3 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
		>
			About & Privacy
		</a>
	{/if}
</div>

<style>
	.chat-btn {
		width: 24px;
		height: 24px;
	}

	.button-light-theme {
		color: white;
		color: white;
		padding-left: 0.75rem;
		padding-right: 0.5rem;
		display: flex;
		height: 2.25rem;
		align-items: center;
		border-top-right-radius: 0.75rem;
		/* background-color: #0b4374; */
	}

	.button-light-theme:hover {
		color: black !important;
		background-color: white !important;
		border-radius: 4px;
	}
</style>
