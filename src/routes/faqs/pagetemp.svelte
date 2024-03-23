<script>
	import SectionWrapper from "$lib/components/SectionWrapper.svelte";
	import { Card, Collapse, ThemeIcon } from "@svelteuidev/core";
	import { ChevronDown, ChevronUp } from "radix-icons-svelte";
	let collapseFlags = false;
</script>

<div class="container">
	<SectionWrapper header={"FAQs"}>
		<div style="width:100%">
			<div>
				<Card>
					<div
						style="display: flex;flex-direction:row; justify-content:space-between;"
						on:click={() => (collapseFlags = !collapseFlags)}
					>
						<div style="font-weight:600">
							1. How does immiGPT assist with family-sponsored visa applications?
						</div>
						<div>
							<ThemeIcon>
								{#if collapseFlags}
									<ChevronDown />
								{:else}
									<ChevronUp />
								{/if}
							</ThemeIcon>
						</div>
					</div>
				</Card>
				<Collapse open={collapseFlags}>
					<p>
						ImmiGPT provides a detailed breakdown of family-sponsored visa requirements and guides
						users through each step, ensuring all criteria are met.
					</p>
				</Collapse>
			</div>
			<div>
				<Card>
					<div
						style="display: flex;flex-direction:row; justify-content:space-between;"
						on:click={() => (collapseFlags = !collapseFlags)}
					>
						<div style="font-weight:600">
							2. Can immiGPT help me understand work visa options for specific countries?
						</div>
						<div>
							<ThemeIcon>
								{#if collapseFlags}
									<ChevronDown />
								{:else}
									<ChevronUp />
								{/if}
							</ThemeIcon>
						</div>
					</div>
				</Card>
				<Collapse open={collapseFlags}>
					<p>
						Absolutely! Input your target country, and immiGPT will list out work visa options and
						detailed application procedures.
					</p>
				</Collapse>
			</div>
		</div>
	</SectionWrapper>
</div>
