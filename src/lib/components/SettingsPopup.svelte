<script>
	import { dictionary } from './../../../.svelte-kit/generated/client/app.js';
	import { createEventDispatcher, onMount } from "svelte";
    import { TextInput, Button } from "@svelteuidev/core";

	import Cookies from "js-cookie";
	import axios from 'axios';

	let dispatch = createEventDispatcher();
	export let showSettingsPopup = false;

	let activeTab = 0;
	let fileInput;
	let userName = "";
	let userMail = "";
	let profileImg = "";
    let profilePic = '';
    let firstName = '';
    let lastName = '';
    let mobileNumber = '';

	let tabs = [
		"Profile Information",
		"Change Password",
		"Clear Chat",
		"Export Chat",
		"Delete Account",
	];

	function closePopup() {
		dispatch("closeSettingsPopup");
	}

	function changeActiveTab(index) {
		activeTab = index;
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
		let headers = {
			Authorization: "Bearer " + Cookies.get("token"),
		};
		let response = await axios
			.get("https://backend.immigpt.net/getUserProfile", { headers: headers })
			.then((response) => {
				// console.log("response", response);
				userName = response.data.username;
			    userMail = response.data.email;
			    profilePic = response.data.profilePic;
			})
			.catch((error) => {
				console.log("error", error);
			});
		console.log("response", response);
	};

	const updateUserDetails = async () => {
		saveChangesLoader = true;
		let headers = {
			Authorization: "Bearer " + Cookies.get("token"),
		};
		let gauth = Cookies.get("gauth");
		if (gauth) {
			headers["Google-Auth"] = "True";
		}
		let body = {
			name: name,
			email: email,
			mobileNumber: mobileNumber,
			oldPassword: oldPassword,
			newPassword: newPassword,
			confirmPassword: confirmPassword,
		};
		let data = new FormData();
		data.append("request", JSON.stringify(body));
		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: "https://backend.immigpt.net/updateUserProfile",
			headers: headers,
			data: data,
		};
		axios
			.request(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
				saveChangesLoader = false;
				apiSuccessFlag = true;
			})
			.catch((error) => {
				console.log(error);
				saveChangesLoader = false;
				apiErrorFlag = true;
			});
	};

	onMount(() => {
		let token = Cookies.get("token");
		if (token) {
			userName = Cookies.get("name");
            if(userName){
                let names = userName.split(" ")
                firstName = names[0];
                if(names.length > 1){
                    lastName = names[1]
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
					{#if activeTab == 0}
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
											<button on:click={() => fileInput.click()} class="upload-btn"
												><p>Upload Image</p></button
											>
										</div>
									</div>
									<p class="description">
										Upload images up to 256x256 px. Your avatar shows up in your public profile and
										your team notifications.
									</p>
								</div>
                                <div class="input-wrapper">
                                    <TextInput disabled bind:value={firstName} label="First Name" placeholder="First Name" />
                                </div>
                                <div class="input-wrapper">
                                    <TextInput disabled bind:value={lastName} label="Last Name" placeholder="Last Name" />
                                </div>
                                <div class="input-wrapper">
                                    <TextInput disabled bind:value={mobileNumber} label="Phone Number" placeholder="Phone Number" />
                                </div>
							</div>
						</div>
                        <div class="profile-body">
                            <p class="section-header">Clear Conversations</p>
                            <p class="description">Clear Conversations empties your account of all past chats and messages.</p>
                        </div>
					{:else if activeTab == 1}
                        <div class="section">
                            <p class="section-header">Change password</p>
                        </div>
					{:else if activeTab == 2}
                        <div class="section">
                            <p class="section-header">Clear Conversations</p>
                            <p class="description">Clear Conversations empties your account of all past chats and messages.</p>
                        </div>
					{:else if activeTab == 3}
                    <div class="section">
                        <p class="section-header">Export Conversations</p>
                        <p class="description">Export Conversations of your account of all past chats and messages</p>
                    </div>
					{:else if activeTab == 4}
                    <div class="section">
                        <p class="section-header">Delete Account</p>
                    </div>
					{/if}
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
		z-index: 4000;
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

    .profile-body{
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
	}

	.upload-btn p {
		color: rgba(0, 0, 0, 0.87);

		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		line-height: 18px;
	}

    .input-wrapper{
        width: 100%;
    }

    .section{
        /* padding: 24px; */
    }
</style>
