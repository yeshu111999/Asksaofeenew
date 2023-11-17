<script>
	import { createEventDispatcher } from "svelte";
	import { Button, TextInput, NativeSelect } from "@svelteuidev/core";

	import { currentTheme } from "$lib/stores/themeStore";

	let dispatch = createEventDispatcher();
	export let showTemplatesPopup = false;

	let themeVariable = "light";
	let renderedText = "";
	let immiHelpInterviewType = "";
	let travelFrom = "";
	let travelTo = "";
	let travelReason = "";
	let immiHelpType = "";
	let immiHelppreppromt = "";
	let submitLoader = false;

	$: isValidSubmit =
		immiHelpInterviewType && travelFrom && travelTo && travelReason && immiHelpType;
	function closePopup() {
		dispatch("closeTemplatesPopup");
	}

	function immiHelpPrompt() {
		dispatch("immiHelpPrompt", immiHelppreppromt);
	}

	function prepareimmiHelpPrompt() {
		submitLoader = true;
		if (immiHelpInterviewType == "Immigration preparation") {
			immiHelppreppromt = `Please provide a comprehensive list of important and expected questions, along with suggested answers, to prepare for immigration. The questions should be based on the traveller's current scenario. Specifically, consider that the traveller holds ${immiHelpInterviewType} visa to enter ${travelTo} from ${travelFrom} for ${travelReason}. Tailor the questions to cover all aspects that are typically asked during the immigration by the immigration officer. Additionally, suggest answers that are clear, honest, and provide relevant information`;
		} else {
			immiHelppreppromt = ` Simulate being an immigration officer at ${travelTo} Embassy/Consulate, and you are conducting an interview with a traveller. The traveller currently holds a ${immiHelpType} visa and is entering ${travelTo} from ${travelFrom} for the purpose of ${travelReason}. As part of the interview process, please ensure that you ask one question at a time. Your objective is to gather detailed information about the traveller's intent, visa status, ties to their home country, and any other relevant details that would contribute to a comprehensive assessment. Focus on maintaining a thorough understanding of the traveller's circumstances throughout the interview. Note: Please maintain context and avoid going out of context in this entire conversation.`;
		}
		immiHelpPrompt();
		submitLoader = false;
		immiHelpInterviewType = "";
		travelFrom = "";
		travelTo = "";
		travelReason = "";
		immiHelpType = "";
		closePopup();
		// console.log("prompt", immiHelppreppromt);
	}
	let items = [
		"Assist with preparation for port of entry Immigration with sample questions and answers.",
		"Simulate port of entry Immigration scenarios for practice",
	];
</script>

{#if showTemplatesPopup}
	<div class="overlay">
		<div class="popup scrollbar-custom">
			<div class="header">
				<p class="title">Immigration Help</p>
				<button class="close-btn" on:click={closePopup}>
					{#if $currentTheme == "light"}
						<img src="/assets/icons/close-icon-black.svg" alt="" />
					{:else}
						<img src="/assets/icons/close-icon-white.svg" alt="" />
					{/if}
				</button>
			</div>
			<div class="visaprep">
				<p>Helps with creating a better prompt for Immigration assistance to:</p>
				<div class="visaprep-container">
					{#each items as item (item)}
						<li>{item}</li>
					{/each}
				</div>
				<div class="input-wrapper visaprep-container">
					<NativeSelect
						data={["Immigration preparation", "Mock Immigration"]}
						required
						bind:value={immiHelpInterviewType}
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
						<TextInput required bind:value={travelTo} placeholder="To (Ex. Dubai)" />
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
						bind:value={immiHelpType}
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
					color={$currentTheme == "light" ? "black" : "white"}
					loading={submitLoader}
					on:click={prepareimmiHelpPrompt}>Submit</Button
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
		z-index: 20;
		opacity: 1;
	}

	.popup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-radius: 4px;
		background: var(--secondary-background-color);
		width: 35%;
		/* height: 620px; */
	}

	.header {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--primary-border-color);
	}
	.footer {
		padding: 24px;
		width: 100%;
		display: flex;
		justify-content: right;
		align-items: center;
		border-top: 1px solid var(--primary-border-color);
		gap: 12px;
	}

	.title {
		color: var(--primary-text-color);
		font-family: Inter;
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
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

	@media (max-width: 1000px) {
		.popup {
			width: 70%;
		}
	}

	@media (max-width: 600px) {
		.popup {
			width: 90%;
			height: 90%;
			overflow-y: auto;
		}
	}
</style>
