<script>
	import PrivacyPolicy from "$lib/components/PrivacyPolicy.svelte";
	import CancellationAndRefundPolicy from "$lib/components/CancellationAndRefundPolicy.svelte";
	import TermsAndConditions from "$lib/components/TermsAndConditions.svelte";

	let tabs = ["Privacy Policy", "Terms and Conditions", "Cancellation and Refund Policy"];

	let activeTab = 0;

	function changeActiveTab(index) {
		activeTab = index;
		if (activeTab == 0) {
			scrollToSection("privacy-policy");
		} else if (activeTab == 1) {
			scrollToSection("terms-and-conditions");
		} else if (activeTab == 2) {
			scrollToSection("cancellation-and-refund-policy");
		}
	}

	// function scrollToSection(sectionId) {
	// 	// Update the active section and scroll to it
	// 	const section = document.querySelector(`#${sectionId}`);
	// 	if (section) {
	// 		section.scrollIntoView({ behavior: "smooth" });
	// 	}
	// }

	function scrollToSection(sectionId) {
		const container = document.querySelector(".right-body");
		const section = document.querySelector(`#${sectionId}`);
		if (container && section) {
			const offset = section.offsetTop - container.offsetTop;
			container.scrollTop = offset;
		}
	}
</script>

<div class=" container">
	<div class="left-body">
		{#each tabs as tab, i}
			<button
				on:click={() => {
					changeActiveTab(i);
				}}
				class="text-btn {activeTab == i ? 'active' : ''}"
			>
				<p>{tab}</p>
			</button>
		{/each}
	</div>
	<div class="right-body scrollbar-custom">
		<PrivacyPolicy />
		<CancellationAndRefundPolicy />
		<TermsAndConditions />
	</div>
</div>

<style>
	.container {
		padding: 00px 40px;
		display: flex;
	}

	.left-body {
		width: 177px;
		border-right: 1px solid #e1e1e1;
		padding-top: 8px;
	}

	.text-btn {
		display: flex;
		width: 177px;
		padding: 10px 16px;
		align-items: center;
		gap: 8px;
	}

	.text-btn p {
		color: rgba(0, 0, 0, 0.54);

		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 16px;
	}

	.text-btn.active p {
		color: rgba(0, 0, 0, 0.87);

		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 16px;
	}

	.right-body {
		height: 100vh;
		overflow-y: auto;
		padding: 40px;
	}
</style>
