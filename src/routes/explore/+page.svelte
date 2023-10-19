<script>
	import SectionWrapper from "$lib/components/SectionWrapper.svelte";
	import SectionAboutus from "$lib/components/SectionAboutus.svelte";
	import SectionBlogs from "$lib/components/SectionBlogs.svelte";
	import SectionFaQs from "$lib/components/SectionFAQs.svelte";
	import SectionContactUs from "$lib/components/SectionContactUs.svelte";
	import SectionHelp from "$lib/components/SectionHelp.svelte";
	import SectionPolicies from "$lib/components/SectionPolicies.svelte";
	import { theme } from "$lib/stores/theme";

	let contentSection;
	let activeTab = 0;
	let tabs = [
		{
			label: "About us",
		},
		{
			label: "Blogs",
		},
		{
			label: "FAQs",
		},
		{
			label: "Contact us",
		},
		{
			label: "Help",
		},
		{
			label: "Policies",
		},
	];

	$: activeContent = tabs[activeTab].label;
	function switchTab(index) {
		activeTab = index;
		if (contentSection) {
			contentSection.scrollTop = 0;
		}
	}
</script>

<div class="container">
	<SectionWrapper header="Explore">
		<div class={$theme == "dark" ? "labels dark" : "labels"}>
			{#each tabs as tab, index (tab.label)}
				<button class={activeTab === index ? "active " : " "} on:click={() => switchTab(index)}>
					{tab.label}
				</button>
			{/each}
		</div>
		<div class="content" bind:this={contentSection}>
			<div class="tab-content">
				{#if activeContent == "About us"}
					<div class="section-container">
						<SectionAboutus />
					</div>
				{:else if activeContent == "Blogs"}
					<div class="section-container">
						<SectionBlogs />
					</div>
				{:else if activeContent == "FAQs"}
					<div class="section-container">
						<SectionFaQs />
					</div>
				{:else if activeContent == "Contact us"}
					<div class="section-container">
						<SectionContactUs />
					</div>
				{:else if activeContent == "Policies"}
					<div class="section-container">
						<SectionPolicies />
					</div>
				{:else}
					<div class="section-container">
						<SectionHelp />
					</div>
				{/if}
			</div>
		</div>
	</SectionWrapper>
</div>

<style>
	.labels {
		display: flex;
		gap: 20px;
		overflow-x: auto;
		width: 100%;
		border-bottom: 1px solid #e2e0dc;
		padding-bottom: 12px;
		position: absolute;
		padding: 20px 40px 10px 40px;
		height: 80px;
	}

	.labels::-webkit-scrollbar {
		width: 0 !important;
		display: none;
	}
	.labels {
		overflow: -moz-scrollbars-none;
	}
	.labels {
		-ms-overflow-style: none;
	}

	.labels button {
		cursor: pointer;
		background: transparent;
		font-weight: bold;
		padding: 12px 28px;
		align-items: center;
		display: flex;
		border: none;
		justify-content: center;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: 24px;
		white-space: nowrap;
		color: #494742;
	}

	button.active {
		border-radius: 500px;
		background: #0b4374;
		color: white;
		color: var(--brand-colors-pure-white, #fff);
	}

	.dark button.active {
		background: white;
		color: #0b4374;
	}

	.section-container {
		padding-top: 12px;
	}

	.content {
		margin-top: 80px;
		height: 80vh;
		overflow-y: auto;
		padding: 0 40px 40px 40px;
	}
	/* :root {
		--primary-color: #185ee0;
		--secondary-color: #e6eef9;
	}

	*,
	*:after,
	*:before {
		box-sizing: border-box;
	}

	body {
		
		background-color: rgba(#e6eef9, 0.5);
	}
	.container {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tabs {
		display: flex;
		position: relative;
		background-color: #fff;
		box-shadow: 0 0 1px 0 rgba(#185ee0, 0.15), 0 6px 12px 0 rgba(#185ee0, 0.15);
		padding: 0.75rem;
		border-radius: 99px;
	}

	input[type="radio"] {
		display: none;
	}

	.tab {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 54px;
		width: 200px;
		font-size: 1.25rem;
		font-weight: 500;
		border-radius: 99px;
		cursor: pointer;
		transition: color 0.15s ease-in;
	}

	input[type="radio"] {
		&:checked {
			& + label {
				color: var(--primary-color);
				z-index: 9;
				& > .notification {
					background-color: var(--primary-color);
					color: #fff;
				}
			}
		}
	}

	input[id="radio-1"] {
		&:checked {
			& ~ .glider {
				transform: translateX(0);
			}
		}
	}

	input[id="radio-2"] {
		&:checked {
			& ~ .glider {
				transform: translateX(100%);
			}
		}
	}

	input[id="radio-3"] {
		&:checked {
			& ~ .glider {
				transform: translateX(200%);
			}
		}
	}

	input[id="radio-4"] {
		&:checked {
			& ~ .glider {
				transform: translateX(300%);
			}
		}
	}

	input[id="radio-5"] {
		&:checked {
			& ~ .glider {
				transform: translateX(400%);
			}
		}
	}

	.glider {
		position: absolute;
		display: flex;
		height: 54px;
		width: 200px;
		background-color: var(--secondary-color);
		z-index: 1;
		border-radius: 99px;
		transition: 0.25s ease-out;
	}

	@media (max-width: 700px) {
		.tabs {
			transform: scale(0.6);
		}
	} */
</style>
