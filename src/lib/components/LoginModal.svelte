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
	// import Textfield from "@smui/textfield";
	import { MaterialApp, TextField } from "svelte-materialify";
	import Cookies from "js-cookie";

	const isIframe = browser && window.self !== window.parent;
	let valueA = "";
	let valueB = "";
	import axios from "axios";
	import { goto } from "$app/navigation";
	let responseData = ""; // Store the response data here
	let isLoading = false;
	let loginError = false;
	let showSignUp = false;

	let emailId = "";
	let mobileNumber = "";
	let password = "";
	let cnfPassword = "";
	let firstName = "";
	let lastName = "";
	$: isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailId);

	// Computed property to check mobile number validity
	$: isMobileValid = /^[0-9]{10}$/i.test(mobileNumber);
	$: passwordsMatch = password === cnfPassword;
	$: isLoginBtnDisabled = !emailId || !isEmailValid || !password;
	$: isSignupBtnDisabled =
		!emailId ||
		!isEmailValid ||
		!isMobileValid ||
		!mobileNumber ||
		!password ||
		!cnfPassword ||
		!firstName ||
		!lastName ||
		!passwordsMatch;

	async function Login() {
		try {
			isLoading = true; // Set loading flag while making the API call

			// // Replace the URL with your API endpoint
			// const response = await axios.post("https://backend.immigpt.net/login", {
			// 	// Replace this with the data you want to send in the POST request
			// 	// For example, if you have a JSON payload, you can define it here
			// 	email: emailId,
			// 	password: password,
			// });
			// console.log("response.status", response.status);
			// if (response.status === 200) {
			// 	// If the response status is 200 OK, parse the response data
			// 	responseData = response.data;
			// 	Cookies.set("token", responseData.token);
			// 	window.location.href = "/";
			// } else {
			// 	// Handle non-200 status codes (e.g., display an error message)
			// 	responseData = `Error: ${response.statusText}`;
			// }

			let loginData = {
				email: emailId,
				password: password,
			};
			await fetch("https://backend.immigpt.net/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginData),
			})
				.then(async (response) => {
					let data = await response.json();
					Cookies.set("token", data.token);
					window.location.href = "/";
				})
				.catch((error) => {
					console.log("error.response", error.response.status == 401);
					if (error.response.status == 401) {
						loginError = true;
					}
					responseData = `Error: ${error.message}`;
					isLoading = false;
				});
		} catch (error: any) {
			// Handle any network or other errors;
			console.log("error.response", error.response.status == 401);
			if (error.response.status == 401) {
				loginError = true;
			}
			responseData = `Error: ${error.message}`;
		} finally {
			isLoading = false; // Reset loading flag whether the request succeeds or fails
		}
	}

	function toggleSignup() {
		showSignUp = true;
	}

	function toggleLogin() {
		showSignUp = false;
	}

	function parseJwt(token: any) {
		var base64Payload = token.split(".")[1];
		// var payload = Buffer.from(base64Payload, 'base64');
		// return JSON.parse(payload.toString());
		var payload = JSON.parse(atob(base64Payload));
		return payload;
	}

	async function handleSignUp() {
		try {
			isLoading = true; // Set loading flag while making the API call

			let signUpData = {
				email: emailId,
				password: password,
				firstName: firstName,
				lastName: lastName,
				username: firstName + " " + lastName,
				phoneNumber: mobileNumber,
			};
			await fetch("https://backend.immigpt.net/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(signUpData),
			})
				.then(async (response) => {
					let data = await response.json();
					Cookies.set("token", data.token);
					let payload = parseJwt(data.token);
					Cookies.set("name", payload.username);
					Cookies.set("email", payload.email);
					window.location.href = "/";
				})
				.catch((error) => {
					console.log("error.response", error.response.status == 401);
					if (error.response.status == 401) {
						loginError = true;
					}
					responseData = `Error: ${error.message}`;
					isLoading = false;
				});
		} catch (error: any) {
			// Handle any network or other errors;
			console.log("error.response", error.response.status == 401);
			if (error.response.status == 401) {
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
		class="login-popup flex w-full flex-col items-center gap-6 bg-gradient-to-t from-primary-500/40 via-primary-500/10 to-primary-500/0 px-4 pb-10 pt-9 text-center "
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
			<strong>Welcome</strong>
		</p>
		{#if !showSignUp}
			<div class="columns margins">
				<div>
					<!-- <TextField
						variant="outlined"
						bind:value={emailId}
						id="username"
						name="Email "
						label="Email"
						required
					/> -->
					<TextField bind:value={emailId} outlined>Email</TextField>
				</div>
				{#if emailId && !isEmailValid}
					<p class="error">Enter a valid Email Id</p>
				{/if}
				<div>
					<!-- <TextField
						variant="outlined"
						type="password"
						bind:value={password}
						id="password"
						name="Password"
						label="Password"
						required
					/> -->
					<TextField bind:value={password} type="password" outlined>Password</TextField>
				</div>
				<button
					type="submit"
					class="signup-btn mt-2 rounded-full bg-black px-5 py-2 text-lg font-semibold text-gray-100 transition-colors hover:bg-primary-500 {isLoginBtnDisabled
						? 'disabled'
						: ''}"
					on:click={Login}
					disabled={isLoginBtnDisabled}
				>
					{isLoading ? "Loading..." : "Login"}
				</button>
				<div class="signin-text">
					<p class="no-account-text">Don't have an account?</p>
					<button class="signup-text" on:click={toggleSignup}>Sign up</button>
				</div>
			</div>
		{:else}
			<div class="columns margins">
				<div>
					<!-- <Textfield
						variant="outlined"
						bind:value={emailId}
						id="username"
						name="Email "
						label="Email"
						required
					/> -->
					<TextField bind:value={emailId} outlined>Email</TextField>
				</div>
				{#if emailId && !isEmailValid}
					<p class="error">Enter a valid Email Id</p>
				{/if}
				<div>
					<!-- <Textfield
						variant="outlined"
						bind:value={mobileNumber}
						id="mobilenumber"
						name="mobilenumber"
						label="Mobile Number"
						required
					/> -->
					<TextField bind:value={mobileNumber} outlined>Mobile Number</TextField>
				</div>
				{#if mobileNumber && !isMobileValid}
					<p class="error">Enter a valid mobile number</p>
				{/if}
				<div>
					<!-- <Textfield
						variant="outlined"
						bind:value={firstName}
						id="first-name"
						name="firstName"
						label="First Name"
						required
					/> -->
					<TextField bind:value={firstName} outlined>First Name</TextField>
				</div>
				<div>
					<!-- <Textfield
						variant="outlined"
						bind:value={lastName}
						id="last-name"
						name="lastName"
						label="Last Name"
						required
					/> -->
					<TextField bind:value={lastName} outlined>Last Name</TextField>
				</div>
				<div>
					<!-- <Textfield
						variant="outlined"
						type="password"
						bind:value={password}
						id="password"
						name="Password"
						label="Password"
						required
					/> -->
					<TextField bind:value={password} type="password" outlined>Password</TextField>
				</div>
				<div>
					<!-- <Textfield
						variant="outlined"
						type="password"
						bind:value={cnfPassword}
						id="cnf-password"
						name="Password"
						label="Confirm Password"
						required
					/> -->
					<TextField bind:value={cnfPassword} type="password" outlined>Confirm Password</TextField>
				</div>
				{#if password && cnfPassword && !passwordsMatch}
					<p class="error">Passwords do not match</p>
				{/if}
				<button
					type="submit"
					class="signup-btn mt-2 rounded-full bg-black px-5 py-2 text-lg font-semibold text-gray-100 transition-colors hover:bg-primary-500 {isSignupBtnDisabled
						? 'disabled'
						: ''}"
					on:click={handleSignUp}
					disabled={isSignupBtnDisabled}
				>
					{isLoading ? "Loading..." : "Sign up"}
				</button>
				<div class="signin-text">
					<p class="no-account-text">Already have an account?</p>
					<button on:click={toggleLogin} class="signup-text">Login</button>
				</div>
			</div>
		{/if}
		{#if loginError}
			<p class="error">Failed while logging in</p>
			<!-- Display the error message in red -->
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
	/* .login-container {
		min-width: 400px;
	} */
	.error {
		color: red;
	}

	.signin-text {
		display: flex;
		gap: 12px;
	}

	.signup-text {
		text-decoration: underline;
		color: blue;
	}

	.signup-btn.disabled {
		background-color: grey;
		cursor: not-allowed;
	}

	.login-popup {
		min-width: 400px;
	}
</style>
