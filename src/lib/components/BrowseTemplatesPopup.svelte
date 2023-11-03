<script>
	import { createEventDispatcher } from "svelte";
	import { Modal, Tabs, Tooltip } from "@svelteuidev/core";
	import { visaPrompt } from "$lib/stores/promptStore";

	import ResumeTemplate from "./BrowseTemplates/ResumeTemplate.svelte";

	// import { theme } from "$lib/stores/theme";
	import { theme } from "$lib/stores/theme";
	import { currentTheme } from "$lib/stores/themeStore";

	let dispatch = createEventDispatcher();
	export let showTemplatesPopup = false;
	export let showSelectedTemplate = false;
	let templates = [
		{
			type: "Student",
			resumeTemplates: [
				{
					imageUrl: "/assets/images/resumes/For-MS-in-Engineering-1.png",
					resumeTitle: "Statement of Purpose - For Students - MS",
					resumeDescription: "The Harvard template, updated for the 21st century, boasts a sleek",
					id: "student-1",
					tag: "SOP",
				},

				{
					imageUrl: "/assets/images/resumes/For-Scholarship.png",
					resumeTitle: "Statement of Purpose - For Students - Scholarship",
					resumeDescription: "The Harvard template, updated for the 21st century, boasts a sleek",
					id: "student-2",
					tag: "SOP",
				},

				{
					imageUrl: "/assets/images/resumes/Letter-of-Recommendation.png",
					resumeTitle: "Letter of Recommendation - For Students",
					resumeDescription: "The Harvard template, updated for the 21st century, boasts a sleek",
					id: "student-3",
				},
			],
		},
		{
			type: "Professional",
			resumeTemplates: [
				{
					imageUrl: "/assets/images/resumes/offer-letter.png",
					resumeTitle: "Offer Letter - For Professionals",
					resumeDescription: "The Harvard template, updated for the 21st century, boasts a sleek",
					id: "student-1",
				},

				{
					imageUrl: "/assets/images/resumes/OL.png",
					resumeTitle: "Offer Letter - For Professionals - Experienced",
					resumeDescription: "The Harvard template, updated for the 21st century, boasts a sleek",
					id: "student-1",
				},
			],
		},
		{
			type: "Tourists",
			resumeTemplates: [
				{
					imageUrl: "/assets/images/resumes/financial1.png",
					resumeTitle: "Letter of financial support",
					resumeDescription: "The Harvard template, updated for the 21st century, boasts a sleek",
					id: "student-1",
				},

				{
					imageUrl: "/assets/images/resumes/financial2.png",
					resumeTitle: "Financial support letter",
					resumeDescription: "The Harvard template, updated for the 21st century, boasts a sleek",
					id: "student-1",
				},
			],
		},
	];

	let activeTabIndex = 0;
	let themeVariable = "light";
	let selectedTemplate = templates[0].resumeTemplates[0];

	let showPreview = false;

	function openPreview() {
		showPreview = true;
	}

	function closePreview() {
		showPreview = false;
	}

	function closePopup() {
		dispatch("closeTemplatesPopup");
	}

	function closeShowTemplatePopup() {
		showSelectedTemplate = false;
		activeTabIndex = 0;
	}

	function selectedStudentTemplate(event) {
		let index = event.detail.index;
		selectedTemplate = templates[0].resumeTemplates[index];
		showSelectedTemplate = true;
		console.log("student template", index);
	}

	function selectedProfessionalTemplate(event) {
		let index = event.detail.index;
		selectedTemplate = templates[1].resumeTemplates[index];
		showSelectedTemplate = true;
	}

	function selectedTouristsTemplate(event) {
		let index = event.detail.index;
		selectedTemplate = templates[2].resumeTemplates[index];
		showSelectedTemplate = true;
	}

	function useTemplate() {
		let prompt =
			"I'm seeking your assistance in crafting a compelling Statement of Purpose (SOP). The SOP is a critical document for my application, and I'd like it to effectively convey my qualifications and aspirations to the admissions committee. Could you please help me by: 1. Providing a well-structured introduction for the SOP? 2. Creating a section that outlines my academic background, including my undergraduate degree and major. 3. Crafting a portion that explains my academic aspirations and why I'm interested in pursuing [Course Name] at [University Name]. 4. Describing any relevant research projects, internships, or academic projects I've been involved in. 5. Summarizing my work experience, specifying the organizations I've worked for and how this experience relates to my chosen course. 6. Outlining my career goals, both short-term and long-term, and explaining how the chosen course aligns with these goals. 7. Highlighting any unique qualities, skills, or achievements that make me a standout candidate. 8. Concluding the SOP with a strong closing statement. Ask me the necessary details that you'll require to write this SOP.";
		if (selectedTemplate.tag == "SOP") {
			visaPrompt.set(prompt);
		}
		closePopup();
	}

	$: activeTemplates = templates[activeTabIndex].resumeTemplates;

	const renderDescriptionTab = (event) => {
		const { index, key } = event.detail;
		console.log("index", index);
		activeTabIndex = index;
	};
</script>

