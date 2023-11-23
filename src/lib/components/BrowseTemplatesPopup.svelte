<script>
	import { afterUpdate, createEventDispatcher, onMount } from "svelte";
	import { Modal, Tabs, TextInput, Textarea, Tooltip, Button } from "@svelteuidev/core";
	import { visaPrompt } from "$lib/stores/promptStore";

	import ResumeTemplate from "./BrowseTemplates/ResumeTemplate.svelte";
	import { ActionIcon } from "@svelteuidev/core";
	import { ThickArrowLeft } from "radix-icons-svelte";

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

				{
					imageUrl: [
						"/assets/images/templates/Student/SOPs/SOP with Academic and Research Emphasis.jpeg",
					],
					resumeTitle: "SOP with Academic and Research Emphasis",
					resumeDescription: "",
					tag: "SOP",
					id: "student-3",
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
							fieldType: "textarea",
							fieldValue: "",
						},
						{
							name: "Research Experience and Faculty Connections",
							label: "Ex: Research projects, Faculty interactions",
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
							label: "Ex: Achievements, Career Goals, None",
							fieldType: "textarea",
							fieldValue: "",
						},
					],

					prompt:
						"Generate a Statement of Purpose (SOP) for my application to the [fieldValue1] in [fieldValue2] program at [fieldValue3]. These are my Academic details - [fieldValue4]. These are the details of my research experiences and faculty connections - [fieldValue5]. My career goals are [fieldValue6]. [fieldValue7]. Please craft a personalized SOP by highlighting my Academics and Research experience.Please don't mention yourself as an immigration officer.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Student/SOPs/SOP with Research and Faculty Emphasis.jpeg",
					],
					resumeTitle: "SOP with Research and Faculty Emphasis",
					resumeDescription: "",
					id: "student-4",
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
							fieldType: "textarea",
							fieldValue: "",
						},
						{
							name: "Research Experience and Faculty Connections",
							label: "Ex: Research projects, Faculty interactions",
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
							label: "Ex: Achievements, Career Goals, None",
							fieldType: "textarea",
							fieldValue: "",
						},
					],

					prompt:
						"Generate a Statement of Purpose (SOP) for my application to the [fieldValue1] in [fieldValue2] program at [fieldValue3]. These are my Academic details - [fieldValue4]. These are the details of my research experiences and faculty connections - [fieldValue5]. My career goals are [fieldValue6]. [fieldValue7]. Please craft a personalized SOP by highlighting my Research experience and Faculty connections.Please don't mention yourself as an immigration officer.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/SOPs/SOP with Work Experience and Leadership Focus.jpeg",
					],
					resumeTitle: "SOP with Work Experience and Leadership Focus",
					resumeDescription: "",
					id: "student-5",
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
							fieldType: "textarea",
							fieldValue: "",
						},
						{
							name: "Work Experience Details",
							label: "Ex: Company, Position, Duration",
							fieldType: "textarea",
							fieldValue: "",
						},
						{
							name: "Leadership and Impact",
							label: "Ex: Leadership roles, Impactful projects",
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
							label: "Ex: Achievements, Career Goals, None",
							fieldType: "textarea",
							fieldValue: "",
						},
					],
					prompt:
						"Generate a Statement of Purpose (SOP) for my application to the [fieldValue1] in [fieldValue2] program at [fieldValue3]. These are my Academic details - [fieldValue4]. These are the details on my work experience - [fieldValue5]. Details on my Leadership and Impact - [fieldValue6]. My career goals are [fieldValue7]. [fieldValue8]. Please craft a personalized SOP by highlighting my Work Experience and Leadership.Please don't mention yourself as an immigration officer.",
				},

				{
					imageUrl: ["/assets/images/templates/Student/SOPs/SOP with Customized Format.jpeg"],
					resumeTitle: "SOP with Customized Format",
					resumeDescription: "",
					id: "student-6",
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
					],
					prompt:
						"I'm seeking your assistance in crafting a compelling Statement of Purpose (SOP). The SOP is a critical document for my application, and I'd like it to effectively convey my qualifications and aspirations to the admissions committee. Could you please help me by: 1. Providing a well-structured introduction for the SOP. 2. Creating a section that outlines my academic background, including my undergraduate degree and major. 3. Crafting a portion that explains my academic aspirations and why I'm interested in pursuing [fieldValue1] in [fieldValue2] at [fieldValue3]. 4. Describing any relevant research projects, internships, or academic projects I've been involved in. 5. Summarizing my work experience, specifying the organizations I've worked for and how this experience relates to my chosen course. 6. Outlining my career goals, both short-term and long-term, and explaining how the chosen course aligns with these goals. 7. Highlighting any unique qualities, skills, or achievements that make me a standout candidate. 8. Concluding the SOP with a strong closing statement. Ask me the necessary details that you'll require to write this SOP.Please don't mention yourself as an immigration officer.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Student/LORs/Letter of Recommendation from a Manager.jpeg",
					],
					resumeTitle: "Letter of Recommendation from a Manager",
					resumeDescription: "",
					id: "lor-1",
					tag: "LOR",
					inputFields: [
						{
							name: "Company Name",
							label: "Ex: XYZ Corp",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Applicant's Name",
							label: "Ex: John Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
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
					],
					prompt:
						"Generate a personalized Letter of Recommendation (LOR) from the manager at [fieldValue1] for [fieldValue2] as they apply for admission to the [fieldValue3] program in [fieldValue4] at [fieldValue5]. Please offer specific details about the applicant's professional performance and notable achievements within your organization, underscoring how these accomplishments make them an ideal candidate for the program.Please don't mention yourself as an immigration officer.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/LORs/Letter of Recommendation from a Professor.jpeg",
					],
					resumeTitle: "Letter of Recommendation from a Professor",
					resumeDescription: "",
					id: "lor-2",
					tag: "LOR",
					inputFields: [
						{
							name: "Courses Names",
							label: "Ex: Machine Learning, Data Analysis",
							fieldType: "textarea",
							fieldValue: "",
						},
						{
							name: "Institution Name",
							label: "Ex: XYZ University",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Applicant's Name",
							label: "Ex: Jane Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
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
					],
					prompt:
						"Generate a personalized Letter of Recommendation (LOR) from a professor who instructed [fieldValue1] at [fieldValue2] for [fieldValue3], who is currently seeking admission to the [fieldValue4] program in [fieldValue5] at [fieldValue6]. Please offer comprehensive insights into the applicant's academic performance in your class and their qualifications, underlining their suitability for the program.Please don't mention yourself as an immigration officer.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/LORs/Letter of Recommendation from an Educator.jpeg",
					],
					resumeTitle: "Letter of Recommendation from an Educator",
					resumeDescription: "",
					id: "lor-3",
					tag: "LOR",
					inputFields: [
						{
							name: "Taught Course Name",
							label: "Ex: Introduction to Computer Science",
							fieldType: "textarea",
							fieldValue: "",
						},
						{
							name: "Taught Institution Name",
							label: "Ex: ABC School",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Applicant's Name",
							label: "Ex: Jim Smith",
							fieldType: "textfield",
							fieldValue: "",
						},
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
					],
					prompt:
						"Generate a personalized Letter of Recommendation (LOR) from an experienced Educator who taught [fieldValue1] at [fieldValue2], for [fieldValue3], who is currently seeking admission to the [fieldValue4] program in [fieldValue5] at [fieldValue6]. Please focus on the applicant's academic achievements and exceptional personal qualities that make them a strong fit for this program. Provide insights into the applicant's performance and character to help the admissions committee gain a comprehensive understanding of their potential.Please don't mention yourself as an immigration officer.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/Financial Support Letters/Financial Support Letter from Employer.jpeg",
					],
					resumeTitle: "Financial Support Letter from Employer",
					resumeDescription: "",
					id: "fsl-1",
					tag: "FSL",
					inputFields: [
						{
							name: "Company Name",
							label: "Ex: XYZ Corp",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Name of the Applicant",
							label: "Ex: John Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Name of University",
							label: "Ex: Buffalo",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						"Generate a brief financial support letter on behalf of the applicant's employer to support their studies by using the following details - Company Name - [fieldValue1], Name of the Applicant - [fieldValue2], Name of University - [fieldValue3]. Please don't mention yourself as an immigration officer.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/Financial Support Letters/Financial Support Letter from Sponsor (Family member or a Friend).jpeg",
					],
					resumeTitle: "Financial Support Letter from Sponsor (Family member or a Friend)",
					resumeDescription: "",
					id: "fsl-2",
					tag: "FSL",
					inputFields: [
						{
							name: "Name of the Applicant",
							label: "Ex: Jane Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Relation to the Applicant",
							label: "Ex: Father",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Name of University",
							label: "Ex: Buffalo",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						"Generate a brief financial support letter on behalf of the applicant's relative to support their studies by using the following details - Name of the Applicant - [fieldValue1], Relation to the Applicant - [fieldValue2], Name of University - [fieldValue3].Please don't mention yourself as an immigration officer.",
				},

				{
					imageUrl: [
						"/assets/images/templates/Student/Financial Support Letters/Financial Support Letter from the Bank.jpeg",
					],
					resumeTitle: "Financial Support Letter from the Bank",
					resumeDescription: "",
					id: "fsl-3",
					tag: "FSL",
					inputFields: [
						{
							name: "Account holder's Name",
							label: "Ex: John Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Outstanding balance",
							label: "Ex: $10,000",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Number of days",
							label: "Ex: 180",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						"Generate a brief letter from the bank addressed to 'To Whom It May Concern' containing the following details - Account holder's Name - [fieldValue1], Outstanding balance - [fieldValue2], Number of days that the balance is being maintained for - [fieldValue3].Please don't mention yourself as an immigration officer.",
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

				// {
				// 	imageUrl: [
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-1.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-2.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-3.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-4.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-5.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-6.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-7.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-8.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-9.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-10.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-11.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-12.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-13.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-14.jpg",
				// 		"/assets/images/templates/Professional/CloudRevolute_Petition_Letter_SUDHIR-15.jpg",
				// 	],
				// 	resumeTitle: "Pettition Letter",
				// 	resumeDescription: "",
				// 	id: "professional-3",
				// 	tag: "Professional",
				// 	inputFields: [
				// 		{
				// 			name: "Job Title",
				// 			label: "Ex: Software Engineer",
				// 			fieldType: "textfield",
				// 			fieldValue: "",
				// 		},
				// 		{
				// 			name: "Company Name",
				// 			label: "Ex: ABC Tech Solutions",
				// 			fieldType: "textfield",
				// 			fieldValue: "",
				// 		},
				// 		{
				// 			name: "Start Date",
				// 			label: "Ex: August 15, 2023",
				// 			fieldType: "textfield",
				// 			fieldValue: "",
				// 		},
				// 		{
				// 			name: "Salary per year",
				// 			label: "Ex: $80,000",
				// 			fieldType: "textfield",
				// 			fieldValue: "",
				// 		},
				// 		{
				// 			name: "Benefits",
				// 			label: "Ex: Health insurance, Retirement plan",
				// 			fieldType: "textarea",
				// 			fieldValue: "",
				// 		},
				// 		{
				// 			name: "Vacation Time (No.of days per year)",
				// 			label: "Ex: 15 days",
				// 			fieldType: "textfield",
				// 			fieldValue: "",
				// 		},
				// 		{
				// 			name: "Holidays (List holidays observed by the company)",
				// 			label: "Ex: New Year's Day, Independence Day",
				// 			fieldType: "textarea",
				// 			fieldValue: "",
				// 		},
				// 		{
				// 			name: "Additional Details (Tasks and Responsibilities)",
				// 			label: "Ex: Project management, Coding tasks",
				// 			fieldType: "textarea",
				// 			fieldValue: "",
				// 		},
				// 	],
				// 	prompt:
				// 		"Generate a pettition letter with the following terms of the offer - Job Title - [fieldValue1], Company Name - [fieldValue2], Start Date - [fieldValue3], Salary per year - [fieldValue4], Benefits - [fieldValue5], Vacation Time (No.of days per year) - [fieldValue6], Holidays (List holidays observed by the company) - [fieldValue7], Additional Details (Tasks and Responsibilities) - [fieldValue8].",
				// },

				{
					imageUrl: ["/assets/images/templates/Professional/H-1B_Sample_Forms.jpg"],
					resumeTitle: "H-1B Sample Forms",
					resumeDescription: "",
					id: "professional-4",
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
						"Generate an employment offer letter with the following terms of the offer - Job Title - [fieldValue1], Company Name - [fieldValue2], Start Date - [fieldValue3], Salary per year - [fieldValue4], Benefits - [fieldValue5], Vacation Time (No.of days per year) - [fieldValue6], Holidays (List holidays observed by the company) - [fieldValue7], Additional Details (Tasks and Responsibilities) - [fieldValue8].Please don't mention yourself as an immigration officer.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Professional/h1b petition letter1(1).jpg",
						"/assets/images/templates/Professional/h1b petition letter1(2).jpg",
					],
					resumeTitle: "H1B Visa Petition Letter",
					resumeDescription: "",
					id: "professional-5",
					tag: "Professional",
					inputFields: [
						{
							name: "Company Name",
							label: "Ex: Google,Amazon",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Beneficiary's Full Name",
							label: "Ex: John Kim",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Job Role",
							label: "Ex: Senior Software Engineer",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						" Generate a detailed letter to USCIS petitioning for an H-1B visa for [fieldValue2] on behalf of [fieldValue1]. Include details about [fieldValue2]  qualifications,[fieldValue3], and the employer's need for their expertise. Make sure to include - 1. Detailed information about the company, highlighting its key aspects. 2. Description of the position of [fieldValue3] for which the H1B visa is being sought, in a very detailed manner by emphasizing its significance along with the details on responsibilities, requirements and qualifications for the position. 7. Provide a detailed description about the qualifications of [fieldValue2], showcasing their strengths and suitability for the specified position of [fieldValue3]. Please don't mention yourself as an immigration officer.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Professional/o1 Petition 1.jpg",
						"/assets/images/templates/Professional/o1 Petition 2.jpg",
					],
					resumeTitle: "O-1 Extraordinary Ability Visa Petition Letter",
					resumeDescription: "",
					id: "professional-6",
					tag: "Professional",
					inputFields: [
						{
							name: "Company Name",
							label: "Ex: Google,Amazon",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Beneficiary's Full Name",
							label: "Ex: John Kim",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Specific Field",
							label: "Ex: Science,Business,Education,Athletics",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						" Generate a detailed compelling letter to USCIS for an O-1 visa on behalf of [fieldValue1] for [fieldValue2], showcasing their extraordinary ability in [fieldValue3]. Include detailed evidence of their exceptional achievements, recognition, and contributions to their field, such as specific awards, publications, or notable projects. Emphasize the unique expertise that the beneficiary brings and articulate how their visit to the United States will significantly benefit the field or industry. Make sure to include detailed information about the [fieldValue1]. Ensure the letter aligns with USCIS requirements for O-1 visa petitions and is supported by relevant documentation. Note- Please don't mention yourself as an immigration officer.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Professional/familybasedpetition01.jpg",
						"/assets/images/templates/Professional/familybasedpetition02.jpg",
						"/assets/images/templates/Professional/familybasedpetition03.jpg",
					],

					resumeTitle: "Family-based Green Card Petition Letter",
					resumeDescription: "",
					id: "professional-7",
					tag: "Professional",
					inputFields: [
						{
							name: "Petitioner's Full Name",
							label: "Ex: John",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Beneficiary's Full Name",
							label: "Ex: Kim",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Relation of beneficiary to the petitioner",
							label: "Ex: Brother,Sister,Mother,etc",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						" Generate a detailed letter to USCIS requesting a family-based green card for [fieldValue2], [fieldValue3] of the petitioner [fieldValue1]. Provide a comprehensive overview of the relationship, including the familial ties, history, and any significant events that emphasize the genuine nature of the relationship. Detail the petitioner's current immigration status and any relevant immigration history. Clearly articulate the reasons and circumstances necessitating the green card application, emphasizing the need for family reunification and the potential hardships that may arise if the green card is not granted. Include any supporting documentation or evidence that strengthens the case, such as family photographs, affidavits from family members, or other relevant proofs of the bona fide relationship. Ensure that the letter adheres to USCIS guidelines and regulations for family-based green card petitions. Note- Please don't mention yourself as an immigration officer.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Professional/L-1 Visa Petition Letter 1.jpg",
						"/assets/images/templates/Professional/L-1 Visa Petition Letter 2.jpg",
						"/assets/images/templates/Professional/L-1 Visa Petition Letter 3.jpg",
					],

					resumeTitle: "L-1 Visa Petition Letter",
					resumeDescription: "",
					id: "professional-8",
					tag: "Professional",
					inputFields: [
						{
							name: "L-1 category",
							label: "Ex: L-1A,L-1B",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Beneficiary's Full Name",
							label: "Ex: Kim",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Role of Beneficiary",
							label: "Ex: Data Scientist",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: " Petitioner's Company Name",
							label: "Ex: Google,Amazon",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						" Generate a compelling [fieldValue1] visa petition letter addressed to USCIS on behalf of [fieldValue2], by [fieldValue4]. Present a detailed overview of the professional relationship between the petitioner and the beneficiary, highlighting their roles, responsibilities, and achievements within the company. Provide a comprehensive history of the petitioner's business in the U.S., underscoring the necessity and benefits of transferring the beneficiary to a U.S.-based role as a [fieldValue3]. Include information about the petitioner's current immigration status and any pertinent immigration history, ensuring clarity and compliance with USCIS guidelines. Clearly articulate the reasons for the [fieldValue1] visa application, emphasizing the essential role the beneficiary plays in the company's operations and the advantages of having their expertise in the U.S. Describe any potential challenges or disruptions to business operations if the [fieldValue1] visa is not granted. Attach supporting documentation, such as organizational charts, employment contracts, letters of recommendation, and evidence of the beneficiary's qualifications and achievements. Ensure that the letter aligns with USCIS regulations for L-1 visa petitions, providing a strong and compelling case for the approval of the visa application. Note: Do not mention yourself as an immigration officer.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Professional/Asylum Petition Letter 01.jpg",
						"/assets/images/templates/Professional/Asylum Petition Letter 02.jpg",
					],

					resumeTitle: "Asylum Visa Petition Letter",
					resumeDescription: "",
					id: "professional-9",
					tag: "Professional",
					inputFields: [
						{
							name: "Full Name",
							label: "Ex: John Kim",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Home Country",
							label: "Ex: India, Nepal",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Brief reason for seeking asylum and Any specific details about persecution ",
							label: "Ex: Life threat from XYZ ",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: " Any additional information or requests",
							label: "Ex: None",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						" Generate a compelling asylum petition letter addressed to the USCIS on behalf of [fieldValue1]. Clearly outline the reasons for seeking asylum, highlighting the specific persecution fears based on factors such as race, religion, nationality, political opinion, or membership in a particular social group. Provide a detailed summary of incidents or circumstances in [fieldValue2]], your home country that have led to your fear of persecution. Emphasize the urgency and seriousness of the situation. Include any supporting evidence, such as newspaper articles, medical reports, or affidavits from witnesses. Conclude by expressing your sincere request for the asylum officer's thorough consideration of your application. Keep the letter formal, detailed, and in line with USCIS guidelines. Here is a brief reason for seeking asylum and details about persecution - [fieldValue3]. [fieldValue4]. Note: Do not mention yourself as an immigration officer.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Professional/RFE.jpg",
											],

					resumeTitle: "Request for Evidence(RFE)",
					resumeDescription: "",
					id: "professional-10",
					tag: "Professional",
					inputFields: [
					 	{
					 		name: "Full Name",
					 		label: "Ex: John Kim",
					 		fieldType: "textfield",
					 		fieldValue: "",
					 	},
					// 	{
					// 		name: "Home Country",
					// 		label: "Ex: India, Nepal",
					// 		fieldType: "textfield",
					// 		fieldValue: "",
					// 	},
					// 	{
					// 		name: "Brief reason for seeking asylum and Any specific details about persecution ",
					// 		label: "Ex: Life threat from XYZ ",
					// 		fieldType: "textfield",
					// 		fieldValue: "",
					// 	},
					// 	{
					// 		name: " Any additional information or requests",
					// 		label: "Ex: None",
					// 		fieldType: "textfield",
					// 		fieldValue: "",
					// 	},
					 ],
					prompt:
						" Imagine you are a seasoned immigration attorney tasked with responding to a Request for Evidence (RFE) from USCIS. Your client is seeking a visa or immigration benefit. Follow these steps for each RFE question: 1). Identify the RFE Question: When I present an RFE question, carefully read it to understand the specific information or clarification USCIS is seeking. 2). Request Details from the Client: Ask me for all the necessary details needed to comprehensively answer that question. This may include the client's background, specific circumstances surrounding their case, and any relevant documentation or information they have. 3). Provide a Detailed Response: Once I provide the requested details, respond with a detailed and persuasive answer. Your response should include legal arguments, supporting documentation, relevant case law, or precedents. Aim to present a well-structured and convincing argument to enhance the chances of the client's immigration application being approved. 4). Prompt for the Next Question: After answering a question, prompt me for the next one. Continue this process until I instruct you to stop. Remember, your role is that of an attorney and your goal is to advocate for your client's case in the most effective way possible. Note: Do not mention yourself as an immigration officer.",
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
				{
					imageUrl: [
						"/assets/images/templates/Tourist/Financial Support Letter from Sponsor (Family Member or Friend).jpeg",
					],
					resumeTitle: "Financial Support Letter from Sponsor (Family Member or Friend)",
					resumeDescription: "",
					id: "tourist-3",
					tag: "Tourist",
					inputFields: [
						{
							name: "Name of the Applicant",
							label: "Ex: John Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Relation to the Applicant",
							label: "Ex: Father",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Destination Country",
							label: "Ex: Spain",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						"Generate a brief financial support letter on behalf of the applicant's relative to support their tourism plans by using the following details - Name of the Applicant - [fieldValue1], Relation to the Applicant - [fieldValue2], Destination Country - [fieldValue3].Please don't mention yourself as an immigration officer. ",
				},
				{
					imageUrl: ["/assets/images/templates/Tourist/Bankstatement1.jpg"],
					resumeTitle: "Bank Statement Letter",
					resumeDescription: "",
					id: "tourist-4",
					tag: "Tourist",
					inputFields: [
						{
							name: " Account Holder's Name",
							label: "Ex: John Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Outstanding balance",
							label: "Ex: 10000$",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Number of days that the balance is being maintained",
							label: "Ex: 30 Days",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						" Generate a brief letter from the bank addressed to To Whom It May Concern containing the following details Account holder's Name-[fieldValue1] , Outstanding balance-[fieldValue2] , Number of days that the balance is being maintained -[fieldValue3].",
				},
				{
					imageUrl: ["/assets/images/templates/Tourist/Invitationletter1.jpg"],
					resumeTitle: "Invitation Letter",
					resumeDescription: "",
					id: "tourist-5",
					tag: "Tourist",
					inputFields: [
						{
							name: " Tourist's Name",
							label: "Ex: John Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Source Country",
							label: "Ex: India",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Destination Country",
							label: "Ex: UK",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Reason for Travel",
							label: "Ex: Tourism",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Your Full Name",
							label: "Ex: Kim",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Your Relationship with the Tourist",
							label: "Ex: Brother",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						" Generate a brief invitation letter for a tourist named [fieldValue1] from [fieldValue2], who is travelling to [fieldValue3] for [fieldValue4]. The letter is from [fieldValue5], Who is [fieldValue6] of the Tourist. Please include details about the length of the stay and accommodation arrangements. Note: Please do not mention yourself as an Immigration Officer.",
				},
				{
					imageUrl: ["/assets/images/templates/Tourist/affidavit1.jpg"],
					resumeTitle: "Affidavit of Finanical Support for a Friend/Relative certified by the CA",
					resumeDescription: "",
					id: "tourist-6",
					tag: "Tourist",
					inputFields: [
						{
							name: " Full Name",
							label: "Ex: John Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Address",
							label: "Ex: 100,Miyapur, Hyderabad",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Immigrant's Name",
							label: "Ex: Kim",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Relationship with Immigrant ",
							label: "Ex: Brother",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Type of Visa ",
							label: "Ex: Tourism",
							fieldType: "textfield",
							fieldValue: "",
						},{
							name: "Destination Country ",
							label: "Ex: USA",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						" Generate an brief affidavit of financial support by [fieldValue1], residing at [fieldValue2] prepared for [fieldValue3], who is [fieldValue4] of [fieldValue1], applying for a [fieldValue5] to [fieldValue6]. The affidavit should detail [fieldValue7]'s financial ability, certified by the CA, to support [fieldValue3] during their stay. Please include details about [fieldValue1]'s employment, annual income, commitment to support, and ensure the inclusion of a statement regarding the legal significance of this document. Conclude with the certification by the Chartered Accountant (CA), including their contact details, registration number, and official stamp or signature. Note: Please do not mention yourself as an Immigration Officer.",
				},
				{
					imageUrl: ["/assets/images/templates/Tourist/affidavit2.jpg"],
					resumeTitle: "Affidavit of Income based on salary, certified by the CA",
					resumeDescription: "",
					id: "tourist-7",
					tag: "Tourist",
					inputFields: [
						{
							name: " Full Name",
							label: "Ex: John Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Address",
							label: "Ex: 100,Miyapur, Hyderabad",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Purpose of Visit",
							label: "Ex: Visa Application",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Company Name ",
							label: "Ex: Google",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Job Title ",
							label: "Ex: Sr. Software Engineer",
							fieldType: "textfield",
							fieldValue: "",
						},{
							name: "Annual Income ",
							label: "Ex: $70000",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						" Generate a brief income affidavit issued and certified by a Chartered Accountant for [fieldvalue1], residing at [fieldValue2]. This affidavit, for the purpose of [fieldValue3], should detail [fieldValue1]'s employment at [fieldvalue4], their role as [fieldvalue5], and their annual income of [fieldValue6]. Ensure the inclusion of a statement regarding the legal significance of this document. Conclude with the certification by the Chartered Accountant (CA), including their contact details, registration number, and official stamp or signature. Note: Please do not mention yourself as an Immigration Officer.",
				},
				{
					imageUrl: [
						"/assets/images/templates/Tourist/affidavit3.1.jpg",
						"/assets/images/templates/Tourist/affidavit3.2.jpg",
					],
					resumeTitle: "Net Worth Affidavit, certified by the CA",
					resumeDescription: "",
					id: "tourist-8",
					tag: "Tourist",
					inputFields: [
						{
							name: " Full Name",
							label: "Ex: John Doe",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Purpose",
							label: "Ex: Immigration",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "Purpose of Visit",
							label: "Ex: Visa Application",
							fieldType: "textfield",
							fieldValue: "",
						},
						{
							name: "List of Properties ",
							label: "Ex: 3 acres of agriculture land",
							fieldType: "textfield",
							fieldValue: "",
						},
					],
					prompt:
						" Generate a brief net worth affidavit prepared by a Chartered Accountant for [fieldValue1], detailing my assets and liabilities for the purpose of [fieldValue2]. Include [fieldValue1]’s properties at [fieldValue3], investments, and liabilities, with valuations and verifications done by the CA. Ensure the inclusion of a statement regarding the legal significance of this document. Conclude with the certification by the Chartered Accountant (CA), including their contact details, registration number, and official stamp or signature. Note: Please do not mention yourself as an Immigration Officer.",
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
		activeTabIndex = activeTabIndex;
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
		let fields = selectedTemplate.inputFields;
		for (let i = 0; i < fields?.length; i++) {
			let field = fields[i];
			const placeholder = `[fieldValue${i + 1}]`;
			const userInputValue = field.fieldValue;
			selectedTemplate.prompt = selectedTemplate.prompt.replaceAll(placeholder, userInputValue);
		}
		console.log("selectedTemplate", selectedTemplate);
		visaPrompt.set(selectedTemplate.prompt);
		dispatch("closeBurger");
		closePopup();
	}

	$: isTemplateDisabled = selectedTemplate.inputFields.some((field) => field.fieldValue === "");
	$: activeTemplates = templates[activeTabIndex].resumeTemplates;
	$: activeInputFields = selectedTemplate.inputFields;

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
						</Tabs.Tab>
						<Tabs.Tab
							label="Professional"
							class={activeTabIndex == 1 ? "active" : ""}
							style={activeTabIndex == 1
								? "font-weight:600;color:var(--primary-text-color) !important;"
								: ""}
						>
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
						</Tabs.Tab>
						<Tabs.Tab
							label="Tourist"
							class={activeTabIndex == 2 ? "active" : ""}
							style={activeTabIndex == 2
								? "font-weight:600;color:var(--primary-text-color) !important;"
								: ""}
						>
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
