<script>
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	export let cardData;

	function chatSelected() {
		dispatch("chatSelected", cardData);
	}
</script>

<div class="container" on:click={chatSelected}>
	<div class="person">
		{#if cardData.imageUrl}
			<img src={cardData.imageUrl} alt="" />
		{:else}
			<div class="profile-image">
				<span class="initial">{cardData.userName[0].toUpperCase()}</span>
			</div>
		{/if}
		<div class="name-and-chat">
			<span class="name">{cardData.userName}</span>
			<!-- <span class="preview">{cardData.chat}</span> -->
		</div>

		<!-- <span class="time">{cardData.time}</span> -->
	</div>
</div>

<style>
	.container {
		padding: 0px 12px;
	}
	.person {
		position: relative;
		width: 100%;
		cursor: pointer;
		display: flex;
		align-items: center;
		border-bottom: 1px solid white;
		/* padding-bottom: 10px; */
		padding: 10px 0;
		gap: 8px;
	}

	img {
		float: left;
		width: 40px;
		height: 40px;
		margin-right: 12px;
		border-radius: 50%;
		object-fit: cover;
	}
	.name {
		font-size: 14px;
		line-height: 22px;
	}
	.time {
		font-size: 14px;
		position: absolute;
		top: 16px;
		right: 10%;
		padding: 0 0 5px 5px;
		color: grey;
		background-color: white;
	}
	.preview {
		font-size: 14px;
		display: inline-block;
		overflow: hidden !important;
		width: 70%;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: var(--grey);
	}

	.name-and-chat {
		/* display: flex;
		flex-direction: column;
		color: grey; */
	}
	.profile-image {
		width: 30px;
		height: 30px;
		background-color: #3498db; /* Background color for the image */
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		color: #ffffff; /* Text color */
	}
</style>
