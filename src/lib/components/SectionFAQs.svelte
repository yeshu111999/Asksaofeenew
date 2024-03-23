<script>
	import { Card, Collapse, ThemeIcon } from "@svelteuidev/core";
	import { ChevronDown, ChevronUp } from "radix-icons-svelte";
	let faqItems = [
		{
			question: "How does immiGPT assist with family-sponsored visa applications?",
			answer:
				"immiGPT provides a detailed breakdown of family-sponsored visa requirements and guides users through each step, ensuring all criteria are met.",
			collapsed: true,
		},
		{
			question: "Can immiGPT help me understand work visa options for specific countries?",
			answer:
				"Absolutely! Input your target country, and immiGPT will list out work visa options and detailed application procedures.",
			collapsed: true,
		},
		{
			question: "I'm facing deportation issues. Can immiGPT advise?",
			answer:
				"immiGPT offers insights on deportation defense strategies and connects users with recommended legal resources.",
			collapsed: true,
		},
		{
			question: "What assistance does immiGPT provide for student visa applications?",
			answer:
				"immiGPT provides a comprehensive guide on student visa requirements, documentation, and interview tips for various countries.",
			collapsed: true,
		},
		{
			question: "How can immiGPT help students seeking scholarships abroad?",
			answer:
				"Our platform offers guidance on scholarship application processes, eligibility criteria, and potential scholarship sources based on your study destination.",
			collapsed: true,
		},
		{
			question: "I am traveling for a conference. Can immiGPT guide on short-term travel visas?",
			answer:
				"Definitely! Enter your travel purpose and destination, and immiGPT will guide you through the short-term visa application process.",
			collapsed: true,
		},
		{
			question: "How can immiGPT assist with business immigration?",
			answer:
				"immiGPT offers detailed guidance on business immigration options, requirements, and the steps involved for entrepreneurs and investors.",
			collapsed: true,
		},
		{
			question: "I want to know about permanent residency options in Canada. Can immiGPT help?",
			answer:
				"Yes, immiGPT provides insights on various pathways to Canadian permanent residency, including the Express Entry system.",
			collapsed: true,
		},
		{
			question: "How does immiGPT assist refugees or asylum seekers?",
			answer:
				"We provide a step-by-step guide on the asylum application process, rights of refugees, and other essential resources.",
			collapsed: true,
		},
		{
			question: "I am an international student. Can immiGPT help with post-study work options?",
			answer:
				"Absolutely! immiGPT provides guidance on post-study work visa options, eligibility, and application processes for various countries.",
			collapsed: true,
		},
		{
			question: "How can I use immiGPT to understand dual citizenship regulations?",
			answer:
				"Input the countries in question, and immiGPT will provide comprehensive information on dual citizenship regulations, benefits, and potential challenges.",
			collapsed: true,
		},
		{
			question: "Can immiGPT guide on extending my visa stay?",
			answer:
				"Yes, immiGPT offers insights on visa extension procedures, required documentation, and timelines based on your visa type and country.",
			collapsed: true,
		},
		{
			question: "I wish to bring my pet while immigrating. Can immiGPT advise on this?",
			answer:
				"Of course! immiGPT provides guidelines on pet immigration rules, quarantine requirements, and other related procedures for various countries.",
			collapsed: true,
		},
		{
			question: "How does immiGPT assist students in finding accommodation abroad?",
			answer:
				"Our platform offers resources and tips for international students seeking safe, affordable, and convenient housing options in their study destination.",
			collapsed: true,
		},
		{
			question: "Is there a way immiGPT can help with cultural assimilation after immigration?",
			answer:
				"Yes, immiGPT provides cultural insights, local etiquette, and resources to help immigrants smoothly transition and assimilate into their new environment.",
			collapsed: true,
		},
		{
			question: "Can immiGPT help with understanding Green Card categories for the U.S.?",
			answer:
				"Yes, immiGPT offers a breakdown of various Green Card categories, including eligibility criteria and application procedures.",
			collapsed: true,
		},
		{
			question: "How does immiGPT aid those looking for internships as international students?",
			answer:
				"immiGPT provides resources on finding internships, understanding work restrictions on student visas, and converting internships into full-time opportunities.",
			collapsed: true,
		},
		{
			question: "I am considering an intra-company transfer. Can immiGPT guide on this?",
			answer:
				"Absolutely! immiGPT provides detailed insights on intra-company transfer visas, such as the L-1 for the U.S., and the criteria involved.",
			collapsed: true,
		},
		{
			question: "Does immiGPT have resources for understanding health insurance for immigrants?",
			answer:
				"Yes, we guide users on health insurance requirements, recommendations, and processes for various countries.",
			collapsed: true,
		},
		{
			question: "I am interested in citizenship by investment. Can immiGPT assist?",
			answer:
				"immiGPT offers guidance on countries that offer citizenship by investment, including the benefits, investment criteria, and application processes.",
			collapsed: true,
		},
		{
			question: "Can immiGPT help with understanding tax implications for immigrants?",
			answer:
				"Yes, our platform provides a general overview of tax responsibilities and implications for immigrants in various countries.",
			collapsed: true,
		},
		{
			question:
				"How can I get guidance on spouse visas and related family reunification visas with immiGPT?",
			answer:
				"Input your details, and immiGPT will guide you through spouse visa requirements, documentation, and application processes tailored to your target country.",
			collapsed: true,
		},
		{
			question: "Does immiGPT have insights on retirement visas for different countries?",
			answer:
				"Absolutely! We provide information on countries offering retirement visas, eligibility criteria, and application procedures.",
			collapsed: true,
		},
		{
			question: "Can immiGPT guide on immigration options for skilled professionals?",
			answer:
				"Yes, immiGPT offers guidance on skilled migration programs, points-based systems, and occupation lists for countries like Australia, Canada, and New Zealand.",
			collapsed: true,
		},
		{
			question:
				"I am a digital nomad. How can immiGPT assist with visas suitable for my lifestyle?",
			answer:
				"immiGPT provides insights on countries with digital nomad visa programs, their benefits, and application processes.",
			collapsed: true,
		},
		{
			question:
				"How does immiGPT help with understanding rights and obligations of different visa categories?",
			answer:
				"Our platform offers detailed insights into the rights, restrictions, and obligations attached to various visa categories for different countries.",
			collapsed: true,
		},
		{
			question: "Can immiGPT guide on immigration options for artists and entertainers?",
			answer:
				"Yes, we provide resources on visas tailored for artists, entertainers, and performers, highlighting eligibility and application procedures.",
			collapsed: true,
		},
		{
			question: "Does immiGPT offer guidance on appeal processes if my visa is denied?",
			answer:
				"Absolutely! We offer step-by-step guidance on appealing visa denials, providing resources and tips to enhance your chances on appeal.",
			collapsed: true,
		},
		{
			question: "I am considering setting up a startup in a foreign country. Can immiGPT assist?",
			answer:
				"Yes, immiGPT provides information on startup visas, investor programs, and other related pathways tailored for entrepreneurs.",
			collapsed: true,
		},
		{
			question:
				"Can I use immiGPT to understand the cultural nuances and local customs of my target country?",
			answer:
				"Definitely! Apart from immigration procedures, immiGPT offers cultural insights to help users understand and respect local customs and etiquettes in various countries.",
			collapsed: true,
		},
	];
	function toggleCollapse(index) {
		faqItems.map((item) => {
			item.collapsed = true;
		});
		if (faqItems[index].collapsed) {
			faqItems[index].collapsed = false;
		} else {
			faqItems[index].collapsed = true;
		}
	}
</script>

<div class="container">
	<div style="width:100%">
		{#each faqItems as faqItem, index (faqItem.question)}
			<div style="margin: 8px 0px 8px 0px;">
				<Card>
					<div
						class={!faqItem.collapsed ? "card-active" : ""}
						style="display: flex; flex-direction: row; justify-content: space-between;"
						on:click={() => toggleCollapse(index)}
					>
						<div style="font-weight: 600">
							{index + 1}. {faqItem.question}
						</div>
						<div>
							<ThemeIcon>
								{#if faqItem.collapsed}
									<ChevronDown />
								{:else}
									<ChevronUp />
								{/if}
							</ThemeIcon>
						</div>
					</div>
				</Card>
				<Collapse open={!faqItem.collapsed}>
					<p style="padding-right: 12px;">&nbsp;&nbsp;&nbsp;&nbsp;{faqItem.answer}</p>
				</Collapse>
			</div>
		{/each}
	</div>
</div>

<style>
	.card-active {
		/* background-color: gray;
		color: #fff; */
	}
</style>
