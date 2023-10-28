<script>
	import SectionWrapper from "$lib/components/SectionWrapper.svelte";
	import { Card, Collapse, ThemeIcon, Grid } from "@svelteuidev/core";
	import { ChevronDown, ChevronUp } from "radix-icons-svelte";
	let collapseFlags = false;

	let faqList = [
		{
			faqTitle: "How does immiGPT assist with family-sponsored visa applications?",
			faqDesc: `Avatar: The Last Airbender, also known as Avatar: The Legend of Aang in some PAL regions,
					is an Emmy award-winning American animated television series that aired for three seasons
					on Nickelodeon and the Nicktoons Network. The series was created and produced by Michael
					Dante DiMartino and Bryan Konietzko, who served as executive producers along with Aaron
					Ehasz. Avatar is set in an Asian-influenced world of martial arts and elemental
					manipulation. The show drew on elements from East Asian, South Asian, and Western culture,
					making it a mixture of what were previously traditionally separate categories of Japanese
					anime and Western domestic cartoons.`,
			isOpen: false,
		},
		{
			faqTitle: "How does immiGPT assist with family-sponsored visa applications?",
			faqDesc: `Avatar: The Last Airbender, also known as Avatar: The Legend of Aang in some PAL regions,
					is an Emmy award-winning American animated television series that aired for three seasons
					on Nickelodeon and the Nicktoons Network. The series was created and produced by Michael
					Dante DiMartino and Bryan Konietzko, who served as executive producers along with Aaron
					Ehasz. Avatar is set in an Asian-influenced world of martial arts and elemental
					manipulation. The show drew on elements from East Asian, South Asian, and Western culture,
					making it a mixture of what were previously traditionally separate categories of Japanese
					anime and Western domestic cartoons.`,
			isOpen: false,
		},
		{
			faqTitle: "How does immiGPT assist with family-sponsored visa applications?",
			faqDesc: `Avatar: The Last Airbender, also known as Avatar: The Legend of Aang in some PAL regions,
					is an Emmy award-winning American animated television series that aired for three seasons
					on Nickelodeon and the Nicktoons Network. The series was created and produced by Michael
					Dante DiMartino and Bryan Konietzko, who served as executive producers along with Aaron
					Ehasz. Avatar is set in an Asian-influenced world of martial arts and elemental
					manipulation. The show drew on elements from East Asian, South Asian, and Western culture,
					making it a mixture of what were previously traditionally separate categories of Japanese
					anime and Western domestic cartoons.`,
			isOpen: false,
		},
		{
			faqTitle: "How does immiGPT assist with family-sponsored visa applications?",
			faqDesc: `Avatar: The Last Airbender, also known as Avatar: The Legend of Aang in some PAL regions,
					is an Emmy award-winning American animated television series that aired for three seasons
					on Nickelodeon and the Nicktoons Network. The series was created and produced by Michael
					Dante DiMartino and Bryan Konietzko, who served as executive producers along with Aaron
					Ehasz. Avatar is set in an Asian-influenced world of martial arts and elemental
					manipulation. The show drew on elements from East Asian, South Asian, and Western culture,
					making it a mixture of what were previously traditionally separate categories of Japanese
					anime and Western domestic cartoons.`,
			isOpen: false,
		},
	];
</script>

<div class="containerGridWrap scrollbar-custom">
	<div class="containerGrid ">
		<div class="facTitleWrap">
			<span class="faqTitle">Help Centre</span>
			<p class="faqDesc">
				Navigating through immigration processes can sometimes be overwhelming, but with
				immiGPT.net, you're never alone. Here's how we're equipped to assist you.
			</p>
		</div>
		<div class="faqCardWrap">
			<div style="width: 280px; height: 100px; background: #F0F0F0; border-radius: 12px" />
			<div style="width: 280px; height: 100px; background: #F0F0F0; border-radius: 12px" />
			<div style="width: 280px; height: 100px; background: #F0F0F0; border-radius: 12px" />
			<div style="width: 280px; height: 100px; background: #F0F0F0; border-radius: 12px" />
			<div style="width: 280px; height: 100px; background: #F0F0F0; border-radius: 12px" />
			<div style="width: 280px; height: 100px; background: #F0F0F0; border-radius: 12px" />
		</div>
		<div class="facTitleWrap">
			<span class="faqTitle">Frequently Asked Questions</span>
			<p class="faqDesc">
				Navigating through immigration processes can sometimes be overwhelming, but with
				immiGPT.net, you're never alone. Here's how we're equipped to assist you.
			</p>
		</div>
		<div class="faqQuestionWrap">
			{#each faqList as faq}
				<div class="faqQuestionSingleWrap" on:click={() => (faq.isOpen = !faq.isOpen)}>
					<div class="faqQuestion">
						<span class="faqQuestionText">
							{faq.faqTitle}
						</span>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 6L8 10L12 6"
								stroke="#323739"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
					<Collapse open={faq.isOpen}>
						{faq.faqDesc}
					</Collapse>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.containerGridWrap {
		width: 100%;
		padding: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: calc(100vh - 70px);
		overflow-y: auto;
	}

	.containerGrid {
		width: 80%;
		padding: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.facTitleWrap {
		width: 100%;
		padding: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.faqTitle {
		color: #222;
		font-size: 32px;
		font-weight: 600;
		font-family: Inter;
	}

	.faqDesc {
		color: rgba(0, 0, 0, 0.5);
		font-size: 14px;
		font-family: Inter;
		font-weight: 400;
		line-height: 20px;
	}

	.faqCardWrap {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		width: 100%;
		justify-content: center;
	}

	.faqQuestionWrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}

	.faqQuestion {
		width: 100%;
		padding: 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: #e1e1e1 solid 1px;
		border-radius: 8px;
	}

	.faqQuestionSingleWrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
