<script>
	import { createEventDispatcher } from "svelte";
	import {  Tabs } from "@svelteuidev/core";

    import ResumeTemplate from "./BrowseTemplates/ResumeTemplate.svelte";

    import { theme } from "$lib/stores/theme";

	let dispatch = createEventDispatcher();
	export let showTemplatesPopup = false;

    let templates = [
        {
            type : 'Student',
            resumeTemplates : [
                {
                    imageUrl : '/assets/images/resumes/student-resume1.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-1"
                },

                {
                    imageUrl : '/assets/images/resumes/student-resume2.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-2"
                },

                {
                    imageUrl : '/assets/images/resumes/student-resume3.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-3"
                },
                {
                    imageUrl : '/assets/images/resumes/student-resume1.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-1"
                },

                {
                    imageUrl : '/assets/images/resumes/student-resume2.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-2"
                },

                {
                    imageUrl : '/assets/images/resumes/student-resume3.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-3"
                },

            ]
        },
        {
            type : 'Professional',
            resumeTemplates : [
                {
                    imageUrl : '/assets/images/resumes/student-resume1.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-1"
                },

                {
                    imageUrl : '/assets/images/resumes/student-resume1.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-1"
                },

                {
                    imageUrl : '/assets/images/resumes/student-resume1.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-1"
                },

            ]
        },
        {
            type : 'Tourists',
            resumeTemplates : [
                {
                    imageUrl : '/assets/images/resumes/student-resume1.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-1"
                },

                {
                    imageUrl : '/assets/images/resumes/student-resume1.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-1"
                },

                {
                    imageUrl : '/assets/images/resumes/student-resume1.png',
                    resumeTitle : "Statement of Purpose - For Students - Standard",
                    resumeDescription : 'The Harvard template, updated for the 21st century, boasts a sleek',
                    id : "student-1"
                },

            ]
        }
    ]

    let activeTabIndex = 0;
    let themeVariable = "light";
    let renderedText = "";

	function closePopup() {
		dispatch("closeTemplatesPopup");
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
			<div class="header">
				<p class="title">Browse Templates</p>
				<button class="close-btn" on:click={closePopup}>
					<img src="/assets/icons/close-icon-black.svg" alt="" />
				</button>
			</div>
			<p class="description">
				Browse and choose a template from the available selection, We’ll generate the content based
				on the template you’ve choosen
			</p>
			<div class="body scrollbar-custom">
                <Tabs
				variant="default"
				color={$theme == "dark"
					? "rgba(255, 255, 255, 0.2)"
					: "black" + themeVariable == "dark"
					? "rgba(255, 255, 255, 0.2)"
					: "black"}
				
				on:change={renderDescriptionTab}
			>
				<Tabs.Tab label="Student" class={ $theme == "light" ? "light" : "dark"} style={activeTabIndex == 0 ? 'font-weight:500;':''}>
					{#if activeTabIndex == 0}
						<div class="tabDetailsWrapInternal">
							{#each activeTemplates as template}
                                <ResumeTemplate imageUrl={template.imageUrl} resumeTitle={template.resumeTitle} resumeDescription={template.resumeDescription}/>
							{/each}
						</div>
					{/if}
				</Tabs.Tab>
				<Tabs.Tab label="Professional"  style={activeTabIndex == 1 ? 'font-weight:500;':''}>
					{#if activeTabIndex == 1}
						<div class="tabDetailsWrapInternal">
                            {#each activeTemplates as template}
                                <ResumeTemplate imageUrl={template.imageUrl} resumeTitle={template.resumeTitle} resumeDescription={template.resumeDescription}/>
							{/each}
						</div>
					{/if}
				</Tabs.Tab>
				<Tabs.Tab label="Tourist"  style={activeTabIndex == 2 ? 'font-weight:500;':''}>
					{#if activeTabIndex == 2}
						<div class="tabDetailsWrapInternal">
                            {#each activeTemplates as template}
                                <ResumeTemplate imageUrl={template.imageUrl} resumeTitle={template.resumeTitle} resumeDescription={template.resumeDescription}/>
							{/each}
						</div>
					{/if}
				</Tabs.Tab>
			</Tabs>
            </div>
		</div>
	</div>
{/if}

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
		z-index: 1;
		opacity: 1;
	}

	.popup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-radius: 4px;
		background: var(--brand-colors-pure-white, #fff);
		width: 60%;
		height: 720px;
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

    .tabDetailsWrapInternal{
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 12px 0;
        /* justify-content: center; */
    }
</style>
