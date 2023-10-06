<!-- src/routes/Profile.svelte -->
<script>
	import { Card, TextInput, Button, PasswordInput } from "@svelteuidev/core";
	import Cookies from "js-cookie";
	import { onMount } from "svelte";
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
	let mobileNumber = "+91 7095240734";
	let email = "";
	let token = "";
	let saveChangesLoader = false;

	$: isDisableUpdate =
		oldName != name ||
		(oldPassword && newPassword && confirmPassword && newPassword == confirmPassword);
	let profileImageUrl = "https://picsum.photos/200/300";

	onMount(() => {
		name = Cookies.get("name");
		email = Cookies.get("email");
		token = Cookies.get("token");
		oldName = name;
	});
	function toggleEditing() {
		editing = !editing;

		// If entering edit mode, store the original values
		if (editing) {
			oldValues = fields.map((field) => ({ ...field }));
		}
	}

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
	<div class="card">
		<p class="title">Profile</p>
		<div class="card-body">
			{#if editing}
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
			{:else}
				<div class="profile-image-container">
					<img src={profileImageUrl} alt="Profile" class="profile-image" />
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
						on:click={toggleEditing}>Update Profile</Button
					>
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
	.card {
		width: 100%;
		padding: 5%;
		border-radius: 6px;
		background-color: rgb(31 41 55 / 0.3);
	}

	.card-body {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: center;
	}

	.container {
		max-width: 60%;
		margin: 0 auto;
		padding: 5vw;
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

	.profile-image {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		object-fit: cover;
	}

	.profile-image-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 18px;
		font-weight: bold;
	}
</style>
