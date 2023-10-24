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
	//import { AES } from "crypto-js";

	const isIframe = browser && window.self !== window.parent;
	let valueA = "";
	let valueB = "";
	import axios from "axios";
	import { goto } from "$app/navigation";
	import { afterUpdate, onMount } from "svelte";
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

	let checkMail = false;
	let sentLink = false;
	let resetLoader = false;

	let googleLoginBtn;
	let clientId = "885560999939-uv51l6cgtbt9t7063r7bahmf74hem9e3.apps.googleusercontent.com";

	let OTPVerified = false;
	const countryCodes = [
		"+1 (United States)",
		"+355 (Albania)",
		"+213 (Algeria)",
		"+1-684 (American Samoa)",
		"+376 (Andorra)",
		"+244 (Angola)",
		"+1-264 (Anguilla)",
		"+672 (Antarctica)",
		"+1-268 (Antigua and Barbuda)",
		"+54 (Argentina)",
		"+374 (Armenia)",
		"+297 (Aruba)",
		"+61 (Australia)",
		"+43 (Austria)",
		"+994 (Azerbaijan)",
		"+1-242 (Bahamas)",
		"+973 (Bahrain)",
		"+880 (Bangladesh)",
		"+1-246 (Barbados)",
		"+375 (Belarus)",
		"+32 (Belgium)",
		"+501 (Belize)",
		"+229 (Benin)",
		"+1-441 (Bermuda)",
		"+975 (Bhutan)",
		"+591 (Bolivia)",
		"+387 (Bosnia and Herzegovina)",
		"+267 (Botswana)",
		"+55 (Brazil)",
		"+1-284 (British Virgin Islands)",
		"+673 (Brunei)",
		"+359 (Bulgaria)",
		"+226 (Burkina Faso)",
		"+257 (Burundi)",
		"+855 (Cambodia)",
		"+237 (Cameroon)",
		"+1 (Canada)",
		"+238 (Cape Verde)",
		"+1-345 (Cayman Islands)",
		"+236 (Central African Republic)",
		"+235 (Chad)",
		"+56 (Chile)",
		"+86 (China)",
		"+57 (Colombia)",
		"+269 (Comoros)",
		"+242 (Congo)",
		"+506 (Costa Rica)",
		"+385 (Croatia)",
		"+53 (Cuba)",
		"+357 (Cyprus)",
		"+420 (Czech Republic)",
		"+45 (Denmark)",
		"+253 (Djibouti)",
		"+1-767 (Dominica)",
		"+1-809 (Dominican Republic)",
		"+1-670 (East Timor)",
		"+593 (Ecuador)",
		"+20 (Egypt)",
		"+503 (El Salvador)",
		"+240 (Equatorial Guinea)",
		"+291 (Eritrea)",
		"+372 (Estonia)",
		"+251 (Ethiopia)",
		"+500 (Falkland Islands)",
		"+298 (Faroe Islands)",
		"+679 (Fiji)",
		"+358 (Finland)",
		"+33 (France)",
		"+596 (French Guiana)",
		"+689 (French Polynesia)",
		"+262 (French Southern Territories)",
		"+241 (Gabon)",
		"+220 (Gambia)",
		"+995 (Georgia)",
		"+49 (Germany)",
		"+233 (Ghana)",
		"+350 (Gibraltar)",
		"+30 (Greece)",
		"+299 (Greenland)",
		"+1-473 (Grenada)",
		"+590 (Guadeloupe)",
		"+1-671 (Guam)",
		"+502 (Guatemala)",
		"+224 (Guinea)",
		"+245 (Guinea-Bissau)",
		"+592 (Guyana)",
		"+509 (Haiti)",
		"+504 (Honduras)",
		"+852 (Hong Kong)",
		"+36 (Hungary)",
		"+354 (Iceland)",
		"+91 (India)",
		"+62 (Indonesia)",
		"+98 (Iran)",
		"+964 (Iraq)",
		"+353 (Ireland)",
		"+972 (Israel)",
		"+39 (Italy)",
		"+1-876 (Jamaica)",
		"+81 (Japan)",
		"+962 (Jordan)",
		"+7 (Kazakhstan)",
		"+254 (Kenya)",
		"+686 (Kiribati)",
		"+850 (North Korea)",
		"+82 (South Korea)",
		"+965 (Kuwait)",
		"+996 (Kyrgyzstan)",
		"+856 (Laos)",
		"+371 (Latvia)",
		"+961 (Lebanon)",
		"+266 (Lesotho)",
		"+231 (Liberia)",
		"+218 (Libya)",
		"+423 (Liechtenstein)",
		"+370 (Lithuania)",
		"+352 (Luxembourg)",
		"+853 (Macao)",
		"+389 (Macedonia)",
		"+261 (Madagascar)",
		"+265 (Malawi)",
		"+60 (Malaysia)",
		"+960 (Maldives)",
		"+223 (Mali)",
		"+356 (Malta)",
		"+692 (Marshall Islands)",
		"+596 (Martinique)",
		"+222 (Mauritania)",
		"+230 (Mauritius)",
		"+262 (Mayotte)",
		"+52 (Mexico)",
		"+691 (Micronesia)",
		"+373 (Moldova)",
		"+377 (Monaco)",
		"+976 (Mongolia)",
		"+382 (Montenegro)",
		"+1-664 (Montserrat)",
		"+212 (Morocco)",
		"+258 (Mozambique)",
		"+95 (Myanmar)",
		"+264 (Namibia)",
		"+674 (Nauru)",
		"+977 (Nepal)",
		"+31 (Netherlands)",
		"+599 (Netherlands Antilles)",
		"+687 (New Caledonia)",
		"+64 (New Zealand)",
		"+505 (Nicaragua)",
		"+227 (Niger)",
		"+234 (Nigeria)",
		"+683 (Niue)",
		"+672 (Norfolk Island)",
		"+1-670 (Northern Mariana Islands)",
		"+47 (Norway)",
		"+968 (Oman)",
		"+92 (Pakistan)",
		"+680 (Palau)",
		"+970 (Palestinian Territories)",
		"+507 (Panama)",
		"+675 (Papua New Guinea)",
		"+595 (Paraguay)",
		"+51 (Peru)",
		"+63 (Philippines)",
		"+48 (Poland)",
		"+351 (Portugal)",
		"+1-787 (Puerto Rico)",
		"+1-939 (Puerto Rico)",
		"+974 (Qatar)",
		"+262 (Reunion)",
		"+40 (Romania)",
		"+7 (Russia)",
		"+250 (Rwanda)",
		"+290 (Saint Helena)",
		"+1-869 (Saint Kitts and Nevis)",
		"+1-758 (Saint Lucia)",
		"+1-599 (Saint Pierre and Miquelon)",
		"+1-784 (Saint Vincent and the Grenadines)",
		"+685 (Samoa)",
		"+378 (San Marino)",
		"+239 (Sao Tome and Principe)",
		"+966 (Saudi Arabia)",
		"+221 (Senegal)",
		"+381 (Serbia)",
		"+248 (Seychelles)",
		"+232 (Sierra Leone)",
		"+65 (Singapore)",
		"+421 (Slovakia)",
		"+386 (Slovenia)",
		"+677 (Solomon Islands)",
		"+252 (Somalia)",
		"+27 (South Africa)",
		"+211 (South Sudan)",
		"+34 (Spain)",
		"+94 (Sri Lanka)",
		"+249 (Sudan)",
		"+597 (Suriname)",
		"+268 (Swaziland)",
		"+46 (Sweden)",
		"+41 (Switzerland)",
		"+963 (Syria)",
		"+886 (Taiwan)",
		"+992 (Tajikistan)",
		"+255 (Tanzania)",
		"+66 (Thailand)",
		"+228 (Togo)",
		"+690 (Tokelau)",
		"+676 (Tonga)",
		"+1-868 (Trinidad and Tobago)",
		"+216 (Tunisia)",
		"+90 (Turkey)",
		"+993 (Turkmenistan)",
		"+1-649 (Turks and Caicos Islands)",
		"+688 (Tuvalu)",
		"+1-340 (U.S. Virgin Islands)",
		"+256 (Uganda)",
		"+380 (Ukraine)",
		"+971 (United Arab Emirates)",
		"+44 (United Kingdom)",
		"+1 (United States)",
		"+598 (Uruguay)",
		"+998 (Uzbekistan)",
		"+678 (Vanuatu)",
		"+39-06 (Vatican City)",
		"+58 (Venezuela)",
		"+84 (Vietnam)",
		"+1-284 (British Virgin Islands)",
		"+1-340 (U.S. Virgin Islands)",
		"+681 (Wallis and Futuna)",
		"+967 (Western Sahara)",
		"+260 (Yemen)",
		"+263 (Zimbabwe)",
	];

	let countryCode = countryCodes[0];

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
	let otp = '';

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

	$: isVerifyOtpBtnDisabled = !otp || otp.length != 6;

	function renderSignInButton() {
		window.google.accounts.id.initialize({
			client_id: clientId,
			callback: onGoogleAuthSuccess,
			prompt: "select_by",
			scope: "email",
		});
		window.google.accounts.id.renderButton(googleLoginBtn, {
			text: "signin",
			shape: "square",
			size: "large",
			width: 350,
			theme: "white",
		});

		window.google.accounts.id.prompt();
	}

	async function onGoogleAuthSuccess(jwtCredentials) {
		const profileData = JSON.parse(atob(jwtCredentials.credential.split(".")[1]));
		var idToken = jwtCredentials.credential;
		const expirationTime = new Date();
		expirationTime.setTime(expirationTime.getTime() + 1 * 60 * 60 * 1000);
		Cookies.set("token", idToken, { expires: expirationTime });
		Cookies.set("email", profileData.email, { expires: expirationTime });
		Cookies.set("name", profileData.name, { expires: expirationTime });
		Cookies.set("Google-Auth", "true", { expires: expirationTime });
		console.log("email id", profileData.email);
		window.location.href = "/";
	}

	function onSignIn(googleUser) {
		let profile = googleUser.getBasicProfile();
		let fullName = profile.getName();
		let email = profile.getEmail();
		let imageUrl = profile.getImageUrl();
		const expirationTime = new Date();
		expirationTime.setTime(expirationTime.getTime() + 1 * 60 * 60 * 1000);
		Cookies.set("token", profile, { expires: expirationTime });
		Cookies.set("email", email, { expires: expirationTime });
		Cookies.set("name", fullName, { expires: expirationTime });
		Cookies.set("imageUrl", imageUrl, { expires: expirationTime });
		console.log("email id", email);
		window.location.href = "/";
	}

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
						const expirationTime = new Date();
						expirationTime.setTime(expirationTime.getTime() + 1 * 60 * 60 * 1000);
						Cookies.set("token", data.token, { expires: expirationTime });
						let payload = parseJwt(data.token);
						Cookies.set("name", payload.username, { expires: expirationTime });
						Cookies.set("email", payload.email, { expires: expirationTime });
						Cookies.set("userId", payload.userId, { expires: expirationTime });
						Cookies.set("phoneNumber", payload.phoneNumber, { expires: expirationTime });
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
		renderSignInButton();
	}

	function toggleLogin() {
		showSignUp = false;
		renderSignInButton();
	}

	function parseJwt(token: any) {
		var base64Payload = token.split(".")[1];
		// var payload = Buffer.from(base64Payload, 'base64');
		// return JSON.parse(payload.toString());
		var payload = JSON.parse(atob(base64Payload));
		console.log(payload);
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
				phoneNumber: countryCode.split("(")[0].trim() + mobileNumber,
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
						const expirationTime = new Date();
						expirationTime.setTime(expirationTime.getTime() + 1 * 60 * 60 * 1000);
						Cookies.set("token", data.token, { expires: expirationTime });
						let payload = parseJwt(data.token);
						Cookies.set("name", payload.username, { expires: expirationTime });
						Cookies.set("email", payload.email, { expires: expirationTime });
						Cookies.set("phoneNumber", payload.phoneNumber, { expires: expirationTime });
						Cookies.set("userId", payload.userId);
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
				phoneNumber: countryCode.split("(")[0].trim() + mobileNumber,
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
						// setTimeout(() => {
						// 	OTPInput();
						// }, 1000);
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
			// let otpData = {
			// 	phoneNumber: countryCode + mobileNumber,
			// 	otp:
			// 		inputs[0].value +
			// 		inputs[1].value +
			// 		inputs[2].value +
			// 		inputs[3].value +
			// 		inputs[4].value +
			// 		inputs[5].value,
			// };
			let otpData = {
				phoneNumber: countryCode.split("(")[0].trim() + mobileNumber,
				otp: otp
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
	async function forgotPassword() {
		if (!emailId) {
			checkMail = true;
		} else {
			resetLoader = true;
			await fetch("https://backend.immigpt.net/sendResetPasswordMail?email=" + emailId, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(async (response) => {
					if (response.status == 200) {
						sentLink = true;
						checkMail = false;
						resetLoader = false;
					}
					resetLoader = false;
				})
				.catch((error) => {
					console.log("error.response", error.response.status == 401);
				});
		}
	}

	onMount(() => {
		renderSignInButton();
	});
</script>

<Modal>
	<div class="wrapper">
		<div class="header">
			<p class="app-title">ImmiGPT</p>
			{#if showSignUp}
				<p class="login-text">Create your account</p>
				<p class="welcome-text">Enjoy benefits of ImmiGPT in seconds</p>
			{:else}
				<p class="login-text">Login to your account</p>
				<p class="welcome-text">Welcome back ! Please Enter your details</p>
			{/if}
		</div>
		<div class="login-popup">
			<!-- <h2 class="flex items-center text-2xl font-semibold text-gray-800">
				<Logo classNames="mr-1" />
				{PUBLIC_APP_NAME}
				<div
					class="ml-3 flex h-6 items-center rounded-lg border border-gray-100 bg-gray-50 px-2 text-base text-gray-400"
				>
					v{PUBLIC_VERSION}
				</div>
			</h2> -->
			{#if $page.data.requiresLogin}
				<p
					class="px-4 text-lg font-semibold leading-snug text-gray-800 sm:px-12"
					style="text-wrap: balance;"
				>
					Please Sign in with Hugging Face to continue
				</p>
			{/if}

			{#if !showSignUp}
				<div class="input-fields">
					<div>
						<TextInput bind:value={emailId} label="Email Address" placeholder="Your email" />
					</div>
					{#if (emailId && !isEmailValid) || checkMail}
						<p class="error">{!checkMail ? "Enter a valid Email Id" : "Email Id is mandatary"}</p>
					{/if}
					<div>
						<PasswordInput
							bind:value={password}
							type="password"
							label="Password"
							placeholder="Password"
						/>
					</div>
					<div class="signin-text">
						{#if !sentLink && !resetLoader}
							<button class="signup-text" on:click={forgotPassword}>Forgot password ?</button>
						{:else if !resetLoader}
							<p style="color: green;">
								We have sent a reset password link <br /> to your mail. Please check
							</p>
						{:else}
							<p style="color: green;">Sending..</p>
						{/if}
					</div>
					<div class="login-button">
						<button class="login-btn {isLoginBtnDisabled? 'disabled': ''}" on:click={Login} disabled={isLoginBtnDisabled}> Login</button>
						<!-- <Button
							bind:loading={isLoading}
							color="#3b82f6"
							on:click={Login}
							disabled={isLoginBtnDisabled}
							ripple>Login</Button
						> -->
					</div>
					<div class="signin-text center">
						<p class="no-account-text">Don't have an account?</p>
						<button class="signup-text" on:click={toggleSignup}>Sign up</button>
					</div>
				</div>
			{:else}
				<div class="input-fields">
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
							<div class="country-code">
								<NativeSelect
									bind:value={countryCode}
									data={countryCodes}
									disabled={showOtpInputs || OTPVerified}
								>
									<svelte:component this={ChevronDown} slot="rightSection" />
								</NativeSelect>
							</div>
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
								<!-- <Button
									size="xs"
									disabled={isSentOtpBtnDisabled}
									ripple
									color="#3b82f6"
									on:click={sendOtp}>Send OTP</Button -->
								
								<button class="login-btn otp-btn {isSentOtpBtnDisabled ? 'disabled': ''}" on:click={sendOtp} disabled={isSentOtpBtnDisabled}> Send OTP</button>

							</div>
						{/if}
					</div>
					{#if showOtpInputs && !OTPVerified}
						<div class="otp-body">
							<p class="enter-otp-small">Enter OTP</p>
							<div id="otp" class="inputs">
								<!-- <input
									bind:value={firstDigit}
									class="rounded"
									type="text"
									id="first"
									maxlength="1"
								/>
								<input
									bind:value={secondDigit}
									class="rounded"
									type="text"
									id="second"
									maxlength="1"
								/>
								<input
									bind:value={thirdDigit}
									class="rounded"
									type="text"
									id="third"
									maxlength="1"
								/>
								<input
									bind:value={fourthDigit}
									class="rounded"
									type="text"
									id="fourth"
									maxlength="1"
								/>
								<input
									bind:value={fifthDigit}
									class="rounded"
									type="text"
									id="fifth"
									maxlength="1"
								/>
								<input
									bind:value={sixthDigit}
									class="rounded"
									type="text"
									id="sixth"
									maxlength="1"
								/> -->
								<input class="otp-field" type="text" bind:value={otp} maxlength="6">
							</div>
							
							{#if isTimerRunning}
								<p class="timer-text">
									Didn't Receive? Resend in <span class="gold-text">{timer} s</span>
								</p>
							{/if}
							{#if !isTimerRunning}
								<div class="signin-text center">
									<p class="no-account-text">Didn't Recieve?</p>
									<button class="signup-text" on:click={resendOtp}>Resend OTP</button>
								</div>
							{/if}
							{#if isTimerRunning}
								<div class="login-button">
									<!-- <Button
										ripple
										size="xs"
										disabled={isVerifyOtpBtnDisabled}
										color="#3b82f6"
										on:click={verifyOtp}>Verify OTP</Button
									> -->
									<button class="login-btn otp-btn {isVerifyOtpBtnDisabled ? 'disabled': ''}" on:click={verifyOtp} disabled={isVerifyOtpBtnDisabled}> Verify OTP</button>

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
							<!-- <Button
								bind:loading={isLoading}
								color="#3b82f6"
								on:click={handleSignUp}
								disabled={OTPVerified ? isSignupBtnDisabled : !isOTPVerifyEnabled}
								ripple>{OTPVerified ? "Sign up" : "Verify"}</Button
							> -->

							<button class="login-btn otp-btn {OTPVerified ? isSignupBtnDisabled : !isOTPVerifyEnabled ? 'disabled' : ''}" on:click={handleSignUp} disabled={OTPVerified ? isSignupBtnDisabled : !isOTPVerifyEnabled}>{OTPVerified ? "Sign up" : "Verify"}</button>

						</div>
						{#if showSignupError}
							<div class="signup-error">
								<p class="error">{signUpError}</p>
							</div>
						{/if}
					{/if}
					<div class="signin-text center">
						<p class="no-account-text">Already have an account?</p>
						<button on:click={toggleLogin} class="signup-text">Login</button>
					</div>
				</div>
			{/if}
			<!-- {#if !showSignUp} -->
			<div class="google-button">
				<div bind:this={googleLoginBtn} />
				<!-- <div class="g-signin2" data-onsuccess={onSignIn} data-onfailure="onSignInFailure" /> -->
			</div>
			<!-- {/if} -->
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
	</div>
</Modal>

<style>
	/* .login-container {
		min-width: 400px;
	} */

	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 32px;
	}

	.login-popup {
		width: 440px;
		max-height: 500px;
		overflow-y: auto;
		top: 255px;
		left: 500px;
		padding: 32px 40px 32px 40px;
		border-radius: 12px;
		border: 1px;
		gap: 16px;
		box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.08);
		background: white;
	}

	.login-popup::-webkit-scrollbar {
		width: 0 !important;
	}
	.login-popup {
		overflow: -moz-scrollbars-none;
	}
	.login-popup {
		-ms-overflow-style: none;
	}

	.app-title {
		font-family: Inter;
		font-size: 24px;
		font-weight: 700;
		line-height: 29px;
		letter-spacing: 0em;
		text-align: left;
		text-align: center;
	}

	.login-text {
		font-family: Inter;
		font-size: 32px;
		font-weight: 700;
		line-height: 39px;
		letter-spacing: 0em;
		text-align: left;
		text-align: center;
	}

	.welcome-text {
		font-family: Inter;
		font-size: 16px;
		font-weight: 400;
		line-height: 19px;
		letter-spacing: 0em;
		text-align: center;
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.input-fields {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.login-btn {
		width: 100%;
		background: rgba(0, 0, 0, 0.87);
		color: white;
		width: 360px;
		height: 44px;
		padding: 12px 16px 12px 16px;
		border-radius: 8px;
		gap: 8px;
	}

	.otp-btn{
		margin-top: 12px;
	}

	.otp-field{
		border: 1px solid rgba(225, 225, 225, 1);
		width: 100%;
		border-radius: 8px;
		padding: 12px;
	}

	.error {
		color: red;
		margin-top: 5px;
		text-align: center;
	}

	.signin-text {
		display: flex;
		gap: 12px;
		justify-content: flex-end;
		text-decoration: none;
	}

	.signin-text.center {
		justify-content: center;
	}

	.signup-text {
		color: black;
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

	.country-code {
		max-width: 90px;
	}

	.google-button {
		margin-top: 12px;
	}

	.login-btn.disabled{
		background-color:gray;
		cursor: not-allowed;
	}

	.timer-text{
		color: rgba(146, 146, 146, 1);
		text-align: end;
	}

	.no-account-text{
		color: rgba(146, 146, 146, 1);
	}
</style>
