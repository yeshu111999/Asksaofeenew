<script>
	import { createEventDispatcher } from "svelte";
	export let cardData;
</script>

<div class="container">
	<div class="person">
		<img src={cardData.imageUrl} alt="" />
		<span class="name">{cardData.name}</span>
		<span class="time">{cardData.time}</span>
		<span class="preview">{cardData.chat}</span>
	</div>
</div>

<style>
	.person {
		position: relative;
		width: 100%;
		padding: 12px 10% 16px;
		cursor: pointer;
		background-color: white;
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
		color: black;
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
</style>
