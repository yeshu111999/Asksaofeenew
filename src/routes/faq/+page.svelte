<script>
	import SectionWrapper from "$lib/components/SectionWrapper.svelte";
	import { Card, Collapse, ThemeIcon, Grid, Button, TextInput, Textarea } from "@svelteuidev/core";
	import { ChevronDown, ChevronUp, Padding } from "radix-icons-svelte";
	import HelpCentreCard from "$lib/components/helpCentre/HelpCentreCard.svelte";
	import RaiseAnIssuePopup from "$lib/components/RaiseAnIssuePopup.svelte";
	let collapseFlags = false;
	let showRaiseAnIssuePopup = false;

	let cards = [
		{
			title: "Platform Guide",
			description:
				"If you're new to immiGPT, our user-friendly interface is designed for ease. But should you need it, we offer step-by-step guides to help you maximize our platform's potential.",
		},
		{
			title: "FAQ’s",
			description:
				"Dive into our comprehensive Frequently Asked Questions section, where we've addressed many common queries ranging from visa applications to cultural assimilation.",
		},
		{
			title: "Email & Support",
			description:
				"Can't find an answer in our FAQs? Our dedicated support team is just an email away. Drop us a message at hello@immiGPT.net with your queries, and we promise a swift response.",
		},
		{
			title: "Technical Issues",
			description:
				"Your insights drive our improvements. If you have suggestions or feedback about our platform, its features, or any other aspect of our service, we want to hear from you.",
		},
		{
			title: "Feedback and Suggestions",
			description:
				"Experiencing glitches or technical hiccups? Report them directly to our tech team, and we'll work diligently to resolve them in the quickest timeframe possible.",
		},
	];

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

	let showAll = false;

	function toggleShowAll() {
		showAll = !showAll;
	}

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

	function openRaiseAnIssuePopup(title) {
		if (title == "Feedback and Suggestions") {
			showRaiseAnIssuePopup = true;
		}
	}

	function closeRaiseAnIssuePopup() {
		showRaiseAnIssuePopup = false;
	}
</script>

<div class="containerGridWrap scrollbar-custom">
	<div class="containerGrid ">
		<div class="help-centre-wrapper">
			<div class="facTitleWrap">
				<span class="faqTitle">Help Centre</span>
				<p class="faqDesc">
					Navigating through immigration processes can sometimes be overwhelming, but with
					immiGPT.net, you're never alone. Here's how we're equipped to assist you.
				</p>
			</div>
			<div class="faqCardWrap">
				{#each cards as card, i}
					<div on:click={() => openRaiseAnIssuePopup(card.title)}>
						<HelpCentreCard style="height:100%;" title={card.title}>
							{#if i != 2}
								<p class="card-description">
									{card.description}
								</p>
							{:else}
								<p class="card-description">
									<span
										>Can't find an answer in our FAQs? Our dedicated support team is just an email
										away. Drop us a message at <a href="mailto:hello@immiGPT.net"
											>hello@immiGPT.net</a
										> with your queries, and we promise a swift response.</span
									>
								</p>
							{/if}
						</HelpCentreCard>
					</div>
				{/each}
			</div>
		</div>
		<div class="faq-wrapper">
			<div class="facTitleWrap">
				<span class="faqTitle">Frequently Asked Questions</span>
				<p class="faqDesc">
					Navigating through immigration processes can sometimes be overwhelming, but with
					immiGPT.net, you're never alone. Here's how we're equipped to assist you.
				</p>
			</div>
			<div class="faqQuestionWrap">
				{#if !showAll}
					{#each faqList.slice(0, 5) as faq, index}
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
				{:else}
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
				{/if}
			</div>
			{#if !showAll}
				<Button color="#e4e4e4" on:click={toggleShowAll} ripple style="color:black;"
					>Show More</Button
				>
			{:else}
				<Button color="#e4e4e4" on:click={toggleShowAll} ripple style="color:black;"
					>Show Less</Button
				>
			{/if}
		</div>
	</div>
</div>
<RaiseAnIssuePopup {showRaiseAnIssuePopup} on:closeRaiseAnIssuePopup={closeRaiseAnIssuePopup} />

<style>
	.containerGridWrap {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		overflow-y: auto;
	}

	.containerGrid {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	.faq-wrapper {
		width: 100%;
		padding: 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}
	.help-centre-wrapper {
		padding: 32px;
		background: #fafafa;
	}

	.facTitleWrap {
		width: 100%;
		padding: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
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
		text-align: center;
	}

	.faqCardWrap {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		width: 100%;
		justify-content: center;
	}

	.faqQuestionWrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 80%;
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

	.card-description {
		color: rgba(0, 0, 0, 0.5);
		text-align: center;
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 157.143% */
	}

	.card-description a {
		color: rgba(0, 55, 198, 0.8);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		text-decoration-line: underline;
	}
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
		opacity: 1;
	}

	.popup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-radius: 4px;
		background: var(--brand-colors-pure-white, #fff);
		width: auto;
		height: auto;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
		height: 100%;
		padding: 24px;
	}

	.header {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e1e1e1;
	}

	.title {
		color: #000;
		font-family: Inter;
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.buttons-wrapper {
		display: flex;
		gap: 12px;
		justify-content: flex-end;
	}

	.contact-details p {
		color: rgba(0, 0, 0, 0.87);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.contact-details p span.gray {
		color: rgba(0, 0, 0, 0.5);
	}
</style>
