<script lang="ts">
	import { onDestroy } from "svelte";

	import IconCopy from "./icons/IconCopy.svelte";
	import Tooltip from "./Tooltip.svelte";
	import { currentTheme } from "$lib/stores/themeStore";

	export let classNames = "";
	export let value: string;

	let isSuccess = false;
	let timeout: ReturnType<typeof setTimeout>;

	const handleClick = async () => {
		// writeText() can be unavailable or fail in some cases (iframe, etc) so we try/catch
		try {
			await navigator.clipboard.writeText(value);

			isSuccess = true;
			if (timeout) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(() => {
				isSuccess = false;
			}, 1000);
		} catch (err) {
			console.error(err);
		}
	};

	onDestroy(() => {
		if (timeout) {
			clearTimeout(timeout);
		}
	});
</script>

<button
	class="btn rounded-lg border border-gray-200 px-2 py-2 text-sm shadow-sm transition-all hover:border-gray-300 active:shadow-inner dark:border-gray-600 dark:hover:border-gray-400 {classNames}
		{!isSuccess && 'text-gray-200 dark:text-gray-200'}
		{isSuccess && 'text-green-500'}
	"
	title={"Copy to clipboard"}
	type="button"
	on:click
	on:click={handleClick}
>
	<span class="relative">
		<!-- <IconCopy /> -->
		<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M21 5.5C21.0001 4.96952 20.7895 4.46073 20.4144 4.08563C20.0393 3.71052 19.5305 3.49985 19 3.5"
				stroke="#6E6E6E"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M21 12.5V13.5"
				stroke="#6E6E6E"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M21 8.5V9.5"
				stroke="#6E6E6E"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M21 16.5C21.0001 17.0305 20.7895 17.5393 20.4144 17.9144C20.0393 18.2895 19.5305 18.5001 19 18.5"
				stroke="#6E6E6E"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M8 3.5C7.46952 3.49985 6.96073 3.71052 6.58563 4.08563C6.21052 4.46073 5.99985 4.96952 6 5.5"
				stroke="#6E6E6E"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M15 3.5H16"
				stroke="#6E6E6E"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M11 3.5H12"
				stroke="#6E6E6E"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M14 21.5H5C4.46952 21.5001 3.96073 21.2895 3.58563 20.9144C3.21052 20.5393 2.99985 20.0305 3 19.5V10.5C2.99985 9.96952 3.21052 9.46073 3.58563 9.08563C3.96073 8.71052 4.46952 8.49985 5 8.5H14C14.5305 8.49985 15.0393 8.71052 15.4144 9.08563C15.7895 9.46073 16.0001 9.96952 16 10.5V19.5C16.0001 20.0305 15.7895 20.5393 15.4144 20.9144C15.0393 21.2895 14.5305 21.5001 14 21.5Z"
				stroke="#6E6E6E"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M6 12H13"
				stroke="#6E6E6E"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M6 18H9"
				stroke="#6E6E6E"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M6 15H13"
				stroke="#6E6E6E"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<!-- <span style="color: #323232; font-size: 14px; font-weight: 500;">Copy Results</span> -->
	</span>
	<span class="copy-results">Copy Results</span>
	<Tooltip classNames={isSuccess ? "opacity-100" : "opacity-0"} />
</button>

<style>
	.copy-results {
		/* color: #323232; */
		color: var(--chat-action-color);
		font-weight: 500;
		padding: 0px 6px;
	}
</style>
