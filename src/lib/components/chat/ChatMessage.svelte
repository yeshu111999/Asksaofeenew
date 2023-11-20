<script lang="ts">
	import { marked } from "marked";
	import markedKatex from "marked-katex-extension";
	import type { Message } from "$lib/types/Message";
	import { afterUpdate, createEventDispatcher } from "svelte";
	import { deepestChild } from "$lib/utils/deepestChild";
	import { page } from "$app/stores";
	import Cookies from "js-cookie";
	import { TextInput, Button, Tooltip } from "@svelteuidev/core";

	import CodeBlock from "../CodeBlock.svelte";
	import CopyToClipBoardBtn from "../CopyToClipBoardBtn.svelte";
	import Tooltips from "../Tooltip.svelte";
	import IconLoading from "../icons/IconLoading.svelte";
	import CarbonRotate360 from "~icons/carbon/rotate-360";
	import CarbonDownload from "~icons/carbon/download";
	import CarbonEdit from "~icons/carbon/edit";
	import CarbonThumbsUp from "~icons/carbon/thumbs-up";
	import CarbonThumbsDown from "~icons/carbon/thumbs-down";
	import { PUBLIC_SEP_TOKEN } from "$lib/constants/publicSepToken";
	import type { Model } from "$lib/types/Model";
	import { currentTheme } from "$lib/stores/themeStore";

	import OpenWebSearchResults from "../OpenWebSearchResults.svelte";
	import type { WebSearchUpdate } from "$lib/types/MessageUpdate";

	function sanitizeMd(md: string) {
		let ret = md
			.replace(/<\|[a-z]*$/, "")
			.replace(/<\|[a-z]+\|$/, "")
			.replace(/<$/, "")
			.replaceAll(PUBLIC_SEP_TOKEN, " ")
			.replaceAll(/<\|[a-z]+\|>/g, " ")
			.replaceAll(/<br\s?\/?>/gi, "\n")
			.replaceAll("<", "&lt;")
			.trim();

		for (const stop of [...(model.parameters?.stop ?? []), "<|endoftext|>"]) {
			if (ret.endsWith(stop)) {
				ret = ret.slice(0, -stop.length).trim();
			}
		}

		return ret;
	}
	function unsanitizeMd(md: string) {
		return md.replaceAll("&lt;", "<");
	}

	function updateDivContent(event) {
		editMessage = stripHTML(event.target.innerHTML);
	}

	function stripHTML(html) {
		let doc = new DOMParser().parseFromString(html, "text/html");
		return doc.body.textContent || "";
	}

	function handlePaste(event) {
		// event.preventDefault();
		// const editMessage = (event.clipboardData || window.clipboardData).getData("text/plain");
		// document.execCommand("insertText", false, text);
	}

	export let model: Model;
	export let message: Message;
	export let loading = false;
	export let isAuthor = true;
	export let readOnly = false;
	export let isTapped = false;

	export let webSearchMessages: WebSearchUpdate[];

	let toolTap = false;

	const handleToolClick = () => {
		toolTap = true;
		setTimeout(() => {
			toolTap = false;
		}, 1000);
	};

	const dispatch = createEventDispatcher<{
		retry: { content: string; id: Message["id"] };
		vote: { score: Message["score"]; id: Message["id"] };
	}>();

	let userName = Cookies.get("name");

	let contentEl: HTMLElement;
	let loadingEl: IconLoading;
	let pendingTimeout: ReturnType<typeof setTimeout>;
	let isCopied = false;

	const renderer = new marked.Renderer();
	// For code blocks with simple backticks
	renderer.codespan = (code) => {
		// Unsanitize double-sanitized code
		return `<code>${code.replaceAll("&amp;", "&")}</code>`;
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { extensions, ...defaults } = marked.getDefaults() as marked.MarkedOptions & {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		extensions: any;
	};
	const options: marked.MarkedOptions = {
		...defaults,
		gfm: true,
		breaks: true,
		renderer,
	};

	marked.use(
		markedKatex({
			throwOnError: false,
			// output: "html",
		})
	);

	$: tokens = marked.lexer(sanitizeMd(message.content));

	afterUpdate(() => {
		loadingEl?.$destroy();
		clearTimeout(pendingTimeout);

		// Add loading animation to the last message if update takes more than 600ms
		if (loading) {
			pendingTimeout = setTimeout(() => {
				if (contentEl) {
					loadingEl = new IconLoading({
						target: deepestChild(contentEl),
						props: { classNames: "loading inline ml-2" },
					});
				}
			}, 600);
		}
	});

	let editMessage = message.content;
	let editFlag = false;

	let searchUpdates: WebSearchUpdate[] = [];

	$: searchUpdates = ((webSearchMessages.length > 0
		? webSearchMessages
		: message.updates?.filter(({ type }) => type === "webSearch")) ?? []) as WebSearchUpdate[];

	$: downloadLink =
		message.from === "user" ? `${$page.url.pathname}/message/${message.id}/prompt` : undefined;

	let webSearchIsDone = true;

	$: webSearchIsDone =
		searchUpdates.length > 0 && searchUpdates[searchUpdates.length - 1].messageType === "sources";

	$: webSearchSources =
		searchUpdates &&
		searchUpdates?.filter(({ messageType }) => messageType === "sources")?.[0]?.sources;

	$: if (isCopied) {
		setTimeout(() => {
			isCopied = false;
		}, 1000);
	}
</script>

{#if message.from === "assistant"}
	<div
		class="responseChatGroup group relative -mb-8 flex items-start justify-start leading-relaxed"
		on:click={() => (isTapped = !isTapped)}
		on:keypress={() => (isTapped = !isTapped)}
	>
		<div style="padding: 22px 0px 16px 16px; min-width: 32px; max-width: 32px">
			<img alt="" src="https://huggingface.co/avatars/2edb18bd0206c16b433841a47f53fa8e.svg" />
		</div>
		<!-- class="h-3 w-3 flex-none select-none rounded-full shadow-lg"
			style="padding: 16px; width: 32px;" -->
		<!-- <div
			class="relative min-h-[calc(2rem+theme(spacing[3.5])*2)] min-w-[60px] break-words rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 px-5 py-3.5 text-gray-600 prose-pre:my-2 dark:border-gray-800 dark:from-gray-800/40 dark:text-gray-300"
		> -->
		<div class="responseTextWrap">
			{#if searchUpdates && searchUpdates.length > 0}
				<OpenWebSearchResults
					classNames={tokens.length ? "mb-3.5" : ""}
					webSearchMessages={searchUpdates}
					loading={!(searchUpdates[searchUpdates.length - 1]?.messageType === "sources")}
				/>
			{/if}
			{#if !message.content && (webSearchIsDone || (webSearchMessages && webSearchMessages.length === 0))}
				<IconLoading />
			{/if}

			<div
				class="responseText prose max-w-none dark:prose-invert max-sm:prose-sm prose-headings:font-semibold prose-h1:text-lg prose-h2:text-base prose-h3:text-base prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900"
				bind:this={contentEl}
			>
				{#each tokens as token}
					{#if token.type === "code"}
						<CodeBlock lang={token.lang} code={unsanitizeMd(token.text)} />
					{:else}
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html marked.parse(token.raw, options)}
					{/if}
				{/each}
			</div>
			<!-- Web Search sources -->
			{#if webSearchSources?.length}
				<div class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm">
					<div class="text-gray-400">Sources:</div>
					{#each webSearchSources as { link, title, hostname }}
						<a
							class="flex items-center gap-2 whitespace-nowrap rounded-lg border bg-white px-2 py-1.5 leading-none hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
							href={link}
							target="_blank"
						>
							<img
								class="h-3.5 w-3.5 rounded"
								src="https://www.google.com/s2/favicons?sz=64&domain_url={hostname}"
								alt="{title} favicon"
							/>
							<div class="sourceText">{hostname.replace(/^www\./, "")}</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
		{#if isAuthor && !loading && message.content}
			<div
				class="absolute bottom-1 right-0 flex max-md:transition-all md:bottom-0"
				class:liked={message.score === 1}
				class:visible={isTapped || isCopied}
			>
				<Tooltip opened={message.score === 1 && toolTap} label="Liked" position="bottom">
					<button
						class="btn rounded-sm p-1 text-sm text-gray-400 focus:ring-0 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300
					{message.score && message.score > 0
							? 'text-green-500 hover:text-green-500 dark:text-green-400 hover:dark:text-green-400'
							: ''}"
						title={message.score === 1 ? "Remove +1" : "+1"}
						type="button"
						on:click={() => {
							dispatch("vote", { score: message.score === 1 ? 0 : 1, id: message.id });
							handleToolClick();
						}}
					>
						<!-- <CarbonThumbsUp class="h-[1.14em] w-[1.14em]" /> -->
						<svg
							width="24"
							height="25"
							viewBox="0 0 24 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M6.944 19.5H5.056C4.473 19.5 4 19.027 4 18.444V11.056C4 10.473 4.473 10 5.056 10H6.944C7.527 10 8 10.473 8 11.056V18.444C8 19.027 7.527 19.5 6.944 19.5V19.5Z"
								stroke="#6E6E6E"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								fill={message.score === 1 ? ($currentTheme == "light" ? "#222" : "#ccc") : ""}
							/>
							<path
								d="M8 11.072L11.649 6.321C12.328 5.436 13.654 5.414 14.363 6.275V6.275C14.628 6.596 14.772 7 14.772 7.416V10.687H17.868C18.469 10.687 19.03 10.987 19.364 11.486L19.693 11.977C19.988 12.418 20.074 12.967 19.927 13.476L18.568 18.198C18.346 18.969 17.641 19.5 16.839 19.5H10.55C10.05 19.5 9.572 19.292 9.232 18.926L8 17.6"
								stroke="#6E6E6E"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								fill={message.score === 1 ? ($currentTheme == "light" ? "#222" : "#ccc") : ""}
							/>
						</svg>
					</button>
				</Tooltip>
				<!-- <Tooltips
					classNames={isTapped && message.score === 1 ? "opacity-100" : "opacity-0"}
					label="Liked"
					position="left-1/2 top-full transform -translate-x-1/2 translate-y-2"
				/> -->
				<Tooltip opened={message.score === -1 && toolTap} label="Disliked" position="bottom">
					<button
						class="btn rounded-sm p-1 text-sm text-gray-400 focus:ring-0 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300
						{message.score && message.score < 0
							? 'text-red-500 hover:text-red-500 dark:text-red-400 hover:dark:text-red-400'
							: ''}"
						title={message.score === -1 ? "Remove -1" : "-1"}
						type="button"
						on:click={() => {
							dispatch("vote", { score: message.score === -1 ? 0 : -1, id: message.id });
							handleToolClick();
						}}
					>
						<!-- <CarbonThumbsDown class="h-[1.14em] w-[1.14em]" /> -->
						<svg
							width="24"
							height="25"
							viewBox="0 0 24 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M17.056 5.5H18.944C19.527 5.5 20 5.973 20 6.556V13.944C20 14.527 19.527 15 18.944 15H17.056C16.473 15 16 14.527 16 13.944V6.556C16 5.973 16.473 5.5 17.056 5.5V5.5Z"
								stroke="#6E6E6E"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								fill={message.score === -1 ? "#222" : ""}
							/>
							<path
								d="M16 13.928L12.351 18.679C11.672 19.564 10.346 19.586 9.637 18.725V18.725C9.372 18.404 9.228 18 9.228 17.584V14.313H6.132C5.531 14.313 4.97 14.013 4.636 13.514L4.307 13.023C4.012 12.582 3.926 12.033 4.073 11.524L5.432 6.802C5.654 6.031 6.359 5.5 7.161 5.5L13.45 5.5C13.95 5.5 14.428 5.708 14.768 6.074L16 7.4"
								stroke="#6E6E6E"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								fill={message.score === -1 ? "#222" : ""}
							/>
						</svg>
					</button>
				</Tooltip>
				<Tooltip label="Copied" position="bottom">
					<CopyToClipBoardBtn
						on:click={() => {
							isCopied = true;
						}}
						classNames="ml-1.5 !rounded-sm !p-1 !text-sm !text-gray-400 focus:!ring-0 hover:!text-gray-500 dark:!text-gray-400 dark:hover:!text-gray-300 !border-none !shadow-none"
						value={message.content}
					/>
				</Tooltip>
			</div>
		{/if}
	</div>
{/if}
{#if message.from === "user"}
	<div class="userChatGroup group relative flex items-start justify-start max-sm:text-sm">
		<!-- <div class="profilePic">T</div> -->
		<div class="profilePic">{userName?.charAt(0)}</div>
		<!-- <div class="max-w-full whitespace-break-spaces break-words rounded-2xl px-5 py-3.5 text-gray-500 dark:text-gray-400"> -->
		<div class="responseTextStyle text-black-500 dark:text-black-400 max-w-full  break-words">
			{#if !editFlag}
				{message.content.trim()}
			{/if}
			{#if editFlag}
				<!-- <TextInput
					placeholder=""
					variant="unstyled"
					radius="xs"
					size="xs"
					bind:value={editMessage}
				/> -->
				<!-- <input
					type="text"
					bind:value={editMessage}
					style="height: auto; border-width: 0px; color: black; background-color: transparent; min-height: 28px; outline: 0px;"
				/><br /> -->
				<div
					contenteditable="true"
					on:input={updateDivContent}
					on:paste={handlePaste}
					style="width: 100%"
				>
					{editMessage}
				</div>
				<div style="display: flex; width:100%; justify-content:flex-end; padding: 8px; gap: 16px">
					<Button
						color="gray"
						size="xs"
						on:click={() => {
							editFlag = false;
						}}
					>
						Cancel
					</Button>
					<Button
						color="dark"
						size="xs"
						on:click={() => {
							dispatch("retry", { content: editMessage, id: message.id });
							editFlag = false;
						}}
					>
						Save & Submit
					</Button>
				</div>
			{/if}
		</div>
		{#if !loading}
			<!-- <div class="absolute right-0 top-3.5 flex gap-2 lg:-right-2"> -->
			<div
				class="absolute right-0 lg:-right-2"
				style="flex: 1;display: flex; gap: 8px; padding: 16px"
			>
				<!-- {#if downloadLink}
					<a
						class="rounded-lg border border-gray-100 p-1 text-xs text-gray-400 group-hover:block hover:text-gray-500 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-300 md:hidden"
						title="Download prompt and parameters"
						type="button"
						target="_blank"
						href={downloadLink}
					>
						<CarbonDownload />
					</a>
				{/if} -->
				{#if !readOnly}
					<Tooltip withArrow transitionDuration={200} label="Edit prompt" position="bottom">
						<button
							class="cursor-pointer rounded-lg border border-gray-100 p-1 text-xs text-gray-400 group-hover:block hover:text-gray-500 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-300 md:hidden lg:-right-2"
							type="button"
							on:click={() => (editFlag = true)}
						>
							<!-- title="Edit" -->
							<!-- on:click={() => dispatch("retry", { content: message.content, id: message.id })} -->
							<!-- <CarbonEdit /> -->
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
									d="M5.293 15.619L15.619 5.293C16.009 4.903 16.642 4.903 17.032 5.293L18.708 6.969C19.098 7.359 19.098 7.992 18.708 8.382L8.381 18.707C8.194 18.895 7.94 19 7.675 19H5V16.325C5 16.06 5.105 15.806 5.293 15.619Z"
									stroke="black"
									stroke-opacity="0.87"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M13.75 7.16L16.84 10.25"
									stroke="black"
									stroke-opacity="0.87"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
					</Tooltip>
				{/if}
				{#if !readOnly}
					<Tooltip withArrow transitionDuration={200} label="Regenerate prompt" position="bottom">
						<button
							class="cursor-pointer rounded-lg border border-gray-100 p-1 text-xs text-gray-400 group-hover:block hover:text-gray-500 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-300 md:hidden lg:-right-2"
							type="button"
							on:click={() => dispatch("retry", { content: message.content, id: message.id })}
						>
							<!-- title="Retry" -->
							<!-- <CarbonRotate360 /> -->
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11.46 4.271C10.494 4.315 9.52101 4.524 8.58001 4.932C5.06301 6.458 3.16601 10.152 3.75601 13.771"
									stroke="black"
									stroke-opacity="0.87"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M19.125 16.216C19.569 15.357 19.875 14.41 19.992 13.392C20.43 9.583 18.178 6.094 14.749 4.795"
									stroke="black"
									stroke-opacity="0.87"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M8.88501 2.844L11.726 3.811L10.344 6.207"
									stroke="black"
									stroke-opacity="0.87"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M21.6501 14.702L19.3921 16.679L18.0081 14.284"
									stroke="black"
									stroke-opacity="0.87"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M4.99804 19.827L4.41504 16.883L7.18104 16.882"
									stroke="black"
									stroke-opacity="0.87"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M4.94702 16.884C5.46902 17.699 6.13602 18.437 6.95902 19.047C10.039 21.33 14.187 21.126 17.026 18.805"
									stroke="black"
									stroke-opacity="0.87"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
					</Tooltip>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style>
	.sourceText {
		color: var(--primary-btn-color);
	}
	.userChatGroup {
		background-color: var(--user-chat-bg-color);
		border-radius: 8px;
		border: var(--user-chat-border-color) solid 1px;
	}

	.responseChatGroup {
		border-radius: 8px;
		border: var(--user-chat-border-color) solid 1px;
		background-color: var(--assistant-chat-bg-color);
		margin-bottom: 0px;
	}

	.profilePic {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 32px;
		height: 32px;
		background-color: var(--primary-background-color);
		border-radius: 16px;
		margin: 16px;
		min-width: 32px;
		max-width: 32px;
		color: var(--primary-text-color);
		font-weight: 600;
		font-size: 12px;
	}

	.responseTextStyle {
		padding: 20px 16px 16px 0px;
		margin-right: 100px;
		flex: 50%;
	}

	.responseTextWrap {
		padding: 16px 16px 40px 16px;
	}

	div[contenteditable="true"]:focus {
		outline: none; /* Remove the border on focus */
	}

	.responseText {
		color: var(--primary-text-color);
	}

	.liked {
		visible: opacity-100;
	}

	.visible {
		visible: opacity-100;
	}
</style>
