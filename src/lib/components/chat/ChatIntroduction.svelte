<script lang="ts">
	import { PUBLIC_APP_NAME, PUBLIC_VERSION } from "$env/static/public";
	import { PUBLIC_ANNOUNCEMENT_BANNERS } from "$env/static/public";
	import Logo from "$lib/components/icons/Logo.svelte";
	import { createEventDispatcher, onMount } from "svelte";
	import IconChevron from "$lib/components/icons/IconChevron.svelte";
	import CarbonArrowUpRight from "~icons/carbon/arrow-up-right";
	import AnnouncementBanner from "../AnnouncementBanner.svelte";
	import ModelsModal from "../ModelsModal.svelte";
	import type { Model } from "$lib/types/Model";
	import ModelCardMetadata from "../ModelCardMetadata.svelte";
	import type { LayoutData } from "../../../routes/$types";
	import { findCurrentModel } from "$lib/utils/models";
	import { createStyles, Tabs, Divider } from "@svelteuidev/core";
	import { theme } from "$lib/stores/theme";
	import { currentTheme } from "$lib/stores/themeStore";

	export let currentModel: Model;
	export let settings: LayoutData["settings"];
	export let models: Model[];

	let isModelsModalOpen = false;

	let activeHomeTabIndex = 0;

	$: currentModelMetadata = findCurrentModel(models, settings.activeModel);

	let renderedText = "";

	const renderDescriptionTab = (event) => {
		const { index, key } = event.detail;
		activeHomeTabIndex = index;
		renderedText = "";
		let textlist = [
			"A Statement of Purpose or SOP lives up to its name by clearly outlining the student's purpose of applying to a particular university for admission into a specific course.",
			"Yes, you will have to meet the H1B visa requirements for Indian citizens and provide the required documents.",
			"Dallas is known for being the home base of the Dallas Cowboys, its delectable southern cuisines, major global companies, and its vibrant art and music scene.",
		];
		renderedText = textlist[index];
		// let words = textlist[index].split(" ");
		// let i = 0;
		// for (i = 0; i < 10; i++) {
		// setInterval(() => {
		// 	if (i < words.length) {
		// 		renderedText += words[i] + " ";
		// 		i += 1;
		// 	}
		// }, 100);
		// i += 1;
		// }
	};

	let themeVariable = "light";

	const useStyles = createStyles((theme) => ({
		root: {
			"&.active": {
				backgroundColor: "rgba(255, 255, 255, 0.2)",
				// borderRadius: 8,
			},
		},
	}));
	$: ({ classes } = useStyles());

	const announcementBanners = PUBLIC_ANNOUNCEMENT_BANNERS
		? JSON.parse(PUBLIC_ANNOUNCEMENT_BANNERS)
		: [];

	const dispatch = createEventDispatcher<{ message: string }>();
	onMount(() => {
		renderDescriptionTab({ detail: { index: activeHomeTabIndex, key: "hi" } });
	});
</script>

<div
	class="grid lg:grid-cols-3"
	style="display:flex;flex-direction:column; align-items:center; margin-bottom:16px; gap: 8px;"
