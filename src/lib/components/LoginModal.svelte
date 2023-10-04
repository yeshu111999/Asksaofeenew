<script lang="ts">
	import { browser } from "$app/environment";
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { PUBLIC_APP_DATA_SHARING, PUBLIC_APP_NAME, PUBLIC_VERSION } from "$env/static/public";
	import LogoHuggingFaceBorderless from "$lib/components/icons/LogoHuggingFaceBorderless.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import type { LayoutData } from "../../routes/$types";
	import Logo from "./icons/Logo.svelte";
	export let settings: LayoutData["settings"];
	import Textfield from '@smui/textfield';

	const isIframe = browser && window.self !== window.parent;
	let valueA = '';
	let valueB = '';
	 import axios from 'axios';
	let responseData = ""; // Store the response data here
	let isLoading = false;
	let loginError = false;
	async function Login() {
		try {
		isLoading = true; // Set loading flag while making the API call

		// Replace the URL with your API endpoint
		const response = await axios.post('https://backend.immigpt.net/login', {
			// Replace this with the data you want to send in the POST request
			// For example, if you have a JSON payload, you can define it here
			email: valueA,
			password: valueB,
		});
		console.log('response.status', response.status)
		if (response.status === 200) {
			// If the response status is 200 OK, parse the response data
			responseData = response.data;
			window.location.href = '/';
		} else {
			// Handle non-200 status codes (e.g., display an error message)
			responseData = `Error: ${response.statusText}`;
		}
		} catch (error) {
		// Handle any network or other errors;
		console.log('error.response', error.response.status == 401)
		if (error.response.status == 401){
			loginError = true;
		}
		responseData = `Error: ${error.message}`;
		} finally {
		isLoading = false; // Reset loading flag whether the request succeeds or fails
		}
	}
</script>

<Modal>
	<div
		class="flex w-full flex-col items-center gap-6 bg-gradient-to-t from-primary-500/40 via-primary-500/10 to-primary-500/0 px-4 pb-10 pt-9 text-center "
	>
		<h2 class="flex items-center text-2xl font-semibold text-gray-800">
			<Logo classNames="mr-1" />
			{PUBLIC_APP_NAME}
			<div
				class="ml-3 flex h-6 items-center rounded-lg border border-gray-100 bg-gray-50 px-2 text-base text-gray-400"
			>
				v{PUBLIC_VERSION}
			</div>
		</h2>
		{#if $page.data.requiresLogin}
			<p
				class="px-4 text-lg font-semibold leading-snug text-gray-800 sm:px-12"
				style="text-wrap: balance;"
			>
				Please Sign in with Hugging Face to continue
			</p>
		{/if}
		<p class="text-base text-gray-800">
			<strong>Welcome</strong></p>
		<div class="columns margins">
			<div>
				<Textfield variant="outlined" bind:value={valueA} id="username" name="Email " label="Username">
				</Textfield>
			</div>
			<div>
				<Textfield variant="outlined" type="password" bind:value={valueB} id="password" name="Password" label="Password">
				</Textfield>
			</div>
			<button
				type="submit"
				class="mt-2 rounded-full bg-black px-5 py-2 text-lg font-semibold text-gray-100 transition-colors hover:bg-primary-500"
				on:click={Login}
  				disabled={isLoading} 
			>
				{isLoading ? "Loading..." : "Login"}
			</button>
		</div>
		{#if loginError}
			<p class="error">Failed while logging in</p> <!-- Display the error message in red -->
		{/if}

		{#if PUBLIC_APP_DATA_SHARING}
			<p class="px-2 text-sm text-gray-500">
				Your conversations will be shared with model authors unless you disable it from your
				settings.
			</p>
		{/if}
		<form
			action="{base}/{$page.data.requiresLogin ? 'login' : 'settings'}"
			target={isIframe ? "_blank" : ""}
			method="POST"
			class="flex w-full flex-col items-center gap-2"
		>
			{#if $page.data.requiresLogin}
				<button
					type="submit"
					class="mt-2 flex items-center whitespace-nowrap rounded-full bg-black px-5 py-2 text-lg font-semibold text-gray-100 transition-colors hover:bg-primary-500"
				>
					Sign in
					{#if PUBLIC_APP_NAME === "HuggingChat"}
						with <LogoHuggingFaceBorderless classNames="text-xl mr-1 ml-1.5" /> Hugging Face
					{/if}
				</button>
			{:else if $page.data.requiresLogin}
				<input type="hidden" name="ethicsModalAccepted" value={true} />
				{#each Object.entries(settings) as [key, val]}
					<input type="hidden" name={key} value={val} />
				{/each}
				<button
					type="submit"
					class="mt-2 rounded-full bg-black px-5 py-2 text-lg font-semibold text-gray-100 transition-colors hover:bg-primary-500"
				>
					Login
				</button>
			{/if}
		</form>
	</div>
</Modal>

<style>
  .error {
    color: red;
  }
</style>
