<script>
	import { Loader } from "@svelteuidev/core";
</script>

<div class="container">
	<Loader variant="circle" color="blue" />
</div>

<style>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999999;
		opacity: 1;
	}
</style>