{#if showTemplatesPopup}
	<div class="overlay">
		<div class="popup">
			{#if !showSelectedTemplate}
				<div class="header">
					<p class="title">Browse Templates</p>
					<button class="close-btn" on:click={closePopup}>
						<img src="/assets/icons/close-icon-black.svg" alt="" />
					</button>
				</div>
				<p class="description">
					Browse and choose a template from the available selection, We’ll generate the content
					based on the template you’ve choosen
				</p>
				<div class="body scrollbar-custom">
					<Tabs
						variant="default"
						color={$theme == "dark"
							? "rgba(255, 255, 255, 0.2)"
							: "var(--primary-btn-color)" + themeVariable == "dark"
							? "rgba(255, 255, 255, 0.2)"
							: "var(--primary-btn-color)"}
						on:change={renderDescriptionTab}
					>
						<Tabs.Tab
							label="Student"
							class={$theme == "light" ? "light" : "dark"}
							style={activeTabIndex == 0 ? "font-weight:500;" : ""}
						>
							{#if activeTabIndex == 0}
								<div class="tabDetailsWrapInternal">
									{#each activeTemplates as template, i}
										<ResumeTemplate
											on:selectedTemplate={selectedStudentTemplate}
											index={i}
											imageUrl={template.imageUrl}
											resumeTitle={template.resumeTitle}
											resumeDescription={template.resumeDescription}
										/>
									{/each}
								</div>
							{/if}
						</Tabs.Tab>
						<Tabs.Tab label="Professional" style={activeTabIndex == 1 ? "font-weight:500;" : ""}>
							{#if activeTabIndex == 1}
								<div class="tabDetailsWrapInternal">
									{#each activeTemplates as template, i}
										<ResumeTemplate
											on:selectedTemplate={selectedProfessionalTemplate}
											index={i}
											imageUrl={template.imageUrl}
											resumeTitle={template.resumeTitle}
											resumeDescription={template.resumeDescription}
										/>
									{/each}
								</div>
							{/if}
						</Tabs.Tab>
						<Tabs.Tab label="Tourist" style={activeTabIndex == 2 ? "font-weight:500;" : ""}>
							{#if activeTabIndex == 2}
								<div class="tabDetailsWrapInternal">
									{#each activeTemplates as template, i}
										<ResumeTemplate
											on:selectedTemplate={selectedTouristsTemplate}
											index={i}
											imageUrl={template.imageUrl}
											resumeTitle={template.resumeTitle}
											resumeDescription={template.resumeDescription}
										/>
									{/each}
								</div>
							{/if}
						</Tabs.Tab>
					</Tabs>
				</div>
			{:else if showSelectedTemplate}
				<div class="header">
					<button class="back-btn" on:click={closeShowTemplatePopup}
						><p class="title">Back to Templates</p></button
					>
					<button class="close-btn" on:click={closeShowTemplatePopup}>
						<img src="/assets/icons/close-icon-black.svg" alt="" />
					</button>
				</div>
				<div class="body template-body scrollbar-custom">
					<div class="left-body">
						<img class="resume-img" src={selectedTemplate.imageUrl} alt="" />
					</div>
					<div class="right-body">
						<div class="text-content">
							<p class="templateTitle">{selectedTemplate.resumeTitle}</p>
							<p class="templateDescription">{selectedTemplate.resumeDescription}</p>
						</div>
						<div class="buttons-wrapper">
							<!-- <Tooltip position="bottom" withArrow label="Preview" gutter={8}>
								<button class="preview-btn" on:click={openPreview}>
									<img src="/assets/icons/eye-icon-black.png" alt="" />
								</button>
							</Tooltip> -->
							<button class="use-template-btn" on:click={openPreview}><p>Preview</p></button>
							<button class="use-template-btn" on:click={useTemplate}><p>Use Template</p></button>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<Modal size="100%" opened={showPreview} on:close={closePreview}>
	<div class="preview-container">
		<img src={selectedTemplate.imageUrl} alt="template" />
	</div>
</Modal>

<style>
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
		z-index: 20;
		opacity: 1;
	}

	.popup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-radius: 4px;
		background: var(--brand-colors-pure-white, #fff);
		width: 60%;
		height: 95vh;
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

	.description {
		color: rgba(0, 0, 0, 0.54);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 19px;
		padding: 12px 16px;
	}

	.body {
		width: 100%;
		height: 100%;
		display: flex;
		padding: 16px;
		overflow-y: auto;
	}

	.tabDetailsWrapInternal {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		padding: 12px 0;
		/* justify-content: center; */
	}

	.template-body {
		display: flex;
		gap: 20px;
	}

	.templateTitle {
		color: #000;

		font-family: Inter;
		font-size: 24px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}

	.templateDescription {
		color: rgba(0, 0, 0, 0.45);

		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 16px;
	}

	.use-template-btn {
		border-radius: 48px;
		/* background: #000; */
		/* color: #fff; */
		background: var(--primary-btn-color);
		display: inline-flex;
		padding: 12px 24px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		width: fit-content;
	}

	.use-template-btn p {
		/* background: var(--primary-btn-color); */
		color: #fff;
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 600;
		/* line-height: normal; */
	}

	.right-body {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.resume-img {
		height: 760px;
		width: 600px;
		border-radius: 4px;
		border: 1px solid #e1e1e1;
	}

	.back-btn {
		border: none;
		background-color: transparent;
	}

	.buttons-wrapper {
		display: flex;
		gap: 12px;
	}

	.preview-btn img {
		width: 32px;
		height: 32px;
	}

	.preview-container {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.preview-container img {
		object-fit: cover;
	}

	@media (max-width: 900px) {
		.popup {
			width: 90%;
		}
	}

	@media (max-width: 600px) {
		.popup {
			width: 90%;
		}

		.template-body {
			flex-direction: column;
		}

		/* .template-body {
			justify-content: flex-end;
		} */

		.templateTitle {
			font-size: 18px;
		}

		.tabDetailsWrapInternal {
			justify-content: center;
		}

		.templateDescription {
			font-size: 14px;
		}

		.resume-img {
			width: auto;
			height: auto;
		}
	}
</style>
