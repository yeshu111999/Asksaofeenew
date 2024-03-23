<script>
	import { createEventDispatcher } from "svelte";
	export let imageUrl = "";
	export let resumeTitle = " Resume";
	export let resumeDescription = "Description";
	export let index = 0;

	let dispatch = createEventDispatcher();

	function showUpgradeToPro() {
		console.log("template selected");
		dispatch("upgradeToPro");
	}
</script>

<div class="container">
	<div class="image-wrapper">
		<img class="resume-img" src={imageUrl} alt="" />
		<div class="middle">
			<button on:click={showUpgradeToPro} class="use-template-btn"><p>Upgrade to unlock</p></button>
		</div>
	</div>
	<div class="text-content">
		<p class="title">{resumeTitle}</p>
		<!-- <p class="description">{resumeDescription}</p> -->
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
		width: 226px;
	}

	.title {
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 15px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.description {
		color: var(--secondary-text-color);
		font-family: Inter;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: 16px;
	}

	.image-wrapper {
		position: relative;
		height: 333px;
	}

	.resume-img {
		opacity: 1;
		display: block;
		height: 100%;
		width: 100%;
		transition: 0.5s ease;
		backface-visibility: hidden;
		border-radius: 4px;
		border: 1px solid #e1e1e1;
		background: lightgray 50%;
		filter: blur(4px);
	}

	.middle {
		transition: 0.5s ease;
		opacity: 1;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		text-align: center;
		border-radius: 4px;
		border: 1px solid #e1e1e1;
		background-color: rgba(0, 0, 0, 0.6);
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container:hover .resume-img {
		opacity: 1;
	}

	/* .container:hover .middle {
		opacity: 1;
	} */

	.use-template-btn {
		display: flex;
		padding: 12px 24px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 48px;
		background: var(--use-template-btn-color);
	}

	.use-template-btn p {
		color: var(--use-template-btn-text-color);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	@media (max-width: 900px) {
		.container .resume-img {
			opacity: 1;
		}

		.container .middle {
			opacity: 1;
		}
	}
</style>
