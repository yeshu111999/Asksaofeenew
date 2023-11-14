<!-- CookieConsent.svelte -->
<script>
	import { cookieConsent } from "$lib/stores/cookieConsent";
	import { Button, Modal } from "@svelteuidev/core";

	function closeCookieConsent() {
		cookieConsent.set(true);
	}
</script>

<!-- {#if !$cookieConsent} -->
<Modal opened={!$cookieConsent} withCloseButton={false} centered>
	<div class="cookie-consent">
		<p>
			This website uses cookies. By continuing to use this site, you consent to the use of cookies.
		</p>
		<Button on:click={closeCookieConsent}>Got it!</Button>
	</div>
</Modal>

<!-- {/if} -->
<style>
	.cookie-consent {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
