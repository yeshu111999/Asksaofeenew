<script>
	import { afterUpdate, createEventDispatcher, onMount } from "svelte";
	import { Modal, Tabs, TextInput, Textarea, Tooltip, Button } from "@svelteuidev/core";
	import { visaPrompt } from "$lib/stores/promptStore";
	import axios from "axios";
	import Cookies from "js-cookie";

	import ResumeTemplate from "./BrowseTemplates/ResumeTemplate.svelte";
	import DuplicateResumeTemplate from "./BrowseTemplates/DuplicateResumeTemplate.svelte";
	import { ActionIcon } from "@svelteuidev/core";
	import { ThickArrowLeft } from "radix-icons-svelte";

	// import { theme } from "$lib/stores/theme";
	import { theme } from "$lib/stores/theme";
	import { currentTheme } from "$lib/stores/themeStore";

	let dispatch = createEventDispatcher();
	export let showTemplatesPopup = false;
	export let showSelectedTemplate = false;

	// let templates = [];

	function showUpgradeToPro() {
		console.log("template selected");
		showTemplatesPopup = false;
		showSelectedTemplate = false;
		dispatch("upgradeToPro");
	}

	let templates = [];

	templates = [
		{
			resumeTemplates: [
				{
					imageUrl: [
						"/assets/images/templates/Student/SOPs/SOP Highlighting Academic Background.jpeg",
					],
					resumeTitle: "SOP Highlighting Academic Background",
					resumeDescription: "",
					id: "student-1",
					tag: "SOP",
					inputFields: [
						{
							name: "Degree Name",
							label: "Ex: Masters",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Course Name",
							label: "Ex: Data Science",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "University Name",
							label: "Ex: Buffalo",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Academic Background Details",
							label: "Ex: Degree obtained, GPA, Courses, Projects",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Additional Details",
							label: "Ex: Achievements, Related Work, Future goals",
							fieldType: "textarea",
							fieldValue: "",
						},
					],
					prompt:
						"Generate a Statement of Purpose (SOP) for my application to the [fieldValue1] in [fieldValue2] program at [fieldValue3]. These are my Academic details - [fieldValue4]. [fieldValue5]. Please craft a personalized SOP by highlighting my Academic background.Please don't mention yourself as an immigration officer.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Student/SOPs/SOP Highlighting Work Experience and Career Goals.jpeg",
					],
					resumeTitle: "SOP Highlighting Work Experience and Career Goals",
					resumeDescription: "",
					id: "student-2",
					tag: "SOP",
					inputFields: [
						{
							name: "Degree Name",
							label: "Ex: Masters",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Course Name",
							label: "Ex: Data Science",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "University Name",
							label: "Ex: Buffalo",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Academic Background Details",
							label: "Ex: Degree obtained, GPA, Courses, Projects",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Work Experience Details",
							label: "Ex: Company, Position, Duration",
							fieldType: "textarea",
							fieldValue: "",
						},
						{
							name: "Career Goals",
							label: "Ex: Short-term and Long-term goals",
							fieldType: "textarea",
							fieldValue: "",
						},
						{
							name: "Additional Details",
							label: "Ex: None, Achievements, Career Goals ",
							fieldType: "textarea",
							fieldValue: "",
						},
					],
					prompt:
						"Generate a Statement of Purpose (SOP) for my application to the [fieldValue1] in [fieldValue2] program at [fieldValue3]. These are my Academic details - [fieldValue4]. These are the details on my work experience - [fieldValue5]. My career goals are [fieldValue6]. [fieldValue7]. Please craft a personalized SOP by highlighting my Work Experience and Career Goals.Please don't mention yourself as an immigration officer.",
				},
			],
			_id: {
				timestamp: 1701492239,
				date: "2023-12-02T04:43:59.000+00:00",
			},
			type: "Student",
		},
		{
			resumeTemplates: [
				{
					imageUrl: ["/assets/images/templates/Professional/Academic Offer Letter.jpeg"],
					resumeTitle: "Academic Offer Letter",
					resumeDescription: "",
					id: "professional-1",
					tag: "Professional",
					inputFields: [
						{
							name: "Program Name",
							label: "Ex: Master of Science in Computer Science",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "University Name",
							label: "Ex: XYZ University",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Country Name",
							label: "Ex: United States",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Start Date",
							label: "Ex: August 1, 2023",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Duration",
							label: "Ex: 2 years",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Tuition Fees",
							label: "Ex: $10,000 per semester",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Scholarship/Financial Aid",
							label: "Ex: Merit-based scholarship",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Additional Details",
							label: "Ex: Any other relevant information",
							fieldType: "textarea",
							fieldValue: "",
						},
					],
					prompt:
						"Generate an Academic offer letter to the student with the following Course details - Program Name - [fieldValue1], University Name - [fieldValue2], Country Name - [fieldValue3], Start Date - [fieldValue4], Duration - [fieldValue5], Tuition Fees - $ [fieldValue6] per semester, Scholarship/Financial Aid - [fieldValue7], Additional Details - [fieldValue8]. Please don't mention yourself as an immigration officer.",
				},
				{
					imageUrl: ["/assets/images/templates/Professional/Employment Offer Letter.jpeg"],
					resumeTitle: "Employment Offer Letter",
					resumeDescription: "",
					id: "professional-2",
					tag: "Professional",
					inputFields: [
						{
							name: "Job Title",
							label: "Ex: Software Engineer",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Company Name",
							label: "Ex: ABC Tech Solutions",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Start Date",
							label: "Ex: August 15, 2023",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Salary per year",
							label: "Ex: $80,000",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Benefits",
							label: "Ex: Health insurance, Retirement plan",
							fieldType: "textarea",
							fieldValue: "",
						},
						{
							name: "Vacation Time (No.of days per year)",
							label: "Ex: 15 days",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Holidays (List holidays observed by the company)",
							label: "Ex: New Year's Day, Independence Day",
							fieldType: "textarea",
							fieldValue: "",
						},
						{
							name: "Additional Details (Tasks and Responsibilities)",
							label: "Ex: Project management, Coding tasks",
							fieldType: "textarea",
							fieldValue: "",
						},
					],
					prompt:
						"Generate an employment offer letter with the following terms of the offer - Job Title - [fieldValue1], Company Name - [fieldValue2], Start Date - [fieldValue3], Salary per year - [fieldValue4], Benefits - [fieldValue5], Vacation Time (No.of days per year) - [fieldValue6], Holidays (List holidays observed by the company) - [fieldValue7], Additional Details (Tasks and Responsibilities) - [fieldValue8]. Please don't mention yourself as an immigration officer.",
				},
			],
			_id: {
				timestamp: 1701492239,
				date: "2023-12-02T04:43:59.000+00:00",
			},
			type: "Professional",
		},
		{
			resumeTemplates: [
				{
					imageUrl: [
						"/assets/images/templates/Tourist/Financial Support Letter - Self-Financed.jpeg",
					],
					resumeTitle: "Financial Support Letter - Self-Financed",
					resumeDescription: "",
					id: "tourist-1",
					tag: "Tourist",
					inputFields: [
						{
							name: "Name",
							label: "Ex: John Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Destination Country",
							label: "Ex: France",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						"Generate a brief financial support letter for a self-sponsored tourist visa application for [fieldValue1] travelling to [fieldValue2].Please don't mention yourself as an immigration officer.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Tourist/Financial Support Letter from Employer.jpeg",
					],
					resumeTitle: "Financial Support Letter from Employer",
					resumeDescription: "",
					id: "tourist-2",
					tag: "Tourist",
					inputFields: [
						{
							name: "Company Name",
							label: "Ex: XYZ Corp",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Name of the Applicant",
							label: "Ex: Jane Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Destination Country",
							label: "Ex: Italy",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						"Generate a brief financial support letter on behalf of the applicant's employer to support their tourism plans by using the following details - Company Name - [fieldValue1], Name of the Applicant - [fieldValue2], Destination Country - [fieldValue3]. Please don't mention yourself as an immigration officer.",
				},
			],
			_id: {
				timestamp: 1701492239,
				date: "2023-12-02T04:43:59.000+00:00",
			},
			type: "Tourists",
		},
	];
	const getTemplates = async () => {
		let headers = {
			Authorization: "Bearer " + Cookies.get("token"),
		};
		let gauth = Cookies.get("Google-Auth");
		if (gauth) {
			headers["Google-Auth"] = "True";
		}
		console.log("headers", headers);
		await fetch("https://backend.immigpt.ai/templates", {
			method: "GET",
			headers: headers,
		})
			.then(async (response) => {
				// templates = response.data.templates;
				let temp = await response.json();
				templates = temp.templates;
				console.log("templates", templates);
			})
			.catch((error) => {
				console.log("error", error);
			});
	};

	let activeTabIndex = 0;
	let themeVariable = "light";
	let selectedTemplate = templates[0]?.resumeTemplates[0];

	let degreeName = "";
	let courseName = "";
	let universityName = "";
	let additionalDetails = "";
	let projectsDone = "";
	let keyCourses = "";
	let CompletedUniversityName = "";
	let completedCourseName = "";
	let completedDegreeName = "";
	let companyName = "";
	let jobTitle = "";
	let jobDuration = "";
	let keyResponsibilities = "";
	let achievements = "";
	let careerGoals = "";
	let researchExperiences = "";
	let facultyConnection = "";
	let leadershipAndImpact = "";

	let showPreview = false;

	function openPreview() {
		showPreview = true;
	}

	function closePreview() {
		showPreview = false;
	}

	function closePopup() {
		dispatch("closeTemplatesPopup");
		showSelectedTemplate = false;
	}

	function closeShowTemplatePopup() {
		showSelectedTemplate = false;
		activeTabIndex = activeTabIndex;
	}

	function selectedStudentTemplate(event) {
		let index = event.detail.index;
		selectedTemplate = templates[0]?.resumeTemplates[index];
		showSelectedTemplate = true;
	}

	function selectedProfessionalTemplate(event) {
		let index = event.detail.index;
		selectedTemplate = templates[1]?.resumeTemplates[index];
		showSelectedTemplate = true;
	}

	function selectedTouristsTemplate(event) {
		let index = event.detail.index;
		selectedTemplate = templates[2]?.resumeTemplates[index];
		showSelectedTemplate = true;
	}

	function useTemplate() {
		// if (selectedTemplate.tag == "SOP" || selectedTemplate.tag == "LOR") {
		let fields = selectedTemplate?.inputFields;
		for (let i = 0; i < fields?.length; i++) {
			let field = fields[i];
			const placeholder = `[fieldValue${i + 1}]`;
			const userInputValue = field.fieldValue;
			selectedTemplate.prompt = selectedTemplate.prompt.replaceAll(placeholder, userInputValue);
		}
		visaPrompt.set(selectedTemplate.prompt + ":::" + "Generate " + selectedTemplate.resumeTitle);
		dispatch("closeBurger");
		closePopup();
	}

	$: isTemplateDisabled = selectedTemplate?.inputFields.some((field) => field.fieldValue === "");
	$: activeTemplates = templates[activeTabIndex]?.resumeTemplates;
	$: activeInputFields = selectedTemplate?.inputFields;

	const renderDescriptionTab = (event) => {
		const { index, key } = event.detail;
		activeTabIndex = index;
	};

	onMount(() => {
		getTemplates();
		activeTabIndex = 0;
		activeTemplates = templates[activeTabIndex]?.resumeTemplates;
	});
</script>

{#if showTemplatesPopup}
	<div class="overlay">
		<div class="popup">
			{#if !showSelectedTemplate}
				<div class="header">
					<p class="title">Browse Templates</p>
					<button class="close-btn" on:click={closePopup}>
						{#if $currentTheme == "light"}
							<img src="/assets/icons/close-icon-black.svg" alt="" />
						{:else}
							<img src="/assets/icons/close-icon-white.svg" alt="" />
						{/if}
					</button>
				</div>
				<p class="description">
					Browse and choose a template from the available selection, We’ll help create prompts to
					generate the content based on the template you've choosen
				</p>
				<div class="body scrollbar-custom">
					<Tabs
						bind:activeTabIndex
						initialTab={activeTabIndex}
						variant="default"
						color={$currentTheme == "dark" ? "white" : "black"}
						on:change={renderDescriptionTab}
					>
						<Tabs.Tab
							label="Student"
							class={activeTabIndex == 0 ? "active" : ""}
							style={activeTabIndex == 0
								? "font-weight:600;color:var(--primary-text-color) !important;"
								: ""}
						>
							<div class="tabDetailsWrapInternal">
								<!-- {#if activeTemplates.length == 2}
									<DuplicateResumeTemplate
										on:selectedTemplate={selectedStudentTemplate}
										index={3}
										imageUrl={activeTemplates[0].imageUrl[0]}
										resumeTitle={activeTemplates[0].resumeTitle}
										resumeDescription={activeTemplates[0].resumeDescription}
										on:upgradeToPro={showUpgradeToPro}
									/>
								{/if} -->
								{#if activeTemplates[0].prompt}
									{#each activeTemplates as template, i}
										<ResumeTemplate
											on:selectedTemplate={selectedStudentTemplate}
											index={i}
											imageUrl={template.imageUrl[0]}
											resumeTitle={template.resumeTitle}
											resumeDescription={template.resumeDescription}
										/>
									{/each}
								{:else}
									{#each activeTemplates as template, i}
										<DuplicateResumeTemplate
											on:selectedTemplate={selectedStudentTemplate}
											index={i}
											imageUrl={"/assets/images/templates/Student/SOPs/SOP Highlighting Academic Background.jpeg"}
											resumeTitle={template.resumeTitle}
											resumeDescription={template.resumeTitle}
											on:upgradeToPro={showUpgradeToPro}
										/>
									{/each}
								{/if}
							</div>
						</Tabs.Tab>
						<Tabs.Tab
							label="Professional"
							class={activeTabIndex == 1 ? "active" : ""}
							style={activeTabIndex == 1
								? "font-weight:600;color:var(--primary-text-color) !important;"
								: ""}
						>
							<div class="tabDetailsWrapInternal">
								<!-- {#each activeTemplates as template, i}
									<ResumeTemplate
										on:selectedTemplate={selectedProfessionalTemplate}
										index={i}
										imageUrl={template.imageUrl[0]}
										resumeTitle={template.resumeTitle}
										resumeDescription={template.resumeDescription}
									/>
								{/each}
								{#if activeTemplates.length == 2}
									<DuplicateResumeTemplate
										on:selectedTemplate={selectedStudentTemplate}
										index={3}
										imageUrl={activeTemplates[0].imageUrl[0]}
										resumeTitle={activeTemplates[0].resumeTitle}
										resumeDescription={activeTemplates[0].resumeDescription}
										on:upgradeToPro={showUpgradeToPro}
									/>
								{/if} -->
								{#if activeTemplates[0].prompt}
									{#each activeTemplates as template, i}
										<ResumeTemplate
											on:selectedTemplate={selectedStudentTemplate}
											index={i}
											imageUrl={template.imageUrl[0]}
											resumeTitle={template.resumeTitle}
											resumeDescription={template.resumeDescription}
										/>
									{/each}
								{:else}
									{#each activeTemplates as template, i}
										<DuplicateResumeTemplate
											on:selectedTemplate={selectedStudentTemplate}
											index={i}
											imageUrl={"/assets/images/templates/Student/SOPs/SOP Highlighting Academic Background.jpeg"}
											resumeTitle={template.resumeTitle}
											resumeDescription={template.resumeTitle}
											on:upgradeToPro={showUpgradeToPro}
										/>
									{/each}
								{/if}
							</div>
						</Tabs.Tab>
						<Tabs.Tab
							label="Tourist"
							class={activeTabIndex == 2 ? "active" : ""}
							style={activeTabIndex == 2
								? "font-weight:600;color:var(--primary-text-color) !important;"
								: ""}
						>
							<div class="tabDetailsWrapInternal">
								<!-- {#each activeTemplates as template, i}
									<ResumeTemplate
										on:selectedTemplate={selectedTouristsTemplate}
										index={i}
										imageUrl={template.imageUrl[0]}
										resumeTitle={template.resumeTitle}
										resumeDescription={template.resumeDescription}
									/>
								{/each}
								{#if activeTemplates.length == 2}
									<DuplicateResumeTemplate
										on:selectedTemplate={selectedStudentTemplate}
										index={3}
										imageUrl={activeTemplates[0].imageUrl[0]}
										resumeTitle={activeTemplates[0].resumeTitle}
										resumeDescription={activeTemplates[0].resumeDescription}
										on:upgradeToPro={showUpgradeToPro}
									/>
								{/if} -->
								{#if activeTemplates[0].prompt}
									{#each activeTemplates as template, i}
										<ResumeTemplate
											on:selectedTemplate={selectedStudentTemplate}
											index={i}
											imageUrl={template.imageUrl[0]}
											resumeTitle={template.resumeTitle}
											resumeDescription={template.resumeDescription}
										/>
									{/each}
								{:else}
									{#each activeTemplates as template, i}
										<DuplicateResumeTemplate
											on:selectedTemplate={selectedStudentTemplate}
											index={i}
											imageUrl={"/assets/images/templates/Student/SOPs/SOP Highlighting Academic Background.jpeg"}
											resumeTitle={template.resumeTitle}
											resumeDescription={template.resumeTitle}
											on:upgradeToPro={showUpgradeToPro}
										/>
									{/each}
								{/if}
							</div>
						</Tabs.Tab>
					</Tabs>
				</div>
			{:else if showSelectedTemplate}
				<div class="header">
					<Button color="transparent" className="back-btn" on:click={closeShowTemplatePopup}>
						<ThickArrowLeft
							size={24}
							color={$currentTheme == "light" ? "black" : "white"}
							slot="leftIcon"
						/>
						<p class="title">Back to Templates</p>
					</Button>
					<button class="close-btn" on:click={closeShowTemplatePopup}>
						{#if $currentTheme == "light"}
							<img src="/assets/icons/close-icon-black.svg" alt="" />
						{:else}
							<img src="/assets/icons/close-icon-white.svg" alt="" />
						{/if}
					</button>
				</div>
				<div class="body template-body scrollbar-custom">
					<div class="left-body">
						<img class="resume-img" src={selectedTemplate.imageUrl[0]} alt="" />
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
							<!-- <button class="use-template-btn" on:click={useTemplate}><p>Use Template</p></button> -->
						</div>
						<div>
							<p class="description">
								Note: Please fill in all the fields for personalised results
							</p>
						</div>
						<div class="input-fields" />
						{#if activeInputFields?.length > 0}
							{#each activeInputFields as field, index}
								{#if field.fieldType == "textfield"}
									<div class="input-wrapper visaprep-container">
										<TextInput
											required
											bind:value={field.fieldValue}
											label={field.name}
											placeholder={field.label}
										/>
									</div>
								{:else}
									<div class="input-wrapper visaprep-container">
										<Textarea
											required
											label={field.name}
											bind:value={field.fieldValue}
											placeholder={field.label}
										/>
									</div>
								{/if}
							{/each}
						{/if}
						<div class="buttons-wrapper">
							<!-- color={$currentTheme == "light" ? "black" : "white"} -->
							<Button
								disabled={isTemplateDisabled}
								on:click={useTemplate}
								color={$currentTheme == "light" ? "black" : "white"}
							>
								<!-- <p>Use Template</p> -->
								<span class="submitBtn">Use Template</span>
							</Button>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

{#if showPreview}
	<div class="overlay">
		<div class="popup">
			<div class="close-wrapper">
				<button on:click={closePreview} class="close-btn">
					{#if $currentTheme == "light"}
						<img src="/assets/icons/close-icon-black.svg" alt="" />
					{:else}
						<img src="/assets/icons/close-icon-white.svg" alt="" />
					{/if}
				</button>
			</div>
			<div class="preview-container scrollbar-custom">
				{#each selectedTemplate.imageUrl as image}
					<img src={image} alt="template" />
				{/each}
			</div>
		</div>
	</div>
{/if}

<!-- <Modal size="100%" opened={showPreview} on:close={closePreview} withCloseButton={false}>
	<div class="popup-container">
		<div class="close-wrapper">
			<button on:click={closePreview} class="close-btn"
				><img src="/assets/icons/close-icon-black.svg" alt="" /></button
			>
		</div>
		<div class="preview-container">
			{#each selectedTemplate.imageUrl as image}
				<img src={image} alt="template" />
			{/each}
		</div>
	</div>
</Modal> -->
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
		background: var(--secondary-background-color);
		width: 60%;
		height: 95vh;
	}

	.header {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--primary-border-color);
	}

	.title {
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.description {
		color: var(--secondary-text-color);
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
		gap: 24px;
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
		color: var(--primary-text-color);

		font-family: Inter;
		font-size: 24px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}

	.templateDescription {
		color: var(--secondary-text-color);

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
		background: var(--use-template-btn-color);
		display: inline-flex;
		padding: 12px 24px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		width: fit-content;
	}

	.use-template-btn p {
		/* background: var(--primary-btn-color); */
		color: var(--use-template-btn-text-color);
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
		background-color: transparent !important;
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
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
		gap: 8px;
	}

	.preview-container img {
		object-fit: cover;
		border: 1px solid #e1e1e1;
	}

	.close-wrapper {
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 20px;
	}

	.preview-container {
		height: calc(100% - 30px);
		overflow-y: auto;
		padding: 12px;
	}

	.input-fields {
		/* padding-bottom: 40px; */
		display: flex;
		flex-direction: column;
		gap: 12px;
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