>
	<div class="lg:col-span-1">
		<div>
			<!-- <div class="mb-3 flex items-center text-2xl font-semibold">
				<Logo classNames="mr-1 flex-none" />
				{PUBLIC_APP_NAME}
				<div
					class="ml-3 flex h-6 items-center rounded-lg border border-gray-100 bg-gray-50 px-2 text-base text-gray-400 dark:border-gray-700/60 dark:bg-gray-800"
				>
					v{PUBLIC_VERSION}
				</div>
			</div> -->
			<!-- <p class="text-base text-gray-600 dark:text-gray-400">
				<strong>Generative AI for Immigration & Travel</strong>
			</p> -->
			<span class="appTitle">How Can I Assist You?</span>
		</div>
	</div>
	<div
		style="display: flex; width: 100%; overflow-y:auto;"
		class={$theme == "light" ? "light " : " dark"}
	>
		<!-- <div class="tabDetailsWrap">
			<span class="tabDetailsTitle">What immiGPT will do for</span>
		</div> -->
		<div class="tabs-section">
			<div class={$theme == "light" ? "light tabBodyWrap" : "tabBodyWrap dark"}>
				<img src="assets/icons/student-icon.svg" alt="" />
				<div class="question top">
					<span class="tabDetailsSubTitle">Student</span>
					<span class="tabDetailsDescription">
						ImmiGPT offers a concise guide, aiding in document generation and interview preparation
						through our AI model for student visa requirements worldwide.
					</span>
				</div>
				<!-- <Divider /> -->
				<div class="question">
					<span class="tabDetailsSubTitle"> What is SOP ? </span>
					<span class="tabDetailsDescription">
						A Statement of Purpose or SOP lives up to its name by clearly outlining the student's
						purpose of applying to a particular university for admission into a specific course.
					</span>
				</div>
			</div>
			<div class={$theme == "light" ? "light tabBodyWrap" : "tabBodyWrap dark"}>
				<img src="assets/icons/professionals-icon.svg" alt="" />
				<div class="question top">
					<span class="tabDetailsSubTitle">Professionals</span>
					<span class="tabDetailsDescription">
						ImmiGPT offers detailed guidance on work visa options, eligibility, and application
						processes like US H1B for over 10 countries.
					</span>
				</div>
				<!-- <Divider /> -->
				<div class="question">
					<span class="tabDetailsSubTitle"> Can Indians apply for H1B? </span>
					<span class="tabDetailsDescription">
						Yes, you will have to meet the H1B visa requirements for Indian citizens and provide the
						required documents.
					</span>
				</div>
			</div>
			<div class={$theme == "light" ? "light tabBodyWrap" : "tabBodyWrap dark"}>
				<img src="assets/icons/tourists-icon.svg" alt="" />
				<div class="question top">
					<span class="tabDetailsSubTitle">Tourists</span>
					<span class="tabDetailsDescription">
						ImmiGPT guides users through family-sponsored and business immigration steps, ensuring
						all criteria are met for visas and entrepreneurial opportunities.
					</span>
				</div>
				<!-- <Divider /> -->
				<div class="question">
					<span class="tabDetailsSubTitle"> What is Dallas popular for? </span>
					<span class="tabDetailsDescription">
						Dallas is known for being the home base of the Dallas Cowboys, its delectable southern
						cuisines, major global companies, and its vibrant art and music scene.
					</span>
				</div>
			</div>
			<!-- <div class="question">
				<span class="tabDetailsSubTitle"> Can Indians apply for H1B? </span>
				<span class="tabDetailsDescription">
					Yes, you will have to meet the H1B visa requirements for Indian citizens and provide the
					required documents.
				</span>
			</div>
			<div class="question">
				<span class="tabDetailsSubTitle"> What is Dallas popular for? </span>
				<span class="tabDetailsDescription">
					Dallas is known for being the home base of the Dallas Cowboys, its delectable southern
					cuisines, major global companies, and its vibrant art and music scene.
				</span>
			</div> -->
		</div>
		<!-- <div class={$theme == "light" ? "light tabWrap" : "tabWrap dark"}>
			<Tabs
				variant="default"
				color={$currentTheme == "light" ? "black" : "white"}
				position="center"
				on:change={renderDescriptionTab}
			>
				<Tabs.Tab
					label="Student"
					class={classes.root + activeHomeTabIndex == 0
						? "active"
						: "" + $currentTheme == "light"
						? "light"
						: "dark"}
					style={activeHomeTabIndex == 0
						? "font-weight:600;color:var(--primary-text-color) !important;"
						: ""}
				>
					{#if activeHomeTabIndex == 0}
						<div class="tabDetailsWrapInternal">
							<span class="tabDetailsDescription">
								ImmiGPT provides a comprehensive guide on student visa requirements, assist in
								document generation, and interactive interview preparation using our custom AI model
								for various countries across the globe.
							</span>
							<span class="tabDetailsSubTitle"> What is SOP ? </span>
							<span class="tabDetailsDescription">
								
								{renderedText}
							</span>
						</div>
					{/if}
				</Tabs.Tab>
				<Tabs.Tab
					label="Professional"
					class={classes.root + activeHomeTabIndex == 1 ? "active" : ""}
					style={activeHomeTabIndex == 1
						? "font-weight:600;color:var(--primary-text-color) !important;"
						: ""}
				>
					{#if activeHomeTabIndex == 1}
						<div class="tabDetailsWrapInternal">
							<span class="tabDetailsDescription">
								ImmiGPT offers detailed guidance on work visa options, eligibility, and application
								processes like US H1B for over 10 countries.
							</span>
							<span class="tabDetailsSubTitle"> Can Indians apply for H1B? </span>
							<span class="tabDetailsDescription">
								
								{renderedText}
							</span>
						</div>
					{/if}
				</Tabs.Tab>
				<Tabs.Tab
					label="Tourist"
					class={classes.root + activeHomeTabIndex == 2 ? "active" : ""}
					style={activeHomeTabIndex == 2
						? "font-weight:600;color:var(--primary-text-color) !important;"
						: ""}
				>
					{#if activeHomeTabIndex == 2}
						<div class="tabDetailsWrapInternal">
							<span class="tabDetailsDescription">
								ImmiGPT provides a detailed breakdown of family-sponsored visa requirements,business
								immigration options for entrepreneurs, investors, artists, entertainers and
								performers etc., guiding users through each step and ensuring all criteria is met.
							</span>
							<span class="tabDetailsSubTitle"> What is Dallas popular for? </span>
							<span class="tabDetailsDescription">
								
								{renderedText}
							</span>
						</div>
					{/if}
				</Tabs.Tab>
			</Tabs>
		</div> -->
	</div>
	<!-- <div class="lg:col-span-2 lg:pl-24">
	</div> -->
	<!-- <div class="lg:col-span-2 lg:pl-24">
		{#each announcementBanners as banner}
			<AnnouncementBanner classNames="mb-4" title={banner.title}>
				<a
					target="_blank"
					href={banner.linkHref}
					class="mr-2 flex items-center underline hover:no-underline"
					><CarbonArrowUpRight class="mr-1.5 text-xs" /> {banner.linkTitle}</a
				>
			</AnnouncementBanner>
		{/each}

		{#if isModelsModalOpen}
			<ModelsModal {settings} {models} on:close={() => (isModelsModalOpen = false)} />
		{/if}
		<div class="overflow-hidden rounded-xl border dark:border-gray-800">
			<div class="flex p-3">
				<div>
					<div class="text-sm text-gray-600 dark:text-gray-400">Current Model</div>
					<div class="font-semibold">{currentModel.displayName}</div>
				</div>
				{#if models.length > 1}
					<button
						type="button"
						on:click={() => (isModelsModalOpen = true)}
						class="btn ml-auto flex h-7 w-7 self-start rounded-full bg-gray-100 p-1 text-xs hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-600"
						><IconChevron /></button
					>
				{/if}
			</div>
			<ModelCardMetadata variant="dark" model={currentModel} />
		</div>
	</div> -->
	{#if currentModelMetadata.promptExamples}
		<div class="lg:col-span-3 lg:mt-6">
			<p class="mb-3 text-gray-600 dark:text-gray-300">Examples</p>
			<div class="grid gap-3 lg:grid-cols-3 lg:gap-5">
				{#each currentModelMetadata.promptExamples as example}
					<button
						type="button"
						class="rounded-xl border bg-gray-50 p-2.5 text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:p-4"
						on:click={() => dispatch("message", example.prompt)}
					>
						{example.title}
					</button>
				{/each}
			</div>
		</div>{/if}
</div>

<style>
	.tabWrap {
		/* border: #fff solid 2px; */
		border-radius: 16px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 10px 8px 0px 8px;
		/* width: fit-content; */
		width: 100%;
		color: var(--primary-text-color);
	}

	.tabBodyWrap {
		/* border: #fff solid 2px; */
		border: var(--primary-border-color) solid 1px;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		/* align-items: center; */
		padding: 16px;
		min-height: 300px;
		display: flex;
		gap: 20px;
		align-items: baseline;
	}

	.question.top {
		border-bottom: 1px solid #d6d6d6;
		padding-bottom: 16px;
		min-height: 150px;
	}

	.tabs-section {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}

	.question {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.question .tabDetailsSubTitle,
	.question .tabDetailsDescription {
		text-align: left;
	}

	.tabBodyWrap.light {
		/*	border: black solid 1px;*/
		border: var(--primary-border-color) solid 1px;
	}

	.tabDetailsWrap {
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 8px;
	}

	.tabDetailsTitle {
		font-size: 16px;
		font-weight: 600;
		text-align: center;
		color: var(--primary-text-color);
	}

	.tabDetailsWrapInternal {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 8px;
		gap: 8px;
		color: var(--primary-text-color);
	}

	.tabDetailsSubTitle {
		font-weight: 600;
		font-size: 16px;
		text-align: center;
	}

	.tabDetailsDescription {
		font-size: 14px;
		text-align: center;
	}

	.appTitle {
		text-align: center;
		font-weight: 700;
		font-size: 24px;
		color: var(--primary-text-color);
	}

	@media (max-width: 786px) {
		.appTitle {
			display: none;
		}

		.tabs-section {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}
	}
</style>
