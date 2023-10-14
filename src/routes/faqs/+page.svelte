<script>
	import SectionWrapper from "$lib/components/SectionWrapper.svelte";
	import { Card, Collapse } from "@svelteuidev/core";
	let collapseFlags = false;
</script>

<div class="container">
	<SectionWrapper header={"FAQs"}>
		<div style="width:100%">
			<div>
				<Card>
					<h3 on:click={() => (collapseFlags = !collapseFlags)}>
						1.How does immiGPT assist with family-sponsored visa applications?
					</h3>
				</Card>
				<Collapse open={collapseFlags}>
					<p>
						ImmiGPT provides a detailed breakdown of family-sponsored visa requirements and guides
						users through each step, ensuring all criteria are met.
					</p>
				</Collapse>
			</div>
		</div>
	</SectionWrapper>
</div>
