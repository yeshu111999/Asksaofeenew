<script>
	import { afterUpdate, createEventDispatcher, onMount } from "svelte";
	import { TextInput, Button, PasswordInput, Modal } from "@svelteuidev/core";
	import { error } from "$lib/stores/errors";
	import { base } from "$app/paths";
	import { currentTheme } from "$lib/stores/themeStore";

	import Cookies from "js-cookie";
	import { goto } from "$app/navigation";

	let dispatch = createEventDispatcher();
	export let showSettingsPopup = false;

	let token = "";
	let activeTab = 0;
	let fileInput;
	let userName = "";
	let userMail = "";
	let profileImg = "";
	let profilePic = "";
	let firstName = "";
	let lastName = "";
	let mobileNumber = "";
	let password = "";
	let newPassword = "";

	let oldFirstName = "";
	let oldLastName = "";
	let oldMobileNumber = "";

	let openDeleteAccountPopup = false;
	let openClearChatPopup = false;
	let saveChangesLoader = false;

	let showUpdatePasswordError = false;
	let updatePassordError = "";

	let showUpdatePasswordSuccess = false;
	let updatePasswordSuccess = "Passowrd updated successfully!!";

	let imageFile;

	let showUpdateDetailsError = false;
	let updateDetailsError = "";

	let showUpdateDetailsSuccess = false;
	let updateDetailsSuccess = "User details updated successfully!!";

	let imageAccessFlag = false;

	let isPro = false;
	let subscriptionEndDate = "";
	let paymentHistory = [];

	$: showSaveOption =
		oldFirstName != firstName ||
		oldLastName != lastName ||
		(oldMobileNumber != mobileNumber && mobileNumber.length == 10);
	$: showSavePwd = password.length > 4 && newPassword.length > 4 && password != newPassword;

	let tabs = [
		"Profile Information",
		"Change Password",
		"Clear Chat",
		"Billing Info",
		"Delete Account",
	];

	let tableData = [
		{ col1: "Nov 1, 2023", col2: "$10", col3: "Card ending with 7081", col4: "Data 4" },
		{ col1: "OCT 1, 2023", col2: "$10", col3: "Card ending with 7081", col4: "Data 8" },
		{ col1: "SEP 1, 2023", col2: "$10", col3: "Card ending with 7081", col4: "Data 8" },
		// Add more data as needed
	];

	function closePopup() {
		dispatch("closeSettingsPopup");
	}

	function gotoPayment() {
		goto("/home/payment");
	}

	function changeActiveTab(index) {
		activeTab = index;
		if (activeTab == 0) {
			scrollToSection("profile-info");
		} else if (activeTab == 1) {
			scrollToSection("change-pwd");
		} else if (activeTab == 2) {
			scrollToSection("clear-convo");
		}
		if (activeTab == 3) {
			scrollToSection("billing-info");
		}
		if (activeTab == 4) {
			scrollToSection("delete-account");
		}
	}

	function isImageURL(url, callback) {
		const img = new Image();

		img.onload = function () {
			callback(true);
		};

		img.onerror = function () {
			callback(false);
		};

		img.src = url;
	}

	const handleImageSelect = async (event) => {
		const file = event.target.files[0];
		imageFile = file;

		if (file) {
			const imageURL = URL.createObjectURL(file);
			profilePic = imageURL;
			let headers = new Headers({
				Authorization: "Bearer " + Cookies.get("token"),
				// "Content-Type": "application/json",
			});
			let gauth = Cookies.get("Google-Auth");
			if (gauth) {
				headers.append("Google-Auth", "True");
			}
			let bodyData = {
				username: firstName + " " + lastName,
				firstName: firstName,
				lastName: lastName,
				removeProfilePic: "false",
			};
			// Create a FormData object and send the image to the backend
			const formData = new FormData();
			formData.append("request", JSON.stringify(bodyData));
			formData.append("file", imageFile);

			let config = {
				method: "POST",
				headers: headers,
				body: formData,
			};

			try {
				const response = await fetch("https://backend.immigpt.ai/updateUserProfile", config);

				if (response.ok) {
					const data = await response.json();
					console.log(JSON.stringify(data));
					saveChangesLoader = false;
					showUpdateDetailsSuccess = true;
					setTimeout(() => {
						showUpdateDetailsSuccess = false;
					});
					// apiSuccessFlag = true;
				} else {
					const error = await response.json();
					console.log(error);
					saveChangesLoader = false;
					showUpdateDetailsError = true;
					updateDetailsError = error.message ? error.message : "Something went wrong!! Try again";
					// apiErrorFlag = true;
				}
			} catch (error) {
				console.error(error);
				saveChangesLoader = false;
				showUpdateDetailsError = true;
				updateDetailsError = "Something went wrong!! Try again";
				// apiErrorFlag = true;
			}
		}
	};

	const getUserDetails = async () => {
		let headers = new Headers({
			Authorization: "Bearer " + Cookies.get("token"),
		});
		let gauth = Cookies.get("Google-Auth");
		if (gauth) {
			headers.append("Google-Auth", "True");
		}

		try {
			const response = await fetch("https://backend.immigpt.ai/getUserProfile", {
				method: "GET",
				headers: headers,
			});

			if (response.ok) {
				const userData = await response.json();
				userName = userData.username;
				userMail = userData.email;
				profilePic = userData.profilePic;

				oldFirstName = userName.split(" ")[0];
				oldLastName = userName.split(" ")[1];
			} else {
				const error = await response.text();
				console.log("Error fetching user details: " + error);
			}
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};

	const updatePassword = async () => {
		saveChangesLoader = true;
		let headers = new Headers({
			Authorization: "Bearer " + Cookies.get("token"),
			"Content-Type": "application/json",
		});
		let gauth = Cookies.get("Google-Auth");
		if (gauth) {
			headers.append("Google-Auth", "True");
		}
		let requestbody = {
			oldPassword: password,
			newPassword: newPassword,
		};

		let config = {
			method: "PUT",
			headers: headers,
			body: JSON.stringify(requestbody),
		};

		try {
			const response = await fetch("https://backend.immigpt.ai/updatePassword", config);

			if (response.ok) {
				const data = await response.json();
				saveChangesLoader = false;
				showUpdatePasswordSuccess = true;
				setTimeout(() => {
					showUpdatePasswordSuccess = false;
				}, 5000);

				// apiSuccessFlag = true;
			} else {
				const error = await response.json();
				console.log("error msg", error.message);
				showUpdatePasswordError = true;
				updatePassordError = error.message
					? error.message
					: "Something went wrong! Please try again";
				saveChangesLoader = false;
				// apiErrorFlag = true;
			}
			password = "";
			newPassword = "";
		} catch (error) {
			console.error("error", error);
			showUpdatePasswordError = true;
			updatePassordError = "Something went wrong! Please try again";
			saveChangesLoader = false;
			// apiErrorFlag = true;
			password = "";
			newPassword = "";
		}
	};

	const removeProfilePic = async () => {
		saveChangesLoader = true;
		let headers = new Headers({
			Authorization: "Bearer " + Cookies.get("token"),
			// "Content-Type": "application/json",
		});
		let gauth = Cookies.get("Google-Auth");
		if (gauth) {
			headers.append("Google-Auth", "True");
		}
		let bodyData = {
			username: firstName + " " + lastName,
			firstName: firstName,
			lastName: lastName,
			removeProfilePic: "true",
		};

		let formData = new FormData();
		formData.append("request", JSON.stringify(bodyData));

		let config = {
			method: "POST",
			headers: headers,
			body: formData,
		};

		try {
			const response = await fetch("https://backend.immigpt.ai/updateUserProfile", config);

			if (response.ok) {
				const data = await response.json();
				console.log(JSON.stringify(data));
				saveChangesLoader = false;
				getUserDetails();
				showUpdateDetailsSuccess = true;
				setTimeout(() => {
					showUpdateDetailsSuccess = false;
				});
				// apiSuccessFlag = true;
			} else {
				const error = await response.json();
				console.log(error);
				saveChangesLoader = false;
				showUpdateDetailsError = true;
				updateDetailsError = error.message ? error.message : "Something went wrong!! Try again";
				// apiErrorFlag = true;
			}
		} catch (error) {
			console.error(error);
			saveChangesLoader = false;
			showUpdateDetailsError = true;
			updateDetailsError = "Something went wrong!! Try again";
			// apiErrorFlag = true;
		}
	};

	const updateUserDetails = async () => {
		saveChangesLoader = true;
		let headers = new Headers({
			Authorization: "Bearer " + Cookies.get("token"),
		});
		let gauth = Cookies.get("Google-Auth");
		if (gauth) {
			headers.append("Google-Auth", "True");
		}
		let body = {
			username: firstName + " " + lastName,
			email: userMail,
			firstName: firstName,
			lastName: lastName,
		};

		let formData = new FormData();
		formData.append("request", JSON.stringify(body));
		formData.append("file", imageFile);

		let config = {
			method: "POST",
			headers: headers,
			body: formData,
		};

		try {
			const response = await fetch("https://backend.immigpt.ai/updateUserProfile", config);

			if (response.ok) {
				const data = await response.json();
				console.log(JSON.stringify(data));
				saveChangesLoader = false;
				showUpdateDetailsSuccess = true;
				setTimeout(() => {
					showUpdateDetailsSuccess = false;
				});
				// apiSuccessFlag = true;
			} else {
				const error = await response.json();
				console.log(error);
				saveChangesLoader = false;
				showUpdateDetailsError = true;
				updateDetailsError = error.message ? error.message : "Something went wrong!! Try again";
				// apiErrorFlag = true;
			}
		} catch (error) {
			console.error(error);
			saveChangesLoader = false;
			showUpdateDetailsError = true;
			updateDetailsError = "Something went wrong!! Try again";
			// apiErrorFlag = true;
		}
	};

	function scrollToSection(sectionId) {
		// Update the active section and scroll to it
		const section = document.querySelector(`#${sectionId}`);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	}

	function cancel() {
		firstName = oldFirstName;
		lastName = oldLastName;
	}

	function cancelPwd() {
		password = "";
		newPassword = "";
	}

	function toggleClearChat() {
		openClearChatPopup = true;
	}

	function toggleDeleteAccount() {
		openDeleteAccountPopup = true;
	}

	function closeDeleteAccountPopup() {
		openDeleteAccountPopup = false;
	}

	function closeClearChatPopup() {
		openClearChatPopup = false;
	}

	const clearChat = async () => {
		try {
			const response = await fetch(`${base}/conversation`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				$error = "Error while deleting conversation, try again.";
				return;
			}

			if (response.ok) {
				openClearChatPopup = false;
				goto("/");
				window.location.href = "/";
			} else {
				const error = await response.text();
				console.log("Error clearing all conversations: " + error);
				openClearChatPopup = false;
				goto("/");
				window.location.href = "/";
			}
		} catch (err) {
			console.error(err);
			$error = String(err);
		}
	};

	const deleteAccount = async () => {
		let headers = new Headers({
			Authorization: "Bearer " + token,
		});

		let gauth = Cookies.get("Google-Auth");
		if (gauth) {
			headers.append("Google-Auth", "True");
		}

		let config = {
			method: "POST",
			headers: headers,
		};

		try {
			const response = await fetch("https://backend.immigpt.ai/deleteAccount", config);

			if (response.ok) {
				openDeleteAccountPopup = false;
				logOut();
			} else {
				const error = await response.text();
				console.log("Error deleting account: " + error);
				openDeleteAccountPopup = false;
				goto("/");
			}
		} catch (error) {
			console.error("An error occurred:", error);
			openDeleteAccountPopup = false;
			goto("/");
		}
	};

	function logOut() {
		var cookiesToRemove = ["token", "name", "email", "userId"];

		cookiesToRemove.forEach(function (cookieName) {
			document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		});
		window.location.href = "/";
	}

	async function getBillingHistory() {
		let headers = new Headers({
			Authorization: "Bearer " + Cookies.get("token"),
		});
		let gauth = Cookies.get("Google-Auth");
		if (gauth) {
			headers.append("Google-Auth", "True");
		}

		try {
			const response = await fetch("https://backend.immigpt.ai/getPaymentHistory", {
				method: "GET",
				headers: headers,
			});

			if (response.ok) {
				const userData = await response.json();
				subscriptionEndDate = userData.subscriptionEndDate;
				paymentHistory = userData.purchaseHistory;
				console.log("billing details", userData);
			} else {
				const err = await response.text();
				console.log("Error fetching payment details: " + err);
			}
		} catch (err) {
			console.error("An error occurred:", err);
		}
	}
	function convertDateFormat(inputDateString) {
		// Create a Date object from the input string
		var inputDate = new Date(inputDateString);

		// Extract month, day, and year components
		var monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		var month = monthNames[inputDate.getMonth()];
		var day = inputDate.getDate();
		var year = inputDate.getFullYear();

		// Format the date as "Mon DD, YYYY"
		var formattedDate = month + " " + day + ", " + year;

		return formattedDate;
	}

	function formatPurchaseAmount(purchaseAmount, currency) {
		// Format the purchaseAmount based on the currency
		var formattedAmount = "";

		switch (currency) {
			case "USD":
				formattedAmount = "$" + purchaseAmount;
				break;

			case "INR":
				formattedAmount = "₹" + purchaseAmount;
				break;

			case "EUR":
				formattedAmount = "€" + purchaseAmount;
				break;

			case "GBP":
				formattedAmount = "£" + purchaseAmount;
				break;

			case "JPY":
				formattedAmount = "¥" + purchaseAmount;
				break;

			// Add more cases as needed for other currencies

			default:
				// Default to USD if the currency is not recognized
				formattedAmount = "$" + purchaseAmount;
		}

		return formattedAmount;
	}

	onMount(() => {
		token = Cookies.get("token");
		if (token) {
			userName = Cookies.get("name");
			if (userName) {
				let names = userName.split(" ");
				firstName = names[0];
				oldFirstName = firstName;
				if (names.length > 1) {
					lastName = names[1];
					oldLastName = lastName;
				}
			}
			userMail = Cookies.get("email");
			if (userName) {
				let nameList = userName?.split(" ");
				if (nameList.length > 1) {
					profileImg = nameList[0][0] + nameList[1][0];
				} else {
					profileImg = nameList[0][0];
				}
			}
		}
		getUserDetails();
		getBillingHistory();
	});
	afterUpdate(() => {
		isImageURL(profilePic, (flag) => (imageAccessFlag = flag));
	});
</script>

{#if showSettingsPopup}
	<div class="overlay">
		<div class="popup">
			<div class="header">
				<p class="title">Settings</p>
				<button class="close-btn" on:click={closePopup}>
					<!-- <img src="/assets/icons/close-icon-black.svg" alt="" /> -->
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6 18L18 6"
							stroke={$currentTheme == "light" ? "#222" : "white"}
							stroke-opacity="0.87"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M18 18L6 6"
							stroke={$currentTheme == "light" ? "#222" : "white"}
							stroke-opacity="0.87"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
			<div class="body">
				<div class="left-body">
					{#each tabs as tab, i}
						<button
							on:click={() => {
								changeActiveTab(i);
							}}
							class="text-btn {activeTab == i ? 'active' : ''}"
						>
							<p>{tab}</p>
						</button>
					{/each}
				</div>
				<div class="right-body">
					<section id="profile-info">
						<div class="profile-top">
							<p class="section-header">Profile Information</p>
							<div class="section-body">
								<div class="avatar-sec">
									<p class="mini-title">Avatar</p>
									<div class="image-upload">
										<div class="profile-image-wrap">
											{#if profilePic && imageAccessFlag}
												<!-- alt="Selected Image" -->
												<img
													src={profilePic}
													alt={firstName.charAt(0)}
													style="width: 70px; height:70px;  object-fit: cover; border-radius: 75px"
												/>
											{/if}
											{#if !profilePic || !imageAccessFlag}
												<div class="profile-image">
													<span class="initial">{profileImg}</span>
												</div>
											{/if}
											<input
												type="file"
												accept="image/*"
												on:change={handleImageSelect}
												style="display: none"
												bind:this={fileInput}
											/>
											<Button
												variant="default"
												on:click={() => fileInput.click()}
												class="upload-btn"><p>Upload Image</p></Button
											>
											<Button on:click={removeProfilePic} variant="default" class="upload-btn"
												><p>Remove Image</p></Button
											>
										</div>
									</div>
									<p class="description">
										Upload images up to 256x256 px. Your avatar shows up in your public profile.
									</p>
								</div>
								<div class="input-wrapper">
									<TextInput
										bind:value={firstName}
										class="textInputClass"
										label="First Name"
										placeholder="First Name"
									/>
								</div>
								<div class="input-wrapper">
									<TextInput
										bind:value={lastName}
										className="textInputClass"
										label="Last Name"
										placeholder="Last Name"
									/>
								</div>
								<div class="input-wrapper">
									<TextInput
										disabled
										bind:value={userMail}
										label="Email Address"
										placeholder="Email Address"
									/>
								</div>
								<!-- <div class="input-wrapper">
									<TextInput
										disabled
										bind:value={mobileNumber}
										label="Phone Number"
										placeholder="Phone Number"
									/>
								</div> -->
								{#if showUpdateDetailsError}
									<p class="error">{updateDetailsError}</p>
								{/if}
								{#if showUpdateDetailsSuccess}
									<p class="success">{updateDetailsSuccess}</p>
								{/if}
								{#if showSaveOption}
									<div class="buttons-wrapper">
										<!-- <button class="button black" on:click={updateUserDetails}
											><p>Save Info</p></button
										> -->
										<!-- <button class="button gray" on:click={cancel}><p>Cancel</p></button> -->
										<Button
											color={$currentTheme == "light" ? "black" : "#e4e4e4"}
											on:click={updateUserDetails}
											ripple>Save Info</Button
										>
										<Button color="#e4e4e4" on:click={cancel} ripple style="color:black;"
											>Cancel</Button
										>
									</div>
								{/if}
							</div>
						</div>
					</section>
					<section id="change-pwd">
						<div class="section">
							<p class="section-header">Change password</p>
							<!-- <p class="description">
								If you no longer want to use ImmiGPT, You can permanently delete your account. You
								can’t undo this action
							</p> -->
							<div>
								<PasswordInput
									bind:value={password}
									type="password"
									label="Verify your current password"
									placeholder="Password"
								/>
							</div>
							<div>
								<PasswordInput
									bind:value={newPassword}
									type="password"
									label="New Password"
									placeholder="Password"
								/>
							</div>
							{#if showSavePwd}
								<div class="buttons-wrapper">
									<!-- <button class="button black" on:click={updateUserDetails}
										><p>Change Password</p></button
									>
									<button class="button gray" on:click={cancelPwd}><p>Cancel</p></button> -->

									<Button color="e4e4e4" on:click={updatePassword} ripple>Change Password</Button>
									<Button color="#e4e4e4" on:click={cancelPwd} ripple style="color:black;"
										>Cancel</Button
									>
								</div>
							{/if}
							{#if showUpdatePasswordError}
								<p class="error">{updatePassordError}</p>
							{/if}
							{#if showUpdatePasswordSuccess}
								<p class="success">{updatePasswordSuccess}</p>
							{/if}
						</div>
					</section>
					<section id="clear-convo">
						<div class="section">
							<p class="section-header">Clear Conversations</p>
							<p class="description">
								The 'Clear Conversations' option deletes all past chats from your account.
							</p>
							<Button variant="default" class="upload-btn" on:click={toggleClearChat}
								><p>Clear Chat</p></Button
							>
						</div>
					</section>
					<section id="billing-info">
						<div class="section">
							<p class="section-header">Current Plan</p>
							<div class="pro-wrapper">
								{#if subscriptionEndDate}
									<div class="pro-left">
										<p class="pro-title">PRO</p>
										<p class="pro-description">
											You will be charged an amount $10 on your next billing date on {convertDateFormat(
												subscriptionEndDate
											)}
										</p>
									</div>
									<div class="pro-right">
										<p class="pro-title end">$10/Month</p>
										<!-- <p class="downgrade">Downgrade Plan</p> -->
									</div>
								{:else}
									<div class="pro-left">
										<p class="pro-title">Basic</p>
										<p class="pro-description">Upgrade to pro to unlock exciting features</p>
									</div>
									<div class="pro-right">
										<p class="pro-title end">$10/Month</p>
										<button class="downgrade" on:click={gotoPayment}>Upgrade Plan</button>
									</div>
								{/if}
							</div>
							{#if paymentHistory?.length > 0}
								<div class="billing-history">
									<p class="pro-title">Billing History</p>
									<table>
										<thead>
											<tr>
												<th>BILLING DATE</th>
												<th>AMOUNT</th>
												<!-- <th>PAYMENT METHOD</th> -->
												<!-- <th /> -->
											</tr>
										</thead>
										<tbody>
											{#each paymentHistory as data (data.purchaseDate)}
												<tr>
													<td class="td-text">{convertDateFormat(data.purchaseDate)}</td>
													<td class="td-text"
														>{formatPurchaseAmount(data.purchaseAmount, data.currency)}</td
													>
													<!-- <td>{row.col3}</td> -->
													<!-- <td
														><button><img src="assets/icons/download-icon.svg" alt="" /></button
														></td
													> -->
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{/if}
						</div>
					</section>
					<section id="delete-account">
						<div class="section">
							<p class="section-header">Delete Account</p>
							<p class="description">
								If you no longer want to use ImmiGPT, You can permanently delete your account. You
								can’t undo this action.
							</p>
							<Button
								variant="outline"
								color="#FC5454"
								class="delete-btn"
								on:click={toggleDeleteAccount}><p>Delete Account</p></Button
							>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
	<!-- <Modal
		centered
		opened={openDeleteAccountPopup}
		on:close={closeDeleteAccountPopup}
		title="Delete Account"
	>
		<div class="modal-body">
			<p class="description">
				If you no longer want to use ImmiGPT, You can permanently delete your account. You can’t
				undo this action.
			</p>
			<div class="buttons-wrapper">
				<Button color="dark" on:click={deleteAccount} ripple>Confirm</Button>
				<Button color="#e4e4e4" on:click={closeDeleteAccountPopup} ripple style="color:black;"
					>Cancel</Button
				>
			</div>
		</div>
	</Modal> -->
	<!-- <Modal
		centered
		style="z-index:9999;"
		opened={openClearChatPopup}
		on:close={closeClearChatPopup}
		title="Clear all conversations"
	>
		
		<div class="modal-body">
			<p class="description">
				All your conversations will be permanently deleted from your account. You can’t undo this
				action.
			</p>
			<div class="buttons-wrapper">
				
				<Button color="dark" on:click={clearChat} ripple>Confirm</Button>
				<Button color="#e4e4e4" on:click={closeClearChatPopup} ripple style="color:black;"
					>Cancel</Button
				>
			</div>
		</div>
	</Modal> -->
{/if}

{#if openDeleteAccountPopup}
	<div class="model-overlay">
		<div class="model-popup">
			<div class="modal-body">
				<div class="model-header">
					<p class="popup-title">Delete Account</p>
					<button class="close-btn" on:click={closeDeleteAccountPopup}>
						<img src="/assets/icons/close-icon-black.svg" alt="" />
					</button>
				</div>
				<p class="description">
					If you no longer want to use ImmiGPT, You can permanently delete your account. You can’t
					undo this action.
				</p>
				<div class="buttons-wrapper">
					<Button color="#e4e4e4" on:click={deleteAccount} ripple>Confirm</Button>
					<Button color="#e4e4e4" on:click={closeDeleteAccountPopup} ripple style="color:black;"
						>Cancel</Button
					>
				</div>
			</div>
		</div>
	</div>
{/if}

{#if openClearChatPopup}
	<div class="model-overlay">
		<div class="model-popup">
			<div class="modal-body">
				<div class="model-header">
					<p class="popup-title">Clear all conversations</p>
					<button class="close-btn" on:click={closeClearChatPopup}>
						<img src="/assets/icons/close-icon-black.svg" alt="" />
					</button>
				</div>
				<p class="description">
					If you want to clear all your conversations, you can permanently clear your conversations.
					You can’t undo this action.
				</p>
				<div class="buttons-wrapper">
					<Button color={$currentTheme == "light" ? "black" : "#e4e4e4"} on:click={clearChat} ripple
						>Confirm</Button
					>
					<Button color="#e4e4e4" on:click={closeClearChatPopup} ripple style="color:black;"
						>Cancel</Button
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		opacity: 1;
	}

	.model-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2000;
		opacity: 1;
	}

	.model-popup {
		padding: 20px;
		background-color: var(--primary-background-color);
		border-radius: 4px;
	}

	.model-header {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	.textInputClass {
		/* background-color: var(--primary-background-color); */
		background-color: red;
		color: var(--primary-text-color);
	}

	.popup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-radius: 4px;
		/* background: var(--brand-colors-pure-white, #fff); */
		background-color: var(--primary-background-color);
		width: 700px;
		height: 720px;
	}

	.header {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e1e1e1;
	}

	.title {
		/* color: #000; */
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.body {
		width: 100%;
		height: calc(100% - 72.5px);
		display: flex;
	}

	.left-body {
		width: 177px;
		border-right: 1px solid #e1e1e1;
		padding-top: 8px;
	}

	.right-body {
		width: calc(100% - 177px);
		overflow-y: auto;
		height: 100%;
	}

	.right-body::-webkit-scrollbar {
		width: 0 !important;
	}
	.right-body {
		overflow: -moz-scrollbars-none;
	}
	.right-body {
		-ms-overflow-style: none;
	}

	.td-text {
		color: var(--primary-text-color);
	}

	.text-btn {
		display: flex;
		width: 177px;
		padding: 10px 16px;
		align-items: center;
		gap: 8px;
	}

	.text-btn p {
		color: var(--secondary-btn-color);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 16px;
	}

	.text-btn.active p {
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 16px;
	}

	.right-body {
		display: inline-flex;
		/* height: 1452px; */
		padding: 24px 24px;
		flex-direction: column;
		align-items: flex-start;
		gap: 72px;
		flex-shrink: 0;
	}

	.profile-top {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
	}

	.error {
		color: #fc5454;
		font-size: 14px;
	}

	.success {
		color: green;
		font-size: 14px;
	}

	.profile-body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
	}

	.section-header {
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.section-body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 24px;
	}

	.avatar-sec {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
	}

	.mini-title {
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 20px;
	}

	.description {
		color: var(--primary-text-color);

		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: 18px;
	}

	.profile-image-wrap {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.profile-image {
		display: flex;
		/* padding: 26px 24px 25px 23px; */
		height: 50px;
		width: 50px;
		justify-content: center;
		align-items: center;
		border-radius: 1000px;
		border: 1px solid #e1e1e1;
		background: #ececec;
	}

	.upload-btn {
		display: flex;
		padding: 10px 20px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		border: 1px solid rgba(0, 0, 0, 0.87);
		width: max-content;
	}

	.upload-btn p {
		color: rgba(0, 0, 0, 0.87);

		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		line-height: 18px;
	}

	.delete-btn {
		display: flex;
		padding: 10px 20px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		border: 1px solid rgba(252, 84, 84, 0.87);
		width: max-content;
	}

	.delete-btn p {
		color: #fc5454;
		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		line-height: 18px; /* 138.462% */
	}

	.input-wrapper {
		width: 100%;
	}

	section {
		width: 100%;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 20px;
	}

	th,
	td {
		padding: 10px;
		text-align: left;
	}

	th {
		background-color: #f7f7f7;
		color: #808080;

		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		text-transform: uppercase;
	}

	td {
		color: rgba(0, 0, 0, 0.87);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	tr:not(:last-child) {
		border-bottom: 1px solid #e1e1e1;
	}

	.button {
		display: flex;
		padding: 12px 16px;
		justify-content: center;
		align-items: center;
		gap: 4px;
	}

	.button.black {
		border-radius: 8px;
		background: #000;
	}

	.button.gray {
		border-radius: 8px;
		background: #e4e4e4;
	}

	.button.black p {
		color: rgba(255, 255, 255, 0.87);
		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		line-height: 16px;
	}

	.button.gray p {
		color: rgba(0, 0, 0, 0.87);
		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		line-height: 16px; /* 123.077% */
	}

	.buttons-wrapper {
		width: 100%;
		display: flex;
		gap: 12px;
	}

	.modal-body {
		display: flex;
		flex-direction: column;
		gap: 12px;
		z-index: 9999;
	}

	.pro-wrapper {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding-bottom: 20px;
		border-bottom: 1px solid #e1e1e1;
	}

	.pro-wrapper .pro-left {
		max-width: 55%;
	}

	.pro-title {
		font-weight: 600;
	}

	.pro-title.end {
		text-align: end;
	}

	.downgrade {
		text-align: end;
		color: rgba(0, 55, 198, 0.87);

		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.pro-left,
	.pro-right {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	@media screen and (max-width: 786px) {
		.left-body {
			display: none;
		}
		.right-body {
			flex: auto;
		}
	}
</style>
