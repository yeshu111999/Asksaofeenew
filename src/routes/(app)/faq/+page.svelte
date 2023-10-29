<script>
	import SectionWrapper from "$lib/components/SectionWrapper.svelte";
	import { Card, Collapse, ThemeIcon, Grid } from "@svelteuidev/core";
	import { ChevronDown, ChevronUp, Padding } from "radix-icons-svelte";
	let collapseFlags = false;

	let faqList = [
		{
			faqTitle: "How does immiGPT assist with family-sponsored visa applications?",
			faqDesc:
				"immiGPT provides a detailed breakdown of family-sponsored visa requirements and guides users through each step, ensuring all criteria are met.",
			isOpen: false,
		},
		{
			faqTitle: "Can immiGPT help me understand work visa options for specific countries?",
			faqDesc:
				"Absolutely! Input your target country, and immiGPT will list out work visa options and detailed application procedures.",
			isOpen: false,
		},
		{
			faqTitle: "I'm facing deportation issues. Can immiGPT advise?",
			faqDesc:
				"immiGPT offers insights on deportation defense strategies and connects users with recommended legal resources.",
			isOpen: false,
		},
		{
			faqTitle: "What assistance does immiGPT provide for student visa applications?",
			faqDesc:
				"immiGPT provides a comprehensive guide on student visa requirements, documentation, and interview tips for various countries.",
			isOpen: false,
		},
		{
			faqTitle: "How can immiGPT help students seeking scholarships abroad?",
			faqDesc:
				"Our platform offers guidance on scholarship application processes, eligibility criteria, and potential scholarship sources based on your study destination.",
			isOpen: false,
		},
		{
			faqTitle: "I am traveling for a conference. Can immiGPT guide on short-term travel visas?",
			faqDesc:
				"Definitely! Enter your travel purpose and destination, and immiGPT will guide you through the short-term visa application process.",
			isOpen: false,
		},
		{
			faqTitle: "How can immiGPT assist with business immigration?",
			faqDesc:
				"immiGPT offers detailed guidance on business immigration options, requirements, and the steps involved for entrepreneurs and investors.",
			isOpen: false,
		},
		{
			faqTitle: "I want to know about permanent residency options in Canada. Can immiGPT help?",
			faqDesc:
				"Yes, immiGPT provides insights on various pathways to Canadian permanent residency, including the Express Entry system.",
			isOpen: false,
		},
		{
			faqTitle: "How does immiGPT assist refugees or asylum seekers?",
			faqDesc:
				"We provide a step-by-step guide on the asylum application process, rights of refugees, and other essential resources.",
			isOpen: false,
		},
		{
			faqTitle: "I am an international student. Can immiGPT help with post-study work options?",
			faqDesc:
				"Absolutely! immiGPT provides guidance on post-study work visa options, eligibility, and application processes for various countries.",
			isOpen: false,
		},
		{
			faqTitle: "How can I use immiGPT to understand dual citizenship regulations?",
			faqDesc:
				"Input the countries in question, and immiGPT will provide comprehensive information on dual citizenship regulations, benefits, and potential challenges.",
			isOpen: false,
		},
		{
			faqTitle: "Can immiGPT guide on extending my visa stay?",
			faqDesc:
				"Yes, immiGPT offers insights on visa extension procedures, required documentation, and timelines based on your visa type and country.",
			isOpen: false,
		},
		{
			faqTitle: "I wish to bring my pet while immigrating. Can immiGPT advise on this?",
			faqDesc:
				"Of course! immiGPT provides guidelines on pet immigration rules, quarantine requirements, and other related procedures for various countries.",
			isOpen: false,
		},
		{
			faqTitle: "How does immiGPT assist students in finding accommodation abroad?",
			faqDesc:
				"Our platform offers resources and tips for international students seeking safe, affordable, and convenient housing options in their study destination.",
			isOpen: false,
		},
		{
			faqTitle: "Is there a way immiGPT can help with cultural assimilation after immigration?",
			faqDesc:
				"Yes, immiGPT provides cultural insights, local etiquette, and resources to help immigrants smoothly transition and assimilate into their new environment.",
			isOpen: false,
		},
		{
			faqTitle: "Can immiGPT help with understanding Green Card categories for the U.S.?",
			faqDesc:
				"Yes, immiGPT offers a breakdown of various Green Card categories, including eligibility criteria and application procedures.",
			isOpen: false,
		},
		{
			faqTitle: "How does immiGPT aid those looking for internships as international students?",
			faqDesc:
				"immiGPT provides resources on finding internships, understanding work restrictions on student visas, and converting internships into full-time opportunities.",
			isOpen: false,
		},
		{
			faqTitle: "I am considering an intra-company transfer. Can immiGPT guide on this?",
			faqDesc:
				"Absolutely! immiGPT provides detailed insights on intra-company transfer visas, such as the L-1 for the U.S., and the criteria involved.",
			isOpen: false,
		},
		{
			faqTitle: "Does immiGPT have resources for understanding health insurance for immigrants?",
			faqDesc:
				"Yes, we guide users on health insurance requirements, recommendations, and processes for various countries.",
			isOpen: false,
		},
		{
			faqTitle: "I am interested in citizenship by investment. Can immiGPT assist?",
			faqDesc:
				"immiGPT offers guidance on countries that offer citizenship by investment, including the benefits, investment criteria, and application processes.",
			isOpen: false,
		},
		{
			faqTitle: "Can immiGPT help with understanding tax implications for immigrants?",
			faqDesc:
				"Yes, our platform provides a general overview of tax responsibilities and implications for immigrants in various countries.",
			isOpen: false,
		},
		{
			faqTitle:
				"How can I get guidance on spouse visas and related family reunification visas with immiGPT?",
			faqDesc:
				"Input your details, and immiGPT will guide you through spouse visa requirements, documentation, and application processes tailored to your target country.",
			isOpen: false,
		},
		{
			faqTitle: "Does immiGPT have insights on retirement visas for different countries?",
			faqDesc:
				"Absolutely! We provide information on countries offering retirement visas, eligibility criteria, and application procedures.",
			isOpen: false,
		},
		{
			faqTitle: "Can immiGPT guide on immigration options for skilled professionals?",
			faqDesc:
				"Yes, immiGPT offers guidance on skilled migration programs, points-based systems, and occupation lists for countries like Australia, Canada, and New Zealand.",
			isOpen: false,
		},
		{
			faqTitle:
				"I am a digital nomad. How can immiGPT assist with visas suitable for my lifestyle?",
			faqDesc:
				"immiGPT provides insights on countries with digital nomad visa programs, their benefits, and application processes.",
			isOpen: false,
		},
		{
			faqTitle:
				"How does immiGPT help with understanding rights and obligations of different visa categories?",
			faqDesc:
				"Our platform offers detailed insights into the rights, restrictions, and obligations attached to various visa categories for different countries.",
			isOpen: false,
		},
		{
			faqTitle: "Can immiGPT guide on immigration options for artists and entertainers?",
			faqDesc:
				"Yes, we provide resources on visas tailored for artists, entertainers, and performers, highlighting eligibility and application procedures.",
			isOpen: false,
		},
		{
			faqTitle: "Does immiGPT offer guidance on appeal processes if my visa is denied?",
			faqDesc:
				"Absolutely! We offer step-by-step guidance on appealing visa denials, providing resources and tips to enhance your chances on appeal.",
			isOpen: false,
		},
		{
			faqTitle: "I am considering setting up a startup in a foreign country. Can immiGPT assist?",
			faqDesc:
				"Yes, immiGPT provides information on startup visas, investor programs, and other related pathways tailored for entrepreneurs.",
			isOpen: false,
		},
		{
			faqTitle:
				"Can I use immiGPT to understand the cultural nuances and local customs of my target country?",
			faqDesc:
				"Definitely! Apart from immigration procedures, immiGPT offers cultural insights to help users understand and respect local customs and etiquettes in various countries.",
			isOpen: false,
		},
	];

	function toggleCollapse(index) {
		faqList.map((item) => {
			item.isOpen = false;
		});
		if (faqList[index].isOpen) {
			faqList[index].isOpen = false;
		} else {
			faqList[index].isOpen = true;
		}
	}
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
			{#each faqList as faq, index}
				<div class="faqQuestionSingleWrap" on:click={() => toggleCollapse(index)}>
					<div class="faqQuestion">
						<span class="faqQuestionText">
							<b>{faq.faqTitle}</b>
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
						<div class="faqAnswer">
							{faq.faqDesc}
						</div>
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
		/* border: #e1e1e1 solid 1px; */
		border-radius: 8px;
	}
	.faqAnswer {
		padding: 0 16px 16px 16px;
	}

	.faqQuestionSingleWrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
		border: #e1e1e1 solid 1px;
	}
</style>
