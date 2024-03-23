<script>
	export let title = "hello";
</script>

<div class="container">
	<div class="icon-wrapper">
		<img src="/assets/icons/faq-icon.svg" alt="faq" />
	</div>
	<div class="text-content">
		<p class="title">{title}</p>
		<slot />
	</div>
</div>

<style>
	.container {
		display: flex;
		padding: 20px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
		border-radius: 12px;
		border: var(--primary-border);
		background: var(--secondary-card-color);
		width: 270px;
		height: 100%;
		cursor: pointer;
	}

	.text-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.title {
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		text-align: center;
	}

	.icon-wrapper {
		display: flex;
		width: 56px;
		height: 56px;
		padding: 12px;
		justify-content: center;
		align-items: center;
		border-radius: 32px;
		/* background-color: aqua; */
		/* background: #323232; */
		background: var(--primary-btn-color);
	}
</style>
