<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Switch } from "@svelteuidev/core";

	import Modal from "$lib/components/Modal.svelte";

	// export let settings: LayoutData["settings"];
	// export let models: Array<Model>;
	export let confirmationText: String;
	const dispatch = createEventDispatcher<{ close: void; confirm: void }>();
</script>

<Modal on:close>
	<div class="flex w-full flex-col gap-5 p-6" style="width: 300px;">
		<div class="confirmationTextWrap">
			<span class="confirmationText">{confirmationText}</span>
		</div>
		<div class="flex items-start justify-between text-xl font-semibold text-gray-800">
			<button type="button" class="group" on:click={() => dispatch("close")}
				><span class="buttonText">Cancel</span></button
			>
			<button type="button" class="group" on:click={() => dispatch("confirm")}
				><span class="buttonText" style="color: rgb(90, 125, 252);">Confirm</span></button
			>
			<!-- <h2>Confirm</h2>
			<button type="button" class="group" on:click={() => dispatch("close")}>
				<CarbonClose class="text-gray-900 group-hover:text-gray-500" />
			</button> -->
		</div>
	</div>
</Modal>

<style>
	.themeButtonWrap {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.confirmationText {
		font-size: 18px;
		font-weight: 600;
	}

	.confirmationTextWrap {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.buttonText {
		font-size: 16px;
		font-weight: 400;
	}
</style>
