<script>
	import { createEventDispatcher } from "svelte";
	import { Button, TextInput, NativeSelect } from "@svelteuidev/core";

	import ResumeTemplate from "./BrowseTemplates/ResumeTemplate.svelte";

	import { theme } from "$lib/stores/theme";

	let dispatch = createEventDispatcher();
	export let showTemplatesPopup = false;

	let themeVariable = "light";
	let renderedText = "";
	let visaInterviewType = "";
	let travelFrom = "";
	let travelTo = "";
	let travelReason = "";
	let visaType = "";
	let visapreppromt = "";
	let submitLoader = false;

	$: isValidSubmit = visaInterviewType && travelFrom && travelTo && travelReason && visaType;
	function closePopup() {
		dispatch("closeTemplatesPopup");
	}

	function visaPrompt() {
		dispatch("visaPrompt", visapreppromt);
	}

	function prepareVisaPrompt() {
		submitLoader = true;
		if (visaInterviewType == "VISA preparation") {
			visapreppromt = `Please provide a comprehensive list of important and expected questions, along with suggested answers, to prepare for the ${visaType} visa interview. The questions should be based on the traveller's current scenario. Specifically, consider that the traveller is applying for a ${visaType} visa to enter ${travelTo} from ${travelFrom} for ${travelReason}. Tailor the questions to cover all aspects that are typically asked during a ${visaType} visa interview. Additionally, suggest answers that are clear, honest, and provide relevant information. Begin responding with a greeting`;
		} else {
			visapreppromt = `Imagine you're a visa interview officer at ${travelTo} Embassy/Consulate, and you are conducting a visa interview for a traveller. The traveller is applying for ${visaType} visa to enter ${travelTo} from ${travelFrom} for the purpose of ${travelReason}. Please make sure to ask one question at a time.`;
		}
		visaPrompt();
		submitLoader = false;
		visaInterviewType = "";
		travelFrom = "";
		travelTo = "";
		travelReason = "";
		visaType = "";
		visapreppromt = "";
		closePopup();
		// console.log("prompt", visapreppromt);
	}
	let items = [
		"Make you to prepare for visa interview with sample questions and answers",
		"Train you with Visa Mock Interview",
		"Help you with better prompt for visa preparation",
	];
</script>

{#if showTemplatesPopup}
	<div class="overlay">
		<div class="popup">
			<div class="header">
				<p class="title">Tell us about your travel</p>
				<button class="close-btn" on:click={closePopup}>
					<img src="/assets/icons/close-icon-black.svg" alt="" />
				</button>
			</div>
			<div class="visaprep">
				<div class="visaprep-container">
					{#each items as item (item)}
						<li>{item}</li>
					{/each}
				</div>
				<div class="input-wrapper visaprep-container">
					<NativeSelect
						data={["VISA preparation", "VISA Mock preparation"]}
						required
						bind:value={visaInterviewType}
						label="Select Option"
						placeholder="Select Interview"
					/>
				</div>
				<div class="input-wrapper visaprep-container travel-container">
					<div style="width:50%">
						<TextInput
							required
							bind:value={travelFrom}
							label="I am travelling"
							placeholder="From (Ex. India)"
						/>
					</div>
					<div style="width:50%">
						<TextInput required bind:value={travelTo} placeholder="To (Ex. India)" />
					</div>
				</div>
				<!-- <div class="input-wrapper visaprep-container">
					<TextInput
						required
						bind:value={travelTo}
						placeholder="To (Ex. India)"
					/>
				</div> -->
				<div class="input-wrapper visaprep-container">
					<TextInput
						required
						bind:value={travelReason}
						label="Reason for travelling"
						placeholder="Ex. Visiting"
					/>
				</div>
				<div class="input-wrapper visaprep-container">
					<TextInput
						required
						bind:value={visaType}
						label="Select visa type"
						placeholder="Ex. Visitor Visa"
					/>
				</div>
			</div>
			<div class="footer">
				<Button color="rgba(225, 225, 225, 0.87)" style="color:#000" on:click={closePopup}
					>Cancel</Button
				>
				<Button
					disabled={!isValidSubmit}
					color="black"
					loading={submitLoader}
					on:click={prepareVisaPrompt}>Submit</Button
				>
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
		width: 35%;
		/* height: 620px; */
	}

	.header {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e1e1e1;
	}
	.footer {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: right;
		align-items: center;
		border-top: 1px solid #e1e1e1;
		gap: 12px;
	}
	.footer-text {
		color: #335fd1;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
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

	.description-amount {
		color: rgba(0, 0, 0, 0.54);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 19px;
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
	.features {
		display: flex;
		flex-direction: row;
		padding: 8px 0px;
	}
	.plan-content {
		border-right: 1px solid #e1e1e1;
		flex: auto;
		padding: 16px;
	}
	.plan-container {
		display: flex;
	}
	.plan-button {
		padding: 16px 0px;
	}
	.tick-gap {
		margin-right: 8px;
	}
	.visaprep-container {
		padding: 12px;
	}
	.visaprep {
		padding: 12px;
	}

	.travel-container {
		display: flex;
		gap: 12px;
		align-items: end;
		width: 100%;
	}
</style>
