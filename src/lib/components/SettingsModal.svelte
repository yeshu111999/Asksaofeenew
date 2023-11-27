<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Switch } from "@svelteuidev/core";

	import Modal from "$lib/components/Modal.svelte";
	import CarbonClose from "~icons/carbon/close";
	// import Switch from "$lib/components/Switch.svelte";
	import { enhance } from "$app/forms";
	import { base } from "$app/paths";
	import { PUBLIC_APP_DATA_SHARING } from "$env/static/public";
	import type { Model } from "$lib/types/Model";
	import type { LayoutData } from "../../routes/$types";
	import { switchTheme } from "$lib/switchTheme";
	import ConfirmationModal from "./ConfirmationModal.svelte";
	import Cookies from "js-cookie";
	import type { AnyBulkWriteOperation } from "mongodb";
	import axios from "axios";

	export let settings: LayoutData["settings"];
	export let models: Array<Model>;

	let logoutConfirmationModal = false;

	let shareConversationsWithModelAuthors = settings.shareConversationsWithModelAuthors;
	let isConfirmingDeletion = false;

	let confirmationFunction: any;
	let confirmationText = "";

	const deleteAccount = () => {
		let headers = {
			Authorization: "Bearer " + this.token,
		};
		let gauth = Cookies.get("gauth");
		if (gauth) {
			headers["Google-Auth"] = "True";
		}
		axios
			.post("https://backend.immigpt.net/deleteAccount", {}, { headers: headers })
			.then((response: any) => {
				console.log("response", response);
			})
			.catch((error: any) => {
				console.log("error", error);
			});
	};

	// let themeVariable = localStorage.getItem("theme") == "dark" ? true : false;
	let themeVariable = false;
	const dispatch = createEventDispatcher<{ close: void }>();
</script>

<Modal on:close>
	<div class="flex w-full flex-col gap-5 p-6" style="width: 300px">
		<div class="flex items-start justify-between text-xl font-semibold text-gray-800">
			<h2>Settings</h2>
			<button type="button" class="group" on:click={() => dispatch("close")}>
				<CarbonClose class="text-gray-900 group-hover:text-gray-500" />
			</button>
		</div>
		{#if logoutConfirmationModal}
			<!-- on:confirm={logOut} -->
			<ConfirmationModal
				on:close={() => (logoutConfirmationModal = false)}
				on:confirm={confirmationFunction}
				{confirmationText}
			/>
		{/if}
		<!-- <div class="column flex items-start justify-between text-xl font-semibold text-gray-800"> -->
		<div style="display: flex; flex-direction: column; align-items: baseline; gap: 8px">
			<div class="themeButtonWrap">
				<span class="themeText">Theme</span>
				<Switch
					checked={themeVariable}
					onLabel="Dark"
					offLabel="Light"
					size="md"
					on:click={switchTheme}
				/>
			</div>
			<button
				type="button"
				class="groupd"
				on:click={() => {
					logoutConfirmationModal = true;
					confirmationText = "Click confirm to Delete all conversations";
					confirmationFunction = deleteAccount;
				}}><span class="buttonText">Delete all conversations</span></button
			>
			<button
				type="button"
				class="groupd"
				on:click={() => {
					logoutConfirmationModal = true;
					confirmationText = "Click confirm to Delete account";
					confirmationFunction = deleteAccount;
				}}><span class="buttonText">Delete account</span></button
			>
			<!-- <h2>Confirm</h2>
			<button type="button" class="group" on:click={() => dispatch("close")}>
				<CarbonClose class="text-gray-900 group-hover:text-gray-500" />
			</button> -->
		</div>
		<form
			class="flex flex-col gap-5"
			use:enhance={() => {
				dispatch("close");
			}}
			method="post"
			action="{base}/settings"
		>
			{#if PUBLIC_APP_DATA_SHARING}
				<label class="flex cursor-pointer select-none items-center gap-2 text-gray-500">
					{#each Object.entries(settings).filter(([k]) => !(k === "shareConversationsWithModelAuthors" || k === "customPrompts")) as [key, val]}
						<input type="hidden" name={key} value={val} />
					{/each}
					<input
						type="hidden"
						name="customPrompts"
						value={JSON.stringify(settings.customPrompts)}
					/>
					<Switch
						name="shareConversationsWithModelAuthors"
						bind:checked={shareConversationsWithModelAuthors}
					/>
					Share conversations with model authors
				</label>

				<p class="text-gray-800">
					Sharing your data will help improve the training data and make open models better over
					time.
				</p>
				<p class="text-gray-800">
					You can change this setting at any time, it applies to all your conversations.
				</p>
				<div>
					<p class="text-gray-800 ">Read more about model authors:</p>
					<ul class="list-inside list-disc">
						{#each models as model}
							<li class="list-item">
								<a
									href={model["websiteUrl"]}
									target="_blank"
									rel="noreferrer"
									class="underline decoration-gray-300 hover:decoration-gray-700">{model["name"]}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- <form
				method="post"
				action="{base}/conversations?/delete"
				on:submit|preventDefault={() => (isConfirmingDeletion = true)}
			> -->
			<!-- <div style="display: flex; flex-direction: column; align-items:flex-start">
					<button type="submit" class="underline decoration-gray-300 hover:decoration-gray-700">
						Delete account
					</button>
					<button
						type="submit"
						on:click={() => (logoutConfirmationModal = true)}
						class="underline decoration-gray-300 hover:decoration-gray-700"
					>
						Delete all conversations
					</button>
				</div>
			</form>
			 <button
				type="submit"
				class="mt-2 rounded-full bg-black px-5 py-2 text-lg font-semibold text-gray-100 ring-gray-400 ring-offset-1 transition-all focus-visible:outline-none focus-visible:ring hover:ring"
			>
				Apply
			</button> -->
		</form>

		{#if isConfirmingDeletion}
			<Modal on:close={() => (isConfirmingDeletion = false)}>
				<form
					use:enhance={() => {
						dispatch("close");
					}}
					method="post"
					action="{base}/conversations?/delete"
					class="flex w-full flex-col gap-5 p-6"
				>
					<div class="flex items-start justify-between text-xl font-semibold text-gray-800">
						<h2>Are you sure?</h2>
						<button type="button" class="group" on:click={() => (isConfirmingDeletion = false)}>
							<CarbonClose class="text-gray-900 group-hover:text-gray-500" />
						</button>
					</div>
					<p class="text-gray-800">
						This action will delete all your conversations. This cannot be undone.
					</p>
					<button
						type="submit"
						class="mt-2 rounded-full bg-red-700 px-5 py-2 text-lg font-semibold text-gray-100 ring-gray-400 ring-offset-1 transition-all focus-visible:outline-none focus-visible:ring hover:ring"
					>
						Confirm deletion
					</button>
				</form>
			</Modal>
		{/if}
	</div>
</Modal>

<style>
	.themeButtonWrap {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}
	.groupd {
		padding: 8px;
		background-color: rgb(243, 64, 64);
		border-radius: 8px;
	}
	.buttonText {
		font-size: 14px;
		font-weight: 600;
		color: #fff;
	}
</style>
