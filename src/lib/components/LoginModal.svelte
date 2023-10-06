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
	import Cookies from "js-cookie";
	import { TextInput, Button, PasswordInput, NativeSelect } from "@svelteuidev/core";
	import { EnvelopeClosed, ChevronDown } from "radix-icons-svelte";

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

	let firstDigit = "";
	let secondDigit = "";
	let thirdDigit = "";
	let fourthDigit = "";
	let fifthDigit = "";
	let sixthDigit = "";

	let currentDigit = 0;
	let timer = 60;
	let isTimerRunning = false;
	let inputs: any;
	let showOtpInputs = false;
	let hideSendOtpBtn = false;
	let showVerifyOtpBtn = false;
	let countryCode = "";

	let OTPVerified = false;
	let countryCodes = ["+1", "+91", "+5", "+12"];
	$: isSentOtpBtnDisabled = !emailId || !isEmailValid || !mobileNumber || !isMobileValid;

	let showSignupError = false;
	let signUpError = "";

	function startTimer() {
		if (!isTimerRunning) {
			hideSendOtpBtn = true;
			isTimerRunning = true;
			showVerifyOtpBtn = true;
			const countdown = setInterval(() => {
				timer -= 1;
				if (timer === 0) {
					clearInterval(countdown);
					isTimerRunning = false;
				}
			}, 1000);
		}
	}

	function OTPInput() {
		inputs = document.querySelectorAll("#otp > *[id]");
		console.log("testing", inputs);
		for (let i = 0; i < inputs.length; i++) {
			console.log("index", i, inputs[i].value);
			inputs[i].addEventListener("keydown", function (event: any) {
				if (event.key === "Backspace") {
					console.log("backspace");

					inputs[i].value = "";
					if (i !== 0) inputs[i - 1].focus();
				} else {
					console.log("key", event.keyCode);
					if (i === inputs.length - 1 && inputs[i].value !== "") {
						console.log("a");

						return true;
					} else if (
						(event.keyCode > 47 && event.keyCode < 58) ||
						(event.keyCode > 95 && event.keyCode < 106)
					) {
						console.log("b");
						inputs[i].value = event.key;
						if (i !== inputs.length - 1) inputs[i + 1].focus();
						event.preventDefault();
					} else if (event.keyCode > 64 && event.keyCode < 91) {
						console.log("c");
						inputs[i].value = String.fromCharCode(event.keyCode);
						if (i !== inputs.length - 1) inputs[i + 1].focus();
						event.preventDefault();
					}
				}
			});
		}
	}

	$: isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailId);

	// Computed property to check mobile number validity
	$: isMobileValid = /^[0-9]{10}$/i.test(mobileNumber);
	$: passwordsMatch = password === cnfPassword;
	$: isLoginBtnDisabled = !emailId || !isEmailValid || !password;
	$: isSignupBtnDisabled =
		!emailId ||
		!isEmailValid ||
		!isMobileValid ||
		!emailId ||
		!password ||
		!cnfPassword ||
		!firstName ||
		!lastName ||
		!passwordsMatch;
	$: isOTPVerifyEnabled =
		!OTPVerified && emailId && mobileNumber && isMobileValid && isEmailValid && showOtpInputs;

	$: isVerifyOtpBtnDisabled =
		!inputs ||
		!inputs[0].value ||
		!inputs[1].value ||
		!inputs[2].value ||
		!inputs[3].value ||
		!inputs[4].value ||
		!inputs[5].value;
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
					console.log("response", response);
					if (response.status == 200) {
						let data = await response.json();
						Cookies.set("token", data.token);
						window.location.href = "/";
					} else if (response.status === 401) {
						loginError = true;
						password = "";
					}
				})
				.catch((error) => {
					console.log("error.response1", error);
					// if (error.response.status == 401) {
					// 	loginError = true;
					// }
					// responseData = `Error: ${error.message}`;
					// isLoading = false;
				});
		} catch (error: any) {
			// Handle any network or other errors;
			console.log("error.response", error);
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
		timer = 60;
		isTimerRunning = false;
		showOtpInputs = false;
		hideSendOtpBtn = false;
		showVerifyOtpBtn = false;

		OTPVerified = false;
		emailId = "";
		mobileNumber = "";
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
					if (response.status == 200) {
						let data = await response.json();
						Cookies.set("token", data.token);
						let payload = parseJwt(data.token);
						Cookies.set("name", payload.username);
						Cookies.set("email", payload.email);
						window.location.href = "/";
					} else {
						showSignupError = true;
						signUpError = response ? response.message : "Unable to sign up..";
					}
				})
				.catch((error) => {
					console.log("error.response", error.response.status == 401);
					if (error.response.status == 400 || error.response.status == 401) {
						showSignupError = true;
						signUpError = error.message;
					}
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

	async function sendOtp() {
		try {
			let otpData = {
				phoneNumber: countryCode + mobileNumber,
			};
			await fetch("https://backend.immigpt.net/generateOTP", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(otpData),
			})
				.then(async (response) => {
					if (response.status == 200) {
						showOtpInputs = true;
						startTimer();
						setTimeout(() => {
							OTPInput();
						}, 1000);
					} else {
						console.log("error", response);
					}
				})
				.catch((error) => {
					console.log("error.response", error.response.status == 401);
				});
		} catch (error) {
			console.log(error);
		}
	}

	function resendOtp() {
		sendOtp();
		timer = 60;
		startTimer();
	}

	async function verifyOtp() {
		try {
			let otpData = {
				phoneNumber: countryCode + mobileNumber,
				otp:
					inputs[0].value +
					inputs[1].value +
					inputs[2].value +
					inputs[3].value +
					inputs[4].value +
					inputs[5].value,
			};
			await fetch("https://backend.immigpt.net/verifyOTP", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(otpData),
			})
				.then(async (response) => {
					if (response.status == 200) {
						OTPVerified = true;
					} else {
						console.log("error", response);
					}
				})
				.catch((error) => {
					console.log("error.response", error.response.status == 401);
				});
		} catch (error) {
			console.log(error);
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
			<div class="columns margins text-left">
				<div>
					<!-- <TextField
						variant="outlined"
						bind:value={emailId}
						id="username"
						name="Email "
						label="Email"
						required
					/> -->
					<TextInput bind:value={emailId} label="Email" placeholder="Your email" />
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
					<PasswordInput
						bind:value={password}
						type="password"
						label="Password"
						placeholder="Password"
					/>
				</div>
				<div class="login-button">
					<!-- <button
						type="submit"
						class="signup-btn mt-2 rounded-full bg-black px-5 py-2 text-lg font-semibold text-gray-100 transition-colors hover:bg-primary-500 {isLoginBtnDisabled
							? 'disabled'
							: ''}"
						on:click={Login}
						disabled={isLoginBtnDisabled}
					>
						{isLoading ? "Loading..." : "Login"}
					</button> -->
					<Button
						bind:loading={isLoading}
						color="#3b82f6"
						on:click={Login}
						disabled={isLoginBtnDisabled}
						ripple>Login</Button
					>
				</div>
				<div class="signin-text">
					<p class="no-account-text">Don't have an account?</p>
					<button class="signup-text" on:click={toggleSignup}>Sign up</button>
				</div>
			</div>
		{:else}
			<div class="container-2 columns margins text-left">
				<div>
					<TextInput
						bind:value={emailId}
						disabled={showOtpInputs || OTPVerified}
						label="Email"
						placeholder="Email"
					/>
				</div>
				{#if emailId && !isEmailValid}
					<p class="error">Enter a valid Email Id</p>
				{/if}
				<div class="sendOTP">
					<p>Mobile Number</p>
					<div class="mobile-number-section">
						<NativeSelect
							bind:value={countryCode}
							data={countryCodes}
							disabled={showOtpInputs || OTPVerified}
						>
							<svelte:component this={ChevronDown} slot="rightSection" />
						</NativeSelect>
						<TextInput
							bind:value={mobileNumber}
							placeholder="Mobile Number"
							disabled={showOtpInputs || OTPVerified}
						/>
					</div>

					{#if mobileNumber && !isMobileValid}
						<p class="error">Enter a valid mobile number</p>
					{/if}
					{#if !hideSendOtpBtn}
						<div class="login-button">
							<Button
								size="xs"
								disabled={isSentOtpBtnDisabled}
								ripple
								color="#3b82f6"
								on:click={sendOtp}>Send OTP</Button
							>
						</div>
					{/if}
				</div>
				{#if showOtpInputs && !OTPVerified}
					<div class="otp-body">
						<p class="enter-otp-small">Enter OTP</p>
						<div id="otp" class="inputs">
							<input bind:value={firstDigit} class="rounded" type="text" id="first" maxlength="1" />
							<input
								bind:value={secondDigit}
								class="rounded"
								type="text"
								id="second"
								maxlength="1"
							/>
							<input bind:value={thirdDigit} class="rounded" type="text" id="third" maxlength="1" />
							<input
								bind:value={fourthDigit}
								class="rounded"
								type="text"
								id="fourth"
								maxlength="1"
							/>
							<input bind:value={fifthDigit} class="rounded" type="text" id="fifth" maxlength="1" />
							<input bind:value={sixthDigit} class="rounded" type="text" id="sixth" maxlength="1" />
						</div>
						{#if isTimerRunning}
							<div class="login-button">
								<Button
									ripple
									size="xs"
									disabled={isVerifyOtpBtnDisabled}
									color="#3b82f6"
									on:click={verifyOtp}>Verify OTP</Button
								>
							</div>
						{/if}
						{#if isTimerRunning}
							<p class="timer-text">
								Resend OTP in <span class="gold-text">{timer} s</span>
							</p>
						{/if}
						{#if !isTimerRunning}
							<div class="login-button">
								<Button size="xs" color="#3b82f6" on:click={resendOtp}>Resend OTP</Button>
							</div>
						{/if}
					</div>
				{/if}
				{#if OTPVerified}
					<div>
						<TextInput bind:value={firstName} label="First Name" placeholder="First Name" />
					</div>
					<div>
						<TextInput bind:value={lastName} label="Last Name" placeholder="Last Name" />
					</div>
					<div>
						<PasswordInput
							bind:value={password}
							type="password"
							label="Password"
							placeholder="Password"
						/>
					</div>
					<div>
						<TextInput
							bind:value={cnfPassword}
							type="password"
							label="Confirm Password"
							placeholder="Confirm Password"
						/>
					</div>
					{#if password && cnfPassword && !passwordsMatch}
						<p class="error">Passwords do not match</p>
					{/if}
					<div class="login-button">
						<!-- <button
							type="submit"
							class="signup-btn mt-2 rounded-full bg-black px-5 py-2 text-lg font-semibold text-gray-100 transition-colors hover:bg-primary-500 {isSignupBtnDisabled
								? 'disabled'
								: ''}"
							on:click={handleSignUp}
							disabled={isSignupBtnDisabled}
						>
							{isLoading ? "Loading..." : "Sign up"}
						</button> -->
						<Button
							bind:loading={isLoading}
							color="#3b82f6"
							on:click={handleSignUp}
							disabled={OTPVerified ? isSignupBtnDisabled : !isOTPVerifyEnabled}
							ripple>{OTPVerified ? "Sign up" : "Verify"}</Button
						>
					</div>
					{#if showSignupError}
						<div class="signup-error">
							<p class="error">{signUpError}</p>
						</div>
					{/if}
					<div class="signin-text">
						<p class="no-account-text">Already have an account?</p>
						<button on:click={toggleLogin} class="signup-text">Login</button>
					</div>
				{/if}
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
	.login-button {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 16px;
	}
	.otp-body {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	#otp {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	#otp .rounded {
		width: 50px;
		height: 50px;
		border: 2px solid #ccc;
		/* border-radius: 50%; */
		font-size: 16px;
		text-align: center;
		outline: none;
		padding: 0;
	}
	.sendOTP {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.mobile-number-section {
		display: flex;
		gap: 8px;
	}

	.container-2 {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
