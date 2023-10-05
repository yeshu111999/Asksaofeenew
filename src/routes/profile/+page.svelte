<!-- src/routes/Profile.svelte -->
<script>
	import { Card, TextInput, Button, PasswordInput } from "@svelteuidev/core";

	let editing = false;
	let oldValues = []; // Store the original values
	let fields = [
		{ name: "Name", value: "John Doe" },
		{ name: "Email", value: "john@example.com" },
		{ name: "Mobile", value: "123-456-7890" },
		{ name: "Password", value: "hello" },
	];

	let profileImageUrl = "https://picsum.photos/200/300";

	function toggleEditing() {
		editing = !editing;

		// If entering edit mode, store the original values
		if (editing) {
			oldValues = fields.map((field) => ({ ...field }));
		}
	}

	function saveChanges() {
		editing = false;
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
									bind:value={field.value}
									id="oldPassword"
								/>
								<PasswordInput
									type="text"
									placeholder="New Password"
									bind:value={field.value}
									id="newPassword"
								/>
								<PasswordInput
									type="text"
									placeholder="Confirm Password"
									bind:value={field.value}
									id="confirmPassword"
								/>
							</div>
						{:else}
							<TextInput
								placeholder={field.name}
								type="text"
								bind:value={field.value}
								id={field.name.toLowerCase()}
							/>
						{/if}
					</div>
				{/each}
				<div class="button-container">
					<Button
						variant="gradient"
						gradient={{ from: "grape", to: "pink", deg: 35 }}
						on:click={saveChanges}>Save Changes</Button
					>
				</div>
			{:else}
				<div class="profile-image-container">
					<img src={profileImageUrl} alt="Profile" class="profile-image" />
				</div>
				{#each fields as field (field.name)}
					<div>
						<label>{field.name}:</label>
						{#if field.name == "Password"}
							<span>******</span>
						{:else}
							<span>{field.value}</span>
						{/if}
					</div>
				{/each}
				<div class="button-container">
					<Button
						variant="gradient"
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
		background-color: #2e5984;
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
