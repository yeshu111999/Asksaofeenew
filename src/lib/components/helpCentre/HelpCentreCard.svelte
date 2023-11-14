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
		border: 1px solid #e1e1e1;
		background: #fff;
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
		color: #323232;
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
