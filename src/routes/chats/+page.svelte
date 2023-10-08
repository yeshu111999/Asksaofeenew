<script>
	import { Input } from "@svelteuidev/core";
	import { MagnifyingGlass } from "radix-icons-svelte";
	import ChatCard from "$lib/components/ChatCard.svelte";

	let searchInput = "";

	let friendCards = [
		{
			name: "Virat Kohli",
			time: "2:00 PM",
			imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/louis-ck.jpeg",
			chat: "But we’re probably gonna need a new carpet.",
			id: "1",
		},
		{
			name: "Rohit Sharma",
			time: "9:00 AM",
			imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/louis-ck.jpeg",
			chat: "But we’re probably gonna need a new carpet.",
			id: "2",
		},
		{
			name: "Virat Kohli",
			time: "2:00 PM",
			imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/louis-ck.jpeg",
			chat: "But we’re probably gonna need a new carpet.",
			id: "3",
		},

		{
			name: "Virat Kohli",
			time: "2:00 PM",
			imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/louis-ck.jpeg",
			chat: "But we’re probably gonna need a new carpet.",
			id: "4",
		},
	];
</script>

<div class="wrapper">
	<div class="container">
		<div class="left-container">
			<p class="title">Messages</p>
			<Input
				icon={MagnifyingGlass}
				placeholder="Search friends"
				rightSectionWidth={70}
				styles={{ rightSection: { pointerEvents: "none" } }}
				bind:value={searchInput}
			/>
			<div class="list-of-friends">
				{#each friendCards as friendCard}
					<ChatCard cardData={friendCard} />
				{/each}
			</div>
		</div>
		<div class="right-container">
			<span class="chat-screen"> Chat screen </span>
		</div>
	</div>
</div>

<style>
	.wrapper {
		padding: 20px;
	}

	.container {
		display: flex;
		gap: 12px;
	}

	.left-container,
	.right-container {
		padding: 20px;
	}

	.left-container {
		padding: 20px;
		gap: 15px;
		display: flex;
		flex-direction: column;
	}
</style>
