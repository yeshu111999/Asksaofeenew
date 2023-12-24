<script>
	import { createEventDispatcher, onMount } from "svelte";
	import SectionAboutus from "./SectionAboutus.svelte";
	let dispatch = createEventDispatcher();
	export let showAboutUsPopup = false;

	function closePopup() {
		dispatch("closeAboutUsPopup");
	}
</script>

{#if showAboutUsPopup}
	<div class="overlay">
		<div class="popup">
			<div class="header">
				<p class="title">About Us</p>
				<button class="close-btn" on:click={closePopup}>
					<img src="/assets/icons/close-icon-black.svg" alt="" />
				</button>
			</div>
			<div class="body">
				<SectionAboutus />
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
		z-index: 1000;
		opacity: 1;
	}

	.popup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-radius: 4px;
		background: var(--brand-colors-pure-white, #fff);
		/* width: 65%; */
		/* height: auto; */
		max-width: 1240px;
		/* height: 80vh;
		overflow-y: auto; */
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
		height: 100%;
		padding: 24px;
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

	.buttons-wrapper {
		display: flex;
		gap: 12px;
		justify-content: flex-end;
	}

	.contact-details p {
		color: rgba(0, 0, 0, 0.87);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.contact-details p span.gray {
		color: rgba(0, 0, 0, 0.5);
	}

	@media (max-width: 1000px) {
		.popup {
			/* width: 70%; */
		}
	}

	@media (max-width: 600px) {
		.popup {
			/* width: 90%; */
			/* height: auto; */
			/* overflow-y: auto; */
		}
	}
</style>
