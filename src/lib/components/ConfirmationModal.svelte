<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Switch, Button } from "@svelteuidev/core";

	import Modal from "$lib/components/Modal.svelte";
	import { currentTheme } from "$lib/stores/themeStore";

	// export let settings: LayoutData["settings"];
	// export let models: Array<Model>;
	export let confirmationText: string;
	const dispatch = createEventDispatcher<{ close: void; confirm: void }>();
</script>

<Modal on:close>
	<div class="flex w-full flex-col gap-5 p-6" style="width: 300px;">
		<div class="confirmationTextWrap">
			<span class="confirmationText">{confirmationText}</span>
		</div>
		<div class="flex items-start justify-between text-xl font-semibold text-gray-800">
			<Button
				color={$currentTheme == "light" ? "grey" : "grey"}
				class="group"
				on:click={() => dispatch("close")}><span class="buttonText">Cancel</span></Button
			>
			<Button
				color={$currentTheme == "light" ? "dark" : "blue"}
				class="group"
				on:click={() => dispatch("confirm")}
			>
				<span class="buttonText" style="color: #fff">Confirm</span>
			</Button>
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
		color: #222;
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
