<script lang="ts">
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { createEventDispatcher } from "svelte";

	import CarbonCheckmark from "~icons/carbon/checkmark";
	import CarbonTrashCan from "~icons/carbon/trash-can";
	import CarbonClose from "~icons/carbon/close";
	import CarbonEdit from "~icons/carbon/edit";
	import { theme } from "$lib/stores/theme";
	import { goto } from "$app/navigation";

	export let conv: { id: string; title: string };

	let confirmDelete = false;
	let inputField;

	const dispatch = createEventDispatcher();

	let color = "#FFF";
	let bgColor = "#000";
	let isMouseOver = false;
	let isEditing = false;
	let sessionName = conv.title;
	let newSessionName = "";

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

	function focusInput() {
		if (inputField) {
			inputField.focus();
			const value = inputField.value;
			inputField.value = "";
			inputField.value = value;
		}
	}

	function gotoConversation() {
		goto(`${base}/conversation/${conv.id}`);
		dispatch("conversationSelected");
	}

	function editSessionName() {
		isEditing = true;
		newSessionName = sessionName;
		focusInput();
	}

	$: {
		focusInput();
	}
</script>

<button
	class="recent-search-btn {conv.id === $page.params.id ? 'active' : ''}"
	on:click={gotoConversation}
	on:mouseleave={() => {
		confirmDelete = false;
		isEditing = false;
	}}
>
	<!-- {#if conv.id === $page.params.id}
		<img src="/assets/icons/search-icon-white.svg" alt="" />
	{:else} -->
	<img src="/assets/icons/search-icon-black.svg" alt="" />
	<!-- {/if} -->
	<!--{#if confirmDelete}
		<span style="color:gray" class=""> Delete </span>
	{/if}-->
	{#if isEditing}
		<input
			style="width:130px"
			type="text"
			bind:value={conv.title}
			bind:this={inputField}
			on:input={() => focusInput()}
			on:click|preventDefault={(e) => e.stopPropagation()}
		/>
		<button
			type="button"
			class="icon-button active"
			title="save"
			on:click|preventDefault={() => {
				isEditing = false;
				sessionName = inputField.value;
				dispatch("editConversationTitle", { id: conv.id, title: inputField.value });
			}}
		>
			<CarbonCheckmark class="text-xs text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
		</button>
		<button
			type="button"
			class="icon-button active"
			title="Cancel"
			on:click|preventDefault={() => {
				isEditing = false;
			}}
		>
			<CarbonClose class="text-xs text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
		</button>
	{:else}
		<p>{conv.title}</p>
	{/if}
	{#if confirmDelete}
		<button
			type="button"
			class="icon-button"
			title="Confirm delete action"
			on:click|preventDefault={() => {
				confirmDelete = false;
				dispatch("deleteConversation", conv.id);
			}}
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
	{:else if !isEditing}
		<button
			type="button"
			class="icon-button {conv.id === $page.params.id ? 'active' : ''}"
			title="Edit conversation title"
			on:click={() => {
				focusInput();
			}}
			on:click|preventDefault={editSessionName}
		>
			<!-- <CarbonEdit class="text-xs text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" /> -->
			<img src="/assets/icons/edit-icon-black.svg" alt="" />
		</button>

		<button
			type="button"
			class="icon-button {conv.id === $page.params.id ? 'active' : ''}"
			title="Delete conversation"
			on:click|preventDefault={(event) => {
				//if (event.shiftKey) {
				dispatch("deleteConversation", conv.id);
				//} else {
				//	confirmDelete = true;
				//}
			}}
		>
			<!-- <CarbonTrashCan class="text-xs text-gray-400  hover:text-gray-500 dark:hover:text-gray-300" /> -->
			<img src="/assets/icons/delete-icon-black.svg" alt="" />
		</button>
	{/if}
</button>

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
		background-color: #ededed;
		border-radius: 4px;
	}

	.recent-search-btn.active p {
		color: #323232;
	}

	.recent-search-btn p {
		overflow: hidden;
		color: #323232;
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

	.icon-button.active {
		display: block;
	}
</style>
