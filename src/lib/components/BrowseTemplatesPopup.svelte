<script>
	import { afterUpdate, createEventDispatcher, onMount } from "svelte";
	import { Modal, Tabs, TextInput, Textarea, Tooltip } from "@svelteuidev/core";
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
					imageUrl: [
						"/assets/images/templates/Student/SOPs/SOP Highlighting Academic Background.jpeg",
					],
					resumeTitle: "SOP Highlighting Academic Background",
					resumeDescription: "",
					id: "student-1",
					tag: "SOP",
					prompt:
						"Generate a Statement of Purpose (SOP) for my application to the [Degree Name] in [Course Name] program at [University Name]. These are my Academic details - [Add all the details that are being asked from the user]. [Additional Details]. Please craft a personalized SOP by highlighting my Academic background.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/SOPs/SOP Highlighting Work Experience and Career Goals.jpeg",
					],
					resumeTitle: "SOP Highlighting Work Experience and Career Goals",
					resumeDescription: "",
					id: "student-2",
					tag: "SOP",
					prompt:
						"Generate a Statement of Purpose (SOP) for my application to the [Degree Name] in [Course Name] program at [University Name]. These are my Academic details - [Add all the details that are being asked from the user]. These are the details on my work experience - [Add all the details that are being asked from the user]. My career goals are [Add all the details that are being asked from the user]. [Additional Details]. Please craft a personalized SOP by highlighting my Work Experience and Career Goals.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/SOPs/SOP with Academic and Research Emphasis.jpeg",
					],
					resumeTitle: "SOP with Academic and Research Emphasis",
					resumeDescription: "",
					tag: "SOP",
					id: "student-3",
					prompt:
						"Generate a Statement of Purpose (SOP) for my application to the [Degree Name] in [Course Name] program at [University Name]. These are my Academic details - [Add all the details that are being asked from the user]. These are the details of my research experiences and faculty connections - [Add all the details that are being asked from the user]. My career goals are [Add all the details that are being asked from the user]. [Additional Details]. Please craft a personalized SOP by highlighting my Academics and Research experience.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Student/SOPs/SOP with Research and Faculty Emphasis.jpeg",
					],
					resumeTitle: "SOP with Research and Faculty Emphasis",
					resumeDescription: "",
					id: "student-4",
					tag: "SOP",
					prompt:
						"Generate a Statement of Purpose (SOP) for my application to the [Degree Name] in [Course Name] program at [University Name]. These are my Academic details - [Add all the details that are being asked from the user]. These are the details of my research experiences and faculty connections - [Add all the details that are being asked from the user]. My career goals are [Add all the details that are being asked from the user]. [Additional Details]. Please craft a personalized SOP by highlighting my Research experience and Faculty connections.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/SOPs/SOP with Work Experience and Leadership Focus.jpeg",
					],
					resumeTitle: "SOP with Work Experience and Leadership Focus",
					resumeDescription: "",
					id: "student-5",
					tag: "SOP",
					prompt:
						"Generate a Statement of Purpose (SOP) for my application to the [Degree Name] in [Course Name] program at [University Name]. These are my Academic details - [Add all the details]. These are the details on my work experience - [Add all the details]. Details on my Leadership and Impact - [Add all the details]. My career goals are [Add all the details]. [Additional Details]. Please craft a personalized SOP by highlighting my Work Experience and Leadership.",
				},
				{
					imageUrl: ["/assets/images/templates/Student/SOPs/SOP with Customized Format.jpeg"],
					resumeTitle: "SOP with Customized Format",
					resumeDescription: "",
					id: "student-6",
					tag: "SOP",
					prompt:
						"I'm seeking your assistance in crafting a compelling Statement of Purpose (SOP). The SOP is a critical document for my application, and I'd like it to effectively convey my qualifications and aspirations to the admissions committee. Could you please help me by: 1. Providing a well-structured introduction for the SOP? 2. Creating a section that outlines my academic background, including my undergraduate degree and major. 3. Crafting a portion that explains my academic aspirations and why I'm interested in pursuing [Degree Name] in [Course Name] at [University Name]. 4. Describing any relevant research projects, internships, or academic projects I've been involved in. 5. Summarizing my work experience, specifying the organizations I've worked for and how this experience relates to my chosen course. 6. Outlining my career goals, both short-term and long-term, and explaining how the chosen course aligns with these goals. 7. Highlighting any unique qualities, skills, or achievements that make me a standout candidate. 8. Concluding the SOP with a strong closing statement. Ask me the necessary details that you'll require to write this SOP.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Student/LORs/Letter of Recommendation from a Manager.jpeg",
					],
					resumeTitle: "Letter of Recommendation from a Manager",
					resumeDescription: "",
					id: "lor-1",
					tag: "LOR",
					prompt:
						"Generate a personalized Letter of Recommendation (LOR) from the manager at [Company Name] for [Applicant's Name] as they apply for admission to the [Degree Name] program in [Course Name] at [University Name]. Please offer specific details about the applicant's professional performance and notable achievements within your organization, underscoring how these accomplishments make them an ideal candidate for the program.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/LORs/Letter of Recommendation from a Professor.jpeg",
					],
					resumeTitle: "Letter of Recommendation from a Professor",
					resumeDescription: "",
					id: "lor-2",
					tag: "LOR",
					prompt:
						"Generate a personalized Letter of Recommendation (LOR) from a professor who instructed [Courses Names] at [Institution Name] for [Applicant's Name], who is currently seeking admission to the [Degree Name] program in [Course Name] at [University Name]. Please offer comprehensive insights into the applicant's academic performance in your class and their qualifications, underlining their suitability for the program.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/LORs/Letter of Recommendation from an Educator.jpeg",
					],
					resumeTitle: "Letter of Recommendation from an Educator",
					resumeDescription: "",
					id: "lor-3",
					tag: "LOR",
					prompt:
						"Generate a personalized Letter of Recommendation (LOR) from an experienced Educator who taught [Taught Course Name] at [Taught Institution Name], for [Applicant's Name], who is currently seeking admission to the [Degree Name] program in [Course Name] at [University Name]. Please focus on the applicant's academic achievements and exceptional personal qualities that make them a strong fit for this program. Provide insights into the applicant's performance and character to help the admissions committee gain a comprehensive understanding of their potential.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/Financial Support Letters/Financial Support Letter from Employer.jpeg",
					],
					resumeTitle: "Financial Support Letter from Employer",
					resumeDescription: "",
					id: "fsl-1",
					tag: "FSL",
					prompt:
						"Generate a brief financial support letter on behalf of the applicant's employer to support their studies by using the following details - Company Name - [ ], Name of the Applicant - [ ], Name of University - [ ]",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/Financial Support Letters/Financial Support Letter from Sponsor (Family member or a Friend).jpeg",
					],
					resumeTitle: "Financial Support Letter from Sponsor (Family member or a Friend)",
					resumeDescription: "",
					id: "fsl-2",
					tag: "FSL",
					prompt:
						"Generate a brief financial support letter on behalf of the applicant's relative to support their studies by using the following details - Name of the Applicant - [ ], Relation to the Applicant - [ ], Name of University - [ ]",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/Financial Support Letters/Financial Support Letter from the Bank.jpeg",
					],
					resumeTitle: "Financial Support Letter from the Bank",
					resumeDescription: "",
					id: "fsl-3",
					tag: "FSL",
					prompt:
						"Generate a brief letter from the bank addressed to 'To Whom It May Concern' containing the following details - Account holder's Name - [ ], Outstanding balance - [ ], Number of days that the balance is being maintained for - [ ].",
				},
			],
		},
		{
			type: "Professional",
			resumeTemplates: [
				{
					imageUrl: ["/assets/images/templates/Professional/Academic Offer Letter.jpeg"],
					resumeTitle: "Academic Offer Letter",
					resumeDescription: "",
					id: "professional-1",
					tag: "Professional",
					prompt:
						"Generate an Academic offer letter to the student with the following Course details - Program Name - [ ], University Name - [ ], Country Name - [ ], Start Date - [ ], Duration - [ ], Tuition Fees - $ [ ] per semester, Scholarship/Financial Aid - [ ], Additional Details - [ ].",
				},

				{
					imageUrl: ["/assets/images/templates/Professional/Employment Offer Letter.jpeg"],
					resumeTitle: "Employment Offer Letter",
					resumeDescription: "",
					id: "professional-2",
					tag: "Professional",
					prompt:
						"Generate an employment offer letter with the following terms of the offer - Job Title - [ ], Company Name - [ ],  Start Date - [ ], Salary per year - [ ], Benefits - [ ], Vacation Time (No.of days per year) - [ ], Holidays (List holidays observed by the company) - [ ], Additional Details (Tasks and Responsibilities) - [ ].",
				},
			],
		},
		{
			type: "Tourists",
			resumeTemplates: [
				{
					imageUrl: [
						"/assets/images/templates/Tourist/Financial Support Letter - Self-Financed.jpeg",
					],
					resumeTitle: "Financial Support Letter - Self-Financed",
					resumeDescription: "",
					id: "tourist-1",
					tag: "Tourist",
					prompt:
						"Generate a brief financial support letter for a self-sponsored tourist visa application for [Name] travelling to [Destination Country]",
				},

				{
					imageUrl: [
						"/assets/images/templates/Tourist/Financial Support Letter from Employer.jpeg",
					],
					resumeTitle: "Financial Support Letter from Employer",
					resumeDescription: "",
					id: "tourist-2",
					tag: "Tourist",
					prompt:
						"Generate a brief financial support letter on behalf of the applicant's employer to support their tourism plans by using the following details - Company Name - [ ], Name of the Applicant - [ ], Destination Country - [ ]",
				},
				{
					imageUrl: [
						"/assets/images/templates/Tourist/Financial Support Letter from Sponsor (Family Member or Friend).jpeg",
					],
					resumeTitle: "Financial Support Letter from Sponsor (Family Member or Friend)",
					resumeDescription: "",
					id: "tourist-3",
					tag: "Tourist",
					prompt:
						"Generate a brief financial support letter on behalf of the applicant's relative to support their tourism plans by using the following details - Name of the Applicant - [ ], Relation to the Applicant - [ ], Destination Country - [ ].",
				},
			],
		},
	];

	let activeTabIndex = 0;
	let themeVariable = "light";
	let selectedTemplate = templates[0].resumeTemplates[0];

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
		// if (selectedTemplate.tag == "SOP" || selectedTemplate.tag == "LOR") {
		visaPrompt.set(selectedTemplate.prompt);
		dispatch("closeBurger");
		closePopup();
	}

	$: activeTemplates = templates[activeTabIndex].resumeTemplates;

	const renderDescriptionTab = (event) => {
		const { index, key } = event.detail;
		console.log("index", index);
		activeTabIndex = index;
	};

	onMount(() => {
		console.log("template mounted");
		activeTabIndex = 0;
		activeTemplates = templates[activeTabIndex].resumeTemplates;
	});
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
					Browse and choose a template from the available selection, We’ll help create prompts to
					generate the content based on the template you've choosen
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
							style={activeTabIndex == 0 ? "font-weight:600;" : ""}
						>
							{#if activeTabIndex == 0}
								<div class="tabDetailsWrapInternal">
									{#each activeTemplates as template, i}
										<ResumeTemplate
											on:selectedTemplate={selectedStudentTemplate}
											index={i}
											imageUrl={template.imageUrl[0]}
											resumeTitle={template.resumeTitle}
											resumeDescription={template.resumeDescription}
										/>
									{/each}
								</div>
							{/if}
						</Tabs.Tab>
						<Tabs.Tab label="Professional" style={activeTabIndex == 1 ? "font-weight:600;" : ""}>
							{#if activeTabIndex == 1}
								<div class="tabDetailsWrapInternal">
									{#each activeTemplates as template, i}
										<ResumeTemplate
											on:selectedTemplate={selectedProfessionalTemplate}
											index={i}
											imageUrl={template.imageUrl[0]}
											resumeTitle={template.resumeTitle}
											resumeDescription={template.resumeDescription}
										/>
									{/each}
								</div>
							{/if}
						</Tabs.Tab>
						<Tabs.Tab label="Tourist" style={activeTabIndex == 2 ? "font-weight:600;" : ""}>
							{#if activeTabIndex == 2}
								<div class="tabDetailsWrapInternal">
									{#each activeTemplates as template, i}
										<ResumeTemplate
											on:selectedTemplate={selectedTouristsTemplate}
											index={i}
											imageUrl={template.imageUrl[0]}
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
							<button class="use-template-btn" on:click={useTemplate}><p>Use Template</p></button>
						</div>
						<div class="input-fields">
							{#if selectedTemplate.tag == "SOP"}
								<div class="input-wrapper visaprep-container">
									<TextInput
										required
										bind:value={degreeName}
										label="Applying Degree Name"
										placeholder="Ex. Masters"
									/>
								</div>
								<div class="input-wrapper visaprep-container">
									<TextInput
										required
										bind:value={courseName}
										label="Applying Course Name"
										placeholder="Ex. Data science"
									/>
								</div>
								<div class="input-wrapper visaprep-container">
									<TextInput
										required
										bind:value={universityName}
										label="Applying University Name"
										placeholder="Ex. Oxford"
									/>
								</div>
								<p>Academic Details</p>
								<div class="input-wrapper visaprep-container">
									<TextInput
										required
										bind:value={completedDegreeName}
										label="University Degree"
										placeholder="Ex. Masters"
									/>
								</div>
								<div class="input-wrapper visaprep-container">
									<TextInput
										required
										bind:value={completedCourseName}
										label="Course Name"
										placeholder="Ex. Data science"
									/>
								</div>
								<div class="input-wrapper visaprep-container">
									<TextInput
										required
										bind:value={CompletedUniversityName}
										label="University Name"
										placeholder="Ex. Oxford"
									/>
								</div>
							{/if}
							{#if selectedTemplate.id == "student-1" || selectedTemplate.id == "student-4"}
								<div class="input-wrapper visaprep-container">
									<TextInput
										required
										bind:value={keyCourses}
										label="Any Key Courses that are relevant to the applying course"
										placeholder="Ex. Data science"
									/>
								</div>
								<div class="input-wrapper visaprep-container">
									<TextInput
										required
										bind:value={projectsDone}
										label="Projects Done"
										placeholder="Ex. Oxford"
									/>
								</div>
							{/if}
							{#if selectedTemplate.id == "student-2"}
								<p>Work Experience</p>
								<div class="input-wrapper visaprep-container">
									<TextInput
										required
										bind:value={companyName}
										label="Company Name"
										placeholder=""
									/>
								</div>
								<div class="input-wrapper visaprep-container">
									<TextInput required bind:value={jobTitle} label="Job Title" placeholder="" />
								</div>
								<div class="input-wrapper visaprep-container">
									<TextInput
										required
										bind:value={jobDuration}
										label="Duration of Employment (start and end dates)"
										placeholder=""
									/>
								</div>
								<div class="input-wrapper visaprep-container">
									<Textarea
										required
										bind:value={keyResponsibilities}
										label="Key Responsibilities"
										placeholder=""
									/>
								</div>
								<div class="input-wrapper visaprep-container">
									<Textarea
										required
										bind:value={achievements}
										label="Achievements"
										placeholder=""
									/>
								</div>
								<div class="input-wrapper visaprep-container">
									<Textarea required bind:value={careerGoals} label="Career Goals" placeholder="" />
								</div>
							{/if}
							{#if selectedTemplate.id == "student-3" || selectedTemplate.id == "student-4"}
								<div class="input-wrapper visaprep-container">
									<Textarea
										required
										bind:value={researchExperiences}
										label="Research Experiences"
										placeholder=""
									/>
								</div>
								<div class="input-wrapper visaprep-container">
									<TextInput
										required
										bind:value={facultyConnection}
										label="Faculty Connection"
										placeholder=""
									/>
								</div>
								<div class="input-wrapper visaprep-container">
									<Textarea required bind:value={careerGoals} label="Career Goals" placeholder="" />
								</div>
							{/if}
							{#if selectedTemplate.id == "student-5"}
								<div class="input-wrapper visaprep-container">
									<Textarea
										required
										bind:value={leadershipAndImpact}
										label="Leadership and Impact"
										placeholder=""
									/>
								</div>
							{/if}
							<div class="input-wrapper visaprep-container">
								<Textarea
									required
									bind:value={additionalDetails}
									label="Additional Details"
									placeholder=""
								/>
							</div>
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
				<button on:click={closePreview} class="close-btn"
					><img src="/assets/icons/close-icon-black.svg" alt="" /></button
				>
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
		padding-bottom: 40px;
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
