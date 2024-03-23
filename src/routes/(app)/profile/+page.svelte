<!-- src/routes/Profile.svelte -->
<script>
	import { goto } from "$app/navigation";
	import {
		Card,
		TextInput,
		Button,
		PasswordInput,
		createStyles,
		Tabs,
		NativeSelect,
		Chip,
		Grid,
		Checkbox,
		ActionIcon,
		Notification,
	} from "@svelteuidev/core";
	import axios from "axios";
	import Cookies from "js-cookie";
	import { onMount } from "svelte";
	import { theme } from "$lib/stores/theme";
	import { Pencil1, Cross2, Check } from "radix-icons-svelte";
	// const FormData = require("form-data");
	import FormData from "form-data";
	let editing = false;
	let oldValues = []; // Store the original values
	let fields = [
		{ name: "Name", value: "John Doe" },
		{ name: "Email", value: "john@example.com" },
		{ name: "Mobile", value: "123-456-7890" },
		{ name: "Password", value: "hello" },
	];
	let name = "";
	let oldName = "";
	let oldPassword = "";
	let newPassword = "";
	let confirmPassword = "";
	let mobileNumber = "";
	let email = "";
	let token = "";
	let saveChangesLoader = false;
	let initial = "";
	let selectedImage;
	let themeVariable = "light";
	let storeTempTheme = $theme;
	let nameEditFlag = false;
	let mailEditFlag = false;
	let mobileEditFlag = false;
	let passEditFlag = false;
	let chooseCategoryEditFlag = false;
	let chooseCountryEditFlag = false;
	let profilePic = "";

	let collegeEditFlag = false;
	let courseCountryEditFlag = false;
	let cgpaEditFlag = false;
	let gradYearEditFlag = false;
	let experienceEditFlag = false;
	let companyCountryEditFlag = false;
	let apiErrorFlag = false;
	let apiSuccessFlag = false;

	const useStyles = createStyles((themes) => ({
		root: {
			"&.active": {
				// backgroundColor: $theme == "dark" ? "rgba(255, 255, 255, 0.2)" : "rgb(11, 67, 116)",
				// backgroundColor: "rgba(255, 255, 255, 0.2)",
				backgroundColor: "rgb(11, 67, 116)",
				borderRadius: 8,
			},
		},
	}));
	$: ({ classes } = useStyles());

	$: isDisableUpdate =
		oldName != name ||
		(oldPassword && newPassword && confirmPassword && newPassword == confirmPassword);
	let profileImageUrl = "https://picsum.photos/300/300";

	onMount(() => {
		name = Cookies.get("name");
		email = Cookies.get("email");
		token = Cookies.get("token");
		console.log(token);
		mobileNumber = Cookies.get("phoneNumber");
		oldName = name;
		initial = oldName[0];
	});

	const getUserDetails = async () => {
		let headers = {
			Authorization: "Bearer " + Cookies.get("token"),
		};
		let gauth = Cookies.get("Google-Auth");
		if (gauth) {
			headers.append("Google-Auth", "True");
		}
		let response = await axios
			.get("https://backend.immigpt.ai/getUserProfile", { headers: headers })
			.then((response) => {
				// console.log("response", response);
				(name = response.data.username),
					(email = response.data.email),
					(profilePic = response.data.profilePic);

				// 	name: name,
				// email: email,
				// mobileNumber: mobileNumber,
				// oldPassword: oldPassword,
				// newPassword: newPassword,
				// confirmPassword: confirmPassword,
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
		let gauth = Cookies.get("Google-Auth");
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
			url: "https://backend.immigpt.ai/updateUserProfile",
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

	getUserDetails();

	let questions = [
		"Help in writing LOR",
		"Help in writing SOP",
		"Help in writing Resume",
		"Help in college shortlisting",
		"Help in applying application",
		"Help in Visa interview preparation",
	];

	let fileInput;
	function toggleEditing() {
		editing = !editing;

		// If entering edit mode, store the original values
		if (editing) {
			oldValues = fields.map((field) => ({ ...field }));
		}
	}

	function closeProfile() {
		goto("/");
	}

	const handleImageSelect = (event) => {
		const file = event.target.files[0];

		if (file) {
			const imageURL = URL.createObjectURL(file);
			selectedImage = imageURL;

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

	async function saveChanges() {
		saveChangesLoader = true;
		if (oldName != name) {
			let updateNameReq = {
				email: email,
				username: name,
			};
			await fetch("https://backend.immigpt.ai/updateUserProfile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updateNameReq),
			})
				.then(async (response) => {
					console.log("response", response);
					if (response.status == 200) {
						Cookies.set("name", name);
						oldName = name;
						saveChangesLoader = false;
						editing = false;
					}
				})
				.catch((error) => {
					console.log("error.response1", error);
				});
		} else {
			let updatePasswordReq = {
				newPassword: newPassword,
				oldPassword: oldPassword,
			};
			await fetch("https://backend.immigpt.ai/updatePassword", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updatePasswordReq),
			})
				.then(async (response) => {
					console.log("response", response);
					if (response.status == 200) {
						oldPassword = "";
						newPassword = "";
						confirmPassword = "";
						saveChangesLoader = false;
						editing = false;
					}
				})
				.catch((error) => {
					console.log("error.response1", error);
				});
		}
	}
</script>

<main class="container">
	<div class={$theme == "dark" ? "card dark" : "light card"}>
		<!-- <p class="title">Profile</p> -->
		<div class="close">
			<button class="close-btn" on:click={closeProfile}
				><img src="/chatui/close-icon.png" alt="close" /></button
			>
		</div>
		<div class="card-body">
			{#if editing}
				<!-- <Tabs
					variant="pills"
					color={$theme == "dark"
						? "rgba(255, 255, 255, 0.2)"
						: "rgb(11, 67, 116)" + themeVariable == "dark"
						? "rgba(255, 255, 255, 0.2)"
						: "rgb(11, 67, 116)"}
				>
					
					<Tabs.Tab label="About" class={classes.root + $theme == "light" ? "light" : "dark"}>
						<div class="tab-wrapper">
							{#each fields as field, index (field.name)}
								<div>
									<label for={field.name.toLowerCase()}>{field.name}:</label>
									{#if field.name === "Password"}
										{#if !passEditFlag}
											<div style="display: flex; gap: 8px; align-items: center">
												<span>**********</span>
												<ActionIcon variant="hover" on:click={() => (passEditFlag = true)}>
													<Pencil1 />
												</ActionIcon>
											</div>
										{:else if passEditFlag}
											<div class="password-fields">
												<PasswordInput
													type="text"
													placeholder="Old Password"
													bind:value={oldPassword}
													id="oldPassword"
												/>
												<PasswordInput
													type="text"
													placeholder="New Password"
													bind:value={newPassword}
													id="newPassword"
												/>
												<PasswordInput
													type="text"
													placeholder="Confirm Password"
													bind:value={confirmPassword}
													id="confirmPassword"
												/>
											</div>
										{/if}
									{:else if field.name === "Email"}
										<div style="display: flex; gap: 8px; align-items: center">
											<span>{email}</span>
											
										</div>
										
									{:else if field.name === "Mobile"}
										
										{#if !mobileEditFlag}
											<div style="display: flex; gap: 8px; align-items: center">
												<span>{mobileNumber}</span>
												<ActionIcon variant="hover" on:click={() => (mobileEditFlag = true)}>
													<Pencil1 />
												</ActionIcon>
											</div>
										{:else if mobileEditFlag}
											<TextInput
												placeholder={field.name}
												type="text"
												bind:value={mobileNumber}
												id={field.name.toLowerCase()}
											/>
										{/if}
									{:else}
										{#if !nameEditFlag}
											<div style="display: flex; gap: 8px; align-items: center">
												<span>{name}</span>
												<ActionIcon variant="hover" on:click={() => (nameEditFlag = true)}>
													<Pencil1 />
												</ActionIcon>
											</div>
										{:else if nameEditFlag}
											<TextInput
												placeholder={field.name}
												type="text"
												bind:value={name}
												id={field.name.toLowerCase()}
											/>
										{/if}
									{/if}
								</div>
							{/each}
							<div class="button-container">
								<Button
									loading={saveChangesLoader}
									color="#3b82f6"
									gradient={{ from: "grape", to: "pink", deg: 35 }}
									on:click={saveChanges}
									disabled={!isDisableUpdate}>Save Changes</Button
								>
							</div>
						</div>
					</Tabs.Tab>
					<Tabs.Tab label="Profile" class={classes.root + $theme == "light" ? "light" : "dark"}>
						<div class="profile-wrapper tab-wrapper">
							<div class="input-wrapper">
								<label for="">Choose your category</label>
								{#if !chooseCategoryEditFlag}
									<div style="display: flex; gap: 8px; align-items: center">
										<span>Student</span>
										<ActionIcon variant="hover" on:click={() => (chooseCategoryEditFlag = true)}>
											<Pencil1 />
										</ActionIcon>
									</div>
								{:else if chooseCategoryEditFlag}
									<NativeSelect
										data={["Student", "Professional", "Tourist"]}
										placeholder="Choose your category"
										size="sm"
										required={false}
									/>
								{/if}
							</div>
							<div class="input-wrapper">
								<label for="">Choose the country of your choice</label>
								{#if !chooseCountryEditFlag}
									<div style="display: flex; gap: 8px; align-items: center">
										<span>USA</span>
										<ActionIcon variant="hover" on:click={() => (chooseCountryEditFlag = true)}>
											<Pencil1 />
										</ActionIcon>
									</div>
								{:else if chooseCountryEditFlag}
									<NativeSelect
										data={["USA", "Canada", "UK", "Singapore", "Germany"]}
										placeholder="Choose the country of your choice"
										size="sm"
										required={false}
									/>
								{/if}
							</div>

							<div style="display: flex; padding: 16px; gap: 8px;">
								<span style="font-size: 16px; font-weight: 600;">Type of course interseted</span>
								<Chip variant="filled">Bachelors</Chip>
								<Chip variant="filled">Masters</Chip>
								<Chip variant="filled">Ph.D</Chip>
							</div>
							<div class="button-container">
								<Button
									loading={saveChangesLoader}
									color="#3b82f6"
									gradient={{ from: "grape", to: "pink", deg: 35 }}
									on:click={saveChanges}
									disabled={!isDisableUpdate}>Save Changes</Button
								>
							</div>
						</div>
					</Tabs.Tab>
					<Tabs.Tab label="Background" class={classes.root + $theme == "light" ? "light" : "dark"}>
						<div class="backGroundWrap tab-wrapper">
							<Grid justify="space-between">
								<Grid.Col span={4}>
									<div class="input-wrapper">
										<label for="">College name</label>
										{#if !collegeEditFlag}
											<div style="display: flex; gap: 8px; align-items: center">
												<span>SASTRA</span>
												<ActionIcon variant="hover" on:click={() => (collegeEditFlag = true)}>
													<Pencil1 />
												</ActionIcon>
											</div>
										{:else if collegeEditFlag}
											<TextInput placeholder="Enter college name" value="SASTRA" />
										{/if}
									</div>
								</Grid.Col>
								<Grid.Col span={4}>
									<div class="input-wrapper">
										<label for="">Course name</label>
										{#if !courseCountryEditFlag}
											<div style="display: flex; gap: 8px; align-items: center">
												<span>B.Tech CSE</span>
												<ActionIcon variant="hover" on:click={() => (courseCountryEditFlag = true)}>
													<Pencil1 />
												</ActionIcon>
											</div>
										{:else if courseCountryEditFlag}
											<TextInput placeholder="Enter course name" value="B.Tech CSE" />
										{/if}
									</div>
								</Grid.Col>
								<Grid.Col span={4}>
									<div class="input-wrapper">
										<label for="">CGPA</label>

										{#if !cgpaEditFlag}
											<div style="display: flex; gap: 8px; align-items: center">
												<span>9.6</span>
												<ActionIcon variant="hover" on:click={() => (cgpaEditFlag = true)}>
													<Pencil1 />
												</ActionIcon>
											</div>
										{:else if cgpaEditFlag}
											<TextInput placeholder="Enter CGPA" value="9.6" />
										{/if}
									</div>
								</Grid.Col>
								<Grid.Col span={4}>
									<div class="input-wrapper">
										<label for="">Graduation year</label>
										{#if !gradYearEditFlag}
											<div style="display: flex; gap: 8px; align-items: center">
												<span>2022</span>
												<ActionIcon variant="hover" on:click={() => (gradYearEditFlag = true)}>
													<Pencil1 />
												</ActionIcon>
											</div>
										{:else if gradYearEditFlag}
											<TextInput placeholder="Enter graduation year" value="2022" />
										{/if}
									</div>
								</Grid.Col>
								<Grid.Col span={4}>
									<div class="input-wrapper">
										<label for="">Experience</label>

										{#if !experienceEditFlag}
											<div style="display: flex; gap: 8px; align-items: center">
												<span>2 Years</span>
												<ActionIcon variant="hover" on:click={() => (experienceEditFlag = true)}>
													<Pencil1 />
												</ActionIcon>
											</div>
										{:else if experienceEditFlag}
											<TextInput placeholder="Enter experience" value="2 Years" />
										{/if}
									</div>
								</Grid.Col>
								<Grid.Col span={4}>
									<div class="input-wrapper">
										<label for="">Company</label>

										{#if !companyCountryEditFlag}
											<div style="display: flex; gap: 8px; align-items: center">
												<span>Amazon</span>
												<ActionIcon
													variant="hover"
													on:click={() => (companyCountryEditFlag = true)}
												>
													<Pencil1 />
												</ActionIcon>
											</div>
										{:else if companyCountryEditFlag}
											<TextInput placeholder="Enter Company" value="Amazon" />
										{/if}
									</div>
								</Grid.Col>
							</Grid>
						</div>
						<div class="button-container">
							<Button
								loading={saveChangesLoader}
								color="#3b82f6"
								gradient={{ from: "grape", to: "pink", deg: 35 }}
								on:click={saveChanges}
								disabled={!isDisableUpdate}>Save Changes</Button
							>
						</div>
					</Tabs.Tab>
					<Tabs.Tab label="Resume" class={classes.root + ($theme == "light" ? "light" : "dark")}>
						<div class="tab-wrapper">
							<div class="file-upload">
								<label for="file">Upload your resume</label>
								<input type="file" name="file" id="file" />
							</div>
							<div class="questions">
								<p class="services-header">Choose Services you would like to have?</p>
								{#each questions as question, i}
									<div style="display: flex; gap: 8px;">
										<Checkbox size="sm" />
										<p class="question">{i + 1 + " ) " + question}</p>
									</div>
									
								{/each}
							</div>
							<Button
								loading={saveChangesLoader}
								color="#3b82f6"
								gradient={{ from: "grape", to: "pink", deg: 35 }}
								on:click={saveChanges}
								disabled={!isDisableUpdate}>Save Changes</Button
							>
						</div>
					</Tabs.Tab>
				</Tabs> -->
				<div class="header">
					<p class="title">Edit Profile</p>
				</div>

				<div class="tab-wrapper">
					<div class="profile-image-wrap image-edit">
						{#if selectedImage}
							<img
								src={selectedImage}
								alt="Selected Image"
								style="width: 150px; height:150px;  object-fit: cover; border-radius: 75px"
							/>
						{/if}
						{#if !selectedImage}
							<div class="profile-image">
								<span class="initial">{initial}</span>
							</div>
						{/if}
						<input
							type="file"
							accept="image/*"
							on:change={handleImageSelect}
							style="display: none"
							bind:this={fileInput}
						/>
						<!-- <button on:click={() => fileInput.click()} class="profile-image-edit-wrap"
							>Edit profile</button
						> -->
						<ActionIcon variant="hover" on:click={() => fileInput.click()}>
							<Pencil1 />
						</ActionIcon>
					</div>
					{#each fields as field, index (field.name)}
						<div>
							<label for={field.name.toLowerCase()}>{field.name}:</label>
							{#if field.name === "Password"}
								{#if !passEditFlag}
									<div style="display: flex; gap: 8px; align-items: center">
										<span>**********</span>
										<ActionIcon variant="hover" on:click={() => (passEditFlag = true)}>
											<Pencil1 />
										</ActionIcon>
									</div>
								{:else if passEditFlag}
									<div class="password-fields">
										<PasswordInput
											type="text"
											placeholder="Old Password"
											bind:value={oldPassword}
											id="oldPassword"
										/>
										<PasswordInput
											type="text"
											placeholder="New Password"
											bind:value={newPassword}
											id="newPassword"
										/>
										<PasswordInput
											type="text"
											placeholder="Confirm Password"
											bind:value={confirmPassword}
											id="confirmPassword"
										/>
									</div>
								{/if}
							{:else if field.name === "Email"}
								<!-- {#if !mailEditFlag} -->
								<div style="display: flex; gap: 8px; align-items: center">
									<span>{email}</span>
									<!-- <ActionIcon variant="hover" on:click={() => (mailEditFlag = true)}>
											<Pencil1 />
										</ActionIcon> -->
								</div>
								<!-- {:else if mailEditFlag}
									<TextInput
										placeholder={field.name}
										type="text"
										bind:value={email}
										id={field.name.toLowerCase()}
									/> -->
								<!-- {/if} -->
							{:else if field.name === "Mobile"}
								<!-- <div>
									<span>{mobileNumber}</span>
								</div> -->
								{#if !mobileEditFlag}
									<div style="display: flex; gap: 8px; align-items: center">
										<span>{mobileNumber}</span>
										<ActionIcon variant="hover" on:click={() => (mobileEditFlag = true)}>
											<Pencil1 />
										</ActionIcon>
									</div>
								{:else if mobileEditFlag}
									<TextInput
										placeholder={field.name}
										type="text"
										bind:value={mobileNumber}
										id={field.name.toLowerCase()}
									/>
								{/if}
							{:else}
								<!-- <TextInput
									placeholder={field.name}
									type="text"
									bind:value={name}
									id={field.name.toLowerCase()}
								/> -->
								{#if !nameEditFlag}
									<div style="display: flex; gap: 8px; align-items: center">
										<span>{name}</span>
										<ActionIcon variant="hover" on:click={() => (nameEditFlag = true)}>
											<Pencil1 />
										</ActionIcon>
									</div>
								{:else if nameEditFlag}
									<TextInput
										placeholder={field.name}
										type="text"
										bind:value={name}
										id={field.name.toLowerCase()}
									/>
								{/if}
							{/if}
						</div>
					{/each}
					<div class="button-container">
						<Button
							loading={saveChangesLoader}
							color="#3b82f6"
							gradient={{ from: "grape", to: "pink", deg: 35 }}
							on:click={updateUserDetails}>Save Changes</Button
						>
						<!-- on:click={saveChanges}>Save Changes</Button -->
						<!-- disabled={!isDisableUpdate} -->
					</div>
					{#if apiErrorFlag}
						<Notification
							icon={Cross2}
							color="red"
							closeButtonProps={{ title: "Hide notification" }}
							on:click={() => (apiErrorFlag = false)}
						>
							Error in updating details
						</Notification>
					{/if}
					{#if apiSuccessFlag}
						<Notification
							icon={Check}
							color="green"
							closeButtonProps={{ title: "Hide notification" }}
							on:click={() => (apiSuccessFlag = false)}
						>
							Details updated successfully
						</Notification>
					{/if}
				</div>
			{:else}
				<div class="profile-image-container">
					<!-- <img src={profileImageUrl} alt="Profile" class="profile-image" /> -->
					<div class="profile-image-wrap">
						{#if selectedImage}
							<img
								src={selectedImage}
								alt="Selected Image"
								style="width: 150px; height:150px;  object-fit: cover; border-radius: 75px"
							/>
						{/if}
						{#if !selectedImage}
							<div class="profile-image">
								<span class="initial">{initial}</span>
							</div>
						{/if}
						<input
							type="file"
							accept="image/*"
							on:change={handleImageSelect}
							style="display: none"
							bind:this={fileInput}
						/>
						<button on:click={() => fileInput.click()} class="profile-image-edit-wrap"
							>Edit profile</button
						>
					</div>
				</div>
				<div>
					<p class="title">Name:</p>
					<span>{name}</span>
				</div>
				<div>
					<p class="title">Email:</p>
					<span>{email}</span>
				</div>
				<div>
					<p class="title">Mobile Number:</p>
					<span>{mobileNumber}</span>
				</div>
				<div class="button-container">
					<Button
						color="#3b82f6"
						gradient={{ from: "grape", to: "pink", deg: 35 }}
						on:click={toggleEditing}>Complete Profile</Button
					>
					<!-- <Button
						color="#3b82f6"
						gradient={{ from: "grape", to: "pink", deg: 35 }}
						on:click={toggleEditing}>Update Profile</Button
					> -->
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
	.backGroundWrap {
		padding: 16px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.card {
		width: 100%;
		padding: 5%;
		border-radius: 6px;

		position: relative;
	}

	.card.light {
		background-color: #f8f8f8;
	}

	.card.dark {
		background-color: rgb(31 41 55 / 0.3);
	}

	.card-body {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: center;
	}

	.container {
		/* max-width: 60%; */
		margin: 0 auto;
		padding: 5vw;
		height: 100vh;
		font-size: 16px;
	}

	label {
		display: block;
		font-weight: bold;
		margin-bottom: 0.25rem;
	}

	div {
		margin-bottom: 1rem;
	}

	input {
		width: 100%;
		padding: 0.25rem;
	}

	.password-fields {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.button-container {
		display: flex;
		justify-content: center;
	}

	/* .profile-image {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		object-fit: cover;
	} */

	.profile-image-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 18px;
		font-weight: bold;
	}

	.profile-image {
		width: 150px;
		height: 150px;
		background-color: #3498db; /* Background color for the image */
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 48px;
		color: #ffffff; /* Text color */
	}

	.profile-image-edit-wrap {
		/* position: absolute; */
	}

	.profile-image-wrap {
		display: flex;
		flex-direction: column;
		/* justify-content: right;
		align-items: flex-end; */
		width: fit-content;
	}

	.close {
		position: absolute;
		right: 25px;
		top: 25px;
	}

	.close-btn {
		width: 35px;
		height: 35px;
		background: black;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.close-btn img {
		height: 20px;
		width: 20px;
	}

	.profile-wrapper {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.tab-wrapper {
		/* margin-top: 12px; */
		padding-top: 12px;
		border-top: 1px solid;
	}

	.questions {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.image-edit {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
	}

	@media (max-width: 600px) {
		.container {
			width: 100%;
			height: 100vh;
			max-width: 100%;
			padding: 0;
		}

		.card {
			border-radius: 0;
			height: 100%;
		}
	}
</style>
