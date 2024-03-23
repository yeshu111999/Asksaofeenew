<script>
	import { createEventDispatcher } from "svelte";

	export let notificationType = "success";
	export let message = "Success !!";

	let dispatch = createEventDispatcher();
	export let showNotification = false;

	function closePopup() {
		showNotification = true;
		dispatch("closeNotification");
	}
</script>

{#if showNotification}
	<div class="overlay">
		<div class="popup">
			<div
				class="notification {notificationType == 'success' ? '-success' : ''}
        {notificationType == 'error' ? '-error' : ''}
        {notificationType == 'warning' ? '-warning' : ''}"
			>
				<img class="icon" src="/assets/icons/success.png" alt="" />
				<p class="message">{message}</p>
				<button class="close-btn" on:click={closePopup}>
					<img src="/assets/icons/close-icon-black.svg" alt="" />
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- <div class="notification -info">
	Info lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor. <strong
		>Pellentesque risus mi</strong
	>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam
	gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
</div>

<div class="notification -warning">
	Warning lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor. <strong
		>Pellentesque risus mi</strong
	>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam
	gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
</div>

<div class="notification -success">
	Success lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor. <strong
		>Pellentesque risus mi</strong
	>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam
	gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
</div>

<div class="notification -error">
	Error lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor. <strong
		>Pellentesque risus mi</strong
	>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam
	gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
</div> -->
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
		z-index: 99;
		opacity: 1;
	}

	.popup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-radius: 4px;
		/* background: var(--brand-colors-pure-white, #fff); */
		background: var(--secondary-background-color);
		width: auto;
		height: auto;
	}
	.notification {
		--notification-font-icon: "Font Awesome 6 Free";
		--notification-color: #283c5a;
		position: relative;
		background-color: color-mix(in srgb, var(--notification-color) 7%, white);
		border-width: 1px;
		border-style: solid;
		border-color: var(--notification-color);
		padding-block: 1.25rem;
		padding-inline: 3rem 1.25rem;
		border-radius: 4px;
		display: flex;
		align-items: center;
		gap: 40px;
	}
	/* .notification:before {
		position: absolute;
		left: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		content: "\f0f3";
		font-family: var(--notification-font-icon);
		font-weight: 700;
		font-size: 1.5rem;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--notification-color);
	} */

	.notification:after {
		position: absolute;
		content: "";
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 2rem;
		width: 3px;
		border-radius: 0 3px 3px 0;
		background-color: var(--notification-color);
	}

	.icon {
		width: 32px;
		height: 32px;
	}

	.notification.-info {
		--notification-color: #007bff;
	}
	.notification.-info:before {
		content: "\f05a";
	}
	.notification.-warning {
		--notification-color: #ffc107;
	}
	.notification.-warning:before {
		content: "\f06a";
	}
	.notification.-error {
		--notification-color: #dc3545;
	}
	.notification.-error:before {
		content: "\f071";
	}
	.notification.-success {
		--notification-color: #28a745;
	}
	/* .notification.-success:before {
		content: "\f058";
	} */
</style>
