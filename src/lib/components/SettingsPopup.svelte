<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { TextInput, Button, PasswordInput, Modal } from "@svelteuidev/core";

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
	let saveChangesLoader = false;

	$: showSaveOption =
		oldFirstName != firstName ||
		oldLastName != lastName ||
		(oldMobileNumber != mobileNumber && mobileNumber.length == 10);
	$: showSavePwd = password.length > 4 && newPassword.length > 4 && password != newPassword;

	let tabs = ["Profile Information", "Change Password", "Clear Chat", "Delete Account"];

	function closePopup() {
		dispatch("closeSettingsPopup");
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
			scrollToSection("delete-account");
		}
	}

	const handleImageSelect = (event) => {
		const file = event.target.files[0];

		if (file) {
			const imageURL = URL.createObjectURL(file);
			profilePic = imageURL;

			// Create a FormData object and send the image to the backend
			const formData = new FormData();
			formData.append("image", file);

			fetch("/your-backend-endpoint", {
				method: "POST",
				body: formData,
			})
				.then((response) => {
					if (response.ok) {
						console.log("Image uploaded successfully.");
					} else {
						console.error("Error uploading image.");
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	};

	const getUserDetails = async () => {
		let headers = new Headers({
			Authorization: "Bearer " + Cookies.get("token"),
		});

		try {
			const response = await fetch("https://backend.immigpt.net/getUserProfile", {
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
			const response = await fetch("https://backend.immigpt.net/updatePassword", config);

			if (response.ok) {
				const data = await response.json();
				console.log(JSON.stringify(data));
				saveChangesLoader = false;
				// apiSuccessFlag = true;
			} else {
				const error = await response.text();
				console.log(error);
				saveChangesLoader = false;
				// apiErrorFlag = true;
			}
		} catch (error) {
			console.error(error);
			saveChangesLoader = false;
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
			name: firstName + " " + lastName,
			email: userMail,
			mobileNumber: mobileNumber,
			oldPassword: password,
			newPassword: newPassword,
			confirmPassword: newPassword,
		};

		let formData = new FormData();
		formData.append("request", JSON.stringify(body));

		let config = {
			method: "POST",
			headers: headers,
			body: formData,
		};

		try {
			const response = await fetch("https://backend.immigpt.net/updateUserProfile", config);

			if (response.ok) {
				const data = await response.json();
				console.log(JSON.stringify(data));
				saveChangesLoader = false;
				// apiSuccessFlag = true;
			} else {
				const error = await response.text();
				console.log(error);
				saveChangesLoader = false;
				// apiErrorFlag = true;
			}
		} catch (error) {
			console.error(error);
			saveChangesLoader = false;
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

	function clearChat() {
		console.log("clear chat");
	}

	function toggleDeleteAccount() {
		console.log("delete account");
		openDeleteAccountPopup = true;
	}

	function closeDeleteAccountPopup() {
		openDeleteAccountPopup = false;
	}

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
			const response = await fetch("https://backend.immigpt.net/deleteAccount", config);

			if (response.ok) {
				console.log("Account deleted successfully");
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
	});
</script>

{#if showSettingsPopup}
	<div class="overlay">
		<div class="popup">
			<div class="header">
				<p class="title">Settings</p>
				<button class="close-btn" on:click={closePopup}>
					<img src="/assets/icons/close-icon-black.svg" alt="" />
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
											{#if profilePic}
												<img
													src={profilePic}
													alt="Selected Image"
													style="width: 70px; height:70px;  object-fit: cover; border-radius: 75px"
												/>
											{/if}
											{#if !profilePic}
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
										</div>
									</div>
									<p class="description">
										Upload images up to 256x256 px. Your avatar shows up in your public profile and
										your team notifications.
									</p>
								</div>
								<div class="input-wrapper">
									<TextInput bind:value={firstName} label="First Name" placeholder="First Name" />
								</div>
								<div class="input-wrapper">
									<TextInput bind:value={lastName} label="Last Name" placeholder="Last Name" />
								</div>
								<div class="input-wrapper">
									<TextInput
										disabled
										bind:value={userMail}
										label="Email Address"
										placeholder="Email Address"
									/>
								</div>
								<div class="input-wrapper">
									<TextInput
										bind:value={mobileNumber}
										label="Phone Number"
										placeholder="Phone Number"
									/>
								</div>
								{#if showSaveOption}
									<div class="buttons-wrapper">
										<!-- <button class="button black" on:click={updateUserDetails}
											><p>Save Info</p></button
										> -->
										<!-- <button class="button gray" on:click={cancel}><p>Cancel</p></button> -->
										<Button color="dark" on:click={updateUserDetails} ripple>Save Info</Button>
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
							<p class="description">
								If you no longer want to use ImmiGPT, You can permanently delete your account. You
								don’t undo this action
							</p>
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

									<Button color="dark" on:click={updatePassword} ripple>Change Password</Button>
									<Button color="#e4e4e4" on:click={cancelPwd} ripple style="color:black;"
										>Cancel</Button
									>
								</div>
							{/if}
						</div>
					</section>
					<section id="clear-convo">
						<div class="section">
							<p class="section-header">Clear Conversations</p>
							<p class="description">
								Clear Conversations empties your account of all past chats and messages.
							</p>
							<Button variant="default" class="upload-btn" on:click={clearChat}
								><p>Clear Chat</p></Button
							>
						</div>
					</section>
					<section id="delete-account">
						<div class="section">
							<p class="section-header">Delete Account</p>
							<p class="description">
								If you no longer want to use ImmiGPT, You can permanently delete your account. You
								don’t undo this action
							</p>
							<Button
								variant="outline"
								color="#FC5454"
								class="delete-btn"
								on:click={toggleDeleteAccount}><p>Delete Account</p></Button
							>
						</div>
						<Modal
							centered
							opened={openDeleteAccountPopup}
							on:close={closeDeleteAccountPopup}
							title="Delete Account"
						>
							<!-- <p class="title">Are you sure you want to delete your account?</p> -->
							<div class="modal-body">
								<p class="description">
									If you no longer want to use ImmiGPT, You can permanently delete your account. You
									don’t undo this action
								</p>
								<div class="buttons-wrapper">
									<!-- <button class="button black" on:click={deleteAccount}
									><p>Confirm</p></button
								>
								<button class="button gray" on:click={closeDeleteAccountPopup}><p>Cancel</p></button> -->
									<Button color="dark" on:click={deleteAccount} ripple>Confirm</Button>
									<Button
										color="#e4e4e4"
										on:click={closeDeleteAccountPopup}
										ripple
										style="color:black;">Cancel</Button
									>
								</div>
							</div>
						</Modal>
					</section>
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
		z-index: 2;
		opacity: 1;
	}

	.popup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-radius: 4px;
		background: var(--brand-colors-pure-white, #fff);
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
		color: #000;
		font-family: Inter;
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.body {
		width: 100%;
		height: 100%;
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
		max-height: calc(100% - 73px);
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

	.text-btn {
		display: flex;
		width: 177px;
		padding: 10px 16px;
		align-items: center;
		gap: 8px;
	}

	.text-btn p {
		color: rgba(0, 0, 0, 0.54);

		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 16px;
	}

	.text-btn.active p {
		color: rgba(0, 0, 0, 0.87);

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

	.profile-body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
	}

	.section-header {
		color: #000;

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
		color: rgba(0, 0, 0, 0.87);

		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 20px;
	}

	.description {
		color: rgba(0, 0, 0, 0.5);

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
		padding: 26px 24px 25px 23px;
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
	}
</style>
