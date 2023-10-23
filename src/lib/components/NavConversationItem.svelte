<script lang="ts">
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { createEventDispatcher } from "svelte";

	import CarbonCheckmark from "~icons/carbon/checkmark";
	import CarbonTrashCan from "~icons/carbon/trash-can";
	import CarbonClose from "~icons/carbon/close";
	import CarbonEdit from "~icons/carbon/edit";
	import { theme } from "$lib/stores/theme";

	export let conv: { id: string; title: string };

	let confirmDelete = false;

	const dispatch = createEventDispatcher<{
		deleteConversation: string;
		editConversationTitle: { id: string; title: string };
	}>();

	let color = "#FFF";
	let bgColor = "#000";
	let isMouseOver = false;

	function changeTextColor(shouldChangeColor) {
		// if ($theme == "dark") return;
		if (shouldChangeColor) {
			bgColor = "#000";
			color = "#FFF"; // Change the text color to #000 on mouseover
		} else {
			color = "#000";
			bgColor = "#FFF";
		}
	}
</script>

<a
	class="recent-search-btn {conv.id === $page.params.id ? 'active' : ''}"
	href="{base}/conversation/{conv.id}"
	on:mouseleave={() => {
		confirmDelete = false;
	}}
>
	{#if conv.id === $page.params.id}
		<img src="/assets/icons/search-icon-white.svg" alt="" />
	{:else}
		<img src="/assets/icons/search-icon-black.svg" alt="" />
	{/if}
	{#if confirmDelete}
		<span style="color:gray" class=""> Delete </span>
	{/if}
	<p>{conv.title}</p>
	{#if confirmDelete}
		<button
			type="button"
			class="icon-button"
			title="Confirm delete action"
			on:click|preventDefault={() => dispatch("deleteConversation", conv.id)}
		>
			<CarbonCheckmark class="text-xs text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
		</button>
		<button
			type="button"
			class="icon-button"
			title="Cancel delete action"
			on:click|preventDefault={() => {
				confirmDelete = false;
			}}
		>
			<CarbonClose class="text-xs text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
		</button>
	{:else}
		<button
			type="button"
			class="icon-button"
			title="Edit conversation title"
			on:click|preventDefault={() => {
				const newTitle = prompt("Edit this conversation title:", conv.title);
				if (!newTitle) return;
				dispatch("editConversationTitle", { id: conv.id, title: newTitle });
			}}
		>
			<CarbonEdit class="text-xs text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
		</button>

		<button
			type="button"
			class="icon-button"
			title="Delete conversation"
			on:click|preventDefault={(event) => {
				if (event.shiftKey) {
					dispatch("deleteConversation", conv.id);
				} else {
					confirmDelete = true;
				}
			}}
		>
			<CarbonTrashCan class="text-xs text-gray-400  hover:text-gray-500 dark:hover:text-gray-300" />
		</button>
	{/if}
</a>

<!-- <a
	data-sveltekit-noscroll
	on:mouseleave={() => {
		confirmDelete = false;
	}}
	href="{base}/conversation/{conv.id}"
	class="recent-search-btn {conv.id === $page.params.id ? 'active' : ''}"
>
	<div class="flex-1 truncate">
		{#if confirmDelete}
			<span class="font-semibold"> Delete </span>
		{/if}
		<div
			on:mouseover={() => changeTextColor(true)}
			on:mouseout={() => changeTextColor(false)}
			style="color:{color}"
		>
			{conv.title}
		</div>
	</div>

	{#if confirmDelete}
		<button
			type="button"
			class="flex h-5 w-5 items-center justify-center rounded md:hidden md:group-hover:flex"
			title="Confirm delete action"
			on:click|preventDefault={() => dispatch("deleteConversation", conv.id)}
		>
			<CarbonCheckmark class="text-xs text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
		</button>
		<button
			type="button"
			class="flex h-5 w-5 items-center justify-center rounded md:hidden md:group-hover:flex"
			title="Cancel delete action"
			on:click|preventDefault={() => {
				confirmDelete = false;
			}}
		>
			<CarbonClose class="text-xs text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
		</button>
	{:else}
		<button
			type="button"
			class="flex h-5 w-5 items-center justify-center rounded md:hidden md:group-hover:flex"
			title="Edit conversation title"
			on:click|preventDefault={() => {
				const newTitle = prompt("Edit this conversation title:", conv.title);
				if (!newTitle) return;
				dispatch("editConversationTitle", { id: conv.id, title: newTitle });
			}}
		>
			<CarbonEdit class="text-xs text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
		</button>

		<button
			type="button"
			class="flex h-5 w-5 items-center justify-center rounded md:hidden md:group-hover:flex"
			title="Delete conversation"
			on:click|preventDefault={(event) => {
				if (event.shiftKey) {
					dispatch("deleteConversation", conv.id);
				} else {
					confirmDelete = true;
				}
			}}
		>
			<CarbonTrashCan class="text-xs text-gray-400  hover:text-gray-500 dark:hover:text-gray-300" />
		</button>
	{/if}
</a> -->
<style>
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

	.icon-button {
		display: none;
	}

	.recent-search-btn:hover .icon-button {
		display: block;
	}
</style>
