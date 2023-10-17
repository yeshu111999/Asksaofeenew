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
	} from "@svelteuidev/core";
	import Cookies from "js-cookie";
	import { onMount } from "svelte";
	import { theme } from "$lib/stores/theme";
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

	const useStyles = createStyles((theme) => ({
		root: {
			"&.active": {
				backgroundColor: "rgba(255, 255, 255, 0.2)",
				borderRadius: 8,
			},
		},
	}));
	$: ({ classes } = useStyles());

	$: isDisableUpdate =
		oldName != name ||
		(oldPassword && newPassword && confirmPassword && newPassword == confirmPassword);
	let profileImageUrl = "https://picsum.photos/200/300";

	onMount(() => {
		name = Cookies.get("name");
		email = Cookies.get("email");
		token = Cookies.get("token");
		console.log(token);
		mobileNumber = Cookies.get("phoneNumber");
		oldName = name;
		initial = oldName[0];
	});

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
			await fetch("https://backend.immigpt.net/updateUserProfile", {
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
			await fetch("https://backend.immigpt.net/updatePassword", {
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
				<Tabs
					variant="pills"
					color={$theme == "dark"
						? "rgba(255, 255, 255, 0.2)"
						: "black" + themeVariable == "dark"
						? "rgba(255, 255, 255, 0.2)"
						: "black"}
				>
					<!-- position="apart" -->
					<!-- orientation="vertical" -->
					<Tabs.Tab label="About" class={classes.root + $theme == "light" ? "light" : "dark"}>
						<div class="tab-wrapper">
							{#each fields as field, index (field.name)}
								<div>
									<label for={field.name.toLowerCase()}>{field.name}:</label>
									{#if field.name === "Password"}
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
									{:else if field.name === "Email"}
										<div>
											<span>{email}</span>
										</div>
									{:else if field.name === "Mobile"}
										<div>
											<span>{mobileNumber}</span>
										</div>
									{:else}
										<TextInput
											placeholder={field.name}
											type="text"
											bind:value={name}
											id={field.name.toLowerCase()}
										/>
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
								<NativeSelect
									data={["Student", "Professional", "Tourist"]}
									placeholder="Choose your category"
									size="sm"
									required={false}
								/>
							</div>
							<div class="input-wrapper">
								<label for="">Choose the country of your choice</label>
								<NativeSelect
									data={["USA", "Canada", "UK", "Singapore", "Germany"]}
									placeholder="Choose the country of your choice"
									size="sm"
									required={false}
								/>
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
										<TextInput placeholder="Enter college name" />
									</div>
								</Grid.Col>
								<Grid.Col span={4}>
									<div class="input-wrapper">
										<label for="">Course name</label>
										<TextInput placeholder="Enter course name" />
									</div>
								</Grid.Col>
								<Grid.Col span={4}>
									<div class="input-wrapper">
										<label for="">CGPA</label>
										<TextInput placeholder="Enter CGPA" />
									</div>
								</Grid.Col>
								<Grid.Col span={4}>
									<div class="input-wrapper">
										<label for="">Graduation year</label>
										<TextInput placeholder="Enter graduation year" />
									</div>
								</Grid.Col>
								<Grid.Col span={4}>
									<div class="input-wrapper">
										<label for="">Experience</label>
										<TextInput placeholder="Enter experience" />
									</div>
								</Grid.Col>
								<Grid.Col span={4}>
									<div class="input-wrapper">
										<label for="">Company</label>
										<TextInput placeholder="Enter Company" />
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
							<!-- Add content for the "Documents" tab here -->
							<!-- Add document upload fields or any other content you want for this tab -->
							<div class="file-upload">
								<label for="file">Upload your resume</label>
								<input type="file" name="file" id="file" />
							</div>
							<div class="questions">
								<p class="services-header">Choose Services you would like to have?</p>
								{#each questions as question, i}
									<p class="question">{i + 1 + " ) " + question}</p>
								{/each}
							</div>
						</div>
					</Tabs.Tab>
				</Tabs>
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
