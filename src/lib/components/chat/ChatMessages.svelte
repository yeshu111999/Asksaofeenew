<script lang="ts">
	import type { Message } from "$lib/types/Message";
	import { snapScrollToBottom } from "$lib/actions/snapScrollToBottom";
	import ScrollToBottomBtn from "$lib/components/ScrollToBottomBtn.svelte";
	import { createEventDispatcher, tick } from "svelte";
	import { randomUUID } from "$lib/utils/randomUuid";
	import type { Model } from "$lib/types/Model";
	import type { LayoutData } from "../../../routes/$types";
	import ChatIntroduction from "./ChatIntroduction.svelte";
	import ChatMessage from "./ChatMessage.svelte";
	import type { WebSearchUpdate } from "$lib/types/MessageUpdate";
	import { browser } from "$app/environment";

	export let messages: Message[];
	export let loading: boolean;
	export let pending: boolean;
	export let isAuthor: boolean;
	export let currentModel: Model;
	export let settings: LayoutData["settings"];
	export let models: Model[];
	export let readOnly: boolean;

	let dispatch = createEventDispatcher();

	let chatContainer: HTMLElement;

	export let webSearchMessages: WebSearchUpdate[] = [];

	async function scrollToBottom() {
		await tick();
		chatContainer.scrollTop = chatContainer.scrollHeight;
	}

	// If last message is from user, scroll to bottom
	$: if (browser && messages[messages.length - 1]?.from === "user") {
		scrollToBottom();
	}
</script>

<div
	class="scrollbar-custom mr-1 h-full overflow-y-auto"
	use:snapScrollToBottom={messages.length ? [...messages, ...webSearchMessages] : false}
	bind:this={chatContainer}
>
	<!-- <div
		class="chat-intro mx-auto flex h-full max-w-3xl flex-col gap-6 px-5 pt-6 sm:gap-8 xl:max-w-4xl"
	> -->
	<!-- <div class="chat-intro-alone mx-auto flex flex-col px-5 xl:max-w-4xl"> -->
	<!-- <div
		class="chat-intro-alone mx-auto flex h-full max-w-3xl flex-col gap-6 px-5 pt-6 sm:gap-8 xl:max-w-4xl"
	> -->
	<div
		class={messages.length > 0
			? "chat-intro mx-auto flex h-full max-w-3xl flex-col gap-6 px-5 pt-6 sm:gap-8 xl:max-w-4xl"
			: "chat-intro mx-auto flex h-full max-w-3xl flex-col gap-6 px-5 pt-6 sm:gap-8 xl:max-w-4xl"}
	>
		<!-- : "chat-intro-alone mx-auto flex flex-col px-5 xl:max-w-4xl"} -->
		{#each messages as message, i}
			{#key i}
				<ChatMessage
					loading={loading && i === messages.length - 1}
					{message}
					{isAuthor}
					{readOnly}
					model={currentModel}
					webSearchMessages={i === messages.length - 1 ? webSearchMessages : []}
					toll={i}
					on:retry={(ev) => {
						if (!loading) dispatch("retry", ev.detail);
					}}
					on:vote
				/>
			{/key}
		{:else}
			<ChatIntroduction {settings} {models} {currentModel} on:message />
		{/each}
		{#if pending}
			<ChatMessage
				message={{ from: "assistant", content: "", id: randomUUID() }}
				model={currentModel}
				{webSearchMessages}
			/>
		{/if}
		<div class="h-44 flex-none" />
	</div>
	<ScrollToBottomBtn
		class="bottom-36 right-4 max-md:hidden lg:right-10"
		scrollNode={chatContainer}
	/>
</div>

<style>
	.chat-intro {
		height: 100%;
		width: 100%;
	}
	.chat-intro-alone {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
</style>
